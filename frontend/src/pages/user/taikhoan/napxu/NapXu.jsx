import TaiKhoanLayout from "../../../../layout/user/taikhoanlayout/TaiKhoanLayout"
import './NapXu.css'
import axios from 'axios';

function NapXu() {
    const handlePayment = async (goi) => {
        try {
            const giaoDich = {
                soLuongXuGD: goi.soXu,
                noiDungGD: `Bạn đã nạp ${goi.soXu} xu với ${goi.tenGoi} giá ${goi.soTien} đ`,
                dongTien: 'Cộng',
                loaiGiaoDich: 'NapXu'
            };
    
            const Response = await axios.post('/api/giaodich/them', giaoDich);
            if (Response.status === 201) {
    
                const idGiaoDich = Response.data.giaoDich._id; 
                console.log('id Giao dịch:', idGiaoDich);
                alert(`Thêm thành công! id Giao dịch: ${idGiaoDich}`);
    
                const newPayment = {
                    amount: goi.soTien,
                    bankCode: null,
                    language: "vn",
                    idGiaoDich: idGiaoDich,
                };
    
                const paymentResponse = await axios.post('/api/vnpay/create_payment_url', newPayment);
                if (paymentResponse.status === 200 && paymentResponse.data) {
                    window.location.href = paymentResponse.data;
                }
            } else {
                alert("Có lỗi xảy ra khi thêm dịch vụ, vui lòng thử lại.");
            }
        } catch (error) {
            console.error('Lỗi khi thêm đơn hàng:', error);
            alert(`Lỗi: ${error?.message}`);
        }
    };

    const goiXuList = [
        { tenGoi: 'Gói MT', soXu: 200, soTien: 50000 },
        { tenGoi: 'Gói ML', soXu: 300, soTien: 80000 },
        { tenGoi: 'Gói KM', soXu: 500, soTien: 130000 },
        { tenGoi: 'Gói TT', soXu: 1000, soTien: 250000 },
        { tenGoi: 'Gói PU', soXu: 1500, soTien: 400000 },
        { tenGoi: 'Gói CHEO', soXu: 2500, soTien: 700000 },
    ];

    return (
        <TaiKhoanLayout>
            <div className="napxu">
                <p className="xu-tieude">Chọn gói XU</p>
                <div className="list-xu-item">
                    {goiXuList.map((goi, index) => (
                        <div
                            key={index}
                            className="xu-item"
                            onClick={() => handlePayment(goi)}
                        >
                            <p>{goi.tenGoi}</p>
                            <p>{goi.soXu} XU</p>
                            <p>{goi.soTien.toLocaleString()} đ</p>
                        </div>
                    ))}
                </div>
            </div>
        </TaiKhoanLayout>
    );
}

export default NapXu