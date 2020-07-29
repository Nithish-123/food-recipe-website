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
	document.querySelector(".button").insertAdjacentHTML("afterbegin", button);
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
