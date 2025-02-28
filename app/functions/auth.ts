import {
  LoginResponse,
  RefreshTokenResponse,
  UserInfoResponse,
} from "../interfaces/interfaces";

export const login = async (bosId: number): Promise<LoginResponse> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bosId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Login error: ${response.status} - ${errorText}`);
    }

    const data: LoginResponse = await response.json();

    if (!data.exist) {
      throw new Error("Користувач не знайдений.");
    }

    return { exist: data.exist, bosId };
  } catch (error: any) {
    throw error;
  }
};


export const confirmationByTg = async (
  tgCode: string,
  bosId: number
): Promise<UserInfoResponse | null> => {
  // try{
  //   const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       tgCode: tgCode,
  //       bosId: bosId
  //     }),
  //   });

  //   const data: UserInfoResponse = await response.json()

  //   return{
  //     name: data.name
  //   }
  // } catch(error) {
  //   return null
  // }

  return {
    name: "Vasyl",
    sector: ["food", "nonfood"],
  };
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
