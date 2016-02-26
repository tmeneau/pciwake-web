import { Component, Injectable }      from "angular2/core";

import { AbstractCrudListingViewContext,
         CrudListingView,
         CrudListingSelector }        from '../rest/crudlistingview.component';

import { ConnectionConfigView }       from "./connectionconfig.component";
import { ConnectionConfigService }    from "./connectionconfig.service";
import { ConnectionConfig }           from "./logmanager.interface";


@Injectable()
export class ConnectionConfigListingContext
             extends AbstractCrudListingViewContext<ConnectionConfig> {

  constructor(protected _configService: ConnectionConfigService) {
    super();
  }

  getCrudService(): ConnectionConfigService {
    return this._configService;
  }

  newEntity(): ConnectionConfig {
      return new ConnectionConfig();
  }

  entityTypeName(): string {
    return "Connection Configuration"
  }
}

@Component({
  selector: 'connection-config-listing',
  providers: [ConnectionConfigService, ConnectionConfigListingContext],
  directives: [ConnectionConfigView, CrudListingSelector],
  templateUrl: 'app/shared/logmanager/connectionconfiglisting.component.html',
})
export class ConnectionConfigListing extends CrudListingView<ConnectionConfig> {
  constructor(public listingContext: ConnectionConfigListingContext) {
    super(listingContext);
  }
}