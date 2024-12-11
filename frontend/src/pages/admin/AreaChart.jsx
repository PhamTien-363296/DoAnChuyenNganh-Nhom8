import PropTypes from 'prop-types';
import  { useEffect, useState } from 'react';  
import axios from 'axios';  
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ padding: '10px', backgroundColor: '#fff', border: '1px solid #ccc' }}>
        <p className="label" style={{ marginBottom: '5px' }}>{label}</p>
        <p style={{ color: '#AF9E65' }}>Lượt xem: <span>{payload[0].value}</span></p>
      </div>
    );
  }
  return null;
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
    })
  ),
  label: PropTypes.string,
};

const AreaChartComponent = () => {
  const [duLieu, setDuLieu] = useState([]);  

  useEffect(() => {

    const layLuotXem = async () => {
      try {
        const response = await axios.get('/api/truyen/layluotxem');  
        const data = response.data;

        const formattedData = data.map((item) => ({
          name: item.name,  
          luotxem: item.luotXem,  
        }));

        setDuLieu(formattedData);  
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    layLuotXem();
  }, []);  

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={150} height={150} data={duLieu}>
        <YAxis />
        <XAxis dataKey="name" />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Area
          type="monotone"
          dataKey="luotxem"
          stroke="#482F0B"
          fill="#AF9E65"
          stackId="1"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};


export default AreaChartComponent
