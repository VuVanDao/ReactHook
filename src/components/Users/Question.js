import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";

const Question = (props) => {
  const { t } = useTranslation();
  const { data, index, handleCheckBox, isShowAnswer, isSubmitQuiz } = props;
  const [isPreviewImage, setIsPreviewImage] = useState(false);

  if (_.isEmpty(data)) {
    return <></>;
  }
  const handleHandleCheckBox = (event, aId, qId) => {
    handleCheckBox(aId, qId);
  };

  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setIsPreviewImage(true)}
            src={`data:image/png;base64,${data.image}`}
            alt="..."
          />
          {isPreviewImage && (
            <Lightbox
              image={`data:image/png;base64,${data.image}`}
              title={"hehe"}
              onClose={() => setIsPreviewImage(false)}
            ></Lightbox>
          )}
        </div>
      ) : (
        <div className="q-image"></div>
      )}
      <div className="question">
        {t("listquiz.question")} {index + 1}: {data.QuestionDescription}?
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((item, index) => {
            return (
              <div className="a-child" key={`answers-${index}`}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={item.isSelected}
                    disabled={isSubmitQuiz}
                    onChange={(event) =>
                      handleHandleCheckBox(event, item.id, data.QuestionId)
                    }
                  />
                  <label key={`answers-${index}`} className="form-check-label">
                    {item.description}
                  </label>
                  {isShowAnswer === true && (
                    <>
                      {item.isSelected === true && item.isCorrect === false && (
                        <IoIosClose className="incorrect" />
                      )}

                      {item.isCorrect === true && (
                        <IoIosCheckmark className="correct" />
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Question;
