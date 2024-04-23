import { Component, Injector, OnInit, inject } from '@angular/core';
import {
  CommonModule,
  NgComponentOutlet,
  NgTemplateOutlet,
} from '@angular/common';
import { Validators } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database/database.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'angular-post-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgTemplateOutlet],
  templateUrl: './create-post.component.html',
  styles: ``,
})
export default class CreatePostComponent implements OnInit {
  dbService = inject(DatabaseService);
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  formInjector!: Injector;
  createPostForm = this.fb.nonNullable.group({
    author: [''],
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    youtubeId: [''],
  });
  isSubmitted = false;

  ngOnInit(): void {
    const userEmail = this.authService.getUserEmail();
    console.log('e-mail do utilizador: ', userEmail);
    this.createPostForm.controls['author'].setValue(userEmail);
  }

  onSubmit() {
    console.log('on submit: ', this.createPostForm.getRawValue());
    this.dbService.writePost(this.createPostForm.getRawValue());
    this.isSubmitted = true;
  }
}
