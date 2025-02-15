import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InputField from '../../../../components/InputField';
import Button from '../../../../components/Button';

const Step2 = () => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const userType = searchParams.get("type") || "caregiver";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,23}$/.test(password);
    const isPasswordMatch = password === confirmPassword;

    const handleNext = () => {
        if (userType === "caregiver") {
            navigate("/signup/success");
        } else {
            navigate("/");
        }
    };

    return (
        <div className="flex flex-col justify-evenly min-h-screen px-6 py-12 bg-white">
            <div className="w-full rounded-lg flex flex-col flex-1 justify-evenly">
                <h2 className="text-2xl leading-[40px] mt-8 font-semibold text-left">
                    계정을 만들어주세요.
                </h2>

                <div className="flex flex-col flex-1 justify-start space-y-6">
                    <div>
                        <InputField label="아이디 (이메일 주소)" placeholder="아이디(이메일 주소)를 입력해 주세요." type="email" value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={email.length > 0 && !isValidEmail} className="mb-0" />
                        { email.length > 0 && !isValidEmail && <p className="text-sm text-[#FF3737] pt-1">이메일을 다시 확인해주세요.</p> }
                    </div>

                    <div>
                        <InputField label="비밀번호" placeholder="비밀번호를 입력해 주세요." type="password" value={password} onChange={(e) => setPassword(e.target.value)} isInvalid={password.length > 0 && !isValidPassword} className="mb-0" />
                        { password.length > 0 && !isValidPassword && <p className="text-sm text-[#FF3737] pt-1">비밀번호를 다시 입력해주세요. (영문+숫자+특수문자 조합 8~23자)</p> }
                    </div>

                    <div>
                        <InputField label="비밀번호 재확인" placeholder="비밀번호를 다시 입력해 주세요." type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} isInvalid={confirmPassword.length > 0 && !isPasswordMatch} className="mb-0" />
                        { confirmPassword.length > 0 && !isPasswordMatch && <p className="text-sm text-[#FF3737] pt-1">비밀번호가 일치하지 않습니다.</p> }
                    </div>
                </div>

                <div className="mt-9">
                    <Button 
                        text="가입하러 가기" 
                        onClick={handleNext} 
                        disabled={(!isValidEmail || !isValidPassword || !isPasswordMatch)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Step2
