import React from 'react';
import { useNavigate } from 'react-router-dom';
import homeBackground from '../../assets/home.png';
import CaregiverIcon from '../../assets/caregiver-icon.svg';
import AdminIcon from '../../assets/admin-icon.svg';

const UserTypeSelectPage = () => {
    const navigate = useNavigate();

    const handleUserTypeSelect = (type) => {
        navigate(`/auth?type=${type}`);
    };

    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center">
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat filter blur-sm opacity-50"
                style={{ backgroundImage: `url(${homeBackground})` }} 
            />

            <div className="relative z-10 flex flex-col items-center text-center">
                <h1 className="head-semi-bold-24 text-dark leading-[40px] mb-12">
                    케어링크와 함께<br />시작하세요!
                </h1>

                <div className="flex flex-row space-x-4">
                    <div 
                        className="w-40 h-48 flex flex-col items-center justify-center p-4 bg-white text-dark rounded-xl shadow-md cursor-pointer hover:bg-gray-100 transition"
                        onClick={() => handleUserTypeSelect("caregiver")}
                    >
                        <img src={CaregiverIcon} alt="요양보호사 아이콘" className="w-12 h-12 mb-4" />
                        <p className="text-lg font-semibold">요양보호사로<br />시작</p>
                    </div>

                    <div 
                        className="w-40 h-48 flex flex-col items-center justify-center p-4 bg-white text-dark rounded-xl shadow-md cursor-pointer hover:bg-gray-100 transition"
                        onClick={() => handleUserTypeSelect("admin")}
                    >
                        <img src={AdminIcon} alt="센터 관리자 아이콘" className="w-12 h-12 mb-4" />
                        <p className="text-lg font-semibold">센터 관리자로<br />시작</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserTypeSelectPage;
