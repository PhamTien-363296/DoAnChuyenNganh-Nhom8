import MainLayout from '../../../../layout/user/mainLayout/MainLayout';
import { useLocation, useNavigate  } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';
import BinhLuanChuong from '../../../../components/user/binhluanchuong/BinhLuanChuong';
import './ChiTietChuong.css'
import { FaLock  } from "react-icons/fa";
import { TbCoin } from "react-icons/tb";
import { FaChevronRight } from "react-icons/fa6";
import Thongbao from '../../../../components/user/common/thongbao/Thongbao';

function ChiTietChuong() {
    const navigate = useNavigate();
    const location = useLocation();
    const { idChuong } = location.state || {};
    const [chuong, setChuong] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [thongBao, setThongBao] = useState(null);
    const [hienThiMuaChuong, setHienThiMuaChuong] = useState(false);
    const [xuChuong, setXuChuong] = useState(0);
    const [showThongbao, setShowThongbao] = useState(false);
    const [showThongbaoDau, setShowThongbaoDau] = useState(false);
    const [showThongbaoCuoi, setShowThongbaoCuoi] = useState(false);

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
            const responseKT = await axios.get(`/api/chuong/kiemtra/truycap/${id}`);
            if (responseKT.status === 200 && responseKT.data.truyCap) {
                const response = await axios.get(`/api/chuong/laytheoid/${id}`);
                if (response.status === 200) {                        
                    const chuongData = response.data?.chuong;
                    if (chuongData && chuongData.truyenIdChuong) {
                        setChuong(response.data);
                        await axios.post(`/api/nguoidung/them/lichsu`, {
                            idTruyen: chuongData.truyenIdChuong._id,
                            idChuong: chuongData._id
                        });
                    } else {
                        setError("Thông tin truyện không đầy đủ.");
                    }
                }
            } else if (responseKT.status === 200) {
                setThongBao(responseKT.data.message || "Bạn chưa mở khóa chương này.");
                setHienThiMuaChuong(true);
                setXuChuong(responseKT.data.xuChuong);
            }
        } catch (error) {
            console.error("Lỗi:", error);
            setError("Không thể tải thông tin chương. Vui lòng thử lại sau!");
        } finally {
            setIsLoading(false);
        }
    };

    const quaChuong = async () => {
        if (chuong) {
            const chuongHienTai = chuong.idCacChuongIds.indexOf(chuong.chuong._id);

            if (chuongHienTai !== -1 && chuongHienTai < chuong.idCacChuongIds.length - 1) {
                const nextChuongId = chuong.idCacChuongIds[chuongHienTai + 1];
                try {
                    const response = await axios.get(`/api/chuong/laytheoid/${nextChuongId}`);
                    const chuongTiepTheo = response.data;

                    const tenTruyen = chuongTiepTheo.chuong.truyenIdChuong.tenTruyen.trim().replace(/\s+/g, '-').toLowerCase();
                    const tenChuong = chuongTiepTheo.chuong.tenChuong.trim().replace(/\s+/g, '-').toLowerCase();
                    navigate(`/${tenTruyen}/${tenChuong}`, { state: { idChuong: nextChuongId } });

                    setChuong(chuongTiepTheo);
                } catch (error) {
                    console.error("Lỗi khi tìm chương tiếp theo:", error);
                    setError("Không thể tải chương tiếp theo. Vui lòng thử lại sau.");
                }
            } else {
                setShowThongbaoCuoi(true);
            }
        }
    };

    const quayLai = async () => {
        if (chuong) {
            const chuongHienTai = chuong.idCacChuongIds.indexOf(chuong.chuong._id);
            if (chuongHienTai !== -1 && chuongHienTai > 0) {
                const previousChuongId = chuong.idCacChuongIds[chuongHienTai - 1];
                try {
                    const response = await axios.get(`/api/chuong/laytheoid/${previousChuongId}`);
                    const chuongTruoc = response.data;

                    const tenTruyen = chuongTruoc.chuong.truyenIdChuong.tenTruyen.trim().replace(/\s+/g, '-').toLowerCase();
                    const tenChuong = chuongTruoc.chuong.tenChuong.trim().replace(/\s+/g, '-').toLowerCase();
                    navigate(`/${tenTruyen}/${tenChuong}`, { state: { idChuong: previousChuongId } });

                    setChuong(chuongTruoc);
                } catch (error) {
                    console.error("Lỗi khi tìm chương trước:", error);
                    setError("Không thể tải chương trước. Vui lòng thử lại sau.");
                }
            } else {
                setShowThongbaoDau(true);
            }
        }
    };

    const muaChuong = async (id) => {
        try {
            const responseMua = await axios.post(`/api/chuong/mua/${id}`);
            if (responseMua.status === 200) {
                window.location.reload();
            } else if (responseMua.status == 201) {
                setShowThongbao(true);
            } else {
                console.error("Lỗi mua chương:", responseMua.data);
                alert(responseMua.data.message);
            }
        } catch (error) {
            console.error("Lỗi:", error);
            setError("Không thể tải thông tin chương. Vui lòng thử lại sau!");
        } finally {
            setIsLoading(false);
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

    if (thongBao) {
        return (
            <MainLayout>
                <div className='thongbao-chuong'>
                    <Thongbao
                        type="error"
                        icon="⚠️"
                        message="Bạn không đủ xu để mua chương này. Hãy nạp thêm xu!"
                        show={showThongbao}
                        onClose={() => setShowThongbao(false)}
                    />
                    {hienThiMuaChuong && (
                        <>
                            <p>{thongBao}</p>
                            <div className='thongbao-chuong-khoa'><p>{thongBao && <FaLock style={{color: '#f44336' }} />}</p></div>
                            <div className='thongbao-chuong-text'>
                                <p style={{fontWeight:'bold', fontSize:'20px'}}>Hãy thể hiện sự ủng hộ của bạn đối với tác giả và tiếp tục đọc câu chuyện này</p>
                                <p>Mua chương truyện này. Tiền của bạn giúp các tác giả kiếm tiền cho những câu chuyện bạn yêu thích.</p>
                            </div>
                            <div 
                                className='thongbao-chuong-mua'
                                onClick={() => {
                                    muaChuong(idChuong);
                                }}
                            >
                                <TbCoin/>
                                <p style={{marginLeft:'3px', fontWeight:'bold', fontSize:'27px'}}>{xuChuong}</p>
                                <p style={{marginLeft:'10px',fontWeight:'bold', fontSize:'20px'}}>Mua Chương</p>
                            </div>
                        </>
                    )}
                </div>
            </MainLayout>
        );
    }

    const handleNavigateHome = () => {
        navigate(`/`);
    };
    
    const handleNavigateTruyen = () => {
        const tenTruyen = chuong?.chuong?.truyenIdChuong?.tenTruyen.trim().replace(/\s+/g, '-').toLowerCase();
        navigate(`/chitiettruyen/${tenTruyen}`, { state: { idTruyen: chuong?.chuong?.truyenIdChuong?._id } });
    };
    
    const handleNavigateChuong = () => {
        const tenTruyen = chuong?.chuong?.truyenIdChuong?.tenTruyen.trim().replace(/\s+/g, '-').toLowerCase();
        const tenChuong = chuong?.chuong?.tenChuong.trim().replace(/\s+/g, '-').toLowerCase();
        navigate(`/${tenTruyen}/${tenChuong}`, { state: { idChuong: chuong?.chuong?._id } });
    };

    const handleNavigateTheloai = () => {
        const tenTheloai = chuong?.chuong?.truyenIdChuong?.theLoaiIdTruyen?.tieuDeTheLoai.replace(/\s+/g, '-').toLowerCase();
        navigate(`/theloai/${tenTheloai}?loc=phobien&trang=1&sao=tatca&tinhtrang=tatca`, { state: { theloaiId: chuong?.chuong?.truyenIdChuong?.theLoaiIdTruyen?._id } });
    };
    
    return (
        <MainLayout>
            <div className='chitietchuong-content'>
                <Thongbao
                    type="info"
                    icon="❎"
                    message="Đây là chương cuối cùng"
                    show={showThongbaoCuoi}
                    onClose={() => setShowThongbaoCuoi(false)}
                />
                <Thongbao
                    type="info"
                    icon="❎"
                    message="Đây là chương đầu tiên"
                    show={showThongbaoDau}
                    onClose={() => setShowThongbaoDau(false)}
                />
                <div className='ct-chuong-dieuhuong'>
                    <p onClick={handleNavigateHome}>Trang chủ</p>
                    <FaChevronRight />
                    <p onClick={handleNavigateTheloai}>
                        {chuong?.chuong?.truyenIdChuong?.theLoaiIdTruyen?.tieuDeTheLoai}
                    </p>
                    <FaChevronRight />
                    <p onClick={handleNavigateTruyen}>
                        {chuong?.chuong?.truyenIdChuong?.tenTruyen}
                    </p>
                    <FaChevronRight />
                    <p onClick={handleNavigateChuong}>
                        {chuong?.chuong?.tenChuong}
                    </p>
                </div>
                <div className='ct-chuong-tieude'>
                    <h2>{chuong.chuong.tenChuong}</h2>
                </div>
                <div className='ct-chuong-noidung' dangerouslySetInnerHTML={{ __html: chuong.chuong.noiDungChuong }} />
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
