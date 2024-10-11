import React, { useState } from "react";
// class AddUserinfo extends React.Component {
//   state = {
//     name: "dao",
//     address: "Nam Dinh",
//     age: 19,
//   };
//   handleSubmit = (event) => {
//     event.preventDefault();
//     this.props.handleAddNewUser({
//       id: Math.floor(Math.random() * 100 + 1),
//       name: this.state.name,
//       age: this.state.age,
//     });
//   };
//   handleChangeName = (event) => {
//     event.preventDefault();
//     this.setState({
//       name: event.target.value,
//     });
//   };
//   handleChangeAge = (event) => {
//     event.preventDefault();
//     this.setState({
//       age: event.target.value,
//     });
//   };
//   render() {
//     return (
//       <>
//         my name is {this.state.name} and im from {this.state.address} and im
//         {this.state.age}
//         <br />
//         <form onSubmit={(event) => this.handleSubmit(event)}>
//           <label>your name:</label>
//           <input
//             type="text"
//             onChange={(event) => this.handleChangeName(event)}
//             value={this.state.name}
//           />
//           <label>your age:</label>
//           <input
//             type="text"
//             onChange={(event) => this.handleChangeAge(event)}
//             value={this.state.age}
//           />
//           <button>Submit</button>
//         </form>
//       </>
//     );
//   }
// }
const AddUserinfo = (props) => {
  const [name, setName] = useState("dao");
  const [age, setAge] = useState(19);
  const [address, setAddress] = useState("Nam Dinh");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1),
      name: name,
      age: age,
    });
  };
  const handleChangeName = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };
  const handleChangeAge = (event) => {
    event.preventDefault();
    setAge(event.target.value);
  };
  return (
    <>
      my name is {name} and im from {address} and im
      {age}
      <br />
      <form onSubmit={(event) => handleSubmit(event)}>
        <label>your name:</label>
        <input
          type="text"
          onChange={(event) => handleChangeName(event)}
          value={name}
        />
        <label>your age:</label>
        <input
          type="text"
          onChange={(event) => handleChangeAge(event)}
          value={age}
        />
        <button>Submit</button>
      </form>
    </>
  );
};
export default AddUserinfo;
