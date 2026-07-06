'use client'

import type { Metadata } from 'next'
import { useState } from 'react'
import { TextReveal } from '@/components/animations/TextReveal'
import { ArrowRight, MapPin, Mail, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, wire to an email service (Resend, EmailJS, etc.)
    setSent(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-64 pb-20 border-b border-line">
        <div className="container-site">
          <TextReveal>
            <p className="text-label tracking-label text-terracotta-500 font-display mb-4">GET IN TOUCH</p>
          </TextReveal>
          <TextReveal delay={0.1}>
            <h1 className="font-display font-semibold text-hero text-ink-900 leading-none tracking-tight">
              CONTACT
            </h1>
          </TextReveal>
          <TextReveal delay={0.2}>
            <p className="text-body-lg text-ink-700 font-body mt-6 max-w-lg">
              We carry the flag of success, around the world. Tell us about your project.
            </p>
          </TextReveal>
        </div>
      </section>

      {/* Contact content */}
      <section className="section-spacing">
        <div className="container-site grid md:grid-cols-2 gap-20">
          {/* Form */}
          <div>
            <TextReveal>
              <h2 className="font-display font-semibold text-ink-900 text-h2 mb-10">
                Start a conversation
              </h2>
            </TextReveal>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 border-t border-terracotta-500"
              >
                <p className="font-display font-semibold text-ink-900 text-xl mb-3">Thank you.</p>
                <p className="text-ink-700 font-body">We will be in touch within 48 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
                <div>
                  <label htmlFor="contact-name" className="text-label tracking-label font-display text-ink-300 block mb-2">
                    FULL NAME *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="input-underline"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-label tracking-label font-display text-ink-300 block mb-2">
                    EMAIL *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="input-underline"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="contact-subject" className="text-label tracking-label font-display text-ink-300 block mb-2">
                    SUBJECT
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="Project type or enquiry"
                    className="input-underline"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="text-label tracking-label font-display text-ink-300 block mb-2">
                    MESSAGE *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    placeholder="Tell us about your project, timeline, and budget"
                    rows={5}
                    className="input-underline resize-none"
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="self-start arrow-link text-terracotta-500 border border-terracotta-500 px-6 py-3 hover:bg-terracotta-500 hover:text-white transition-colors duration-400"
                >
                  SEND MESSAGE <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>

          {/* Office info */}
          <div className="flex flex-col gap-12">
            <TextReveal>
              <h2 className="font-display font-semibold text-ink-900 text-h2">
                Studio
              </h2>
            </TextReveal>

            {[
              {
                city: 'Istanbul (HQ)',
                address: 'Akat Mahallesi, Nispetiye Cad. No:12\nBebek, 34340 Istanbul, Turkey',
                phone: '+90 212 000 0000',
                email: 'istanbul@klayinteriors.com',
              },
              {
                city: 'Dubai',
                address: 'DIFC Gate Building, Level 9\nDubai International Financial Centre\nDubai, UAE',
                phone: '+971 4 000 0000',
                email: 'dubai@klayinteriors.com',
              },
              {
                city: 'London',
                address: '48 Warwick Street\nSoho, London W1B 5NL\nUnited Kingdom',
                phone: '+44 20 0000 0000',
                email: 'london@klayinteriors.com',
              },
            ].map((office, i) => (
              <TextReveal key={office.city} delay={i * 0.1}>
                <div className="border-t border-line pt-8">
                  <p className="text-label tracking-label text-terracotta-500 font-display mb-3">
                    {office.city.toUpperCase()}
                  </p>
                  <address className="not-italic text-ink-700 font-body text-sm leading-relaxed whitespace-pre-line mb-4">
                    {office.address}
                  </address>
                  <div className="flex flex-col gap-2">
                    <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-ink-500 hover:text-terracotta-500 transition-colors duration-300">
                      <Phone size={14} /> {office.phone}
                    </a>
                    <a href={`mailto:${office.email}`} className="flex items-center gap-2 text-sm text-ink-500 hover:text-terracotta-500 transition-colors duration-300">
                      <Mail size={14} /> {office.email}
                    </a>
                  </div>
                </div>
              </TextReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
