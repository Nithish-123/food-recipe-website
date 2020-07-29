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
