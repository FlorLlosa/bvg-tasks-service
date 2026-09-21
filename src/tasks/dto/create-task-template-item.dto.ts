import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskTemplateItemDto {
  @IsString()
  @IsNotEmpty()
  description!: string;
}
