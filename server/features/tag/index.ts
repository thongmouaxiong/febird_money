import { Router } from "express";
import { Model } from "mongoose";
import { ITag } from "../../cores/interfaces/tag.interface";
import { TagModel } from "./tag.model";
import { ETable } from "../../cores/enums/table.enum";
import { TagController } from "./tag.controller";
import { TagRoute } from "./tag.route";

export class TagFeuture {
  constructor(router: Router) {
    const tagCollection = new TagModel(ETable.tag);
    const tagModel: Model<ITag> = tagCollection.model();
    const tagController = new TagController(tagModel);
    new TagRoute(tagController, router);
  }
}
