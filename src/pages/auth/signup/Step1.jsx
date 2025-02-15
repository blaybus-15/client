import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../components/Button";
const Step1 = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const userType = searchParams.get("type") || "caregiver";

    const handleNext = () => {
        navigate(`/login?type=${userType}`);
    };

    return (
        <div className="flex flex-col justify-between min-h-screen px-6 py-12 bg-white">
            <div className="flex-1"></div>

            <div className="space-y-4">
                <Button text="카카오로 시작하기" className="bg-[#FEE500] text-[#000000]" onClick={() => console.log("소셜 로그인")} />
                <Button text="로그인 하기" onClick={handleNext} />
            </div>

            <p className="text-center text-sm font-normal text-[#606265] mt-4">
                케어링크가 처음이신가요?{" "}
                <span className="inline-block ml-5 text-[#221313] font-semibold cursor-pointer">
                    회원가입하기
                </span>
            </p>
        </div>
    );
};

export default Step1;