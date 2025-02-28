export interface UserInterface {
  name: string;
  sector: string[];
}

export interface IContext {
  user: UserInterface | null;
  isLoading: boolean;
  logout: () => object;
  setUser: (user: UserInfoResponse) => void;
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
  sector: string[];
}

export interface generalState {
  theme: string;
  safeViewColor: string;
  sectors: string[];
  activePage: string;
}

export interface authState {
  exist: boolean;
  bosId: number;
  user: UserInfoResponse;
}

export interface documentsState {
  typeOfShownDocuments: string;
}

export interface DocumentsState {
  [business: string]: {
    sended?: any[];
    notSended?: any[];
  };
}

