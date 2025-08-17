

# Vanilla js로 게시판 기능 구현하기 with SPA

javascript를 이용하여 게시판 기능을 구현합니다.

## Demo
[http://1.232.69.64:21000]

## 주요 스펙
- nodejs 22.13.0
- npm 11.3.0
- vite 7.1.2
- quill 2.0.3 (에디터) [https://quilljs.com/]
- bootstrap 5.3.7 (CSS) [https://getbootstrap.com]

## 화면 목록
- 게시판 목록
- 글쓰기 & 글수정

## vite 개발서버 실행방법

```
npm install
npm run start
```

## 주요 특징
- 경로 변경에 따라 화면이 변화해야하므로 SPA구조를 사용.
- SPA 구조를 만들기 위해 history API 활용
- 코드 재사용을 고려하여 BoardList, BoardWriter 등으로 컴포넌트화