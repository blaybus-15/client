import React from 'react';
import CloseIcon from "../../assets/close-icon.svg";

const AlertModal = ({ isOpen, onClose, message, subMessage }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
            <div className="relative w-[300px] h-[150px] bg-white rounded-xl shadow-lg p-6">

                <button onClick={onClose} className="absolute top-6 right-6">
                    <img src={CloseIcon} alt="닫기" />
                </button>
    
                <div className="pr-24">
                    <h2 className="body-semi-bold-18 text-dark leading-6">
                        {message}
                    </h2>
                </div>

                <div className='pr-8'>
                    <p className="caption-regular-14 text-gray-500 mt-3 leading-5">
                        {subMessage}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;
