import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import useLocation from '../hooks/useLocation';
import { LuLocateFixed } from 'react-icons/lu';

const convertCoordsToAddress = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    if (!window.kakao?.maps?.services) {
      reject(new Error('Kakao Maps Services가 로드되지 않았습니다.'));
      return;
    }

    try {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.coord2Address(longitude, latitude, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const addressInfo = result[0];
          const roadAddress = addressInfo.road_address;
          const jibunAddress = addressInfo.address;

          // 도로명 주소가 있는 경우 도로명 주소 사용, 없으면 지번 주소 사용
          if (roadAddress) {
            const fullAddress = `${roadAddress.address_name} ${
              roadAddress.building_name
                ? `(${jibunAddress.region_3depth_name}, ${roadAddress.building_name})`
                : `(${jibunAddress.region_3depth_name})`
            }`;
            resolve(fullAddress);
          } else {
            const fullAddress = `${jibunAddress.address_name} (${jibunAddress.region_3depth_name})`;
            resolve(fullAddress);
          }
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
    '서울특별시 성동구 금호동4가',
    '서울특별시 성동구 금호4가동',
    '서울특별시 성동구 옥수동',
    '서울특별시 성동구 압구정동',
    '서울특별시 성동구 금호동3가',
    '서울특별시 성동구 금호동2가',
    '서울특별시 성동구 신사동',
    '서울특별시 성동구 금호2,3가동',
    '서울특별시 성동구 금호동1가',
    '서울특별시 성동구 하나동',
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
        //onSelectAddress(address);
        setSearchTerm(address);
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
    <div className="flex flex-col w-full h-full">
      <div className="sticky z-10 top-10 bg-background-gray">
        <div className="py-6 space-y-3">
          <SearchBar
            placeholder="동명(읍,면)으로 검색"
            value={searchTerm}
            onChange={setSearchTerm}
          />
          <button
            className={`flex items-center justify-center w-full py-2 rounded-lg body-semi-bold-18 text-dark
              ${isLoading ? 'bg-main cursor-not-allowed' : 'bg-yellow-300'}
            `}
            onClick={handleLocationSearch}
            disabled={isLoading}
          >
            <LuLocateFixed size={20} className="mr-3 text-dark" />
            {isLoading ? '위치 확인 중...' : '내 위치로 찾기'}
          </button>
          {error && (
            <div className="text-sm text-center text-red-500">{error}</div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredAddresses.length > 0 ? (
          <>
            <div className="mt-4 mb-1 body-medium-18 text-gray-2">
              {searchTerm ? '관련 검색 주소' : '근처 주소'}
            </div>
            <div className=" body-medium-18">
              {filteredAddresses.map((address, index) => (
                <div
                  key={index}
                  className="pt-4 cursor-pointer hover:bg-gray-50"
                  onClick={() =>
                    onSelectAddress(address.replace('서울특별시', '서울'))
                  }
                >
                  {address.replace('서울특별시', '서울')}
                  <hr className="mt-4" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center mt-28 body-medium-18 text-gray-1">
            검색 결과가 없어요.
            <br />
            주소를 다시 입력해주세요!
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressSearchBox;
