const RightContent = (props) => {
  const { dataQuiz } = props;
  console.log(">>", dataQuiz);

  return (
    <>
      <div className="main-timer">10:00</div>
      <div className="main-question mt-2">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div key={index} className="question">
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};
export default RightContent;
