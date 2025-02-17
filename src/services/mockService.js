import { mockCenters } from "./mockData";

// 더미 데이터 기반 센터 검색
export const fetchMockCenters = async (searchQuery) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (!searchQuery) {
                resolve(mockCenters); // 검색어 없으면 전체 리스트 반환
            } else {
                const filteredCenters = mockCenters.filter(center =>
                    center.centerName.includes(searchQuery) ||
                    center.address.includes(searchQuery)
                );
                resolve(filteredCenters);
            }
        }, 500); // 0.5초 지연 (API 응답 시뮬레이션)
    });
};

// 선택한 센터 상세 정보 가져오기
export const fetchMockCenterById = async (centerId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const center = mockCenters.find(c => c.id === Number(centerId));
            resolve(center || null);
        }, 500);
    });
};