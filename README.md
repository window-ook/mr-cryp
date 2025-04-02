# 📈 미스터 크립 (v1.1)

![mrcryp_thumbnail](https://github.com/user-attachments/assets/f6687cab-40e9-4056-8871-f49e6f595168)

## 📋 목차

- [🔗 접속 링크](#🔗-접속-링크)
- [✅ 스택](#✅-스택)
- [ℹ️ 페이지 소개](#ℹ️-페이지-소개)
- [🧱 아키텍처](#📌-아키텍처)

### 👉 서비스 소개

미스터 크립은 여러분의 크립토 비서입니다.<br/>
여러분의 계좌 잔고와 확인할 수 있고, 현재 트렌드 소식을 확인해보세요.<br/> 
보안 위험에 의해 실제 거래는 되지 않지만, 실시간 차트를 보고 모의 주문을 할 수 있습니다.<br/>

## 🔗 링크
<a href='https://mr-cryp.vercel.app'>미스터 크립 홈페이지</a>

## ✅ 스택
<div style='display:flex; align-items:center'>
    <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white">
    <img src="https://img.shields.io/badge/React.js-61DAFB?style=flat-square&logo=react&logoColor=black">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black">
</div>
<div style='display:flex; align-items:center'>
    <img src="https://img.shields.io/badge/Tanstack Query-FF4154?style=flat-square&logo=reactquery&logoColor=white">
    <img src="https://img.shields.io/badge/Redux Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white">
</div>
<div style='display:flex; align-items:center'>
    <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white">
    <img src="https://img.shields.io/badge/MUI-007FFF?style=flat-square&logo=mui&logoColor=white">
    <img src="https://img.shields.io/badge/Highcharts-405473?style=flat-square&logo=highcharts&logoColor=white">
</div>
<div style='display:flex; align-items:center'>
    <img src="https://img.shields.io/badge/Upbit API-0052CC?style=flat-square&logo=upbit&logoColor=white">
    <img src="https://img.shields.io/badge/Youtube API-FF0000?style=flat-square&logo=youtube&logoColor=white">
    <img src="https://img.shields.io/badge/Naver API-03C75A?style=flat-square&logo=naver&logoColor=white">
</div>
<div style='display:flex; align-items:center'>
    <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white">
</div>
<div style='display:flex; align-items:center'>
    <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white">
</div><br/>

## ℹ️ 페이지 소개
### 초기 화면

<img src='https://github.com/user-attachments/assets/3aafb0f0-297e-4701-9597-a59c7c8820a4' width='400' height='180' />

### 홈

<img src='https://github.com/user-attachments/assets/4e366d13-f52e-45f6-9905-116a625d1b39' width='600' height='300' />

내 계좌현황을 파이 차트로 비율에 따라 한 눈에 확인할 수 있고,<br>
현금와 상세 잔고 현황을 테이블로 확인할 수 있습니다.<br>
플로우 차트로 추이를 확인해보세요!<br>

### 비전

<img src='https://github.com/user-attachments/assets/4bc1e9b1-71ab-4c78-951e-09d1f5689da0' width='600' height='300' />

가상화폐에 대한 기본적인 정보와 투자 방법에 대한 영상,<br>
유튜브에서 '코인'을 키워드로 검색한 최신 검색 결과 영상,<br>
그리고 최신 기사들을 바로 확인할 수 있는 비전 페이지 입니다.<br>
영상은 바로 재생이 가능하게 Iframe을 이용하였고, 기사는 링크 이동과 복사가 가능하게 구현했습니다.<br>

### 거래: 실시간 차트

https://github.com/user-attachments/assets/3271e068-5336-451e-8560-7a65c7749d76

REST API -> QUOTATION API의 종목 중 KRW로 시작하는 종목들의 데이터로<br>
마켓 리스트를 구현했고 클릭으로 선택한 마켓의 상세 정보, 1분봉, 5분봉, 일봉, 주봉, 월봉 등<br>
시세 흐름과 현재 실시간 거래 내역 및 오더북을 보여주는 페이지입니다.<br>

https://github.com/user-attachments/assets/4c94eb5b-2ecd-4d61-bd7f-15f1bb469c68

주문하기 기능은 실제로 매수, 매도 기능을 하지는 않습니다.<br>
기본적으로 해당 마켓의 실시간 가격이 지정되어있고 매수와 매도 주문을 하면<br>
거래내역에서 주문한 내역을 모두 확인할 수 있게 상태로 저장됩니다.<br>

## 🧱 아키텍처

https://github.com/user-attachments/assets/56f26231-7450-4f30-b087-00c5546e8ec7

### Highcharts

![Highcharts](https://github.com/user-attachments/assets/078744cc-479d-44e3-bbdd-b9ae97606912)

https://api.highcharts.com/highstock/plotOptions.candlestick

Chart.js, D3.js, Recharts와 같은 라이브러리를 뒤로 하고 highcharts를 선택한 이유는 다음과 같습니다.<br>

1. 캔들스틱과 OHLC 툴팁을 기본적으로 지원하여 코인 거래 데이터를 시각화하는 데에 최적화되어 있습니다.<br>
    또한 rangeSelector와 누적 거래량 막대 그래프를 기본 지원하여 쉽게 설정이 가능합니다.<br>
    이외에도 주식이나 가상화폐를 거래하기 위해 주어져야 할 데이터 시각화 요소를 기본적으로 다양하게 지원합니다.
2. 브라우저 호환성이 뛰어납니다. IE부터 파이어폭스, 사파리, 엣지, 크롬 모두 안정적으로 호환됩니다.
3. CSS 스타일 속성을 이용하여 highcharts에서 지원하는 요소의 사이즈, 컬러 등의 커스터마이징이 다양하게 가능합니다.

### MUI

https://mui.com/material-ui/all-components/

Bootstrap과 Styled Components를 혼합해둔 성격을 띄며, 리액트 프로젝트에서 사용하기 효율적입니다.<br>
러닝 커브가 낮고 제공하는 컴포넌트 종류가 다양해서 빠르게 UI 개발하기 좋았습니다.<br>

### Redux Toolkit

기존의 Redux의 러닝 커브를 낮춘 전역 상태관리 라이브러리입니다.<br>
'차트' 페이지에서 마켓 리스트의 특정 마켓을 선택하면 해당 마켓의 market(code)이<br>
차트 페이지 나머지 하위 컴포넌트 요소인 마켓 상세 정보, 차트, 실시간 거래 내역, 실시간 오더북 컴포넌트에서 동기화되어야 합니다.<br>
이 방식을 useState를 이용하여 props drilling으로 하위 컴포넌트에 전달하지 않고<br>
상태를 중앙에서 관리함으로써 코드 가독성을 높이고, 불필요한 렌더링을 줄였습니다.<br> <br>

또한, 네비게이션 바에서 검색하는 키워드와 차트에서 마켓 리스트의 키워드를 전역 상태로 관리하여<br>
검색시 바로 차트로 이동할 수 있게 하였습니다.

### Next.js

미스터 크립은 원래 리액트로만 만들어진 프로젝트였습니다.<br>
기존엔 use-upbit-api라는 라이브러리를 사용하여 업비트의 웹소켓 API를 호출하여<br>
실시간 오더북, 실시간 거래내역, 실시간 가격, 캔들 데이터 등을 받아 시각화된 정보로 보여주었습니다.<br>
하지만 서비스 배포 후 CORS 에러가 발생하는 것을 알게 되었고 이를 해결하기 위해서 <br>
use-upbit-api를 사용하는 방식을 포기하고 NextJS의 API 라우트를 사용하여<br>
서버사이드에서 REST API 호출 및 렌더링을 하는 방법으로 CORS 에러를 해결하였습니다.<br>