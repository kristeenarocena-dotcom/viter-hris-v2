const ModalWrapperSide = ({
  children,
  handleClose,
  className = "",
  title = "",
}) => {
  return (
    <>
      <div className="modal__wrapper fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-[52] ">
        <div className="backdrop w-screen h-screen" onClick={handleClose}></div>
        <div
          className={`h-screen bg-white border border-gray-200 top-0 right-0 py-4 pl-4 w-full max-w-[25rem] shadow-xl fixed ${className}`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalWrapperSide;
