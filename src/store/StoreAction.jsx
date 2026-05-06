export const setError = (val) => {
  return {
    type: "ERROR",
    payload: val,
  };
};

export const setMessage = (val) => {
  return {
    type: "MESSAGE",
    payload: val,
  };
};

export const setSuccess = (val) => {
  return {
    type: "SUCCESS",
    payload: val,
  };
};

export const setIsShow = (val) => {
  return {
    type: "SHOW",
    payload: val,
  };
};

export const setIsArchive = (val) => {
  return {
    type: "ARCHIVE",
    payload: val,
  };
};

export const setIsDelete = (val) => {
  return {
    type: "DELETE",
    payload: val,
  };
};

export const setIsRestore = (val) => {
  return {
    type: "RESTORE",
    payload: val,
  };
};

export const setIsAdd = (val) => {
  return {
    type: "IS_ADD",
    payload: val,
  };
};

export const setIsSearch = (val) => {
  return {
    type: "IS_SEARCH",
    payload: val,
  };
};

export const setCreatePassSuccess = (val) => {
  return {
    type: "IS_CREATE_PASS_SUCCCESS",
    payload: val,
  };
};

export const setForgotPassSuccess = (val) => {
  return {
    type: "IS_FORGET_PASS_SUCCCESS",
    payload: val,
  };
};

export const setIsLogin = (val) => {
  return {
    type: "IS_LOGIN",
    payload: val,
  };
};

export const setIsLogout = (val) => {
  return {
    type: "IS_LOGOUT",
    payload: val,
  };
};

export const setIsAccountUpdated = (val) => {
  return {
    type: "IS_ACCOUNT_UPDATED",
    payload: val,
  };
};

export const setIsLeaveOpen = (val) => {
  return {
    type: "IS_LEAVE_OPEN",
    payload: val,
  };
};

export const setIsSettingsOpen = (val) => {
  return {
    type: "IS_SETTINGS_OPEN",
    payload: val,
  };
};

export const setIsKpiOpen = (val) => {
  return {
    type: "IS_KPI_OPEN",
    payload: val,
  };
};

export const setIsRoomOpen = (val) => {
  return {
    type: "IS_ROOM_OPEN",
    payload: val,
  };
};

export const setIsPayrollOpen = (val) => {
  return {
    type: "IS_PAYROLL_OPEN",
    payload: val,
  };
};

export const setIsMemoOpen = (val) => {
  return {
    type: "IS_MEMO_OPEN",
    payload: val,
  };
};

export const setIsViewImage = (val) => {
  return {
    type: "IS_VIEW_IMAGE",
    payload: val,
  };
};

export const setIsViewTab = (val) => {
  return {
    type: "IS_VIEW_TAB",
    payload: val,
  };
};

export const setIsViewTabModal = (val) => {
  return {
    type: "IS_VIEW_TAB_MODAL",
    payload: val,
  };
};

export const setIsViewTabModalLog = (val) => {
  return {
    type: "IS_VIEW_TAB_MODAL_LOG",
    payload: val,
  };
};

export const setIsNewFeature = (val) => {
  return {
    type: "IS_NEW_FEATURE",
    payload: val,
  };
};

export const setCredentials = (data) => {
  return {
    type: "CREDENTIALS",
    payload: {
      data,
    },
  };
};

export const setScrollPosition = (val) => {
  return {
    type: "SCROLL_POSITION",
    payload: val,
  };
};

export const setFilterValues = (data) => {
  return {
    type: "FILTER_VALUES",
    payload: data,
  };
};

export const setIsAddAccomplishment = (val) => {
  return {
    type: "IS_ADD_ACCOMPLISHMENT",
    payload: val,
  };
};
