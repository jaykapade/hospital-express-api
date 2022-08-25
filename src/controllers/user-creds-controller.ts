import { Request, Response } from "express";
import { GetUserAuthInfoRequest } from "../interface/get-user-auth";
import { UserCredentialsService } from "../services/user-creds-service";

export class UserCredentialsController {
  private userCredentialsService: UserCredentialsService;

  constructor() {
    this.userCredentialsService = new UserCredentialsService();
  }

  public updateUserCreds = async (
    req: GetUserAuthInfoRequest,
    res: Response
  ) => {
    const {
      user: { id },
      body,
    } = req;

    try {
      let data = await this.userCredentialsService.updateUserCreds(body, id);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  };
  public registerUser = async (req: Request, res: Response) => {
    let { email, password } = req.body;
    try {
      let data = await this.userCredentialsService.registerUser(
        email,
        password
      );
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  };
  public loginUser = async (req: Request, res: Response) => {
    let { email, password } = req.body;
    try {
      let data = await this.userCredentialsService.loginUser(email, password);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  };
  public deleteUser = async (req: GetUserAuthInfoRequest, res: Response) => {
    let {
      user: { id },
    } = req;
    try {
      let data = await this.userCredentialsService.deleteUser(id);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  };
}
