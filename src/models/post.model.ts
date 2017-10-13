export class PostModel {

	constructor(
		public userId : number,
		public id : number,
		public title : string,
		public body : string
	) {
		userId = 0;
		id = 0;
		title = '';
		body = '';
	}
}