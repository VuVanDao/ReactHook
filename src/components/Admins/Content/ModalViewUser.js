import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaRegPlusSquare } from "react-icons/fa";
import React from "react";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../service/apiService";
import _ from "lodash";
const ModalViewUser = (props) => {
  const { show, setShow, fetchListUser, dataUpdate, resetUpdateData } = props;

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUserName("");
    setImage("");
    setRole("USER");
    setPreviewImage("");
    resetUpdateData({});
  };
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("USER");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      setUserName(dataUpdate.username);
      setRole(dataUpdate.role);
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);
  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
    }
  };

  //   const handSubmitCreateUser = async () => {
  //     let data = await putUpdateUser(dataUpdate.id, username, role, image);
  //     if (data && data.EC == 0) {
  //       toast.success(data.EM);
  //       await fetchListUser();
  //       handleClose();
  //     } else {
  //       toast.error(data.EM);
  //     }
  //   };
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
          <Modal.Title>View a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                disabled
                type="email"
                className="form-control"
                value={email}
                // onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                disabled
                type="password"
                className="form-control"
                value={password}
                // onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">UserName</label>
              <input
                disabled
                type="text"
                className="form-control"
                value={username}
                // onChange={(event) => setUserName(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                disabled
                id="inputState"
                className="form-select"
                // onChange={(event) => setRole(event.target.value)}
                value={role}
              >
                <option value="USER">USER...</option>
                <option value="ADMIN">ADMIN...</option>
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
                disabled
                type="file"
                hidden
                id="labelUpload"
                // value={image}
                // onChange={(event) => handleUploadImage(event)}
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
          <Button variant="primary" disabled>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalViewUser;
