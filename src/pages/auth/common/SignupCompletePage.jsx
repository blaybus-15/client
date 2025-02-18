import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../../components/Button';

const SignupCompletePage = () => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const userType = searchParams.get("type") || "CAREGIVER";

    const handleNext = () => {
        if (userType === "CAREGIVER") {
            navigate("/profile");
        } else {
            navigate("/elderly-registration");
        }
    };

    return (
        <div className="flex flex-col justify-evenly min-h-screen px-6 pt-12 bg-white">
            <div className="flex flex-col flex-1 items-center text-center mt-7 space-y-6">
                <h2 className="head-semi-bold-24 leading-[40px] text-dark">
                    {userType === "CAREGIVER" ? (
                        <>
                            프로필 등록하고<br />집근처 일자리 정보를<br />찾아보세요!
                        </>
                    ) : (
                        <>
                            어르신의 정보를 입력하고<br />간편하게 업무 관리를<br />해보세요!
                        </>
                    )
                    }
                </h2>

                <div className="flex mt-12 justify-center items-center w-[300px] h-[400px] bg-gray-200">
                    <span className="text-gray-500">일러스트</span>
                </div>
            </div>

        <div className="mb-5 justify-end">   
            <Button
                text={userType === "CAREGIVER" ? "프로필 등록하러 가기" : "어르신 정보 입력하러 가기"}
                onClick={handleNext}
            />
        </div>
    </div>
    )
}

export default SignupCompletePage;
