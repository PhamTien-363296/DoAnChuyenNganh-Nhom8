import './App.css'
import { Routes, Route } from 'react-router-dom';

import Dangky from './components/auth/dangky'
import Dangnhap from './components/auth/dangnhap'
import Navadmin from './components/common/Navadmin'
import Navmain from './components/common/Navmain'
import Sidebar from './components/common/Sidebar'
import Trangchu from './components/pages/sidebar/Trangchu';
import Tintuc from './components/pages/sidebar/Tintuc';
import Tinnhan from './components/pages/sidebar/Tinnhan';

function App() {
  return (
    <>
      <p className="read-the-docs">
        Chào năm mới các bạn lần 2 nè
      </p>
      <Dangky/>
      <Dangnhap/>
      <Navadmin/>
      <Navmain/>
      <Sidebar/>
      <Routes>
        <Route path="/" element={<Trangchu/>}/>
        <Route path="/tintuc" element={<Tintuc/>}/>
        <Route path="/tinnhan" element={<Tinnhan/>}/>
      </Routes>
      
    </>
  )
}

export default App
