import React from "react";
import Styles from "./ABSlider.css";

class ABSlider extends React.Component {
	constructor(props) {
		super(props);
		this.value = props.initialValue;
		this.renderCanvas = this.renderCanvas.bind(this);
		this.canvas = null;
		this.isDragging = false;
	}

	componentDidMount() {
		this.renderCanvas();
	}

	render() {
		return (
			<div className={Styles.CanvasContainer}>
			<canvas
			className={Styles.Canvas}
			width={0}
			height={0}
			onMouseDown={e => {
				this.isDragging = true;
			}}
			onMouseMove={e => {
				if (!this.isDragging) {
					return;
				}
				var x = getRelativeMouseXY(e).x;
				console.log(x)
				this.value = x;
				this.renderCanvas();
				if (this.props.valueChanged) {
					this.props.valueChanged(x);
				}
			}}
			onMouseUp={e => {
				this.isDragging = false;
			}}
			ref={canvas => {
				if (canvas) {
					this.canvas = canvas;

				}
			}}
			/>
			</div>
			);
	}

	renderCanvas() {
		if (!this.canvas) {
			return;
		}
		var rect = this.canvas.parentNode.getBoundingClientRect();
		this.canvas.width = rect.width;
		this.canvas.height = rect.height;
		var ctx = this.canvas.getContext("2d");
		ctx.strokeStyle = "white";
		ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, this.canvas.width * this.value, this.canvas.height);
	}
}

const getRelativeMouseXY = e => {
	const { x, y, width, height } = e.target.getBoundingClientRect();

	const rx = (e.clientX - x) / width;
	const ry = (e.clientY - y) / height;


	return { x: rx, y: ry };
};

export default ABSlider;
