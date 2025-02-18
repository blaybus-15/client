import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSeniorInfo } from '../../../../redux/seniorSlice';
import SelectableCard from '../../../../components/SelectableCard';
import Button from '../../../../components/Button';

const GenderSelectPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectedGender, setSelectedGender] = useState(null);

    // const options = [
    //     { label: "남자", value: "MALE" },
    //     { label: "여자", value: "FEMALE" },
    //     { label: "상관 없어요", value: "ANY" }
    // ];

    const options = ["남자", "여자", "상관 없어요"];

    const handleSelect = (value) => {
        console.log("선택된 값:", value);
        setSelectedGender(value);
    };

    const handleNext = () => {
        if (!selectedGender) {
            alert("선호 성별을 선택해주세요.");
            return;
        }

        dispatch(setSeniorInfo({ preferredGender: selectedGender }));
        navigate("/care-date"); // 다음 페이지
    };

    return (
        <div className="flex flex-col justify-evenly min-h-screen px-6 pt-12 bg-white">
        <div className="flex-1 px-4">
            <div className="mt-9 mb-8 head-semi-bold-24">
                요양보호사의 선호 성별을
                <br />
                선택해 주세요.
            </div>
        

            <div className="mb-3 text-dark body-medium-18">어르신의 선호 성별</div>

            <SelectableCard
                items={options}
                multiple={false}
                onSelect={handleSelect}
                selectedValue={selectedGender}
                selectedClassName="py-3 bg-background-point body-semi-bold-16 shadow-inner"
                unselectedClassName="py-3 bg-background-gray body-regular-16 hover:bg-gray-2/20"
            />
            </div>


        <div className="p-4 sm:pb-16 md:pb-12">
            <Button
                text={'다음'}
                onClick={handleNext}
                disabled={selectedGender === null}
            />
        </div>
        </div>
    );
};

export default GenderSelectPage;
