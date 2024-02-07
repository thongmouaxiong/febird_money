import { Response } from "express";

export class SendResponse {
  constructor() {}
  public static success(res: Response, message: string, data: any) {
    res.status(200).json({ success: true, message, data });
  }
  public static create(res: Response, message: string, data: any) {
    res.status(201).json({ success: true, message, data });
  }
  public static error(res: Response, message: string, error?: any) {
    res.status(404).json({ success: false, message, error });
  }
}
