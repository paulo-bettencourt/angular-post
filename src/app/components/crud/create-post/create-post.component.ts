import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
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
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    youtubeId: [''],
  });

  onSubmit() {
    console.log('on submit');
  }
}
