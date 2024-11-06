import { HiOutlineChat , HiOutlineHeart } from "react-icons/hi";

import PropTypes from 'prop-types';
import './Style.css'

function BaiVietItem(props) {
    const { tenCongDong, tenNguoiDung, noiDungBV, luotThich, binhLuan } = props;

    BaiVietItem.propTypes = {
        tenCongDong: PropTypes.string.isRequired,
        tenNguoiDung: PropTypes.string.isRequired,
        noiDungBV: PropTypes.string.isRequired,
        luotThich: PropTypes.number.isRequired,
        binhLuan: PropTypes.number.isRequired,
    };
    return (
        <div className="baiviet-item">
            <div className="baiviet-item-container">
                <div className="baiviet-item-tieude">
                    <div className="baiviet-item-tieude-avata">
                        <img src='https://placehold.co/129x203' style={{borderRadius:'30px'}}/>
                    </div>
                    <div className="baiviet-item-tieude-noidung">
                        <p style={{fontSize:'15px', fontWeight:'bold'}}>{tenCongDong}</p>
                        <div style={{display:'flex', alignItems:'center', marginTop:'5px'}}>
                            <p  style={{fontSize:'15px', fontWeight:'bold'}}>{tenNguoiDung}</p>
                            <p style={{fontSize:'15px'}}>30 tháng 10</p>
                        </div>
                        <p style={{fontSize:'15px', marginTop:'7px'}}>
                            {noiDungBV}
                        </p>
                    </div>
                </div>

                <div className="baiviet-item-image"> 
                    <img src='https://placehold.co/600x200' />
                </div>
                <div className="baiviet-item-thongtin">
                    <div className="baiviet-item-thongtin-yeuthich">
                        <p style={{fontSize:'20px', margin:'0'}}><HiOutlineHeart /></p>
                        <p style={{marginLeft: '3px', fontSize:'13px'}}>{luotThich} N</p>
                    </div>
                    <div className="baiviet-item-thongtin-cmt">
                        <p style={{fontSize:'20px', margin:'0'}}><HiOutlineChat/></p>
                        <p style={{marginLeft: '3px', fontSize:'13px'}}>{binhLuan} N</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default BaiVietItem