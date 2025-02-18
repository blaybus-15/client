import { createSlice } from '@reduxjs/toolkit';

const TOTAL_STEPS = 7; // 어르신 정보 등록의 총 단계

// localStorage에서 상태 로드
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('seniorStepState');
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
    1: { title: '기본 정보 입력', completed: false },
    2: { title: '선호 성별 선택', completed: false },
    3: { title: '돌봄 일정 입력', completed: false },
    4: { title: '돌봄 시간 입력', completed: false },
    5: { title: '일상생활 능력 입력', completed: false },
    6: { title: '필요 서비스 선택', completed: false },
    7: { title: '급여 입력', completed: false },
  },
};

// URL 경로와 스텝 매핑
export const pathToStepMapping = {
  basic: 1,
  'gender-select': 2,
  'care-date': 3,
  'care-time': 4,
  'daily-living': 5,
  'require-service': 6,
  'match-salary': 7,
};

const seniorStepSlice = createSlice({
  name: 'seniorStep',
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentStep < TOTAL_STEPS) {
        state.steps[state.currentStep].completed = true;
        state.currentStep += 1;
        localStorage.setItem('seniorStepState', JSON.stringify(state));
      }
    },
    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.steps[state.currentStep - 1].completed = false;
        state.currentStep -= 1;
        localStorage.setItem('seniorStepState', JSON.stringify(state));
      }
    },
    setCurrentStep: (state, action) => {
      const newStep = action.payload;
      if (newStep >= 1 && newStep <= TOTAL_STEPS) {
        state.currentStep = newStep;
        for (let i = 1; i < newStep; i++) {
          state.steps[i].completed = true;
        }
        localStorage.setItem('seniorStepState', JSON.stringify(state));
      }
    },
    resetSeniorStep: (state) => {
      Object.assign(state, initialState);
      localStorage.removeItem('seniorStepState');
    },
  },
});

export const { nextStep, previousStep, setCurrentStep, resetSeniorStep } =
  seniorStepSlice.actions;

export default seniorStepSlice.reducer;
