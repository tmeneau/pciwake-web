import { Component,
         Injectable,
         AfterViewInit }                from "angular2/core";

import { Router,
         RouteParams }                  from "angular2/router";

import { AbstractCrudListingViewContext,
         CrudListingView,
         CrudListingSelector }          from '../rest/crudlistingview.component';

import { GraylogQueryView }             from "./graylog/graylogqueryconfig.component";
import { GraylogQueryService }          from "./graylog/graylogqueryconfig.service"
import { GraylogQueryConfig }           from "./graylog/graylog.interface";


@Injectable()
export class GraylogQueryConfigListingContext
             extends AbstractCrudListingViewContext<GraylogQueryConfig> {

    constructor(protected _configService: GraylogQueryService) {
      super();
    }

    getCrudService(): GraylogQueryService {
      return this._configService;
    }

    newEntity(): GraylogQueryConfig {
        return new GraylogQueryConfig();
    }

    entityTypeName(): string {
      return "Query"
    }
}

@Component({
  selector: 'query-config-listings',
  providers: [GraylogQueryService, GraylogQueryConfigListingContext],
  directives: [GraylogQueryView, CrudListingSelector],
  templateUrl: 'app/shared/logmanager/queryconfiglisting.component.html'
})
export class QueryConfigListing extends CrudListingView<GraylogQueryConfig> {
  constructor(protected listingContext: GraylogQueryConfigListingContext,
              routeParams?: RouteParams) {
    super(listingContext, routeParams && routeParams.get("id"));
  }

  /*
   *
   */
   ngAfterViewInit() {
     /*
      * TODO: this.listingSelector.entitySelect.subscribe((entity) =>
      * {{ insert code to update route to reflect id here }})
      * OR: figure out how to bind id to selected entity
      */
   }
}