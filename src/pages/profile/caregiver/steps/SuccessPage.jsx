import Button from '../../../../components/Button';

const SuccessPage = () => {
  return (
    <div className="flex flex-col min-h-screen px-6 pt-12 bg-white justify-evenly">
      <div className="flex flex-col items-center justify-center flex-1 space-y-6 text-center">
        <h2 className="head-semi-bold-24 leading-[40px] text-dark">
          프로필 등록을
          <br />
          완료했습니다!
        </h2>

        <div className="flex mt-12 justify-center items-center w-[247px] h-[313px] bg-gray-200">
          <span className="text-gray-500">일러스트</span>
        </div>
      </div>

      <div className="w-full px-8 pb-12">
        <Button text="돌봄 연결로 가기" onClick={() => {}} />
      </div>
    </div>
  );
};

export default SuccessPage;
