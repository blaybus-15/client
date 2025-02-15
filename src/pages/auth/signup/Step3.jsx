import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProfileUploader from '../../../components/ProfileUploader';
import Button from '../../../components/Button';
import InputField from '../../../components/InputField';
import OptionButton from '../../../components/OptionButton';

const Step3 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();
    const userType = searchParams.get('type') || 'caregiver';

    const [profileImg, setProfileImg] = useState(null);
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [centerName, setCenterName] = useState("");
    const [centerLevel, setCenterLevel] = useState("");

    const handleNext = () => {
        if (userType === "caregiver") {
            navigate("/signup/success");
        } else {
            navigate(`/signup/step4?type=${userType}`);
        }
    };

    return (
        <div className="flex flex-col justify-evenly min-h-screen px-6 py-12 bg-white">
            <div className="w-full rounded-lg flex flex-col flex-1 justify-evenly">
                <h2 className="text-lg font-semibold text-center pb-9">회원가입</h2>

                <ProfileUploader onImageUpload={setProfileImg} />
                
                {userType === "caregiver" ? (
                    <>
                        <InputField label="이름" placeholder="이름을 입력해주세요." type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        <OptionButton label="성별" options={["남자", "여자"]} selectedOption={gender} onSelect={setGender} />
                    </>
                ) : (
                    <>
                        <InputField label="센터 이름" placeholder="센터 이름을 입력해주세요." type="text" value={centerName} onChange={(e) => setCenterName(e.target.value)} />
                        <InputField label="센터 등급" placeholder="센터 등급을 입력해주세요." type="number" value={centerLevel} onChange={(e) => setCenterLevel(e.target.value)} />
                    </>
                )}

                <div className="mt-6">
                    <Button text="다음" onClick={handleNext} disabled={
                        (userType === "caregiver" ? (!name || !gender)
                        : (!centerName ||!centerLevel))} />
                </div>
            </div>
        </div>
    );
};

export default Step3;
