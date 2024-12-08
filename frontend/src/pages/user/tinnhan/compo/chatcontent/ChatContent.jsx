import Cactin from "./Cactin";
import Input from "./Input";
import "./ChatContent.css";
import useConversation from "../../../../../zustand/useConversation";
import { useAuthContext } from "../../../../../context/AuthContext";
import { useEffect } from "react";

export default function ChatContent() {
    const { hoiThoaiDuocChon, setHoiThoaiDuocChon } = useConversation();

    useEffect(()=>{

        //clean up (unmounts)
        return () => setHoiThoaiDuocChon(null)
    },[setHoiThoaiDuocChon])

    return (
        <div className="chat-content">
            {!hoiThoaiDuocChon ? (
                <ChuaChon />
            ) : (
                <>
                    <header className="chat-header">
                        <span className="label-text">
                            To: <span className="recipient-name">{hoiThoaiDuocChon.username}</span>
                        </span>
                    </header>
                    <div className="chat-body">
                        <Cactin />
                    </div>
                    <div className="chat-footer">
                        <Input />
                    </div>
                </>
            )}
        </div>
    );
}

const ChuaChon = () => {
    const { authUser } = useAuthContext();
    return (
        <div className="chua-chon-container">
            <div className="chua-chon-content">
                <div className="welcome-icon">📖</div>
                <p>Chào <strong style={{ color: "#49372F" }}>{authUser.username}</strong></p>
                <p>Hãy chọn một đoạn chat để bắt đầu</p>
            </div>
        </div>
    );
};
