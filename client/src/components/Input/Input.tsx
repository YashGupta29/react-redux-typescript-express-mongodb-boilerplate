import React, { FocusEventHandler } from "react";
import PhoneInput from "react-phone-input-2";
import CurrencyInput from "react-currency-input-field";
import { parsePhoneNumber } from "libphonenumber-js";
import "react-phone-input-2/lib/material.css";
import "./Input.css";

// icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// interface
interface IconOptions {
  showStartIcon?: boolean;
  showEndIcon?: boolean;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

interface DropdownOptions {
  options?: Array<{ key: string; value: any }>;
  defaultValue?: any;
}

interface InputProps {
  type?:
    | "text"
    | "email"
    | "password"
    | "price"
    | "mobile"
    | "telephone"
    | "dropdown"
    | "searchableDropdown";
  name?: string;
  placeholder?: string;
  cssClasses?: Array<string>;
  label?: string;
  showLabel?: boolean;
  disabled?: boolean;
  onChange: (
    value: string | undefined,
    country?:
      | {
          countryCode: string;
          dialCode: string;
          format: "string";
          name: string;
        }
      | {}
  ) => void;
  onBlur?: FocusEventHandler<any> | undefined;
  onFocus?: FocusEventHandler<any> | undefined;
  value: string;
  isMandatory?: boolean;
  error?: string;
  fullWidth?: boolean;
  size?: "small" | "medium" | "large";
  iconOptions?: IconOptions;
  dropdownOptions?: DropdownOptions;
  isNumberValid?: (isValid: boolean) => void;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  name,
  placeholder,
  cssClasses,
  label,
  showLabel,
  disabled = false,
  onChange,
  onBlur,
  onFocus,
  value,
  isMandatory = false,
  error,
  fullWidth = false,
  size = "medium",
  iconOptions,
  dropdownOptions,
  isNumberValid,
}) => {
  // functions
  function getInputComponent() {
    const props = {
      name,
      placeholder,
      size,
      fullWidth,
      disabled,
      onChange,
      onBlur,
      onFocus,
      value,
      iconOptions,
      dropdownOptions,
      cssClasses,
      isNumberValid,
    };
    switch (type) {
      case "text":
      case "email":
        return <TextInput {...props} />;
      case "password":
        return <PasswordInput {...props} />;
      case "price":
        return <PriceInput {...props} />;
      case "mobile":
        return <MobileInput {...props} />;
      case "dropdown":
        return <DropdownInput {...props} />;
      // @TODO ---
      // case "telephone":
      //   return <TelephoneInput {...props} />;
      // case "searchableDropdown":
      //   return <SearchableDropdownInput {...props} />;
    }
  }
  return (
    <div className={`input-wraper ${error && "input-wrapper-error"}`}>
      <div className={`w-full`}>
        {showLabel && (
          <>
            <div className={`input-label`}>
              {label}
              {isMandatory && <div className={`input-mandatory`}>*</div>}
            </div>
            <br />
          </>
        )}
        {getInputComponent()}
      </div>
      {error && <div className={`input-error`}>{error}</div>}
    </div>
  );
};

const TextInput: React.FC<InputProps> = ({
  name,
  placeholder,
  size,
  fullWidth,
  disabled,
  onChange,
  onBlur,
  onFocus,
  value,
  iconOptions,
}) => {
  return (
    <div className={`input-block ${fullWidth ? "input-full" : ""}`}>
      {iconOptions?.showStartIcon && iconOptions.startIcon && (
        <div className={`input-icon input-icon-start`}>
          {iconOptions.startIcon}
        </div>
      )}
      <input
        name={name}
        placeholder={placeholder}
        type="text"
        className={`input input-${size} ${
          iconOptions?.showStartIcon &&
          iconOptions.startIcon &&
          "input-with-icon-start"
        } ${
          iconOptions?.showEndIcon &&
          iconOptions.endIcon &&
          "input-with-icon-end"
        }`}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
      />
      {iconOptions?.showEndIcon && iconOptions.endIcon && (
        <div className={`input-icon input-icon-end`}>{iconOptions.endIcon}</div>
      )}
    </div>
  );
};

const PasswordInput: React.FC<InputProps> = ({
  name,
  placeholder,
  size,
  fullWidth,
  disabled,
  onChange,
  onBlur,
  onFocus,
  value,
}) => {
  // state
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className={`input-block ${fullWidth ? "input-full" : ""}`}>
      <input
        name={name}
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        className={`input input-${size} input-password`}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
      />
      <div
        className={`input-password-icon`}
        onClick={(e) => setShowPassword(!showPassword)}
      >
        {!showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
      </div>
    </div>
  );
};

const PriceInput: React.FC<InputProps> = ({
  name,
  placeholder,
  size,
  fullWidth,
  disabled,
  onChange,
  onBlur,
  onFocus,
  value,
}) => {
  return (
    <div className={`input-block ${fullWidth ? "input-full" : ""}`}>
      <CurrencyInput
        name={name}
        placeholder={placeholder}
        className={`input input-${size} input-currency`}
        disabled={disabled}
        onValueChange={(value, name, values) => onChange(value)}
        onBlur={onBlur}
        onFocus={onFocus}
        decimalsLimit={2}
        intlConfig={{ locale: "en-IN", currency: "INR" }}
        value={value}
      />
    </div>
  );
};

const MobileInput: React.FC<InputProps> = ({
  name,
  placeholder,
  size,
  fullWidth,
  disabled,
  onChange,
  onBlur,
  onFocus,
  value,
  isNumberValid,
}) => {
  return (
    <div className={`input-block ${fullWidth ? "input-full" : ""}`}>
      <PhoneInput
        isValid={(value, country: any) => {
          if (value.length > 2) {
            const num = parsePhoneNumber(value, country.iso2.toUpperCase());
            isNumberValid && isNumberValid(num.isValid());
          } else isNumberValid && isNumberValid(false);

          return true;
        }}
        inputProps={{
          name: name,
        }}
        enableSearch
        country={"in"}
        value={value}
        onChange={(value, country, event, formattedValue) =>
          onChange(value, country)
        }
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        disabled={disabled}
        inputClass={`input input-${size} input-phone`}
        containerClass={`input-block ${fullWidth ? "input-full" : ""}`}
      />
    </div>
  );
};

const DropdownInput: React.FC<InputProps> = ({
  name,
  placeholder,
  size,
  fullWidth,
  disabled,
  onChange,
  onBlur,
  onFocus,
  value,
  dropdownOptions,
}) => {
  return (
    <div className={`input-block ${fullWidth ? "input-full" : ""}`}>
      <select
        name={name}
        className={`input input-${size}`}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={dropdownOptions?.defaultValue}
        value={value}
      >
        {!dropdownOptions?.defaultValue && (
          <option value={""}>Select ..</option>
        )}
        {dropdownOptions?.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Input;
