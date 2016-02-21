import { Component, Input } from 'angular2/core';

import { GraylogClientConfig }        from './graylog.interface';
import { GraylogClientConfigService } from '../logmanager.service';

@Component({
  selector: "logmanager-config",
  templateUrl: 'app/shared/logmanager/graylog/graylogconfigview.component.html'
})
export class GraylogConfigView {
  @Input() config: GraylogClientConfig;
  private editMode: boolean;
  private editError: Object;

  constructor(private _managerConfigService: GraylogClientConfigService) {}


  /*
   * TODO: add EventEmitters to track when the GraylogClientConfig object
   * changes to add a few helpful UI-isms:
   *
   *    1. update coloring (or something) on the "save" button to indicate
   *    there is unsaved data
   *
   *    2. possibly notify the user if they try to navigate away without
   *    saving the object
   */
  edit(event?) {
    if (event) {
      event.preventDefault();
    }
    this.editMode = true;
  }

  view(event?) {
    if (event) {
      event.preventDefault();
    }
    this.editMode = false;
  }

  save(event?) {
    if (event) {
      event.preventDefault();
    }

    var success = (val) => {
      this.config = val;
      this.view();
    };
    var error = (err) => this.editError = err;

    if (this.config.id == null) {
      this._managerConfigService.createClientConfig(this.config)
            .subscribe(success, error);
    } else {
      this._managerConfigService.saveClientConfig(this.config)
            .subscribe(success, error);
    }
  }

  delete(event?) {
    if (event) {
      event.preventDefault();
    }
    console.log("delete config: ", this.config);
    this._managerConfigService.deleteClientConfig(this.config);
  }
}