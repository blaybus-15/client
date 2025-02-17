import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../../components/Button';

const CenterIntroPage = () => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const userType = searchParams.get("type") || "admin";

    const [introduction, setIntroduction] = useState("");

    const handleNext = () => {
        navigate(`/signup/complete?type=${userType}`);
    };

    const handleChange = (e) => {
        if (e.target.value.length <= 300) {
            setIntroduction(e.target.value);
        }
    };

    return (
            <div className="flex flex-col justify-evenly min-h-screen px-6 pt-12 bg-white">
                <div className="w-full rounded-lg flex flex-col my-8 justify-center">
                    <h2 className="head-semi-bold-24 leading-[40px] text-left mb-3">
                        한줄 소개를 입력해주세요.
                    </h2>
                    <p className="body-regular-16 text-gray-1 mb-7">센터의 특징을 간단히 표현하면 매칭에 도움이 될 수 있어요. 부담 없이 자유롭게 작성해 주세요!</p>
                </div>

                <div className="flex flex-col flex-1 justify-start">
                    <label className="body-medium-18 text-dark mb-3">한줄 소개</label>
                    <textarea
                        value={introduction}
                        onChange={handleChange}
                        placeholder="입력해 주세요."
                        className="w-full h-[120px] p-3 text-base text-dark bg-gray-100 border-none rounded-lg focus:outline-none"
                    />
                    <p className="text-right text-sm text-gray-2 mt-1">{introduction.length} / 300</p>
                </div>

                <div className="mb-5 justify-end">
                    <Button text="다음" onClick={handleNext} disabled={introduction.length === 0} />
                </div>
            </div>
    );
}

export default CenterIntroPage;
