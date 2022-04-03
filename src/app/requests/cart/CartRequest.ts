import { IsEmpty, IsInt } from 'class-validator';

export class CartRequest {
  @IsInt()
  @IsEmpty()
  readonly product_id: number;

  @IsInt()
  @IsEmpty()
  readonly quantity: number;
}
