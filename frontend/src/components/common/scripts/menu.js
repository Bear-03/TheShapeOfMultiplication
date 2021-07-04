export function expandMenu(clickEvent) {
	// The event target is the button, and the menu top-most element is needed
	clickEvent.target.parentElement.classList.toggle("expanded");
}
