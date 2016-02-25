import { Component,
         Input,
         Output,
         DoCheck,
         AfterViewInit,
         Injectable } from 'angular2/core';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'input-list',
  template: `
    <div class="row" *ngFor="#item of syntheticValues; #i=index">
      <div class="col-xs-12" style="margin-bottom: 15px;">
        <div class="input-group">
          <input [(ngModel)]="item.value"
                 class="form-control input-sm"
                 type="text">
          <div class="input-group-btn">
            <button type="button"
                    class="btn btn-danger btn-sm"
                    (click)="removeInput(i)">
              <span>X</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12" style="margin-bottom: 15px;">
        <div class="input-group">
          <input class="form-control input-sm"
                 disabled
                 type="text">
          <div class="input-group-btn">
            <button type="button"
                    class="btn btn-primary btn-sm"
                    (click)="addInput()">
              <span>+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class InputList implements AfterViewInit, DoCheck {
  @Input() values: string[] = [];
  syntheticValues: Array<{ value: string }> = [];

  ngDoCheck() {
    this.syntheticValues.forEach((val, i) => this.values[i] = val.value);
    while (this.syntheticValues.length < this.values.length) {
      this.values.pop();
    }
  }

  ngAfterViewInit() {
    for (var i in this.values) {
      this.syntheticValues.push({value: ""});
    }
  }

  addInput(content?) {
    content = content || "";
    this.syntheticValues.push({value: ""});
  }

  removeInput(index?: number) : string {
    var removed = null;
    var updatedValues: Array<{ value: string }> = [];
    
    this.syntheticValues.forEach((val, i) => {
      if (i == index) {
        removed = val;
      } else {
        updatedValues.push(val);
      }
    });

    this.syntheticValues = updatedValues;
    return removed;
  }
}