import { Component,
         Output,
         OnInit,
         EventEmitter }                       from 'angular2/core';

import { CrudListingSelector }                from '../../rest/crudlistingview.component';

import { NotificationStrategyListingContext,
         NotificationStrategyListing }        from './notificationstrategylisting.component';

import { NotificationStrategyService }        from './notificationstrategy.service';
import { NotificationStrategyView }           from './notificationstrategyview.component';
import { NotificationStrategy }               from './notificationstrategy.interface';

@Component({
  selector: 'smtp-config-selector',
  providers: [NotificationStrategyService, NotificationStrategyListingContext],
  directives: [NotificationStrategyView, CrudListingSelector],
  properties: ['listingContext.selectedEntity:entity'],
  templateUrl: 'app/shared/failurestrategy/notification/notificationstrategyselector.component.html'
})
export class NotificationStrategySelector extends NotificationStrategyListing
                                implements OnInit {

  _original: NotificationStrategy = null;

  @Output() entityChosen: EventEmitter<NotificationStrategy> = new EventEmitter<NotificationStrategy>();
  @Output() canceled: EventEmitter<NotificationStrategy> = new EventEmitter<NotificationStrategy>();

  constructor(public listingContext: NotificationStrategyListingContext) {
    super(listingContext);
  }

  ngOnInit() {
    this._original = this.listingContext.selectedEntity;
  }

  cancel() {
    this.listingContext.selectedEntity = this._original;
    this.canceled.next(this._original);
  }
}