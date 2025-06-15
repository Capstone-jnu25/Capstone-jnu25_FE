// src/api/axiosInstance.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native';

// 네비게이션 참조 만들기
export let navigationRef: any = null;
export const setNavigationRef = (ref: any) => {
  navigationRef = ref;
};

const axiosInstance = axios.create({
  baseURL: 'http://13.124.71.212:8080',
});

axiosInstance.interceptors.response.use(
  res => res,
  async error => {
    if (error.response?.status === 401) {
      await AsyncStorage.multiRemove(['token', 'userId']);
      Alert.alert("세션 만료", "로그인이 만료되었습니다. 다시 로그인해주세요.");
      if (navigationRef) {
        navigationRef.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'LoginPage' }],
          })
        );
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
