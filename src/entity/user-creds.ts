import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
} from "typeorm";
import { UserDataEntity } from "./user-data.entity";
import { UserFamilyDataEntity } from "./user-family-data.entity";

@Entity("UserCredentials")
export class UserCredentials extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  hashPwd: string;

  @Column()
  salt: string;

  @OneToOne(() => UserDataEntity, (userInfo) => userInfo.user)
  userInfo: UserDataEntity;
  @OneToOne(() => UserFamilyDataEntity, (userFamily) => userFamily.user)
  userFamilyInfo: UserFamilyDataEntity;
}
