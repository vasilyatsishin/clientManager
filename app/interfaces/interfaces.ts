
export interface IContext {
  user: UserInfoResponse | null;
  isLoading: boolean;
  setUser: (user: UserInfoResponse) => void;
  initializeApp: () => void
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export interface LoginResponse {
  exist: boolean;
  bosId: number;
}

export interface UserInfoResponse {
  userId: number;
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
  accessToken: string;
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

