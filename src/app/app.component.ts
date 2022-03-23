import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from "RxJs";
import { CommonService } from "./services/common.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loading:boolean = false;
  private subscription: Subscription = new Subscription;

  constructor(private commonService: CommonService, private toastr: ToastrService) {}

  ngOnDestroy(): void {
   
  }

  ngOnInit(): void {
    
    this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
      if (res.hasOwnProperty('option') && res.option === 'call_loader') {
        
          if(res.value === 'show')
            this.loading = true;
          else if(res.value === 'hide')
            this.loading = false;
      }
    });
  }
}
