import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import { useContext, useEffect, useState } from "react";
import { useValidation } from "../../hooks/useValidation";
import { CurrentUserContext } from "../Contexts/CurrentUserContext";

const validators = {
  password: (value) => {
    if (!value) return "Password is required";
    if (value.length < 1) return "Name must be at least 1 character";
    if (value.length > 30) return "Name must be 30 characters or fewer";
    return "";
  },

  email: (value) => {
    if (!value) return "Email is required";
    if (value.length < 3) return "Email must be at least 3 characters";
    if (value.length > 30) return "Email must be 30 characters or fewer";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) return "Please enter a valid email address";
    return "";
  },
};

const LoginModal = ({
  openedModal,
  onLogin,
  handleCloseClick,
  setOpenedModal,
}) => {
  const [loginError, setLoginError] = useState("");

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    values,
    handleChange,
    errors,
    isValid,
    isSubmitted,
    handleSubmit,
    resetForm,
  } = useValidation(defaultValues, validators);

  const { setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (openedModal === "signin") {
      setLoginError("");
    }
  }, [openedModal]);

  function onFormSubmit(event) {
    const valid = handleSubmit(event);
    if (!valid) return;
    onLogin(values)
      .then(() => {
        setLoginError("");
        resetForm(defaultValues);
        handleCloseClick();
      })
      .catch(() => {
        setLoginError("Invalid email or password");
      });
  }

  return (
    <ModalWithForm
      titleText="Sign in"
      isOpened={openedModal === "signin"}
      handleCloseClick={handleCloseClick}
      onSubmit={onFormSubmit}
      buttonText={"Sign in"}
      isDisabled={Object.values(errors).some(error => error !== '')}
      secondaryAction={
        <button
          className="modal__secondary-btn"
          onClick={() => setOpenedModal("signup")}
        >
          or <span className="blueText">Sign up</span>
        </button>
      }
    >
      <label htmlFor="loginModal-email" className="modal__label">
        Email
        <input
          id="loginModal-email"
          name="email"
          type="text"
          className="modal__input Roboto"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
        ></input>
        {isSubmitted && errors.email && (
          <span className="modal__error Roboto">{errors.email}</span>
        )}
      </label>
      <label htmlFor="loginModal-password" className="modal__label">
        Password
        <input
          id="loginModal-password"
          name="password"
          type="text"
          className="modal__input Roboto"
          placeholder="Enter password"
          value={values.password}
          onChange={handleChange}
        ></input>
        {isSubmitted && errors.password && (
          <span className="modal__error Roboto">{errors.password}</span>
        )}
        {loginError && (
          <span className="modal__error Roboto">{loginError}</span>
        )}
      </label>
    </ModalWithForm>
  );
};
export default LoginModal;
