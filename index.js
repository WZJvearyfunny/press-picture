import {uniCompressImage} from './uniappPress'
exports.pressPicture = (param,platform) =>{
    let file = null
    switch(platform){
        case 'web':
            webCompressImage(param)
            break;
        case 'wxminiapp':
            break;
        case 'uniapp':
            file = uniCompressImage(param)
            break;
        default:
            break;
    }
    return file
}