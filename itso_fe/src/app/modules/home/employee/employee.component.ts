import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from "./employee.model";
import {EmployeeService} from "./employee.service";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'ngx-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [NgbModalConfig, NgbModal],
  // encapsulation: ViewEncapsulation.None,
})
export class EmployeeComponent implements OnInit {
  // closeResult: string;
  datas: User[]=[];
  constructor(
    private employeeService: EmployeeService,
    private modalService: NgbModal,
    private  toastr: ToastrService,
    config: NgbModalConfig
    ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.employeeService.getAll().subscribe((res:any)=>{

      this.datas = res;

    })
  }


}
