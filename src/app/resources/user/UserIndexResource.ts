import { User } from '../../entities/User';

export class UserIndexResource {
  constructor(users: User[]) {
    // @ts-ignore
    return this.handle(users);
  }

  handle(users: User[]): Record<string, any> {
    return users.filter((user) => {
      return {
        uuid: user.uuid,
        email: user.email,
        name: user.name,
        roles: user.roles,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
  }
}
