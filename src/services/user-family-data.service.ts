import { AppDataSource } from "../config/data-source";
import { UserFamilyDataEntity } from "../entity/user-family-data.entity";

export class UserFamilyDataService {
  public getFamilyData = async () => {
    let data = await UserFamilyDataEntity.find();
    return data;
  };
  public createFamilyData = async (familyData) => {
    return await UserFamilyDataEntity.save(familyData);
  };
  public updateFamilyData = async (familyData, id) => {
    let data = await AppDataSource.createQueryBuilder()
      .update(UserFamilyDataEntity)
      .set(familyData)
      .where("id = :id", { id })
      .execute();

    return data;
  };
  public deleteFamilyData = async (id) => {
    return await UserFamilyDataEntity.delete(id);
  };
}
