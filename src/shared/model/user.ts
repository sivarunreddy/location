import {UserType} from "./user-type";

export interface IUser {
    userType: UserType;
    accessToken?: string;
    name?: string;
    profileImage?: string;
}