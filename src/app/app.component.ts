import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
declare var $ :any;
import { MediaService } from './services/media.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {LoginModalComponent} from './components/login-modal/login-modal.component';
import { AuthService } from './services/auth.service';
import { NotificationsService  } from 'angular2-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ MediaService ]
})
export class AppComponent {
  mobileQuery: MediaQueryList;
  public user:any;

  public options = {
      position: ["top", "left"],
      timeOut: 3000
  };


  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(private notificationService: NotificationsService, private authService: AuthService, public dialog: MatDialog, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private mediaService: MediaService, private router: Router) {
    const that = this;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.authService.nameChanged.subscribe( (user:any) => {
      that.user = user;
    });
  }

  logout(){
    this.authService.removeUser();
  
    this.notificationService.success(
      'Successfully logged out.'
    );  
  }

  ngOnInit(){    
    this.user = this.authService.getUser();
  }

  openLoginModal(){
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '250px',
      data: null
    });
  }

  openInspireMe(){
    this.router.navigate(['/inspire-me']);
  }

  openFaq(){
    this.router.navigate(['/faq']);   
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  title = 'builder';
}
