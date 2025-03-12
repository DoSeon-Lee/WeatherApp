import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Location from "expo-location";

// components
import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import ErrorDisplay from "./components/ErrorDisplay";

// constants
import { WEATHER_API } from "./constants/api";
import { THEME } from "./constants/theme";

// 반응형 device 너비
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  // 날씨 정보 가져오기
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync(); // 전면 권한 요청

        // 위치 권한 확인 (Location.PermissionStatus)
        if (status !== "granted") {
          setErrorMsg("Location permission denied");
          return;
        }

        // 현재 위치 가져오기
        const {
          coords: { latitude, longitude }, // 위도, 경도
        } = await Location.getCurrentPositionAsync({ accuracy: 5 });

        // 위치 역 geocode
        const location = await Location.reverseGeocodeAsync(
          { latitude, longitude },
          { useGoogleMaps: false }
        );

        // 영어로 도시 이름 설정
        if (location[0].city) {
          setCity(location[0].city);
        } else if (location[0].region) {
          setCity(location[0].region);
        } else if (location[0].district) {
          setCity(location[0].district);
        } else if (location[0].subregion) {
          setCity(location[0].subregion);
        } else {
          setCity("Unknown Location");
        }

        // 현재 날씨 가져오기
        const currentResponse = await fetch(
          WEATHER_API.CURRENT(latitude, longitude)
        );
        const currentData = await currentResponse.json();

        // 5일 예보 가져오기
        const forecastResponse = await fetch(
          WEATHER_API.FORECAST(latitude, longitude)
        );
        const forecastData = await forecastResponse.json();

        // 현재 날씨 정보 저장
        if (
          currentData &&
          currentData.main &&
          currentData.weather &&
          currentData.weather.length > 0
        ) {
          setCurrentWeather({
            temp: currentData.main.temp,
            feels_like: currentData.main.feels_like,
            humidity: currentData.main.humidity,
            wind_speed: currentData.wind?.speed || 0,
            weather: currentData.weather[0].main,
            description: currentData.weather[0].description,
          });
        }

        // 일별 데이터 정리 (3시간 간격 데이터를 일별로 그룹화)
        const dailyData = [];
        const today = new Date().getDate();

        // 다음 5일 예보 추가
        let currentDay = today;
        let dayData = null;

        // forecastData가 유효한지 확인
        if (
          forecastData &&
          forecastData.list &&
          Array.isArray(forecastData.list) // forecastData.list가 배열인지 확인
        ) {
          forecastData.list.forEach((forecast) => {
            // forecast 객체가 유효한지 확인
            if (
              !forecast ||
              !forecast.dt ||
              !forecast.main ||
              !forecast.main.temp ||
              !forecast.weather ||
              !forecast.weather[0]
            ) {
              return; // 유효하지 않은 데이터는 건너뜀
            }

            const forecastDate = new Date(forecast.dt * 1000);
            const forecastDay = forecastDate.getDate();

            if (forecastDay === today) {
              return; // 오늘 데이터는 현재 날씨로 표시하므로 스킵
            }

            // 5일차의 예보 data 추가
            if (forecastDay !== currentDay) {
              if (dayData) {
                dailyData.push(dayData);
                dayData = null;
              }

              if (dailyData.length >= 5) return; // 5일치만 표시

              currentDay = forecastDay; //

              dayData = {
                date: forecastDate,
                temp: forecast.main.temp,
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                weather: forecast.weather[0].main,
                description: forecast.weather[0].description,
              };
            } else if (dayData) {
              // 최저/최고 기온 업데이트
              if (forecast.main.temp_min < dayData.temp_min) {
                dayData.temp_min = forecast.main.temp_min;
              }
              if (forecast.main.temp_max > dayData.temp_max) {
                dayData.temp_max = forecast.main.temp_max;
              }
            }

            // 정오에 가까운 데이터를 해당 날의 대표 날씨로 선택
            if (dayData && forecastDate.getHours() === 12) {
              dayData.temp = forecast.main.temp;
              dayData.weather = forecast.weather[0].main;
              dayData.description = forecast.weather[0].description;
              dayData.humidity = forecast.main.humidity;
            }
          });
        }

        // 마지막 날 추가
        if (dayData && dailyData.length < 5) {
          dailyData.push(dayData);
        }

        setDays(dailyData);
        setIsLoading(false);
      } catch (error) {
        console.error("Weather info fetching error:", error);
        setErrorMsg("Failed to fetch weather info");
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.content}>
        {isLoading ? (
          <Loading />
        ) : errorMsg ? (
          <ErrorDisplay message={errorMsg} />
        ) : (
          <>
            <Header city={city} />
            {currentWeather && <CurrentWeather weatherData={currentWeather} />}
            <Forecast days={days} />
            <Footer />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
});
