import { Person } from './interfaces/person.interface';
export declare class PeopleService {
    private people;
    private cache;
    private readonly CACHE_DURATION;
    constructor();
    private loadPeopleData;
    getPerson(logonId?: string, employeeId?: string): Promise<Person | null>;
    getMatchingPeople(searchText: string, take?: number): Promise<Person[]>;
    validatePerson(logonId?: string, employeeId?: string): Promise<boolean>;
}
