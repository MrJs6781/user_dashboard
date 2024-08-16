export interface RenewData {
  DateTime: string;
  UserTitle: string;
  UserName: string;
  GroupTitle: string;
  LimitOnlineUser: number;
  ExpireType: string;
  ExpirePeriod: string;
  ExpireLength: number;
  RateLimit: string;
  Traffic: string;
  IsTrafficBase: boolean;
  ResetFirstLogin: boolean;
  ResetTime: boolean;
  ResetTraffic: boolean;
  ResetConsume: boolean;
  Description: string;
}

export interface RenewResponse {
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
  Data: RenewData[];
}
