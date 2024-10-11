import React, { useState } from "react";
import AddUserinfo from "./AddUserinfo";
import DisplayInfo from "./DisplayInfor";
// class MyComponents extends React.Component {
//   state = {
//     listUser: [
//       {
//         id: 1,
//         name: "VanDao",
//         age: 20,
//       },
//       {
//         id: 2,
//         name: "VuDao",
//         age: 21,
//       },
//       {
//         id: 3,
//         name: "VuVanDao",
//         age: 22,
//       },
//     ],
//   };
//   handleAddNewUser = (userInfo) => {
//     this.setState({
//       listUser: [...this.state.listUser, userInfo],
//     });
//   };
//   handleDeleteUser = (userId) => {
//     let listUserClone = [...this.state.listUser];

//     let listUserCloneNew = listUserClone.filter((item) => {
//       return item.id !== userId;
//     });

//     this.setState({
//       listUser: listUserCloneNew,
//     });
//   };
//   render() {
//     return (
//       <div>
//         <AddUserinfo handleAddNewUser={this.handleAddNewUser} />
//         <br />
//         <br />
//         <DisplayInfo
//           listUser={this.state.listUser}
//           handleDeleteUser={this.handleDeleteUser}
//         />
//       </div>
//     );
//   }
// }
const MyComponents = (props) => {
  const [listUser, setListUser] = useState([
    {
      id: 1,
      name: "VanDao",
      age: 20,
    },
    {
      id: 2,
      name: "VuDao",
      age: 21,
    },
    {
      id: 3,
      name: "VuVanDao",
      age: 22,
    },
  ]);
  const handleAddNewUser = (userInfo) => {
    setListUser([...listUser, userInfo]);
  };
  const handleDeleteUser = (userId) => {
    let listUserClone = [...listUser];

    let listUserCloneNew = listUserClone.filter((item) => {
      return item.id !== userId;
    });
    setListUser(listUserCloneNew);
  };

  return (
    <>
      <div>
        <AddUserinfo handleAddNewUser={handleAddNewUser} />
        <br />
        <br />
        <DisplayInfo listUser={listUser} handleDeleteUser={handleDeleteUser} />
      </div>
    </>
  );
};
export default MyComponents;
