import MainLayout from '../../../layout/user/mainLayout/MainLayout';
import Sidebar from './compo/sidebar/Sidebar';
import ChatContent from './compo/chatcontent/ChatContent';
import './Tinnhan.css';

export default function Tinnhan() {
    return (
        <MainLayout>
            <div className="chat-container">
                <Sidebar /> 
                <ChatContent /> 
            </div>
        </MainLayout>
    );
}
