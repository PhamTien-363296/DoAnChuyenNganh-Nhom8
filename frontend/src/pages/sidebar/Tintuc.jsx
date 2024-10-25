import Sidebar from '../../components/common/Sidebar'
import Searchmain from '../../components/common/Searchmain';

export default function Tintuc() {
    return (
        <div className='container'> 
            <Sidebar />
            <div className='main'>
                <Searchmain />
                <div className='content'>
                    <p>Tin tức</p>
                </div>
            </div>
        </div>
    )
}
