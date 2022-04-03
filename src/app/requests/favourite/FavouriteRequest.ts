import { IsEmpty, IsInt } from 'class-validator';

export class FavouriteRequest {
  @IsInt()
  @IsEmpty()
  readonly product_id: number;
}
