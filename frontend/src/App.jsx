import './App.css'
import Dangky from './components/auth/dangky'
import Dangnhap from './components/auth/dangnhap'
import Navadmin from './components/common/Navadmin'
import Navmain from './components/common/Navmain'
import Sidebar from './components/common/Sidebar'

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
    </>
  )
}

export default App
