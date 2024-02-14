import { EApi } from "./api.enum";

export enum EExpensePath {
  create = `${EApi.expense}/create`,
  delete = `${EApi.expense}/delete/:expenseId`,
  getMany = `${EApi.expense}/getMany`,
  getById = `${EApi.expense}/getById/:expenseId`,
}
