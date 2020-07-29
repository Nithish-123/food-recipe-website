(function () {
	function r(e, n, t) {
		function o(i, f) {
			if (!n[i]) {
				if (!e[i]) {
					var c = "function" == typeof require && require;
					if (!f && c) return c(i, !0);
					if (u) return u(i, !0);
					var a = new Error("Cannot find module '" + i + "'");
					throw ((a.code = "MODULE_NOT_FOUND"), a);
				}
				var p = (n[i] = { exports: {} });
				e[i][0].call(
					p.exports,
					function (r) {
						var n = e[i][1][r];
						return o(n || r);
					},
					p,
					p.exports,
					r,
					e,
					n,
					t
				);
			}
			return n[i].exports;
		}
		for (
			var u = "function" == typeof require && require, i = 0;
			i < t.length;
			i++
		)
			o(t[i]);
		return o;
	}
	return r;
})()(
	{
		1: [
			function (require, module, exports) {
				exports.endianness = function () {
					return "LE";
				};

				exports.hostname = function () {
					if (typeof location !== "undefined") {
						return location.hostname;
					} else return "";
				};

				exports.loadavg = function () {
					return [];
				};

				exports.uptime = function () {
					return 0;
				};

				exports.freemem = function () {
					return Number.MAX_VALUE;
				};

				exports.totalmem = function () {
					return Number.MAX_VALUE;
				};

				exports.cpus = function () {
					return [];
				};

				exports.type = function () {
					return "Browser";
				};

				exports.release = function () {
					if (typeof navigator !== "undefined") {
						return navigator.appVersion;
					}
					return "";
				};

				exports.networkInterfaces = exports.getNetworkInterfaces = function () {
					return {};
				};

				exports.arch = function () {
					return "javascript";
				};

				exports.platform = function () {
					return "browser";
				};

				exports.tmpdir = exports.tmpDir = function () {
					return "/tmp";
				};

				exports.EOL = "\n";

				exports.homedir = function () {
					return "/";
				};
			},
			{},
		],
		2: [
			function (require, module, exports) {
				// shim for using process in browser
				var process = (module.exports = {});

				// cached from whatever global is present so that test runners that stub it
				// don't break things.  But we need to wrap it in a try catch in case it is
				// wrapped in strict mode code which doesn't define any globals.  It's inside a
				// function because try/catches deoptimize in certain engines.

				var cachedSetTimeout;
				var cachedClearTimeout;

				function defaultSetTimout() {
					throw new Error("setTimeout has not been defined");
				}
				function defaultClearTimeout() {
					throw new Error("clearTimeout has not been defined");
				}
				(function () {
					try {
						if (typeof setTimeout === "function") {
							cachedSetTimeout = setTimeout;
						} else {
							cachedSetTimeout = defaultSetTimout;
						}
					} catch (e) {
						cachedSetTimeout = defaultSetTimout;
					}
					try {
						if (typeof clearTimeout === "function") {
							cachedClearTimeout = clearTimeout;
						} else {
							cachedClearTimeout = defaultClearTimeout;
						}
					} catch (e) {
						cachedClearTimeout = defaultClearTimeout;
					}
				})();
				function runTimeout(fun) {
					if (cachedSetTimeout === setTimeout) {
						//normal enviroments in sane situations
						return setTimeout(fun, 0);
					}
					// if setTimeout wasn't available but was latter defined
					if (
						(cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
						setTimeout
					) {
						cachedSetTimeout = setTimeout;
						return setTimeout(fun, 0);
					}
					try {
						// when when somebody has screwed with setTimeout but no I.E. maddness
						return cachedSetTimeout(fun, 0);
					} catch (e) {
						try {
							// When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
							return cachedSetTimeout.call(null, fun, 0);
						} catch (e) {
							// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
							return cachedSetTimeout.call(this, fun, 0);
						}
					}
				}
				function runClearTimeout(marker) {
					if (cachedClearTimeout === clearTimeout) {
						//normal enviroments in sane situations
						return clearTimeout(marker);
					}
					// if clearTimeout wasn't available but was latter defined
					if (
						(cachedClearTimeout === defaultClearTimeout ||
							!cachedClearTimeout) &&
						clearTimeout
					) {
						cachedClearTimeout = clearTimeout;
						return clearTimeout(marker);
					}
					try {
						// when when somebody has screwed with setTimeout but no I.E. maddness
						return cachedClearTimeout(marker);
					} catch (e) {
						try {
							// When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
							return cachedClearTimeout.call(null, marker);
						} catch (e) {
							// same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
							// Some versions of I.E. have different rules for clearTimeout vs setTimeout
							return cachedClearTimeout.call(this, marker);
						}
					}
				}
				var queue = [];
				var draining = false;
				var currentQueue;
				var queueIndex = -1;

				function cleanUpNextTick() {
					if (!draining || !currentQueue) {
						return;
					}
					draining = false;
					if (currentQueue.length) {
						queue = currentQueue.concat(queue);
					} else {
						queueIndex = -1;
					}
					if (queue.length) {
						drainQueue();
					}
				}

				function drainQueue() {
					if (draining) {
						return;
					}
					var timeout = runTimeout(cleanUpNextTick);
					draining = true;

					var len = queue.length;
					while (len) {
						currentQueue = queue;
						queue = [];
						while (++queueIndex < len) {
							if (currentQueue) {
								currentQueue[queueIndex].run();
							}
						}
						queueIndex = -1;
						len = queue.length;
					}
					currentQueue = null;
					draining = false;
					runClearTimeout(timeout);
				}

				process.nextTick = function (fun) {
					var args = new Array(arguments.length - 1);
					if (arguments.length > 1) {
						for (var i = 1; i < arguments.length; i++) {
							args[i - 1] = arguments[i];
						}
					}
					queue.push(new Item(fun, args));
					if (queue.length === 1 && !draining) {
						runTimeout(drainQueue);
					}
				};

				// v8 likes predictible objects
				function Item(fun, array) {
					this.fun = fun;
					this.array = array;
				}
				Item.prototype.run = function () {
					this.fun.apply(null, this.array);
				};
				process.title = "browser";
				process.browser = true;
				process.env = {};
				process.argv = [];
				process.version = ""; // empty string to avoid regexp issues
				process.versions = {};

				function noop() {}

				process.on = noop;
				process.addListener = noop;
				process.once = noop;
				process.off = noop;
				process.removeListener = noop;
				process.removeAllListeners = noop;
				process.emit = noop;
				process.prependListener = noop;
				process.prependOnceListener = noop;

				process.listeners = function (name) {
					return [];
				};

				process.binding = function (name) {
					throw new Error("process.binding is not supported");
				};

				process.cwd = function () {
					return "/";
				};
				process.chdir = function (dir) {
					throw new Error("process.chdir is not supported");
				};
				process.umask = function () {
					return 0;
				};
			},
			{},
		],
		3: [
			function (require, module, exports) {
				(function (process) {
					/* 
(The MIT License)
Copyright (c) 2014-2019 Halász Ádám <mail@adamhalasz.com>
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

					//  Unique Hexatridecimal ID Generator
					// ================================================

					//  Dependencies
					// ================================================
					var pid = process && process.pid ? process.pid.toString(36) : "";
					var address = "";
					if (typeof __webpack_require__ !== "function") {
						var mac = "",
							networkInterfaces = require("os").networkInterfaces();
						for (let interface_key in networkInterfaces) {
							const networkInterface = networkInterfaces[interface_key];
							const length = networkInterface.length;
							for (var i = 0; i < length; i++) {
								if (
									networkInterface[i].mac &&
									networkInterface[i].mac != "00:00:00:00:00:00"
								) {
									mac = networkInterface[i].mac;
									break;
								}
							}
						}
						address = mac
							? parseInt(mac.replace(/\:|\D+/gi, "")).toString(36)
							: "";
					}

					//  Exports
					// ================================================
					module.exports = module.exports.default = function (prefix, suffix) {
						return (
							(prefix ? prefix : "") +
							address +
							pid +
							now().toString(36) +
							(suffix ? suffix : "")
						);
					};
					module.exports.process = function (prefix, suffix) {
						return (
							(prefix ? prefix : "") +
							pid +
							now().toString(36) +
							(suffix ? suffix : "")
						);
					};
					module.exports.time = function (prefix, suffix) {
						return (
							(prefix ? prefix : "") +
							now().toString(36) +
							(suffix ? suffix : "")
						);
					};

					//  Helpers
					// ================================================
					function now() {
						var time = Date.now();
						var last = now.last || time;
						return (now.last = time > last ? time : last + 1);
					}
				}.call(this, require("_process")));
			},
			{ _process: 2, os: 1 },
		],
		4: [
			function (require, module, exports) {
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
						item.receipeingredients(
							document.querySelector(".receipe"),
							state.recipe
						);
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
			},
			{
				"./model/Likes": 5,
				"./model/List": 6,
				"./model/Recipe": 7,
				"./model/Search": 8,
				"./view/likes": 10,
				"./view/list": 11,
				"./view/recipe": 12,
				"./view/search": 13,
			},
		],
		5: [
			function (require, module, exports) {
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
			},
			{},
		],
		6: [
			function (require, module, exports) {
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
			},
			{ uniqid: 3 },
		],
		7: [
			function (require, module, exports) {
				class recipe {
					constructor(ID) {
						this.id = ID;
					}
					async getrecipe() {
						const proxy = "https://cors-anywhere.herokuapp.com/";
						const key = "a1adffc0d27448df977f2a40c1b097a2";
						try {
							const res = await fetch(
								`${proxy}https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${key}&includeNutrition=false`
							);
							this.result = await res.json();
							this.title = this.result.title;
							this.image = this.result.image;
							this.ingredients = this.result.extendedIngredients;
							this.instructions = this.result.instructions;
							this.preparationMinutes = this.result.preparationMinutes;
							this.pricePerServing = this.result.pricePerServing;
							this.readyInMinutes = this.result.readyInMinutes;
							this.servings = this.result.servings;
							this.sourceUrl = this.result.sourceUrl;
						} catch (error) {
							console.log(error);
							alert("Something went wrong...");
						}
					}
				}
				module.exports = recipe;
			},
			{},
		],
		8: [
			function (require, module, exports) {
				class Search {
					constructor(query) {
						this.query = query;
					}
					async getresults() {
						const proxy = "https://cors-anywhere.herokuapp.com/";
						const key = "a1adffc0d27448df977f2a40c1b097a2";
						try {
							const res = await fetch(
								`${proxy}https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&query=${this.query}&number=60`
							);
							this.result = await res.json();
						} catch (error) {
							console.log(error);
							alert("Something went wrong...");
						}
					}
				}
				module.exports = Search;
			},
			{},
		],
		9: [
			function (require, module, exports) {
				const searchview = () => $(".search").val();
				const clearsearch = () => $(".search").val("");
				const clearinput = () => {
					$(".menucontent").html("");
					$(".button").html("");
				};

				const buttonrender = (page, type) => {
					let button = `<button class="btn btn-type-${
						type === "prev" ? "prev" : "next"
					}" id="button" data-goto=${type === "prev" ? page - 1 : page + 1}> ${
						type === "prev" ? "prev" : "next"
					}
		 ${type === "prev" ? page - 1 : page + 1}
	<i class="fa fa-angle-${
		type === "prev" ? "left" : "right"
	}" aria-hidden="true"></i>
	</button>`;
					document
						.querySelector(".button")
						.insertAdjacentHTML("afterbegin", button);
				};
				const renderbutton = (page, totalresults, resultsperpage) => {
					const totalpage = Math.ceil(totalresults / resultsperpage);
					if (page === 1 && totalpage > 1) {
						//only button to show right direction
						buttonrender(page, "next");
					} else if (page < totalpage) {
						buttonrender(page, "prev");
						buttonrender(page, "next");
					}
					//both botton shld be displayed
					if (page === totalpage && totalpage > 1) buttonrender(page, "prev");
					//only left shld be displayed
				};

				const renderresults = (recipes, page = 1, resultsperpage = 12) => {
					const start = (page - 1) * resultsperpage;
					const end = page * resultsperpage;

					recipes.slice(start, end).forEach((el) => {
						recipe(el);
					});
					renderbutton(page, recipes.length, resultsperpage);
				};

				const removeloader = () => {
					const loader = document.querySelector(".loader");
					loader.parentNode.removeChild(loader);
				};

				const renderloader = (parent) => {
					const loader = `
    <div class="loader">
   
    </div>
    `;
					parent.insertAdjacentHTML("afterbegin", loader);
				};

				const titlereduce = (title, limit = 17) => {
					if (title.length > limit) {
						const titlearr = [];
						title.split(" ").reduce((acc, cur) => {
							if (acc + cur.length < limit) {
								titlearr.push(cur);
							}
							return acc + cur.length;
						}, 0);
						return `${titlearr.join(" ")}...`;
					}
					return title;
				};

				const recipe = (el) => {
					let htmlstring;
					htmlstring = `
    <li class="recipes hover">
    <a class="url" href="#${el.id}">
      <div class="recipeimg">
        <img src="${el.image}" class="avatar">
      </div>
      <div class="recipeinfo">
        <h4 class="recipetitle">${titlereduce(el.title)}</h2>
        <p class="recipeauthor">${el.id}</p>                          
      </div>
    </a>
  </li>
  `;
					document
						.querySelector(".menucontent")
						.insertAdjacentHTML("beforeend", htmlstring);
				};
				const headingselector = (id) => {
					const removeclass = Array.from(document.querySelectorAll(".recipes"));
					removeclass.forEach((el) => el.classList.remove("headingselector"));
					removeclass.forEach((el) => el.classList.add("hover"));
					document
						.querySelector(`.url[href="#${id}"]`)
						.parentElement.classList.add("headingselector");
					document
						.querySelector(`.url[href="#${id}"]`)
						.parentElement.classList.remove("hover");
					console.log(`a[href="#${id}"]`);
				};
				module.exports = {
					headingselector: headingselector,
					titlereduce: titlereduce,
					renderloader: renderloader,
					removeloader: removeloader,
					renderresults: renderresults,
					searchview: searchview,
					clearinput: clearinput,
					clearsearch: clearsearch,
				};
			},
			{},
		],
		10: [
			function (require, module, exports) {
				const titlereduce = require("./search");
				const togglelike = (isliked) => {
					const liked = isliked === true ? "fa-outlined" : "fa-outline";
					document
						.querySelector(".likes i")
						.setAttribute("class", `fa fa-heart ${liked}`);
				};
				const togglelikes = (numlike) => {
					document.querySelector(".likes-heart").style.visibility =
						numlike > 0 ? "visible" : "hidden";
				};
				const addlikes = (like, parent) => {
					const markup = `<li class="liked-ingredient">
  <a class="like_url" href="#${like.id}">
	  <div class="img-div">
		  <img
			  src="${like.img}"
			  class="liked-img"
			  width="5%"
			  height="5%"
		  />
	  </div>
	  <div class="ing-info">
		  <h4 class="ing-title">${titlereduce.titlereduce(like.title)}</h4>
		  <p class="ing-id">${like.id}</p>
	  </div>
  </a>
</li>`;
					parent.insertAdjacentHTML("beforeend", markup);
				};
				const deletelikes = (id) => {
					document
						.querySelector(`.like_url[href="#${id}"]`)
						.parentElement.parentElement.removeChild(
							document.querySelector(`.like_url[href="#${id}"]`).parentElement
						);
				};
				module.exports = {
					togglelike: togglelike,
					togglelikes: togglelikes,
					deletelikes: deletelikes,
					addlikes: addlikes,
				};
			},
			{ "./search": 13 },
		],
		11: [
			function (require, module, exports) {
				const additem = (item, parent) => {
					const markup = `<li class="shopping_ingredients"  data-itemid=${item.id}>
                       ${item.ingredients}<button class="deleteing">
                        <i class="fa fa-times-circle" aria-hidden="true"></i>
                        </button>
                   </li>`;
					parent.insertAdjacentHTML("afterbegin", markup);
				};
				const deleteitem = (id) => {
					document
						.querySelector(`[data-itemid=${id}]`)
						.parentElement.removeChild(
							document.querySelector(".shopping_ingredients")
						);
				};
				module.exports = {
					additem: additem,
					deleteitem: deleteitem,
				};
			},
			{},
		],
		12: [
			function (require, module, exports) {
				const searchquery = require("./Search");
				function renderingredients(el) {
					return `<li class="ingredients_item"><i class="fa fa-circle" aria-hidden="true"></i>${el.originalString}</li>`;
				}
				const preparationminutes = (recipe, time) => {
					if (time === undefined) {
						const inglen = recipe.ingredients.length;
						const period = Math.ceil(inglen / 3);
						return period * 15;
					}
					return recipe.preparationMinutes;
				};
				const receipeingredients = (parent, recipe) => {
					const markup = `
    <figure class="figure">
    <img
        src=${recipe.image}
        id="recipeimage"
    />

    <div class="titleimage">
        <h4 class="titleheading">${searchquery.titlereduce(recipe.title)}</h4>
    </div>
</figure>

<div class="time">
    <i class="fa fa-clock-o timeclock icons " aria-hidden="true"></i>
    <h4 class="timeclock text ">${preparationminutes(
			recipe,
			recipe.preparationMinutes
		)} minutes</h4>
    <h4 class="servings text ">${recipe.servings} servings</h4>
    <i class="fa fa-male servings icons " aria-hidden="true"></i>
    <button class="likes"><i class="fa fa-heart " aria-hidden="true"></i></button>
</div>
       <div class="ingredients">
            <ul class="ingredients_list">
                 ${recipe.ingredients
										.map((el) => renderingredients(el))
										.join("")}
            </ul>
      </div> 
<button type="button" class="shoppingbtn">ADD TO SHOPPING CART</button>
    <a href="${recipe.sourceUrl}">
      <div class="direction">
          <h4 class="directionheading">
               directions
            </h4>
      </div>
   </a>`;

					parent.insertAdjacentHTML("afterbegin", markup);
				};
				const clearrecipe = (parent) => {
					parent.innerHTML = "";
				};
				module.exports = {
					clearrecipe: clearrecipe,
					receipeingredients: receipeingredients,
				};
			},
			{ "./Search": 9 },
		],
		13: [
			function (require, module, exports) {
				arguments[4][9][0].apply(exports, arguments);
			},
			{ dup: 9 },
		],
	},
	{},
	[4]
);
