import { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { Btn } from './ui'
export function PublicLayout() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  useEffect(() => { if (loc.hash) setTimeout(() => document.getElementById(loc.hash.slice(1))?.scrollIntoView(), 50) }, [loc])
  const links = [['About','/#about'],['Programs','/#programs'],['Trainers','/#trainers'],['Plans','/#plans'],['Contact','/#contact']]
  return <>
    <header className="nav"><Link to="/" className="logo">FIT<b>ZONE</b></Link>
      <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>â˜°</button>
      <nav className={open ? 'open' : ''}>{links.map(([t, h]) => <a key={t} href={h} onClick={() => setOpen(false)}>{t}</a>)}<Btn to="/#contact">Join now</Btn></nav>
    </header>
    <main><Outlet/></main>
    <footer className="footer"><div><Link to="/" className="logo">FIT<b>ZONE</b></Link><p>Train hard. Stay consistent.</p></div>
      <div>{links.map(([t, h]) => <a key={t} href={h}>{t}</a>)}</div><div><Link to="/admin">Staff login</Link><p>Â© {new Date().getFullYear()} FitZone</p></div></footer>
  </>
}
export function AdminLayout() {
  const { signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const items = [['/admin','Dashboard'],['/admin/plans','Plans'],['/admin/trainers','Trainers'],['/admin/programs','Programs'],['/admin/enquiries','Enquiries'],['/admin/content','Content']]
  return <div className="admin">
    <aside className={open ? 'open' : ''}><Link to="/" className="logo">FIT<b>ZONE</b></Link>
      {items.map(([to, t]) => <NavLink key={to} end={to === '/admin'} to={to} onClick={() => setOpen(false)}>{t}</NavLink>)}
      <button className="btn ghost" onClick={signOut}>Sign out</button></aside>
    <section><button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>â˜°</button><Outlet/></section>
  </div>
}


