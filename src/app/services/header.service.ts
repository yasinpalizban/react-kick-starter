import {notification} from '../actions/header.actions';
import Pusher from 'pusher-js';
import {NotificationType} from '../enums/notification.enum';
import {environment} from "../../environments/environment";
import {initStore} from "../../index";
import {INotification} from "../interfaces/notification.interface";
import {IReduxDispatch} from "../interfaces/redux.type.interface";
import {PusherEvent} from "pusher-js/types/src/core/connection/protocol/message-types";

export default class HeaderService {
    private subscription: any[];
    private pusher: any;
    private notificationChannel: any;
    private pvChannel: any;
    private roomChannel: any;

    constructor() {
        this.subscription = [];
        try {
            this.pusher = new Pusher(environment.pusher.key, {
                cluster: environment.pusher.cluster,
                forceTLS: true
            });
            this.subscription.push(this.notificationChannel = this.pusher.subscribe('notification-channel'));
            this.notificationChannel.bind('my-event', (notify: INotification) => {
                // @ts-ignore
                initStore.dispatch((dispatch: any) => notification(notify, dispatch));
            });
        } catch (e) {
        }
    }

    checkNotification() {
        const url = window.location.pathname;
        if (url.indexOf('chat') > 0) {
            return;
        }
        return;
        try {
            this.subscription.push(this.pvChannel = this.pusher.subscribe('pv-channel'));
            this.pvChannel.bind('my-event', () => {
                const notify: INotification = {
                    type: NotificationType.newChat,
                    counter: 1,
                    message: ' you got message  private chats',
                    date: new Date('Y-m-d H:i:s').toString()

                };
                // @ts-ignore
                initStore.dispatch((dispatch: IReduxDispatch) => notification(notify, dispatch));

            });

            this.subscription.push(this.roomChannel = this.pusher.subscribe('room-channel'));
            this.roomChannel.bind('my-event', () => {
                const notify: INotification = {
                    type: NotificationType.newChatRoom,
                    counter: 1,
                    message: ' you got message  chatRoom',
                    date: new Date('Y-m-d H:i:s').toString()
                };
                // @ts-ignore
                initStore.dispatch((dispatch: IReduxDispatch) => notification(notify, dispatch));

            });
        } catch (e) {

        }

    }

    getSubscribe(): any {
        return this.subscription;
    }

    unSubscribe(): void {
        this.subscription.forEach(sub => sub.unsubscribe());
    }
}