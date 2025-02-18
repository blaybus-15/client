import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInThunk } from '../../../redux/authThunk';
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";

const LoginPage= () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

    const [searchParams] = useSearchParams();
    const userType = searchParams.get("type") || "caregiver";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 이메일 유효성 검사
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // 비밀번호 유효성 검사 (영문+숫자+특수문자 8~23자)
    const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,23}$/.test(password);

    // 로그인 버튼 클릭
    const handleLogin = () => {
        if (!isValidEmail || !isValidPassword) return;

        dispatch(signInThunk({ email, password }))
        .unwrap()
        .then(() => {
            console.log("로그인 성공!");
            navigate("/profile");
        })
        .catch((err) => {
            console.error("로그인 실패: ", err);
        });
    };

    return (
        <div className="flex flex-col justify-evenly min-h-screen px-6 py-12 bg-white">
            <div className="w-full rounded-lg flex flex-col flex-1 justify-evenly">
                <div className="flex mt-12 justify-center items-center w-[95px] h-[57px] bg-gray-200">
                    <span className="text-gray-500">로고</span>
                </div>

                <h2 className="head-semi-bold-24 leading-[40px] text-dark text-left py-6 mb-3">
                    {userType === "CAREGIVER" ? (
                        <>
                            요양보호사의 첫걸음<br />케어링크와 함께 시작하세요.
                        </>
                    ) : (
                        <>
                            케어링크와 함께<br />매칭과 업무를 한번에 끝내보세요!
                        </>
                    )
                    }
                </h2>

                <div className="flex flex-col flex-1 justify-start space-y-6">
                    <div>
                        <InputField placeholder="아이디(이메일 주소)를 입력해 주세요." type="email" value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={email.length > 0 && !isValidEmail} className="mb-0" />
                        { email.length > 0 && !isValidEmail && <p className="text-sm text-[#FF3737] pt-1">이메일을 다시 확인해주세요.</p> }
                    </div>

                    <div>
                        <InputField placeholder="비밀번호를 입력해 주세요." type="password" value={password} onChange={(e) => setPassword(e.target.value)} isInvalid={password.length > 0 && !isValidPassword} className="mb-0" />
                        { password.length > 0 && !isValidPassword && <p className="text-sm text-[#FF3737] pt-1">비밀번호를 다시 입력해주세요. (영문+숫자+특수문자 조합 8~23자)</p> }
                    </div>
                </div>

                
                <div className="flex-1 flex flex-col items-center justify-end">
                    <Button text="로그인 하기" onClick={handleLogin} disabled={!isValidEmail || !isValidPassword} />
                    
                    <div className="flex justify-center sitems-center gap-[40px] mt-7">
                        <span className="text-sm font-semibold text-gray-2 cursor-pointer">아이디 찾기</span>
                        <div className="w-[1px] h-[16px] bg-gray-2"></div>
                        <span className="text-sm font-semibold text-gray-2 cursor-pointer">비밀번호 찾기</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

