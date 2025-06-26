import React, { useEffect, forwardRef } from "react";
import "./RegisterLoginInputField.css";

const RegisterLoginInputField = forwardRef((props, ref) => {
  useEffect(() => {
    if (props.inputPlaceholder === "Mobile No.") {
      if (ref?.current) {
        ref.current.focus();
      }
    }
  }, [props.inputPlaceholder, ref]);

  return (
    // <div className="RegisterLoginInputField-os">
    //   <input
    //     type={props.inputType}
    //     placeholder={props.inputPlaceholder}
    //     value={props.value}
    //     onChange={props.onChange}
    //     onKeyUp={props.onBlur}
    //     autoFocus={props.autoFocus}
    //     ref={ref}
    //   />
    // </div>

    <div className="relative RegisterLoginInputField-os w-full">
      <input
        id={props.id}
        type={props.inputType}
        placeholder=" "
        value={props.value}
        onChange={props.onChange}
        onKeyUp={props.onBlur}
        autoFocus={props.autoFocus}
        ref={ref}
        className="peer w-full p-3 text-black bg-transparent rounded-md border border-primary  focus:outline-none focus:ring-1 focus:ring-primary "
      />
      <label
        htmlFor={props.id}
        className={`absolute left-3 transition-all transform origin-left text-primary ${
          props.value
            ? "-top-2 text-sm text-primary scale-90 bg-white"
            : "top-[14px] text-primary bg-white"
        } peer-focus:-top-2 peer-focus:text-sm peer-focus:text-primary peer-focus:scale-90 px-1 `}
      >
        {props.inputPlaceholder}
      </label>
    </div>
  );
});

RegisterLoginInputField.displayName = "RegisterLoginInputField"; // Display name for debugging purposes

export default RegisterLoginInputField;