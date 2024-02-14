import { Router } from "express";
import { TagController } from "./tag.controller";
import { ETagPath } from "../../cores/enums/tagPath.enum";

export class TagRoute {
  constructor(tagController: TagController, router: Router) {
    try {
        router.post(ETagPath.create, tagController.createTag.bind(tagController))
        router.get(ETagPath.getMany, tagController.getTagMany.bind(tagController))
        router.get(ETagPath.getById, tagController.getTagById.bind(tagController))
        router.delete(ETagPath.delete, tagController.deleteTag.bind(tagController))
    } catch (error) {
      console.log("tag route error => ", error);
    }
  }
}
