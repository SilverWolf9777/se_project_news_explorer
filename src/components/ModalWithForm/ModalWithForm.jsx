import "./ModalWithForm.css";
import closeIconWhite from "../../assets/close__white.svg";

function ModalWithForm({
  children,
  titleText,
  buttonText,
  isOpened,
  handleCloseClick,
  onSubmit,
  isDisabled = false,
  secondaryAction,
}) {
  return (
    <div className={`modal ${isOpened ? "modal__opened " : ""}`}>
      <div className="modal__content">
        <button
          className="modal__close"
          type="button"
          onClick={handleCloseClick}
        >
          <img src={closeIconWhite} alt="close" className="modal__close-icon" />
        </button>
        <h2 className="modal__title">{titleText}</h2>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__action-row">
            <button
              className="modal__submit"
              type="submit"
              disabled={isDisabled}
            >
              {buttonText}
            </button>
            {secondaryAction ? (
              <div className="modal__secondary-action">or{secondaryAction}</div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
