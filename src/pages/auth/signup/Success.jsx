import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../../components/Button';

const Success = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const userType = searchParams.get("type") || "caregiver";

    const handleNext = () => {
        if (userType === "caregiver") {
            navigate("/profile");
        } else {
            navigate("/elderly-registration");
        }
    };

    return (
        <div className="flex flex-col justify-evenly min-h-screen px-6 pt-12 bg-white">
            <div className="flex flex-col flex-1 justify-center items-center text-center space-y-6">
            <h2 className="text-2xl leading-[40px] text-[#221313] font-semibold">
                프로필 등록하고<br />집근처 일자리 정보를<br />찾아보세요!
            </h2>

            <div className="flex mt-12 justify-center items-center w-[247px] h-[313px] bg-gray-200">
                <span className="text-gray-500">일러스트</span>
            </div>
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
