import { useCallback, useEffect, useState } from 'react'
import { supabase } from './supabase'
export function useRows(table, { activeOnly = false, order = 'sort' } = {}) {
  const [rows, setRows] = useState([]), [status, setStatus] = useState(supabase ? 'loading' : 'unconfigured'), [error, setError] = useState('')
  const load = useCallback(async () => {
    if (!supabase) return
    setStatus('loading')
    let q = supabase.from(table).select('*').order(order, { ascending: order !== 'created_at' })
    if (activeOnly) q = q.eq('active', true)
    const { data, error } = await q
    if (error) { setError(error.message); setStatus('error') } else { setRows(data); setStatus('ready') }
  }, [table, activeOnly, order])
  useEffect(() => { load() }, [load])
  return { rows, status, error, reload: load }
}

