import NavDropdown from "react-bootstrap/NavDropdown";
const Languages = (props) => {
  return (
    <>
      <NavDropdown
        title="VietNam"
        id="basic-nav-dropdown2"
        className="mx-3 language"
      >
        <NavDropdown.Item>English</NavDropdown.Item>
        <NavDropdown.Item>Viet Nam</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};
export default Languages;
