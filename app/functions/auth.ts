import { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  LoginResponse,
  RefreshTokenResponse,
  UserInfoResponse,
} from "../interfaces/interfaces";
import * as SecureStore from "expo-secure-store";

export const login = async (bosId: number): Promise<LoginResponse> => {
  try {
    const response = await fetch(
      `http://10.0.101.36:8066/auth/request-otp?employeeCode=${bosId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 400) {
      throw new Error("Користувача не знайдено");
    }

    return { exist: true, bosId };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const confirmationByTg = async (
  tgCode: string,
  bosId: number
): Promise<UserInfoResponse> => {
  try {
    const response = await fetch(
      `http://10.0.101.36:8066/auth/login?employeeCode=${bosId}&password=${tgCode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if(response.status == 400) {
      throw new Error("Неправильний код")
    } 

    const data = await response.json();
    await AsyncStorage.setItem("accessToken", data.access);
    await SecureStore.setItemAsync("refreshToken", data.refresh);
    
    const parsedToken = parseJwt(data.access);

    return {
      sector: JSON.parse(parsedToken.roles),
      userId: JSON.parse(parsedToken.userId),
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const parseJwt = (token: string) => {
  try {
    const base64Url = token.split(".")[1]; // Витягуємо payload
    
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Невірний формат JWT:", error);
    return null;
  }
};

export const isTokenExpired = (token: string) => {
  const decoded = parseJwt(token);
  
  if (!decoded || !decoded.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime + 5 * 60;
};

export const refresh = async (accessToken: string) : Promise<RefreshTokenResponse | null> => {
  try {
    const expiredToken = isTokenExpired(accessToken);

    if (!expiredToken) {
      return {
        accessToken: accessToken
      };
    }
    const refreshToken = await SecureStore.getItemAsync("refreshToken")

    const response = await fetch("http://10.0.101.36:8066/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if(response.status == 401) {
      await AsyncStorage.clear()
      await SecureStore.deleteItemAsync("refreshToken")
      throw 401
    }
    
    const data = await response.json();

    await AsyncStorage.setItem("accessToken", data.access)
    
    return {
      accessToken: data.access,
    };
  } catch (error:any) {
    console.log(error);
    
    throw new Error(error)
  }
};
