import { TransferUpdateComponent } from './../../../home/transfers/transfer-update/transfer-update.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('TransferUpdateComponent', () => {
  let component: TransferUpdateComponent;
  let fixture: ComponentFixture<TransferUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferUpdateComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
