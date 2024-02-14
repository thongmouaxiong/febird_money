import { Model } from "mongoose";
import { IExpense } from "../../cores/interfaces/expense.interface";
import { Request, Response } from "express";
import { SendResponse } from "../../cores/services/sendResponse.service";
import { EErrorMessage } from "../../cores/enums/errorMessage.enum";
import { EMessage } from "../../cores/enums/message.enum";
import { ServerConstraint } from "../../cores/constraint/serverConstraint";
import { SumMoneyService } from "../../cores/services/sum.service";

export class ExpenseController {
  private expenseModel: Model<IExpense>;

  constructor(expenseModel: Model<IExpense>) {
    this.expenseModel = expenseModel;
  }

  async createExpense(req: Request, res: Response) {
    try {
      const expenseBody: IExpense = req.body as IExpense;
      if (expenseBody.money < 0) {
        return SendResponse.error(res, EErrorMessage.InvalidMoney);
      }
      const expense: IExpense = await this.expenseModel.create(expenseBody);
      SendResponse.create(res, EMessage.CreateSuccess, expense);
    } catch (err) {
      SendResponse.error(res, EErrorMessage.ServerError, err);
    }
  }

  async getExpenseMany(req: Request, res: Response) {
    try {
      const userId: string = res.locals.user?._id;
      let skip: number = parseInt(req.query.skip?.toString());
      let limit: number = parseInt(req.query.limit?.toString());

      skip = skip > 0 ? skip : ServerConstraint.skip; // default of skip = 0
      limit = limit > 0 ? limit : ServerConstraint.limit; // default of limit = 20

      const expenses: IExpense[] = await this.expenseModel
        .find({ isActive: true })
        .populate("tag", "name")
        .skip(skip * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      const sum = await SumMoneyService.sumAll(this.expenseModel, userId);
      SendResponse.success(res, EMessage.GetExpenseManySuccess, {
        totalMoney: sum.totalMoney,
        count: sum.count,
        expenses,
      });
    } catch (err) {
      SendResponse.error(res, EErrorMessage.ServerError, err);
    }
  }

  async getExpenseById(req: Request, res: Response) {
    try {
      const expenseId: string = req.params.expenseId;
      const expense: IExpense = await this.expenseModel.findById(expenseId);
      SendResponse.success(res, EMessage.GetExpenseByIdSuccess, expense);
    } catch (err) {
      SendResponse.error(res, EErrorMessage.ServerError, err);
    }
  }

  async deleteExpense(req: Request, res: Response) {
    try {
      const expenseId: string = req.params.expenseId;
      const expense: IExpense = await this.expenseModel.findByIdAndUpdate(
        expenseId,
        { isActive: false },
        { new: true }
      );
      SendResponse.success(res, EMessage.DeleteExpenseSuccess, expense);
    } catch (err) {
      SendResponse.error(res, EErrorMessage.ServerError, err);
    }
  }
}
