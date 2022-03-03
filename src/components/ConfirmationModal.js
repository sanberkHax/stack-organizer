export const ConfirmationModal = ({ onConfirm, onCancel, children }) => {
  const confirmHandler = (e) => {
    onConfirm(e);
  };
  const cancelHandler = (e) => {
    onCancel(e);
  };
  return (
    <div className="confirmation-modal">
      {children}
      <div className="confirmation-modal__btn-ctn">
        <button onClick={confirmHandler} className="btn">
          OK
        </button>
        <button onClick={cancelHandler} className="btn">
          CANCEL
        </button>
      </div>
    </div>
  );
};
