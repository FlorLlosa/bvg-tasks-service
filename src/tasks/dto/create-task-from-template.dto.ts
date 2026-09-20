import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreateTaskFromTemplateDto {
  @IsOptional()
  @IsInt()
  assignedUserId?: number;

  @IsInt()
  createdByUserId!: number;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
