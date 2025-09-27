import { PeopleService } from './people.service';
import { Person } from './interfaces/person.interface';
export declare class PeopleController {
    private readonly peopleService;
    constructor(peopleService: PeopleService);
    getPerson(logonId?: string, employeeId?: string): Promise<Person>;
    getMatchingPeople(searchText: string, take?: number): Promise<Person[]>;
    validatePerson(logonId?: string, employeeId?: string): Promise<void>;
}
