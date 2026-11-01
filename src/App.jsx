import { Routes, Route, Navigate } from 'react-router-dom'
import { PublicLayout, AdminLayout } from './components/Layouts'
import Home from './pages/Home'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Manager from './pages/admin/Manager'
import ProtectedRoute from './components/ProtectedRoute'
const T = (title, table, fields, cols, filter, extra = {}) => <Manager title={title} table={table} fields={fields} cols={cols} filter={filter} {...extra}/>
const active = { k: 'active', options: [['true','Active'],['false','Hidden']] }
export default function App() {
  return <Routes>
    <Route element={<PublicLayout/>}><Route index element={<Home/>}/></Route>
    <Route path="/admin/login" element={<Login/>}/>
    <Route element={<ProtectedRoute/>}>
    <Route path="/admin" element={<AdminLayout/>}>
      <Route index element={<Dashboard/>}/>
      <Route path="plans" element={T('Plans','plans',[['name','Name'],['price','Price','number'],['period','Period'],['features','Features (one per line)','textarea'],['sort','Sort order','number'],['featured','Featured','bool'],['active','Active','bool']],['name','price','period','active'],active)}/>
      <Route path="trainers" element={T('Trainers','trainers',[['name','Name'],['role','Role'],['bio','Bio','textarea'],['sort','Sort order','number'],['active','Active','bool']],['name','role','active'],active)}/>
      <Route path="programs" element={T('Programs','programs',[['title','Title'],['description','Description','textarea'],['sort','Sort order','number'],['active','Active','bool']],['title','active'],active)}/>
      <Route path="enquiries" element={T('Enquiries','enquiries',[['status','Status','select',['new','contacted','closed']]],['name','email','plan','message','status','created_at'],{ k: 'status', options: [['new','New'],['contacted','Contacted'],['closed','Closed']] },{ readOnlyFields: true, noCreate: true, order: 'created_at' })}/>
      <Route path="content" element={T('Content','content',[['key','Key (e.g. hero_title, hero_subtitle, about_text, address, hours)'],['value','Value','textarea']],['key','value'],null,{ pk: 'key', order: 'key' })}/>
    </Route>
    </Route>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes>
}


