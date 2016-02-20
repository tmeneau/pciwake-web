import { Component,
         OnInit,
         ViewChild }                  from "angular2/core";

import { GraylogClientConfigView }    from "./managerconfig.component";

import { GraylogClientConfigService } from "../service/logmanager.service"
import { GraylogClientConfig }        from "../model/logmanager.interface";

@Component({
  selector: 'manager-configs',
  providers: [GraylogClientConfigService],
  templateUrl: 'template/html/managerconfigs.component.html',
  directives: [GraylogClientConfigView]
})
export class GraylogManagerConfigs implements OnInit {
  public configs : GraylogClientConfig[];
  public selectedConfig: GraylogClientConfig;
  @ViewChild(GraylogClientConfigView) selectedConfigView: GraylogClientConfigView;

  constructor(private _configService: GraylogClientConfigService) {}

  ngOnInit() {
    this._configService.getClientConfigs()
                       .subscribe((configs: GraylogClientConfig[]) =>
                          this.configs = configs
                        );
  }

  selectConfig(event, config: GraylogClientConfig) {
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