import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
//import { catchError, throwError, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Lecturer } from '../models/lecturer';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';
  private validLecturerCode = 'SECRET_CODE';

  constructor(private http: HttpClient) {}
  
  // private currentUserSubject = new BehaviorSubject<User | null>(null);
  // currentUser : User | null = null;
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
currentUser = this.currentUserSubject.asObservable();

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
  
  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ success: boolean, user: User }>(`${this.apiUrl}/login`, { username, password }).pipe(
      map(response => {
        if (response && response.success) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
          return true;
        }
        return false;
      })
    );
  }
    
 register(user: User & { isLecturer?: boolean }): Observable<boolean> {
   return this.http.post<{ success: boolean, user: User }>(`${this.apiUrl}/register`, user).pipe(
     map(response => {
       if (response.success) {
         this.currentUserSubject.next(response.user);
         sessionStorage.setItem('currentUser', JSON.stringify(response.user));
         return true;
       }
       return false;
     })
   );
 }
  
 verifyLecturerCode(code: string): Observable<boolean> {
  return this.http.post<boolean>(`${this.apiUrl}/verify-lecturer-code`, { code });
}
  logout(): void {
    this.currentUserSubject.next(null);
    sessionStorage.removeItem('currentUser');
  }
  

  getCurrentUser(): User | null {
    let currentUser = this.currentUserSubject.getValue();
    if (!currentUser) {
      const userStr = sessionStorage.getItem('currentUser');
      if (userStr) {
        currentUser = JSON.parse(userStr);
        this.currentUserSubject.next(currentUser);
      }
    }
    return currentUser;
  }
  getUserById(id: number): Observable<Lecturer> {
    return this.http.get<Lecturer>(`${this.apiUrl}/${id}`);
  }
 

}  

