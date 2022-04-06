import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/User';
import { CreateUserRequest } from '../requests/user/CreateUserRequest';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  public async storeUser(request: CreateUserRequest): Promise<User> {
    try {
      return await this.userRepository.save(request);
    } catch (e) {
      throw new UnprocessableEntityException(e.message);
    }
  }

  public async updateUser(uuid: string, request: QueryDeepPartialEntity<User>): Promise<UpdateResult> {
    try {
      return await this.userRepository.update({ uuid: uuid }, request);
    } catch (e) {
      throw new UnprocessableEntityException(e.message);
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email: email } });
  }
}
