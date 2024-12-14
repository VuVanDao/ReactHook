import {
  Bar,
  BarChart,
  CartesianAxis,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./DashBoard.scss";
import { getOverView } from "../../../service/apiService";
import { useEffect, useState } from "react";
import { queryByTestId } from "@testing-library/react";
// import { Tooltip } from "bootstrap";

const DashBoard = (props) => {
  const [dataOverview, setDataOverview] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  useEffect(() => {
    fetchDataOverview();
  }, []);
  const fetchDataOverview = async () => {
    let res = await getOverView();
    if (res && res.EC === 0) {
      setDataOverview(res.DT);
      let Qz,
        Qs,
        As = 0;
      Qz = res?.DT?.others?.countQuiz ?? 0;
      Qs = res?.DT?.others?.countQuestions ?? 0;
      As = res?.DT?.others?.countAnswers ?? 0;
      const data = [
        {
          name: "Quizzes",
          Qz: Qz,
        },
        {
          name: "Questions",
          Qs: Qs,
        },
        {
          name: "Answers",
          As: As,
        },
      ];
      setDataChart(data);
    }
    console.log(">>>", res);
  };

  return (
    <div className="dashboard-container">
      <div className="title my-2">DashBoard</div>
      <div className="content">
        <div className="c-left">
          <div className="child">
            <span>Total users</span>
            <span className="text-2">
              {dataOverview &&
              dataOverview.users &&
              dataOverview.users.total ? (
                <>{dataOverview.users.countUsers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span>Total quizzes</span>
            <span className="text-2">
              {dataOverview && dataOverview.others ? (
                <>{dataOverview.others.countQuiz}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span>Total questions</span>
            <span className="text-2">
              {dataOverview && dataOverview.others ? (
                <>{dataOverview.others.countQuestions}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span>Total answers</span>
            <span className="text-2">
              {dataOverview && dataOverview.others ? (
                <>{dataOverview.others.countAnswers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
        </div>
        <div className="c-right">
          <ResponsiveContainer width="95%" height="100%">
            <BarChart data={dataChart}>
              <CartesianGrid />
              <XAxis dataKey={"name"} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={"Qz"} fill="blue" />
              <Bar dataKey={"Qs"} fill="red" />
              <Bar dataKey={"As"} fill="yellow" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
