import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MediaService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  
  getImages<T>(id): Observable<T>{
    return this.http.get<T>(this.apiUrl+'/api/media/public_images?category_id='+id);
  }
}