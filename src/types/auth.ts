export interface LoginResponse {
  status: number;
  message: string;
  data: {
    id: number;
    userId: string;
    userNm: string;
    accessToken: string;
    refreshToken: string;
  };
}

export interface SignupRequest {
  userId: string;
  userNm: string;
  password: string;
  termsAgreeYn: string;
  eventAgreeYn: string;
}

export interface SignupResponse {
  status: number;
  message: string;
  data?: any;
}
