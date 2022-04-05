import { IsArray, IsEmpty } from 'class-validator';

export class OrderRequest {
  @IsArray()
  @IsEmpty()
  readonly items: number[];
}
