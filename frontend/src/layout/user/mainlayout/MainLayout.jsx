import Sidebar from '../../../components/user/sidebar/Sidebar';
import Searchmain from '../../../components/user/header/Header';
import Footer from '../../../components/user/footer/Footer';

import PropTypes from 'prop-types';
import './MainLayout.css'

const MainLayout = ({ children }) => {
    return (
        <div className='container'> 
            <Sidebar />
            <Searchmain />
            <div className='content'>{children}</div>
            <Footer/>
        </div>
    );
};

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MainLayout;

