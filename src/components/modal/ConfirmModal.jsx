import React from "react";
import CloseIcon from "../../assets/close-icon.svg";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message, subMessage }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
            <div className="relative w-[300px] h-[200px] bg-white rounded-xl shadow-lg p-6">
        
                <button onClick={onClose} className="absolute top-6 right-6">
                    <img src={CloseIcon} alt="닫기" />
                </button>

                <div className="pr-16">

                    <h2 className="body-semi-bold-18 text-dark leading-6">
                        {message}
                    </h2>

                    <p className="caption-regular-14 text-gray-500 mt-3 leading-5">
                        {subMessage}
                    </p>

                </div>

                <div className="flex justify-end gap-2 absolute bottom-5 right-5">
                    <button 
                        onClick={onClose} 
                        className="w-16 h-9 text-dark bg-white"
                    >
                        아니요
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="w-10 h-9 bg-main text-dark"
                    >
                        네
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;