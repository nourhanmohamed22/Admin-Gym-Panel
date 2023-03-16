import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientsService } from 'src/app/shared/services/clients.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClientDialogComponent } from 'src/app/shared/dialogs/client-dialog/client-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements AfterViewInit, OnInit {

  clients: any[] = [];
  clientsTableColumns: string[] = ['full_name', 'mobile_number', 'address', 'subscription_plan', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private _matDialog: MatDialog,
    private _snackBar: MatSnackBar,
    private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.getClientsList();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getClientsList(): void {
    this.clientsService.listclients().subscribe((data: any[]) => {
      this.dataSource.data = data;
    });
  }


  openClientDialog(buttonType: string, client?: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      buttonType: buttonType,
      client: client
    };
    // Open the dialog
    const dialogRef = this._matDialog.open(ClientDialogComponent, dialogConfig);
    dialogConfig.width = '40vw';
    dialogRef.afterClosed()
      .subscribe((_result: any) => {
        console.log('Client dialog was closed!');
      });
  }

  onDeleteClient(client: any) {
    this.clientsService.deleteClient(client.id).subscribe(data => {
      this.notify(`client ${client.full_name} has been deleted successfully!`, 'primary');
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

