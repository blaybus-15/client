import { createSlice } from '@reduxjs/toolkit';

const TOTAL_STEPS = 10;

const initialState = {
  currentStep: 1,
  steps: {
    1: { title: '자격증 등록', completed: false },
    2: { title: '치매교육 이수', completed: false },
    3: { title: '주소 등록', completed: false },
    4: { title: '차량소지여부', completed: false },
    5: { title: '성격 키워드', completed: false },
    6: { title: '경력등록', completed: false },
    7: { title: '한줄소개', completed: false },
    8: { title: '희망 급여', completed: false },
    9: { title: '계좌 등록', completed: false },
    10: { title: '매칭 희망 조건', completed: false },
  },
  profileData: {},
};

const caregiverProfileSlice = createSlice({
  name: 'profileSetup',
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentStep < TOTAL_STEPS) {
        state.steps[state.currentStep].completed = true;
        state.currentStep += 1;
      }
    },
    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    updateProfileData: (state, action) => {
      state.profileData = { ...state.profileData, ...action.payload };
    },
    resetProfileSetup: () => initialState,
  },
});

export const { nextStep, previousStep, updateProfileData, resetProfileSetup } =
  caregiverProfileSlice.actions;
export default caregiverProfileSlice.reducer;
