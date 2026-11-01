
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function Dashboard() {
  const [c, setC] = useState(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    const tables = ['plans', 'trainers', 'programs', 'enquiries']

    Promise.all([
      ...tables.map(n =>
        supabase.from(n).select('*', { count: 'exact', head: true })
      ),
      supabase.from('enquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new')
    ]).then(rs => {
      const bad = rs.find(r => r.error)

      if (bad) {
        setErr(bad.error.message)
      } else {
        setC({
          plans: rs[0].count,
          trainers: rs[1].count,
          programs: rs[2].count,
          enquiries: rs[3].count,
          fresh: rs[4].count
        })
      }
    })
  }, [])

  if (err) return <div className="note err">{err}</div>
  if (!c) return <div className="note">Loading…</div>

  return (
    <>
      <h1>Dashboard</h1>
      <div className="stats">
        {[
          ['Plans', c.plans],
          ['Trainers', c.trainers],
          ['Programs', c.programs],
          ['Enquiries', c.enquiries],
          ['New enquiries', c.fresh]
        ].map(([label, value]) => (
          <div className="card" key={label}>
            <b>{value}</b>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </>
  )
}

