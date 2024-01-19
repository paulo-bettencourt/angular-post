import { Component, Injector, inject } from '@angular/core';
import {
  CommonModule,
  NgComponentOutlet,
  NgTemplateOutlet,
} from '@angular/common';
import { Validators } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'angular-post-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgTemplateOutlet],
  templateUrl: './create-post.component.html',
  styles: ``,
})
export default class CreatePostComponent {
  dbService = inject(DatabaseService);
  fb = inject(FormBuilder);
  formInjector!: Injector;
  createPostForm = this.fb.nonNullable.group({
    author: ['1234', Validators.required],
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    youtubeId: [''],
  });
  isSubmitted = false;

  onSubmit() {
    console.log('on submit: ', typeof this.createPostForm.getRawValue());
    this.dbService.writePost(this.createPostForm.getRawValue());
    this.isSubmitted = true;
  }
}
