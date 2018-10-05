import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainBuilderComponent } from './chain-builder.component';

describe('ChainBuilderComponent', () => {
  let component: ChainBuilderComponent;
  let fixture: ComponentFixture<ChainBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
