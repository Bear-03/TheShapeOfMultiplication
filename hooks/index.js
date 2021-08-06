import { useEffect, useRef, useState } from "react";

/**
 * Custom useEffect hook that only triggers on updates, not on initial mount.
 * @param {Function} effect
 * @param {any[]} [dependencies]
 */
export function useUpdateEffect(effect, dependencies) {
	const isInitialMount = useRef(true);

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
			return;
		}

		return effect();
	}, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * Syntactic sugar for useState with objects. The object will always be updated
 * adding/overriding key-value pairs without the need to reference the previous
 * object.
 * @param {{}} initialObject initial value for the object
 * @returns {[{}, Function]}
 */
export function useStateObject(initialObject = {}) {
	const [object, setObject] = useState(initialObject);

	/**
	 * useState wrapper that will update the object properties.
	 *
	 * @param {{} | Function} objectToAdd Key-value pair to add to the existing object or a function that will return one.
	 * If a function is passed, the first argument will be the previous object.
	 */
	function updateObject(objectToAdd) {
		setObject((prevObject) => {
			const result =
				typeof objectToAdd === "function"
					? objectToAdd(prevObject)
					: objectToAdd;

			return { ...prevObject, ...result };
		});
	}

	return [object, updateObject];
}

/**
 * Custom useEffect hook that toggles between boolean values.
 * @param {boolean} initialValue initial state value
 * @returns {[boolean, Function]}
 */
export function useToggleState(initialValue) {
	const [value, setValue] = useState(initialValue);

	/**
	 * useState setter that will toggle the state values.
	 */
	function toggleState() {
		setValue((prevValue) => !prevValue);
	}

	return [value, toggleState];
}

/**
 * Custom useState hook that is reset to the initial value if
 * the setter is passed the same value that the state already has.
 * @template T
 * @param {T} initialValue initial state value
 * @returns {[T, Function]}
 */
export function useToggleSwitchState(initialValue) {
	const [value, setValue] = useState(initialValue);

	/**useState setter
	 * useState setter that will reset to its initial
	 * value if the new one is equal to the previous one.
	 * @param {any} newValue new state value
	 */
	function toggleSwitchValue(newValue) {
		setValue((prevValue) => {
			if (prevValue === newValue) return initialValue;
			return newValue;
		});
	}

	return [value, toggleSwitchValue];
}

/**
 * Custom hook that adds an event listener to the window
 * @param {string} name name of the event
 * @param {*} runOnLoad whether or not to run the callback before the listener is added
 * @param {*} callback event callback
 * @param {*} dependencies values that will re-subscribe the event if they change
 */
export function useEvent(name, runOnLoad, callback, dependencies = []) {
	useEffect(() => {
		if (runOnLoad) callback();
		window.addEventListener(name, callback);

		return () => window.removeEventListener(name, callback);
	}, dependencies); // eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * Custom hook that adds a css class to the html element, from any component.
 * It will remove the class on component cleanup, if it is still there.
 * @param {string} className
 */
export function useClassForElement(selector, className) {
	useEffect(() => {
		const element = document.querySelector(selector);
		document.querySelector(selector).classList.add(className);

		return () => element.classList.remove(className);
	}, [selector, className]);
}
