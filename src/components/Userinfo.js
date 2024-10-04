import React from "react";
class Userinfo extends React.Component {
  state = {
    name: "dao",
    address: "Nam Dinh",
    age: 19,
  };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };
  handleChangeName = (event) => {
    event.preventDefault();
    this.setState({
      name: event.target.value,
    });
  };
  handleChangeAge = (event) => {
    event.preventDefault();
    this.setState({
      age: event.target.value,
    });
  };
  render() {
    return (
      <>
        my name is {this.state.name} and im from {this.state.address} and im
        {this.state.age}
        <br />
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <label>your name:</label>
          <input
            type="text"
            onChange={(event) => this.handleChangeName(event)}
            value={this.state.name}
          />
          <label>your age:</label>
          <input
            type="text"
            onChange={(event) => this.handleChangeAge(event)}
            value={this.state.age}
          />
          <button>Submit</button>
        </form>
      </>
    );
  }
}
export default Userinfo;
