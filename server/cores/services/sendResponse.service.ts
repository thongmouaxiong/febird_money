import { Response } from "express";

export class SendResponse {
  constructor() {}
  public static succes(res: Response, message: string, data: any) {
    res.status(200).json({ succes: true, message, data });
  }
  public static create(res: Response, message: string, data: any) {
    res.status(201).json({ succes: true, message, data });
  }
  public static error(res: Response, message: string, error: any) {
    res.status(404).json({ succes: false, message, error });
  }
}
