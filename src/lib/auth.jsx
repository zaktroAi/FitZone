import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase'
const Ctx = createContext({})
export const useAuth = () => useContext(Ctx)
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [checkingSession, setCheckingSession] = useState(Boolean(supabase))
  const [checkingAdmin, setCheckingAdmin] = useState(false)
  const [authError, setAuthError] = useState('')
  useEffect(() => {
    if (!supabase) return
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setCheckingSession(false)
    })
    return () => data.subscription.unsubscribe()
  }, [])
  useEffect(() => {
    if (!supabase) return
    if (!session) {
      setIsAdmin(false)
      setAuthError('')
      setCheckingAdmin(false)
      return
    }
    let active = true
    setCheckingAdmin(true)
    setAuthError('')
    // RLS on admins only exposes the signed-in user's own row.
    supabase.from('admins').select('user_id').eq('user_id', session.user.id).maybeSingle()
      .then(({ data, error }) => {
        if (!active) return
        setIsAdmin(Boolean(data) && !error)
        setAuthError(error ? 'Could not verify admin access. Check the Supabase admins table and RLS policies.' : '')
        setCheckingAdmin(false)
      })
    return () => { active = false }
  }, [session])
  const signOut = () => supabase?.auth.signOut()
  return <Ctx.Provider value={{ session, isAdmin, loading: checkingSession || checkingAdmin, authError, signOut }}>{children}</Ctx.Provider>
}

