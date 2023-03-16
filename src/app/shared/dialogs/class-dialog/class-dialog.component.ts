import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassesService } from '../../services/classes.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-class-dialog',
  templateUrl: './class-dialog.component.html',
  styleUrls: ['./class-dialog.component.css']
})
export class ClassDialogComponent implements OnInit {

  classForm!: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    public matDialogRef: MatDialogRef<ClassDialogComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private classesService: ClassesService
  ) { }

  ngOnInit(): void {
    // Create the form
    this.classForm = this._formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      coach_name: ['', [Validators.required]],
      timing: ['', [Validators.required]],
      price: ['', [Validators.required]],
    });
    if (this.data.class) {
      this.updateForm(this.data.class);
    }
  }

  updateForm(classObj: any): void {
    this.classForm.patchValue({
      title: classObj.title,
      description: classObj.description,
      coach_name: classObj.coach_name,
      timing: classObj.timing,
      price: classObj.price
    });
  }

  onAddClass(): void {
    this.classesService.addClass(this.classForm.value).subscribe((_data: any) => {
      this.matDialogRef.close();
      this.notify('A new Class has been added sucessfully!', 'primary')
    });
  }

  onEditClass(): void {
    this.classesService.updateClass(this.classForm.value, this.data.class.id).subscribe(data => {
      this.matDialogRef.close();
      this.notify(`Class ${this.data.class.title} has been updated sucessfully!`, 'primary')
    });
  }

  private notify(msg: string, msgColor: string): void {
    this._snackBar.open(msg, '', {
      panelClass: ['mat-toolbar', msgColor],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 7000,

    });
  }

}
