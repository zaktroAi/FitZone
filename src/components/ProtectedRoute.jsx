import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import { configured } from '../lib/supabase'

export default function ProtectedRoute() {
  const { session, isAdmin, loading, authError } = useAuth()
  const location = useLocation()

  if (!configured) return <div className="note err" role="alert">Supabase is not configured. Add the project URL and publishable key to <code>.env</code>.</div>
  if (loading) return <div className="note" role="status">Checking access…</div>
  if (!session) return <Navigate to="/admin/login" replace state={{ from: location }} />
  if (authError) return <div className="note err" role="alert">{authError}</div>
  if (!isAdmin) return <div className="note err" role="alert">This account is not authorised as an admin.</div>
  return <Outlet />
}

