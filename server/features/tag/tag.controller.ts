import { Model } from "mongoose";
import { ITag } from "../../cores/interfaces/tag.interface";
import { Request, Response } from "express";
import { SendResponse } from "../../cores/services/sendResponse.service";
import { EErrorMessage } from "../../cores/enums/errorMessage.enum";
import { EMessage } from "../../cores/enums/message.enum";
import { ServerConstraint } from "../../cores/constraint/serverConstraint";

export class TagController {
  private tagModel: Model<ITag>;

  constructor(tagModel: Model<ITag>) {
    this.tagModel = tagModel;
  }

  async createTag(req: Request, res: Response) {
    try {
      const tagBody: ITag = req.body as ITag;
      const tag: ITag = await this.tagModel.create(tagBody);
      SendResponse.create(res, EMessage.CreateSuccess, tag);
    } catch (err) {
      SendResponse.error(res, EErrorMessage.ServerError, err);
    }
  }

  async getTagMany(req: Request, res: Response) {
    try {
      // Sent the query parameter "name" when we want to search tags
      const name: string = req.query.name?.toString() ?? ""
      let skip: number = parseInt(req.query.skip?.toString());
      let limit: number = parseInt(req.query.limit?.toString());
      
      skip = skip > 0 ? skip : ServerConstraint.skip; // default of skip = 0
      limit = limit > 0 ? limit : ServerConstraint.limit; // default of limit = 20

      const tags: ITag[] = await this.tagModel
        .find({ name: { $regex: `.*${name}.*`},
          isActive: true })
        .skip(skip * limit)
        .limit(limit)
        .sort({ createdAt: -1 });
      SendResponse.success(res, EMessage.GetTagManySuccess, tags);
    } catch (err) {
      SendResponse.error(res, EErrorMessage.ServerError, err);
    }
  }

  async getTagById(req: Request, res: Response) {
    try {
      const tagId: string = req.params.tagId;
      const tag: ITag = await this.tagModel.findById(tagId);
      SendResponse.success(res, EMessage.GetTagByIdSuccess, tag);
    } catch (err) {
      SendResponse.error(res, EErrorMessage.ServerError, err);
    }
  }

  async deleteTag(req: Request, res: Response) {
    try {
      const tagId: string = req.params.tagId;
      const tag: ITag = await this.tagModel.findByIdAndUpdate(
        tagId,
        { isActive: false },
        { new: true }
      );
      SendResponse.success(res, EMessage.DeleteTagSuccess, tag);
    } catch (err) {
      SendResponse.error(res, EErrorMessage.ServerError, err);
    }
  }
}
