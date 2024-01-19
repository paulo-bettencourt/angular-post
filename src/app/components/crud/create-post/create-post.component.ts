import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'angular-post-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styles: ``,
})
export default class CreatePostComponent {
  fb = inject(FormBuilder);
  createPostForm = this.fb.group({
    author: [''],
    title: ['', Validators.required],
    description: ['', Validators.required],
    youtubeId: ['', Validators.required],
  });

  onSubmit() {
    console.log('on submit');
  }
}
