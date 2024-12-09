import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../service/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./RightContent/RightContent";
const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});
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
  };
  const handleFinish = async () => {
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((item) => {
        let questionId = item.QuestionId;
        let userAnswerId = [];
        item.answers.forEach((a) => {
          if (a.isSelected === true) {
            userAnswerId.push(a.id);
          }
        });
        answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });
      payload.answers = answers;
      //submit api
      let res = await postSubmitQuiz(payload);
      console.log(">>>check res", res);
      if (res && res.EC === 0) {
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowModalResult(true);
      } else {
        console.log("something wrong");
      }
    }
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
          <button className="btn btn-warning " onClick={() => handleFinish()}>
            Finish
          </button>
        </div>
      </div>
      <div className="right-container">
        <RightContent
          dataQuiz={dataQuiz}
          handleFinish={handleFinish}
          setIndex={setIndex}
        />
      </div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
        setDataModalResult={setDataModalResult}
      />
    </div>
  );
};
export default DetailQuiz;
