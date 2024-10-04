import React from "react";
class MyComponents extends React.Component {
  state = {
    name: "dao",
    address: "Nam Dinh",
    age: 19,
  };
  handleMouse = (event) => {
    console.log(event.pageX);
  };
  handleClick = (event) => {
    console.log(this.state.name);
    console.log(this.state.age++);
    console.log(event);
    this.setState({
      name: "dasdasda",
      age: this.state.age++,
    });
  };
  render() {
    return (
      <div>
        my name is {this.state.name} and im from {this.state.address} and im
        {this.state.age}
        <br />
        <button onMouseOver={this.handleMouse}>push</button>
        <button onClick={(event) => this.handleClick(event)}>touch</button>
      </div>
    );
  }
}
export default MyComponents;
