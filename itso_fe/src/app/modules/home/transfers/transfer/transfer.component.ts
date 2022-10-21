import { Component, OnInit } from '@angular/core';
import {TransferService} from "../../../../services/TransferService";
import {User} from "../../employee/employee.model";
import {Transfer} from "../../../../models/model/Transfer";
import {HttpErrorResponse} from "@angular/common/http";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Unit} from "../../../../models/model/Unit";
import {UnitService} from "../../../../services/UnitService";
import {SessionService} from "../../../../@core/services/session.service";
import {ProfileService} from "../../profile/profile.service";
import {UserService} from "../../../../@core/services/user.service";
import {Observable} from "rxjs";

@Component({
  selector: 'ngx-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  datas: Transfer[] = [];
  units: Unit[];
  transfer: Transfer = {};
  formTransfer : FormGroup;
  formUpdateTransfer : FormGroup;
  userTransfer: User;
  creator: User;
  username: string;
  unitOld: Unit;
  dmUnitOld: User;
  dmUnitNew: User;
  id: any;
  isCheck: boolean;
  constructor(
    private transferService:TransferService,
    private unitService: UnitService,
    private userService: UserService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private readonly router: Router,
    private sessionService: SessionService,
    private profileService: ProfileService,
    config: NgbModalConfig,
  ) { }
  //open modal create
  openLg(content, id:any) {
    this.getUserById(id);
    this.findUnitNotJoinUser(id);
    this.modalService.open(content, { size: 'lg', centered: true,  scrollable: true });
  }
  //open modal edit
  openLd(content, item:any) {
    // console.log(item);
    this.userTransfer = item.employee;
    this.transfer = item;
    this.findUnitNotJoinUser(item.employee.id);
    this.userService.getDMByUnit(this.transfer.unitOld.id).subscribe(
      (res)=>{
        this.dmUnitOld = res;
        console.log(this.dmUnitOld);
      });
    this.userService.getDMByUnit(this.transfer.unitNew.id).subscribe(
      (res)=>{
        this.dmUnitNew = res;
        console.log(this.dmUnitNew);
      });
    this.isReview();



    this.updateForm();
    this.modalService.open(content, { size: 'lg', centered: true,  scrollable: true });
  }

  ngOnInit(): void {
    this.getAllTransfer();
    this.getByUserName();
    this.initForm();
    this.userService.getUserById(1);

  }



  public getAllTransfer(){
    this.transferService.getAll().subscribe(
      (data: any) => {
        this.datas = data;
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }
  public findUnitNotJoinUser(id:any){
    this.unitService.findUnitNotJoinUser(id).subscribe(
      (data: any) => {
        this.units = data;
        console.log(data);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }

  getUserById(id: number){
    this.profileService.getUserById(id).subscribe(
      (res)=>{
        this.userTransfer = res;
        this.unitOld = this.userTransfer.unit;
        console.log(this.unitOld);
        console.log(this.userTransfer);
      });
  }
  getByUserName(){
    this.username=this.sessionService.getItem('auth-user');
    this.profileService.getProfileByUserName(this.username).subscribe(
      (res)=>{
        this.creator = res;
        console.log(this.creator);
      });
  }
  onSubmit(){
    alert("lưu");
    this.addTransfer();
    this.transferService.createTransger(this.transfer).subscribe(res=>{
      this.toastr.success('Thêm mới thành công')
    }, error => {
      this.toastr.error(error.message())
    });
    this.modalService.dismissAll();
  }
  addTransfer(){
    let formValue = this.formTransfer.value;
    console.log(formValue.transferName)
    this.transfer.transferName = formValue.transferName;
    this.transfer.reasonTransfer = formValue.reasonTransfer;
    this.transfer.unitNew = formValue.unitNew;
    // @ts-ignore
    this.transfer.creator = this.creator;
    // @ts-ignore
    this.transfer.employee = this.userTransfer;

  }
  initForm() {
    this.formTransfer = this.fb.group({
      transferName: ["", [Validators.required, Validators.maxLength(200)]],
      unitNew: ['', Validators.required],
      reasonTransfer: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }
  updateForm(){
        this.formTransfer.patchValue({
          transferName:this.transfer.transferName,
          unitNew:this.transfer.unitNew,
          reasonTransfer:this.transfer.reasonTransfer,
        })
  }
  isReview(){
    if(this.transfer.status > 4){
      this.isCheck = false;
      return;
    }
    const jwt = this.userService.getDecodedAccessToken();
    let role = jwt.auth.split(',');
    if(role.includes('ROLE_ADMIN')){
      this.isCheck = true;
      return this.isCheck;
    }
    // if(this.transfer.isStatusOld != 0){
    //   this.cancleReview = (this.dmUnitOld.id == this.creator.id)
    //   return;
    // }
    // if(this.transfer.isStatusNew != 1){
    //   this.cancleReview = (this.dmUnitNew.id == this.creator.id)
    //   return;
    // }

  }
  getByDmByUnitId(id:any){
    this.userService.getDMByUnit(id).subscribe(
      (res)=>{
        this.creator = res;
        console.log(this.creator);
      });
  }
  checkConFirmTranfer(){
    if(this.transfer.isStatusOld == null){
      this.transfer.status = 2;
    }else{
      this.transfer.status = 1;
    }
  }
  checkRefuseTranfer(){
    const jwt = this.userService.getDecodedAccessToken();
    let role = jwt.auth.split(',');
    if(role.includes('ROLE_ADMIN')){
      this.transfer.status = 5;
    }
    else if(this.transfer.isStatusOld == null){
      this.transfer.status = 5;
      this.transfer.isStatusOld = 1;
    }
    else if(this.transfer.isStatusNew == null){
      this.transfer.status = 5;
      this.transfer.isStatusNew = 1;
    }
  }
  updateTransfer(){

  }
  deleteTransfer(){

  }
  confirmTransfer(){
    this.checkConFirmTranfer();
    this.transferService.updateTransger(this.transfer).subscribe(res=>{
      this.toastr.success('Cập nhật thành công')
    }, error => {
      this.toastr.error(error.message())
    });
  }
  refuseTransfer(){
    this.checkRefuseTranfer();
    this.transferService.updateTransger(this.transfer).subscribe(res=>{
      this.toastr.success('Cập nhật thành công')
    }, error => {
      this.toastr.error(error.message())
    });
  }
  //Phân trang

  //chuyển trang
  sentoUpdate(id:number){
    const url = '/home/update-transfer/' + id;
    this.router.navigate([url]);
  }

}
