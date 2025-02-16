import AddressSearchBox from '../../components/AddressSearchBox';
import KakaoMap from '../../components/KakaoMap';

const AddressSearch = () => {
  const handleAddressSelect = (address) => {
    console.log('Selected address:', address);
  };

  return (
    <div className="min-h-screen bg-background-gray">
      {/* <KakaoMap /> */}
      <div className="px-3">
        <AddressSearchBox onSelectAddress={handleAddressSelect} />
      </div>
    </div>
  );
};

export default AddressSearch;
