import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateReadUpdatePostComponent } from './create-read-update-post.component';

describe('CreateReadUpdatePostComponent', () => {
  let component: CreateReadUpdatePostComponent;
  let fixture: ComponentFixture<CreateReadUpdatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateReadUpdatePostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateReadUpdatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
