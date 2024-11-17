import _ from "lodash";
const Question = (props) => {
  const { data, index, handleCheckBox } = props;
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
          <img src={`data:image/png;base64,${data.image}`} alt="..." />
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
