import React, { useState } from 'react';
import Postcode from 'react-daum-postcode';

const AddressForm = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') extraAddress += data.bname;
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress);
    setIsPopupOpen(false); // 팝업 닫기
  };

  return (
    <div className="max-w-lg p-4 mx-auto mt-20 bg-white rounded-md shadow-md">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setIsPopupOpen(true)}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          주소 검색
        </button>
      </div>
      <input
        type="text"
        value={address}
        readOnly
        placeholder="주소"
        className="w-full px-3 py-2 mb-4 border rounded focus:outline-none focus:ring focus:ring-blue-300"
      />
      <input
        type="text"
        value={detailAddress}
        onChange={(e) => setDetailAddress(e.target.value)}
        placeholder="상세주소"
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
      />

      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg p-4 bg-white rounded shadow-lg">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="float-right mb-2 text-red-500 hover:text-red-700"
            >
              닫기
            </button>
            <Postcode onComplete={handleComplete} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressForm;
