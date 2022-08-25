import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserCredentials } from "./user-creds";

@Entity("UserDetails")
export class UserDataEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column()
  mob_no: string;
  @Column()
  dob: string;
  @Column()
  age: string;
  @Column("decimal")
  weight: number;
  @Column()
  height: string;
  @Column("decimal")
  bmi_ratio: number;
  @Column()
  country_origin: string;
  @Column()
  is_diabetic: boolean;
  @Column()
  has_cardiac_issues: boolean;
  @Column()
  has_bp_issue: boolean;
  @OneToOne(() => UserCredentials, (user) => user.userInfo, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: UserCredentials;
}
