export interface EditProfileUser {
  Title: string;
  Email: string;
  Mobile: string;
  ExternalUser?: string;
  ExternalServer?: string;
}

export interface EditPasswordUser {
  OldPassword : string;
  Password : string
}