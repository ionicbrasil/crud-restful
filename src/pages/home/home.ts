import { Component } from '@angular/core';
import { NavController, ActionSheetController, AlertController, ToastController, LoadingController } from 'ionic-angular';

import { PostModel } from '../../models/post.model';
import { PostService } from '../../providers/post.service';

import { EditPage } from '../edit/edit';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	// Guarda as postagens a serem exibidas ao usuário
	posts : PostModel[] = [];

	// Define a página atual
	startDataPage : number = 0;
	// Define a quantidade de dados por página
	dataPerPage : number = 30;

	loading : any;

	constructor(
		public navCtrl : NavController,
		private actionSheetCtrl : ActionSheetController,
		private alertCtrl : AlertController,
		private toastCtrl : ToastController,
		private loadingCtrl : LoadingController,
		public postService : PostService
	) {
		this.loading = this.loadingCtrl.create();
		this.loading.present();
		this.listPosts();
	}

	listPosts() {
		this.postService.getPerPage(this.startDataPage, this.dataPerPage)
		.then((posts: PostModel[]) => {
			posts.forEach(data => {
				this.posts.push(data);
			});
		}).catch(() => {
			this.toastCtrl.create({
				message: 'Erro ao listar as Preferências.',
				duration: 5000
			}).present();
		});
		this.loading.dismiss();
	}

	infinitePosts(e) {
		this.startDataPage += this.dataPerPage;
		this.listPosts();

		// Aplica um limite ao infinite
		// if (this.posts.length >= 100)
		//	e.enable(false);

		e.complete();
	}

	actionsPost(post : PostModel) {
		let actionSheet = this.actionSheetCtrl.create({
			title: 'Ações para ' + post.title,
			buttons: [
				{
					text: 'Editar',
					icon: 'create',
					handler: () => {
						this.navCtrl.push(EditPage, {post: post});
					}
				}, {
					text: 'Excluir',
					icon: 'trash',
					handler: () => {
						let alert = this.alertCtrl.create({
							title: 'Confirmar Exclusão',
							message: 'Você deseja realmente excluir "' + post.title + '"?',
							buttons: [
								{
									text: 'Cancelar',
									role: 'cancel',
									handler: () => { }
								}, {
									text: 'Confirmar',
									handler: () => {
										// Remove a postagem do servidor
										this.postService.delete(post.id);
										// Remove a postagem da array lista, porem não atualiza a lista a partir dos dados do servidor
										this.posts = this.posts.filter(obj => obj !== post);
										// Atualiza a lista de posts pelo servidor
										// this.listPosts();
									}
								}
							]
						});
						alert.present();
					}
				}, {
					text: 'Cancelar',
					icon: 'close',
					role: 'cancel',
					handler: () => { }
				}
			]
		});
		actionSheet.present();
	}

	newPost() {
		this.navCtrl.push(EditPage);
	}
}