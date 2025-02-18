import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileUploadIcon from '../assets/profileUpload-icon.svg';

const ProfileUploader = ({ onImageUpload }) => {
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null); // 파일 useState로 관리
    const profileImageUrl = useSelector((state) => state.auth.signupData.profileImageUrl);
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file)); // 미리보기 URL 생성
            if (onImageUpload) {
                onImageUpload(file); // 부모 컴포넌트에 전달
            }
        }
    };
    
    return (
        <div className="flex flex-col items-center">
            <label className="relative cursor-pointer">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                <div className="w-[120px] h-[120px] rounded-full flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                        <img src={imagePreview} alt="프로필 미리보기" className="w-full h-full object-cover" />
                        ) : (
                        <img src={ProfileUploadIcon} alt="프로필 업로더 아이콘" className="w-[77%] h-[77%] object-contain" />
                    )}
                </div>
            </label>
        </div>
    );
};


export default ProfileUploader;
