let ctx = uni.createCanvasContext('attendCanvasId', this);  //  获取一个canvas
let setpre = '';    //  当前压缩步骤
let targetWidth = 0;    //  canvas宽度
let targetHeight = 0;   //  canvas高度
let filePath = tempFilePath;
export const uniCompressImage = (param)=> {
    const {tempFilePath,level} = param
    if(tempFilePath?.length===0||level?.length===0){
        throw 'param = {temoFilePath:String,level:String}'
    }
    return getImageInfo(tempFilePath)
}
/**
 * TODO:    获取图片信息，并且绘制图片
 */
const getImageInfo = (tempFilePath)=>{
    uni.getImageInfo({
        src:tempFilePath,
        success(respone){
            let canvasWidth = respone.width, canvasHeight = respone.height,maxWidth = 1000,maxHeight = 1000;
            targetWidth = respone.width
            targetHeight = respone.height
            //等比例压缩，如果宽度大于高度，则宽度优先，否则高度优先
            if (canvasWidth > maxWidth || canvasHeight > maxHeight) {
                if (canvasWidth / canvasHeight > 1) {
                    // 宽图片
                    targetWidth = maxWidth
                    targetHeight = Math.round(maxWidth * (canvasHeight / canvasWidth))
                } else {
                    // 高图片
                    targetHeight = maxHeight
                    targetWidth = Math.round(maxHeight * (canvasWidth / canvasHeight))
                }
            }
            return drawCanvas(tempFilePath) 
        }
    })
}

/**
 * TODO:    绘制canvas
 */
const drawCanvas = (path)=> {
    //  把图片交给canvas
    ctx.clearRect(0,0,targetWidth,targetHeight)
    ctx.drawImage(path, 0, 0, targetWidth, targetHeight);
    ctx.draw()
    setTimeout(() => {
        return canvasPath(level)
    }, 500);
}
/**
 * TODO:    拿到canvas绘制的图片信息
 */
const canvasPath = ()=> {
    if(setpre === level) return filePath
    uni.canvasToTempFilePath({
        canvasId: 'attendCanvasId',
        destWidth: targetWidth,
        destHeight: targetHeight,
        fileType:'jpg',
        success: function success(res) {
            if(level==='easy') return res.tempFilePath
            filePath = res.tempFilePath
            if(setpre === '') {
                setpre = 'easy'
            }
            uni.compressImage({
                src: filePath, // 图片路径
                quality: 80, // 压缩质量
                success: compressRes=>{
                    filePath = compressRes.tempFilePath
                    if(setpre === 'easy') {
                        setpre = 'mid'
                    }else if(setpre === 'mid') {
                        setpre = 'hard'
                    }
                    drawCanvas()
                }, fail: function (e) {
                    throw   `图片压缩失败`
                }
            })
        }, fail: function (e) {
            throw   `图片压缩失败`
        }
    })
}