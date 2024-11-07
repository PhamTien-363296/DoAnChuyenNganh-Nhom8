import Navadmin from '../../../components/admin/navigation/Navadmin'
import './style.css'
import { useState, useEffect } from "react";
import axios from 'axios';
import moment from 'moment';
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { Toaster, toast } from 'react-hot-toast';

function Theloai() {
    const [theloais, setTheloai] = useState([]);
    const [hienthiThem, setHienthiThem] = useState(false);
    const [hienthiSua, setHienthiSua] = useState(false);
    const [formData, setFormData] = useState({tieuDeTheLoai: ''});
    const [idSuaTheloai, setIdSuaTheloai] = useState(null);

    const xulyThem = () => {
        setHienthiThem(prev => !prev);
    };

    const xulySua = (theloai) => {
        setFormData({
            tieuDeTheLoai: theloai.tieuDeTheLoai,
        });
        setIdSuaTheloai(theloai.id);
        setHienthiSua(true);
    };

    const xulyXoa = async (theloai) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa thể loại này?");
        if (!confirmDelete) return;
    
        try {
            const response = await axios.delete(`/api/theloai/${theloai.id}`);
            if (response.status === 200) {
                toast.success("Xóa thành công!", { duration: 2000 });
                layTatcaTheloai();
            } else {
                alert("Có lỗi xảy ra khi xóa thể loại, vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi khi xóa thể loại:", error);
            alert("Lỗi khi xóa thể loại: " + (error.response?.data?.message || error.message));
        }
    };  
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        layTatcaTheloai();
    }, []);

    const layTatcaTheloai = async () => {
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

    const handleSubmitThem = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/theloai/them', formData);
            if (response.status === 201) {
                toast.success("Thêm thành công!", { duration: 2000 });
                setFormData({ tieuDeTheLoai: '' });
                setHienthiThem(false);
                layTatcaTheloai();
            } else {
                alert("Có lỗi xảy ra khi thêm thể loại, vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi khi thêm thể loại:", error);
            alert("Lỗi khi thêm thể loại: " + (error.response?.data?.message || error.message));
        }
    };

    const handleSubmitSua = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`/api/theloai/sua/${idSuaTheloai}`, formData);
            if (response.status === 200 || response.status === 204) {
                toast.success("Sửa thành công!", { duration: 2000 });
                setFormData({ tieuDeTheLoai: '' });
                setHienthiSua(false);
                layTatcaTheloai();
            } else {
                alert("Có lỗi xảy ra khi sửa dịch vụ, vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi khi sửa thể loại:", error);
            alert("Lỗi khi sửa thể loại: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <Navadmin>
            <Toaster /> 
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
                                            <FaRegEdit  id='button_suatheloai' onClick={() => xulySua(theloai)}/>
                                            <AiOutlineDelete id='button_xoatheloai' onClick={() => xulyXoa(theloai)}/>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {hienthiThem && (
                    <div id="ThemTheloai">
                        <div className="header">
                            <h2>THÊM THỂ LOẠI</h2>
                            <button type="button" onClick={() => setHienthiThem(false)} className="btn-cancel">Thoát</button>
                        </div>
                        <div className="content">
                            <form className="space-y-4" onSubmit={handleSubmitThem}>
                                <div>
                                    <label className="block text-gray-600 font-medium mb-1">
                                        TÊN THỂ LOẠI
                                    </label>
                                    <input
                                        type="text"
                                        name="tieuDeTheLoai"
                                        value={formData.tieuDeTheLoai}
                                        onChange={handleChange}
                                        className="input-theloai-tieude"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn-submit">Xác nhận</button>
                            </form>
                        </div>
                    </div>
                )}

                {hienthiSua && (
                    <div id="SuaTheloai">
                        <div className="header">
                            <h2>SỬA THỂ LOẠI</h2>
                            <button type="button" onClick={() => setHienthiSua(false)} className="btn-cancel">Thoát</button>
                        </div>
                        <div className="content">
                            <form className="space-y-4" onSubmit={handleSubmitSua}>
                                <div>
                                    <label className="block text-gray-600 font-medium mb-1">
                                        TÊN THỂ LOẠI
                                    </label>
                                    <input
                                        type="text"
                                        name="tieuDeTheLoai"
                                        value={formData.tieuDeTheLoai}
                                        onChange={handleChange}
                                        className="input-theloai-tieude"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn-submit">Xác nhận</button>
                            </form>
                        </div>
                    </div>
                )} 
        </Navadmin>
    )
}

export default Theloai