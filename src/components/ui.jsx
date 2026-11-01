import { Link } from 'react-router-dom'
import { configured } from '../lib/supabase'
export const Btn = ({ to, href, variant = 'primary', ...p }) =>
  to ? <Link className={`btn ${variant}`} to={to} {...p}/> : href ? <a className={`btn ${variant}`} href={href} {...p}/> : <button className={`btn ${variant}`} {...p}/>
export function State({ status, error, empty, children }) {
  if (status === 'unconfigured') return <div className="note">Supabase is not configured. Copy <code>.env.example</code> to <code>.env</code>, add your project URL and anon key, then restart. See README.</div>
  if (status === 'loading') return <div className="note" role="status">Loading…</div>
  if (status === 'error') return <div className="note err" role="alert">Could not load data: {error}. Check that supabase/schema.sql has been run.</div>
  if (empty) return <div className="note">{empty}</div>
  return children
}
export { configured }

