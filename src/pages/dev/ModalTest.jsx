import React, { useState } from 'react';
import ConfirmModal from '../../components/modal/ConfirmModal';
import AlertModal from '../../components/modal/AlertModal';

const ModalTest = () => {
    const [isConfirmOpen, setConfirmOpen] = useState(false);
    const [isAlertOpen, setAlertOpen] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <button 
                onClick={() => setConfirmOpen(true)} 
                className="px-4 py-2 bg-gray-1 text-white rounded-lg"
            >
                선택 모달 열기
            </button>

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={() => {
                    alert("매칭 취소됨");
                    setConfirmOpen(false);
                }}
                message="이정은 보호사님의 매칭을 취소하시겠습니까?"
                subMessage="매칭 취소 시 보호자님께 안내 문자가 발송됩니다."
            />

            <button 
            onClick={() => setAlertOpen(true)} 
            className="px-4 py-2 bg-gray-1 text-white rounded-lg"
            >
            알림 모달 열기
            </button>

            <AlertModal
            isOpen={isAlertOpen}
            onClose={() => setAlertOpen(false)}
            message="보호사님께서 매칭을 수락했어요!"
            subMessage="매칭이 수락되면 보호자님의 상세 정보를 확인하실 수 있습니다."
            />
        </div>
    );
}

export default ModalTest
