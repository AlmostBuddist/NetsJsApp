import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import User from '../../../domain/entities/user.entity';
import IUserCreate from '../../../domain/interfaces/user-create.interface';
import IUserUpdate from '../../../domain/interfaces/user-update.interface';
import UserModel from '../models/user.model';

@Injectable()
export default class UserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly repository: Repository<UserModel>,
  ) {}

  public async findOneById(id: number): Promise<User | undefined> {
    const userModel = await this.repository.findOne({ where: { id } });

    return userModel ? new User(userModel) : undefined;
  }

  public async findOne(filter: Partial<User>): Promise<User | undefined> {
    const userModel = await this.repository.findOne({ where: filter });

    return userModel ? new User(userModel) : undefined;
  }

  public async findMany(filter: Partial<User>): Promise<User[]> {
    const userModels = await this.repository.find({ where: filter });

    return userModels.map((item) => new User(item));
  }

  public async create(incomingData: IUserCreate): Promise<User | undefined> {
    const userModel = await this.repository.save(incomingData);

    return userModel ? new User(userModel) : undefined;
  }

  public async update(id: number, incomingData: IUserUpdate): Promise<boolean> {
    await this.repository.update(id, incomingData);

    return true;
  }

  public async delete(id: number): Promise<boolean> {
    await this.repository.delete(id);

    return true;
  }

  public async softDeleteById(id: number): Promise<boolean> {
    await this.repository.softDelete(id);

    return true;
  }
}
