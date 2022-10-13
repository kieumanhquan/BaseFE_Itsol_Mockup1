import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from './employee.model';
import {EmployeeService} from './employee.service';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function validateDate(c: AbstractControl) {
  const birthday = new Date(c.value);
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthday.getFullYear();
  if (age < 1 || age > 90) {

    return {valadateDateNotOk: true};
  }
  return null;
}

@Component({
  selector: 'ngx-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class EmployeeComponent implements OnInit {
  datas: User[] = [];
  emp: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private readonly router: Router,
    config: NgbModalConfig,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg', centered: true,  scrollable: true });
  }

  ngOnInit(): void {
    this.emp = this.fb.group({
      fullName: ['', [Validators.required,Validators.pattern('[a-z A-Z]{6,30}')]],
      email: [''],
      phoneNumber: ['', [Validators.required,Validators.pattern('^(84|0[3|5|7|8|9])+([0-9]{8})\\b')]],
      birthDay: ['', [Validators.required,validateDate]],
      homeTown: ['', [Validators.required,Validators.maxLength(250)]],
      gender: ['', Validators.required],
      cccd: [''],
      unit: ['', Validators.required],
      salary: ['', Validators.required],
      position: ['', Validators.required],
      school: ['', Validators.required],
      userName: ['', Validators.required],
    });
    this.getAll();
  }

  getAll() {
    this.employeeService.getAll().subscribe((res: any) => {
      this.datas = res;
    });
  }
  // trang code
  fillEmp(){

  }
//trang code
  addEmployee() {
    console.log(this.emp.value);
    this.employeeService.addEmployee(this.emp.value).subscribe(
      (res) => {
        alert('Thêm nhân viên thành công!');
        console.log(res);
        this.router.navigate(['/public/user']).then(r => console.log(r));
      },
      error => {
        if (error.error.message === 'Thêm nhân viên thất bại') {
          alert(error.error.message);
        } else if (error.error.message === 'Không được để trống!') {
          alert(error.error.message);
        }
      },
    );
  }
}

