import { IUser } from './user.interface';

export interface ICredentials {
    token: string,
    user: IUser
}