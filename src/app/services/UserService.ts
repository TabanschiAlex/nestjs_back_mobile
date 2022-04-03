import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/User';
import { CreateUserRequest } from '../requests/user/CreateUserRequest';
import { UserIndexResource } from '../resources/user/UserIndexResource';
import { BasicQueryRequest } from '../requests/BasicQueryRequest';
import { PasswordReset } from '../entities/PasswordReset';
import { randomUUID } from 'crypto';
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(PasswordReset) private readonly passwordResetRepository: Repository<PasswordReset>,
  ) {}

  public async getAllUsers(query: BasicQueryRequest): Promise<UserIndexResource> {
    const order = {};
    const skip = query.page ? (query.page.number - 1) * query.page.number : 0;
    const sort = query.sort?.split(' ') ?? null;

    if (sort) {
      order[`${sort[0]}`] = sort[1];
    }

    return new UserIndexResource(await this.userRepository.find({ skip, order }));
  }

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

  public async deleteUser(uuid: string): Promise<DeleteResult> {
    try {
      await this.userRepository.findOneOrFail({ uuid: uuid });
      return await this.userRepository.delete({ uuid: uuid });
    } catch (e) {
      throw new NotFoundException('Пользователь не найден');
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  public async getUserByUuid(uuid: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({ where: { uuid: uuid } });
    } catch (e) {
      throw new NotFoundException('Пользователь не найден');
    }
  }

  public async getLastPasswordResetToken(token: string): Promise<PasswordReset> {
    const passwordReset = await this.passwordResetRepository.findOne({
      where: { token },
      order: { updatedAt: 'DESC' },
      relations: ['user'],
    });

    if (passwordReset) {
      throw new NotFoundException();
    }

    // @ts-ignore
    const timePassed = new Date() - new Date(passwordReset.updatedAt);

    //todo вынести время в конфиг
    if (timePassed >= 100000) {
      throw new NotFoundException();
    }

    return passwordReset;
  }

  public async createPasswordResetToken(email: string): Promise<PasswordReset> {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    const passwordReset = new PasswordReset();
    passwordReset.user = user;
    passwordReset.token = randomUUID();

    return await this.passwordResetRepository.save(passwordReset);
  }
}
