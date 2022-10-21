import { Component, OnInit } from '@angular/core';
import {TransferService} from "../../../services/TransferService";
import {User} from "../employee/employee.model";
import {Transfer} from "../../../models/model/Transfer";
import {HttpErrorResponse} from "@angular/common/http";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Unit} from "../../../models/model/Unit";
import {UnitService} from "../../../services/UnitService";
import {SessionService} from "../../../@core/services/session.service";
import {ProfileService} from "../profile/profile.service";

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
  userTransfer: User;
  creator: User;
  username: string;
  unitOld: Unit;
  id: any;
  constructor(
    private transferService:TransferService,
    private unitService: UnitService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private readonly router: Router,
    private sessionService: SessionService,
    private profileService: ProfileService,
    config: NgbModalConfig,
  ) { }
  openLg(content, id:any) {
    this.getUserById(id);
    this.findUnitNotJoinUser(id);
    this.modalService.open(content, { size: 'lg', centered: true,  scrollable: true });
  }

  ngOnInit(): void {
    this.getAllTransfer();
    this.getByUserName();
    this.initForm();

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
    })
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


}
