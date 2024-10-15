import React, { useState } from "react";

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
