import "./chart.css";

//refer: https://recharts.org/en-US/examples
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = ({title, data, dataKey1, dataKey2, grid}) => { 

  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      {/* /aspect={4/1} means if width is 400px then height will be 100px */}
      <ResponsiveContainer width="100%" aspect={4/1}>
        {/* we making SimpleLineChart */}
        <LineChart data={data}>
            <XAxis dataKey={dataKey1} stroke="#5550bd"/>
            <Line type="monotone" dataKey={dataKey2} stroke="#5550bd"/>
            <Tooltip/>
            grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
