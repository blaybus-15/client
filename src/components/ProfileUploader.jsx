import React, { useState } from 'react';

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
                <div className="w-[100px] h-[100px] rounded-full border flex items-center justify-center overflow-hidden">
                    {image ? (
                        <img src={image} alt="프로필 미리보기" className="w-full h-full object-cover" />
                        ) : (
                        <div className="text-gray-400">사진 추가</div>
                    )}
                </div>
            </label>
        </div>
    );
};


export default ProfileUploader;
