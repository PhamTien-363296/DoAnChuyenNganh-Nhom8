import MainLayout from '../../../../layout/user/mainLayout/MainLayout';
import { useLocation, useNavigate  } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import BinhLuanChuong from '../../../../components/user/binhluanchuong/BinhLuanChuong';
import './ChiTietChuong.css'
function ChiTietChuong() {
    const navigate = useNavigate();
    const location = useLocation();
    const { idChuong } = location.state || {};
    const [chuong, setChuong] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (idChuong) {
            layChuong(idChuong);
        } else {
            setIsLoading(false);
            setError("Không tìm thấy thông tin chương. Vui lòng kiểm tra lại!");
        }
    }, [idChuong]);

    const layChuong = async (id) => {
        try {
            const response = await axios.get(`/api/chuong/laytheoid/${id}`);
            setChuong(response.data);
        } catch (error) {
            console.error("Lỗi:", error);
            setError("Không thể tải thông tin chương. Vui lòng thử lại sau!");
        } finally {
            setIsLoading(false);
        }
    };

    const quaChuong = async () => {
        if (chuong) {
            const chuongHienTai = chuong.truyenIdChuong.idCacChuong.indexOf(chuong._id);

            if (chuongHienTai !== -1 && chuongHienTai < chuong.truyenIdChuong.idCacChuong.length - 1) {
                const nextChuongId = chuong.truyenIdChuong.idCacChuong[chuongHienTai + 1];
                try {
                    const response = await axios.get(`/api/chuong/laytheoid/${nextChuongId}`);
                    const chuongTiepTheo = response.data;

                    const tenTruyen = chuongTiepTheo.truyenIdChuong.tenTruyen.trim().replace(/\s+/g, '-').toLowerCase();
                    const tenChuong = chuongTiepTheo.tenChuong.trim().replace(/\s+/g, '-').toLowerCase();
                    navigate(`/${tenTruyen}/${tenChuong}`, { state: { idChuong: nextChuongId } });

                    setChuong(chuongTiepTheo);
                } catch (error) {
                    console.error("Lỗi khi tìm chương tiếp theo:", error);
                    setError("Không thể tải chương tiếp theo. Vui lòng thử lại sau.");
                }
            } else {
                alert("Đây là chương cuối cùng.");
            }
        }
    };

    const quayLai = async () => {
        if (chuong) {
            const chuongHienTai = chuong.truyenIdChuong.idCacChuong.indexOf(chuong._id);
            if (chuongHienTai !== -1 && chuongHienTai > 0) {
                const previousChuongId = chuong.truyenIdChuong.idCacChuong[chuongHienTai - 1];
                try {
                    const response = await axios.get(`/api/chuong/laytheoid/${previousChuongId}`);
                    const chuongTruoc = response.data;

                    const tenTruyen = chuongTruoc.truyenIdChuong.tenTruyen.trim().replace(/\s+/g, '-').toLowerCase();
                    const tenChuong = chuongTruoc.tenChuong.trim().replace(/\s+/g, '-').toLowerCase();
                    navigate(`/${tenTruyen}/${tenChuong}`, { state: { idChuong: previousChuongId } });

                    setChuong(chuongTruoc);
                } catch (error) {
                    console.error("Lỗi khi tìm chương trước:", error);
                    setError("Không thể tải chương trước. Vui lòng thử lại sau.");
                }
            } else {
                alert("Đây là chương đầu tiên.");
            }
        }
    };

    if (isLoading) {
        return (
            <MainLayout>
                <div>
                    <p>Đang tải thông tin chương...</p>
                </div>
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
                <div>
                    <p>{error}</p>
                </div>
            </MainLayout>
        );
    }
    

    return (
        <MainLayout>
            <div className='chitietchuong-content'>
                <div className='ct-chuong-tieude'>
                    <h2>{chuong.tenChuong}</h2>
                </div>
                <div className='ct-chuong-noidung' dangerouslySetInnerHTML={{ __html: chuong.noiDungChuong }} />
                <div className='ct-chuong'>
                    <button onClick={quayLai} className='chuong-btn' style={{marginRight:'10px'}}>
                        Chương trước
                    </button>
                    <button onClick={quaChuong} className='chuong-btn'>
                        Chương tiếp theo
                    </button>
                </div>
                <div className='ct-chuong-binhluan'>
                    <BinhLuanChuong idChuong={idChuong}/>
                </div>
            </div>
        </MainLayout>
    );
}

export default ChiTietChuong;
