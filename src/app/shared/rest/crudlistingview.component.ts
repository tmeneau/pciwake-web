import { Component,
         Input,
         Output,
         OnInit,
         EventEmitter,
         ViewChild,
         AfterViewChecked }     from "angular2/core";

import { PersistentEntity }     from "./rest.interface";
import { AbstractCrudView }     from './crudview.component';
import { AbstractCrudService }  from './crud.service';


export abstract class AbstractCrudListingViewContext<T extends PersistentEntity<any>> {
    entityConfigurationViewHeight: number = 250;
    selectedEntity: T = null;

    abstract getCrudService(): AbstractCrudService<T>;
    abstract newEntity(): T;
    abstract entityTypeName(): string;
}

export abstract class CrudListingView<T extends PersistentEntity<any>>
                      implements AfterViewChecked, OnInit {

  private _viewSubscription: boolean = false;
  @ViewChild(CrudListingSelector) listingSelector: CrudListingSelector<T>;
  @ViewChild(AbstractCrudView) crudView: AbstractCrudView<T>;

  constructor(public listingContext: AbstractCrudListingViewContext<T>,
              protected startId?) {}

  ngAfterViewChecked() {
    if (!this._viewSubscription && this.crudView != null) {
      this.crudView.createEntitySuccess
        .subscribe((result) => this.listingSelector.reload());

      this.crudView.deleteEntitySuccess
        .subscribe((result) => {
          this.listingSelector.reload()
        });

      /*
       * If the user hits "cancel" for a new entity they're creating,
       * make it clear that the entity's configuration is unsaved
       * and remove the selection
       */
      this.crudView.enableViewMode.subscribe(() => {
          if (this.listingContext.selectedEntity &&
              this.listingContext.selectedEntity.id == null) {
            this.listingContext.selectedEntity = null;
          }
      });
    }
  }

  ngOnInit() {
    if (this.startId) {
      this.listingSelector.selectEntityById(this.startId);
    }
  }
}

@Component({
  selector: "crud-listing-selector",
  templateUrl: 'app/shared/rest/crudlistingview.component.html',
  inputs: ["context"]
})
export class CrudListingSelector<T extends PersistentEntity<any>>
             implements OnInit {
  public entities: T[];
  public isLoading: boolean = false;
  public error: string;

  @Input() context: AbstractCrudListingViewContext<T>;

  @Output() entitySelect: EventEmitter<T> = new EventEmitter<T>();
  @Output() entityCreate: EventEmitter<T> = new EventEmitter<T>();
  @Output() reloaded: EventEmitter<T[]> = new EventEmitter<T[]>();

  load() {
    this.isLoading = true;
    this.context.getCrudService()
          .findAll()
             .subscribe((entities: T[]) => {
                this.entities = entities;
                this.isLoading = false;
                this.reloaded.next(this.entities);
              });
  }

  reload() {
    this.context.selectedEntity = null;
    this.load();
  }

  ngOnInit() {
    this.load();
  }

  isActive(entity) {
    if (this.context.selectedEntity) {
      return entity && entity.id == this.context.selectedEntity.id
    }
    return false;
  }

  selectEntityById(id: number) {
    var selected = this.entities.find((entity) => entity.id == id);
    if (selected == null) {
      this.error = "Selected record does not exist or has been removed"
      return;
    }
    this.error = null;
    this.selectEntity(null, selected);
  }

  selectEntity(event, entity: T) {
    event && event.preventDefault();
    if (this.context.selectedEntity == entity) {
      return;
    }

    this.error = null;
    this.context.selectedEntity = entity;
    this.entitySelect.next(entity);
  }

  createEntity(event) {
    event && event.preventDefault();

    this.error = null;
    this.context.selectedEntity = this.context.newEntity();
    this.entitySelect.next(this.context.selectedEntity);
  }
}