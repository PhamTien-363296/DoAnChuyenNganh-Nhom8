import { Link } from 'react-router-dom';
import './Header.css'
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function Searchmain() {
    return (
            <header className='header-container'>
                <div className="search-container">
                    <HiMagnifyingGlass className='search-icon'/>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Tìm kiếm..."
                    />
                </div>

                <div className="profile-container" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <Link to="/taikhoan/baiviet"><img src="https://placehold.co/40x40/FF69B4/FFFFFF" style={{borderRadius:'30px'}}/></Link>
                </div>
            </header>
    )
}
