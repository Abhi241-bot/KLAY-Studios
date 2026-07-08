/**
 * KLAY Studios — Google Drive → GitHub Sync
 * ==========================================
 * This script scans your "KLAY Projects" folder in Google Drive,
 * reads each project subfolder, and pushes an updated projects.json
 * to your GitHub repository. Vercel detects the push and rebuilds
 * the website automatically.
 *
 * HOW TO USE:
 *   1. Open https://script.google.com in your browser.
 *   2. Create a new project, paste this entire file in.
 *   3. Fill in the CONFIG section below.
 *   4. Run setupTrigger() ONCE to schedule daily syncs.
 *   5. Run syncProjects() manually at any time to sync immediately.
 *
 * ── FOLDER STRUCTURE IN GOOGLE DRIVE ──────────────────────────
 *
 *   📁 KLAY Projects  ← your root folder (configure DRIVE_FOLDER_NAME)
 *     📁 My Hotel Dubai           ← one subfolder per project
 *         📄 info.txt             ← optional metadata (key: value format)
 *         🖼 photo1.jpg           ← images (jpg/jpeg/png/webp)
 *         🖼 photo2.jpg
 *     📁 Office Tower Riyadh
 *         📄 info.txt
 *         🖼 hero.jpg
 *
 * ── info.txt FORMAT ───────────────────────────────────────────
 *
 *   title: My Hotel Dubai          ← overrides folder name if present
 *   client: XYZ Group
 *   category: Hospitality          ← any value you like
 *   expertise: Design + Build
 *   city: Dubai
 *   country: UAE
 *   year: 2024
 *   area: 3,200 m²
 *   description: A warm description of the project.
 *   myCustomField: Any extra label you want shown on the page
 *
 *   All fields are optional. Title defaults to the folder name.
 *   Unknown fields are stored in the `meta` object.
 *
 * ── IMPORTANT: SHARE IMAGES ───────────────────────────────────
 *   Each image file must be set to "Anyone with the link can view".
 *   The script does this automatically when it runs.
 *
 */

// ══════════════════════════════════════════════════════════════
//  CONFIG — fill these in before running
// ══════════════════════════════════════════════════════════════

var CONFIG = {
  // Name of your root folder in Google Drive
  DRIVE_FOLDER_NAME: 'KLAY PROJECTS',

  // Your GitHub username
  GITHUB_OWNER: 'Abhi241-bot',

  // Your repository name
  GITHUB_REPO: 'KLAY-Studios',

  // Branch to commit to (usually 'main')
  GITHUB_BRANCH: 'main',

  // Path of the file inside the repo to update
  GITHUB_FILE_PATH: 'public/projects.json',

  // The Script Property key name where your token is stored.
  // The actual token is stored securely via storeToken() — NOT here.
  GITHUB_TOKEN_PROPERTY: 'GITHUB_TOKEN',
};

// ══════════════════════════════════════════════════════════════
//  STEP 0: Store your GitHub token securely (run once)
// ══════════════════════════════════════════════════════════════
function storeToken() {
  // ✅ Token already stored. This function is kept for reference.
  // To re-store a new token, paste it below, run once, then delete it.
  PropertiesService.getScriptProperties().setProperty(
    'GITHUB_TOKEN',
    'PASTE_NEW_TOKEN_HERE_THEN_DELETE'
  );
  Logger.log('Token stored successfully.');
}

// ══════════════════════════════════════════════════════════════
//  STEP 1: Set up a daily trigger (run once)
// ══════════════════════════════════════════════════════════════
function setupTrigger() {
  // Remove any existing triggers
  ScriptApp.getProjectTriggers().forEach(function(t) {
    ScriptApp.deleteTrigger(t);
  });
  // Re-create: run syncProjects every 30 minutes
  ScriptApp.newTrigger('syncProjects')
    .timeBased()
    .everyMinutes(30)
    .create();
  Logger.log('Trigger set up. syncProjects will run every 30 minutes.');
}

// ══════════════════════════════════════════════════════════════
//  MAIN: Sync Drive → GitHub
// ══════════════════════════════════════════════════════════════
function syncProjects() {
  var token = PropertiesService.getScriptProperties().getProperty(CONFIG.GITHUB_TOKEN_PROPERTY);
  if (!token) {
    throw new Error('GitHub token not found. Run storeToken() first.');
  }

  // 1. Find the root folder
  var folders = DriveApp.getFoldersByName(CONFIG.DRIVE_FOLDER_NAME);
  if (!folders.hasNext()) {
    throw new Error('Folder "' + CONFIG.DRIVE_FOLDER_NAME + '" not found in Google Drive.');
  }
  var rootFolder = folders.next();

  // 2. Iterate project subfolders
  var projects = [];
  var subfolders = rootFolder.getFolders();

  while (subfolders.hasNext()) {
    var folder = subfolders.next();
    var project = processProjectFolder(folder);
    if (project) {
      projects.push(project);
    }
  }

  // 3. Sort by year descending (newest first), then alphabetically
  projects.sort(function(a, b) {
    if (b.year && a.year) return (b.year || 0) - (a.year || 0);
    return a.title.localeCompare(b.title);
  });

  // 4. Assign prev/next slugs for navigation
  for (var i = 0; i < projects.length; i++) {
    projects[i].prevSlug = i > 0 ? projects[i - 1].slug : projects[projects.length - 1].slug;
    projects[i].nextSlug = i < projects.length - 1 ? projects[i + 1].slug : projects[0].slug;
  }

  // 5. Push to GitHub
  var json = JSON.stringify(projects, null, 2);
  commitToGitHub(json, token);

  Logger.log('Sync complete. ' + projects.length + ' project(s) pushed to GitHub.');
}

// ══════════════════════════════════════════════════════════════
//  Process a single project folder
// ══════════════════════════════════════════════════════════════
function processProjectFolder(folder) {
  var folderName = folder.getName();

  // Skip folders starting with _ or . (hidden/draft)
  if (folderName.startsWith('_') || folderName.startsWith('.')) {
    return null;
  }

  // Build slug from folder name
  var slug = slugify(folderName);

  // Read info.txt if it exists
  var meta = {};
  var infoFiles = folder.getFilesByName('info.txt');
  if (infoFiles.hasNext()) {
    var content = infoFiles.next().getBlob().getDataAsString();
    meta = parseInfoTxt(content);
  }

  // Collect image files (sorted by name)
  var imageUrls = [];
  var imageExts = ['jpg', 'jpeg', 'png', 'webp'];
  var files = folder.getFiles();
  var imageFiles = [];

  while (files.hasNext()) {
    var file = files.next();
    var name = file.getName().toLowerCase();
    var ext = name.split('.').pop();
    if (imageExts.indexOf(ext) !== -1) {
      imageFiles.push(file);
    }
  }

  // Sort images by name so order is deterministic
  imageFiles.sort(function(a, b) {
    return a.getName().localeCompare(b.getName());
  });

  // Share each image publicly and get the embed URL
  imageFiles.forEach(function(file) {
    try {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      var fileId = file.getId();
      // Use the thumbnail URL which renders directly in next/image
      imageUrls.push('https://lh3.googleusercontent.com/d/' + fileId);
    } catch (e) {
      Logger.log('Could not share file: ' + file.getName() + ' — ' + e.message);
    }
  });

  if (imageUrls.length === 0) {
    Logger.log('Warning: No images found in folder "' + folderName + '". Skipping.');
    return null;
  }

  // Extract known fields from meta
  var KNOWN = ['title', 'client', 'category', 'expertise', 'city', 'country', 'year', 'area', 'description'];
  var project = {
    id: slug,
    slug: slug,
    title: (meta['title'] || folderName).toUpperCase(),
    image: imageUrls[0],
    gallery: imageUrls,
  };

  KNOWN.forEach(function(key) {
    if (meta[key] !== undefined && key !== 'title') {
      if (key === 'year') {
        project[key] = parseInt(meta[key], 10) || meta[key];
      } else {
        project[key] = meta[key];
      }
    }
  });

  // Extra fields go into meta object
  var extraMeta = {};
  Object.keys(meta).forEach(function(key) {
    if (KNOWN.indexOf(key) === -1) {
      extraMeta[key] = meta[key];
    }
  });
  if (Object.keys(extraMeta).length > 0) {
    project['meta'] = extraMeta;
  }

  return project;
}

// ══════════════════════════════════════════════════════════════
//  Parse info.txt → key: value pairs
// ══════════════════════════════════════════════════════════════
function parseInfoTxt(content) {
  var result = {};
  content.split('\n').forEach(function(line) {
    var colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    var key = line.substring(0, colonIdx)
      .trim()
      .replace(/^[\*\-•]+\s*/, '')  // strip leading * - • bullet characters
      .toLowerCase()
      .replace(/\s+/g, '_');
    var value = line.substring(colonIdx + 1).trim();
    if (key && value) {
      result[key] = value;
    }
  });
  return result;
}

// ══════════════════════════════════════════════════════════════
//  Convert folder name → URL slug
// ══════════════════════════════════════════════════════════════
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ══════════════════════════════════════════════════════════════
//  Commit the JSON to GitHub via REST API
// ══════════════════════════════════════════════════════════════
function commitToGitHub(content, token) {
  var apiBase = 'https://api.github.com/repos/' +
    CONFIG.GITHUB_OWNER + '/' +
    CONFIG.GITHUB_REPO + '/contents/' +
    CONFIG.GITHUB_FILE_PATH;

  var headers = {
    'Authorization': 'token ' + token,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };

  // Get current file SHA (required for updates)
  var sha = null;
  try {
    var getResp = UrlFetchApp.fetch(
      apiBase + '?ref=' + CONFIG.GITHUB_BRANCH,
      { headers: headers, muteHttpExceptions: true }
    );
    if (getResp.getResponseCode() === 200) {
      sha = JSON.parse(getResp.getContentText()).sha;
    }
  } catch (e) {
    Logger.log('Could not fetch existing file SHA: ' + e.message);
  }

  // Base64-encode the content
  var encoded = Utilities.base64Encode(content, Utilities.Charset.UTF_8);

  var payload = {
    message: 'chore: sync projects from Google Drive [' + new Date().toISOString() + ']',
    content: encoded,
    branch: CONFIG.GITHUB_BRANCH,
  };
  if (sha) payload.sha = sha;

  var putResp = UrlFetchApp.fetch(apiBase, {
    method: 'PUT',
    headers: headers,
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  });

  var code = putResp.getResponseCode();
  if (code !== 200 && code !== 201) {
    throw new Error('GitHub API error ' + code + ': ' + putResp.getContentText());
  }

  Logger.log('GitHub commit successful (HTTP ' + code + ')');
}
