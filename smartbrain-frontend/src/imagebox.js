import React from 'react';

class ImageBox extends React.Component {
	constructor(props){
		super(props);
		this.canvasRef = React.createRef();
	}

	componentDidUpdate() {
		if(this.props.ImgUrl){
			const canvas = this.canvasRef.current;
			const ctx = canvas.getContext('2d');
			const width = canvas.width;
			const height = canvas.height;
			console.log(this.props.boxes);
			if(!this.props.boxes){
				canvas.width = canvas.width;
			} else {
				for (let image of this.props.boxes){
					const corners = image.region_info.bounding_box;
					console.log(corners);
					const xStart = corners.left_col*canvas.width;
					const yStart = corners.top_row*canvas.height;
					const boxWidth = (corners.right_col-corners.left_col)*canvas.width;
					const boxHeight = (corners.bottom_row-corners.top_row)*canvas.height;
					ctx.rect(xStart,yStart,boxWidth,boxHeight);
					ctx.strokeStyle="red";
					ctx.stroke();
						}
			}
		}
		// const drawBox = () => {
		// 	const corners = this.props.box;
		// 	const xStart = corners.left_col*canvas.width;
		// 	const yStart = corners.top_row*canvas.height;
		// 	const boxWidth = (corners.right_col-corners.left_col)*canvas.width;
		// 	const boxHeight = (corners.bottom_row-corners.top_row)*canvas.height;
		// 	ctx.rect(xStart,yStart,boxWidth,boxHeight);
		// 	ctx.strokeStyle="red";
		// 	ctx.stroke();
		}	

	render(){
		const img=this.props.ImgUrl;
		if(img!==''){
				return(
					<div className="imageContainer">
						<canvas ref = {this.canvasRef} className="canvas"/ >
						<img className='imagebox pa1' src={img} alt='Please enter a valid URL.'/>
					</div>
					)
			} else {
				return (<div className="empty"/>)
			}
	}
}

export default ImageBox;