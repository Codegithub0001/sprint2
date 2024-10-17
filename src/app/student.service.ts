import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  API="http://localhost:8080";
  public registerStudent(studentData: any)
  {
    return this.http.post(`${this.API}/studentservice` , studentData);
  }

  public getStudents(){
    return this.http.get(`${this.API}/studentservice`);
  }

  public deleteStudent(studentId:any){
    return this.http.delete(`${this.API}/studentservice/${studentId}`);
  }

  public updateStudent(student: any){
    return this.http.put(`${this.API}/studentservice/${student.id}`, student);
  }
  constructor(private http: HttpClient) { }
}
