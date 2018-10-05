import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
declare var PDK:any;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { NotificationsService  } from 'angular2-notifications';
declare var $:any;

@Component({
  selector: 'detail-popup',
  templateUrl: 'detail-popup.component.html',
  styleUrls: ['./detail-popup.component.css']
})

export class DetailPopupComponent implements OnInit {
  dialogReference:any;
  public apiUrl = environment.apiUrl;
  constructor(
    private notificationService: NotificationsService,
    private authService: AuthService,
    public cookie: CookieService,
    private http: HttpClient,
    public dialogRef: MatDialogRef<DetailPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    	this.dialogReference = dialogRef;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){    
    console.log(this.data);
    $("mat-dialog-container").css('max-height', window.innerHeight - 100);
    $("mat-dialog-container").css('overflow-y', 'scroll');
  }

  loginWithPinterest(){
  	const that = this;
  	PDK.login({scope: 'read_public'}, (response:any) => {
  	  PDK.me(function(response){
        that.http.post(that.apiUrl+'/api/users/pinterest', { name: response.data.first_name+" "+response.data.last_name, pinterest_id: response.data.id })
        .subscribe( (success:any) => {
            that.authService.setUser(success.created);
            PDK.logout();
            that.dialogReference.close();
            that.notificationService.success(
              'Successfully logged in using Pinterest.'
            );  
        }, (error) => {
            that.notificationService.warn(
              'Something went wrong while logging you in using Pinterest. Please try again later!'
            );
        })
      });
  	});
  }
}