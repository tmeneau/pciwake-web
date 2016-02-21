import { Component,
         OnInit,
         ViewChild }                  from "angular2/core";

import { GraylogConfigView }          from "./graylog/graylogconfigview.component";

import { GraylogClientConfigService } from "./logmanager.service"
import { LogManagerClientConfig }     from "./logmanager.interface";

import { GraylogClientConfig }        from './graylog/graylog.interface';

@Component({
  selector: 'manager-configs',
  providers: [GraylogClientConfigService],
  templateUrl: 'app/shared/logmanager/managerconfigs.component.html',
  directives: [GraylogConfigView]
})
export class GraylogManagerConfigs implements OnInit {
  public configs : LogManagerClientConfig<any>[];
  public selectedConfig: LogManagerClientConfig<any>;
  public isLoading: boolean = false;
  @ViewChild(GraylogConfigView) selectedConfigView: GraylogConfigView;

  constructor(private _configService: GraylogClientConfigService) {}

  ngOnInit() {
    this.isLoading = true;
    this._configService.getClientConfigs()
                       .subscribe((configs: LogManagerClientConfig<any>[]) => {
                          this.configs = configs;
                          this.isLoading = false;
                        });
  }

  selectConfig(event, config: LogManagerClientConfig<any>) {
    event.preventDefault();
    this.selectedConfig = config;
    if (this.selectedConfigView) {
      this.selectedConfigView.view();
    }
  }

  createConfig(event) {
    event.preventDefault();
    this.selectedConfig = new GraylogClientConfig();
    setTimeout(() => {
      if (this.selectedConfigView) {
        this.selectedConfigView.edit();
      }
    }, 0);
  }
}