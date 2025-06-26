import React, { forwardRef } from "react";
import { usePathname } from "next/navigation";


const SearchFilterInput = forwardRef((props, ref) => {
  const pathname = usePathname();
  const labelcolor = pathname === "/numerology" || pathname === "/family-pack" ? "md:bg-[#e7defa] bg-white ":"bg-white";
  const event = () => {};

  return (
    <div className="search-filter-input-field-os">
      <label className={labelcolor}>{props.inputLabel}</label>
      <input
        id={props.id}
        ref={ref}
        value={props.inputValue || ""}
        onChange={props.inputOnChange || event}
        type={props.inputType}
        placeholder={props.placeHolder}
        {...(props?.min ? { min: props.min } : {})}
        maxLength={props.maxLength}
        style={{ borderRadius: props.radius }}
      />
    </div>
  );
});

SearchFilterInput.displayName = "SearchFilterInput"; // Display name for debugging purposes
export default SearchFilterInput;
