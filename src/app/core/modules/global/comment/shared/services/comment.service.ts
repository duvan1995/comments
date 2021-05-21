import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HeadTable } from 'src/app/shared/models/head-table';
import { environment } from 'src/environments/environment';
import { CommentGeneral } from '../models/comment-general.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

    url: string = 'api/v1/comments'
    options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    comments: CommentGeneral[] = [];
    heads: HeadTable[] = [];

    constructor(private http: HttpClient) {    
    }
    getUrlDatatable() {
        return environment.endPoint + this.url;
    }
    /** Update data from comment form. */
    putData(id: number, item: any) : Observable<any>{
        return this.http.post(environment.endPoint + this.url + '/' + id + '/update', item);
    }
    /** Create data from comment form. */
    postData(item: object) : Observable<any>{
        return this.http.post(environment.endPoint + this.url, item);
    }
    /** Get data from comment form. */
    getById(id: number) : Observable<CommentGeneral>{
        return this.http.get<CommentGeneral>(environment.endPoint + this.url + '/' + id);
    }
    /** Get list data from comment form. */
    getData(): Observable<CommentGeneral[]> {
        return this.http.get<CommentGeneral[]>(environment.endPoint + this.url)
    }
    get() : CommentGeneral[]{
        return this.comments;
    }
    setData(items: CommentGeneral[]) {
        this.comments = items;
    }

    getHeadTable() {
        if(this.heads.length === 0) {
            this.heads = [{name: 'ID'}, {name: 'Nombre'}, {name: 'Correo Electrónico'}, {name: 'Página Web'}, {name: 'Comentarios'}, {name: ''}];
        }
        return this.heads;
    }
}