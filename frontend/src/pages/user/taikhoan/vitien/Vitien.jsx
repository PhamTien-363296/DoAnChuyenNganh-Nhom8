import GiaoDichItem from '../../../../components/user/common/items/giaodichitem/GiaoDichItem';
import TaiKhoanLayout from '../../../../layout/user/taikhoanlayout/TaiKhoanLayout';
import { TbCoin } from "react-icons/tb";
import './ViTien.css'
import { useNavigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import axios from 'axios';
import DiemDanh from '../../../../components/user/diemdanh/DiemDanh';

export default function Vitien() {
    const navigate = useNavigate();
    const [thongTin, setThongTin] = useState({});
    const [hienThiLichSuGiaoDich, setHienThiLichSuGiaoDich] = useState(false);
    const [lichSuGD, setLichSuGD] = useState([]);

    const xulyLichSuGiaoDich = () => {
        setHienThiLichSuGiaoDich(prev => !prev);

        const LayLichSuGd = async () => {
            try {
                const response = await axios.get(`/api/giaodich/lay/tatca`);
                setLichSuGD(response.data);
            } catch (err) {
                console.error('Lỗi khi tải giao dịch:', err);
            }
        };
        LayLichSuGd();
    };

    useEffect(() => {
        const layThongTin = async () => {
            try {
                const response = await axios.get(`/api/auth/getme`);
                setThongTin(response.data);
            } catch (err) {
                console.error('Lỗi khi tải giao dịch:', err);
            }
        };
        layThongTin();
    }, []);

    const napXu = () => {
        const tenND = thongTin.username.replace(/\s+/g, '-');
        navigate(`/${tenND}/napxu`);
    };

    return (
        <TaiKhoanLayout>
            <div className='vitien-container'>
                <div className='vitien'>
                    <div className='vitien-thongtin'>
                        <TbCoin style={{fontSize:'45px'}}/>
                        <p>{thongTin.xuConLaiND} XU</p>
                    </div>
                    <button onClick={napXu}>Nạp Xu</button>
                </div>
                <div className='vitien-diemdanh'>
                    <DiemDanh thongTin={thongTin}/>
                </div>
                <div className='vitien-giaodich'>
                    <p className='vitien-text' onClick={xulyLichSuGiaoDich}>Lịch sử giao dịch</p>
                    {hienThiLichSuGiaoDich && (
                        <div className='vitien-list'>
                            {lichSuGD.length === 0 ? (
                                <p>Chưa có giao dịch nào.</p> // Thêm thông báo khi không có giao dịch
                            ) : (
                                lichSuGD.map((giaodich) => (
                                    <GiaoDichItem 
                                        key={giaodich._id} // Sử dụng ID của giao dịch thay vì index nếu có
                                        loaiGiaoDich={giaodich.loaiGiaoDich}
                                        createdAt={giaodich.createdAt}
                                        noiDungGD={giaodich.noiDungGD}
                                        dongTien={giaodich.dongTien}
                                        soLuongXuGD={giaodich.soLuongXuGD}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>


            </div>
        </TaiKhoanLayout>
    )
}
