import "./Input.css";
import { useState } from 'react';
import Axios from 'axios';
import useConversation from "../../../../../zustand/useConversation";

export default function Input() {
    const [message, setMessage] = useState(""); 
    const { cacTinNhan, setCacTinNhan, hoiThoaiDuocChon } = useConversation();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!message.trim()) {
            alert("Vui lòng nhập tin nhắn");
            return;
        }

        try {
            const response = await Axios.post(`/api/tinnhan/gui/${hoiThoaiDuocChon._id}`, {
                noiDungTN: message 
            });

            console.log('Tin nhắn đã gửi:', response.data);


            setCacTinNhan([...cacTinNhan, response.data]);

            setMessage(""); 
        } catch (error) {
            console.error('Lỗi khi gửi tin nhắn:', error);
        }
    };

    return (
        <form className="input-box" onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Soạn tin nhắn....." 
            />
            <button type="submit">Gửi</button>
        </form>
    );
}
