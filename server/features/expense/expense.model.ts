import mongoose, { Model, Schema, Types } from "mongoose";
import { v4 as uuidV4 } from "uuid";
import { IExpense } from "../../cores/interfaces/expense.interface";
import { ETable } from "../../cores/enums/table.enum";

const expenseSchema = new Schema<IExpense, Model<IExpense>>(
  {
    uuid: {
      type: String,
      unique: true,
      default: uuidV4(),
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    user: {
      type: Types.ObjectId,
      ref: ETable.user,
      required: true
    },
    tag: {
      type: Types.ObjectId,
      ref: ETable.tag,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    money: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

expenseSchema.pre('save', function(next){
    this.uuid = uuidV4()
    next()
})

export class ExpenseModel {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  public model(): Model<IExpense> {
    return mongoose.model(this.tableName, expenseSchema);
  }
}
