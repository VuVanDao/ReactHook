import { useEffect, useState } from "react";
import { getQuizByUser } from "../../service/apiService";
import { useNavigate } from "react-router-dom";
import "./ListQuiz.scss";
import { useTranslation, Trans } from "react-i18next";

const ListQuiz = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [arrQuiz, setArrQuiz] = useState([]);
  useEffect(() => {
    getQuizData();
  }, []);
  const getQuizData = async () => {
    const res = await getQuizByUser();
    if (res && res.EC === 0) {
      setArrQuiz(res.DT);
    }
  };
  return (
    <div className="list-quiz-container container">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((item, index) => {
          return (
            <div
              className="card"
              style={{ width: "18rem" }}
              key={`${index}-quiz`}
            >
              <img
                src={`data:image/png;base64,${item.image}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">
                  {t("listquiz.title")} {index + 1}
                </h5>
                <p className="card-text">{item.description}</p>
                <button
                  href="#"
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/quiz/${item.id}`, {
                      state: { quizTitle: item.description }, //dung cho location
                    })
                  }
                >
                  {t("listquiz.btn")}
                </button>
              </div>
            </div>
          );
        })}
      {arrQuiz && arrQuiz.length === 0 && <div>You dont have Quiz now...</div>}
    </div>
  );
};
export default ListQuiz;
