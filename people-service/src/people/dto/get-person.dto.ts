import { IsOptional, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetPersonDto {
  @ApiProperty({ 
    description: 'Logon (user name)', 
    required: false,
    example: 'user01'
  })
  @IsOptional()
  @IsString()
  logonId?: string;

  @ApiProperty({ 
    description: 'Employee ID (MSID)', 
    required: false,
    example: 'E0001'
  })
  @IsOptional()
  @IsString()
  employeeId?: string;

  @ValidateIf((o) => !o.logonId && !o.employeeId, {
    message: 'Either logonId or employeeId must be provided'
  })
  @IsString()
  _validation?: string;
}
