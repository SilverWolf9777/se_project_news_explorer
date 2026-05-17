import { useState, useCallback } from "react";
import { useForm } from "./useForm";

/**
 * Custom hook for handling form values and validation state.
 * It leverages built-in browser validity and also allows
 * you to plug in additional rules if needed.
 *
 * Example usage:
 * const { values, errors, isValid, handleChange, resetForm } = useValidation({ name: '', email: '' });
 *
 * @param {Object} defaultValues - initial form values
 * @returns {Object} helpers for working with form state and validation
 */
export function useValidation(defaultValues = {}, validators = {}) {
  // values and error states
  const {
    values,
    setValues,
    handleChange: basicHandleChange,
  } = useForm(defaultValues);

  // run a single validator if one exists
  const validateField = (name, value) => {
    const validator = validators[name];
    if (typeof validator === "function") {
      return validator(value);
    }
    return "";
  };

  // validate all fields based on current values
  const runAllValidations = (vals) => {
    const newErrors = {};
    Object.keys(validators).forEach((name) => {
      newErrors[name] = validateField(name, vals[name]);
    });
    return newErrors;
  };

  const initialErrors = runAllValidations(defaultValues);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(
    Object.values(initialErrors).every((e) => !e),
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedValues = { ...values, [name]: value };

    basicHandleChange(event);
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    const updatedErrors = { ...errors, [name]: error };

    setErrors(updatedErrors);
    setIsValid(Object.values(updatedErrors).every((e) => !e));
  };

  const handleSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();

    const newErrors = runAllValidations(values);
    setErrors(newErrors);
    setTouched(
      Object.keys(validators).reduce(
        (acc, name) => ({ ...acc, [name]: true }),
        {},
      ),
    );

    const valid = Object.values(newErrors).every((e) => !e);
    setIsValid(valid);
    setIsSubmitted(true);
    return valid;
  };

  const resetForm = useCallback(
    (newValues = {}) => {
      setValues(newValues);
      setErrors({});
      setTouched({});
      setIsValid(false);
      setIsSubmitted(false);
    },
    [setValues, setErrors, setTouched, setIsValid, setIsSubmitted],
  );

  return {
    values,
    setValues,
    errors,
    touched,
    isValid,
    isSubmitted,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
