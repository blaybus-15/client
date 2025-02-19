export const caregiverProfiles = [
  {
    id: 1,
    basicInfo: {
      name: '이정은',
      profileImage: '/images/profile1.jpg',
      birthDate: '1970-02-12',
      phone: '010-1234-5678',
      gender: '여',
      age: '만 54세',
      address: '서울시 강남구',
      addressDetail: '강남대로 15번길 55 마음빌라',
      carOwnership: '차량 소지',
      dementiaEducation: '교육 이수 완료',
    },
    introduction: {
      title: '열심히 어르신을 돌보는 책임감 있는 요양보호사입니다.',
      description: '성실하며 정기 근무 가능합니다.',
      keywords: ['성실해요', '섬세해요', '노하우 있어요'],
    },
    career: {
      totalExperience: '5년 3개월',
      details: [
        {
          workplace: '행복한 실버타운',
          period: '2019.03 - 2023.05',
          duties:
            '어르신 재가 방문 요양, 가사 및 일상생활 업무 보조, 식사 준비',
        },
        {
          workplace: '늘봄 요양원',
          period: '2018.01 - 2019.02',
          duties: '치매 어르신 케어, 목욕 서비스, 프로그램 활동 보조',
        },
      ],
    },
    certifications: [
      {
        name: '요양보호사',
        acquisitionDate: '2017-12-15',
        issuingAuthority: '서울특별시',
      },
      {
        name: '간호조무사 1급',
        acquisitionDate: '2016-08-20',
        issuingAuthority: '보건복지부',
      },
    ],
    preferredWork: {
      workingDays: ['오전', '오전 - 오후', '오후 ~저녁'],
      workingHours: '1밴드~3밴드 사이',
      preferredGender: '여자 어르신을 선호해요',
      workType: '방문요양',
    },
    vehicleInfo: {
      hasVehicle: true,
      vehicleType: '소형 승용차',
      canProvideRide: true,
    },
  },
  {
    id: 2,
    basicInfo: {
      name: '김미영',
      profileImage: '/images/profile2.jpg',
      birthDate: '1968-05-23',
      phone: '010-9876-5432',
      gender: '여',
      age: '만 56세',
      address: '서울시 서초구',
      addressDetail: '서초로 123길 45 행복아파트',
      carOwnership: '차량 미소지',
      dementiaEducation: '교육 이수 완료',
    },
    introduction: {
      title: '따뜻한 마음으로 어르신을 모시는 요양보호사입니다.',
      description: '14년 경력으로 어르신들을 편안하게 모시겠습니다.',
      keywords: ['경험많아요', '친절해요', '책임감있어요'],
    },
    career: {
      totalExperience: '14년 2개월',
      details: [
        {
          workplace: '사랑노인복지센터',
          period: '2010.01 - 2023.12',
          duties: '재가방문요양, 목욕서비스, 일상생활 지원',
        },
      ],
    },
    certifications: [
      {
        name: '요양보호사',
        acquisitionDate: '2009-12-20',
        issuingAuthority: '서울특별시',
      },
    ],
    preferredWork: {
      workingDays: ['오전', '오전 - 오후'],
      workingHours: '1밴드~2밴드 사이',
      preferredGender: '성별 무관',
      workType: '방문요양',
    },
    vehicleInfo: {
      hasVehicle: false,
      vehicleType: null,
      canProvideRide: false,
    },
  },
  {
    id: 3,
    basicInfo: {
      name: '박영희',
      profileImage: '/images/profile3.jpg',
      birthDate: '1975-06-30',
      phone: '010-5555-7777',
      gender: '여',
      age: '만 49세',
      address: '서울시 마포구',
      addressDetail: '마포대로 25길 12 정다운아파트',
      carOwnership: '차량 소지',
      dementiaEducation: '교육 이수 완료',
    },
    introduction: {
      title: '항상 밝은 에너지로 어르신을 보살핍니다.',
      description: '안전하고 편안한 환경을 제공해드립니다.',
      keywords: ['밝아요', '친절해요', '책임감 있어요'],
    },
    career: {
      totalExperience: '8년 6개월',
      details: [
        {
          workplace: '사랑노인복지센터',
          period: '2015.01 - 2023.06',
          duties: '재가방문 요양, 가사 지원, 식사 보조',
        },
      ],
    },
    certifications: [
      {
        name: '요양보호사',
        acquisitionDate: '2014-11-10',
        issuingAuthority: '서울특별시',
      },
    ],
    preferredWork: {
      workingDays: ['오전 - 오후'],
      workingHours: '2밴드~3밴드 사이',
      preferredGender: '성별 무관',
      workType: '방문요양',
    },
    vehicleInfo: {
      hasVehicle: true,
      vehicleType: 'SUV',
      canProvideRide: false,
    },
  },
];

export const workSchedules = [
  {
    id: 1,
    caregiverId: 1,
    schedules: [
      {
        day: '월',
        timeSlots: ['09:00-12:00', '14:00-18:00'],
      },
      {
        day: '수',
        timeSlots: ['09:00-12:00'],
      },
      {
        day: '금',
        timeSlots: ['14:00-18:00'],
      },
    ],
  },
  {
    id: 2,
    caregiverId: 2,
    schedules: [
      {
        day: '화',
        timeSlots: ['09:00-15:00'],
      },
      {
        day: '목',
        timeSlots: ['09:00-15:00'],
      },
    ],
  },
  {
    id: 3,
    caregiverId: 3,
    schedules: [
      {
        day: '화',
        timeSlots: ['10:00-14:00'],
      },
      {
        day: '목',
        timeSlots: ['14:00-18:00'],
      },
    ],
  },
];

export const matchingHistory = [
  {
    id: 1,
    caregiverId: 1,
    seniorName: '박순자',
    seniorAge: 78,
    seniorGender: '여',
    matchingDate: '2024-01-15',
    status: '매칭완료',
    workSchedule: '월/수/금 오전 9시-12시',
    location: '서울시 강남구',
  },
  {
    id: 2,
    caregiverId: 1,
    seniorName: '이명순',
    seniorAge: 82,
    seniorGender: '여',
    matchingDate: '2023-12-01',
    status: '종료',
    workSchedule: '화/목 오후 2시-6시',
    location: '서울시 서초구',
  },
  {
    id: 3,
    caregiverId: 3,
    seniorName: '최영순',
    seniorAge: 80,
    seniorGender: '여',
    matchingDate: '2024-02-01',
    status: '매칭완료',
    workSchedule: '화/목 오후 2시-6시',
    location: '서울시 마포구',
  },
];

export const workConfirmations = [
  {
    id: 1,
    caregiverId: 1,
    workSchedule: {
      startDate: '2025-02-23',
      workingDays: ['월', '수', '금'],
      workingHours: '오전 1시 ~ 오후 3시',
      location: {
        address: '서울특별시 강남구 강남대로 12번길 33',
        detailAddress: '신비아파트 101동 101호',
      },
    },
    contacts: {
      caregiver: {
        name: '이정은',
        phone: '010-2333-4545',
      },
      manager: {
        name: '김관리',
        phone: '010-3333-4444',
      },
      senior: {
        name: '박순자',
        phone: '010-2333-4545',
      },
      guardian: {
        name: '박보호',
        phone: '010-3333-4444',
      },
    },
    payment: {
      bank: '농협은행',
      accountNumber: '602-34442342-34',
      accountHolder: '이정은',
    },
  },
  {
    id: 2,
    caregiverId: 2,
    workSchedule: {
      startDate: '2025-03-01',
      workingDays: ['화', '목', '토'],
      workingHours: '오전 9시 ~ 오후 12시',
      location: {
        address: '서울특별시 서초구 서초대로 45번길 22',
        detailAddress: '행복아파트 205동 1502호',
      },
    },
    contacts: {
      caregiver: {
        name: '김미영',
        phone: '010-9876-5432',
      },
      manager: {
        name: '이관리',
        phone: '010-4444-5555',
      },
      senior: {
        name: '김영자',
        phone: '010-5555-6666',
      },
      guardian: {
        name: '김보호',
        phone: '010-6666-7777',
      },
    },
    payment: {
      bank: '신한은행',
      accountNumber: '110-333-444444',
      accountHolder: '김미영',
    },
  },
  {
    id: 3,
    caregiverId: 3,
    workSchedule: {
      startDate: '2025-04-01',
      workingDays: ['화', '목'],
      workingHours: '오후 2시 ~ 오후 6시',
      location: {
        address: '서울특별시 마포구 마포대로 12길 45',
        detailAddress: '정다운아파트 502동 1201호',
      },
    },
    contacts: {
      caregiver: {
        name: '박영희',
        phone: '010-5555-7777',
      },
      manager: {
        name: '최관리',
        phone: '010-7777-8888',
      },
      senior: {
        name: '최영순',
        phone: '010-8888-9999',
      },
      guardian: {
        name: '최보호',
        phone: '010-9999-1111',
      },
    },
    payment: {
      bank: '국민은행',
      accountNumber: '123-456-789012',
      accountHolder: '박영희',
    },
  },
];

export const reviews = [
  {
    id: 1,
    caregiverId: 1,
    seniorName: '이명순',
    rating: 4.5,
    date: '2024-01-20',
    content: '항상 시간 약속을 잘 지키시고 어르신을 정성껏 돌봐주셨습니다.',
    tags: ['시간약속 잘 지켜요', '정성껏 돌봐주세요', '의사소통이 원활해요'],
  },
  {
    id: 2,
    caregiverId: 2,
    seniorName: '김영자',
    rating: 5.0,
    date: '2024-01-15',
    content:
      '어르신의 건강상태를 꼼꼼히 체크해주시고 가족처럼 챙겨주셔서 감사합니다.',
    tags: ['꼼꼼해요', '친절해요', '전문적이에요'],
  },
  {
    id: 3,
    caregiverId: 3,
    seniorName: '최영순',
    rating: 4.8,
    date: '2024-02-10',
    content: '정말 친절하고 어르신을 배려해주시는 모습이 인상 깊었습니다.',
    tags: ['친절해요', '배려심 깊어요', '꼼꼼해요'],
  },
];
