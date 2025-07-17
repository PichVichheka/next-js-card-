<<<<<<< HEAD
import { IUser } from "./user-typ";

=======
import { CardItem, IUser } from "./user-type";

export interface ICardResponse {
  message: string;
  card: {
    web_site: string | undefined;
    id: string;
    gender: GenderType;
    dob: string;
    address: string;
    phone: string;
    nationality: string;
    qr_url?: string;
    qr_code?: string;
    card_type?: CardType;
    is_active: boolean;
    is_deleted: boolean;
    theme_color?: string;
    updated_at: string;
    created_at: string;
    socialLinks: SocialLink[];
    job: string;
    bio: string;
    company: string;
  };
}
>>>>>>> 54b3c35ea7ec343f55537aa3314d37906a0a1e2d
export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  is_deleted: boolean;
  updated_at: string;
  created_at: string;
}
<<<<<<< HEAD

export type CardType = "Minimal" | "Modern" | "Corporate";
export type GenderType = "male" | "female";
export interface CardItem {
  user: IUser;
=======
export type CardType = "Minimal" | "Modern" | "Corporate";
export type GenderType = "male" | "female";

export interface CreateCardType {
  gender: string;
  nationality: string;
  dob: string;
  address: string;
  phone: string;
  card_type: string;
  social: Social[];
  web_site: string;
  job: string;
  bio: string;
}
interface Social {
  platform: string;
  icon: string;
  url: string;
}
export interface ICardServerSide {
  web_site: string | undefined;
>>>>>>> 54b3c35ea7ec343f55537aa3314d37906a0a1e2d
  id: string;
  gender: GenderType;
  dob: string;
  address: string;
  phone: string;
  nationality: string;
  qr_url?: string;
  qr_code?: string;
  card_type?: CardType;
  is_active: boolean;
  is_deleted: boolean;
  theme_color?: string;
  updated_at: string;
  created_at: string;
  socialLinks: SocialLink[];
  job: string;
  bio: string;
<<<<<<< HEAD
  web_site: string;
  company: string;
}
=======
  company: string;
  user: IUser;
  card: CardItem;
}

export type User = {
  id: string;
  full_name: string;
  user_name: string;
  email: string;
  password: string;
  avatar: string;
  is_deleted: boolean;
  is_active: boolean;
  roles: string[];
  created_at: string;
  updated_at: string;
};

export type ICard = {
  id: string;
  gender: string;
  dob: string;
  address: string;
  phone: string;
  job: string;
  bio: string;
  web_site: string;
  company: string;
  nationality: string;
  qr_url: string | null;
  qr_code: string | null;
  card_type: string;
  is_active: boolean;
  is_deleted: boolean;
  theme_color: string | null;
  updated_at: string;
  created_at: string;
  user: User;
  socialLinks: ISocialLink[];
};

export type CardResponse = {
  message: string;
  card: ICard[];
};
export interface ISocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  is_deleted: boolean;
  updated_at: string;
  created_at: string;
}

export type { CardItem };
>>>>>>> 54b3c35ea7ec343f55537aa3314d37906a0a1e2d
