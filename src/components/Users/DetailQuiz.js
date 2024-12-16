import { useEffect, useState } from "react";
import { useParams, useLocation, NavLink } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../service/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./RightContent/RightContent";
import { useTranslation, Trans } from "react-i18next";
import Breadcrumb from "react-bootstrap/Breadcrumb";
const DetailQuiz = (props) => {
  const { t } = useTranslation();
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
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
          answers = _.orderBy(answers, ["id"], ["asc"]);
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
      if (res && res.EC === 0) {
        setIsSubmitQuiz(true);
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowModalResult(true);
        console.log(">>res", res);

        //update DataQuiz with correct answer
        if (res.DT && res.DT.quizData) {
          let dataQuizClone = _.cloneDeep(dataQuiz);
          console.log("<<<dataQuizCLone", dataQuizClone);

          let a = res.DT.quizData;
          for (let q of a) {
            for (let i = 0; i < dataQuizClone.length; i++) {
              if (+q.questionId === +dataQuizClone[i].QuestionId) {
                //update answer
                let newAnswers = [];
                for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                  let s = q.systemAnswers.find(
                    (item) => +item.id === +dataQuizClone[i].answers[j].id
                  );
                  if (s) {
                    dataQuizClone[i].answers[j].isCorrect = true;
                  }
                  newAnswers.push(dataQuizClone[i].answers[j]);
                }
                dataQuizClone[i].answers = newAnswers;
              }
            }
          }
          setDataQuiz(dataQuizClone);
        }
      } else {
        console.log("something wrong");
      }
    }
  };

  const handleShowAnswer = () => {
    if (!isSubmitQuiz) return;
    setIsShowAnswer(true);
  };
  return (
    <>
      <Breadcrumb className="Breadcrumb">
        <Breadcrumb.Item>
          <NavLink to="/">{t("header.home")}</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/users">{t("header.user")}</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Quiz</Breadcrumb.Item>
      </Breadcrumb>
      <div className="detail-quiz-container">
        <div className="left-container">
          <div className="title">
            {t("listquiz.title")} {quizId}:{location?.state?.quizTitle}
          </div>
          <hr></hr>
          <div className="q-body">
            <img />
          </div>
          <div className="q-content">
            <Question
              index={index}
              handleCheckBox={handleCheckBox}
              isShowAnswer={isShowAnswer}
              isSubmitQuiz={isSubmitQuiz}
              data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            />
          </div>
          <div className="footer">
            <button className="btn btn-secondary" onClick={() => handlePrev()}>
              {t("listquiz.prev")}
            </button>
            <button className="btn btn-primary " onClick={() => handleNext()}>
              {t("listquiz.next")}
            </button>
            <button
              className="btn btn-warning "
              onClick={() => handleFinish()}
              disabled={isSubmitQuiz}
            >
              {t("listquiz.finish")}
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
          handleShowAnswer={handleShowAnswer}
        />
      </div>
    </>
  );
};
export default DetailQuiz;
