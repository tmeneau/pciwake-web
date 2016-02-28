import { Component, Injectable}         from "angular2/core";

import { AbstractCrudListingViewContext,
         CrudListingView,
         CrudListingSelector }          from '../../rest/crudlistingview.component';

import { NotificationStrategy }         from './notificationstrategy.interface';
import { NotificationStrategyView }     from "./notificationstrategyview.component";
import { NotificationStrategyService }  from "./notificationstrategy.service";

@Injectable()
export class NotificationStrategyListingContext
             extends AbstractCrudListingViewContext<NotificationStrategy> {

  constructor(protected _configService: NotificationStrategyService) {
    super();
  }

  getCrudService(): NotificationStrategyService {
    return this._configService;
  }

  newEntity(): NotificationStrategy {
      return new NotificationStrategy();
  }

  entityTypeName(): string {
    return "SMTP Configuration"
  }
}

@Component({
  selector: 'smtp-config-listings',
  providers: [NotificationStrategyService, NotificationStrategyListingContext],
  directives: [NotificationStrategyView, CrudListingSelector],
  templateUrl: 'app/shared/failurestrategy/notification/notificationstrategylisting.component.html',
})
export class NotificationStrategyListing extends CrudListingView<NotificationStrategy> {
  constructor(public listingContext: NotificationStrategyListingContext) {
    super(listingContext);
  }
}