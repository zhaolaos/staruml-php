# staruml-php
staruml 3.0版本php扩展
扩展程序的变化
原来设定参数的js文件放到了preferences文件夹中，并且用json文件格式，注意：json格式中 type的值都要小写，原来首字母大写
菜单也放到menus文件夹中
main.js
generator.js中都做了修改，原来的导入组件的方式全部取消了

9.30
bug修复，修改了原来注释掉的三个数组函数diff/srecset/isEqual
修复原来生成接口或者抽象类的时候方法后面没有添加分号的错误
-----------------
9.29
bug：生成的接口文件有问题
在把lodash删除替换为ES6的过程中出现较多问题
如_.contains方法就需要includes（indexOf）替换
_.each  --> forEach
_.join -->
isString()-->typeof() == 'string'
数组合并并去重实现_.union功能

mergeArrayMerge (array1, array2) {
    array1.map((v, index) => {
        if (v !== '') {
            let idx = array2.indexOf(v)
            if (idx > -1) {
                array2.splice(idx, 1)
            }
        }
    })
    array1 = array1.concat(array2)
    return array1
}

---------------------

本文来自 一个慢 的CSDN 博客 ，全文地址请点击：https://blog.csdn.net/one_girl/article/details/80593947?utm_source=copy 

修改generator中的generateClass，原来的写法
    generateClass ( elem, basePath , options ) {

        var codeWriter ,
            file ,
            classExtension = ""

        var getFilePath = (classExtenstions) => {
        var absPath = basePath + '/' + elem.name
        if (classExtenstions !== "") {
            absPath += classExtenstions + ".php"
        } else {
            absPath += ".php"
        }
        return absPath
        }
        ......

        if ( elem instanceof type.UMLClass && !elem.stereotype === "annotationType" ) {
            classExtension = options.classExtension
        } else if ( elem instanceof type.UMLInterface ) {
            classExtension = options.interfaceExtension
        }
        file = getFilePath (classExtension)
        fs.writeFileSync ( file , codeWriter.getData () )
    }

问题：这里把getFilePath函数嵌套在了generatorClass方法中，不符合面向对象的概念。!elem.stereotype === "annotationType"表达式错误导致变量classExtension没有获取到options中的值。
修改思路：getFilePath函数移出，并且添加elem、basePath两个参数。表达式改为 elem.stereotype !== "annotationType"
-------------------------------------------------------
2018.9.28 22：30 
第六次，修改generator，使用ES6取代的Lodash特性的函数
Lodash常常需要依赖于npm包，但如果使用ES6，你可能不再需要依赖于npm包。
收集和整理了一些方法和ES6的新特性，这些示例都是来自一些经典的用例中。
Map, Filter, Reduce
收集的这些方法可以用来转换数据，而且它们普遍都得到了支持，我们使用箭头函数特性能让这些写得更为简单。

_.map([1, 2, 3], function(n) { return n * 3; });
// [3, 6, 9]
_.reduce([1, 2, 3], function(total, n) { return total + n; }, 0);
// 6
_.filter([1, 2, 3], function(n) { return n <= 2; });
// [1, 2]

// 可以换成这样

[1, 2, 3].map(n => n * 3);
[1, 2, 3].reduce((total, n) => total + n);
[1, 2, 3].filter(n => n <= 2);
支持的不仅仅这些，如果使用ES6的Polyfill，还可以使用find、some、every和reduceRight。

著作权归作者所有。
商业转载请联系作者获得授权,非商业转载请注明出处。
原文: https://www.w3cplus.com/javascript/lodash-features-replace-es6.html © w3cplus.com


第五次修改，原来的修改后，扩展是添加上了，但是点击菜单中的命令没有反应，此次修改后可以弹出菜单了，但是还不能生成文件夹和文件。
