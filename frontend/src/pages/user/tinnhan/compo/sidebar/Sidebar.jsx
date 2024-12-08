import SearchBar from "../search/SearchBar";
import "./Sidebar.css";
import Cachoithoai from "./Cachoithoai";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <SearchBar /> 
            <Cachoithoai/>
        </div>
    );
}
