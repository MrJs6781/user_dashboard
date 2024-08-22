export interface HistoryData {
  HistoryID: number;
  SessionID: string;
  StartTime: string;
  Duration: string;
  StopTime: string;
  RasTitle: string;
  NasIP: string;
  NasPort: number;
  NasID: string;
  CallingStationID: string;
  FramedIPAddress: string;
  CurrentUpload: string;
  CurrentDownload: string;
  TrafficRemained: string;
  LastUpdate: string;
  LastAction: string;
}

export interface HistoryApiResponse {
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
  Data: HistoryData[];
}

export interface ConnectionHistoryWithQuery {
  Query?: string;
  Operand?: string;
  PageNo?: number;
  RowPerPage?: number;
  SortIndex?: number;
}
