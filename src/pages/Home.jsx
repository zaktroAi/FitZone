import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useRows } from '../lib/useRows'
import { Btn, State } from '../components/ui'
const WA = import.meta.env.VITE_WHATSAPP_NUMBER
const D = { hero_title: 'Build strength that lasts.', hero_subtitle: 'Coaching, equipment and a community that pushes you further.', about_text: 'FitZone is a training gym for people who want real results. Add your own story in Admin → Content (key: about_text).', address: 'Add your address in Admin → Content (key: address)', hours: 'Mon–Fri 5:30–22:00\nSat–Sun 7:00–19:00' }
export default function Home() {
  const content = useRows('content', { order: 'key' }), programs = useRows('programs', { activeOnly: true }), trainers = useRows('trainers', { activeOnly: true }), plans = useRows('plans', { activeOnly: true })
  const c = { ...D, ...Object.fromEntries(content.rows.map(r => [r.key, r.value])) }
  return <>
    <section className="hero"><h1>{c.hero_title}</h1><p>{c.hero_subtitle}</p><div className="row"><Btn to="/#contact">Join now</Btn><Btn to="/#programs" variant="ghost">Explore programs</Btn></div></section>
    <section id="about" className="sec narrow"><h2>About FitZone</h2><p>{c.about_text}</p></section>
    <section id="programs" className="sec"><h2>Programs</h2><State status={programs.status} error={programs.error} empty={!programs.rows.length && 'Programs will appear here soon.'}><div className="grid">{programs.rows.map(p => <article className="card" key={p.id}><h3>{p.title}</h3><p>{p.description}</p></article>)}</div></State></section>
    <section id="trainers" className="sec"><h2>Trainers</h2><State status={trainers.status} error={trainers.error} empty={!trainers.rows.length && 'Our trainers will be introduced here soon.'}><div className="grid">{trainers.rows.map(t => <article className="card" key={t.id}><div className="avatar" aria-hidden="true">{t.name[0]}</div><h3>{t.name}</h3><em>{t.role}</em><p>{t.bio}</p></article>)}</div></State></section>
    <section id="plans" className="sec"><h2>Membership plans</h2><State status={plans.status} error={plans.error} empty={!plans.rows.length && 'Plans will be published here soon.'}><div className="grid">{plans.rows.map(p => <article className={`card ${p.featured ? 'feat' : ''}`} key={p.id}><h3>{p.name}</h3><p className="price">{p.price}<small> / {p.period}</small></p><ul>{p.features.split('\n').filter(Boolean).map(x => <li key={x}>{x}</li>)}</ul><Btn to={`/?plan=${encodeURIComponent(p.name)}#contact`}>Choose {p.name}</Btn></article>)}</div></State></section>
    <Contact c={c}/>
  </>
}
function Contact({ c }) {
  const [sp] = useSearchParams(), [v, setV] = useState({ name: '', email: '', phone: '', message: '' }), [errs, setErrs] = useState({}), [st, setSt] = useState({ s: 'idle' })
  const plan = sp.get('plan') || ''
  const submit = async e => {
    e.preventDefault()
    const er = {}
    if (v.name.trim().length < 2) er.name = 'Enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(v.email)) er.email = 'Enter a valid email.'
    if (v.message.trim().length < 5) er.message = 'Tell us a little more (5+ characters).'
    setErrs(er); if (Object.keys(er).length) return
    if (!supabase) return setSt({ s: 'error', m: 'Enquiries are unavailable until the site is connected to Supabase.' })
    setSt({ s: 'sending' })
    const { error } = await supabase.from('enquiries').insert({ name: v.name.trim(), email: v.email.trim(), phone: v.phone.trim() || null, plan: plan || null, message: v.message.trim() })
    if (error) setSt({ s: 'error', m: 'Your enquiry was not sent. Please try again or use WhatsApp.' })
    else { setSt({ s: 'ok' }); setV({ name: '', email: '', phone: '', message: '' }) }
  }
  const f = (k, l, t = 'text') => <label>{l}<input type={t} value={v[k]} aria-invalid={!!errs[k]} onChange={e => setV({ ...v, [k]: e.target.value })}/>{errs[k] && <span className="err">{errs[k]}</span>}</label>
  return <section id="contact" className="sec contact"><div><h2>Contact</h2><h3>Opening hours</h3><p className="pre">{c.hours}</p><h3>Location</h3><p>{c.address}</p>
    {WA ? <Btn variant="ghost" href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer">Chat on WhatsApp</Btn> : <p className="note">WhatsApp: set VITE_WHATSAPP_NUMBER to enable.</p>}</div>
    <form className="card" onSubmit={submit} noValidate><h3>{plan ? `Join: ${plan}` : 'Send an enquiry'}</h3>{f('name', 'Name')}{f('email', 'Email', 'email')}{f('phone', 'Phone (optional)', 'tel')}
      <label>Message<textarea rows="4" value={v.message} onChange={e => setV({ ...v, message: e.target.value })}/>{errs.message && <span className="err">{errs.message}</span>}</label>
      <button className="btn primary" disabled={st.s === 'sending'}>{st.s === 'sending' ? 'Sending…' : 'Send enquiry'}</button>
      {st.s === 'ok' && <p className="ok" role="status">Enquiry sent. We will be in touch.</p>}{st.s === 'error' && <p className="err" role="alert">{st.m}</p>}</form></section>
}

