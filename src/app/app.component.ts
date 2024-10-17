import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'student-module';
  studentForm: FormGroup;
  studentDetails: any[] = [];
  studentToUpdate: any = {};

  constructor(private studentService: StudentService, private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.getStudentDetails();
  }

  initForm() {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      course: ['', Validators.required]
    });
  }

  register() {
    if (this.studentForm.valid) {
      this.studentService.registerStudent(this.studentForm.value).subscribe(
        (resp: any) => {
          console.log(resp);
          this.studentForm.reset();
          this.getStudentDetails();
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
  }

  getStudentDetails() {
    this.studentService.getStudents().subscribe(
      (resp: any) => {
        console.log(resp);
        this.studentDetails = resp;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  deleteStudent(student: any) {
    this.studentService.deleteStudent(student.id).subscribe(
      (resp) => {
        console.log(resp);
        this.getStudentDetails();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  edit(student: any) {
    this.studentToUpdate = { ...student };
    this.studentForm.patchValue(this.studentToUpdate);
  }

  updateStudent() {
    if (this.studentForm.valid) {
      const updatedStudent = { ...this.studentToUpdate, ...this.studentForm.value };
      this.studentService.updateStudent(updatedStudent).subscribe(
        (resp) => {
          console.log(resp);
          this.getStudentDetails();
          this.studentToUpdate = {};
          this.studentForm.reset();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
