export interface ErrorReports {
  LogID: number;
  UserName: string;
  RasTitle: string;
  NasIP: string;
  NasPort: string;
  NasPortType: string;
  NASIdentifier: string;
  CallingStationId: string;
  AcctInputOctets: string;
  AcctOutputOctets: string;
  AcctSessionID: string;
  FramedIPAddress: string;
  DateTime: string;
  Request: string;
  Response: string;
  PacketMethod: string;
}

export interface ErrorReportsApiResponse {
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
  Data: ErrorReports[];
}

export interface ErrorReportsWithQuery {
  Query?: string;
  Operand?: string;
  PageNo?: number;
  RowPerPage?: number;
  SortIndex?: number;
  languageID?: string;
}
