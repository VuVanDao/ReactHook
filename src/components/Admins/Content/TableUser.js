import { useEffect, useState } from "react";
import { getAllUserService } from "../../../service/apiService";
const TableUser = (props) => {
  const { listUser, handleClickBtnUpdate, handleClickBtnView } = props;

  return (
    <>
      <table className="table table-hover table-hovered">
        <thead>
          <tr>
            <th scope="col">Nol.</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col" style={{ textAlign: "center" }}>
              action
            </th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <th>{index + 1}</th>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleClickBtnView(item)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleClickBtnUpdate(item)}
                    >
                      Update
                    </button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          {listUser && listUser.length === 0 && (
            <tr>
              <td colSpan={"4"}>Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default TableUser;
