import React from "react";

const InputField = ({ label, placeholder, type = "text", value, onChange }) => {
    return (
        <div className="flex flex-col mb-4">
            {label && <label className="text-sm text-gray-700 mb-1">{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default InputField;