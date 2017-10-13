import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import 'rxjs/add/operator/toPromise';

import { PostModel } from '../models/post.model';

@Injectable()
export class PostService {

	constructor(
		public api: ApiService
	) { }

	/**
	* Lista todas as postagens.
	* api_url + /posts
	*/
	getAll() {
		return new Promise((resolve, reject) => {
			this.api.get('posts')
			.subscribe((res : any) => {
				resolve(res);
			}, err => {
				reject(err);
			});
		});
	}

	/**
	* Lista as postagens entre o limite.
	* api_url + /posts
	*/
	getPerPage(start : number, limit : number) {
		return new Promise((resolve, reject) => {
			this.api.get('posts', { _start: start, _limit: limit })
			.subscribe((res : any) => {
				resolve(res);
			}, err => {
				reject(err);
			});
		});
	}

	/**
	* Lista a postagem pelo ID.
	* api_url + /posts/ID
	*/
	getById(id : number) {
		return new Promise((resolve, reject) => {
			this.api.get('posts/' + id)
			.subscribe((res : PostModel[]) => {
				resolve(res);
			}, err => {
				reject(err);
			});
		});
	}

	/**
	* Insere uma nova postagem
	* api_url + /posts
	*/
	insert(data : PostModel) {
		return new Promise((resolve, reject) => {
			this.api.post('posts', data)
			.subscribe((res : PostModel) => {
				resolve(res);
			}, err => {
				reject(err);
			});
		});
	}

	/**
	* Atualiza uma postagem existente
	* api_url + /posts/ID
	*/
	update(id : number, data : PostModel) {
		return new Promise((resolve, reject) => {
			this.api.put('posts/' + id, data)
			.subscribe((res : PostModel) => {
				resolve(res);
			}, err => {
				reject(err);
			});
		});
	}

	/**
	* Remove uma postagem pelo ID
	* api_url + /posts/ID
	*/
	delete(id : number) {
		return new Promise((resolve, reject) => {
			this.api.delete('posts/' + id)
			.subscribe((res : PostModel) => {
				resolve(res);
			}, err => {
				reject(err);
			});
		});
	}

}