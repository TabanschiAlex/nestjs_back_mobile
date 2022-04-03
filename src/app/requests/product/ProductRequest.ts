import { IsArray, IsInt, IsString } from 'class-validator';

export class ProductRequest {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly article: string;

  @IsInt()
  readonly stock: number;

  @IsInt()
  readonly category_id: number;

  @IsInt()
  readonly manufacturer_id: number;

  @IsArray()
  readonly images: Express.Multer.File[];
}
