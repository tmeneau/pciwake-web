import { Input,
         Output,
         EventEmitter }        from 'angular2/core';

import { AbstractCrudService } from './crud.service';
import { PersistentEntity }    from './rest.interface.ts';

import { Observable }          from 'rxjs/Rx';

export abstract class AbstractCrudView<T extends PersistentEntity<any>> {
  editMode: boolean;
  editError: string;

  protected _originalEntity: T;
  @Input() entity: T;

  @Output() enableEditMode = new EventEmitter();
  @Output() enableViewMode = new EventEmitter();

  @Output() createEntitySuccess = new EventEmitter();
  @Output() createEntityFailure = new EventEmitter();

  @Output() saveEntitySuccess = new EventEmitter();
  @Output() saveEntityFailure = new EventEmitter();

  @Output() deleteEntitySuccess = new EventEmitter();
  @Output() deleteEntityFailure = new EventEmitter();

  abstract getCrudService(): AbstractCrudService<T>;

  edit(event?) {
    event && event.preventDefault();
    this.editMode = true;
    this.enableEditMode.emit(null);
    this._originalEntity = Object.assign({}, this.entity);
  }

  view(event?) {
    event && event.preventDefault();
    this.editMode = false;
    this.editError = null;
    this.enableViewMode.emit(null);
    Object.assign(this.entity, this._originalEntity);
  }

  save(event?): Observable<T> {
    event && event.preventDefault();

    /*
     * If no id exists for the instance then it needs to be created.
     */
    if (this.entity.id == null) {
      let observable = this.getCrudService().create(this.entity);
      observable.subscribe(
        (val) => {
          this.entity = val;
          this._originalEntity = val;
          this.createEntitySuccess.emit(val);
          this.view();
        }, (err) => {
          this.editError = JSON.stringify(err);
          this.createEntityFailure.emit(err);
        });
      return observable;
    }

    /*
     * An id exists for the instance, so save it
     */
    let observable = this.getCrudService().save(this.entity);
    observable.subscribe(
      (val) => {
        this.entity = val;
        this._originalEntity = val;
        this.saveEntitySuccess.emit(val);
        this.view()
      }, (err) => {
        this.editError = JSON.stringify(err)
        this.saveEntityFailure.emit(err);
      });
    return observable;
  }

  delete(event?): Observable<any> {
    event && event.preventDefault();
    let observable = this.getCrudService().delete(this.entity);
    observable.subscribe(
      (val) => this.deleteEntitySuccess.emit(val),
      (err) => {
        this.deleteEntityFailure.emit(err)
        this.editError = "Failed to delete!";
      }
    )
    return observable;
  }
}