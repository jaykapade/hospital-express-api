import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserCredentials } from "./user-creds";

@Entity("FamilyDetails")
export class UserFamilyDataEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  father_name: string;
  @Column()
  father_age: number;
  @Column()
  father_origin: string;
  @Column()
  mother_name: string;
  @Column()
  mother_age: number;
  @Column()
  mother_origin: string;
  @Column()
  isParentDiabetic: boolean;
  @Column()
  parentHasCardiacIssue: boolean;
  @Column()
  parentHasBPIssue: boolean;
  @OneToOne(() => UserCredentials, (user) => user.userFamilyInfo, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: UserCredentials;
}
