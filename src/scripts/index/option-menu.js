document.querySelector("#option-menu > button").addEventListener("click", () => {
	document.querySelector("#option-menu aside").classList.toggle("expanded");
});

document.getElementById("option-menu__node-number").addEventListener("input", async (event) => {
	const { Circle } = await import("./classes");
	Circle.instance.nodeCount = event.target.value;
});
