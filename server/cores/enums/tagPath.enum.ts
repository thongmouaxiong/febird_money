import { EApi } from "./api.enum";

export enum ETagPath {
  create = `${EApi.tag}/create`,
  delete = `${EApi.tag}/delete/:tagId`,
  getMany = `${EApi.tag}/getMany`,
  getById = `${EApi.tag}/getById/:tagId`,
  search = `${EApi.tag}/search`,
}
