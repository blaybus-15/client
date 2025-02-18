import React, { useState } from 'react';
import ProfileUploadIcon from '../assets/profileUpload-icon.svg';

const ProfileUploader = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            onImageUpload(file);
        }
    };
    
    return (
        <div className="flex flex-col items-center">
            <label className="relative cursor-pointer">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                <div className="w-[120px] h-[120px] rounded-full flex items-center justify-center overflow-hidden">
                    {image ? (
                        <img src={image} alt="프로필 미리보기" className="w-full h-full object-cover" />
                        ) : (
                        <img src={ProfileUploadIcon} alt="프로필 업로더 아이콘" className="w-[77%] h-[77%] object-contain" />
                    )}
                </div>
            </label>
        </div>
    );
};


export default ProfileUploader;
