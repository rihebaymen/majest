import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Category } from '../../models/admin/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 
  update = false
  baseUrl="werehouse/category/"
   
  constructor(private http: HttpClient) { }


  deleteCategory(id: number):Observable<any>{
    return  this.http.delete(`${this.baseUrl}delete/${id}`)
  }
  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${this.baseUrl}getbycompany`)
  }

  addCategory(category : Category):Observable<any>{
    return this.http.post(`${this.baseUrl}add`,category)
  }

    
  updateCategory(category: Category) :Observable<any>{
    return this.http.put(`${this.baseUrl}update`,category)
  }
}