import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUserService } from "../../../service/apiService";
import { toast } from "react-toastify";
const ModalDeleteUser = (props) => {
  const {
    show,
    setShow,
    fetchListUser,
    dataDelete,
    resetUpdateData,
    fetchListUserWithPaginate,
    currentPage,
    setCurrentPage,
  } = props;

  const handleClose = () => setShow(false);
  const handleSubmitDeleteUser = async () => {
    let data = await deleteUserService(dataDelete.id);
    if (data && data.EC == 0) {
      toast.success(data.EM);
      await fetchListUserWithPaginate(currentPage);
      setCurrentPage(currentPage);
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
          Confirm Delete user with email:
          {dataDelete && dataDelete.email ? dataDelete.email : ""}
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

export default ModalDeleteUser;
