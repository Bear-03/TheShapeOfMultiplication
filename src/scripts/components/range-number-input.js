import style from "styles/components/range-number-input.css";

class RangeNumberInput extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({mode: "open"});

		this.processAttributes();
		this.addChildren();
		this.addListeners();
	}

	processAttributes() {
		this.name = this.getAttribute("name");
		this.min = parseInt(this.getAttribute("min"));
		this.max = parseInt(this.getAttribute("max"));
		this.value = parseInt(this.getAttribute("value"));
	}

	addChildren() {
		// The "required" attribute makes empty inputs not valid
		this.shadowRoot.innerHTML = `
			<style>${style}</style>
			<label>
				<span>${this.name}</span>
				<input type="range" min=${this.min} max=${this.max} value=${this.value}>
				<input required type="number" min=${this.min} max=${this.max} value=${this.value}>
			</label>
		`;
	}

	addListeners() {
		const rangeInput = this.shadowRoot.querySelector("input[type=range]");
		const numberInput = this.shadowRoot.querySelector("input[type=number]");

		// The event should fire the same way for both of the input elements
		rangeInput.addEventListener("input", (event) => this.onInput(event, numberInput));
		numberInput.addEventListener("input", (event) => this.onInput(event, rangeInput));
	}

	onInput(event, otherInput) {
		/* Stops the event from propagating to children.
		If the value is valid, another one will be fired
		on the parent, else, no event has to be fired */
		event.stopPropagation();

		if (!event.target.checkValidity()) return;

		this.value = parseInt(event.target.value);
		// Show the value in the element that didn't trigger the event
		otherInput.value = this.value;

		/* Fire a new event on this element so it can be listened,
		instead of listening for one on each input child */
		this.dispatchEvent(new Event("input"));
	}
}
customElements.define("range-number-input", RangeNumberInput);
