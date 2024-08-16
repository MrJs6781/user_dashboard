export interface TrafficData {
  UserTrafficID: number;
  Traffic: string;
  TimeStamp: string;
  Description: string;
  IsActive: boolean;
}

export interface TrafficResponse {
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
  Data: TrafficData[];
}
