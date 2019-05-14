import React, { Component } from 'react';
import { imageToCanvas, fileToImage } from '../../src/image';

export default class App extends Component {
	onUploadImage = (e) => {
		const file = e.target.files[0]
		fileToImage(file)
			.then((imgObj) => imageToCanvas(imgObj))
			.then((canvas) => {
				console.info(canvas.toDataURL())
			})
	}
	render() {
		return (
			<div>
				<input type="file" onChange={this.onUploadImage} />
			</div>
		)
	}
}
