import Navadmin from '../../../components/admin/navigation/Navadmin'
import './style.css'
import { useState, useEffect } from "react";
import axios from 'axios';
import moment from 'moment';
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

function Theloai() {
    const [theloais, setTheloai] = useState([]);
    const [hienthiThem, setHienthiThem] = useState(false);

    const xulyThem = () => {
        setHienthiThem(prev => !prev);
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('#button_themtheloai') && !event.target.closest('#ThemTheloai')) {
            setHienthiThem(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/theloai');
                const theloaiName = response.data.map(theloai => ({
                    id: theloai._id,
                    tieuDeTheLoai: theloai.tieuDeTheLoai,
                    createdAt:theloai.createdAt,
                    updatedAt:theloai.updatedAt
                }));
                setTheloai(theloaiName);
            } catch (error) {
                console.error("Lỗi:", error);
            }
        };

        fetchCategories();
    }, []);
    return (
        <Navadmin>
            <div className='admin-theloai'>
                <div className='admin-theloai-tieude'>
                    <p>Danh sách thể loại</p>
                    <div id='button_themtheloai' onClick={xulyThem}>
                        Thêm thể loại
                    </div>
                </div>
                <div className='admin-theloai-noidung'>
                    <table>
                        <thead>
                            <tr className="table-header">
                                <th>Số</th>
                                <th>Tên Thể Loại</th>
                                <th>Ngày tạo</th>
                                <th>Ngày cập nhật</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {theloais.map((theloai, index) => (
                                <tr key={index} className="table-row">
                                    <td>{index+1}</td>
                                    <td>{theloai.tieuDeTheLoai}</td>
                                    <td>{moment(theloai.createdAt).format('DD/MM/YYYY HH:mm:ss')}</td>
                                    <td>{moment(theloai.updatedAt).format('DD/MM/YYYY HH:mm:ss')}</td>
                                    <td>
                                        <div className="text-center">
                                            <FaRegEdit  id='button_suatheloai'/>
                                            <AiOutlineDelete id='button_xoatheloai'/>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {hienthiThem && (
                    <div id="ThemTheloai" className="">
                        <div className="header">
                            <h2>THÊM THỂ LOẠI</h2>
                        </div>
                        <div className="content">
                            <p className="">Chưa có đơn hàng nào</p>
                        </div>
                    </div>
                )}
        </Navadmin>
    )
}

export default Theloai