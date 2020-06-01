import { IUser } from './user.interface';

export interface ILogin {
    username: string
    password: string
}

export interface ICredentials {
    token: string,
    user: IUser
}