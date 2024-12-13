import {
  Bar,
  BarChart,
  CartesianAxis,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import "./DashBoard.scss";
// import { Tooltip } from "bootstrap";

const DashBoard = (props) => {
  const data = [
    {
      name: "A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "B",
      uv: 6000,
      pv: 4800,
    },
    {
      name: "C",
      uv: 9000,
      pv: 5600,
    },
  ];
  return (
    <div className="dashboard-container">
      <div className="title">DashBoard</div>
      <div className="content">
        <div className="c-left">
          <div className="child">Total users</div>
          <div className="child">Total quizzes</div>
          <div className="child">Total questions</div>
          <div className="child">Total answers</div>
        </div>
        <div className="c-right">
          <BarChart width={700} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"name"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={"pv"} fill="blue" />
            <Bar dataKey={"uv"} fill="red" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
