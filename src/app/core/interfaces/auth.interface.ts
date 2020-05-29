export interface ILogin {
    username: string
    password: string
}

export interface ICredentials {
    token: string,
    user: {
        firstname: string,
        lastname: string
    }
}