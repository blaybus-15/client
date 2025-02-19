import Button from '../../../../components/Button';
import { useNavigate } from 'react-router-dom';
import CheckIcon from '../../../../assets/check-icon.svg';
const SuccessPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/matching/caregiver');
  };

  return (
    <div className="flex flex-col min-h-screen px-4 pt-12 bg-white justify-evenly">
      <div className="text-center mt-12">
        <h2 className="head-semi-bold-24 leading-[40px] text-dark">
          프로필 등록을
          <br />
          완료했습니다!
        </h2>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <img
          src={CheckIcon}
          alt="체크 아이콘"
          className="w-40 h-40 self-center"
        />
      </div>

      <div className="w-full pb-12">
        <Button text="돌봄 연결로 가기" onClick={handleClick} />
      </div>
    </div>
  );
};

export default SuccessPage;
