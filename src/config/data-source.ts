import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserDataEntity } from "../entity/user-data.entity";
import { UserCredentials } from "../entity/user-creds";
import { UserFamilyDataEntity } from "../entity/user-family-data.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "hospital",
  password: "hospital",
  database: "hospital",
  synchronize: true,
  logging: false,
  entities: [UserCredentials, UserDataEntity, UserFamilyDataEntity],
  migrations: [],
  subscribers: [],
});
