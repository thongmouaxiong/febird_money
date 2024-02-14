import mongoose, { Model, Schema } from "mongoose";
import { v4 as uuidV4 } from "uuid";
import { ITag } from "../../cores/interfaces/tag.interface";

const tagSchema = new Schema<ITag, Model<ITag>>(
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
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

tagSchema.pre('save', function(next){
    // the uuid remember last generate so we want to generate new one
    this.uuid = uuidV4()
    next()
})

export class TagModel {
  private tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  public model(): Model<ITag> {
    return mongoose.model(this.tableName, tagSchema);
  }
}
