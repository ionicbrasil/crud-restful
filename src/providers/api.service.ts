import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
	
	private url : string = 'https://jsonplaceholder.typicode.com/';

	constructor(
		public http : HttpClient
	) { }

	public get(endpoint : string, query ?: any) {
	
		let params = new HttpParams();
		for (let key in query)
			params.set(key.toString(), query[key]);

		return this.http.get(this.url + endpoint + '/', {params: params});
	}

	public post(endpoint : string, data : any) {
		return this.http.post(this.url + endpoint + '/', data);
	}

	public put(endpoint : string, data : any) {
		return this.http.put(this.url + endpoint + '/', data);
	}

	public delete(endpoint : string) {
		return this.http.delete(this.url + endpoint + '/');
	}
}