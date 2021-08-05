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
 * @returns {string | null} The property changed or null, if none were changed
 */
export function getChangedProperty(oldObject, newObject) {
	for (const property in oldObject) {
		if (oldObject[property] !== newObject[property]) return property;
	}

	return null;
}
