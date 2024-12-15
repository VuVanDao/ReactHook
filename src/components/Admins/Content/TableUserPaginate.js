// import { useEffect, useState } from "react";
// import { getAllUserService } from "../../../service/apiService";
import ReactPaginate from "react-paginate";
// import ReactDOM from "react-dom";
import { useTranslation, Trans } from "react-i18next";

const TableUserPaginate = (props) => {
  const { t } = useTranslation();

  const {
    listUser,
    handleClickBtnUpdate,
    handleClickBtnView,
    handleClickBtnDelete,
    fetchListUserWithPaginate,
    pageCount,
    setCurrentPage,
  } = props;
  //   const [pageCount, setPageCount] = useState(10);
  const handlePageClick = (event) => {
    fetchListUserWithPaginate(+event.selected + 1);
    setCurrentPage(+event.selected + 1);
    console.log(
      `User requested page number ${event.selected}, which is offset `
    );
  };
  //   const pageCount = Math.ceil(items.length / itemsPerPage);

  return (
    <>
      <table className="table table-hover table-hovered">
        <thead>
          <tr>
            <th scope="col">{t("manager-user.table.nol")}</th>
            <th scope="col">{t("manager-user.table.username")}</th>
            <th scope="col">Email</th>
            <th scope="col">{t("manager-user.table.role")}</th>
            <th scope="col" style={{ textAlign: "center" }}>
              {t("manager-user.table.action")}
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
                      {t("manager-user.table.btn-action.view")}
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleClickBtnUpdate(item)}
                    >
                      {t("manager-user.table.btn-action.update")}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickBtnDelete(item)}
                    >
                      {t("manager-user.table.btn-action.delete")}
                    </button>
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ReactPaginate
          nextLabel="next >"
          breakLabel="..."
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          onPageChange={handlePageClick}
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
};
export default TableUserPaginate;
