import React from "react";
class MyComponents extends React.Component {
  state = {
    name: "dao",
    address: "Nam Dinh",
    age: 19,
  };
  handleClick(event) {
    console.log(event.pageX);
    console.log(this.state.name);
  }
  render() {
    return (
      <div>
        my name is {this.state.name} and im from {this.state.address}
        <br />
        <button onMouseOver={this.handleClick}>push</button>
      </div>
    );
  }
}
export default MyComponents;
