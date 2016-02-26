import { Component,
         Output,
         OnInit,
         EventEmitter }                      from 'angular2/core';

import { CrudListingSelector }               from '../rest/crudlistingview.component';

import { ConnectionConfigListingContext,
         ConnectionConfigListing }           from './connectionconfiglisting.component';

import { ConnectionConfigService }           from './connectionconfig.service';
import { ConnectionConfigView }              from './connectionconfig.component';
import { ConnectionConfig }                  from './logmanager.interface';

@Component({
  selector: 'connection-config-selector',
  providers: [ConnectionConfigService, ConnectionConfigListingContext],
  directives: [ConnectionConfigView, CrudListingSelector],
  properties: ['listingContext.selectedEntity:entity'],
  templateUrl: 'app/shared/logmanager/connectionconfigselector.component.html'
})
export class ConnectionConfigSelector extends ConnectionConfigListing
                                      implements OnInit {

  _original: ConnectionConfig = null;

  @Output() entityChosen: EventEmitter<ConnectionConfig> = new EventEmitter<ConnectionConfig>();
  @Output() canceled: EventEmitter<ConnectionConfig> = new EventEmitter<ConnectionConfig>();

  constructor(public listingContext: ConnectionConfigListingContext) {
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