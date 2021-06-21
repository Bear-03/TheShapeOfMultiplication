document.querySelector("#option-menu > button").addEventListener("click", () => {
	document.getElementById("option-menu__dropdown").classList.toggle("display-none");
});

document.getElementById("option-menu__node-number").addEventListener("input", async (event) => {
	const { Circle } = await import("./classes");
	Circle.instance.nodeCount = event.target.value;
});
