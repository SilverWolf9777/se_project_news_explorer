import { useContext, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import { useValidation } from "../../hooks/useValidation";
import { ModalContext } from "../Contexts/ModalContext";

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

const LoginModal = () => {
  const { openedModal, handleCloseClick, setOpenedModal, handleLogin } =
    useContext(ModalContext);
  const [loginError, setLoginError] = useState("");

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    values,
    handleChange,
    errors,
    touched,
    isValid,
    isSubmitted,
    handleSubmit,
    resetForm,
  } = useValidation(defaultValues, validators);

  function onFormSubmit(event) {
    event.preventDefault();
    setLoginError("");
    const valid = handleSubmit(event);
    if (!valid) return;
    handleLogin(values)
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
      isDisabled={!isValid}
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
          className="modal__input"
          placeholder="Enter email"
          value={values.email}
          onChange={handleChange}
        ></input>
        {(isSubmitted || touched.email) && errors.email && (
          <span className="modal__error">{errors.email}</span>
        )}
      </label>
      <label htmlFor="loginModal-password" className="modal__label">
        Password
        <input
          id="loginModal-password"
          name="password"
          type="text"
          className="modal__input"
          placeholder="Enter password"
          value={values.password}
          onChange={handleChange}
        ></input>
        {(isSubmitted || touched.password) && errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
        {loginError && <span className="modal__error">{loginError}</span>}
      </label>
    </ModalWithForm>
  );
};
export default LoginModal;
