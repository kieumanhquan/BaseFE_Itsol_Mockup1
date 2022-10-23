import { UserService } from './../../../@core/services/user.service';
import { UserDTO, Unit, User } from './employee.model';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { EmployeeService } from './employee.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function validateDate(c: AbstractControl) {
  const birthday = new Date(c.value);
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthday.getFullYear();
  if (age < 1 || age > 90) {

    return { valadateDateNotOk: true };
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
  formEmp: FormGroup;
  formSearch: FormGroup;
  datas: User[] = [];
  datas1: Unit[] = [];
  public messages = '';
  user: User = {};
  sortBy = 'name';
  descAsc = 'desc';
  idUser: any;
  indexPage = 0;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Page: object = {};
  userSearch: UserDTO = {};



  constructor(
    private employeeService: EmployeeService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private readonly router: Router,
    private userActive: UserService,
    config: NgbModalConfig,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg', centered: true, scrollable: true });
  }

  openLg1(content1) {
    this.modalService.open(content1, { size: 'lg', centered: true, scrollable: true });
    console.log(this.userActive.getDecodedAccessToken());
  }

  ngOnInit(): void {
    this.idUser = localStorage.getItem('userId');
    this.pagination(this.indexPage);
    this.getAllUnit();
    this.initFormSearch();

    this.formEmp = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      // eslint-disable-next-line max-len
      password: ['', [Validators.required, Validators.maxLength(16), Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
      fullName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('(84|0[3|5|7|8|9])+([0-9]{8})')]],
      cccd: ['', [Validators.required, Validators.pattern('[0-9]{9,12}')]],
      homeTown: ['', Validators.required],
      salary: ['', Validators.required],
      literacy: ['', Validators.required],
      gender: ['', Validators.required],
      birthDay: ['', Validators.required],
      isActive: ['', Validators.required],
      unit: ['', Validators.required],
      position: ['', Validators.required],
      isLeader: ['', Validators.required],
    });
    this.getAll();
  }

  //trang code
  getAll() {
    this.employeeService.getAll().subscribe((res: any) => {
      this.datas = res;
      console.log(res);
    });
  }

  //trang code
  addEmployee() {
    this.addValueUser();
    // eslint-disable-next-line eqeqeq
    if ((this.checkDmHr() == true) && (this.user.unit.id == 3) && (this.user.leader == true)) {
      this.toastr.error('Không được chọn trạng thái trưởng đơn vị cho hr');
      return;
    }
    this.employeeService.addEmployee(this.user).subscribe(
      res => {
        this.toastr.success(res.message);
        this.ngOnInit();
        this.modalService.dismissAll();
        // this.router.navigate(['/user']).then(r => console.log(r));
      }, error => {
        if (error.error.message === 'Username đã tồn tại') {
          this.toastr.error(error.error.message);
        } else if (error.error.message === 'Email đã tồn tại') {
          this.toastr.error(error.error.message);
        } else if (error.error.message === 'Phone đã tồn tại') {
          this.toastr.error(error.error.message);
        }
      });
  }

  getAllUnit() {
    this.employeeService.getAllUnit().subscribe(
      (res: any) => {
        this.datas1 = res;

      },
    );
  }

  addValueUser() {
    this.user.fullName = this.formEmp.value.fullName;
    this.user.email = this.formEmp.value.email;
    this.user.userName = this.formEmp.value.userName;
    this.user.password = this.formEmp.value.password;
    this.user.cccd = this.formEmp.value.cccd;
    this.user.literacy = this.formEmp.value.literacy;
    this.user.phoneNumber = this.formEmp.value.phoneNumber;
    this.user.homeTown = this.formEmp.value.homeTown;
    this.user.salary = this.formEmp.value.salary;
    this.user.gender = this.formEmp.value.gender;
    this.user.position = this.formEmp.value.position;
    // eslint-disable-next-line eqeqeq
    if (this.formEmp.value.isLeader == 'Lead') {
      this.user.leader = true;
    } else {
      this.user.leader = false;
    }
    this.user.birthDay = this.formEmp.value.birthDay;
    this.user.delete = this.formEmp.value.isDelete;
    // eslint-disable-next-line eqeqeq
    if (this.formEmp.value.isActive == 'Active') {
      this.user.active = true;
    } else {
      this.user.active = false;
    }
    const unitId = this.formEmp.value.unit;
    // eslint-disable-next-line eqeqeq
    this.user.unit = this.datas1.find(unit => unit.id == unitId);


  }

  onSubmit() {
    this.addEmployee();
  }

  infoUser(id: any) {
    const url = 'home/edit/' + id;
    this.router.navigate([url]);
  }

  check() {
    // eslint-disable-next-line eqeqeq
    if (this.userActive.getDecodedAccessToken().auth == 'ROLE_DM') {
      return true;
    } else {
      return false;
    }
  }

  checkDmHr() {
    // eslint-disable-next-line eqeqeq
    if (this.userActive.getDecodedAccessToken().auth == 'ROLE_DM_HR') {
      return true;
    } else {
      return false;
    }
  }

  checkHr() {
    // eslint-disable-next-line eqeqeq
    if (this.userActive.getDecodedAccessToken().auth == 'ROLE_HR') {
      return true;
    } else {
      return false;
    }
  }


  pagination(page: any) {
    if (page < 0) {
      page = 0;
    }
    this.indexPage = page;
    this.employeeService.getPageTransfer(this.indexPage, this.idUser,
      this.sortBy, this.descAsc, this.userSearch)
      .subscribe(res => {
        this.datas = res.object.content;
        this.Page = res.object;
        console.log(this.Page);
      });
  }

  preNextPage(selector: string) {
    // eslint-disable-next-line eqeqeq
    if (selector == 'pre') {
      --this.indexPage;
    }
    // eslint-disable-next-line eqeqeq
    if (selector == 'next') {
      ++this.indexPage;
    }
    this.pagination(this.indexPage);
  }

  initFormSearch() {
    this.formSearch = this.fb.group({
      name: '',
      email: '',
      literacy: '',
      salary: '',
      birthDay: '',
      unit: '',
    });
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  FillValueSearch() {
    const formSearchValue = this.formSearch.value;
    this.userSearch.name = formSearchValue.name;
    this.userSearch.email = formSearchValue.email;
    this.userSearch.literacy = formSearchValue.literacy;
    this.userSearch.salary = formSearchValue.salary;
    this.userSearch.birthDay = formSearchValue.birthDay;
    const unitId = this.formEmp.value.unit;
    // eslint-disable-next-line eqeqeq
    this.userSearch.unit = this.datas1.find(unit => unit.id == unitId);
    console.log(this.formSearch.value);
  }

  onSubmit1() {
    console.log('......');
    this.FillValueSearch();
    this.pagination(0);
    this.initFormSearch();
  }
}

