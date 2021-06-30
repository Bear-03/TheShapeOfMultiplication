export function loadDropdowns() {
	// Option menu dropdown
	document.querySelector("#option-menu > button").addEventListener("click", () => {
		document.querySelector("#option-menu aside").classList.toggle("expanded");
	});

	// Nav menu dropdown
	document.querySelector("nav > button").addEventListener("click", () => {
		document.querySelector("nav aside").classList.toggle("expanded");
	});
}

export function changePropertyOnInput(elementId, objectToChange, property) {
	document.getElementById(elementId).addEventListener("input", async (event) => {
		objectToChange[property] = event.target.value;
	});
}
