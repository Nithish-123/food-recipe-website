class likes {
	constructor() {
		this.like = [];
	}
	addlike(item) {
		const likes = {
			id: item.id,
			img: item.image,
			title: item.title,
		};
		this.like.push(likes);
		this.persistentlike();
		return likes;
	}
	deletelike(id) {
		const findid = this.like.findIndex((el) => el.id === id);
		this.like.splice(findid, 1);
		this.persistentlike();
	}
	isliked(id) {
		return this.like.findIndex((el) => el.id === id) !== -1;
	}
	totallikes() {
		return this.like.length;
	}
	persistentlike() {
		localStorage.setItem("like", JSON.stringify(this.like));
	}
	readlocalstorage() {
		const storage = JSON.parse(localStorage.getItem("like"));
		if (storage) this.like = storage;
	}
}
module.exports = likes;
