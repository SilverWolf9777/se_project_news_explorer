import { useEffect } from "react";
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
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") handleCloseClick();
    }

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [handleCloseClick]);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      handleCloseClick();
    }
  }
  return (
    <div
      onClick={handleOverlayClick}
      className={`modal ${isOpened ? "modal__opened " : ""}`}
    >
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
          <div className="modal__action-column">
            <button
              className="modal__submit Roboto_medium"
              type="submit"
              disabled={isDisabled}
            >
              {buttonText}
            </button>
            {secondaryAction ? (
              <div className="modal__secondary-action Roboto">
                {secondaryAction}
              </div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
