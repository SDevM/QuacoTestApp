import { HttpErrorResponse } from '@angular/common/http';
import { Observer } from 'rxjs';

export let GenericSubscribe = (observer: Observer<any>, success?: Function) => {
  return {
    next: (data: any) => {
      console.log(data.body);
      observer.next(data.body?.data);
      observer.complete();
      if (success) success(data.body?.data);
    },
    error: (err: HttpErrorResponse) => {
      console.error(err.error);
      observer.next(err.error.data);
      observer.complete();
    },
  };
};
