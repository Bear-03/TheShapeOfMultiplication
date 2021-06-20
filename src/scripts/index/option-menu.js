document.querySelector("#option-menu > button").addEventListener("click", () => {
	document.querySelector("#option-menu > ul").classList.toggle("display-none");
});

document.querySelector("#option-menu__node-number input[type='range']").addEventListener("input", async (event) => {
	if (!event.target.checkValidity()) return;

	const { Circle } = await import("./classes");

	document.querySelector("#option-menu__node-number input[type='number']").value = event.target.value;
	Circle.instance.nodeCount = event.target.value;
});

document.querySelector("#option-menu__node-number input[type='number']").addEventListener("input", async (event) => {
	if (!event.target.checkValidity()) return;

	const { Circle } = await import("./classes");

	document.querySelector("#option-menu__node-number input[type='range']").value = event.target.value;
	Circle.instance.nodeCount = event.target.value;
});
