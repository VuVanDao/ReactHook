import _ from "lodash";
const Question = (props) => {
  const { data, index } = props;
  if (data) {
  }
  return (
    <>
      {data.image ? (
        <div>
          <img
            src={`data:image/png;base64,${data.image}`}
            className="q-image"
            alt="..."
          />
        </div>
      ) : (
        ""
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
                  <input className="form-check-input" type="checkbox" />
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
