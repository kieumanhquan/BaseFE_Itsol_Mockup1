import {Component, OnInit} from '@angular/core';
import {TransferService} from "../../../../services/TransferService";
import {SortMultileColumm, Transfer, TransferDTO, Unit, User} from "../../employee/employee.model";
import {HttpErrorResponse} from "@angular/common/http";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
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
  formTransfer: FormGroup;
  formUpdateTransfer: FormGroup;
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
  transferDTO: TransferDTO ={};
  showHiden = false;
  formSort: FormGroup;
  sortBy: string;
  descAsc: string = 'desc'
  size = 5;
  showLoader: boolean = false;

  constructor(
    private transferService: TransferService,
    private unitService: UnitService,
    private userService: UserService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private readonly router: Router,
    private sessionService: SessionService,
    private profileService: ProfileService,
    config: NgbModalConfig,
  ) {
  }

  //open modal create
  openLg(content, id: any) {
    this.getUserById(id);

    this.findUnitNotJoinUser(id);
    this.modalService.open(content, {size: 'lg', centered: true, scrollable: true});
  }


  ngOnInit(): void {
   this.transferDTO.sortMultileColummList = [];
    this.getAllTransfer();
    this.getByUserName();
    this.initForm();
    this.finAllUnit();
    this.initFormSearch();



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

  public finAllUnit(){
    this.unitService.findAllUnit().subscribe(res=>{
      this.unitData = res;
    })
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
    this.transferService.createTransfer(this.transfer).subscribe(res => {
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

  checkConFirmTranfer() {
    if (this.transfer.isStatusOld == null) {
      this.transfer.status = 2;
    } else {
      this.transfer.status = 1;
    }
  }

  checkRefuseTranfer() {
    const jwt = this.userService.getDecodedAccessToken();
    let role = jwt.auth.split(',');
    if (role.includes('ROLE_ADMIN')) {
      this.transfer.status = 5;
    } else if (this.transfer.isStatusOld == null) {
      this.transfer.status = 5;
      this.transfer.isStatusOld = 1;
    } else if (this.transfer.isStatusNew == null) {
      this.transfer.status = 5;
      this.transfer.isStatusNew = 1;
    }
  }


  confirmTransfer() {
    this.checkConFirmTranfer();
    this.transferService.updateTransfer(this.transfer).subscribe(res => {
      this.toastr.success('Cập nhật thành công')
    }, error => {
      this.toastr.error(error.message())
    });
  }



  //Phân trang

  //chuyển trang edit
  sentoUpdate(id:number){
    const url = '/home/update-transfer/' + id;
    this.router.navigate([url]);
  }
  //chuyen trang list
  sentolist(id:number){
    const url = '/home/transfer';
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
    console.log(this.transferDTO);
    this.indexPage = page
    this.transferService.getPageTransfer(this.indexPage, this.userId,this.size
      , this.transferDTO)
      .subscribe(res => {
        this.transferList = res.object.content;
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
    this.initFormSearch();
    this.pagination(0);
    this.togger();
  }

  updateTransferSearch() {
    const formSearchValue = this.formSearch.value;
    this.transferDTO.name = formSearchValue.name;
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

  sortByValue(sortValues:string){
    const length = this.transferDTO.sortMultileColummList.length;
    const sortValue:SortMultileColumm = {name:sortValues, type:"desc"}
    if(!length){
      const sortValue:SortMultileColumm = {name:sortValues, type:"desc"}
      this.transferDTO.sortMultileColummList.push(sortValue)
    }else {
      let notContacts = true;
      this.transferDTO.sortMultileColummList.forEach(value => {
        if(value.name == sortValues){
          value.type = value.type == 'desc'?'asc':'desc';
          notContacts = false;
        }
      })
      if(notContacts){
        this.transferDTO.sortMultileColummList.push(sortValue)
      }
    }
    this.pagination(this.indexPage);
  }


  pageItem(pageItems){
    this.size = pageItems;
    this.indexPage = 0;
    this.pagination(this.indexPage);
  }
  haha(){
    this.showLoader = true;
  }
}
