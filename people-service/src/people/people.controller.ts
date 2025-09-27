import { Controller, Get, Query, NotFoundException, BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PeopleService } from './people.service';
import { Person } from './interfaces/person.interface';

@Controller('People')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get('GetPerson')
  @ApiOperation({ summary: 'Get a person from directory by logon or employee ID' })
  @ApiResponse({ status: 200, description: 'The person with the specified identity was found' })
  @ApiResponse({ status: 400, description: 'The request was invalid' })
  @ApiResponse({ status: 404, description: 'The person with the specified identity was not found' })
  @ApiQuery({ name: 'LogonId', required: false, description: 'Logon (user name)' })
  @ApiQuery({ name: 'EmployeeId', required: false, description: 'Employee ID (MSID)' })
  async getPerson(@Query('LogonId') logonId?: string, @Query('EmployeeId') employeeId?: string): Promise<Person> {
    if (!logonId && !employeeId) {
      throw new BadRequestException('Either LogonId or EmployeeId must be provided');
    }

    console.log(`PeopleService.GetPerson called with LogonId: ${logonId}, EmployeeId: ${employeeId}`);

    const person = await this.peopleService.getPerson(logonId, employeeId);
    
    if (!person) {
      console.warn(`Person not found with LogonId: ${logonId}, EmployeeId: ${employeeId}.`);
      throw new NotFoundException();
    }

    console.log(`Person found with LogonId: ${logonId}, EmployeeId: ${employeeId}.`);
    return person;
  }

  @Get('GetMatchingPeople')
  @ApiOperation({ summary: 'Get all the people from the directory whose logonId or full name contain the search text' })
  @ApiResponse({ status: 200, description: 'List of People whose LogonId or FullName contain the search text' })
  @ApiResponse({ status: 400, description: 'The request was invalid' })
  @ApiResponse({ status: 404, description: 'People with the specified search text were not found' })
  @ApiQuery({ name: 'SearchText', required: true, description: 'Search text to match against logonId or fullName' })
  @ApiQuery({ name: 'Take', required: false, description: 'Number of results to return (default 10)' })
  async getMatchingPeople(@Query('SearchText') searchText: string, @Query('Take') take?: number): Promise<Person[]> {
    if (!searchText) {
      throw new BadRequestException('SearchText must be provided');
    }

    if (searchText.length < 3) {
      throw new BadRequestException('SearchText must be at least 3 characters long');
    }

    console.log(`PeopleService.GetMatchingPeople called with searchtext: ${searchText}`);

    const people = await this.peopleService.getMatchingPeople(searchText, take || 10);
    
    if (people.length === 0) {
      console.warn(`People do not exist with searchtext: ${searchText}.`);
      throw new NotFoundException();
    }

    console.log(`People found when using searchtext: ${searchText}.`);
    return people;
  }

  @Get('ValidatePerson')
  @ApiOperation({ summary: 'Validate a person against the directory without returning any attributes' })
  @ApiResponse({ status: 200, description: 'The person with the specified identity was found' })
  @ApiResponse({ status: 400, description: 'The request was invalid' })
  @ApiResponse({ status: 404, description: 'The person with the specified identity was not found' })
  @ApiQuery({ name: 'LogonId', required: false, description: 'Logon (user name)' })
  @ApiQuery({ name: 'EmployeeId', required: false, description: 'Employee ID (MSID)' })
  async validatePerson(@Query('LogonId') logonId?: string, @Query('EmployeeId') employeeId?: string): Promise<void> {
    if (!logonId && !employeeId) {
      throw new BadRequestException('Either LogonId or EmployeeId must be provided');
    }

    console.log(`PeopleService.ValidatePerson called with LogonId: ${logonId}, EmployeeId: ${employeeId}`);

    const isValid = await this.peopleService.validatePerson(logonId, employeeId);
    
    if (!isValid) {
      console.warn(`Person does not exist with LogonId: ${logonId}, EmployeeId: ${employeeId}.`);
      throw new NotFoundException();
    }

    console.log(`Valid person with LogonId: ${logonId}, EmployeeId: ${employeeId}.`);
  }
}
