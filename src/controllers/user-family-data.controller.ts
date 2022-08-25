import { Request, Response } from "express";
import { UserFamilyDataService } from "../services/user-family-data.service";
import * as jwt from "jsonwebtoken";
import { PUB_KEY } from "../config/passport";
import { UserCredentials } from "../entity/user-creds";

export class UserFamilyDataController {
  private userFamilyDataService: UserFamilyDataService;
  constructor() {
    this.userFamilyDataService = new UserFamilyDataService();
  }
  public getFamilyData = async (req: Request, res: Response) => {
    let data = await this.userFamilyDataService.getFamilyData();
    res.send(data);
  };
  public createFamilyData = async (req: Request, res: Response) => {
    const token = req.headers["authorization"].split(" ")[1];
    let userId = null;
    jwt.verify(token, PUB_KEY, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      userId = user.sub;
    });
    let user: UserCredentials = await UserCredentials.findOneBy({ id: userId });
    let data = await this.userFamilyDataService.createFamilyData({
      ...req.body,
      user,
    });
    res.send(data);
  };
  public updateFamilyData = async (req: Request, res: Response) => {
    const { id } = req.params;
    let data = await this.userFamilyDataService.updateFamilyData(req.body, id);
    res.send(data);
  };
  public deleteFamilyData = async (req: Request, res: Response) => {
    const { id } = req.params;
    let data = await this.userFamilyDataService.deleteFamilyData(id);
    res.send(data);
  };
}
