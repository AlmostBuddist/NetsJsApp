import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from '../../../domain/entities/user.entity';
import SexEnum from '../../../domain/enums/sex.enum';

@Entity('users')
export default class UserModel implements User {
  constructor(data: User) {
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column({ unique: true })
  public login: string;

  @Column()
  public password: string;

  @Column()
  public email: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ nullable: true })
  public middleName?: string;

  @Column({ nullable: true })
  public phoneNumber?: string;

  @Column({ enum: SexEnum })
  public sex: SexEnum;

  @CreateDateColumn()
  public readonly createdAt?: Date | string;

  @UpdateDateColumn()
  public readonly updatedAt?: Date | string;

  @DeleteDateColumn()
  public readonly deletedAt?: Date | string;
}
