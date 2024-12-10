import Hoithoai from './Hoithoai';
import { useEffect, useState } from 'react';
import Axios from 'axios';

const Cachoithoai = () => {
	const [hoithoaiList, setHoithoaiList] = useState([]);

	// Fetch data from API
	const layTatCa = async () => {
		try {
			const response = await Axios.get('/api/nguoidung/tatca');
			setHoithoaiList(response.data); 
		} catch (error) {
			console.error('Lỗi khi lấy dữ liệu:', error);
		}
	};

	useEffect(() => {
		layTatCa();
	}, []);

	return (
		<div>
			{hoithoaiList.length > 0 ? (
				hoithoaiList.map((ht) => (
					<Hoithoai 
						key={ht._id} 
						hoithoai={ht} 
						anh={ht.anhDaiDienND}
					/>
				))
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Cachoithoai;
