# staruml-php
staruml 3.0版本php扩展

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
