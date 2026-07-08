# KLAY Studios — Google Drive Automation Setup

## How It Works

```
You drop a project folder → Google Drive
       ↓  (Apps Script runs, reads folder)
    projects.json is updated on GitHub
       ↓  (Vercel detects push)
    Website rebuilds automatically (~30 sec)
```

No code editing. No Vercel dashboard. Just add a folder and you're done.

---

## One-Time Setup (do this once, ever)

### Step 1 — Create the Google Drive folder

Create a folder called **`KLAY Projects`** in your Google Drive.
Every project you want on the website goes as a subfolder inside it.

---

### Step 2 — Get a GitHub Personal Access Token

1. Go to → [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **"Generate new token (classic)"**
3. Give it a name e.g. `klay-sync`
4. Check the **`repo`** scope (full control of private repos)
5. Click **Generate** and **copy the token** (you won't see it again)

---

### Step 3 — Set up the Google Apps Script

1. Go to → [https://script.google.com](https://script.google.com)
2. Click **New project**
3. Open the file `klay-sync.gs` from this repo and **paste the entire contents** into the editor
4. Rename the project to `KLAY Sync`

---

### Step 4 — Store your GitHub token

In the Apps Script editor:
1. Replace `YOUR_TOKEN_HERE` in the `storeToken()` function with your actual token
2. Click **Run → storeToken**
3. Approve the permissions it asks for
4. After it runs, **delete the token from the code** (it's now stored securely in Script Properties)

---

### Step 5 — Set up the daily trigger

In the Apps Script editor:
1. Click **Run → setupTrigger**
2. Done! The script will now run automatically every day at midnight.

---

### Step 6 — Test it now

Click **Run → syncProjects** to do an immediate sync.
Check your GitHub repo — `public/projects.json` should be updated.
Vercel will rebuild within ~30 seconds.

---

## Adding a New Project (everyday workflow)

1. Create a new subfolder inside `KLAY Projects` in Google Drive
2. Name the folder whatever you want (this becomes the project slug)
3. Drop in your photos (`.jpg`, `.jpeg`, `.png`, or `.webp`)
4. Optionally add an `info.txt` file with project details
5. The script runs overnight — or click **Run → syncProjects** to sync immediately

That's it. The website updates itself.

---

## info.txt Format

Create a plain text file called `info.txt` inside the project folder.
Use `key: value` format. All fields are **optional**.

```
title: My Hotel Dubai
client: XYZ Group
category: Hospitality
expertise: Design + Build
city: Dubai
country: UAE
year: 2024
area: 3,200 m²
description: A warm one-liner about the project.
anyOtherField: Shows up on the project detail page
```

**Notes:**
- `title` defaults to the folder name if not provided
- `category` and `expertise` drive the filter dropdowns on the Projects page
- You can add any custom field — it will appear in the project's metadata strip
- Images are sorted alphabetically by filename — name them `01_hero.jpg`, `02_detail.jpg` etc. to control order

---

## Drafting a Project (hide it from the site)

Prefix the folder name with `_` to exclude it from syncing.

```
📁 _DRAFT My Hotel Dubai    ← will NOT appear on the site
📁 My Hotel Dubai           ← will appear on the site
```

---

## Image Requirements

- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
- The **first image** (alphabetically) is used as the cover card image
- All images are shown in the project gallery
- The script automatically sets each image to "Anyone with the link can view"
- Recommended resolution: **at least 1600px wide** for gallery images

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Script can't find folder | Make sure the folder is named exactly **`KLAY Projects`** (case-sensitive) |
| Token error | Re-run `storeToken()` with a fresh token |
| Images not showing on site | Check that the image file is shared publicly in Drive |
| Site not rebuilding | Check the Vercel dashboard for build errors |
