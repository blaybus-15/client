const jobDetails = {
  1: {
    basicInfo: {
      estimatedTime: '20분~30분',
      status: '대기중',
      title: '[2등급/70세/여성] 9시~12시, 매주 평일, 방문요양 요양보호사 모집',
      location: '강남구',
      postedTime: '약 1시간 전',
      tags: ['초보가능', '방문요양'],
    },
    workConditions: {
      salary: '시급 10,700원',
      workingDays: '평일 (주5일)',
      workType: '방문요양',
      workingHours: '오전 9시 ~ 오후 4시',
      workingHoursNegotiable: true,
      preferredCaregiver: '여성 요양보호사 선호',
    },
    workContent: {
      patientInfo: '70대 여성 어르신,\n장기 요양 2등급 판정',
      mainDuties:
        '어르신의 가정 방문 요양\n- 일상생활 보조\n- 식사 준비\n- 외출동행\n- 청소 및 빨래',
    },
    seniorInfo: {
      age: '70세',
      gender: '여성',
      grade: '2등급',
      condition: '정상 (치매 증상 없음)',
      livingWith: '다른 가족과 동거하고 있으나 서비스 시간에는 자리 비움',
      specialNotes: '없음',
      name: '한장미',
      birthDate: '1956 / 3 / 12',
    },
    workArea: {
      address: '서울시 강남구 수서동',
      radius: 300,
    },
  },
  2: {
    basicInfo: {
      estimatedTime: '40분~50분',
      status: '완료함',
      title:
        '[2등급/70세/여성] 9시~12시, 매주 월수금, 방문요양 요양보호사 모집',
      location: '송파구',
      postedTime: '약 2시간 전',
      tags: ['초보가능', '비슷한 근무조건', '방문요양'],
    },
    workConditions: {
      salary: '시급 10,300원',
      workingDays: '월, 수, 금 (주3일)',
      workType: '방문요양',
      workingHours: '오전 9시 ~ 오후 12시',
      workingHoursNegotiable: false,
      preferredCaregiver: '여성 요양보호사 선호',
    },
    workContent: {
      patientInfo: '70대 여성 어르신,\n장기 요양 2등급 판정',
      mainDuties:
        '어르신의 가정 방문 요양\n- 일상생활 보조\n- 식사 준비\n- 외출동행\n- 청소 및 빨래',
    },
    seniorInfo: {
      age: '70세',
      gender: '여성',
      grade: '2등급',
      condition: '경증 치매',
      livingWith: '독거',
      specialNotes: '기억력 저하로 인한 복약 관리 필요',
      name: '김옥자',
      birthDate: '1956 / 7 / 21',
    },
    workArea: {
      address: '서울시 송파구 잠실동',
      radius: 300,
    },
  },
  3: {
    basicInfo: {
      estimatedTime: '10분~20분',
      status: '조율중',
      title: '[1등급/68세/여성] 13시~17시, 매주 화목, 방문요양 요양보호사 모집',
      location: '강동구',
      postedTime: '약 1시간 전',
      tags: ['초보가능', '비수도권 근무조건', '방문요양'],
    },
    workConditions: {
      salary: '시급 11,500원',
      workingDays: '화, 목 (주2일)',
      workType: '방문요양',
      workingHours: '오후 1시 ~ 오후 5시',
      workingHoursNegotiable: true,
      preferredCaregiver: '경력 무관',
    },
    workContent: {
      patientInfo: '60대 여성 어르신,\n장기 요양 1등급 판정',
      mainDuties:
        '어르신의 가정 방문 요양\n- 일상생활 보조\n- 식사 준비\n- 개인위생 관리\n- 재활운동 보조',
    },
    seniorInfo: {
      age: '68세',
      gender: '여성',
      grade: '1등급',
      condition: '뇌졸중 후유증',
      livingWith: '배우자와 동거',
      specialNotes: '거동이 불편하여 이동 보조 필요',
      name: '이옥순',
      birthDate: '1958 / 10 / 3',
    },
    workArea: {
      address: '서울시 강동구 천호동',
      radius: 300,
    },
  },
  4: {
    basicInfo: {
      estimatedTime: '20분~30분',
      status: '대기중',
      title:
        '[3등급/75세/남성] 13시~18시, 매주 월화수, 방문요양 요양보호사 모집',
      location: '서초구',
      postedTime: '약 2시간 전',
      tags: ['초보가능', '방문요양'],
    },
    workConditions: {
      salary: '시급 12,300원',
      workingDays: '월, 화, 수 (주3일)',
      workType: '방문요양',
      workingHours: '오후 1시 ~ 오후 6시',
      workingHoursNegotiable: true,
      preferredCaregiver: '남성 요양보호사 선호',
    },
    workContent: {
      patientInfo: '70대 남성 어르신,\n장기 요양 3등급 판정',
      mainDuties:
        '어르신의 가정 방문 요양\n- 일상생활 보조\n- 식사 준비\n- 산책 동행\n- 말벗 및 정서 지원',
    },
    seniorInfo: {
      age: '75세',
      gender: '남성',
      grade: '3등급',
      condition: '경증 치매',
      livingWith: '독거',
      specialNotes: '우울증상이 있어 정서적 지원 필요',
      name: '이철수',
      birthDate: '1951 / 5 / 2',
    },
    workArea: {
      address: '서울시 서초구 반포동',
      radius: 300,
    },
  },
};

export default jobDetails;
