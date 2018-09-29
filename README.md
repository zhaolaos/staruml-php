# staruml-php
staruml 3.0以上版本php扩展
这个扩展是在参考v2版本中php扩展、v3版本中java和C++的扩展修改而来, 因原来的扩展中缺少逆向功能，所以这部分功能暂时也还没有实现。

扩展程序的变化：

原来设定参数的js文件放到了preferences文件夹中的preference.json文件中。注意：json格式中 type的值都要小写，原来首字母大写
菜单也放到menus文件夹中
修改了main.js、code-generator.js和codegen-utils.js三个文件（文件名称修改了、程序也采用了ES6的语法重新写了，替换了原来采用lodash形式的函数）
具体变化可以参考原来的文件https://github.com/pedro151/starumlPHP
