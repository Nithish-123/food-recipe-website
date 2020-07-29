const Search = require("./model/Search"); //
const searchquery = require("./view/search"); //
const Recipe = require("./model/Recipe"); //
const item = require("./view/recipe"); //
const List = require("./model/List"); //
const listview = require("./view/list"); //
const Likes = require("./model/Likes"); //
const likesview = require("./view/likes"); //

/**
 * GLOBAL STATE OF THE APP
 * -search object
 * -current receipe object
 * -shopping list object
 * -liked receipes
 */
const state = {};

const controlsearch = async () => {
	let query = searchquery.searchview();
	if (query != "") searchquery.clearsearch();
	searchquery.clearinput();
	searchquery.renderloader(document.querySelector(".menucontent"));
	state.search = new Search(query);
	try {
		await state.search.getresults();
		searchquery.removeloader();
		searchquery.renderresults(state.search.result.results);
	} catch (error) {
		alert("Something went wrong...");
	}
};
$(".btn-1").click((e) => {
	e.preventDefault();
	controlsearch();
});
$(document).on("keypress", (e) => {
	if (e.keyCode === 13) {
		e.preventDefault();
		controlsearch();
	}
});
$(".button").click((e) => {
	let gotopage;
	gotopage = Number(e.target.dataset.goto);
	searchquery.clearinput();
	searchquery.renderresults(state.search.result.results, gotopage);
});
const controlrecipe = async () => {
	const id = window.location.hash.replace("#", "");

	if (id) {
		//1. prepare ui
		item.clearrecipe(document.querySelector(".receipe"));
		//2.create recipe object
		if (state.search) searchquery.headingselector(id);

		state.recipe = new Recipe(id);
		searchquery.renderloader(document.querySelector(".receipe"));
		//3.get recipe
		await state.recipe.getrecipe();
		//4.render on ui
		item.receipeingredients(document.querySelector(".receipe"), state.recipe);
		searchquery.removeloader();
	}
};
["hashchange", "load"].forEach((element) => {
	window.addEventListener(element, controlrecipe);
});

const listcontroller = () => {
	if (!state.list) {
		state.list = new List();
	}
	state.recipe.ingredients.forEach((el) => {
		const item = state.list.additem(el.originalString);
		console.log(item);
		listview.additem(item, document.querySelector(".shopping_recipe"));
	});
};
const likecontroller = () => {
	if (!state.likes) state.likes = new Likes();
	const currentid = state.recipe.id;
	if (!state.likes.isliked(currentid)) {
		const newlike = state.likes.addlike(state.recipe);
		likesview.togglelike(true);
		likesview.addlikes(newlike, document.querySelector(".likes-list"));
	} else if (state.likes.isliked(currentid)) {
		state.likes.deletelike(currentid);
		likesview.togglelike(false);
		likesview.deletelikes(currentid);
	}
	likesview.togglelikes(state.likes.totallikes());
};
window.addEventListener("load", () => {
	const currentid = state.recipe.id;

	state.likes = new Likes();
	state.likes.readlocalstorage();
	state.likes.like.forEach((el) =>
		likesview.addlikes(el, document.querySelector(".likes-list"))
	);
});
$(".shopping").click((e) => {
	let id = e.target.closest(".shopping_ingredients").dataset.itemid;
	console.log(id);
	if (e.target.matches(".fa-times-circle")) {
		state.list.removeitem(id);
		listview.deleteitem(id);
	}
});
$(".receipe").click((e) => {
	if (e.target.matches(".shoppingbtn")) listcontroller();
	else if (e.target.matches(".fa-heart")) likecontroller();
});
