import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskTemplateDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  sectorId!: number;
}
