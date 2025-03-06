import {
  LoginResponse,
  RefreshTokenResponse,
  UserInfoResponse,
} from "../interfaces/interfaces";

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
    throw new Error(error.message)
  }
};

export const confirmationByTg = async (
  tgCode: string,
  bosId: number
) => {
  try {
    const response = await fetch(`http://10.0.101.36:8066/auth/login?employeeCode=${bosId}&password=${tgCode}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Логування для перевірки значень
    console.log(bosId);
    console.log(tgCode);

    // Отримання статусу відповіді
    const data = await response.json(); // Якщо це JSON, а не просто статус
    console.log(data);

  } catch (error:any) {
    throw new Error(error)
  }
};
export const refreshToken = async (
  refreshToken: string
): Promise<RefreshTokenResponse | null> => {
  // try {
  //   const response = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ refreshToken }),
  //   });

  //   if (!response.ok) {
  //     throw new Error("Failed to refresh token");
  //   }

  //   const data: RefreshTokenResponse = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error("Error refreshing token:", error);
  //   return null;
  // }

  return {
    refreshToken: "dfgdfg",
    accessToken: "sdfsd",
  };
};
