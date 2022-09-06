import { Request, Response } from "express";
import { UserFamilyDataService } from "../services/user-family-data.service";
import * as jwt from "jsonwebtoken";
import { PUB_KEY } from "../config/passport";
import { UserCredentials } from "../entity/user-creds";
import { GetUserAuthInfoRequest } from "../interface/get-user-auth";

export class UserFamilyDataController {
  private userFamilyDataService: UserFamilyDataService;
  constructor() {
    this.userFamilyDataService = new UserFamilyDataService();
  }
  public getFamilyData = async (req: GetUserAuthInfoRequest, res: Response) => {
    const { user } = req;
    let data = await this.userFamilyDataService.getFamilyData(user);
    res.send(data);
  };
  public createFamilyData = async (
    req: GetUserAuthInfoRequest,
    res: Response
  ) => {
    const {
      body,
      user: { id },
    } = req;
    //! JWT verification
    // const token = req.headers["authorization"].split(" ")[1];
    // let userId = null;
    // jwt.verify(token, PUB_KEY, (err: any, user: any) => {
    //   if (err) return res.sendStatus(403);
    //   userId = user.sub;
    // });
    let userData: UserCredentials = await UserCredentials.findOneBy({ id });
    if (!userData)
      res
        .status(404)
        .json({ message: "No User Creds found for adding UserInfo" });
    try {
      let data = await this.userFamilyDataService.createFamilyData({
        ...body,
        user: userData,
      });
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  };
  public updateFamilyData = async (
    req: GetUserAuthInfoRequest,
    res: Response
  ) => {
    const { body, user } = req;
    let data = await this.userFamilyDataService.updateFamilyData(body, user);
    res.send(data);
  };
  public deleteFamilyData = async (
    req: GetUserAuthInfoRequest,
    res: Response
  ) => {
    const { user } = req;
    let data = await this.userFamilyDataService.deleteFamilyData(user);
    res.send(data);
  };
}
