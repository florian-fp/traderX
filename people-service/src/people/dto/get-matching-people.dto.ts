import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetMatchingPeopleDto {
  @ApiProperty({ 
    description: 'Search text to match against logonId or fullName',
    example: 'alice'
  })
  @IsNotEmpty()
  @IsString()
  searchText: string;
}
