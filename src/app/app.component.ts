import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
declare const Pusher: any;
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  pusher: any;
  channel: any;
  lengthKeyId = 8;
  timestampKey: any;
     
     
  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
    public localNotifications: LocalNotifications,
    private uniqueDeviceID: UniqueDeviceID) {
    this.timestampKey = +new Date;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.pusher = new Pusher("7df41268e3e1e164cb73", {
          cluster: "eu",
          encrypted: true
        });
      this.uniqueDeviceID.get().then((uuid: any)=>{
        this.channel = this.pusher.subscribe(uuid);
        this.channel.bind('Event',data=>{
          
          this.localNotifications.schedule({
            id: this.generate(),
             text: data.message,
             led: 'FF0000',
             foreground: true
          });
        });
      }).catch((error:any)=>{
        // this.pusher = new Pusher("7df41268e3e1e164cb73", {
        //   cluster: "eu",
        //   encrypted: true
        // });
        // console.log('message');
     
        // this.channel = this.pusher.subscribe('vuong1');
        // this.channel.bind('Event',data=>{
        //   console.log(data);
        //   this.localNotifications.schedule({
        //     id: this.generate(),
        //      text: data.message,
        //      led: 'FF0000',
        //      sound: this.setSound(),
        //      foreground: true,
        //   });
        // });
      });
    }).catch((error: any)=>{
       
      
      
    });
  }
  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/Rooster.mp3'
    } else {
      return 'file://assets/sounds/Rooster.caf'
    }
  }

  _getRandomInt( min, max ) {
      return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  }
 
  generate() {
   let ts = this.timestampKey.toString();
   let parts = ts.split( "" ).reverse();
   let id = '';
   
   for( var i = 0; i < this.lengthKeyId; ++i ) {
    var index = this._getRandomInt( 0, parts.length - 1 );
    id += parts[index];   
   }
   
   return parseInt(id);
 }
}

