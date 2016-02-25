import { Component,
         Output,
         OnInit,
         EventEmitter }                      from 'angular2/core';

import { CrudListingSelector }               from '../../rest/crudlistingview.component';

import { GraylogQueryConfigListingContext,
         QueryConfigListing }                from '../queryconfiglisting.component';

import { GraylogQueryService }               from './graylogqueryconfig.service';
import { GraylogQueryView }                  from './graylogqueryconfig.component';
import { GraylogQueryConfig }                from './graylog.interface';

@Component({
  selector: 'graylog-query-config-selector',
  providers: [GraylogQueryService, GraylogQueryConfigListingContext],
  directives: [GraylogQueryView, CrudListingSelector],
  properties: ['listingContext.selectedEntity:entity'],
  templateUrl: 'app/shared/logmanager/graylog/graylogqueryconfigselector.component.html'
})
export class GraylogQueryConfigSelector extends QueryConfigListing
                                        implements OnInit {

  _original: GraylogQueryConfig = null;

  @Output() entityChosen: EventEmitter<GraylogQueryConfig> = new EventEmitter<GraylogQueryConfig>();
  @Output() canceled: EventEmitter<GraylogQueryConfig> = new EventEmitter<GraylogQueryConfig>();

  constructor(protected listingContext: GraylogQueryConfigListingContext) {
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