import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const storedUser = this.isLocalStorageAvailable() ? localStorage.getItem('currentUser') : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private isLocalStorageAvailable(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(user: User): boolean {
    if (!this.isLocalStorageAvailable()) return false;

    const users = this.getUsers();
    if (users.find(u => u.email === user.email)) {
      return false; // User already exists
    }
    user.id = users.length + 1;
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    if (!this.isLocalStorageAvailable()) return false;

    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return true;
    }
    return false;
  }

  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  private getUsers(): User[] {
    if (!this.isLocalStorageAvailable()) return [];
    
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }
}