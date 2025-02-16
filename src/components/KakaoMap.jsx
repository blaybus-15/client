import { useEffect, useRef } from 'react';
import useLocation from '../hooks/useLocation';

export default function KakaoMap() {
  const mapRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const initMap = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          const container = document.getElementById('map');
          const options = {
            center: new window.kakao.maps.LatLng(
              location?.latitude,
              location?.longitude
            ),
            level: 3,
          };

          const map = new window.kakao.maps.Map(container, options);
          mapRef.current = map;

          if (location) {
            const markerPosition = new window.kakao.maps.LatLng(
              location.latitude,
              location.longitude
            );
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
            });
            marker.setMap(map);
          }
        });
      } else {
        setTimeout(initMap, 100);
      }
    };

    initMap();

    return () => {
      mapRef.current = null;
    };
  }, [location]);

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '500px',
        borderRadius: '8px',
        margin: '20px 0',
      }}
    />
  );
}
