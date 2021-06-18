# 2021-1-OSSP2-ChoMyeon2zo-2  

## 프로젝트명
동국대학교 재학생 대상 거래중심 애플리케이션 '동국 마켓'

## 개발 목표 
> 각 대학별 재학생 및 졸업생을 대상으로 중고 거래 기능을 제공하고, 거래와 더불어 대여시스템, 공동구매 시스템 등의 기능이 추가된 앱 기반 거래 중심 플랫폼을 제작하고자 함.

## 실행 방법 
---
```
$ git clone https://github.com/CSID-DGU/2021-1-OPPS2-ChoMyeon2zo-2.git
$ cd 2021-1-OPPS2-ChoMyeon2zo-2.git/DonggukMarket
$ npm install firebase@7.24.0 @angular/fire@6.0.3 -- save--legacy--peer-deps
```
### 1) browser 실행
```
$ ionic cordova run browser
```
![image](https://user-images.githubusercontent.com/70000248/122543953-456e5680-d067-11eb-9e5e-e9cb58dbcbde.png)
![image](https://user-images.githubusercontent.com/70000248/122543977-4acba100-d067-11eb-872c-693e0ad563b2.png)

 - 실행 결과
 
![image](https://user-images.githubusercontent.com/70000248/122544039-5b7c1700-d067-11eb-8054-23599672581a.png)


### 2) android 실행
```
$ ionic cordova run android
```
![image](https://user-images.githubusercontent.com/70000248/122544170-7e0e3000-d067-11eb-8726-53afe16a7f27.png)

- 실행 결과

![image](https://user-images.githubusercontent.com/70000248/122544212-8cf4e280-d067-11eb-9e6e-5cdd9f73afdd.png)
---
<br>

## 프로젝트 시스템 구성도
---
![image](https://user-images.githubusercontent.com/70000248/122541135-45b92280-d064-11eb-8aa8-f38400b7c9c1.png)
---
<br>

## 주요 기능
--------

### 1. 홈 화면
> 사용자가 앱에 대하여 한눈에 알아볼 수 있고, 최신글 및 각종 알림을 받는 기능을 제공
<img src="./image/KakaoTalk_20210618_191749239.gif"> | <img src="./image/KakaoTalk_20210618_191749395.gif"> | <img src="./image/KakaoTalk_20210618_191749660.gif">

### 2. 채팅
> 사용자가 거래 대상자와 연락할 수 있도록 연결해주는 채팅 기능을 제공

### 3. 로그인 및 회원가입
> 사용자가 중고거래를 할 수 있도록 앱 내에서 계정을 생성하고 로그인을 할 수 있는 기능을 제공

### 4. 판매 및 구매, 대여, 공동구매 게시판
> 사용자가 중고거래 물품을 판매 및 구매 & 대여 & 공동구매를 할 수 있는 기능을 제공

### 5. 마이페이지
> 사용자가 이용한 서비스 내역확인 및 회원 정보에 관한 전체적인 접근 갱신 기능 제공 


## 팀원
---
```
2019112587 김지현 - 사용자간의 거래 채팅방, 팀장 
2017112063 문영석 - 홈 화면 및 검색
2017112141 서혜민 - 로그인 및 회원가입, 학생 인증
2018110511 이윤정 - 마이페이지 및 회원 평가     
2017112086 정희일 - 판매, 대여, 공동구매 게시판
```
---
