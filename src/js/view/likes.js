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
