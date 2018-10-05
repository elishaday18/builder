import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
declare var PDK:any;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { NotificationsService  } from 'angular2-notifications';

@Component({
  selector: 'login-modal',
  templateUrl: 'login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})

export class LoginModalComponent {
  dialogReference:any;
  public apiUrl = environment.apiUrl;
  constructor(
    private notificationService: NotificationsService,
    private authService: AuthService,
    public cookie: CookieService,
    private http: HttpClient,
    public dialogRef: MatDialogRef<LoginModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    	this.dialogReference = dialogRef;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){    
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