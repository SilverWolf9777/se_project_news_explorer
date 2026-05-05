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
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleChange = (event) => {
    const { name, value } = event.target;

    basicHandleChange(event);

    if (isSubmitted) {
      // revalidate field once user has attempted submit
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
      setIsValid(Object.values({ ...errors, [name]: error }).every((e) => !e));
    }
  };

  const handleSubmit = (event) => {
    if (event && event.preventDefault) event.preventDefault();

    setIsSubmitted(true);
    const newErrors = runAllValidations(values);
    setErrors(newErrors);

    const valid = Object.values(newErrors).every((e) => !e);
    setIsValid(valid);
    return valid;
  };

  const resetForm = useCallback(
    (newValues = {}) => {
      setValues(newValues);
      setErrors({});
      setIsValid(false);
      setIsSubmitted(false);
    },
    [setValues, setErrors, setIsValid, setIsSubmitted],
  );

  return {
    values,
    setValues,
    errors,
    isValid,
    isSubmitted,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
