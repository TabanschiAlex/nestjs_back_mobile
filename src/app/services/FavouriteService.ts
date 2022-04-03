import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favourite } from '../entities/Favourite';
import { FavouriteRequest } from '../requests/favourite/FavouriteRequest';

@Injectable()
export class FavouriteService {
  constructor(
    @InjectRepository(Favourite)
    private readonly favouriteRepository: Repository<Favourite>,
  ) {}

  public async getAll(): Promise<Favourite[]> {
    return await this.favouriteRepository.find();
  }

  public async add(favouriteRequest: FavouriteRequest): Promise<any> {
    return await this.favouriteRepository.save(favouriteRequest);
  }

  public async delete(id: string): Promise<any> {
    await this.favouriteRepository.findOneOrFail(id);
    return await this.favouriteRepository.delete(id);
  }
}
