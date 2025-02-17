import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../components/Button";
import KakaoIcon from "../../../assets/kakaotalk-icon.svg";

const SocialAuthPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const userType = searchParams.get("type") || "caregiver";

    const handleKakaoStart = () => {
        console.log("kakao start");
    };

    const handleLogin = () => {
        navigate(`/login?type=${userType}`);
    };


    const handleSignup = () => {
        navigate(`/signup?type=${userType}`);
    };

    return (
        <div className="flex flex-col justify-between min-h-screen px-6 py-12 bg-white">
            <div className="flex-1"></div>

            <div className="space-y-4">
                <button
                    className="relative body-semi-bold-18 w-full py-4 bg-main text-black rounded-2xl transition hover:bg-opacity-80
                    flex items-center justify-center"
                    onClick={handleKakaoStart}
                >
                    <img src={KakaoIcon} alt="카카오 아이콘" className="absolute left-[15px] w-6 h-6" />
                    <span>카카오로 시작하기</span>
                </button>
                <Button text="로그인 하기" onClick={handleLogin} />
            </div>

            <p className="text-center caption-regular-14 text-gray-1 mt-4">
                케어링크가 처음이신가요?{" "}
                <span 
                    className="inline-block ml-5 text-dark font-semibold cursor-pointer"
                    onClick={handleSignup}    
                >
                    회원가입하기
                </span>
            </p>
        </div>
    );
};

export default SocialAuthPage;