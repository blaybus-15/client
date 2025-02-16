import React, { useState } from 'react';
import Postcode from 'react-daum-postcode';

const DaumPost = () => {
  const [address, setAddress] = useState('');

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
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">도로명 주소 검색</h1>
      <Postcode onComplete={handleComplete} />
      {address && (
        <div className="p-2 mt-4 bg-gray-100 border rounded">
          <p>
            <strong>선택한 주소:</strong> {address}
          </p>
        </div>
      )}
    </div>
  );
};

export default DaumPost;
