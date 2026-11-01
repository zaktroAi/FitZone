import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
export default function Login() {
  const nav = useNavigate(), location = useLocation(), [email, setEmail] = useState(''), [pw, setPw] = useState(''), [err, setErr] = useState(''), [busy, setBusy] = useState(false)
  if (!supabase) return <div className="note">Supabase is not configured. Add credentials to <code>.env</code> (see README).</div>
  const submit = async e => {
    e.preventDefault(); setBusy(true); setErr('')
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw })
    setBusy(false)
    if (error) setErr(error.message)
    else {
      const destination = location.state?.from?.pathname
      nav(destination?.startsWith('/admin') && destination !== '/admin/login' ? destination : '/admin', { replace: true })
    }
  }
  return <form className="card login" onSubmit={submit}><h1>Admin login</h1>
    <label>Email<input type="email" required value={email} onChange={e => setEmail(e.target.value)} autoComplete="username"/></label>
    <label>Password<input type="password" required value={pw} onChange={e => setPw(e.target.value)} autoComplete="current-password"/></label>
    {err && <p className="err" role="alert">{err}</p>}
    <button className="btn primary" disabled={busy}>{busy ? 'Signing inâ€¦' : 'Sign in'}</button></form>
}





