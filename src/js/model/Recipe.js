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
