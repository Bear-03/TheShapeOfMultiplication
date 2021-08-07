import { useState, useRef } from "react";
import Image from "next/image";

import style from "./Explanation.module.scss";

const animations = [
	{
		image: "1-nodes-no-numbers.png",
		text: "These are nodes"
	},
	{
		image: "2-nodes-with-numbers.png",
		text: "Each node is assigned a number, starting from zero"
	},
	{
		image: "3-two-lines.gif",
		text:
			"Then, the number of each node is multiplied by the " +
			'"Multiplication number" , and a line is drawn from the first node ' +
			"to the node whose number is the result. \n" +
			'For example, with "Multiplication number" = 4, node no. 2 would be joint to ' +
			"node no. 8, as 2 x 4 = 8"
	},
	{
		image: "4-all-lines.gif",
		text:
			'You can modify the "Multiplication number" in the options menu (top-right icon) \n' +
			"If the resulting number is greater than the maximum number, " +
			"it will just wrap around and start back from zero"
	},
	{
		image: "5-interesting-shapes.gif",
		text: "As simple as these rules may seem, they can create incredibly complex and mesmerizing shapes"
	}
];

export default function Explanation() {
	const containerRef = useRef();
	const [animIndex, setAnimIndex] = useState(0);
	const animation = animations[animIndex];

	function changeAnimIndex(event, direction) {
		setAnimIndex((prevIndex) => {
			const container = containerRef.current;
			let newIndex = prevIndex + direction;

			if (newIndex === 0 || newIndex === animations.length - 1) {
				event.target.classList.add(style.lockButton);
			} else {
				for (const element of container.getElementsByClassName(
					style.lockButton
				)) {
					element.classList.remove(style.lockButton);
				}
			}

			container.classList.remove(style.applyAppear);
			container.offsetWidth; // Triggers reflow to update the classes
			container.classList.add(style.applyAppear);

			return newIndex;
		});
	}

	return (
		<div
			ref={containerRef}
			className={`${style.container} ${style.applyAppear}`}
		>
			<div className={style.imageContainer}>
				<button
					className={`${style.flipX} ${style.lockButton}`}
					onClick={(event) => changeAnimIndex(event, -1)}
				>
					<Image
						src="/images/arrow-right.svg"
						alt="Next"
						height={50}
						width={50}
					/>
				</button>
				<div className={style.circleWrapper}>
					<Image
						src={`/how-it-works-anim/${animation.image}`}
						alt="Explanation images"
						height={750}
						width={750}
					/>
				</div>
				<button onClick={(event) => changeAnimIndex(event, 1)}>
					<Image
						src="/images/arrow-right.svg"
						alt="Next"
						height={50}
						width={50}
					/>
				</button>
			</div>
			<p>{animation.text}</p>
		</div>
	);
}
