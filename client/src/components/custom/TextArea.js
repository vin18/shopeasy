import { useField } from 'formik';
import React from 'react';

const TextArea = (props) => {
  const {
    name,
    labelName,
    type,
    onChange,
    value,
    error,
    placeholder,
    label,
    disabled,
  } = props;

  return (
    <>
      <div>
        <label
          htmlFor={name}
          className="block mb-1 text-gray-600 font-semibold"
        >
          {labelName}
        </label>
        <textarea
          name={name}
          type={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          className={`bg-indigo-50 px-4 py-2 outline-none rounded-md w-full border-2 ${
            error && 'border-red-500'
          }`}
          disabled={disabled}
          rows="5"
        />
        {error && <span className="text-red-500 font-bold">{error}</span>}
      </div>
    </>
  );
};

export default TextArea;
