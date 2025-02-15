import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";


const Step2 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const userType = searchParams.get("type") || "caregiver";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleNext = () => {
        dispatch(updateSignupData({ email, password }));
        navigate(`/signup/step3?type=${userType}`);
    };

    return (
        <div className="flex flex-col justify-evenly min-h-screen px-6 py-12 bg-white">
            <div className="w-full rounded-lg flex flex-col flex-1 justify-evenly">

                <h2 className="text-lg font-semibold text-center py-12">회원가입</h2>

                <div className="flex flex-col flex-1 justify-center space-y-6">
                    <div>
                        <InputField placeholder="아이디 입력" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <p className="text-sm font-normal">이메일을 입력해주세요.</p>
                    </div>

                    <div>
                        <InputField placeholder="비밀번호 입력" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <p className="text-sm font-normal">비밀번호를 입력해주세요. (영문+숫자+특수문자 조합 8~23자)</p>
                    </div>
                </div>

                
                <div className="flex-1 flex items-end">
                    <Button text="다음" onClick={handleNext} disabled={!email || !password} />
                </div>
            </div>
        </div>
    );
};

export default Step2;