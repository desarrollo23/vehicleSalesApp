import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiHttpService } from "../services/ApiHttpService";
import { VehicleSale } from "../model/VehicleSale";
import { Subscription } from "RxJs";
import { CommonService } from "../services/common.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy  {

  private subscription: Subscription = new Subscription;
  vehicleSales: VehicleSale[] = [];

  
  constructor(
    private ApiHttpService: ApiHttpService, 
    private commonService: CommonService,
    private toastr: ToastrService) {
   }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    console.log(':::::ON INIT::::');

    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'call_update_table') {
        
          if(res.value === 'update table')
            this.getVehicleSales();
      }
    });

    this.getVehicleSales();
  }

  getVehicleSales() {
    console.log('::::::GET VEHICLE SALES:::::');
    
    this.commonService.notifyOther({option: 'call_loader', value: 'show'});

    this.ApiHttpService.get('https://localhost:44360/api/vehicleSales')
    .subscribe( (response: any) => {
     this.vehicleSales = response.result;
     console.log(this.vehicleSales);
     this.commonService.notifyOther({option: 'call_loader', value: 'hide'});
    },
    (err: any) => {
      this.toastr.error("An error has ocurred, try refreshing the page");
      this.commonService.notifyOther({option: 'call_loader', value: 'hide'});
    })
  }
}
