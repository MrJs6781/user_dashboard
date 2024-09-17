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
export interface TrafficQuery {
  UserTrafficID?: number;
  FromDate?: string;
  ToDate?: string;
  Query?: string;
  JustActive?: boolean;
  Operand?: string;
  PageNo?: string;
  RowPerPage?: string;
  SortIndex?: number;
  languageID?: string;
}

export interface UserTrafficQuery {
  LanguageID: string;
  UserTrafficID?: string;
  FromDate?: string;
  ToDate?: string;
  JustActive?: boolean;
  Query?: string;
  Operand?: string;
  PageNo?: string;
  RowPerPage?: string;
  SortIndex?: number;
}

export interface UserTrafficAdd {
  ProductID: number;
  Description?: string;
  LanguageID?: number;
}