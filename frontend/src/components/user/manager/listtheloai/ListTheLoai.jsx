import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';

function ListTheloai({theloaiId}) {
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
                console.error("Lỗi:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (theloaiId, theloaiName) => {
        navigate(`/theloai/${theloaiName.replace(/\s+/g, '-').toLowerCase()}?loc=phobien&trang=1&sao=tatca&tinhtrang=tatca`, { state: { theloaiId } });
    };

    return (
        <>
            {theloais.map((theloai, index) => (
                <button 
                    key={index} 
                    className={`theloai-button ${theloai.id === theloaiId ? 'chon' : ''}`}
                    onClick={() => handleCategoryClick(theloai.id, theloai.name)}
                >
                    {theloai.name}
                </button>
            ))}
        </>
    );
}

ListTheloai.propTypes = {
    theloaiId: PropTypes.string,
};

export default ListTheloai;
