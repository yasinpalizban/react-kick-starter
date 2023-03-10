import { notification } from '../actions/header.actions';
import Pusher from 'pusher-js';
import { NotificationType } from '../enums/notification.enum';
import {environment} from "../../../environments/environment";
export default class HeaderService {
  private subscription: any[];
  private pusher: any;
  private notificationChannel: any;
  private pvChannel: any;
  private roomChannel: any;

  constructor() {
    this.subscription=[];
    try {
      this.pusher = new Pusher(environment.pusher.key, {
        cluster: environment.pusher.cluster,
        forceTLS: true
      });
      this.subscription.push(this.notificationChannel = this.pusher.subscribe('notification-channel'));
      this.notificationChannel.bind('my-event', (notify:any) => {
        //notification(notify);
      });
    } catch (e) {
    }
  }

  checkNotification() {
    const url = window.location.pathname;
    if (url.indexOf('chat') > 0) {
      return;
    }
    try {
      this.subscription.push(this.pvChannel = this.pusher.subscribe('pv-channel'));
      this.pvChannel.bind('my-event', () => {
        const notify = {
          type: NotificationType.newChat,
          counter: 1,
          message: ' you got message  private chats',
          date: new Date('Y-m-d H:i:s')

        };
       // notification(notify)
      });

      this.subscription.push(this.roomChannel = this.pusher.subscribe('room-channel'));
      this.roomChannel.bind('my-event', () => {
        const notify = {
          type: NotificationType.newChatRoom,
          counter: 1,
          message: ' you got message  chatRoom',
          date: new Date('Y-m-d H:i:s')
        };
        //notification(notify);
      });
    } catch (e) {

    }

  }


  unsubscribe(){
    this.subscription.forEach(sub=>sub());
  }
}