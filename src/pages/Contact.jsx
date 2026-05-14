import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react';
import { InstagramIcon as Instagram } from '../components/Icons';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerChild } from '../animations/variants';
import { getWhatsAppLink } from '../hooks/useWhatsApp';

/* ─── Data ─────────────────────────────────────── */
const contactItems = [
  { Icon: MessageCircle, label: 'WhatsApp',  value: '+92 329 4954385', href: null,  isWA: true },
  { Icon: Mail,          label: 'Email',     value: 'sufraahpk@gmail.com', href: 'mailto:sufraahpk@gmail.com' },
  { Icon: Instagram,     label: 'Instagram', value: '@sufrah.pk_',       href: 'https://www.instagram.com/sufrah.pk_?igsh=MWFxaHg4Y2ZseTlsaw%3D%3D&utm_source=qr' },
  { Icon: MapPin,        label: 'Location',  value: 'Lahore, Pakistan', href: null },
];

const hours = [
  { day: 'Monday — Friday', time: '10:00 AM — 8:00 PM' },
  { day: 'Saturday',        time: '11:00 AM — 6:00 PM' },
  { day: 'Sunday',          time: 'By Appointment Only' },
];

/* ─── Reusable gold rule ────────────────────────── */
function GoldRule({ center = false }) {
  return (
    <div
      className="gold-line mb-5"
      style={{ marginLeft: center ? 'auto' : undefined, marginRight: center ? 'auto' : undefined }}
    />
  );
}

/* ─── Field wrapper ─────────────────────────────── */
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-overline text-taupe"
        style={{ fontSize: '9px' }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE COMPONENT
═══════════════════════════════════════════════ */
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Assalam-o-Alaikum!\n\nName: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`;
    window.open(getWhatsAppLink(null, msg), '_blank');
    setSubmitted(true);
  };

  return (
    <div className="pt-24 md:pt-28">

      {/* ══════════════════════════════════
           1. HERO — centered
      ══════════════════════════════════ */}
      <section className="section-luxury">
        <div className="container-maison">
          {/* Guaranteed-center wrapper — inline styles override any cascade */}
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              {/* Gold rule — centered via auto margins on a block element */}
              <div
                style={{
                  width: '3rem',
                  height: '1px',
                  backgroundColor: 'var(--color-gold)',
                  margin: '0 auto 1.25rem',
                }}
              />
              <p className="text-overline text-gold" style={{ marginBottom: '0.75rem' }}>
                Get in Touch
              </p>
              <h1
                className="text-collection text-obsidian"
                style={{ textAlign: 'center', marginBottom: '1.25rem' }}
              >
                We'd Love to{' '}
                <em className="italic font-light">Hear From You</em>
              </h1>
              <p
                className="text-body"
                style={{ textAlign: 'center', maxWidth: '440px', margin: '0 auto' }}
              >
                Whether you have a question about a specific piece, need styling advice,
                or wish to discuss a custom creation — our team is here for you.
              </p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════
           2. CONTACT STRIP
      ══════════════════════════════════ */}
      <section style={{ paddingBottom: 0 }}>
        <div className="container-maison">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="contact-strip"
          >
            {contactItems.map(({ Icon, label, value, href, isWA }, i) => {
              const resolvedHref = isWA ? getWhatsAppLink() : href;

              const cell = (
                <motion.div
                  variants={staggerChild}
                  className="contact-cell group"
                >
                  <Icon
                    size={20}
                    className="text-gold mb-3 transition-transform duration-500 group-hover:scale-110"
                  />
                  <p className="text-overline text-taupe mb-1">{label}</p>
                  <p className="font-serif font-light text-obsidian text-base group-hover:text-gold transition-colors duration-300">
                    {value}
                  </p>
                </motion.div>
              );

              return resolvedHref ? (
                <a key={i} href={resolvedHref} target="_blank" rel="noopener noreferrer">
                  {cell}
                </a>
              ) : (
                <div key={i}>{cell}</div>
              );
            })}
          </motion.div>
        </div>
      </section>


      {/* ══════════════════════════════════
           3. FORM + SIDEBAR
      ══════════════════════════════════ */}
      <section className="section-luxury" style={{ backgroundColor: 'rgba(242,237,229,0.4)' }}>
        <div className="container-maison">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

            {/* ──── FORM  (3 cols) ──── */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <GoldRule />
              <p className="text-overline text-gold mb-3">Send a Message</p>
              <h2
                className="font-serif font-light text-obsidian mb-8"
                style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.2 }}
              >
                Let's Start a <em className="italic">Conversation</em>
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center text-center py-16"
                  style={{ border: '1px solid rgba(198,167,105,0.2)' }}
                >
                  <GoldRule center />
                  <p className="font-serif text-gold mb-3" style={{ fontSize: '1.5rem' }}>Message Sent</p>
                  <p className="text-body text-sm" style={{ maxWidth: '280px' }}>
                    Your message has been sent via WhatsApp. We'll respond shortly.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col"
                  style={{ gap: '1.75rem' }}
                >
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: '1.75rem' }}>
                    <Field label="Your Name *">
                      <input type="text" value={form.name} onChange={set('name')} placeholder="Enter your name" className="input-maison" required />
                    </Field>
                    <Field label="Email Address *">
                      <input type="email" value={form.email} onChange={set('email')} placeholder="Enter your email" className="input-maison" required />
                    </Field>
                  </div>

                  {/* Subject */}
                  <Field label="Subject *">
                    <input type="text" value={form.subject} onChange={set('subject')} placeholder="How can we help?" className="input-maison" required />
                  </Field>

                  {/* Message */}
                  <Field label="Message *">
                    <textarea
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Tell us more about what you're looking for..."
                      rows={5}
                      className="input-maison"
                      style={{ resize: 'none', lineHeight: '1.8' }}
                      required
                    />
                  </Field>

                  {/* Submit */}
                  <div style={{ paddingTop: '0.25rem' }}>
                    <button type="submit" className="btn-maison">
                      <span>Send via WhatsApp</span>
                      <MessageCircle size={14} style={{ position: 'relative', zIndex: 1 }} />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

            {/* ──── SIDEBAR  (2 cols) ──── */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 flex flex-col"
              style={{ gap: '2.5rem' }}
            >

              {/* Working Hours */}
              <div>
                <GoldRule />
                <p className="text-overline text-gold mb-3">Working Hours</p>
                <h3
                  className="font-serif font-light text-obsidian"
                  style={{ fontSize: '1.5rem', lineHeight: 1.2, marginBottom: '1.5rem' }}
                >
                  We're Here <em className="italic">For You</em>
                </h3>
                <div>
                  {hours.map(({ day, time }, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center"
                      style={{
                        padding: '0.875rem 0',
                        borderBottom: '1px solid rgba(198,167,105,0.1)',
                        borderTop: i === 0 ? '1px solid rgba(198,167,105,0.1)' : 'none',
                      }}
                    >
                      <span style={{ fontSize: '0.875rem', color: 'var(--color-obsidian)', fontWeight: 300 }}>
                        {day}
                      </span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--color-taupe)' }}>
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact — Obsidian panel, theme-consistent */}
              <div style={{ backgroundColor: 'var(--color-obsidian)', padding: '2rem' }}>
                <div
                  className="gold-line"
                  style={{ marginBottom: '1.25rem' }}
                />
                <p className="text-overline text-gold mb-3">Quick Response</p>
                <p
                  className="font-serif font-light"
                  style={{ fontSize: '1.25rem', color: 'white', lineHeight: 1.3, marginBottom: '0.75rem' }}
                >
                  Need Immediate Help?
                </p>
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: 'rgba(255,255,255,0.4)',
                    lineHeight: 1.7,
                    marginBottom: '1.5rem',
                  }}
                >
                  Our team responds within minutes during working hours.
                </p>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-maison"
                  style={{
                    display: 'inline-flex',
                    width: '100%',
                    justifyContent: 'center',
                    backgroundColor: 'var(--color-gold)',
                    color: 'var(--color-obsidian)',
                  }}
                >
                  <MessageCircle size={14} style={{ position: 'relative', zIndex: 1 }} />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
