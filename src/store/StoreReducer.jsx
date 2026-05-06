export const StoreReducer = (state, action) => {
  switch (action.type) {
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "MESSAGE":
      return {
        ...state,
        message: action.payload,
      };

    case "SUCCESS":
      return {
        ...state,
        success: action.payload,
      };

    case "SHOW":
      return {
        ...state,
        isShow: action.payload,
      };

    case "ARCHIVE":
      return {
        ...state,
        isArchive: action.payload,
      };

    case "DELETE":
      return {
        ...state,
        isDelete: action.payload,
      };

    case "RESTORE":
      return {
        ...state,
        isRestore: action.payload,
      };

    case "IS_ADD":
      return {
        ...state,
        isAdd: action.payload,
      };

    case "IS_SEARCH":
      return {
        ...state,
        isSearch: action.payload,
      };

    case "IS_CREATE_PASS_SUCCCESS":
      return {
        ...state,
        isCreatePassSuccess: action.payload,
      };

    case "IS_FORGET_PASS_SUCCCESS":
      return {
        ...state,
        isForgotPassSuccess: action.payload,
      };

    case "IS_LOGIN":
      return {
        ...state,
        isLogin: action.payload,
      };

    case "IS_LOGOUT":
      return {
        ...state,
        isLogout: action.payload,
      };

    case "IS_ACCOUNT_UPDATED":
      return {
        ...state,
        isAccountUpdated: action.payload,
      };

    case "IS_LEAVE_OPEN":
      return {
        ...state,
        isLeaveOpen: action.payload,
      };

    case "IS_SETTINGS_OPEN":
      return {
        ...state,
        isSettingsOpen: action.payload,
      };

    case "IS_ROOM_OPEN":
      return {
        ...state,
        isRoomOpen: action.payload,
      };

    case "IS_KPI_OPEN":
      return {
        ...state,
        isKpiOpen: action.payload,
      };

    case "IS_PAYROLL_OPEN":
      return {
        ...state,
        isPayrollOpen: action.payload,
      };

    case "IS_MEMO_OPEN":
      return {
        ...state,
        isMemoOpen: action.payload,
      };

    case "IS_VIEW_IMAGE":
      return {
        ...state,
        isViewImage: action.payload,
      };

    case "IS_VIEW_TAB":
      return {
        ...state,
        isViewTab: action.payload,
      };

    case "IS_VIEW_TAB_MODAL":
      return {
        ...state,
        isViewTabModal: action.payload,
      };

    case "IS_VIEW_TAB_MODAL_LOG":
      return {
        ...state,
        isViewTabModalLog: action.payload,
      };

    case "IS_NEW_FEATURE":
      return {
        ...state,
        isNewFeature: action.payload,
      };

    case "SCROLL_POSITION":
      return {
        ...state,
        scrollPosition: action.payload,
      };

    case "CREDENTIALS":
      return {
        ...state,
        credentials: action.payload,
      };

    case "FILTER_VALUES":
      return {
        ...state,
        filterValues: action.payload,
      };

    case "IS_ADD_ACCOMPLISHMENT":
      return {
        ...state,
        isAddAccomplishment: action.payload,
      };

    default:
      return state;
  }
};
