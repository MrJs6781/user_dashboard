export interface EditProfileUser {
  Title: string;
  Email: string;
  Mobile: string;
  ExternalUser?: string;
  ExternalServer?: string;
  languageID?: number;
}

export interface EditPasswordUser {
  OldPassword : string;
  Password : string
  languageID?: number;
}