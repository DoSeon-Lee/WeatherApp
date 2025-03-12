# Weather App - React Native

## 프로젝트 개요

이 프로젝트는 React Native를 사용하여 개발된 날씨 앱입니다. 사용자의 현재 위치를 기반으로 현재 날씨와 5일 예보를 제공합니다. OpenWeatherMap API를 활용하여 날씨 데이터를 가져오고, 사용자 친화적인 인터페이스로 정보를 표시합니다.

## 주요 기능

- **현재 위치 기반 날씨 정보**: 사용자의 현재 위치를 자동으로 감지하여 해당 지역의 날씨 정보를 표시합니다.
- **현재 날씨 표시**: 현재 온도, 날씨 상태, 체감 온도, 습도, 풍속 등의 정보를 제공합니다.
- **5일 예보**: 앞으로 5일간의 날씨 예보를 일별로 표시합니다.
- **애니메이션 로딩 화면**: 데이터를 가져오는 동안 애니메이션이 적용된 로딩 화면을 표시합니다.
- **직관적인 UI**: 날씨 상태에 따른 아이콘과 깔끔한 레이아웃으로 정보를 쉽게 확인할 수 있습니다.

## 기술 스택

- **React Native**: 크로스 플랫폼 모바일 앱 개발 프레임워크
- **Expo**: React Native 개발 환경 및 도구
- **OpenWeatherMap API**: 날씨 데이터 제공
- **Expo Location**: 위치 정보 접근 및 처리
- **React Native Animated**: 애니메이션 구현
- **React Hooks**: 상태 관리 및 라이프사이클 처리

## 프로젝트 구조

```
weather/
├── components/
│   ├── CurrentWeather.js  # 현재 날씨 컴포넌트
│   ├── ErrorDisplay.js    # 오류 표시 컴포넌트
│   ├── Footer.js          # 푸터 컴포넌트
│   ├── Forecast.js        # 5일 예보 컴포넌트
│   ├── Header.js          # 헤더 컴포넌트
│   └── Loading.js         # 로딩 화면 컴포넌트
├── constants/
│   ├── api.js             # API 관련 상수
│   └── theme.js           # 테마 및 스타일 상수
├── utils/
│   └── weatherIcons.js    # 날씨 아이콘 유틸리티
└── App.js                 # 메인 앱 컴포넌트
```

## 설치 및 실행 방법

1. 필요한 패키지 설치:

   ```bash
   npm install
   ```

2. 앱 실행:

   ```bash
   npm start
   ```

3. Expo Go 앱을 사용하여 QR 코드 스캔 또는 시뮬레이터에서 실행

## 주요 컴포넌트 설명

### App.js

- 앱의 메인 컴포넌트로, 상태 관리 및 데이터 흐름을 담당합니다.
- 위치 정보를 가져오고 OpenWeatherMap API를 호출하여 날씨 데이터를 가져옵니다.
- 가져온 데이터를 처리하여 현재 날씨와 5일 예보 정보를 구성합니다.

### CurrentWeather.js

- 현재 날씨 정보를 표시하는 컴포넌트입니다.
- 온도, 날씨 상태, 체감 온도, 습도, 풍속 등의 정보를 시각적으로 표현합니다.

### Forecast.js

- 5일 예보를 표시하는 컴포넌트입니다.
- 각 날짜별 예상 온도, 날씨 상태, 최저/최고 온도를 보여줍니다.

### Loading.js

- 데이터를 가져오는 동안 표시되는 로딩 화면입니다.
- 애니메이션이 적용된 날씨 아이콘(태양, 구름)을 포함합니다.

### weatherIcons.js

- 다양한 날씨 상태에 맞는 아이콘을 제공하는 유틸리티입니다.
- FontAwesome5와 MaterialCommunityIcons를 사용하여 날씨 아이콘을 구현합니다.

## 발생했던 오류와 해결 방법

### 1. 순환 참조(Require Cycle) 오류

**문제 상황**:

```
(NOBRIDGE) WARN  Require cycle: App.js -> components/Header.js -> App.js
Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.
```

**원인**:

- App.js에서 THEME 객체를 정의하고 export했습니다.
- 각 컴포넌트(Header.js, CurrentWeather.js 등)에서 App.js에서 THEME을 임포트했습니다.
- 동시에 App.js에서는 이러한 컴포넌트들을 임포트했습니다.
- 이로 인해 `App.js -> Header.js -> App.js`와 같은 순환 참조가 발생했습니다.

**해결 방법**:

- THEME 객체를 별도의 파일(constants/theme.js)로 분리했습니다.
- 모든 컴포넌트와 App.js에서 이 파일에서 THEME을 임포트하도록 변경했습니다.
- 이렇게 하면 순환 참조가 제거되고 앱이 정상적으로 작동합니다.

### 2. 날씨 데이터 처리 오류

**문제 상황**:

```
Weather info Retching Error: [TypeError: Cannot read property 'temp' of undefined]
```

**원인**:

- API에서 반환된 데이터의 구조가 예상과 다르거나 일부 데이터가 누락된 경우 발생했습니다.
- 특히 `temp` 속성을 읽으려고 하는데 해당 객체가 undefined인 상황이었습니다.

**해결 방법**:

- 데이터 처리 과정에서 유효성 검사를 추가했습니다.
- 객체와 속성이 존재하는지 확인하는 조건문을 추가했습니다.
- 예를 들어:
  ```javascript
  if (
    currentData &&
    currentData.main &&
    currentData.weather &&
    currentData.weather.length > 0
  ) {
    // 데이터 처리
  }
  ```

## 개선 사항 및 추가 기능

1. **로딩 화면 개선**: 애니메이션이 적용된 날씨 아이콘을 추가하여 사용자 경험을 향상시켰습니다.
2. **컴포넌트 구조화**: 코드를 여러 컴포넌트로 분리하여 유지보수성과 가독성을 높였습니다.
3. **오류 처리 강화**: 데이터 처리 과정에서 발생할 수 있는 오류를 처리하는 로직을 추가했습니다.
4. **UI 개선**: 날씨 정보를 직관적으로 표시하는 레이아웃과 스타일을 적용했습니다.

## 향후 개발 계획

1. **위치 검색 기능**: 사용자가 특정 도시나 지역의 날씨를 검색할 수 있는 기능 추가
2. **날씨 알림**: 특정 날씨 조건(비, 눈 등)에 대한 알림 기능 구현
3. **상세 날씨 정보**: 기압, 가시거리, 일출/일몰 시간 등 더 많은 날씨 정보 제공
4. **테마 설정**: 사용자가 앱의 테마를 변경할 수 있는 기능 추가
5. **오프라인 지원**: 최근 날씨 데이터를 저장하여 오프라인에서도 볼 수 있는 기능 구현

## 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다.

## 감사의 말

- OpenWeatherMap API를 제공해 주셔서 감사합니다.
- React Native와 Expo 커뮤니티에 감사드립니다.

---

© 2023 Weather App. All Rights Reserved.
