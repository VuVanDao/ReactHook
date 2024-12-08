import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import { useEffect, useState } from "react";

const Question = (props) => {
  const { data, index, handleCheckBox } = props;
  const [isPreviewImage, setIsPreviewImage] = useState(false);

  if (_.isEmpty(data)) {
    return <></>;
  }
  const handleHandleCheckBox = (event, aId, qId) => {
    console.log(">>>", aId, qId);
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
        Question {index + 1}: {data.QuestionDescription}?
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
                    onChange={(event) =>
                      handleHandleCheckBox(event, item.id, data.QuestionId)
                    }
                  />
                  <label className="form-check-label">{item.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default Question;
