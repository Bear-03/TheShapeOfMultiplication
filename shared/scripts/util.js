import React from "react";

/**
 * Adds a group of props to the children of an element.
 * @param {React.ReactNode[]} children children to be modified
 * @param {{}} props Object of props to be added to the children
 * @returns {React.ReactNode[]}
 */
export function addPropsToChildren(children, props) {
	// The children map automatically sets keys to the elements
	return React.Children.map(children, (child) => {
		if (React.isValidElement(child))
			return React.cloneElement(child, props);
		return child;
	});
}

/**
 * Returns the name of the property whose value changed between two objects
 * @param {{}} oldObject
 * @param {{}} newObject
 * @returns {string[]} Array of properties changed, empty if none were changed
 */
export function getChangedProperties(oldObject, newObject) {
	const changedProperties = [];

	for (const property in oldObject) {
		if (oldObject[property] !== newObject[property])
			changedProperties.push(property);
	}

	return changedProperties;
}

/**
 * Deletes all the properties in an object except those present in an array
 * @param {{}} object Object whose properties will be deleted
 * @param {string[]} array Array with properties to keep
 * @returns {{}} Object only with properties in the array
 */
export function deletePropertiesInArray(object, array) {
	const objectCopy = Object.assign({}, object);

	for (const property in objectCopy) {
		if (array.includes(property)) delete objectCopy[property];
	}

	return objectCopy;
}
