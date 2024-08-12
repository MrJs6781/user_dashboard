export interface LoginResponse {
  token: string;
  Status: string;
  Message: string;
  Title: string;
  Hint: string;
  Name: string;
  Type: string;
  TotalPageCount: string;
  TotalDataCount: string;
  PageNo: string;
  RowPerPage: string;
  Data: [] | loginResponseData[];
}

export interface LoginData {
  UserName: string;
  Password: string;
  DeviceID?: string;
  Info?: string;
}

export interface loginResponseData {
  LanguageID: number;
  Token: string;
  UserID: number;
}