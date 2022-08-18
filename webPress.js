export const webCompressImage = (param)=> {
    const {tempFilePath,level} = param
    if(tempFilePath?.length===0||level?.length===0){
        throw 'param = {temoFilePath:String,level:String}'
    }
    return getImageInfo(tempFilePath)
}