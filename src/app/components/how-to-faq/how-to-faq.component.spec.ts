import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToFaqComponent } from './how-to-faq.component';

describe('HowToFaqComponent', () => {
  let component: HowToFaqComponent;
  let fixture: ComponentFixture<HowToFaqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowToFaqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
