import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientsService } from '../../services/clients.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.css']
})
export class ClientDialogComponent implements OnInit {

  clientForm!: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    public matDialogRef: MatDialogRef<ClientDialogComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientsService: ClientsService
  ) { }

  ngOnInit(): void {
    // Create the form
    this.clientForm = this._formBuilder.group({
      fullName: ['', [Validators.required]],
      mobile_number: ['', [Validators.required]],
      address: ['', [Validators.required]],
      subscription_plan: ['', [Validators.required]],
    });
    if (this.data.client) {
      this.updateForm(this.data.client);
    }
  }

  onAddClient() {
    this.clientsService.addClient(this.clientForm.value).subscribe(data => {
      this.matDialogRef.close();
      this.notify('A new client has been added sucessfully!', 'primary')
    });
  }

  onEditClient() {
    this.clientsService.updateClient(this.clientForm.value, this.data.client.id).subscribe(data => {
      this.matDialogRef.close();
      this.notify(`Client ${this.data.client.full_name} has been updated sucessfully!`, 'primary')
    });
  }

  updateForm(client: any): void {
    this.clientForm.patchValue({
      fullName: client.full_name,
      mobile_number: client.mobile_number,
      address: client.address,
      subscription_plan: client.subscription_plan
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
