import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PressService } from '../services/press/press.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PressFormComponent } from '../press-form/press-form.component';

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.scss'],
})
export class PressComponent implements OnInit {
  displayedColumns: string[] = [
    'srno',
    'date',
    'title',
    'description',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private press: PressService,
    private _snackBar: MatSnackBar,
  ) {}

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(PressFormComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCuriotoryPress();
        }
      },
    });
  }

  ngOnInit(): void {
    this.getCuriotoryPress();
  }

  getCuriotoryPress() {
    this.press.getAllPress().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(PressFormComponent, {
      data,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCuriotoryPress();
        }
      },
    });
  }

  deleteEntry(id: any) {
    console.log(id);
    const confirmDelete = window.confirm(
      'Do you want to delete this entry, Please Comfirm'
    );
    if (confirmDelete) {
      this.press.deletePress(id).subscribe({
        next: (val: any) => {
          this._snackBar.open('Data Delete Successfully', 'Close', {
            duration: 3000,
          });
          window.location.reload();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
      this.getCuriotoryPress();
    }
  }

}
