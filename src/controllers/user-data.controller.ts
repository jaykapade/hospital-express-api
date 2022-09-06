import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { PUB_KEY } from "../config/passport";
import { UserCredentials } from "../entity/user-creds";
import { GetUserAuthInfoRequest } from "../interface/get-user-auth";
import { UserDetailsService } from "../services/user-data.service";

export class UserDataController {
  private userDetailsService: UserDetailsService;
  constructor() {
    this.userDetailsService = new UserDetailsService();
  }
  public getUserDetails = async (
    req: GetUserAuthInfoRequest,
    res: Response
  ) => {
    try {
      let data = await this.userDetailsService.getUserDetails(req.user);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  };
  public createUserDetails = async (
    req: GetUserAuthInfoRequest,
    res: Response
  ) => {
    const {
      user: { id },
      body,
    } = req;

    console.log("🚀 ~ body", body);
    console.log("🚀 ~ id", id);

    //! code for jwt verification without passport
    // console.log("req", req.headers["authorization"]);
    // const token = req.headers["authorization"].split(" ")[1];
    // let userId = null;
    // jwt.verify(token, PUB_KEY, (err: any, user: any) => {
    //   if (err) return res.sendStatus(403);
    //   userId = user.sub;
    // });
    let userData: UserCredentials = await UserCredentials.findOneBy({ id });
    console.log("🚀 ~ userData", userData);
    if (!userData)
      res
        .status(404)
        .json({ message: "No User Creds found for adding UserInfo" });
    try {
      let data = await this.userDetailsService.createUserDetails({
        ...body,
        user: userData,
      });
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  };
  public updateUserDetails = async (
    req: GetUserAuthInfoRequest,
    res: Response
  ) => {
    const { user, body } = req;
    try {
      let data = await this.userDetailsService.updateUserDetails(body, user);
      console.log("🚀 ~ body, user", body, user);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  };
  public deleteUserDetails = async (
    req: GetUserAuthInfoRequest,
    res: Response
  ) => {
    const { user } = req;
    try {
      let data = await this.userDetailsService.deleteUserDetails(user);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  };
}
