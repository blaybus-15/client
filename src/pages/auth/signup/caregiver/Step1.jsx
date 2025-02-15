import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "../../../../components/Button";
import InputField from "../../../../components/InputField";
import ProfileUploader from "../../../../components/ProfileUploader";
import OptionButton from "../../../../components/OptionButton";

const Step1 = () => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const userType = searchParams.get('type') || 'caregiver';

    const [profileImg, setProfileImg] = useState(null);
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [centerName, setCenterName] = useState("");
    const [centerLevel, setCenterLevel] = useState("");

    const handleNext = () => {
        if (userType === "caregiver") {
            navigate("/signup/success");
        } else {
            navigate("/");
        }
    };

    const formatPhoneNumber = (value) => {
        const cleaned = value.replace(/\D/g, "");
        if (cleaned.length <= 3) return cleaned;
        if (cleaned.length <= 7) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
        return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
    };

    const isValidContactNumber = contactNumber.length === 10 || contactNumber.length === 11;

    return (
        <div className="flex flex-col justify-evenly min-h-screen px-6 pt-12 bg-white">
            <div className="w-full rounded-lg flex flex-col flex-1 justify-evenly">
                <h2 className="text-2xl leading-[40px] font-semibold text-left">
                    환영합니다!<br />이름과 성별을 입력해주세요.
                </h2>

                <ProfileUploader onImageUpload={setProfileImg} />
                
                {userType === "caregiver" ? (
                    <div>
                        <InputField label="이름" placeholder="입력해 주세요." type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <OptionButton label="성별" options={["남자", "여자"]} selectedOption={gender} onSelect={setGender} />
                        <InputField label="연락처" placeholder="입력해 주세요." type="tel" value={formatPhoneNumber(contactNumber)} onChange={(e) => setContactNumber(e.target.value.replace(/\D/g, ""))} maxLength={13} />
                        {contactNumber.length > 0 && !isValidContactNumber && (
                            <p className="text-sm text-[#FF3737]">올바른 연락처를 입력해주세요.</p>
                        )}
                    </div>
                ) : (
                    <>
                        <InputField label="센터 이름" placeholder="센터 이름을 입력해주세요." type="text" value={centerName} onChange={(e) => setCenterName(e.target.value)} />
                        <InputField label="센터 등급" placeholder="센터 등급을 입력해주세요." type="number" value={centerLevel} onChange={(e) => setCenterLevel(e.target.value)} />
                    </>
                )}

                <div className="mt-9">
                    <Button text="가입하러 가기" 
                        onClick={handleNext} 
                        disabled={(
                            userType === "caregiver" ? 
                            (!name || !gender || !isValidContactNumber) : (!centerName ||!centerLevel)
                        )} 
                    />
                </div>
            </div>
        </div>
    );
};

export default Step1;