import { MdError } from "react-icons/md";

const InputField = ({
  inputName = "Name",
  placeholder = "",
  inputType = "text",
  valueReturner,
  requiredInput = true,
  errorMsg,
  readOnlyInput = false,
  inputValue = "",
  inputAutoComplete,
  className=""
}) => {
  return (
    <div className={`relative w-full min-w-[200px] h-11 ${errorMsg && "mb-4"} ${className}`}>
      <input
        className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer text-blue-gray-700 outline-none focus:outline-none focus:ring-0 focus:border-gray-900 disabled:bg-blue-gray-50 disabled:border-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 border-t-transparent focus:border-t-transparent border-blue-gray-200"
        placeholder={placeholder}
        {...(readOnlyInput ? { readOnly: true } : {})}
        type={inputType}
        value={inputValue}
        onChange={(e) => valueReturner(e.target.value)}
        {...(requiredInput && { required: true })}
        {...(inputAutoComplete && { autocomplete: inputAutoComplete })}
        name={inputName}
        step="any"
      />
      {errorMsg && (
        <div className="w-full text-red-700 text-sm text-left flex items-center gap-1 px-2 pb-3">
          <MdError />
          {errorMsg}
        </div>
      )}
      <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[4.1] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
        {inputName}
      </label>
    </div>
  );
};

export default InputField;
