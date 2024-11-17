import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../service/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    fetchQuestions();
  }, [quizId]);
  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let QuestionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              QuestionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          let detail = {};
          detail.QuestionId = key;
          return {
            QuestionId: key,
            answers: answers,
            QuestionDescription,
            image,
          };
        })
        .value();
      setDataQuiz(data);
    }
  };
  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };
  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) {
      setIndex(index + 1);
    }
  };
  const handleCheckBox = (answerId, questionId) => {
    let dataListClone = _.cloneDeep(dataQuiz);
    let question = dataListClone.find((item) => {
      return +item.QuestionId === +questionId;
    });
    if (question && question.answers) {
      let q = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      question.answers = q;
    }
    let index = dataListClone.findIndex(
      (item) => +item.QuestionId === +questionId
    );
    if (index > -1) {
      dataListClone[index] = question;
      setDataQuiz(dataListClone);
    }
    console.log(">>>", dataListClone);
  };
  return (
    <div className="detail-quiz-container">
      <div className="left-container">
        <div className="title">
          Quiz {quizId}:{location?.state?.quizTitle}
        </div>
        <hr></hr>
        <div className="q-body">
          <img />
        </div>
        <div className="q-content">
          <Question
            index={index}
            handleCheckBox={handleCheckBox}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={() => handlePrev()}>
            Prev
          </button>
          <button className="btn btn-primary " onClick={() => handleNext()}>
            Next
          </button>
          <button className="btn btn-warning " onClick={() => handleNext()}>
            Finish
          </button>
        </div>
      </div>
      <div className="right-container">count down</div>
    </div>
  );
};
export default DetailQuiz;
