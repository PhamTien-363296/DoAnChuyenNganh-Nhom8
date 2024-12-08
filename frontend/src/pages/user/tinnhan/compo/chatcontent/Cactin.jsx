import { useEffect, useState, useCallback } from 'react';
import Axios from 'axios';
import Tin from "./Tin";
import useConversation from '../../../../../zustand/useConversation';
import toast from 'react-hot-toast';
import useListenMessages from '../../../../../hook/useListenMessages';

const Cactin = () => {
  const [tinList, setTinList] = useState([]);
  const { cacTinNhan = [], setCacTinNhan, hoiThoaiDuocChon } = useConversation(); 
  const [loading, setLoading] = useState(false);
  useListenMessages()

  
  const layTatCaTin = useCallback(async () => {
    setLoading(true);
    try {
      const response = await Axios.get(`/api/tinnhan/${hoiThoaiDuocChon._id}`);
      setTinList(response.data);
      setCacTinNhan(response.data);  
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu:', error);
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  }, [hoiThoaiDuocChon._id, setCacTinNhan]);

 
  useEffect(() => {
    if (hoiThoaiDuocChon?._id) {
      layTatCaTin(); 
    }
  }, [hoiThoaiDuocChon?._id, layTatCaTin]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        (cacTinNhan.length > 0 ? (
          cacTinNhan.map((tin) => <Tin key={tin._id} tin={tin} />) 
        ) : (
          tinList.map((tin) => <Tin key={tin._id} tin={tin} />)
        ))
      )}
    </div>
  );
};

export default Cactin;
