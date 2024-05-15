import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultSignUpLayoutComponent } from './default-signUp-layout.component';

describe('DefaultSignUpLayoutComponent', () => {
  let component: DefaultSignUpLayoutComponent;
  let fixture: ComponentFixture<DefaultSignUpLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DefaultSignUpLayoutComponent] // Declare o componente no TestBed
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultSignUpLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
