import { AppDataSource } from "../config/data-source";
import { UserFamilyDataEntity } from "../entity/user-family-data.entity";

export class UserFamilyDataService {
  public getFamilyData = async (user) => {
    const { id: userId } = user;
    try {
      let data = await AppDataSource.getRepository(UserFamilyDataEntity)
        .createQueryBuilder("familyInfo")
        .leftJoin("familyInfo.user", "user")
        .where("familyInfo.userId = :userId", { userId })
        .getOne();

      if (Object.keys(data).length === 0) {
        return { message: "No Family Details found for this user" };
      }
      return data;
    } catch (error) {
      return { error, message: error.message };
    }
  };
  public createFamilyData = async (familyData) => {
    try {
      return await UserFamilyDataEntity.save(familyData);
    } catch (error) {
      return { error, message: error.message };
    }
  };
  public updateFamilyData = async (familyData, user) => {
    try {
      const { id }: any = await this.getFamilyData(user);
      let data = await AppDataSource.createQueryBuilder()
        .update(UserFamilyDataEntity)
        .set(familyData)
        .where("id = :id", { id })
        .execute();

      return data;
    } catch (error) {
      return error;
    }
  };
  public deleteFamilyData = async (user) => {
    try {
      const { id }: any = await this.getFamilyData(user);
      return await UserFamilyDataEntity.delete(id);
    } catch (error) {
      return error;
    }
  };
}
