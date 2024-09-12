export interface EditProfileUser {
  Title: string;
  Email: string;
  Mobile: string;
  ExternalUser?: string;
  ExternalServer?: string;
  languageID?: string;
}

export interface EditPasswordUser {
  OldPassword : string;
  Password : string
  languageID? : string
}