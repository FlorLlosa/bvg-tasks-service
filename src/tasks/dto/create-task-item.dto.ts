import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskItemDto {
  @IsString()
  @IsNotEmpty()
  description!: string;
}
