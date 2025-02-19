export interface UserInterface {
  name: string,
  sector: string[]
}

export interface IContext {
  user: UserInterface | null;
  isLoading: boolean;
  login: (bosId: number) => object;
  logout: () => object;
  setUser: (user:UserInfoResponse) => void;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  exist: boolean;
  bosId: number;
}

export interface UserInfoResponse {
  name: string;
  sector: string[]
}
