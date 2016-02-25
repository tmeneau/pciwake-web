import { Component,
         Input,
         ViewChild,
         AfterViewChecked }              from 'angular2/core';

import { Observable }                 from 'rxjs/Rx';

import { MODAL_DIRECTIVES,
         ModalComponent }             from 'ng2-bs3-modal/dist/ng2-bs3-modal';

import { AbstractCrudView }           from '../../rest/crudview.component';

import { GraylogClientConfig }        from './graylog.interface';
import { GraylogConfigService }       from './graylogclientconfig.service';
import { GraylogQueryView }           from './graylogqueryconfig.component';
import { GraylogQueryConfigSelector } from './graylogqueryconfigselector.component';
import { ConnectionConfigView }       from '../connectionconfig.component';
import { ConnectionConfigSelector }   from '../connectionconfigselector.component';

@Component({
  selector: "graylog-config",
  templateUrl: 'app/shared/logmanager/graylog/graylogconfigview.component.html',
  directives: [
    MODAL_DIRECTIVES,
    GraylogQueryView,
    ConnectionConfigView,
    GraylogQueryConfigSelector,
    ConnectionConfigSelector
  ],
  inputs: ['entity']
})
export class GraylogConfigView extends AbstractCrudView<GraylogClientConfig>
             implements AfterViewChecked {

  private _queryViewSubscription: boolean = false;
  private _connectionViewSubscription: boolean = false;
  @ViewChild(GraylogQueryView) queryView: GraylogQueryView;
  @ViewChild(ConnectionConfigView) connectionView: ConnectionConfigView;

  @ViewChild(GraylogQueryConfigSelector) querySelector: GraylogQueryConfigSelector;
  @ViewChild('selectQueryConfigModal') selectQueryConfigModal: ModalComponent;

  @ViewChild(ConnectionConfigSelector) connectionSelector: GraylogQueryConfigSelector;
  @ViewChild('selectConnectionConfigModal') selectConnectionConfigModal: ModalComponent;

  constructor(private _crudService: GraylogConfigService) {
    super();
  }

  ngAfterViewChecked() {
    if (!this._queryViewSubscription && this.queryView) {
      this.queryView.createEntitySuccess.subscribe(
        (newConfig) => this.entity.queryConfig = newConfig
      );
      this.queryView.saveEntitySuccess.subscribe(
        (newConfig) => this.entity.queryConfig = newConfig
      );

      this.querySelector.entityChosen.subscribe((newConfig) => {
        this.entity.queryConfig = newConfig
        this.entity.id && this.save();
        this.selectQueryConfigModal.close();
      });

      this.querySelector.canceled.subscribe((oldConfig) => {
        this.selectQueryConfigModal.close();
      })

      this._queryViewSubscription = true;
    }

    if (!this._connectionViewSubscription && this.connectionView) {
      this.connectionView.createEntitySuccess.subscribe(
        (newConfig) => this.entity.connectionConfig = newConfig
      );
      this.connectionView.saveEntitySuccess.subscribe(
        (newConfig) => this.entity.connectionConfig = newConfig
      );

      this.connectionSelector.entityChosen.subscribe((newConfig) => {
        this.entity.connectionConfig = newConfig
        this.entity.id && this.save();
        this.selectConnectionConfigModal.close();
      });

      this.connectionSelector.canceled.subscribe((oldConfig) => {
        this.selectConnectionConfigModal.close();
      })

      this._connectionViewSubscription = true;
    }
  }

  getCrudService(): GraylogConfigService {
    return this._crudService
  }

  save(event?): Observable<GraylogClientConfig> {
    if (this.entity.connectionConfig == null ||
        this.entity.connectionConfig.id == null) {
      console.log(this.entity);
      this.editError = "Must select (or create and save) a Connection "
                     + "Configuration before saving";
      return null;
    }

    if (this.entity.queryConfig == null ||
        this.entity.queryConfig.id == null) {
      console.log(this.entity);
      this.editError = "Must select (or create and save) a Graylog Query "
                     + "Configuration before saving";
      return null;
    }
    let observable = super.save(event);
    return observable;
  }

}