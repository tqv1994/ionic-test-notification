import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DomSanitizer } from '@angular/platform-browser';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Subject } from 'rxjs/Subject';
declare const Pusher: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
		url: any;
		pusher: any;
		channel: any;
    appId: string;
    public static updateData: Subject<any> = new Subject();
	  constructor(public navCtrl: NavController,private uniqueDeviceID: UniqueDeviceID,public platform: Platform,private sanitize: DomSanitizer) {
	  		
	  	  this.uniqueDeviceID.get().then((uuid: any)=>{
          this.url = sanitize.bypassSecurityTrustResourceUrl('http://tdvd.theappnow.net/Account/Login?IDApp='+uuid);
          this.appId = uuid;
        }).catch((error: any)=>{
          
        });
	  }

}
