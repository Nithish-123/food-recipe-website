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
