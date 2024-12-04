import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PressService } from '../services/press/press.service';

@Component({
  selector: 'app-press-form',
  templateUrl: './press-form.component.html',
  styleUrls: ['./press-form.component.scss'],
})
export class PressFormComponent implements OnInit {
  pressForm!: FormGroup;
  pressInfo: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private press: PressService,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<PressFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
    this.pressForm = this._formBuilder.group({
      urlTitle: [''],
      title: [''],
      description: [''],
      content: [''],
      metaTitle: [''],
      metaDescr: [''],
      metaKeywords: [''],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.pressForm.patchValue(this.data);
      this.pressInfo = true;
    }
  }

  submitPress() {
    // Check if the form is valid and data is present
    if (this.pressForm.valid) {
      if (this.pressInfo) {
        // For updating form
        const pressId = this.data._id;

        this.press.editPress(pressId, this.pressForm.value).subscribe({
          next: (val: any) => {
            this._snackBar.open('Press Updated Successfully', 'Close', {
              duration: 3000,
            });
          },
          error: (err: any) => {
            console.error('Error updating Press:', err);
            this._snackBar.open('Error updating Press', 'Close', {
              duration: 3000,
            });
          },
        });
      } else {
        // For adding new data
        this.press.addPress(this.pressForm.value).subscribe({
          next: (val: any) => {
            this._snackBar.open('Press Submitted Successfully', 'Close', {
              duration: 3000,
            });
          },
          error: (err: any) => {
            console.error('Error submitting Press:', err);
            this._snackBar.open('Error submitting form', 'Close', {
              duration: 3000,
            });
          },
        });
      }
    } else {
      this._snackBar.open('Please fill the form correctly', 'Close', {
        duration: 3000,
      });
    }
  }
}
