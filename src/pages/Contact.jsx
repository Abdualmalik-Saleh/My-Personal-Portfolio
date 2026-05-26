/**
 * Contact.jsx — Route: /contact
 * Two-column layout:
 *   LEFT  — Contact info (email, phone, location) + social icons
 *   RIGHT — Gradient-border contact form with validation
 */

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaEnvelope, FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
import GradientCard from '../components/GradientCard';
import SectionWrapper from '../components/SectionWrapper';
import PageHeading from '../components/PageHeading';

// ── Social icon SVGs ──────────────────────────────────────────────────────────
const SocialIcon = ({ icon }) => {
  const map = {
    github: <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />,
    linkedin: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
  };
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      {map[icon]}
    </svg>
  );
};

// ── Input / Textarea field ────────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-white">{label}</label>
      {children}
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
}

const inputBase =
  'w-full rounded-full border border-blue-500/25 bg-navy-800/80 px-5 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/30';
const textareaBase =
  'w-full rounded-2xl border border-blue-500/25 bg-navy-800/80 px-5 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/30 resize-none';

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Contact() {
  const { t } = useLanguage();

  const [form,    setForm]    = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = t('Name is required.', 'الاسم مطلوب.');
    if (!form.email.trim())   e.email   = t('Email is required.', 'البريد الإلكتروني مطلوب.');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = t('Enter a valid email.', 'أدخل بريداً إلكترونياً صالحاً.');
    if (!form.message.trim()) e.message = t('Message is required.', 'الرسالة مطلوبة.');
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setErrors({});
    setSuccess(false);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '74157520-98a4-44a7-8a36-220b4dc57a11',
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          message: form.message,
        }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setSuccess('success');
        setForm({ name: '', email: '', phone: '', company: '', message: '' });
      } else {
        setSuccess('error');
      }
    } catch {
      setSuccess('error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  return (
    <SectionWrapper>
      {/* Orbs */}
      <div className="orb -start-40 top-0 h-[500px] w-[500px] bg-blue-600/15" />
      <div className="orb -end-20 bottom-20 h-[400px] w-[400px] bg-rose-600/10" />

      <div className="relative">
        <PageHeading
          badge={t("Let's Talk", 'لنتحدث')}
          title={t('Contact Us', 'تواصل معي')}
          subtitle={t(
            "Have a project in mind? Let's connect and discuss how I can help bring your ideas to life.",
            'هل لديك مشروع في ذهنك؟ دعنا نتواصل ونناقش كيف يمكنني مساعدتك في تحقيق أفكارك.'
          )}
        />

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.5fr]">

          {/* ── Left: Info ──────────────────────────────────── */}
          <div className="flex flex-col gap-6 pt-2">
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              {t('Get in touch today', 'تواصل اليوم')}
            </h2>
            <p className="text-base leading-relaxed text-slate-400">
              {t(
                "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
                'أنا دائماً منفتح على مناقشة المشاريع الجديدة والأفكار الإبداعية أو الفرص لأكون جزءاً من رؤيتك.'
              )}
            </p>

            {/* Contact detail items */}
            <ul className="flex flex-col gap-4">
              {[
                {
                  icon: <FaEnvelope className="h-4 w-4" />,
                  label: t('Email', 'البريد الإلكتروني'),
                  value: 'abdehsaleh77aash@gmail.com',
                  href: 'mailto:abdehsaleh77aash@gmail.com',
                  target: null,
                },
                {
                  icon: <FaWhatsapp className="h-4 w-4" />,
                  label: t('WhatsApp', 'واتساب'),
                  value: '+967 774 305 505',
                  href: 'https://wa.me/967774305505?text=مرحباً عبدالملك، لدي مشروع أريد مناقشته',
                  target: '_blank',
                },
                {
                  icon: <FaPhoneAlt className="h-4 w-4" />,
                  label: t('Phone Call', 'اتصال'),
                  value: '+967 774 305 505',
                  href: 'tel:+967774305505',
                  target: null,
                },
              ].map((item) => (
                <li key={item.href} className="flex items-start gap-3">
                  <a
                    href={item.href}
                    target={item.target || undefined}
                    rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-3 text-sm text-slate-300 transition-colors hover:text-blue-400 group"
                  >
                    <span
                      className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-white transition-colors group-hover:border-blue-500/50 group-hover:bg-blue-500/20"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                    <div className="pt-0.5 flex flex-col">
                      <span className="text-xs text-slate-500 font-semibold">{item.label}</span>
                      <span className="text-sm font-semibold text-slate-300 transition-colors group-hover:text-blue-400" dir="ltr">
                        {item.value}
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            {/* Social buttons */}
            <div className="flex gap-3 flex-wrap">
              {[
                { id: 'github', label: 'GitHub', href: 'https://github.com/Abdualmalik-Saleh', icon: 'github' },
                { id: 'linkedin', label: 'LinkedIn', href: 'www.linkedin.com/in/dev-abdulmalik-al-salemi/', icon: 'linkedin' }
              ].map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-white transition-all hover:bg-gradient-to-br hover:from-blue-500 hover:to-rose-500 hover:border-transparent hover:-translate-y-0.5"
                >
                  <SocialIcon icon={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: Form ─────────────────────────────────── */}
          <GradientCard noHover>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5 p-8"
              aria-label={t('Contact form', 'نموذج التواصل')}
            >
              {/* Name + Email row */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label={t('Name', 'الاسم')} error={errors.name}>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="اكتب اسمك هنا"
                    autoComplete="name"
                    className={[inputBase, errors.name ? 'border-rose-500/60' : ''].join(' ')}
                  />
                </Field>
                <Field label={t('Email', 'البريد الإلكتروني')} error={errors.email}>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    autoComplete="email"
                    className={[inputBase, errors.email ? 'border-rose-500/60' : ''].join(' ')}
                  />
                </Field>
              </div>

              {/* Phone + Company row */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label={t('Phone', 'الهاتف')}>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="اكتب رقم الهاتف مع مفتاح الدولة"
                    autoComplete="tel"
                    className={inputBase}
                    dir="ltr"
                  />
                </Field>
                <Field label={t('Company', 'الشركة او الجهة')}>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder={t('Your Company', 'شركتك او جهتك')}
                    autoComplete="organization"
                    className={inputBase}
                  />
                </Field>
              </div>

              {/* Message */}
              <Field label={t('Message', 'الرسالة')} error={errors.message}>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder={t('Please type your message here...', 'اكتب رسالتك هنا...')}
                  className={[textareaBase, errors.message ? 'border-rose-500/60' : ''].join(' ')}
                />
              </Field>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-rose-500 py-4 text-sm font-bold text-white shadow-glow-blue transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {t('Sending...', 'جاري الإرسال...')}
                  </>
                ) : (
                  <>
                    {t('Send message', 'إرسال الرسالة')}
                    <span aria-hidden="true">✉</span>
                  </>
                )}
              </button>

              {/* Success message */}
              {success === 'success' && (
                <div
                  role="alert"
                  className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-400"
                >
                  <span aria-hidden="true" className="text-lg">✓</span>
                  <span className="text-sm font-medium">
                    {t(
                      "Message sent successfully! I'll get back to you soon.",
                      'تم إرسال الرسالة بنجاح! سيتم الرد عليك في اقرب وقت.'
                    )}
                  </span>
                </div>
              )}

              {/* Error message */}
              {success === 'error' && (
                <div
                  role="alert"
                  className="flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-400"
                >
                  <span aria-hidden="true" className="text-lg">✕</span>
                  <span className="text-sm font-medium">
                    {t(
                      'Something went wrong. Please try again or email me directly.',
                      'حدث خطأ ما. يرجى المحاولة مرة أخرى أو مراسلتي مباشرة.'
                    )}
                  </span>
                </div>
              )}
            </form>
          </GradientCard>
        </div>
      </div>
    </SectionWrapper>
  );
}
