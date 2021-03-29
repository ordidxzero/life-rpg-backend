# LIFE RPG Backend Part

Life RPG의 Backend 부분이다.

# TO DO

## API

- [ ] 회원가입 및 로그인

  - [ ] Kakao, Naver, Google, Github, Apple(iOS)

- Project
  - [x] Project 생성
  - [x] Project 삭제
  - [x] Project 읽기
  - [x] Project 변경
- Todo
  - [x] Todo 생성
  - [x] Todo 삭제
  - [x] Todo 읽기
  - [x] Todo 변경
  - [ ] Todo를 반복해서 생성할 수 있게 TodoMold Entity를 만들기
- Diary
  - [x] Diary 생성
  - [x] Diary 읽기
  - [x] Diary 변경
    - [x] 비밀 일기 <-> 일반 일기 변경만 가능
    - [x] 일기 삭제 / 내용 변경 가능하게 할까? (일단 API는 만듦)
- User
  - [x] Local Login 구현
  - [ ] 육성 방법을 두 가지로 나눌까? (계속 레벨업을 하는 방법 / 매년 초기화되는 방법) -> 두 개를 합쳐도 될 듯?
  - [ ] Social Login은 Flow가 어떻게 되는지 확실하지 않아서 보류
- YearExperience
  - [ ] CronJob으로 매년 1월 1일에 자동으로 생성. (연 중에 회원 가입을 한다면 회원 가입 당일에 생성)

## IDEA

- [ ] Badge를 넣어서 업적을 쌓을 수 있도록 할 것
