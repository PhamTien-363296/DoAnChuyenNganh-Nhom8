import ChuongItem from '../../common/items/chuongitem/ChuongItem';
import { useState, useEffect } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';

function ListChuong({ idTruyen }) {
    const [chuongs, setChuong] = useState([]);

    ListChuong.propTypes = {
        idTruyen: PropTypes.string.isRequired,
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`/api/chuong/${idTruyen}`);
                const chuongName = response.data.map(chuong => ({
                    id: chuong._id,
                    tenChuong: chuong.tenChuong,
                    trangThaiChuong: chuong.trangThaiChuong,
                    ngayCapNhat: chuong.updatedAt,
                }));
                setChuong(chuongName);
            } catch (error) {
                console.error("Lỗi:", error);
            }
        };

        fetchCategories();
    }, [idTruyen]);

    return (
        <>
            {chuongs.map((chuong, index) => (
                <ChuongItem 
                    key={index}
                    idChuong={chuong.id}
                    tenChuong={chuong.tenChuong}
                    trangThai={chuong.trangThaiChuong}
                    ngay={new Date(chuong.ngayCapNhat)} 
                />
            ))}
        </>
    );
}

export default ListChuong;
