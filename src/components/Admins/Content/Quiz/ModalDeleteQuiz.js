import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteQuiz } from "../../../../service/apiService";
const ModalDeleteQuiz = (props) => {
  const { show, setShow, fetchQuiz, dataDelete, resetUpdateData } = props;

  const handleClose = () => setShow(false);
  const handleSubmitDeleteUser = async () => {
    let data = await deleteQuiz(dataDelete.id);
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
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Confirm Delete quiz :<br />
          {dataDelete.name ? dataDelete.name : "hehe"}
          <br />
          Description:
          {dataDelete?.description ? dataDelete.description : "hihi"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
