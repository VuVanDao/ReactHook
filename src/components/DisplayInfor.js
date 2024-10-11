import React, { useState } from "react";
import logo from "./../logo.svg";
// class DisplayInfo extends React.Component {
//   constructor(props) {
//     console.log("<><><><><><><>constructor");
//     super(props);
//     this.state = {
//       isShowListUser: true,
//     };
//   }
//   componentDidMount() {
//     console.log("<><><><><><><>did mount");
//   }
//   componentDidUpdate(prevProps, prevState) {
//     console.log("<>><><><> did update");
//   }
//   handleShowHide = () => {
//     this.setState({
//       isShowListUser: !this.state.isShowListUser,
//     });
//   };

//   render() {
//     console.log("<><><><><><><>render");
//     let { listUser } = this.props;
//     return (
//       <>
//         <div>
//           {/* <img src={logo} /> */}
//           <span onClick={() => this.handleShowHide()}>
//             {this.state.isShowListUser === true
//               ? "Hide list users"
//               : "Show list users"}
//           </span>
//         </div>
//         {this.state.isShowListUser && (
//           <div>
//             <div>
//               {listUser &&
//                 listUser.length > 0 &&
//                 listUser.map((item, index) => {
//                   return (
//                     <>
//                       <div
//                         key={item.id}
//                         className={item.age > 20 ? "green" : "red"}
//                       >
//                         <h1>My name:{item.name} </h1>
//                         <h1>My age:{item.age}</h1>
//                         <h1>My age:{item.id}</h1>
//                       </div>
//                       <button
//                         onClick={() => this.props.handleDeleteUser(item.id)}
//                       >
//                         Delete
//                       </button>
//                       <hr />
//                     </>
//                   );
//                 })}
//             </div>
//           </div>
//         )}
//       </>
//     );
//   }
// }
const DisplayInfo = (props) => {
  console.log("<><><><><><><>render");
  let { listUser } = props;
  const [isShowHideListUser, setShowHideListUser] = useState(true);
  const handleShowHideListUser = () => {
    setShowHideListUser(!isShowHideListUser);
  };
  return (
    <>
      <div>
        <span onClick={() => handleShowHideListUser()}>
          {isShowHideListUser ? "Hide list user" : "Show list user"}
        </span>
      </div>
      <div>
        {isShowHideListUser &&
          listUser &&
          listUser.length > 0 &&
          listUser.map((item, index) => {
            return (
              <>
                <div key={item.id} className={item.age > 20 ? "green" : "red"}>
                  <h1>My name:{item.name} </h1>
                  <h1>My age:{item.age}</h1>
                  <h1>My id:{item.id}</h1>
                </div>
                <button onClick={() => props.handleDeleteUser(item.id)}>
                  Delete
                </button>
                <hr />
              </>
            );
          })}
      </div>
    </>
  );
};
export default DisplayInfo;
