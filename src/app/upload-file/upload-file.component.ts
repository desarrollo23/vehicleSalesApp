import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { ApiHttpService } from "../services/ApiHttpService";
import { CommonService } from "../services/common.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  updateTable: boolean = false;
  public loading = false;

  constructor( 
    private ApiHttpService: ApiHttpService, 
    private commonService: CommonService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    
  }

  uploadFile(files:FileList | null): void {

    this.commonService.notifyOther({option: 'call_loader', value: 'show'});

    if(files !== undefined && files !== null)
    {
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);

      this.ApiHttpService.post('https://localhost:44360/api/upload-file', formData)
      .subscribe( 
        data => {
          this.commonService.notifyOther({option: 'call_update_table', value: 'update'});
          this.commonService.notifyOther({option: 'call_loader', value: 'hide'});
          
          this.toastr.success("The data was uploaded successfully");
        },
        error => this.toastr.error("An error has ocurred")
      );
      
    }
  }
}
