import EXIF from 'exif-js';

// 传入的文件转成图片
const fileToImage = (file, fn) => {
	let orientation = null;
	EXIF.getData(file, function() {
		EXIF.getAllTags(this);
		orientation = EXIF.getTag(this, 'Orientation');
	})

	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (env) => {
			const img = new Image();
			const url = env.target.result;
			img.src = url;
			img.onload = function () {
				resolve({
					image: img,
					orientation
				})
			}
			img.onerror = function () {
				reject(false)
			}
		}
		reader.readAsDataURL(file);
	})
}

// 将图片转换成canvas对象

const imageToCanvas = (imgObj) => {
	const { orientation, image } = imgObj;
	return new Promise((resolve, reject) => {
		const canvas = document.createElement("canvas");
		const ctx = canvas.getContext('2d');
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#ffffff";
		let imgWidth = image.width;
		let imgHeight = image.height;
		canvas.width = imgWidth;
		canvas.height = imgHeight;
		switch (orientation) {
      case 6:
        canvas.width = imgHeight;
        canvas.height = imgWidth;
        ctx.rotate(Math.PI / 2);
        ctx.fillRect(0, -imgHeight, imgWidth, imgHeight); 
        ctx.drawImage(image, 0, -imgHeight, imgWidth, imgHeight);
        break;
      case 8:
        canvas.width = imgHeight;
        canvas.height = imgWidth;
        ctx.rotate(3 * Math.PI / 2);  
        ctx.fillRect(-imgWidth, 0, imgWidth, imgHeight); 
        ctx.drawImage(image, -imgWidth, 0, imgWidth, imgHeight);
        break;
      case 3:
        ctx.rotate(Math.PI);
        ctx.fillRect(-imgWidth, -imgHeight, imgWidth, imgHeight); 
        ctx.drawImage(image, -imgWidth, -imgHeight, imgWidth, imgHeight);
        break;
      default:
        ctx.fillRect(0, 0, imgWidth, imgHeight); 
        ctx.drawImage(image, 0, 0, imgWidth, imgHeight); 
      }
      resolve(canvas);
	})
}

export {
	imageToCanvas,
	fileToImage
}