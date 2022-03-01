import { IsNotEmpty } from 'class-validator';

export class CreateBlacklistDto {
  @IsNotEmpty()
  token: string;
}
