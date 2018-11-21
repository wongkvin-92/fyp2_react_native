import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS } from 'react-native';
import {UserAPI} from "../API";

const configure = (sharedObj) => {
 PushNotification.configure({
   senderID: "144006346881",

   onRegister: function(token) {
       console.log( 'TOKEN:', token );
       //process token
       sharedObj.token = token;
       new UserAPI().registerToken(token, ()=> {console.log("Successfully registered token"); });
   },

   onNotification: function(notification) {
     // process the notification
     // required on iOS only
    /*if(sharedObj.hasOwnProperty("onNotification")) {
       sharedObj.onNotification(notification);
     }*/
     if(sharedObj.hasOwnProperty("events")){
       let func_names = Object.keys(sharedObj.events);
       func_names.forEach(name => sharedObj['events'][name](notification));
     }
     //console.log("sharedObj", sharedObj);
     notification.finish(PushNotificationIOS.FetchResult.NoData);
   },

// IOS ONLY (optional): default: all - Permissions to register.
   permissions: {
     alert: true,
     badge: true,
     sound: true
   },
   // Should the initial notification be popped automatically
      // default: true
   popInitialNotification: true,
   /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
   requestPermissions: true
 });


PushNotificationIOS.addEventListener('registrationError', console.log);
 console.log("Done configuring", PushNotification);
};


const localNotification = () => {
 PushNotification.localNotification({
   autoCancel: true,
   largeIcon: "ic_launcher",
   smallIcon: "ic_notification",
   bigText: "My big text that will be shown when notification is expanded",
   subText: "This is a subText",
   color: "green",
   vibrate: true,
   vibration: 300,
   title: "Notification Title",
   message: "Notification Message",
   playSound: true,
   soundName: 'default',
   actions: '["Accept", "Reject"]',

   /* iOS only properties */
      alertAction: 'view', // (optional) default: view
      category: 'null', // (optional) default: null
      userInfo: {}, // (optional) default: null (object containing additional notification data)

      number: 10 // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)

 });
};

const checkPermissions = (e) =>{
  PushNotification.checkPermissions(e);
};

export {
 configure, localNotification, checkPermissions
};
