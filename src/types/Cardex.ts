export interface CardexTraffic {
  Traffic: string;
  Upload: string;
  Download: string;
  Consume: string;
  Date: string;
  Description: string;
  IsActive: boolean;
}

export interface CardexTrafficApiResponse {
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
  Data: CardexTraffic[];
}
