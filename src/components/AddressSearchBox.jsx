// AddressSearchBox.jsx
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import useLocation from '../hooks/useLocation';

const convertCoordsToAddress = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    if (!window.kakao?.maps?.services) {
      reject(new Error('Kakao Maps Services가 로드되지 않았습니다.'));
      return;
    }

    try {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.coord2RegionCode(longitude, latitude, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          // 행정동 주소 반환 (result[0]은 행정동, result[1]은 법정동)
          const address = result[0].address_name;
          resolve(address);
        } else {
          reject(new Error('주소 변환에 실패했습니다.'));
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const AddressSearchBox = ({ onSelectAddress }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  // TODO: dummy data -> 실제 데이터로 교체 필요
  const addresses = [
    '서울 성동구 금호동4가',
    '서울 성동구 금호4가동',
    '서울 성동구 옥수동',
    '서울 성동구 압구정동',
    '서울 성동구 금호동3가',
    '서울 성동구 금호동2가',
    '서울 성동구 신사동',
    '서울 성동구 금호2,3가동',
    '서울 성동구 금호동1가',
    '서울 성동구 하나동',
  ];

  const handleLocationSearch = async () => {
    if (!location?.latitude || !location?.longitude) {
      setError('위치 정보를 가져올 수 없습니다.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const address = await convertCoordsToAddress(
        location.latitude,
        location.longitude
      );

      if (address) {
        onSelectAddress(address);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAddresses = addresses.filter((address) =>
    address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-3">
      <SearchBar
        placeholder="동명(읍,면)으로 검색"
        value={searchTerm}
        onChange={setSearchTerm}
      />
      <button
        className={`flex items-center justify-center w-full py-2 mb-6 rounded-lg
          ${isLoading ? 'bg-yellow-100 cursor-not-allowed' : 'bg-yellow-300'}
        `}
        onClick={handleLocationSearch}
        disabled={isLoading}
      >
        <svg
          className={`w-6 h-6 mr-2 ${isLoading ? 'animate-spin' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        {isLoading ? '위치 확인 중...' : '내 위치로 찾기'}
      </button>
      {error && <div className="text-sm text-center text-red-500">{error}</div>}
      <div>
        <div className="mb-2 text-sm font-medium">근처 주소</div>
        <div className="space-y-2">
          {filteredAddresses.map((address, index) => (
            <div
              key={index}
              className="p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => onSelectAddress(address)}
            >
              {address}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddressSearchBox;
