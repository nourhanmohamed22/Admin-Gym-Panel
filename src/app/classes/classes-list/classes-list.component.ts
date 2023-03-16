import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClassesService } from 'src/app/shared/services/classes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClassDialogComponent } from 'src/app/shared/dialogs/class-dialog/class-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.css']
})
export class ClassesListComponent implements AfterViewInit, OnInit {

  classes: any[] = [];
  classesTableColumns: string[] = ['title', 'description', 'coach_name', 'timing', 'price', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private _matDialog: MatDialog,
    private classesService: ClassesService,
    private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
    this.getClientsList();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getClientsList(): void {
    this.classesService.listclasses().subscribe((data: any[]) => {
      this.dataSource.data = data;
    });
  }

  openClassDialog(buttonType: string, classObj?: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      buttonType: buttonType,
      class: classObj
    };
    // Open the dialog
    const dialogRef = this._matDialog.open(ClassDialogComponent, dialogConfig);
    dialogConfig.width = '40vw';
    dialogRef.afterClosed()
      .subscribe((result) => {
        console.log('Class dialog was closed!');
      });
  }

  onDeleteClass(classObj: any): void {
    this.classesService.deleteClass(classObj.id).subscribe((_data: any) => {
      this.notify(`Class ${classObj.title} has been deleted successfully!`, 'primary');
    });
  }

  private notify(msg: string, msgColor: string): void {
    this._snackBar.open(msg, '', {
      panelClass: ['mat-toolbar', msgColor],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 8000
    });
  }

}
