export interface ConsumeData {
  UserConsumeID: number;
  Upload: string;
  Download: string;
  TimeStamp: string;
  RasTitle: string;
  IsActive: boolean;
}

export interface ConsumeApiResponse {
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
  Data: ConsumeData[];
}
