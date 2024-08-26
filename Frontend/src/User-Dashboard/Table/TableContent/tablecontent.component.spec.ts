import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablecontentComponent } from './tablecontent.component';

describe('TablecontentComponent', () => {
  let component: TablecontentComponent;
  let fixture: ComponentFixture<TablecontentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TablecontentComponent]
    });
    fixture = TestBed.createComponent(TablecontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
