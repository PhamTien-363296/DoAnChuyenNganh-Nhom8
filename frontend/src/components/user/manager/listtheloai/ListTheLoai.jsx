import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';

function ListTheloaiHome() {
    const [theloais, setTheloai] = useState([]);
    const navigate = useNavigate(); // Hook để điều hướng

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/theloai');
                // Thêm phần tử 'Tất cả' vào đầu mảng
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
        // Điều hướng đến trang chi tiết thể loại với ID thể loại và tên thể loại trong URL
        navigate(`/theloai/${theloaiName.replace(/\s+/g, '-').toLowerCase()}`, { state: { theloaiId } });
    };

    return (
        <>
            {theloais.map((theloai, index) => (
                <button 
                    key={index} 
                    onClick={() => handleCategoryClick(theloai.id, theloai.name)} // Điều hướng khi bấm vào thể loại
                >
                    {theloai.name}
                </button>
            ))}
        </>
    );
}

export default ListTheloaiHome;
