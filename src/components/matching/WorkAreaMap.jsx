import { useEffect, useRef, useState } from 'react';

export default function WorkAreaMap({ address, radius = 300 }) {
  const mapRef = useRef(null);
  const [coordinates, setCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadKakaoMap = () => {
      // 카카오맵 SDK가 완전히 로드되었는지 확인
      if (!window.kakao?.maps?.services?.Geocoder || !window.kakao?.maps?.Map) {
        setTimeout(loadKakaoMap, 100);
        return;
      }

      try {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            try {
              const coords = {
                latitude: Number(result[0].y),
                longitude: Number(result[0].x),
              };

              if (isNaN(coords.latitude) || isNaN(coords.longitude)) {
                throw new Error('Invalid coordinates');
              }

              setCoordinates(coords);

              // 컨테이너 엘리먼트 확인
              const container = document.getElementById('map');
              if (!container) {
                throw new Error('Map container not found');
              }

              // 지도 옵션 설정
              const options = {
                center: new window.kakao.maps.LatLng(
                  coords.latitude,
                  coords.longitude
                ),
                level: 4,
              };

              // 지도 인스턴스 생성
              const map = new window.kakao.maps.Map(container, options);
              mapRef.current = map;

              // 마커 생성
              const markerPosition = new window.kakao.maps.LatLng(
                coords.latitude,
                coords.longitude
              );
              const marker = new window.kakao.maps.Marker({
                position: markerPosition,
              });
              marker.setMap(map);

              // 원형 오버레이 생성
              const circle = new window.kakao.maps.Circle({
                center: new window.kakao.maps.LatLng(
                  coords.latitude,
                  coords.longitude
                ),
                radius: radius,
                strokeWeight: 2,
                strokeColor: '#FFD700',
                strokeOpacity: 0.8,
                strokeStyle: 'solid',
                fillColor: '#FFD700',
                fillOpacity: 0.3,
              });
              circle.setMap(map);

              // 지도 영역 조정
              const bounds = new window.kakao.maps.LatLngBounds();
              bounds.extend(markerPosition);

              // 원의 외곽 좌표를 bounds에 추가
              const extraRadius = radius * 1.1; // 10% 여유 공간
              const projection = map.getProjection();
              const centerLatLng = new window.kakao.maps.LatLng(
                coords.latitude,
                coords.longitude
              );
              const points = 360 / 45; // 45도 간격으로 8개의 점 생성

              for (let i = 0; i < points; i++) {
                const angle = (i * 45 * Math.PI) / 180;
                const lat =
                  coords.latitude + (extraRadius / 111000) * Math.cos(angle);
                const lng =
                  coords.longitude +
                  (extraRadius /
                    (111000 * Math.cos((coords.latitude * Math.PI) / 180))) *
                    Math.sin(angle);
                bounds.extend(new window.kakao.maps.LatLng(lat, lng));
              }

              map.setBounds(bounds);
              setIsLoading(false);
            } catch (error) {
              console.error('Map initialization error:', error);
              setIsLoading(false);
            }
          } else {
            console.error('주소를 찾을 수 없습니다.');
            setIsLoading(false);
          }
        });
      } catch (error) {
        console.error('Geocoder initialization error:', error);
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    loadKakaoMap();

    return () => {
      if (mapRef.current) {
        mapRef.current = null;
      }
    };
  }, [address, radius]);

  if (isLoading) {
    return (
      <div className="work-area-map">
        <h2 className="mb-4 text-xl font-bold">근무지역</h2>
        <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-2xl">
          <div>지도를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white work-area-map">
      <h2 className="mb-4 text-xl font-bold">근무지역</h2>
      <div className="overflow-hidden border border-gray-200 rounded-2xl">
        <div
          id="map"
          style={{
            width: '100%',
            height: '400px',
          }}
        />
        <div className="px-4 py-3 bg-white border-t border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-1 font-pretendard">
              근무 주소
            </span>
            <span className="text-sm font-medium text-dark font-pretendard">
              {address}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
