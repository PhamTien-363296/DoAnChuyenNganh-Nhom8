import MainLayout from '../../../layout/user/mainLayout/MainLayout';
import ListTheloai from "../../../components/user/manager/listtheloai/ListTheLoai";
import './Danhmuc.css';
import ListBookDanhMuc from '../../../components/user/manager/listcard/listbook-danhmuc/ListBookDanhMuc';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect  } from "react";
import axios from 'axios';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function Danhmuc() {
    const navigate = useNavigate();
    const [bookList, setBookList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const { theloaiId } = location.state || {};
    const [tong, setTong] = useState(0);
    const [tongPages, setTongPages] = useState(1);

    const query = new URLSearchParams(window.location.search); 
    const page = parseInt(query.get('trang')) || 1;
    const sort = query.get('loc') || 'phobien';
    const filterSao = query.get('sao') || 'tatca';
    const filterTinhTrang = query.get('tinhtrang') || 'tatca';


    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                let response;
                if (theloaiId !== 'all') {
                    response = await axios.get(`/api/truyen/laytheotheloai/${theloaiId}?sort=${sort}&page=${page}&sao=${filterSao}&tinhtrang=${filterTinhTrang}`);
                } else {
                    response = await axios.get(`/api/truyen/?sort=${sort}&page=${page}&sao=${filterSao}&tinhtrang=${filterTinhTrang}`);
                }
                setBookList(response.data.truyen);
                setTong(response.data.tong);
                setTongPages(response.data.tongPage);
                setLoading(false);
            } catch (error) {
                setError("Có lỗi khi lấy danh sách sách.", error);
                setLoading(false);
            }
        };

        fetchBooks();
    }, [page,sort,theloaiId,filterSao,filterTinhTrang]);

    const handleSortChange = (newSort) => {
        navigate(`?loc=${newSort}&trang=1&sao=${filterSao}&tinhtrang=${filterTinhTrang}`, {
            state: {
                theloaiId: theloaiId,
            }
        });
    };

    const handlePageChange = (newPage) => {
        const pageNumber = parseInt(newPage);
        navigate(`?loc=${sort}&trang=${pageNumber}&sao=${filterSao}&tinhtrang=${filterTinhTrang}`, {
            state: {
                theloaiId: theloaiId,
            }
        });
    };

    const handleFilterChange = (type, value) => {
        if (type === 'tinhTrang') {
            navigate(`?loc=${sort}&trang=${page}&sao=${filterSao}&tinhtrang=${value}`, {
                state: { theloaiId }
            });
        } else if (type === 'sao') {
            navigate(`?loc=${sort}&trang=${page}&sao=${value}&tinhtrang=${filterTinhTrang}`, {
                state: { theloaiId }
            });
        }
    };

    if (loading) {
        return <div>Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <MainLayout>
            <div className="danhmuc-theloai">
                <div className="danhmuc-tieude">
                    <p style={{ fontWeight: "bold" }}>Thể loại</p>
                </div>
                <div className="danhmuc-noidung">
                    <ListTheloai theloaiId={theloaiId}/>
                </div>
            </div>

            <div className='danhmuc-chon'>
                <div className='danhmuc-chon-sapxep'>
                    <p>Sắp xếp theo</p>
                    <button 
                        onClick={() => handleSortChange('phobien')} 
                        className={`danhmuc-chon-sapxep-button ${sort === 'phobien' ? 'chon' : ''}`}>
                        Phổ biến
                    </button>
                    <button 
                        onClick={() => handleSortChange('moinhat')}  
                        className={`danhmuc-chon-sapxep-button ${sort === 'moinhat' ? 'chon' : ' '}`}>
                        Mới nhất
                    </button>
                    <button 
                        onClick={() => handleSortChange('danhgia')}  
                        className={`danhmuc-chon-sapxep-button ${sort === 'danhgia' ? 'chon' : ' '}`}>
                        Đánh giá tốt
                    </button>
                </div>
                <div className='danhmuc-chon-loc'>
                    <p>Lọc theo</p>
                    <select
                        value={filterTinhTrang}
                        onChange={(e) => handleFilterChange('tinhTrang', e.target.value)}
                    >
                        <option value="tatca">Tất cả</option>
                        <option value="hoanthanh">Hoàn thành</option>
                        <option value="dangviet">Đang viết</option>
                        <option value="tamdung">Tạm dừng</option>
                    </select>
                    <select
                        value={filterSao}
                        onChange={(e) => handleFilterChange('sao', e.target.value)}
                    >
                        <option value="tatca">Tất cả</option>
                        <option value="4-5">Từ 4 đến 5 sao</option>
                        <option value="3-4">Từ 3 đến 4 sao</option>
                        <option value="2-3">Từ 2 đến 3 sao</option>
                        <option value="1-2">Từ 1 đến 2 sao</option>
                        <option value="0-1">Từ 0 đến 1 sao</option>
                    </select>
                </div>
            </div>

            <div className='danhmuc-tong'>
                <p>Tổng {tong} Truyện</p>
            </div>

            <div className='listsach'>
                <ListBookDanhMuc bookList={bookList} />
            </div>

            <div className="danhmuc-phantrang">
                <button 
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`danhmuc-phantrang-chon`}>
                    <FaAngleLeft />
                </button>
                {Array.from({ length: tongPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`danhmuc-phantrang-so ${page === index + 1 ? 'chon' : ''}`}>
                        {index + 1}
                    </button>
                ))}
                <button 
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === tongPages}
                    className={`danhmuc-phantrang-chon`}>
                    <FaAngleRight />
                </button>
            </div>
        </MainLayout>
    );
}
