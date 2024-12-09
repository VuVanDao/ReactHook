import CountDown from "./CountDown";
import { useRef } from "react";
const RightContent = (props) => {
  const refDiv = useRef([]);

  const { dataQuiz, handleFinish, setIndex } = props;
  const onTimeUp = () => {
    handleFinish();
  };
  const getClassQuestion = (question) => {
    //check answer
    if (question && question.answers.length > 0) {
      let isUnAnswered = question.answers.find((item) => {
        return item.isSelected === true;
      });

      if (isUnAnswered) {
        return "question selected";
      }
    }
    return "question";
  };
  const handleClickQuestion = (question, index) => {
    setIndex(index);
    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "question clicked") {
          item.className = "question";
        }
      });
    }
    if (question && question.answers.length > 0) {
      let isUnAnswered = question.answers.find((item) => {
        return item.isSelected === true;
      });
      if (isUnAnswered) {
        return "question selected";
      }
    }
    refDiv.current[index].className = "question clicked";
  };
  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question mt-2">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div
                key={index}
                className={getClassQuestion(item)}
                onClick={() => handleClickQuestion(item, index)}
                ref={(element) => (refDiv.current[index] = element)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};
export default RightContent;
