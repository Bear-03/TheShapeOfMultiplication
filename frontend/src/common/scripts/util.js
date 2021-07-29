import React from "react";

/**
 * Adds a group of props to the children of an element.
 * @param {React.ReactNode[]} children children to be modified
 * @param {{}} props Object of props to be added to the children
 * @returns {React.ReactNode[]}
 */
export function addPropsToChildren(children, props) {
	return React.Children.map(children, (child) => {
		if (React.isValidElement(child))
			return React.cloneElement(child, props);
		return child;
	});
}
