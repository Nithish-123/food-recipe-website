const uniqid = require("uniqid");
class list {
	constructor() {
		this.item = [];
	}
	additem(ingredients) {
		const items = {
			id: uniqid(),
			ingredients: ingredients,
		};
		this.item.push(items);

		return items;
	}
	removeitem(id) {
		const Finditem = this.item.findIndex((el) => el.id === id);
		this.item.splice(Finditem, 1);
	}
}
module.exports = list;
