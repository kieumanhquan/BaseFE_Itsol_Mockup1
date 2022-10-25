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
  transferList: Transfer[] = [];
  datas: Transfer[] = [];
  units: Unit[];
  unitData: Unit[];
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
  //search
  indexPage = 0;
  Page: object = {};
  userId: any;
  formSearch: FormGroup;
  transferDTO: TransferDTO = {};
  showHiden = false;
  formSort: FormGroup;
  sortBy: string ;
  descAsc: string = 'desc'
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
    // this.userService.getUserById(1);



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
        this.userId = res.id;
        this.pagination(this.indexPage);
        console.log(this.userId);
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

  // search and sort
  initFormSearch() {
    this.formSearch = this.fb.group({
      name: '',
      transferUserName: '',
      unitOld: '',
      unitNew: '',
      succeeDay: '',
      reason: '',
    });
  }
  initFormSort() {
    this.formSort = this.fb.group({
      typeSort: '',
    });
  }
  infotransfer(id) {
    const url = '/admin/transfer-information/' + id;
    this.router.navigate([url])
  }
  pagination(page: any) {
    if (page < 0) {
      page = 0;
    }
    this.indexPage = page
    this.transferDTO.transferName ="chung";
    this.transferService.getPageTransfer(this.indexPage, this.userId
      , this.transferDTO, this.sortBy, this.descAsc)
      .subscribe(res => {
        this.transferList = res.object.content;
        console.log(res);
        this.Page = res.object;
      })
  }
  preNextPage(selector: string) {
    if (selector == 'pre') --this.indexPage;
    if (selector == 'next') ++this.indexPage;
    this.pagination(this.indexPage);
  }

  OnSearch() {
    this.updateTransferSearch();
    this.pagination(0);
    this.initFormSearch();
    this.togger();
  }

  updateTransferSearch() {
    const formSearchValue = this.formSearch.value;
    this.transferDTO.transferName = formSearchValue.name;
    this.transferDTO.reason = formSearchValue.reason;
    this.transferDTO.unitOld = this.findUnit(formSearchValue.unitOld);
    this.transferDTO.unitNew = this.findUnit(formSearchValue.unitNew);
    this.transferDTO.successDay = formSearchValue.succeeDay;

  }

  findUnit(id: any) {
    return this.unitData.find(unit => {
      return unit.id == id;
    })
  }

  togger() {
    this.showHiden = !this.showHiden;
  }

  sort() {
    this.sortBy = this.formSort.value.typeSort;
    this.descAsc == 'asc' ? this.descAsc = 'desc' : this.descAsc = 'asc';
    this.pagination(this.indexPage);
  }


  sortByValues(transferName: string) {
    this.sortBy = transferName;
    this.descAsc = this.descAsc == 'desc'?'asc':'desc';
    this.pagination(this.indexPage);
  }
}
