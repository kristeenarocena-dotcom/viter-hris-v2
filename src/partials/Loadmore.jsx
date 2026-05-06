import React from "react";
import ButtonSpinner from "./spinners/ButtonSpinner";

const Loadmore = ({
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  result,
  setPage,
  page,
  refView,
  isSearchOrFilter = false,
}) => {
  if (
    result?.count > 0 &&
    (page === result?.total_pages || !hasNextPage) &&
    !isSearchOrFilter
  ) {
    return (
      <>
        {isFetchingNextPage ? (
          <button
            type="button"
            disabled={isFetchingNextPage}
            className="loadmore h-full relative my-8 text-primary p-1.5 rounded-full w-36 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ButtonSpinner />
          </button>
        ) : (
          <div className="loadmore my-8 p-1.5">End of list.</div>
        )}
      </>
    );
  }

  if (!hasNextPage && result?.count > 0 && !isSearchOrFilter) {
    return <div className="print:hidden my-6 p-1.5">End of list.</div>;
  }
  if (hasNextPage) {
    return (
      <button
        ref={refView}
        disabled={isFetchingNextPage}
        onClick={() => {
          setPage((prev) => prev + 1);
          fetchNextPage();
        }}
        className="loadmore h-full relative my-8 text-primary p-1.5 rounded-full w-36 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isFetchingNextPage ? <ButtonSpinner /> : <span>Load more</span>}
      </button>
    );
  }
};

export default Loadmore;
