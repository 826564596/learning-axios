"use strict";

var utils = require("./utils"); // 引入工具函数
var bind = require("./helpers/bind"); // 引入bind方法
var Axios = require("./core/Axios"); //引入Axios构造函数
var mergeConfig = require("./core/mergeConfig"); //合并配置方法
var defaults = require("./defaults"); // 引入默认配置

/**
 * 创建Axios的实列
 *
 * @param {Object} 实例使用默认配置
 * @return {Axios} 返回一个Axios的实例
 */
function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig);

    //bind 返回一个wrap函数
    var instance = bind(Axios.prototype.request, context);

    // 复制Axios.prototype到实例上
    utils.extend(instance, Axios.prototype, context);

    // 复制context 到 实例上
    utils.extend(instance, context);

    // 创建一个实例的工厂，用户可以自己创建一些参数，通过mergeConfig合并配置
    instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };

    return instance;
}

// 导出创建的一个默认实例
var axios = createInstance(defaults);

// 暴露出Axios class 允许class继承
axios.Axios = Axios;

// Expose Cancel & CancelToken
// 暴露出取消方法和取消标志
axios.Cancel = require("./cancel/Cancel");
axios.CancelToken = require("./cancel/CancelToken");
axios.isCancel = require("./cancel/isCancel");

// Expose all/spread
// 暴露出all 和 spread API
axios.all = function all(promises) {
    return Promise.all(promises);
};
axios.spread = require("./helpers/spread");

// Expose isAxiosError
axios.isAxiosError = require("./helpers/isAxiosError");

module.exports = axios;

// Allow use of default import syntax in TypeScript

// 可以使用这个方式引用 import axios from 'axios';
module.exports.default = axios;
