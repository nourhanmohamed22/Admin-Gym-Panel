import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/shared/services/clients.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  public clientId: any;
  public clientDetails: any;

  constructor(

    private route: ActivatedRoute,
    private clientsService: ClientsService
  ) { }
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.clientId = this.route.snapshot.paramMap.get('id');
      this.getClientDetailsById();
    }
  }

  getClientDetailsById(): void {
    this.clientsService.getclientById(this.clientId).subscribe((data: any) => {
      this.clientDetails = data;
    })
  }
}
