##  PRESS-PICTURE
-   入参
    -   param = {temoFilePath:String,level:String}
        +   temoFilePath:图片url
        +   level:压缩级别
            +   easy:   轻压缩，清晰度较高
            +   mid:    中压缩，清晰度一般
            +   hard:   重压缩，清晰度低
### uniapp使用
    -   需要创建一个canvas组件
        -   本方法依赖canvas
        -   因为小程序无法通过函数创建canvas，所以需要手工创建一个canvas组件
    -   适用于基于uniapp开发的小程序