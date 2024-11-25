import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../service/apiService";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
const TableQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, []);
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) setListQuiz(res.DT);
  };
  const handleClickBtnUpdate = (quiz) => {
    setShowModalUpdateQuiz(true);
    setDataUpdate(quiz);
  };
  const handleClickBtnDelete = (quiz) => {
    setShowModalDeleteQuiz(true);
    setDataDelete(quiz);
  };
  const resetUpdateData = () => {
    setDataUpdate({});
  };
  return (
    <>
      <div className="mt-3">List Quizzes:</div>
      <table className="table table-hover table-bordered my-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((item, index) => {
              return (
                <tr key={`table-quiz-${index}`}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td style={{ display: "flex", gap: "10px" }}>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleClickBtnUpdate(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickBtnDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalUpdateQuiz
        show={showModalUpdateQuiz}
        setShow={setShowModalUpdateQuiz}
        dataUpdate={dataUpdate}
        fetchQuiz={fetchQuiz}
        resetUpdateData={resetUpdateData}
      />
      <ModalDeleteQuiz
        show={showModalDeleteQuiz}
        setShow={setShowModalDeleteQuiz}
        dataDelete={dataDelete}
        fetchQuiz={fetchQuiz}
        resetUpdateData={resetUpdateData}
      />
    </>
  );
};
export default TableQuiz;
