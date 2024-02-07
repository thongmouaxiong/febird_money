import { EApi } from "./api.enum";

export enum EUserPath {
    register = `${EApi.user}/register`,
    login = `${EApi.user}/login`,
    getUserInfo = `${EApi.user}/getUserInfo`,
    getUserOne = `${EApi.user}/getUserOne/:userId`,
    getUserMany = `${EApi.user}/getUserMany`,
}