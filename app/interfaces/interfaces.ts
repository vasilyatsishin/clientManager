
export interface IContext {
  user: UserInfoResponse | null;
  isLoading: boolean;
  setUser: (user: UserInfoResponse) => void;
  initializeApp: () => void,
  setIsLoading: (isLoading: boolean) => void;
  isInitializing: boolean
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
  isMainLayoutShown: boolean
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

interface address {

}

export interface clientState {
  identifyCode: number;
  nameSurname: string;
  phone: string;
  typeOfPerson: number;
  clientAddress: address;
  comment: string;
}
