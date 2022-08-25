import { Request } from "express";
import { UserCredentials } from "../entity/user-creds";

export interface GetUserAuthInfoRequest extends Request {
  user: UserCredentials;
}
