import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import { setSignupField } from '../../../redux/authSlice';
import { signUpThunk } from '../../../redux/authThunk';


const CredentialsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const signupData = useSelector((state) => state.auth.signupData);
    const profileImageFile = location.state?.profileImageFile || null;

    const handleChange = (field, value) => {
        dispatch(setSignupField({ field, value }));
    };

    const handleSignup = () => {
        console.log("회원가입 버튼 클릭됨");
        dispatch(signUpThunk({ profileImageFile }))
            .unwrap() // .then()에서 res를 직접 접근 가능하도록 변경
            .then((res) => {
                console.log("회원가입 요청 응답: ", res);
                console.log("회원가입 성공");
                navigate(`/signup/complete?type=${signupData.type}`);
            })
            .catch((err) => {
                console.error("회원가입 요청 중 오류 발생:", err); // 예외 처리
            });
    };

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email);
    const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,23}$/.test(signupData.password);
    const isPasswordMatch = signupData.password === signupData.confirmPassword;

    return (
        <div className="flex flex-col justify-evenly min-h-screen px-6 pt-12 bg-white">
            <div className="w-full rounded-lg flex flex-col justify-evenly mt-5 mb-14">
                <h2 className="head-semi-bold-24 leading-[40px] text-left">
                    계정을 만들어주세요.
                </h2>
            </div>

                <div className="flex flex-col justify-center">
                    <div className='mb-10'>
                        <InputField label="아이디 (이메일 주소)" placeholder="아이디(이메일 주소)를 입력해 주세요." type="email" value={signupData.email} onChange={(e) => handleChange("email", e.target.value)} isInvalid={signupData.email.length > 0 && !isValidEmail} className="mb-0" />
                        { signupData.email.length > 0 && !isValidEmail && <p className="text-sm text-[#FF3737] pt-2">이메일을 다시 확인해주세요.</p> }
                    </div>

                    <div className='mb-10'>
                        <InputField label="비밀번호" placeholder="비밀번호를 입력해 주세요." type="password" value={signupData.password} onChange={(e) => handleChange("password", e.target.value)} isInvalid={signupData.password.length > 0 && !isValidPassword} className="mb-0" />
                        { signupData.password.length > 0 && !isValidPassword && <p className="text-sm text-[#FF3737] pt-1">비밀번호를 다시 입력해주세요. (영문+숫자+특수문자 조합 8~23자)</p> }
                    </div>

                    <div className='mb-10'>
                        <InputField label="비밀번호 재확인" placeholder="비밀번호를 다시 입력해 주세요." type="password" value={signupData.confirmPassword} onChange={(e) => handleChange("confirmPassword", e.target.value)} isInvalid={signupData.confirmPassword.length > 0 && !isPasswordMatch} className="mb-0" />
                        { signupData.confirmPassword.length > 0 && !isPasswordMatch && <p className="text-sm text-[#FF3737] pt-1">비밀번호가 일치하지 않습니다.</p> }
                    </div>
                </div>

                <div className="mb-5">
                    <Button 
                        text="가입하러 가기" 
                        onClick={handleSignup} 
                        disabled={(!isValidEmail || !isValidPassword || !isPasswordMatch)}
                    />
                </div>
            </div>
        
    );
};

export default CredentialsPage;
