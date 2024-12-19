import './Thongbao.css';
import PropTypes from 'prop-types';

const Thongbao = ({ type, icon, message, show, onClose }) => {
    if (!show) return null;

    setTimeout(() => {
        onClose();
    }, 3000);

    const typeClass = `toast-${type}`;

    return (
        <div className={`toast ${typeClass}`}>
            <span className="toast-icon">{icon}</span>
            {message}
        </div>
    );
};

Thongbao.propTypes = {
    type: PropTypes.oneOf(['error', 'success', 'warning', 'info']),
    icon: PropTypes.string,
    message: PropTypes.string,
    show: PropTypes.bool,
    onClose: PropTypes.func,
};

export default Thongbao;
