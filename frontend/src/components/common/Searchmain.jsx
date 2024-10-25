import '../../assets/css/Searchmain.css'
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function Searchmain() {
    return (
        <>
            <header>
                <div className="search-container">
                    <HiMagnifyingGlass className='search-icon'/>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Tìm kiếm..."
                    />
                </div>

                <div className="profile-container">
                </div>
            </header>
        </>
    )
}
