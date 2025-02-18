import { createSlice } from '@reduxjs/toolkit';

const TOTAL_STEPS = 10;

// localStorage에서 상태 로드
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('caregiverProfileState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const initialState = loadState() || {
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

// URL 경로와 스텝 매핑
export const pathToStepMapping = {
  license: 1,
  'dementia-education': 2,
  vehicle: 3,
  keywords: 4,
  career: 5,
  introduction: 6,
  payment: 7,
  'bank-account': 8,
  'matching-preference': 9,
  success: 10,
};

const caregiverProfileSlice = createSlice({
  name: 'profileSetup',
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentStep < TOTAL_STEPS) {
        state.steps[state.currentStep].completed = true;
        state.currentStep += 1;
        // localStorage에 상태 저장
        localStorage.setItem('caregiverProfileState', JSON.stringify(state));
      }
    },
    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.steps[state.currentStep - 1].completed = false;
        state.currentStep -= 1;
        localStorage.setItem('caregiverProfileState', JSON.stringify(state));
      }
    },
    setCurrentStep: (state, action) => {
      const newStep = action.payload;
      if (newStep >= 1 && newStep <= TOTAL_STEPS) {
        state.currentStep = newStep;
        // 이전 스텝들을 완료 상태로 설정
        for (let i = 1; i < newStep; i++) {
          state.steps[i].completed = true;
        }
        localStorage.setItem('caregiverProfileState', JSON.stringify(state));
      }
    },
    updateProfileData: (state, action) => {
      state.profileData = { ...state.profileData, ...action.payload };
      localStorage.setItem('caregiverProfileState', JSON.stringify(state));
    },
    resetProfileSetup: (state) => {
      Object.assign(state, initialState);
      localStorage.removeItem('caregiverProfileState');
    },
  },
});

export const {
  nextStep,
  previousStep,
  setCurrentStep,
  updateProfileData,
  resetProfileSetup,
} = caregiverProfileSlice.actions;

export default caregiverProfileSlice.reducer;
