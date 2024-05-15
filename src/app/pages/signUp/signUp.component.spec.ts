import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Importe ReactiveFormsModule para utilizar FormGroup e outros recursos de formulário
import { SignUpComponent } from './signUp.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent], // Adicione SignUpComponent aos declarations
      imports: [ReactiveFormsModule] // Adicione ReactiveFormsModule aos imports
    }).compileComponents();
    
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
