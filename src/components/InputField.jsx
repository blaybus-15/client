import React from "react";

const InputField = ({ label, placeholder, type = "text", value, onChange, isInvalid, className, maxLength }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            {label && <label className="body-medium-18 text-dark mb-3">{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-4 body-regular-16 text-dark bg-background-gray placeholder-gray-1
                            rounded-xl focus:outline-none shadow-inner
                            ${isInvalid ? "shadow-[#FF3737]" : "shadow-none"}`}
                maxLength={maxLength}
            />
        </div>
    );
};

export default InputField;