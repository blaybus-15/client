import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    birthDate: { year: "", month: "", day: "" },
    genderType: "",
    careLevel: "",
    address: "",
    isCoLiving: false,
    contactInfo: "",
    guardianContact: "",
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