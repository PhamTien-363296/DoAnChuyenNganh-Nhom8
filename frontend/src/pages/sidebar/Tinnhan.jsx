import Sidebar from '../../components/common/Sidebar'
import Searchmain from '../../components/common/Searchmain';

export default function Tinnhan() {
    return (
        <div className='container'> 
        <Sidebar />
        <div className='main'>
            <Searchmain />
            <div className='content'>
                <p>Tin nhắn</p>
            </div>
        </div>
    </div>
    )
}
