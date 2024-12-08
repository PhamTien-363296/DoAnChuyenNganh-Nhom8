import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';

function ListTheloaiHome() {
    const [theloais, setTheloai] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/theloai');
                const theloaiName = [{ id: 'all', name: 'Tất cả' }, ...response.data.map(theloai => ({
                    id: theloai._id,
                    name: theloai.tieuDeTheLoai,
                }))];
                setTheloai(theloaiName);
            } catch (error) {
                console.error("There was an error fetching the categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (theloaiId, theloaiName) => {
        const formattedName = theloaiName.replace(/\s+/g, '-').toLowerCase();
        navigate(`/theloai/${formattedName}?loc=phobien&trang=1&sao=tatca&tinhtrang=tatca`, { state: { theloaiId } });
    };

    return (
        <>
            {theloais.slice(0, 6).map((theloai, index) => (
                <button 
                    key={index} 
                    onClick={() => handleCategoryClick(theloai.id, theloai.name)}
                >
                    {theloai.name}
                </button>
            ))}
        </>
    );
}

export default ListTheloaiHome;
