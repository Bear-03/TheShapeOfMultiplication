import { useEffect, useRef, useState } from "react";

/**
 * A custom useEffect hook that only triggers on updates, not on initial mount.
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
	}, dependencies);
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
	 * Setter wrapper
	 *
	 * @param {{} | Function} objectToAdd Key-value pair to add to the existing object or a function that will return one.
	 * If a function is passed, the first argument will be the previous object.
	 * @param {Boolean} [invertOverridePriority=false] Whether or not `objectToAdd` properties
	 * override the previous object or vice versa.
	 */
	function updateObject(objectToAdd, invertOverridePriority = false) {
		setObject((prevObject) => {
			const result =
				typeof objectToAdd === "function"
					? objectToAdd(prevObject)
					: objectToAdd;

			return invertOverridePriority
				? { ...result, ...prevObject }
				: { ...prevObject, ...result };
		});
	}

	return [object, updateObject];
}
