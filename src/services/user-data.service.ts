import { Body, Delete, Get, Path, Post, Put, Route } from "tsoa";
import { AppDataSource } from "../config/data-source";
import { UserDataEntity } from "../entity/user-data.entity";

@Route("user")
export class UserDetailsService {
  @Get("/")
  public async getUserDetails(user) {
    const { id: userId } = user;
    try {
      let data = await AppDataSource.getRepository(UserDataEntity)
        .createQueryBuilder("userInfo")
        .leftJoin("userInfo.user", "user")
        .where("userInfo.userId = :userId", { userId })
        .getOne();

      if (Object.keys(data).length === 0) {
        return { message: "No User Details found for this user" };
      }
      return data;
    } catch (error) {
      return { error, message: error.message };
    }
  }
  @Post("/")
  public async createUserDetails(@Body() userData: UserDataEntity) {
    try {
      let curr_year = new Date().getFullYear();
      const { dob, height, weight } = userData;
      let year_of_birth = dob.toString().split("-")[2];

      const age = Number(curr_year) - Number(year_of_birth);
      userData.age = age.toString();
      let temp = height.split("-");
      const heightCM = +temp[0] * 30.48 + +temp[1] * 2.54;
      const bmi = (weight / heightCM ** 2) * 10000;

      userData.bmi_ratio = +bmi.toFixed(2);
      let data = UserDataEntity.save(userData);

      return data;
    } catch (error) {
      return { error, message: error.message };
    }
  }
  @Put()
  public async updateUserDetails(@Body() userData, @Path() id) {
    let data = await AppDataSource.createQueryBuilder()
      .update(UserDataEntity)
      .set(userData)
      .where("id = :id", { id })
      .execute();

    return data;
  }
  @Delete("{id}")
  public async deleteUserDetails(@Path() id) {
    let data = await UserDataEntity.delete(id);
    return data;
  }
}
