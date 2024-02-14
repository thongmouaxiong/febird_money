import { Model, Types } from "mongoose";
import { ISumMoney } from "../interfaces/sumMoney.interface";
import { IExpense } from "../interfaces/expense.interface";

export class SumMoneyService {
  public static instance: SumMoneyService;
  private constructor() {}
  // making singleton, define one time and access every where
  public static getInstance(): SumMoneyService {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
  
  static sumAll(model: Model<IExpense> , userId?: string): Promise<ISumMoney | null> {    
    return new Promise<ISumMoney | null>(async (resolve, rejects) => {
      try {
        const sum = await model
          .aggregate()
          .match({
            user: new Types.ObjectId(userId),
            isActive: true
          })
          .group({
            _id: "$user",
            totalMoney: {
              $sum: "$money",
            },
            count: {
              $sum: 1,
            },
          });
        resolve(sum[0] as ISumMoney ?? null);
      } catch (error) {
        resolve(null);
      }
    });
  }

  static sumByDate(model: Model<IExpense>, userId: string, startDate: Date, endDate: Date): Promise<ISumMoney | null> {    
    return new Promise<ISumMoney | null>(async (resolve, rejects) => {
      try {
        const sum = await model
          .aggregate()
          .match({
            user: new Types.ObjectId(userId),
            isActive: true,
            createdAt: {
              $gte: startDate,
              $lte: endDate
            }
          })
          .group({
            _id: "$user",
            totalMoney: {
              $sum: "$money",
            },
            count: {
              $sum: 1,
            },
          });
        resolve(sum[0] as ISumMoney ?? null);
      } catch (error) {
        resolve(null);
      }
    });
  }
}
