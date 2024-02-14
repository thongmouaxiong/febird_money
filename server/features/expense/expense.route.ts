import { Router } from "express";
import { ExpenseController } from "./expense.controller";
import { EExpensePath } from "../../cores/enums/expensePath.enum";
import { Middleware } from "../../cores/middleware/middleware";

export class ExpenseRoute {
  private middleware: Middleware = new Middleware()
  constructor(expenseController: ExpenseController, router: Router) {
    try {
        router.post(EExpensePath.create, this.middleware.auth, expenseController.createExpense.bind(expenseController))
        router.get(EExpensePath.getMany, this.middleware.auth, expenseController.getExpenseMany.bind(expenseController))
        router.get(EExpensePath.getById, this.middleware.auth, expenseController.getExpenseById.bind(expenseController))
        router.delete(EExpensePath.delete, this.middleware.auth, expenseController.deleteExpense.bind(expenseController))
    } catch (error) {
      console.log("expense route error => ", error);
    }
  }
}
