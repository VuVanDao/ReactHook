import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../service/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import Languages from "./Language";
import { useTranslation, Trans } from "react-i18next";
import ModalInfoHomePage from "../Home/ModalInfoHomePage";
import { useState } from "react";
const Header = () => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };
  const handleLogOut = async () => {
    let res = await logout(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      dispatch(doLogout());
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };
  const [showModalInfoHomePage, setShowModalInfoHomePage] = useState(false);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink to="/" className="navbar-brand">
            VanDaoHeHe
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                {t("header.home")}
              </NavLink>
              <NavLink to="users" className="nav-link">
                {t("header.user")}
              </NavLink>
              <NavLink to="admins" className="nav-link">
                {t("header.admin")}
              </NavLink>
            </Nav>
            <Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder={t("header.search.search")}
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">
                  {t("header.search.btn-search")}
                </Button>
              </Form>
            </Nav>
            <Nav>
              {isAuthenticated === false ? (
                <>
                  <button className="btn-login" onClick={() => handleLogin()}>
                    {t("header.login.login")}
                  </button>
                  <button
                    className="btn-signup"
                    onClick={() => handleRegister()}
                  >
                    {t("header.login.sign-up")}
                  </button>
                </>
              ) : (
                <>
                  <NavDropdown
                    title={t("header.settings.settings")}
                    id="basic-nav-dropdown"
                    className="mx-5"
                  >
                    <NavDropdown.Item
                      href="#action/3.4"
                      onClick={() => setShowModalInfoHomePage(true)}
                    >
                      {t("header.settings.profile")}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => handleLogOut()}>
                      {t("header.settings.logout")}
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
              <Languages />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalInfoHomePage
        show={showModalInfoHomePage}
        setShow={setShowModalInfoHomePage}
      />
    </>
  );
};

export default Header;
