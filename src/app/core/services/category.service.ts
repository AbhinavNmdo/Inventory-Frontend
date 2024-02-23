import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponce } from '../interfaces/login';
import { environment } from '../../enviornments/enviornment';
import { categories } from '../constants/categories-constants';
import { CategoryIndex, CategoryStore } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http:HttpClient
  ) {}

  index(item:any): Observable<IApiResponce>
  {
    return this.http.post<IApiResponce>(environment.baseUrl + categories.index, item);
  }

  store(item:any): Observable<IApiResponce>
  {
    return this.http.post<IApiResponce>(environment.baseUrl + categories.store, item);
  }

  show(id:number|string): Observable<IApiResponce>
  {
    return this.http.get<IApiResponce>(environment.baseUrl + categories.show.replace('{id}', id.toString()));
  }

  update(item:any): Observable<IApiResponce>
  {
    return this.http.post<IApiResponce>(environment.baseUrl + categories.update, item);
  }
}
