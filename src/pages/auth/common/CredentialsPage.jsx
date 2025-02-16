import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';

const CredentialsPage = () => {
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
        navigate(`/signup/complete?type=${userType}`);
    };

    return (
        <div className="flex flex-col justify-evenly min-h-screen px-6 pt-12 bg-white">
            <div className="w-full rounded-lg flex flex-col justify-evenly mt-5 mb-14">
                <h2 className="head-semi-bold-24 leading-[40px] text-left">
                    계정을 만들어주세요.
                </h2>
            </div>

                <div className="flex flex-col justify-center">
                    <div className='mb-10'>
                        <InputField label="아이디 (이메일 주소)" placeholder="아이디(이메일 주소)를 입력해 주세요." type="email" value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={email.length > 0 && !isValidEmail} className="mb-0" />
                        { email.length > 0 && !isValidEmail && <p className="text-sm text-[#FF3737] pt-2">이메일을 다시 확인해주세요.</p> }
                    </div>

                    <div className='mb-10'>
                        <InputField label="비밀번호" placeholder="비밀번호를 입력해 주세요." type="password" value={password} onChange={(e) => setPassword(e.target.value)} isInvalid={password.length > 0 && !isValidPassword} className="mb-0" />
                        { password.length > 0 && !isValidPassword && <p className="text-sm text-[#FF3737] pt-1">비밀번호를 다시 입력해주세요. (영문+숫자+특수문자 조합 8~23자)</p> }
                    </div>

                    <div className='mb-10'>
                        <InputField label="비밀번호 재확인" placeholder="비밀번호를 다시 입력해 주세요." type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} isInvalid={confirmPassword.length > 0 && !isPasswordMatch} className="mb-0" />
                        { confirmPassword.length > 0 && !isPasswordMatch && <p className="text-sm text-[#FF3737] pt-1">비밀번호가 일치하지 않습니다.</p> }
                    </div>
                </div>

                <div className="mb-5">
                    <Button 
                        text="가입하러 가기" 
                        onClick={handleNext} 
                        disabled={(!isValidEmail || !isValidPassword || !isPasswordMatch)}
                    />
                </div>
            </div>
        
    );
};

export default CredentialsPage;
