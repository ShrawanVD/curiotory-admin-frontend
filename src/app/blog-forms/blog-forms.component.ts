import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BlogService } from '../services/blogs/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-forms',
  templateUrl: './blog-forms.component.html',
  styleUrls: ['./blog-forms.component.scss']
})
export class BlogFormsComponent implements OnInit{
  blogForm!: FormGroup;
  blogInfo: boolean = false;

  constructor(private _formBuilder: FormBuilder,private curiotoryBlog:BlogService,private _snackBar: MatSnackBar,private _fb: FormBuilder, private _dialogRef: MatDialogRef<BlogFormsComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private router: Router){
    this.blogForm = this._formBuilder.group({
      urlTitle: [''],
      title: [''],
      content: [''],
      intro: [''],
      imageUrl: [''],
      alt:[''],
      metaTitle: [''],
      metaDescr: [''],
      metaKeywords: [''],
    });
  }

  ngOnInit(): void {
    if(this.data){
      this.blogForm.patchValue(this.data);
      this.blogInfo = true;
    }
    
  }


  submitBlogs() {
    // Check if the form is valid and data is present
    if (this.blogForm.valid) {
      if (this.blogInfo) {
        // For updating form
        const blogId = this.data._id;

        this.curiotoryBlog.patchCuriotoryBlog(blogId, this.blogForm.value).subscribe({
          next: (val: any) => {
            this._snackBar.open('Blog Updated Successfully', 'Close', {
              duration: 3000,
            });
          },
          error: (err: any) => {
            console.error('Error updating blog:', err);
            this._snackBar.open('Error updating blog', 'Close', {
              duration: 3000,
            });
          }
        });
        
        
      } else {
        // For adding new data
        this.curiotoryBlog.postCuriotoryBlog(this.blogForm.value).subscribe({
          next: (val: any) => {
            this._snackBar.open('Form Submitted Successfully', 'Close', {
              duration: 3000,
            });
          },
          error: (err: any) => {
            console.error('Error submitting form:', err);
            this._snackBar.open('Error submitting form', 'Close', {
              duration: 3000,
            });
          }
        });
      }
    } else {
      this._snackBar.open('Please fill the form correctly', 'Close', {
        duration: 3000,
      });
    }
  }
  

}
