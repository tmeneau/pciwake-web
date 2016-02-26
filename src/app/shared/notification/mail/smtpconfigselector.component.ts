import { Component,
         Output,
         OnInit,
         EventEmitter }                      from 'angular2/core';

import { CrudListingSelector }               from '../../rest/crudlistingview.component';

import { SmtpConfigListingContext,
         SmtpConfigListing }                  from './smtpconfiglisting.component';

import { SmtpConfigService }                  from './smtpconfig.service';
import { SmtpConfigView }                     from './smtpconfigview.component';
import { SmtpConfig }                         from './mail.interface';

@Component({
  selector: 'smtp-config-selector',
  providers: [SmtpConfigService, SmtpConfigListingContext],
  directives: [SmtpConfigView, CrudListingSelector],
  properties: ['listingContext.selectedEntity:entity'],
  templateUrl: 'app/shared/notification/mail/smtpconfigselector.component.html'
})
export class SmtpConfigSelector extends SmtpConfigListing
                                implements OnInit {

  _original: SmtpConfig = null;

  @Output() entityChosen: EventEmitter<SmtpConfig> = new EventEmitter<SmtpConfig>();
  @Output() canceled: EventEmitter<SmtpConfig> = new EventEmitter<SmtpConfig>();

  constructor(public listingContext: SmtpConfigListingContext) {
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