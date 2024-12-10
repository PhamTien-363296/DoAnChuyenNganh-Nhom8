import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import PropTypes from "prop-types";
import "./DiemDanh.css";
import { TbCoin } from "react-icons/tb";
import { TbCircleCheck } from "react-icons/tb";

export default function DiemDanh({ thongTin }) {
    const [ngayTrongTuan, setNgayTrongTuan] = useState([]);
    const [status, setStatus] = useState("");
    const [kiemTra, setKiemTra] = useState(false);

    const taoDanhSachTuan = () => {
        const today = moment();
        const days = [];
        for (let i = 0; i < 7; i++) {
            const day = today.clone().add(i, "days"); // Ngày tiếp theo
            days.push({
                date: day.format("DD-MM-YYYY"),
                day: day.format("dddd"),
                xu: xuTheoNgay(day.day()),
                checkedIn: thongTin.diemDanh ? moment(thongTin.diemDanh).isSame(day, "day") : false,
            });
        }
        setNgayTrongTuan(days);
    };

    const xuTheoNgay = (day) => {
        switch (day) {
            case 1: // Thứ 2
            case 2: // Thứ 3
            case 3: // Thứ 4
            case 4: // Thứ 5
                return 10;
            case 5: // Thứ 6
                return 30;
            case 6: // Thứ 7
            case 0: // Chủ nhật
                return 40;
            default:
                return 0;
        }
    };

    useEffect(() => {
        taoDanhSachTuan();
        const today = moment().startOf("day");
        if (thongTin.diemDanh && moment(thongTin.diemDanh).isSame(today, "day")) {
            setKiemTra(true);
        }
    }, [thongTin]);

    const handleCheckIn = async () => {
        try {
            const response = await axios.post(`/api/nguoidung/diemdanh`);
            setStatus(response.data.message);
            setKiemTra(true);
            taoDanhSachTuan();
        } catch (err) {
            setStatus(err.response?.data?.message || "Lỗi server.");
        }
    };

    return (
        <div className="diemdanh-container">
            <h2>Điểm danh nhận xu</h2>
            <div className="week-list">
                {ngayTrongTuan.map((day, index) => (
                    <div
                        key={index}
                    >
                        <p style={{ margin:'0'}}>{day.day}</p>
                        <p style={{fontSize:'12px', marginTop:'5px'}}>{day.date}</p>
                        <div className={`day-item ${index === 0 ? "today" : ""} ${day.checkedIn ? "checked-in" : ""}`}>
                            <p>+ {day.xu} XU</p>
                            {!day.checkedIn && <TbCoin style={{fontSize:'45px', color:'#f0bb29'}}/>}
                            {day.checkedIn && <span><TbCircleCheck style={{fontSize:'45px', color:'#49372F'}}/></span>}
                        </div>
                    </div>
                ))}
            </div>
            {!kiemTra && (
                <button className="diemdanh-button" onClick={handleCheckIn}>Điểm danh</button>
            )}
            {kiemTra && <p>Bạn đã điểm danh hôm nay.</p>}
            <p>{status}</p>
        </div>
    );
}

DiemDanh.propTypes = {
    thongTin: PropTypes.shape({
        diemDanh: PropTypes.string,
    }),
};
