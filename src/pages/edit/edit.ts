import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { PostService } from '../../providers/post.service';

@Component({
	selector: 'page-edit',
	templateUrl: 'edit.html',
})
export class EditPage {

	isInsert : boolean;

	post : any = {
		title: '',
		body: ''
	};

	form : FormGroup;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private formBuilder: FormBuilder,
		public postService : PostService
	) {
		if (this.navParams.get('post') == null) {
			this.isInsert = true;
		} else {
			this.isInsert = true;
			this.post = this.navParams.get('post');
		}
	
		this.form = this.formBuilder.group({
			userId : 1,
			title : ['', Validators.required],
			body : ['', Validators.required]
		});
	}

	save() {
		if (this.isInsert) {
			this.postService.insert(this.form.value);
		} else {
			this.postService.update(this.post.id, this.form.value);
		}
		this.navCtrl.pop();
	}

}