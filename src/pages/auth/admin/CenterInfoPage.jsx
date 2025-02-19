import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCenterInfo, updateCenterInfo } from '../../../services/center';
import ProfileUploader from '../../../components/ProfileUploader';
import InputField from '../../../components/InputField';
import OptionButton from '../../../components/OptionButton';
import Button from '../../../components/Button';
import { setAdminField } from '../../../redux/adminSlice';

const CenterInfoPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedCenter = location.state?.selectedCenter;
    const [profileImageFile, setProfileImageFile] = useState(null); // 파일 상태 관리

    
    // 초기 상태 설정
    const [center, setCenter] = useState(
        selectedCenter || { centerName: "", address: "", contactNumber: "", hasBathVehicle: false }
    );

    const [hasChanges, setHasChanges] = useState(false);

    const [isEditing, setIsEditing] = useState({
        centerName: false,
        address: false,
        contactNumber: false,
        hasBathVehicle: false,
    });

    // 센터 정보 가져오기
    // useEffect(() => {
    //     const getCenterInfo = async () => {
    //         const data = await fetchCenterInfo(centerId);
    //         if (data) {
    //             setCenter({
    //                 centerName: data.centerName || '',
    //                 address: data.address || '',
    //                 tel: data.tel || '',
    //                 hasBathVehicle: data.hasBathVehicle || false,
    //             });
    //         }
    //     };
    //     getCenterInfo();
    // }, [centerId]);

    // selectedCenter 변경 시 Redux 상태 업데이트
    useEffect(() => {
        if (selectedCenter) {
            setCenter(selectedCenter);
            dispatch(setAdminField({ field: "centerId", value: selectedCenter.id }));
            dispatch(setAdminField({ field: "centerName", value: selectedCenter.centerName }));
            dispatch(setAdminField({ field: "centerAddress", value: selectedCenter.address }));
            dispatch(setAdminField({ field: "contactNumber", value: selectedCenter.contactNumber }));
            dispatch(setAdminField({ field: "hasBathVehicle", value: selectedCenter.hasBathVehicle }));
        }
    }, [selectedCenter, dispatch]);

    const handleEdit = (field) => {
        setIsEditing((prev) => ({ ...prev, [field]: true }));
    };

    const handleChange = (field, value) => {
        setCenter((prev) => ({ ...prev, [field]: value }));
        dispatch(setAdminField({ field, value }));
        setHasChanges(true); // 변경 감지 활성화
    };

    // 프로필 이미지 업로드
    const handleImageUpload = (file) => {
        setProfileImageFile(file);
    };

    // 수정사항 저장 및 다음 페이지 이동
    const handleNext = async () => {
        // const result = await updateCenterInfo(centerId, center);
        // if (result) {
        //     alert("센터 정보가 수정되었습니다.");
        //     setIsEditing({ centerName: false, address: false, tel: false, hasBathVehicle: false });
        // }
        if (hasChanges) {
            alert("변경사항이 저장되었습니다.");
        }
        navigate('/signup/admin/center/intro', { state: { profileImageFile }});
    };

    return (
        <div className="flex flex-col justify-evenly min-h-screen px-6 pt-12 bg-white">
            <div className="w-full rounded-lg flex flex-col justify-evenly">
                <h2 className="head-semi-bold-24 leading-[40px] text-left">
                    센터 정보를 확인해주세요!
                </h2>
                <p className="body-regular-16 text-gray-2 mb-7">가져온 센터의 정보가 맞는지 확인해주세요.</p>
            </div>

            <div>
                <ProfileUploader onImageUpload={handleImageUpload} />
                
                <div>
                    <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                            <label className="body-medium-18 text-dark mb-3">센터 이름</label>
                            <button className="cursor-pointer ml-2" onClick={() => handleEdit("centerName")}>
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.19593 0.861888C9.45628 0.601539 9.87839 0.601539 10.1387 0.861888L12.1387 2.86189C12.3991 3.12224 12.3991 3.54435 12.1387 3.8047L4.13874 11.8047C4.0533 11.8901 3.94624 11.9507 3.82902 11.9801L1.16236 12.6467C0.935172 12.7035 0.694848 12.6369 0.529261 12.4714C0.363674 12.3058 0.297108 12.0655 0.353904 11.8383L1.02057 9.1716C1.04988 9.05438 1.11049 8.94733 1.19593 8.86189L9.19593 0.861888ZM2.26931 9.67412L1.91691 11.0837L3.3265 10.7313L10.7245 3.33329L9.66733 2.2761L2.26931 9.67412Z" fill="#B1B5B9"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6673 14.6666H0.333984V13.3333H13.6673V14.6666Z" fill="#B1B5B9"/>
                                </svg>
                            </button>
                        </div>
    
                        <InputField
                            placeholder="센터 이름을 입력해주세요."
                            type="text"
                            value={center.centerName}
                            onChange={(e) => handleChange("centerName", e.target.value)}
                            readOnly={!isEditing.centerName}
                        />
                    </div>

                    <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                            <label className="body-medium-18 text-dark mb-3">센터 주소</label>
                            <button className="cursor-pointer ml-2" onClick={() => handleEdit("centerName")}>
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.19593 0.861888C9.45628 0.601539 9.87839 0.601539 10.1387 0.861888L12.1387 2.86189C12.3991 3.12224 12.3991 3.54435 12.1387 3.8047L4.13874 11.8047C4.0533 11.8901 3.94624 11.9507 3.82902 11.9801L1.16236 12.6467C0.935172 12.7035 0.694848 12.6369 0.529261 12.4714C0.363674 12.3058 0.297108 12.0655 0.353904 11.8383L1.02057 9.1716C1.04988 9.05438 1.11049 8.94733 1.19593 8.86189L9.19593 0.861888ZM2.26931 9.67412L1.91691 11.0837L3.3265 10.7313L10.7245 3.33329L9.66733 2.2761L2.26931 9.67412Z" fill="#B1B5B9"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6673 14.6666H0.333984V13.3333H13.6673V14.6666Z" fill="#B1B5B9"/>
                                </svg>
                            </button>
                        </div>
    
                        <InputField
                            placeholder="센터 주소를 입력해주세요."
                            type="text"
                            value={center.address}
                            onChange={(e) => handleChange("address", e.target.value)}
                            readOnly={!isEditing.address}
                        />
                    </div>

                    <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                            <label className="body-medium-18 text-dark mb-3">연락처</label>
                            <button className="cursor-pointer ml-2" onClick={() => handleEdit("centerName")}>
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.19593 0.861888C9.45628 0.601539 9.87839 0.601539 10.1387 0.861888L12.1387 2.86189C12.3991 3.12224 12.3991 3.54435 12.1387 3.8047L4.13874 11.8047C4.0533 11.8901 3.94624 11.9507 3.82902 11.9801L1.16236 12.6467C0.935172 12.7035 0.694848 12.6369 0.529261 12.4714C0.363674 12.3058 0.297108 12.0655 0.353904 11.8383L1.02057 9.1716C1.04988 9.05438 1.11049 8.94733 1.19593 8.86189L9.19593 0.861888ZM2.26931 9.67412L1.91691 11.0837L3.3265 10.7313L10.7245 3.33329L9.66733 2.2761L2.26931 9.67412Z" fill="#B1B5B9"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.6673 14.6666H0.333984V13.3333H13.6673V14.6666Z" fill="#B1B5B9"/>
                                </svg>
                            </button>
                        </div>
    
                        <InputField
                            placeholder="연락처를 입력해주세요."
                            type="tel"
                            value={center.contactNumber}
                            onChange={(e) => handleChange("contactNumber", e.target.value)}
                            readOnly={!isEditing.contactNumber}
                        />
                    </div>                    

                    <div className="mb-3">
                        <OptionButton
                            label="목욕 차량 보유 여부"
                            options={[
                                { label: "있음", value: true },
                                { label: "없음", value: false },
                            ]}
                            selectedOption={center.hasBathVehicle}
                            onSelect={(value) => handleChange("hasBathVehicle", value)}
                        />
                    </div>
                </div>
            </div>

            <div>
                <Button text="다음" 
                    onClick={handleNext} 
                    disabled={false} 
                />
            </div>
        </div>
    )
}

export default CenterInfoPage;
