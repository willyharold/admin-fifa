import { Component } from '@angular/core';
import { NotificationService } from './services/notification.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    message: any;
    constructor(
        public not: NotificationService,
    ) {
    }

}
