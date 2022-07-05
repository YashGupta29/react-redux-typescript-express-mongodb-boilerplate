import React, { FocusEventHandler } from "react";
import PhoneInput from "react-phone-input-2";
import CurrencyInput from "react-currency-input-field";
import Dropdown from "react-dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-dropdown/style.css";
import { parsePhoneNumber } from "libphonenumber-js";
import "react-phone-input-2/lib/material.css";
import "./Input.css";

// icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";
// interface
interface IconOptions {
  showStartIcon?: boolean;
  showEndIcon?: boolean;
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

interface DropdownOptions {
  options?: Array<{ label: string; value: any }>;
  defaultValue?: any;
  showDefaultValue?: boolean;
}

interface InputProps {
  type?:
    | "text"
    | "number"
    | "textarea"
    | "email"
    | "password"
    | "price"
    | "mobile"
    | "telephone"
    | "dropdown"
    | "date"
    | "price"
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
  rows?: number;
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
  rows = 5,
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
      rows,
      type,
    };
    switch (type) {
      case "text":
      case "email":
      case "number":
        return <TextInput {...props} />;
      case "textarea":
        return <TextareaInput {...props} />;
      case "password":
        return <PasswordInput {...props} />;
      case "price":
        return <PriceInput {...props} />;
      case "mobile":
        return <MobileInput {...props} />;
      case "dropdown":
        return <DropdownInput {...props} />;
      case "date":
        return <DatePickerInput {...props} />;
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
  type,
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
        type={type === "number" ? "number" : "text"}
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

const TextareaInput: React.FC<InputProps> = ({
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
  rows,
}) => {
  return (
    <div className={`input-block ${fullWidth ? "input-full" : ""}`}>
      {iconOptions?.showStartIcon && iconOptions.startIcon && (
        <div className={`input-icon input-icon-start`}>
          {iconOptions.startIcon}
        </div>
      )}
      <textarea
        name={name}
        placeholder={placeholder}
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
        rows={rows}
      ></textarea>
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
  placeholder,
  size,
  fullWidth,
  disabled,
  onChange,
  value,
  dropdownOptions,
}) => {
  // function
  const handleDropdownChange = (value: string) => {
    onChange(value);
  };
  return (
    <div className={`input-block ${fullWidth ? "input-full" : ""}`}>
      {dropdownOptions && (
        <Dropdown
          disabled={disabled}
          placeholder={placeholder}
          controlClassName={`input input-${size} input-dropdown`}
          arrowClassName={`input-dropdown-arrow`}
          menuClassName={`input-dropdown-menu`}
          options={dropdownOptions.options as any}
          onChange={(option) => handleDropdownChange(option.value)}
          value={value}
        />
      )}
    </div>
  );
};

const DatePickerInput: React.FC<InputProps> = ({
  placeholder,
  size,
  fullWidth,
  disabled,
  onChange,
  value,
}) => {
  const ref: React.Ref<any> = React.useRef(null);
  // state
  const [openCalendar, setOpenCalendar] = React.useState(false);
  // function
  const handleDateChange = (value: Date) => {
    onChange(value.toString());
  };
  return (
    <div className={`input-block ${fullWidth ? "input-full" : ""}`}>
      <DatePicker
        placeholderText={placeholder}
        disabled={disabled}
        className={`input input-datepicker input-${size}`}
        selected={new Date(value)}
        onChange={handleDateChange}
        showTimeSelect
        ref={ref}
      />
      <div
        className={`input-date-icon`}
        onClick={() => {
          ref.current?.setFocus(!openCalendar);
          setOpenCalendar(!openCalendar);
        }}
      >
        {<FaCalendarAlt />}
      </div>
    </div>
  );
};

export default Input;
