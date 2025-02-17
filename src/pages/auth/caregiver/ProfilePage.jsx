import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import ProfileUploader from "../../../components/ProfileUploader";
import OptionButton from "../../../components/OptionButton";
import { setSignupField } from "../../../redux/authSlice";

const ProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signupData = useSelector((state) => state.auth.signupData);

    const [profileImg, setProfileImg] = useState(null);
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [contactNumber, setContactNumber] = useState("");

    const handleChange = (field, value) => {
        dispatch(setSignupField({ field, value }));
    };

    const handleNext = () => {
        navigate("/signup/credentials");
    };

    const formatPhoneNumber = (value) => {
        const cleaned = value.replace(/\D/g, "");
        if (cleaned.length <= 3) return cleaned;
        if (cleaned.length <= 7) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
    };

    const isValidContactNumber = signupData.contactNumber.length === 11;

    return (
        <div className="flex flex-col justify-evenly min-h-screen px-6 pt-12 bg-white">
            <div className="w-full rounded-lg flex flex-col justify-evenly">
                <h2 className="head-semi-bold-24 leading-[40px] text-left">
                    환영합니다!<br />이름과 성별을 입력해주세요.
                </h2>
            </div>

            <div>
                <ProfileUploader onImageUpload={setProfileImg} />
                
                <div>
                    <InputField label="이름" placeholder="입력해 주세요." type="text" value={signupData.name || ""} onChange={(e) => handleChange("name", e.target.value)} className="mb-3" />
                    <OptionButton label="성별" options={[{ label: "남자", value: "MALE" }, { label: "여자", value: "FEMALE" }]} selectedOption={signupData.genderType || ""} onSelect={(value) => handleChange("genderType", value)} className="mb-3" />
                    <InputField label="연락처" placeholder="입력해 주세요." type="tel" value={formatPhoneNumber(signupData.contactNumber || "")} onChange={(e) => handleChange("contactNumber", e.target.value.replace(/\D/g, ""))} maxLength={13} className="mb-3" isInvalid={signupData.contactNumber.length > 0 && !isValidContactNumber} />
                    {signupData.contactNumber.length > 0 && !isValidContactNumber && (
                        <p className="text-sm text-[#FF3737]">올바른 연락처를 입력해주세요.</p>
                    )}
                </div>
            </div>

            <div>
                <Button text="가입하러 가기" 
                    onClick={handleNext} 
                    disabled={!(signupData.name && signupData.genderType && isValidContactNumber)} 
                />
            </div>
        </div>
    );
};

export default ProfilePage;