// Option menu

document.querySelector("#option-menu > button").addEventListener("click", () => {
	document.querySelector("#option-menu aside").classList.toggle("expanded");
});

function changeCirclePropetyOnInput(id, property) {
	document.getElementById(id).addEventListener("input", async (event) => {
		const { Circle } = await import("./classes");
		Circle.instance[property] = event.target.value;
	});
}

changeCirclePropetyOnInput("option-menu__node-count", "nodeCount");
changeCirclePropetyOnInput("option-menu__mult-number", "multNumber");

// Nav menu

document.querySelector("nav > button").addEventListener("click", () => {
	document.querySelector("nav aside").classList.toggle("expanded");
});
