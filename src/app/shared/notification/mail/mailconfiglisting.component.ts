import { Component, Injectable }      from "angular2/core";

import { AbstractCrudListingViewContext,
         CrudListingView,
         CrudListingSelector }        from '../../rest/crudlistingview.component';

import { MailConfigView }             from "./mailconfigview.component";

import { MailConfigService }          from "./mailconfig.service"
import { MailConfig }                 from "./mail.interface";


@Injectable()
export class MailConfigListingContext
             extends AbstractCrudListingViewContext<MailConfig> {

    constructor(protected _configService: MailConfigService) {
      super();
    }

    getCrudService(): MailConfigService {
      return this._configService;
    }

    newEntity(): MailConfig {
        return new MailConfig();
    }

    entityTypeName(): string {
      return "Mail Notification Configuration"
    }
}

@Component({
  selector: 'mail-config-listings',
  providers: [MailConfigService, MailConfigListingContext],
  directives: [MailConfigView, CrudListingSelector],
  templateUrl: 'app/shared/notification/mail/mailconfiglisting.component.html'
})
export class MailConfigListing extends CrudListingView<MailConfig> {
  constructor(protected listingContext: MailConfigListingContext) {
    super(listingContext);
  }
}