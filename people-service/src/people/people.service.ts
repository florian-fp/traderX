import { Injectable } from '@nestjs/common';
import { Person } from './interfaces/person.interface';
import * as fs from 'fs';
import * as path from 'path';

interface CacheEntry<T> {
  value: T;
  expiry: number;
}

@Injectable()
export class PeopleService {
  private people: Person[] = [];
  private cache = new Map<string, CacheEntry<{ people: Person[] }>>();
  private readonly CACHE_DURATION = 60 * 1000;

  constructor() {
    this.loadPeopleData();
  }

  private loadPeopleData() {
    try {
      const dataPath = path.join(__dirname, '../../data/people.json');
      const rawData = fs.readFileSync(dataPath, 'utf8');
      this.people = JSON.parse(rawData);
    } catch (error) {
      console.error('Error loading people data:', error);
      this.people = [];
    }
  }

  async getPerson(logonId?: string, employeeId?: string): Promise<Person | null> {
    if (!logonId && !employeeId) {
      return null;
    }

    if (logonId) {
      return this.people.find(p => p.logonId === logonId) || null;
    }

    return this.people.find(p => p.employeeId === employeeId) || null;
  }

  async getMatchingPeople(searchText: string, take: number = 10): Promise<Person[]> {
    if (!searchText) {
      return [];
    }

    const cacheKey = `${searchText},${take}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && cached.expiry > Date.now()) {
      return cached.value.people;
    }

    const matchingPeople = this.people
      .filter(p => 
        p.fullName.toLowerCase().includes(searchText.toLowerCase()) || 
        p.logonId.toLowerCase().includes(searchText.toLowerCase())
      )
      .slice(0, take);

    this.cache.set(cacheKey, {
      value: { people: matchingPeople },
      expiry: Date.now() + this.CACHE_DURATION
    });

    return matchingPeople;
  }

  async validatePerson(logonId?: string, employeeId?: string): Promise<boolean> {
    const person = await this.getPerson(logonId, employeeId);
    return person !== null;
  }
}
