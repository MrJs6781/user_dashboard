export interface ResponseData {
  Status: number;
  Message: string;
  Title: string;
  Hint: string;
  Name: string;
  Type: string;
  TotalPageCount: number;
  TotalDataCount: number;
  PageNo: number;
  RowPerPage: number;
  Data: UserAccount[];
}

export interface UserAccount {
  UserID: number;
  Title: string;
  UserName: string;
  Password: string;
  Email: string;
  Mobile: string;
  Description: string;
  IsActive: boolean;
  GroupName: string;
  GroupID: number;
  RemainedTraffic: string;
  LimitOnlineUser: number;
  ExpireType: number;
  ExpireTypeDesc: string;
  ExpireLength: number;
  ExpirePeriod: number;
  ExpirePeriodDesc: string;
  CreationTime: string;
  FirstLogin: null;
  ExpirationTime: null;
  Expired: number;
  RateLimit: string;
  OnlineCount: number;
  IsTrafficBase: boolean;
  Owner: string;
  ExternalUser: string;
  ExternalServer: number;
  RemainedTime: string;
  WalletRemained: string;
  LimitLoginDevices: number;
}

export interface DataItem {
  TimeStamp: string;
  Download: string;
  Upload: string;
  Consume: string;
}
