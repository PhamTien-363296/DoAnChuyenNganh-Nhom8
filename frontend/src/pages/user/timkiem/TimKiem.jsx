import MainLayout from '../../../layout/user/mainlayout/MainLayout';
import './TimKiem.css';
import { useState, useEffect  } from "react";
import axios from 'axios';
import ListTruyen from '../../../components/user/manager/timkiem/ListTruyen';
import ListTacGia from '../../../components/user/manager/timkiem/ListTacGia';
import ListBaiViet from '../../../components/user/manager/timkiem/ListBaiViet';
import ListCongDong from '../../../components/user/manager/timkiem/ListCongDong';

export default function TimKiem() {
    const [ketQua, setKQ] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [locTheo, setLocTheo] = useState("truyen")
    const [soLuongHienThi, setSoLuongHienThi] = useState(18);

    const query = new URLSearchParams(window.location.search); 
    const search = query.get('search');

    const dsLoc = [
        { id: 'truyen', label: 'Truyện' },
        { id: 'tacGia', label: 'Tác giả' },
        { id: 'baiViet', label: 'Bài viết' },
        { id: 'congDong', label: 'Cộng đồng' }
    ];

    useEffect(() => {
        setKQ([]);
        const fetchDanhmucData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/truyen/search/timkiem?search=${search}&loc=${locTheo}`);
                console.log("ketqua", response.data);
                setKQ(response.data);
            } catch (err) {
                console.error(err);
                setError("Lỗi tải tìm kiếm");
            } finally {
                setLoading(false);
            }
        };

        fetchDanhmucData();
    }, [locTheo, search]);

    
    const handleLocChange = (locId) => {
        setLocTheo(locId);
    };

    const handleLoadMore = () => {
        setSoLuongHienThi(prev => prev + 18);
    };

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <MainLayout>
            <div className="timkiem">
                <div className="timkiem-tieude">
                    <p style={{ fontWeight: "bold" }}>Kết quả cho: {search}</p>
                </div>

                <div className="timkiem-loc">
                    {dsLoc.map((loc) => (
                        <button
                            key={loc.id}
                            className={`timkiem-loc-button ${locTheo === loc.id ? "chon" : ""}`}
                            onClick={() => handleLocChange(loc.id)}
                        >
                            {loc.label}
                        </button>
                    ))}
                </div>

                <div className='timkiem-list'>
                    {locTheo === 'truyen' && (
                        <div className='timkiem-list-noidung'>
                            <ListTruyen ketQua={ketQua} soLuongHienThi={soLuongHienThi} />
                        </div>
                    )}
                    {locTheo === 'tacGia' && (
                        <ListTacGia ketQua={ketQua} />
                    )}
                    {locTheo === 'baiViet' && (
                        <ListBaiViet ketQua={ketQua} />
                    )}
                    {locTheo === 'congDong' && (
                        <ListCongDong ketQua={ketQua} />
                    )}
                </div>
                <div className='timkiem-list-xemthem' style={{display:'flex', justifyContent:'center', alignContent:'center', marginTop:'20px'}}>
                    {ketQua.length > soLuongHienThi && (
                        <button className="xem-them-btn" onClick={handleLoadMore}>
                            Xem thêm
                        </button>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
