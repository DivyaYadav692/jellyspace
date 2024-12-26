import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  // Update this URL based on your backend API configuration
  apiURL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  sendOTP(paramss: any) {
    return this.http
      .post(this.apiURL + '/sendOTP', JSON.stringify(paramss), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  verifyOTP(paramss: any) {
    return this.http
      .post(this.apiURL + '/verifyOTP', JSON.stringify(paramss), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  login(paramss: any) {
    return this.http
      .post(this.apiURL + '/login', JSON.stringify(paramss), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch employees list
  getEmployees() {
    return this.http
      .get(this.apiURL + '/employees')
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch employee
  getEmployee(id: any) {
    return this.http
      .get(this.apiURL + '/employees/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method => Create employee
  createEmployee(employee: any) {
    console.log('employee' + JSON.stringify(employee));
    return this.http
      .post(this.apiURL + '/register', JSON.stringify(employee), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method => Update employee
  updateEmployee(id: any, employee: any) {
    return this.http
      .put(this.apiURL + '/employees/' + id, JSON.stringify(employee), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete employee
  deleteEmployee(id: any) {
    return this.http
      .delete(this.apiURL + '/employees/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // New Details method to fetch company details
  Details(params: { email: string }) {
    return this.http
      .post(`${this.apiURL}/getCompanyDetails`, JSON.stringify(params), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => errorMessage);
  }

  getProjectByEmail(paramss: any) {
    return this.http
      .post(this.apiURL + '/getProjects', JSON.stringify(paramss), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  savePostMethod(paramss: any) {
    return this.http
      .post(this.apiURL + '/postAProject', JSON.stringify(paramss), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getApiDataBinding() {
    return this.http
      .get(this.apiURL + '/projects')
      .pipe(retry(1), catchError(this.handleError));
  }

  getUsersData() {
    return this.http
      .get(this.apiURL + '/users')
      .pipe(retry(1), catchError(this.handleError));
  }

  getBidInitDetails(paramss: any) {
    return this.http
      .post(this.apiURL + '/getProjectBids', JSON.stringify(paramss), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getCurrentBidDetailsList(paramss: any) {
    return this.http
      .post(this.apiURL + '/getbids', JSON.stringify(paramss), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  postBid(paramss: any) {
    return this.http
      .post(this.apiURL + '/postBid', JSON.stringify(paramss), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  acceptedAndRejected(paramss: any) {
    return this.http
      .post(this.apiURL + '/acceptBid', JSON.stringify(paramss), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteData(id: any) {
    return this.http
      .post(this.apiURL + '/deleteProject', { id }, this.httpOptions) // Send id as an object
      .pipe(retry(1), catchError(this.handleError));
  }
  
  loginUserDetails(paramss: any) {
    return this.http
      .post(this.apiURL + '/login', JSON.stringify(paramss), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method => Delete employee
  deleteUser(paramss: any) {
    return this.http
      .post(this.apiURL + '/deleteUser', JSON.stringify(paramss), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
}
