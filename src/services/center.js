import api from "./axios";

// 주소 입력으로 센터 조회
export const fetchCenters = async (city, county, region) => {
    try {
        const response = await api.get('/center', {
            params: { city, county, region },
        });

        console.log("센터 정보 조회 성공: ", response);

        return response.data?.data?.centers || [];
    } catch (error) {
        console.log('센터 정보 조회 실패: ', error);
        return [];
    }
};

// 센터 정보 조회
export const fetchCenterInfo = async (centerId) => {
    try {
        const response = await api.get(`/center/${centerId}`);
        console.log("센터 정보 조회 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("센터 정보 조회 실패:", error);
        return null;
    }
};

// 센터 정보 수정
export const updateCenterInfo = async (centerId, updatedData) => {
    try {
        const response = await api.put(`/center/${centerId}`, updatedData);
        console.log("센터 정보 수정 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("센터 정보 수정 실패:", error);
        return null;
    }
};