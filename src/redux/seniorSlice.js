import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    birthDate: { year: "", month: "", day: "" },
    genderType: "",
    preferredGender: "",
    careLevel: "",
    address: "",
    isCoLiving: false,
    contactInfo: "",
    guardianContact: "",
    visitType: "",       // 방문 유형 (REGULAR / TEMPORARY)
    visitDays: [],       // 정기 방문 요일 (["MONDAY", "WEDNESDAY"] 등)
    visitDates: [],      // 단기 방문 날짜 ([시작일, 종료일])
    careStartTime: { hour: "", minute: "", second: "", nano: "" },
    careEndTime: { hour: "", minute: "", second: "", nano: "" },
};

const seniorSlice = createSlice({
    name: "senior",
    initialState,
    reducers: {
        setSeniorInfo: (state, action) => {
        return { ...state, ...action.payload };
        },
        formatBirthDateForAPI: (state) => {
            const { year, month, day } = state.birthDate;
            state.birthDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`; // "YYYY-MM-DD" 형식 변환
        },
        resetSeniorInfo: () => initialState,
    },
});

export const { setSeniorInfo, formatBirthDateForAPI, resetSeniorInfo } = seniorSlice.actions;
export default seniorSlice.reducer;