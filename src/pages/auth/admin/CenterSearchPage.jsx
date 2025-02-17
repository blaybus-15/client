import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCenters } from '../../../services/center';
import { fetchMockCenters } from '../../../services/mockService';

const CenterSearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [centers, setCenters] = useState([]);
    const navigate = useNavigate();

    // const handleSearch = async () => {
    //     const query = searchQuery.trim();

    //     if (!query) {
    //         console.log("검색어를 입력해주세요.");
    //         return;
    //     }

    //     const [city = '', county = '', region = ''] = query.split(' ');

    //     try {
    //         const data = await fetchCenters(city, county, region);
            
    //         console.log("API 응답 데이터:", data);

    //         // 결과가 유효한지 확인 후 적용
    //         if (data.length > 0) {
    //             setCenters(data);
    //         } else {
    //             setCenters([]); // 검색 결과 없을 경우 빈 배열로 초기화
    //             console.log("검색 결과 없음");
    //         }
    //     } catch (error) {
    //         console.error("센터 정보 조회 실패:", error);
    //     }
    // };
    
    const handleSearch = async () => {
        const data = await fetchMockCenters(searchQuery);
        setCenters(data);
    };

    const handleSelectCenter = (center) => {
        navigate('/signup/admin/center/register', { state: { selectedCenter: center } });
    };

    return (
        <div div className="min-h-screen px-6 pt-12 bg-gray">
            <div className="relative flex mt-3 items-center h-[38px] body-regular-16">
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onClick={handleSearch}
                    placeholder="센터 검색"
                    className="w-full h-full px-4 pr-12 bg-white rounded-lg placeholder-gray-2 text-dark focus:outline-none focus:shadow-inner"
                />
                <button 
                    onClick={handleSearch}
                    className='absolute p-2 text-gray-400 right-2' 
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z" fill="#606265"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7072 14.293L21.7072 20.293L20.293 21.7072L14.293 15.7072L15.7072 14.293Z" fill="#606265"/>
                    </svg>
                </button>
            </div>

            <div className="mt-4">
                <p className="body-medium-18 text-gray-2 mb-3">연관검색어</p>
                {centers.length > 0 ? (
                    <ul className="flex flex-col gap-3">
                        {centers.map((center) => (
                            <li
                                key={center.id}
                                onClick={() => handleSelectCenter(center)}
                                className="relative p-3 cursor-pointer"
                            >
                                <p className="body-medium-18 text-dark">{center.centerName}</p>
                                <p className="body-regular-16 text-gray-1">{center.address}</p>

                                <div className="absolute bottom-0 left-0 w-full border-b border-gray-2"></div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="body-medium-18 text-dark text-center mt-4">검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    )
}

export default CenterSearchPage;
