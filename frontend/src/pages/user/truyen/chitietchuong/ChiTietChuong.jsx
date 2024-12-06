import MainLayout from '../../../../layout/user/mainLayout/MainLayout';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';

function ChiTietChuong() {
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
            <div>
                <h2>{chuong.tenChuong}</h2>
                <div dangerouslySetInnerHTML={{ __html: chuong.noiDungChuong }} />
            </div>
        </MainLayout>
    );
}

export default ChiTietChuong;
