import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaRegPlusSquare } from "react-icons/fa";
import React from "react";
import { toast } from "react-toastify";
import { putUpdateQuiz } from "../../../../service/apiService";
import _ from "lodash";
const ModalUpdateQuiz = (props) => {
  const { show, setShow, fetchQuiz, dataUpdate, resetUpdateData } = props;
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  console.log(">>>>dataupdate", dataUpdate);

  const handleClose = () => {
    setShow(false);
    setDescription("");
    setDifficulty("");
    setName("");
    setImage("");
    setPreviewImage("");
    resetUpdateData({});
  };
  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setDescription(dataUpdate.description);
      setDifficulty(dataUpdate.difficulty);
      setName(dataUpdate.name);
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);
  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };
  const handSubmitUpdateQuiz = async () => {
    let data = await putUpdateQuiz(
      dataUpdate.id,
      description,
      name,
      difficulty,
      image
    );
    if (data && data.EC == 0) {
      toast.success(data.EM);
      await fetchQuiz();
      handleClose();
    } else {
      toast.error(data.EM);
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                type="email"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Difficulty</label>
              <select
                id="inputState"
                className="form-select"
                onChange={(event) => setDifficulty(event.target.value)}
                value={difficulty}
              >
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
                <option>...</option>
              </select>
            </div>

            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <span>
                  <FaRegPlusSquare />
                  Upload File Image
                </span>
              </label>
              <input
                type="file"
                hidden
                id="labelUpload"
                // value={image}
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>preview image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handSubmitUpdateQuiz()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalUpdateQuiz;
