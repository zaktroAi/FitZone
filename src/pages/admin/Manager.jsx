import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRows } from '../../lib/useRows'
import { State } from '../../components/ui'
export default function Manager({ title, table, fields, cols, filter, pk = 'id', noCreate, order = 'sort' }) {
  const { rows, status, error, reload } = useRows(table, { order })
  const [q, setQ] = useState(''), [f, setF] = useState(''), [edit, setEdit] = useState(null), [del, setDel] = useState(null), [msg, setMsg] = useState(null), [busy, setBusy] = useState(false)
  const shown = rows.filter(r => (!f || String(r[filter.k]) === f) && JSON.stringify(r).toLowerCase().includes(q.toLowerCase()))
  const blank = Object.fromEntries(fields.map(([k, , t]) => [k, t === 'bool' ? true : t === 'number' ? 0 : '']))
  const run = async (fn, ok) => {
    setBusy(true); setMsg(null)
    const { error } = await fn()
    setBusy(false)
    if (error) setMsg({ t: 'err', m: error.message }); else { setMsg({ t: 'ok', m: ok }); setEdit(null); setDel(null); reload() }
  }
  const save = e => {
    e.preventDefault()
    const v = Object.fromEntries(fields.map(([k, , t]) => [k, t === 'number' ? Number(edit.v[k]) : edit.v[k]]))
    run(() => edit.id ? supabase.from(table).update(v).eq(pk, edit.id).select() : supabase.from(table).insert(v).select(), 'Saved.')
  }
  return <>
    <div className="bar"><h1>{title}</h1>{!noCreate && <button className="btn primary" onClick={() => setEdit({ v: blank })}>Add new</button>}</div>
    <div className="bar"><input placeholder="Search…" aria-label="Search" value={q} onChange={e => setQ(e.target.value)}/>
      {filter && <select aria-label="Filter" value={f} onChange={e => setF(e.target.value)}><option value="">All</option>{filter.options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>}</div>
    {msg && <p className={msg.t === 'ok' ? 'ok' : 'err'} role="status">{msg.m}</p>}
    <State status={status} error={error} empty={shown.length === 0 && 'No records found.'}>
      <div className="scroll"><table><thead><tr>{cols.map(c => <th key={c}>{c}</th>)}<th>Actions</th></tr></thead><tbody>
        {shown.map(r => <tr key={r[pk]}>{cols.map(c => <td key={c}>{String(r[c] ?? '')}</td>)}
          <td><button className="btn ghost" onClick={() => setEdit({ id: r[pk], v: Object.fromEntries(fields.map(([k]) => [k, r[k] ?? ''])) })}>Edit</button> <button className="btn ghost" onClick={() => setDel(r)}>Delete</button></td></tr>)}
      </tbody></table></div>
    </State>
    {edit && <div className="modal"><form className="card" onSubmit={save}><h2>{edit.id ? 'Edit' : 'New'} record</h2>
      {fields.map(([k, l, t, opts]) => <label key={k}>{l}
        {t === 'textarea' ? <textarea rows="4" value={edit.v[k]} onChange={e => setEdit({ ...edit, v: { ...edit.v, [k]: e.target.value } })}/>
          : t === 'bool' ? <input type="checkbox" checked={!!edit.v[k]} onChange={e => setEdit({ ...edit, v: { ...edit.v, [k]: e.target.checked } })}/>
          : t === 'select' ? <select value={edit.v[k]} onChange={e => setEdit({ ...edit, v: { ...edit.v, [k]: e.target.value } })}>{opts.map(o => <option key={o}>{o}</option>)}</select>
          : <input required type={t || 'text'} value={edit.v[k]} onChange={e => setEdit({ ...edit, v: { ...edit.v, [k]: e.target.value } })}/>}</label>)}
      <div className="bar"><button className="btn primary" disabled={busy}>{busy ? 'Saving…' : 'Save'}</button><button type="button" className="btn ghost" onClick={() => setEdit(null)}>Cancel</button></div></form></div>}
    {del && <div className="modal" role="alertdialog" aria-modal="true"><div className="card"><h2>Delete this record?</h2><p>This cannot be undone.</p>
      <div className="bar"><button className="btn primary" disabled={busy} onClick={() => run(() => supabase.from(table).delete().eq(pk, del[pk]), 'Deleted.')}>{busy ? 'Deleting…' : 'Delete'}</button><button className="btn ghost" onClick={() => setDel(null)}>Cancel</button></div></div></div>}
  </>
}

