import { useEffect, useState } from "react";
import Select from "react-select";
import "./QuizQA.scss";
import { BsFillPatchPlusFill, BsFillPatchMinusFill } from "react-icons/bs";
import { AiFillPlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";
import {
  getAllQuizForAdmin,
  postCreateNewAnswerForQuestions,
  postCreateNewQuestionForQuiz,
  getQuizWithQA,
} from "../../../../service/apiService";
import { toast } from "react-toastify";

const QuizQA = (props) => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  useEffect(() => {
    fetchQuiz();
  }, []);
  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) fetchQuizWithQA();
  }, [selectedQuiz]);
  function urltoFile(url, filename, mimeType) {
    if (url.startsWith("data:")) {
      var arr = url.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime || mimeType });
      return Promise.resolve(file);
    }
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  }
  const fetchQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    if (res && res.EC === 0) {
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question-${q.id}.png`;
          q.imageFile = await urltoFile(
            `data:image/png;base64,${q.imageFile}`,
            `Question-${q.id}.png`,
            "image/png"
          );
        }
        newQA.push(q);
      }
      setQuestions(newQA);
    }
  };
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id}-${item.description}`,
        };
      });
      setListQuiz(newQuiz);
    }
  };
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ];
  const [questions, setQuestions] = useState(initQuestions);
  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionsClone = questions;
      questionsClone = questionsClone.filter((item) => item.id !== id);
      setQuestions(questionsClone);
    }
  };
  const handleAddRemoveAnswer = (type, answerId, questionId) => {
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      // let questionsClone = questions;
      // questionsClone = questionsClone.find((item) => item.id === questionId);
      // questionsClone.answers.push(newAnswer);
      // questions.map((item) => {
      //   if (item.id === questionId) {
      //     item = questionsClone;
      //   }
      // });
      // setQuestions([...questions]);
      //c2
      let answerClone = _.cloneDeep(questions);
      let index = answerClone.findIndex((item) => item.id === questionId); //tìm question de them answer
      answerClone[index].answers.push(newAnswer);
      setQuestions(answerClone);
    }
    if (type === "REMOVE") {
      // let answerClone = questions;
      // answerClone = answerClone.find((item) => item.id === questionId);

      // const newAnswerCLone = answerClone;
      // answerClone = answerClone.answers.find((item) => item.id === answerId);
      // newAnswerCLone.answers = newAnswerCLone.answers.filter(
      //   (item) => item.id !== answerClone.id
      // );

      // questions.map((item) => {
      //   if (item.id === newAnswerCLone.id) {
      //     item = newAnswerCLone;
      //   }
      // });
      // setQuestions([...questions]);
      //c2
      let answerClone = _.cloneDeep(questions);
      let index = answerClone.findIndex((item) => item.id === questionId); //tìm question de xoa answer
      answerClone[index].answers = answerClone[index].answers.filter(
        (item) => item.id !== answerId
      );
      setQuestions(answerClone);
    }
  };
  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionsClone = _.cloneDeep(questions);
      let index = questionsClone.findIndex((item) => item.id === questionId); //tìm question de them answer
      if (index > -1) {
        questionsClone[index].description = value;
        setQuestions(questionsClone);
      }
    }
  };
  const handleOnChangeFileQuestion = (questionId, event) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId); //tìm question de them answer
    if (
      index > -1 &&
      event.target &&
      event.target.files &&
      event.target.files[0]
    ) {
      questionsClone[index].imageFile = event.target.files[0];
      questionsClone[index].imageName = event.target.files[0].name;
      setQuestions(questionsClone);
    }
  };
  const handleAnswerQuestion = (type, questionId, answerId, value) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId); //tìm question de them answer
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answers) => {
          if (answers.id === answerId) {
            if (type === "CHECKBOX") answers.isCorrect = value;
            if (type === "INPUT") answers.description = value;
          }
          return answers;
        }
      );
      setQuestions(questionsClone);
    }
  };
  const handleSubmitQuestionForQuiz = async () => {
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Plz choose a quiz to continue!!!");
      return;
    }
    //validate answers
    let isValidAnswer = true;
    let indexQ = 0,
      indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexA = j;
          break;
        }
      }
      if (isValidAnswer === false) {
        indexQ = i;
        break;
      }
    }
    if (isValidAnswer === false) {
      toast.error(
        `Plz fill description of answer at ${indexA + 1} , question ${
          indexQ + 1
        }`
      );
      return;
    }
    //validate questions
    let isValidQuestion = true;
    let indexQ1 = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQuestion = false;
        indexQ1 = i;
        break;
      }
    }
    if (isValidQuestion === false) {
      toast.error(`Plz fill description of question ${indexQ1 + 1}`);
      return;
    }
    //submit questions
    //  await Promise.all(
    //   questions.map(async (question) => {
    //     const q = await postCreateNewQuestionForQuiz(
    //       +selectedQuiz.value,
    //       question.description,
    //       question.imageFile
    //     );
    //     //submit answer
    //     await Promise.all(
    //       question.answers.map(async (answer) => {
    //         await postCreateNewAnswerForQuestions(
    //           answer.description,
    //           answer.isCorrect,
    //           q.DT.id
    //         );
    //       })
    //     );
    //   })
    // );
    //submit questions
    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );
      //submit answer
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestions(
          answer.description,
          answer.isCorrect,
          q.DT.id
        );
      }
      toast.success("Complete");
      setQuestions(initQuestions);
    }
  };
  const handlePreviewImage = (questionId) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex((item) => item.id === questionId);
    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
      setIsPreviewImage(true);
    }
  };
  return (
    <div className="questions-container">
      <div className="add-new-question" style={{ zIndex: 10 }}>
        <div className="col-6 form-group">
          <label className="mb-2">Select Quiz</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
            className="form-control"
          />
        </div>
        <div className="my-3 mb-2">Add questions:</div>
        {/* ds cac cau hoi */}
        {questions &&
          questions.length > 0 &&
          questions.map((item, index) => {
            return (
              <div className="q-main mb-5" key={item.id} style={{ zIndex: 0 }}>
                <div className="questions-content">
                  <div className="form-floating description ">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="name@example.com"
                      value={item.description}
                      onChange={(event) =>
                        handleOnChange("QUESTION", item.id, event.target.value)
                      }
                    />
                    <label style={{ zIndex: 0 }}>
                      Questions {index + 1}'s Description
                    </label>
                  </div>
                  <div className="group-upload">
                    <label className="label-upload" htmlFor={`${item.id}`}>
                      <RiImageAddFill className="label-up" />
                    </label>
                    <input
                      id={`${item.id}`}
                      type="file"
                      hidden
                      onChange={(event) =>
                        handleOnChangeFileQuestion(item.id, event)
                      }
                    />
                    <span>
                      {item.imageName ? (
                        <span onClick={() => handlePreviewImage(item.id)}>
                          {item.imageName}
                        </span>
                      ) : (
                        <span>"Upload....."</span>
                      )}
                    </span>
                  </div>
                  <div className="btn-add">
                    <span
                      className="icon-add"
                      onClick={() => handleAddRemoveQuestion("ADD", "")}
                    >
                      <BsFillPatchPlusFill className="icon-add" />
                    </span>
                    {questions.length === 1 ? (
                      ""
                    ) : (
                      <span
                        className="icon-add"
                        onClick={() =>
                          handleAddRemoveQuestion("REMOVE", item.id)
                        }
                      >
                        <BsFillPatchMinusFill className="icon-remove" />
                      </span>
                    )}
                  </div>
                </div>
                {/* ds cac cau tra loi */}
                {item.answers &&
                  item.answers.length > 0 &&
                  item.answers.map((answers, index) => {
                    return (
                      <div className="answers-content" key={answers.id}>
                        <input
                          className="form-check-input isCorrect"
                          type="checkbox"
                          checked={answers.isCorrect}
                          onChange={(event) =>
                            handleAnswerQuestion(
                              "CHECKBOX",
                              item.id,
                              answers.id,
                              event.target.checked
                            )
                          }
                        />
                        <div className="form-floating answer-name ">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="name@example.com"
                            value={answers.description}
                            onChange={(event) =>
                              handleAnswerQuestion(
                                "INPUT",
                                item.id,
                                answers.id,
                                event.target.value
                              )
                            }
                          />
                          <label style={{ zIndex: 0 }}>
                            Answer {index + 1}
                          </label>
                        </div>
                        <div className="btn-group">
                          <span className="icon-add">
                            <AiFillPlusCircle
                              className="icon-add"
                              onClick={() =>
                                handleAddRemoveAnswer(
                                  "ADD",
                                  answers.id,
                                  item.id
                                )
                              }
                            />
                          </span>
                          {item.answers.length === 1 ? (
                            ""
                          ) : (
                            <span className="icon-add">
                              <AiOutlineMinusCircle
                                className="icon-remove"
                                onClick={() =>
                                  handleAddRemoveAnswer(
                                    "REMOVE",
                                    answers.id,
                                    item.id
                                  )
                                }
                              />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        {questions && questions.length > 0 && (
          <div>
            <button
              className="btn btn-warning"
              onClick={() => handleSubmitQuestionForQuiz()}
            >
              Save questions
            </button>
          </div>
        )}
        {isPreviewImage && (
          <Lightbox
            image={dataImagePreview.url}
            title={dataImagePreview.title}
            onClose={() => setIsPreviewImage(false)}
          ></Lightbox>
        )}
      </div>
    </div>
  );
};
export default QuizQA;
