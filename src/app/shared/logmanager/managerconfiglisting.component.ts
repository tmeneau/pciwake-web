import { Component, Injectable}       from "angular2/core";

import { AbstractCrudListingViewContext,
         CrudListingView,
         CrudListingSelector }        from '../rest/crudlistingview.component';

import { GraylogClientConfig }        from './graylog/graylog.interface';
import { GraylogConfigView }          from "./graylog/graylogconfigview.component";
import { GraylogConfigService }       from "./graylog/graylogclientconfig.service";
import { LogManagerClientConfig }     from "./logmanager.interface";

@Injectable()
export class GraylogClientConfigListingContext
             extends AbstractCrudListingViewContext<GraylogClientConfig> {

  constructor(protected _configService: GraylogConfigService) {
    super();
  }

  getCrudService(): GraylogConfigService {
    return this._configService;
  }

  newEntity(): GraylogClientConfig {
      return new GraylogClientConfig();
  }

  entityTypeName(): string {
    return "Log Manager Configuration"
  }
}

@Component({
  selector: 'logmanager-config-listings',
  providers: [GraylogConfigService, GraylogClientConfigListingContext],
  directives: [GraylogConfigView, CrudListingSelector],
  templateUrl: 'app/shared/logmanager/managerconfiglisting.component.html',
})
export class LogManagerConfigListing extends CrudListingView<GraylogClientConfig> {
  constructor(public listingContext: GraylogClientConfigListingContext) {
    super(listingContext);
  }
}