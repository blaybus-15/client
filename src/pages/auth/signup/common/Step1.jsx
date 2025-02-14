import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../../components/Button";
const Step1 = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const userType = searchParams.get("type") || "caregiver";

    const handleNext = () => {
        navigate(`/signup/step2?type=${userType}`);
    };

    return (
        <div className="flex flex-col justify-between min-h-screen px-6 py-12 bg-white">
            <div className="flex-1"></div>

            <div className="space-y-4">
                <Button text="소셜 로그인" onClick={() => console.log("소셜 로그인")} />
                <Button text="로그인" onClick={handleNext} />
            </div>

            <span className="text-center text-md text-blue-500 font-semibold mt-4 cursor-pointer">고객센터로 가기</span>
        </div>
    );
};

export default Step1;