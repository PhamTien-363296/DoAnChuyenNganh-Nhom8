import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  // CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const productSales = [
  {
    name: 'Jan',
    product1: 4000,
    product2: 2400,
  },
  {
    name: 'Feb',
    product1: 3000,
    product2: 2210,
  },
  {
    name: 'Mar',
    product1: 2000,
    product2: 2290,
  },
  {
    name: 'Apr',
    product1: 2780,
    product2: 2000,
  },
  {
    name: 'May',
    product1: 1890,
    product2: 2181,
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ padding: '10px', backgroundColor: '#fff', border: '1px solid #ccc' }}>
        <p className="label" style={{ marginBottom: '5px' }}>{label}</p>
        <p style={{ color: '#AF9E65' }}>Product 1: <span>${payload[0].value}</span></p>
        <p style={{ color: '#D7B98E' }}>Product 2: <span>${payload[1].value}</span></p>
      </div>
    );
  }
  return null;
};

// Thêm prop-types để kiểm tra kiểu dữ liệu
CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,  // value trong tooltip là số
    })
  ),
  label: PropTypes.string,
};

const AreaChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart width={150} height={150} data={productSales}>
        <YAxis />
        <XAxis dataKey="name" />
        {/* <CartesianGrid strokeDasharray="5 5" /> */}
        {/* CartesianGrid tạo khung */}
        <Tooltip content={<CustomTooltip />} />
        {/* Tooltip tạo ô thống kê số */}
        <Legend />
        {/* Legend tạo bảng tên cho Product 1 và Product 2 */}

        <Area
          type="monotone"
          dataKey="product1"
          stroke="#482F0B"
          fill="#AF9E65"
          stackId="1"
        />

        <Area
          type="monotone"
          dataKey="product2"
          stroke="#482F0B"
          fill="#D7B98E"
          stackId="1"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
