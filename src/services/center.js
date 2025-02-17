import api from "./axios";

export const fetchCenters = async (city, county, region) => {
    try {
        const response = await api.get('/center', {
            params: { city, county, region },
        });

        console.log("응답: ", response);
        
        return response.data?.data?.centers || [];
    } catch (error) {
        console.log('센터 정보 조회 실패: ', error);
        return [];
    }
};