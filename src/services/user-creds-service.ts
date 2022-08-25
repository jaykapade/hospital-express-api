import { AppDataSource } from "../config/data-source";
import { UserCredentials } from "../entity/user-creds";
const { genPassword, validatePassword, createJWT } = require("../../lib/utils");
export class UserCredentialsService {
  public updateUserCreds = async (userData, id) => {
    try {
      const { email, password } = userData;
      const { salt, hash: hashPwd } = genPassword(password);
      let userObj = { email, hashPwd, salt };
      let data = await AppDataSource.createQueryBuilder()
        .update(UserCredentials)
        .set(userObj)
        .where("id = :id", { id })
        .execute();
      return data;
    } catch (error) {
      return { error, message: error.message };
    }
  };
  public registerUser = async (email, password) => {
    try {
      let { salt, hash: hashPwd } = genPassword(password);
      const userObj = { email, hashPwd, salt };
      let data = await UserCredentials.save({ ...userObj });
      return data;
    } catch (error) {
      return { error, message: error.message };
    }
  };
  public loginUser = async (email, password) => {
    try {
      let user = await UserCredentials.findOneBy({ email });
      if (!user) {
        return { success: false, message: "No User Found" };
      }
      let isValid = validatePassword(password, user.hashPwd, user.salt);
      if (!isValid) {
        return {
          success: false,
          message: "User Auth Failed, Wrong Email or Password",
        };
      }

      let { token, expiresIn } = createJWT(user);

      return { success: true, token: "Bearer " + token, expiresIn };
    } catch (error) {
      return { error, message: error.message };
    }
  };
  public deleteUser = async (id) => {
    try {
      let data = await UserCredentials.delete(id);
      return data;
    } catch (error) {
      return { error, message: error.message };
    }
  };
}
