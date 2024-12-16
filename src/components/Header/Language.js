import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation, Trans } from "react-i18next";

const Languages = (props) => {
  const { t, i18n } = useTranslation();
  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  return (
    <>
      <NavDropdown
        title={i18n.language === "vi" ? "Viet Nam" : "English"}
        id="basic-nav-dropdown2"
        className="mx-3 language"
      >
        <NavDropdown.Item
          onClick={() => {
            handleChangeLanguage("en");
          }}
        >
          English
        </NavDropdown.Item>
        <NavDropdown.Item
          onClick={() => {
            handleChangeLanguage("vi");
          }}
        >
          Viet Nam
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};
export default Languages;
