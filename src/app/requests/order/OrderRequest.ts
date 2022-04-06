import { IsArray, IsNotEmpty } from 'class-validator';

export class OrderRequest {
  @IsArray()
  @IsNotEmpty()
  readonly items: any[];
}
