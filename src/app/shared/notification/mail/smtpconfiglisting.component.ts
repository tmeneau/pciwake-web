import { Component, Injectable}       from "angular2/core";

import { AbstractCrudListingViewContext,
         CrudListingView,
         CrudListingSelector }        from '../../rest/crudlistingview.component';

import { SmtpConfig }                 from './mail.interface';
import { SmtpConfigView }             from "./smtpconfigview.component";
import { SmtpConfigService }          from "./smtpconfig.service";

@Injectable()
export class SmtpConfigListingContext
             extends AbstractCrudListingViewContext<SmtpConfig> {

  constructor(protected _configService: SmtpConfigService) {
    super();
  }

  getCrudService(): SmtpConfigService {
    return this._configService;
  }

  newEntity(): SmtpConfig {
      return new SmtpConfig();
  }

  entityTypeName(): string {
    return "SMTP Configuration"
  }
}

@Component({
  selector: 'smtp-config-listings',
  providers: [SmtpConfigService, SmtpConfigListingContext],
  directives: [SmtpConfigView, CrudListingSelector],
  templateUrl: 'app/shared/notification/smtp/smtpconfiglisting.component.html',
})
export class SmtpConfigListing extends CrudListingView<SmtpConfig> {
  constructor(protected listingContext: SmtpConfigListingContext) {
    super(listingContext);
  }
}