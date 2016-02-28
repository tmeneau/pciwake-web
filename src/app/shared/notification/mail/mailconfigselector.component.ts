import { Component,
         Output,
         OnInit,
         EventEmitter }                      from 'angular2/core';

import { CrudListingSelector }               from '../../rest/crudlistingview.component';

import { MailConfigListingContext,
         MailConfigListing }                  from './mailconfiglisting.component';

import { MailConfigService }                  from './mailconfig.service';
import { MailConfigView }                     from './mailconfigview.component';
import { MailConfig }                         from './mail.interface';

@Component({
  selector: 'mail-config-selector',
  providers: [MailConfigService, MailConfigListingContext],
  directives: [MailConfigView, CrudListingSelector],
  properties: ['listingContext.selectedEntity:entity'],
  templateUrl: 'app/shared/notification/mail/mailconfigselector.component.html'
})
export class MailConfigSelector extends MailConfigListing
                                implements OnInit {

  _original: MailConfig = null;

  @Output() entityChosen: EventEmitter<MailConfig> = new EventEmitter<MailConfig>();
  @Output() canceled: EventEmitter<MailConfig> = new EventEmitter<MailConfig>();

  constructor(protected listingContext: MailConfigListingContext) {
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