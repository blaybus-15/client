import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../../components/Button';

const Success = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const userType = searchParams.get("type") || "caregiver";

    const handleNext = () => {
        if (userType === "caregiver") {
            navigate("/profile-setup");
        } else {
            navigate("/elderly-registration");
        }
    };

    return (
        <div className="flex flex-col justify-evenly min-h-screen px-6 py-12 bg-white">
            <div className="flex flex-col flex-1 justify-center items-center text-center space-y-6">
            <h2 className="text-2xl font-bold">가입 완료</h2>

            {userType === "caregiver" && (
            <p className="text-lg text-gray-700">
                프로필 등록하고 집 근처 일자리 정보를 찾아보세요!
            </p>
            )}
        </div>

        <div className="w-full px-8 pb-12">   
            <Button
                text={userType === "caregiver" ? "프로필 등록하러 가기" : "어르신 정보 등록"}
                onClick={handleNext}
            />
        </div>
    </div>
    )
}

export default Success;
