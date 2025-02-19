import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../../../components/InputField';
import Button from '../../../components/Button';
import { signUpThunk } from '../../../redux/authThunk';
import { setCaregiverField } from '../../../redux/caregiverSlice';
import { setAdminField } from '../../../redux/adminSlice';

const CredentialsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const role = useSelector((state) => state.auth.role);

  const signupData = useSelector((state) => {
    if (role === 'CAREGIVER' && state.caregiver?.signupData) {
      return state.caregiver.signupData;
    } else if (role === 'ADMIN' && state.admin?.signupData) {
      return state.admin.signupData;
    } else {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        genderType: '',
        name: '',
        contactNumber: '',
        profileImageUrl: '',
      }; // 기본값
    }
  });

  const profileImageFile = location.state?.profileImageFile || null;

  const handleChange = (field, value) => {
    if (role === 'CAREGIVER') {
      dispatch(setCaregiverField({ field, value }));
    } else if (role === 'ADMIN') {
      dispatch(setAdminField({ field, value }));
    }
  };

  const handleSignup = () => {
    dispatch(signUpThunk({ profileImageFile, userType: role }))
      .unwrap()
      .then((res) => {
        console.log('회원가입 요청 응답:', res);
        console.log('회원가입 성공');
        navigate(`/signup/complete?role=${role}`);
      })
      .catch((err) => {
        console.error('회원가입 요청 중 오류 발생:', err);
      });
  };

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email);
  const isValidPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,23}$/.test(
      signupData.password
    );
  const isPasswordMatch = signupData.password === signupData.confirmPassword;

  return (
    <div className="flex flex-col justify-evenly min-h-screen px-6 pt-12 bg-white">
      <div className="w-full rounded-lg flex flex-col justify-evenly mt-5 mb-14">
        <h2 className="head-semi-bold-24 leading-[40px] text-left">
          계정을 만들어주세요.
        </h2>
      </div>

      <div className="flex flex-col justify-center">
        <div className="mb-10">
          <InputField
            label="아이디 (이메일 주소)"
            placeholder="아이디(이메일 주소)를 입력해 주세요."
            type="email"
            value={signupData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            isInvalid={signupData.email.length > 0 && !isValidEmail}
            className="mb-0"
          />
          {signupData.email.length > 0 && !isValidEmail && (
            <p className="text-sm text-[#FF3737] pt-2">
              이메일을 다시 확인해주세요.
            </p>
          )}
        </div>

        <div className="mb-10">
          <InputField
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요."
            type="password"
            value={signupData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            isInvalid={signupData.password.length > 0 && !isValidPassword}
            className="mb-0"
          />
          {signupData.password.length > 0 && !isValidPassword && (
            <p className="text-sm text-[#FF3737] pt-1">
              비밀번호를 다시 입력해주세요. (영문+숫자+특수문자 조합 8~23자)
            </p>
          )}
        </div>

        <div className="mb-10">
          <InputField
            label="비밀번호 재확인"
            placeholder="비밀번호를 다시 입력해 주세요."
            type="password"
            value={signupData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            isInvalid={
              signupData.confirmPassword.length > 0 && !isPasswordMatch
            }
            className="mb-0"
          />
          {signupData.confirmPassword.length > 0 && !isPasswordMatch && (
            <p className="text-sm text-[#FF3737] pt-1">
              비밀번호가 일치하지 않습니다.
            </p>
          )}
        </div>
      </div>

      <div className="mb-5">
        <Button
          text="가입하러 가기"
          onClick={handleSignup}
          disabled={!isValidEmail || !isValidPassword || !isPasswordMatch}
        />
      </div>
    </div>
  );
};

export default CredentialsPage;
