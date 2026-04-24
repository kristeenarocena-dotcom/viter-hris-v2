import React from "react";
import { StoreContext } from "../../../store/StoreContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { apiVersion } from "../../../functions/functions-general";
import { queryDataInfinite } from "../../../functions/custom-hooks/queryDataInfinite";
import { useInView } from "react-intersection-observer";
import NoData from "../../../partials/NoData";
import ServerError from "../../../partials/ServerError";
import TableLoading from "../../../partials/TableLoading";
import FetchingSpinner from "../../../partials/spinners/FetchingSpinner";
import Loadmore from "../../../partials/Loadmore";
import Status from "../../../partials/Status";
import { FaArchive, FaEdit, FaEye, FaTrash, FaTrashRestore } from "react-icons/fa";
import {
  setIsAdd,
  setIsArchive,
  setIsDelete,
  setIsRestore,
} from "../../../store/StoreAction";
import ModalArchive from "../../../partials/modals/ModalArchive";
import ModalRestore from "../../../partials/modals/ModalRestore";
import ModalDelete from "../../../partials/modals/ModalDelete";
import SearchBar from "../../../partials/SearchBar";
import ModalViewMemo from "./ModalViewMemo";

const MemoList = ({ itemEdit, setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const [page, setPage] = React.useState(1);
  const [filterData, setFilterData] = React.useState("");
  const [onSearch, setOnSearch] = React.useState(false);
  const [isView, setIsView] = React.useState(false);
  const [viewItem, setViewItem] = React.useState(null);
  const search = React.useRef({ value: "" });
  const { ref, inView } = useInView();
  let counter = 1;

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["memo", search.current.value, store.isSearch, filterData],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        ``, // search endpoint
        `${apiVersion}/controllers/developers/memo/page.php?start=${pageParam}`, // list endpoint
        false,
        {
          filterData,
          searchValue: search?.current?.value,
        },
        `post`,
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsArchive(true));
    setItemEdit(item);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setItemEdit(item);
  };

  const handleDelete = (item) => {
    dispatch(setIsDelete(true));
    setItemEdit(item);
  };

  const handleView = (item) => {
    setViewItem(item);
    setIsView(true);
  };

  const handleFilterChange = (e) => {
    setPage(1);
    setFilterData(e.target.value);
  };

  return (
    <>
      <div className="flex items-center justify-between pt-5">
        <div className="relative">
          <label htmlFor="" >Status</label>
          <select onChange={handleFilterChange} value={filterData}>
            <option value="">All</option>
            <option value="1" >Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
        <SearchBar
          search={search}
          dispatch={dispatch}
          store={store}
          result={result?.pages}
          isFetching={isFetching}
          setOnSearch={setOnSearch}
          onSearch={onSearch}
        />
      </div>
      <div className="relative pt-4 rounded-md">
        {status !== "pending" && isFetching && <FetchingSpinner />}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Date</th>
              <th>Category</th>
              <th>Memo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!error &&
              (status == "pending" || result?.pages[0]?.count == 0) && (
                <tr>
                  <td colSpan="100%" className="p-10">
                    {status == "pending" ? (
                      <TableLoading cols={5} count={20} />
                    ) : (
                      <NoData />
                    )}
                  </td>
                </tr>
              )}

            {error && (
              <tr>
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}
            {result?.pages?.map((page, key) => (
              <React.Fragment key={key}>
                {page?.data?.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td>{counter++}</td>
                      <td>
                        {
                          <Status
                            text={`${item.memo_is_active == 1 ? "active" : "inactive"}`}
                          />
                        }
                      </td>
                      <td>{item.memo_date}</td>
                      <td>{item.memo_category}</td>
                      <td>{item.memo_text?.substring(0, 60)}{item.memo_text?.length > 60 ? "..." : ""}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            className="tooltip-action-table"
                            data-tooltip="View"
                            onClick={() => handleView(item)}
                          >
                            <FaEye />
                          </button>
                          {item.memo_is_active == 1 ? (
                            <>
                              <button
                                type="button"
                                className="tooltip-action-table"
                                data-tooltip="Edit"
                                onClick={() => handleEdit(item)}
                              >
                                <FaEdit />
                              </button>
                              <button
                                type="button"
                                className="tooltip-action-table"
                                data-tooltip="Archive"
                                onClick={() => handleArchive(item)}
                              >
                                <FaArchive />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="tooltip-action-table"
                                data-tooltip="Restore"
                                onClick={() => handleRestore(item)}
                              >
                                <FaTrashRestore />
                              </button>
                              <button
                                type="button"
                                className="tooltip-action-table"
                                data-tooltip="Delete"
                                onClick={() => handleDelete(item)}
                              >
                                <FaTrash />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <div className="loadmore flex justify-center flex-col items-center pb-10">
          <Loadmore
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            result={result?.pages[0]}
            setPage={setPage}
            page={page}
            refView={ref}
            isSearchOrFilter={store.isSearch || result?.isFilter}
          />
        </div>
      </div>

      {isView && viewItem && (
        <ModalViewMemo item={viewItem} handleClose={() => setIsView(false)} />
      )}

      {store.isArchive && (
        <ModalArchive
          mysqlApiArchive={`${apiVersion}/controllers/developers/memo/active.php?id=${itemEdit.memo_aid}`}
          dataItem={itemEdit}
          msg="Are you sure you want to archive this memo?"
          successMsg={"Successfully archived"}
          item={itemEdit.memo_category}
          queryKey="memo"
        />
      )}

      {store.isRestore && (
        <ModalRestore
          mysqlApiRestore={`${apiVersion}/controllers/developers/memo/active.php?id=${itemEdit.memo_aid}`}
          dataItem={itemEdit}
          msg="Are you sure you want to restore this memo?"
          successMsg={"Successfully restored"}
          item={itemEdit.memo_category}
          queryKey="memo"
        />
      )}

      {store.isDelete && (
        <ModalDelete
          mysqlApiDelete={`${apiVersion}/controllers/developers/memo/memo.php?id=${itemEdit.memo_aid}`}
          dataItem={itemEdit}
          msg="Are you sure you want to delete this memo?"
          successMsg={"Successfully deleted"}
          item={itemEdit.memo_category}
          queryKey="memo"
        />
      )}
    </>
  );
};

export default MemoList;