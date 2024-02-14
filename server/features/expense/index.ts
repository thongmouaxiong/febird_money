import { Router } from "express";
import { Model } from "mongoose";
import { IExpense } from "../../cores/interfaces/expense.interface";
import { ExpenseModel } from "./expense.model";
import { ETable } from "../../cores/enums/table.enum";
import { ExpenseController } from "./expense.controller";
import { ExpenseRoute } from "./expense.route";

export class ExpenseFeuture {
  constructor(router: Router) {
    const expenseCollection = new ExpenseModel(ETable.expense);
    const expenseModel: Model<IExpense> = expenseCollection.model();
    const expenseController = new ExpenseController(expenseModel);
    new ExpenseRoute(expenseController, router);
  }
}
