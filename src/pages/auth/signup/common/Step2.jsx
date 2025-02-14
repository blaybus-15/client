import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";

const Step2 = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const userType = searchParams.get("type") || "caregiver";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleNext = () => {
        navigate(`/signup/step3?type=${userType}`);
    };

    return (
        <div className="flex flex-col justify-center min-h-screen px-6 py-8 space-y-6">
            <h2 className="text-lg font-semibold text-center mb-7">회원가입</h2>

            <div className="flex flex-col space-y-6">
                <div>
                    <InputField placeholder="아이디 입력" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <p className="text-sm font-normal">이메일을 입력해주세요.</p>
                </div>

                <div>
                    <InputField placeholder="비밀번호 입력" type="password" value={password} onChange={(e) => setPassword(e.target.password)} />
                    <p className="text-sm font-normal">비밀번호를 입력해주세요. (영문+숫자+특수문자 조합 8~23자)</p>
                </div>
                
                <div className="mt-12">
                    <Button text="다음" onClick={handleNext} disabled={!email || !password} />
                </div>
            </div>
        </div>
    );
};

export default Step2;