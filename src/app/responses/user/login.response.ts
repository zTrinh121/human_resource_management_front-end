export interface LoginResponse {
  data: 
    {
      token: string;
      role_name: string;
      user_name: string;
    }
  ;
  httpStatus: string;
  message: string;
}
