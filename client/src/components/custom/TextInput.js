import { useField } from 'formik';
import React from 'react';
import EyeIcon from '../../assets/icons/EyeIcon';
import EyeOffIcon from '../../assets/icons/EyeOffIcon';

const TextInput = (props) => {
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
    isPasswordInput = false,
    showPassword,
    setShowPassword,
  } = props;

  return (
    <div>
      <label htmlFor={name} className="block mb-1 text-gray-700 font-semibold">
        {labelName}
      </label>
      <div className="relative">
        <input
          name={name}
          type={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          className={`bg-indigo-50 px-4 py-2 outline-none rounded-md w-full border-2 focus:border-indigo-500 ${
            error && 'border-red-500'
          }`}
          disabled={disabled}
        />
        {isPasswordInput && (
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-700"
          >
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </span>
        )}
      </div>
      {error && <span className="text-red-500 font-bold">{error}</span>}
    </div>
  );
};

export default TextInput;
