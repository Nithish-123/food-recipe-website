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
		.parentElement.removeChild(document.querySelector(".shopping_ingredients"));
};
module.exports = {
	additem: additem,
	deleteitem: deleteitem,
};
