import React from "react";
class MyComponents extends React.Component {
  state = {
    name: "dao",
    address: "Nam Dinh",
    age: 19,
  };
  render() {
    return (
      <div>
        my name is {this.state.name} and im from {this.state.address}
      </div>
    );
  }
}
export default MyComponents;
