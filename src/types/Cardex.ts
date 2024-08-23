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

export interface CardexUser {
  Typ: string;
  UserName: string;
}

export interface CardexFinancial {
  TransactionID: number;
  TimeStamp: string;
  ProductTitle: string | null;
  SellCount: number | null;
  Fi: string | null;
  Price: string;
  Type: string;
  IsActive: boolean;
  BuySellParty: string | null;
  Users: CardexUser[] | null;
  Description: string;
}

export interface CardexFinancialResponse {
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
  Data: CardexFinancial[];
}

export interface TrafficCardexFetchData {
  FromDate?: string;
  ToDate?: string;
  JustActive?: boolean;
  Query?: string;
  Operand?: string;
  PageNo?: number;
  RowPerPage?: number;
  SortIndex?: number;
}

export interface TrafficFinancialCardexFetchData {
  Type?: string;
  // FromDate?: string;
  // ToDate?: string;
  Query?: string;
  Operand?: string;
  PageNo?: number;
  RowPerPage?: number;
  SortIndex?: number;
}