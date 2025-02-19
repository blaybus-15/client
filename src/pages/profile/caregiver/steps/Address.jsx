import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Postcode from 'react-daum-postcode';
import { LuLocateFixed } from 'react-icons/lu';
import useLocation from '../../../../hooks/useLocation';
import {
  nextStep,
  updateProfileData,
} from '../../../../redux/profile/caregiverProfileSlice';
import Button from '../../../../components/Button';
import InputField from '../../../../components/InputField';

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

const Address = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress);
    setIsPopupOpen(false);
  };

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
        setAddress(address);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (address && detailAddress) {
      dispatch(
        updateProfileData({
          address: address,
          detailAddress: detailAddress,
        })
      );
      dispatch(nextStep());
      navigate('/profile/caregiver/vehicle');
    }
  };

  return (
    <>
      <div className="flex-1 px-4 pt-24">
        <div className="mb-[27px] head-semi-bold-24">
          선생님의 주소를
          <br />
          입력해주세요.
        </div>

        <button
          className={`flex items-center justify-center w-full py-2 mt-4 mb-3 rounded-lg body-semi-bold-18 text-dark
            ${isLoading ? 'bg-main cursor-not-allowed' : 'bg-yellow-300'}
          `}
          onClick={handleLocationSearch}
          disabled={isLoading}
        >
          <LuLocateFixed size={20} className="mr-3 text-dark" />
          {isLoading ? '위치 확인 중...' : '내 위치로 찾기'}
        </button>

        {error && (
          <div className="mt-2 text-sm text-center text-red-500">{error}</div>
        )}
        <div className="w-full mx-auto mb-3">
          <div className="relative rounded-lg bg-background-gray body-regular-16">
            <input
              type="text"
              value={address}
              readOnly
              placeholder="도로명으로 검색하세요."
              className="w-full h-12 p-4 pr-24 bg-transparent outline-none placeholder-gray-3 text-dark"
              onClick={() => setIsPopupOpen(true)}
            />
            <button
              onClick={() => setIsPopupOpen(true)}
              className="absolute px-4 py-2 text-white -translate-y-1/2 rounded-lg bg-gray-2 right-2 top-1/2 hover:bg-main hover:text-dark"
            >
              검색
            </button>
          </div>
        </div>

        <InputField
          placeholder="상세 주소를 입력해주세요."
          value={detailAddress}
          onChange={(e) => setDetailAddress(e.target.value)}
        />

        <div className="text-gray-3 text-sm pt-1.5 font-normal font-['Pretendard'] leading-tight">
          입력하신 선생님의 개인정보는 회원가입 목적 외에는
          <br />
          다른 용도로 사용되지 않습니다.
        </div>

        {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-lg">
              <div className="flex justify-between mb-2">
                <h2 className="text-lg font-semibold">주소 검색</h2>
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  닫기
                </button>
              </div>
              <Postcode
                onComplete={handleComplete}
                style={{ height: '450px' }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 pb-28 sm:pb-16 md:pb-12">
        <Button
          text={'다음'}
          onClick={handleNext}
          disabled={!address || !detailAddress}
        />
      </div>
    </>
  );
};

export default Address;
