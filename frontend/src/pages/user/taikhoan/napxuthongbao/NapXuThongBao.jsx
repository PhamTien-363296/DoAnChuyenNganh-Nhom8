import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './NapXuThongBao.css'
import MainLayout from "../../../../layout/user/mainLayout/MainLayout";
const NapXuThongBao = () => {
    const idGiaoDich = Cookies.get('idGiaoDich');
    const [giaodich, setGiaodich] = useState(null);
    const [countdown, setCountdown] = useState(30);
    const navigate = useNavigate();

    useEffect(() => {
        if (idGiaoDich) {
            const fetchGiaoDichData = async () => {
                try {
                    const response = await axios.get(`/api/giaodich/lay/thongbao/${idGiaoDich}`);
                    setGiaodich(response.data);
                } catch (err) {
                    console.error('Lỗi khi tải giao dịch:', err);
                    navigate('/');
                }
            };

            fetchGiaoDichData();
            setCountdown(30);
        } else {
            navigate('/');
        }
    }, [idGiaoDich, navigate]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            navigate('/');
        }
    }, [countdown, navigate]);

    if (!giaodich) {
        return (
            <div className='flex items-center justify-center w-screen h-screen'>
                <div className='bg-red-50 p-5 rounded-lg shadow-xl'>
                    <p>Không có giao dịch.</p>
                </div>
            </div>
        );
    }

    return (
        <MainLayout>
            <div className="napxu-container">
            {giaodich.thongTinGiaoDich.trangThaiThanhToan === "Thất bại" ? (
                <div className="napxu-box napxu-box-error">
                    <FaCircleXmark className="napxu-icon napxu-icon-failure" />
                    <p className="napxu-message">Thanh toán thất bại!</p>
                    {giaodich.thongTinGiaoDich && (
                        <>
                            <p><strong>Số tiền:</strong> {giaodich.tongTien.toLocaleString('vi-VN')}</p>
                            <p><strong>Mã đơn hàng:</strong> {giaodich.thongTinGiaoDich.maGiaoDich}</p>
                            <p><strong>Thời gian:</strong> {moment(giaodich.thongTinGiaoDich.createdAt).format('YYYY-MM-DD hh:mm A')} </p>
                            <p><strong>Phương thức thanh toán:</strong> {giaodich.thongTinGiaoDich.loaiGiaoDich} ({giaodich.thongTinGiaoDich.loaiThe})</p>
                        </>
                    )}
                    <p className="napxu-countdown">Thời gian còn lại: {countdown} giây</p>
                    <div
                        onClick={() => navigate('/')}
                        className="napxu-button napxu-button-error"
                    >
                        Đóng
                    </div>
                </div>
            ) : giaodich.thongTinGiaoDich.trangThaiThanhToan === "Thành công" ? (
                <div className="napxu-box napxu-box-success">
                    <FaCheckCircle className="napxu-icon napxu-icon-success" />
                    <p className="napxu-message">Thanh toán thành công!</p>
                    {giaodich.thongTinGiaoDich && (
                        <>
                            <p><strong>Số tiền:</strong> {giaodich.thongTinGiaoDich.amount.toLocaleString('vi-VN')}</p>
                            <p><strong>Mã đơn hàng:</strong> {giaodich.thongTinGiaoDich.maGiaoDich}</p>
                            <p><strong>Thời gian:</strong> {moment(giaodich.thongTinGiaoDich.createdAt).format('YYYY-MM-DD hh:mm A')} </p>
                            <p><strong>Phương thức thanh toán:</strong> {giaodich.thongTinGiaoDich.loaiGiaoDich} ({giaodich.thongTinGiaoDich.loaiThe})</p>
                        </>
                    )}
                    <p className="napxu-countdown">Thời gian còn lại: {countdown} giây</p>
                    <div
                        onClick={() => navigate('/')}
                        className="napxu-button napxu-button-success"
                    >
                        Đóng
                    </div>
                </div>
            ) : (
                <div className="napxu-box napxu-box-default">
                    <p>Không có giao dịch.</p>
                </div>
            )}
            </div>
        </MainLayout>
    );
};

export default NapXuThongBao;
