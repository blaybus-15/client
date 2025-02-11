# 🚀 Git Convention

팀 협업을 원활하게 진행하기 위해 Git 컨벤션을 아래와 같이 정합니다.


## 📌 1. 브랜치 전략

### 브랜치 생성 규칙
- `main` : 최종 배포 브랜치
- `develop` : 개발 브랜치 (기능 구현 완료 후 머지)
- `feat/#이슈번호` : 새로운 기능 개발을 위한 브랜치
- `fix/#이슈번호` : 버그 수정 브랜치
- `hotfix/#이슈번호` : 프로덕션(배포)에서 발생한 긴급 수정

---

## 📌 2. 커밋 메시지 규칙
```
Type: Subject (#이슈번호)
예시: feat: 로그인 기능 추가 (#12)
```
- **`Type`**: 커밋의 목적을 나타내는 태그 (예: `feat`, `fix`, `docs` 등)
- **`Subject`**: 변경 사항에 대한 간결한 설명을 작성
- **`#이슈번호`**: 관련 이슈 번호를 포함
    
### 커밋 메시지 타입
| 타입 | 설명 |
|------|------|
| feat | 새로운 기능 추가 |
| fix | 버그 수정 |
| docs | 문서 수정 (README 등) |
| style | 코드 스타일 변경 (세미콜론 추가 등 기능 변경 없음) |
| refactor | 코드 리팩토링 (기능 변경 없음) |
| test | 테스트 코드 추가 |
| chore | 기타 작업 (빌드 설정 변경, 패키지 설치 등) |

---

## 📌 3. 이슈 관리 규칙

### 이슈 제목 규칙
```
[태그] 이슈 제목
예시: [feat] 카카오 로그인 구현
```

- **[feat]** 새로운 기능 개발  
- **[fix]** 버그 수정  
- **[docs]** 문서 수정  
- **[refactor]** 리팩토링  
- **[test]** 테스트 코드 추가  
- **[chore]** 기타  
  
### 이슈 본문 템플릿
```
📄 작업 대상
 - 카카오 로그인 구현

✅ 작업 내용
  - [ ] To do
  - [ ] To do 

💬 리뷰 요구사항
	

📎 기타 참고 사항
  - 관련 API 문서: [링크]
```
 
---

## 📌 4. PR(Pull Request) 규칙

### PR 제목 규칙
```
[태그] 작업 내용 (#이슈번호)
예시: [feat] 회원가입 API 연동 (#15)
```

### PR 본문 템플릿
```
📌 개요
- 회원가입 API 연동

## 🗒️ 작업 내용 요약
- Redux를 활용한 상태 관리 추가
- Axios를 이용한 API 호출

## 🔗 관련 이슈
- Closes #15
```

### PR 머지 규칙
- 최소 1명 이상 코드 리뷰 후 승인
- develop 브랜치에 머지 (배포 전 main 브랜치로 병합)

---

## 📌 5. 기타 규칙

### 코드 스타일
- 함수 및 변수 네이밍: camelCase 사용
- React 컴포넌트 네이밍: PascalCase 사용 (예: LoginForm.js)

### 커밋 & 브랜치 주의사항
- 작업 단위별 커밋 (기능이 완성되면 커밋)
- 작업 완료 후 PR 작성, 코드 리뷰 요청
