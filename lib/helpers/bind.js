"use strict";

/**
 *
 * @param {*} fn 函数
 * @param {*} thisArg 函数里的argument
 * @returns 返回一个wrap函数
 */
module.exports = function bind(fn, thisArg) {
    //为啥循环给args复制，可以直接将arguments传入apply
    return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
        }
        //将argument对象放在args里
        return fn.apply(thisArg, args);
    };
};
