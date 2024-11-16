import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDataQuiz } from "../../service/apiService";
import _ from "lodash";
const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
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
              item = item.image;
            }
            answers.push(item.answers);
          });
          let detail = {};
          detail.QuestionId = key;
          return { QuestionId: key, data: answers };
        })
        .value();
      console.log(">>>", data);
    }
  };
  return <div className="detail-quiz-container">DetailQuiz</div>;
};
export default DetailQuiz;
