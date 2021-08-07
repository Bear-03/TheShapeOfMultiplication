import { useState, useRef } from "react";
import Image from "next/image";

import style from "./Explanation.module.scss";

const animations = [
	{
		image: "1-nodes-no-numbers.png",
		content: <p>These are nodes</p>
	},
	{
		image: "2-nodes-with-numbers.png",
		content: <p>Each node is assigned a number, starting from zero</p>
	},
	{
		image: "3-two-lines.gif",
		content: (
			<p>
				Then, the number of each node is multiplied by the
				&quot;Multiplication number&quot;, and a line is drawn from the
				first node to the node whose number is the result <br />
				For example, with &quot;Multiplication number&quot; = 4, node
				no. 2 would be joint to node no. 8, as 2 x 4 = 8
			</p>
		)
	},
	{
		image: "4-all-lines.gif",
		content: (
			<div>
				<span>
					You can modify the &quot;Multiplication number&quot; in the
					options menu (
				</span>
				<div className={style.textContentImage}>
					<Image
						src="/images/cog.svg"
						alt="cog"
						width={20}
						height={20}
					/>
				</div>
				<span> icon in the main page)</span>
				<p>
					If the resulting number is greater than the maximum number,
					it will just wrap around and start back from zero
				</p>
			</div>
		)
	},
	{
		image: "5-interesting-shapes.gif",
		content: (
			<p>
				As simple as these rules may seem, they can create incredibly
				complex and mesmerizing shapes
			</p>
		)
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
			<div className={style.textContainer}>{animation.content}</div>
		</div>
	);
}
