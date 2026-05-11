import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import { useValidation } from "../../hooks/useValidation";

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

  username: (value) => {
    if (!value) return "Email is required";
    if (value.length < 3) return "Username must be at least 3 characters";
    if (value.length > 30) return "Email must be 20 characters or fewer";
    return "";
  },
};

const RegisterModal = ({
  onRegister,
  openedModal,
  onLogin,
  handleCloseClick,
  setOpenedModal,
}) => {
  const defaultValues = {
    email: "",
    password: "",
    username: "",
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

  function onFormSubmit(event) {
    const valid = handleSubmit(event);
    if (!valid) return;
    onRegister(values).then(() => {
      resetForm(defaultValues);
      handleCloseClick();
    });
  }

  return (
    <ModalWithForm
      titleText="Sign up"
      buttonText={"Sign up"}
      isOpened={openedModal === "signup"}
      handleCloseClick={handleCloseClick}
      onSubmit={onFormSubmit}
      secondaryAction={
        <button
          className="modal__secondary-btn"
          onClick={() => setOpenedModal("signin")}
        >
          Sign in
        </button>
      }
    >
      <label htmlFor="registerModal-email" className="modal__label">
        Email
        <input
          id="registerModal-email"
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
      <label htmlFor="registerModal-password" className="modal__label">
        Password
        <input
          id="registerModal-password"
          name="password"
          type="password"
          className="modal__input Roboto"
          placeholder="Enter password"
          value={values.password}
          onChange={handleChange}
        ></input>
        {isSubmitted && errors.password && (
          <span className="modal__error Roboto">{errors.password}</span>
        )}
      </label>
      <label htmlFor="registerModal-password" className="modal__label">
        Username
        <input
          id="register-username"
          name="username"
          type="text"
          className="modal__input Roboto"
          placeholder="Enter username"
          value={values.username}
          onChange={handleChange}
        ></input>
        {isSubmitted && errors.username && (
          <span className="modal__error Roboto">{errors.username}</span>
        )}
      </label>
    </ModalWithForm>
  );
};
export default RegisterModal;
