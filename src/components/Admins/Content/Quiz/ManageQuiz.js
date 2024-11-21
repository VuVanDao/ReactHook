import { useState } from "react";
import "./ManageQuiz.scss";
import Select from "react-select";
const options = [
  { value: "EASY", label: "one" },
  { value: "MEDIUM", label: "two" },
  { value: "HARD", label: "three" },
];
const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState(null);
  const handleChangeFile = (event) => {};
  return (
    <div className="quiz-container">
      <div className="title">Manage Quiz</div>
      <div className="add-new"></div>
      <hr />
      <fieldset className="border rounded-3 p-3">
        <legend className="float-none w-auto px-3">Add new quiz:</legend>
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label>Name</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            placeholder="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <label>Description</label>
        </div>
        <div className="my-3">
          <Select value={type} options={options} placeholder={"Quiz type"} />
        </div>
        <div className="more-actions form-group">
          <label className="mb-3" onChange={(event) => handleChangeFile(event)}>
            Upload image
          </label>
          <input type="file" className="form-control" />
        </div>
      </fieldset>
      <div className="list-detail">table</div>
    </div>
  );
};
export default ManageQuiz;
