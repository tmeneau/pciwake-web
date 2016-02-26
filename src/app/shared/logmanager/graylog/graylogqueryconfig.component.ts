import { Component }                  from 'angular2/core';

import { GraylogQueryConfig }         from './graylog.interface';
import { GraylogQueryService }        from './graylogqueryconfig.service';

import { AbstractCrudView }           from '../../rest/crudview.component';

@Component({
  selector: "graylog-query-config",
  templateUrl: 'app/shared/logmanager/graylog/graylogqueryconfig.component.html',
  inputs: ['entity']
})
export class GraylogQueryView extends AbstractCrudView<GraylogQueryConfig> {
  constructor(private _crudService: GraylogQueryService) {
    super();
  }

  getCrudService(): GraylogQueryService {
    return this._crudService
  }
}