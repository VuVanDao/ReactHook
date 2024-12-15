import { useTranslation, Trans } from "react-i18next";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { FaRegPlusSquare } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  changePassword,
  getHistory,
  postLogin,
  updateProfile,
} from "../../service/apiService";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import _ from "lodash";
const ModalInfoHomePage = (props) => {
  const account = useSelector((state) => state.user.account);
  const { show, setShow } = props;
  const [UserName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [history, setHistory] = useState([]);
  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
    }
  };
  const handleChangePassword = async () => {
    let res = await changePassword(currentPassword, newPassword);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
    } else {
      toast.error(res.EM);
    }
  };
  const handleUpdateProfile = async () => {
    let res = await updateProfile(UserName, image);
    console.log(">>", res);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
    } else {
      toast.error(res.EM);
    }
  };
  const handleGetHistory = async () => {
    let res = await getHistory();
    if (res && res.EC === 0) {
      let historyData = res.DT.data;
      if (historyData.length > 8) {
        historyData = historyData.slice(
          historyData.length - 8,
          historyData.length
        );
      }
      setHistory(historyData);
    }
  };
  useEffect(() => {
    if (account && !_.isEmpty(account)) {
      setUserName(account.username);
      setPreviewImage(`data:image/jpeg;base64,${account.image}`);
      handleGetHistory();
    }
  }, [account]);
  const { t } = useTranslation();
  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setShow(false);
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
          <Modal.Title>{t("manager-user.modal.view.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="home"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title={t("HeaderModal.main-info")}>
              <Modal.Body>
                <form className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={account.email}
                      disabled
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      {t("manager-user.modal.create.password")}
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      disabled
                      // value={password}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      {t("manager-user.modal.create.username")}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={UserName}
                      onChange={(event) => setUserName(event.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">
                      {t("manager-user.modal.create.role")}
                    </label>
                    <select
                      id="inputState"
                      className="form-select"
                      // onChange={(event) => setRole(event.target.value)}
                      value={account.role}
                      disabled
                    >
                      <option value="USER">
                        {t("manager-user.modal.create.role-option.user")}...
                      </option>
                      <option value="ADMIN">
                        {t("manager-user.modal.create.role-option.admin")}...
                      </option>
                      <option>...</option>
                    </select>
                  </div>
                  <div className="col-md-12">
                    <label
                      className="form-label label-upload"
                      htmlFor="labelUpload"
                    >
                      <span>
                        <FaRegPlusSquare />
                        {t("manager-user.modal.create.image")}
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
                      <span>{t("manager-user.modal.create.preview")}</span>
                    )}
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleUpdateProfile}>
                  Save
                </Button>
              </Modal.Footer>
            </Tab>
            <Tab eventKey="profile" title={t("HeaderModal.password-info")}>
              <Modal.Body>
                <form className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">
                      {t("HeaderModal.change-password.current-password")}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(event) =>
                        setCurrentPassword(event.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">
                      {t("HeaderModal.change-password.new-password")}
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={(event) => setNewPassword(event.target.value)}
                    />
                  </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleChangePassword}>
                  Save
                </Button>
              </Modal.Footer>
            </Tab>
            <Tab eventKey="contact" title={t("HeaderModal.history")}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Quiz Name</th>
                    <th>Quiz description</th>
                    <th>Total questions</th>
                    <th>Total correct</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {history &&
                    history.map((data) => {
                      return (
                        <tr key={data.id}>
                          <td>{data.id}</td>
                          <td>{data.quizHistory.name}</td>
                          <td>{data.quizHistory.description}</td>
                          <td>{data.total_questions}</td>
                          <td>{data.total_correct}</td>
                          <td>{data.createdAt}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ModalInfoHomePage;
