import { Component,
         Input,
         Output,
         ViewChild,
         AfterViewInit }        from 'angular2/core';

import { MODAL_DIRECTIVES,
         ModalComponent }   from 'ng2-bs3-modal/dist/ng2-bs3-modal';

import { PersistentEntity } from '../rest/rest.interface';
import { CrudListingView }  from '../rest/crudlistingview.component';

@Component({
  selector: 'entity-list',
  templateUrl: "app/shared/form/entitylist.component.html",
  inputs: ['entities', 'newFn', 'entitySelector'],
  directives: [MODAL_DIRECTIVES]
})
export class EntityList<T extends PersistentEntity<any>>
             implements AfterViewInit {
  private _selectingEntityIndex = null;
  @Input() entities: T[] = [];
  @Input() newFn: ()=>T;

  /*
   * TODO: need to reafctor the whole rest/ package to use the ng-content
   * data binding convention established in this directive. Once that is done,
   * this can be changed to a new generic CrudSelector. This will reoslve the
   * compiler errors in the ngAfterViewInit method by having the #entityChosen
   * and #canceled Observables be part of the generic CrudSelector interface
   * (model, whatever)
   */
  @Input() entitySelector: CrudListingView<T>;

  @ViewChild('newEntityModal') newEntityModal : ModalComponent;

  ngAfterViewInit() {
    /*
     * TODO: the
     */
    this.entitySelector.entityChosen.subscribe((entity: T) => {
      if (this._selectingEntityIndex == null) {
        throw ("_selectingEntityIndex was null! Context: ", this);
      }

      this.entities[this._selectingEntityIndex] = entity;
      this.newEntityModal.close();
      this._selectingEntityIndex = null;
    });
    this.entitySelector.canceled.subscribe(() => {
      this.newEntityModal.close();
    })
  }

  addNew() {
    this.entities.push(this.newFn());
    this.entitySelector.listingContext.selectedEntity = this.entities[this.entities.length - 1];
    this._selectingEntityIndex = this.entities.length - 1;
    this.newEntityModal.open('lg');
  }

  select(index: number) {
    this.entitySelector.listingContext.selectedEntity = this.entities[index];
    this._selectingEntityIndex = index;
    this.newEntityModal.open('lg');
  }

  removeEntity(index?: number) : string {
    var removed = null;
    var updatedEntities: Array<T> = [];

    this.entities.forEach((entity, i) => {
      if (i == index) {
        removed = entity;
      } else {
        updatedEntities.push(entity);
      }
    });

    this.entities = updatedEntities;
    return removed;
  }
}