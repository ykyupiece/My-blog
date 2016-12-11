/**
 * 通过类名获取元素的兼容写法
 * @param node
 * @param classname(classname传的参数类型为字符串)
 * @returns {*}
 */
function getElementsByClassName(element, classname) {
    if (element.getElementsByClassName) {
        return element.getElementsByClassName(classname);
    }
    else {
        var result = new Array();
        var elems = element.getElementsByTagName("*");
        for (var i = 0; i < elems.length; i++) {
            var elem = elems[i].className;
            var arr = elem.split(" ");
            for (var j = 0; j < arr.length; j++) {
                if (arr[j] === classname) {
                    result.push(elems[i]);
                }
            }
        }
        return result;
    }
}

/**
 * 获取任意对象内部文本的兼容写法
 * @param element
 * @param content
 */
function getInnerText(element) {
    if (element.innerText === "string") {
        return element.innerText;
    }
    else {
        return element.textContent;
    }
}

/**
 * 设置任意对象内部文本的兼容写法
 * @param element
 * @param content
 */
function setInnerText(element, content) {
    if (typeof element.innerText === "string") {
        element.innerText = content;
    }
    else {
        element.textContent = content;
    }
}
/**
 *在页面加载完成时，执行参数中的方法，window.onload方法的增强版！
 * @param func
 */
function addLoadEvent(func) {
    var oldonload = window.onload;            //把现有的window.onload事件处理函数的值存入变量oldonload.
    if (typeof window.onload != 'function') {
        window.onload = func;                //如果在这个处理函数上还没有绑定任何函数，就像平常那样把新函数添加给它。
    } else {
        window.onload = function () {       //如果在这个处理函数上已经绑定了一些函数，就把新函数追加到现有函数的末尾。
            oldonload();
            func();
        }
    }
}

/**
 * 获取上一个兄弟元素的兼容写法
 * @param element
 * @returns {*}
 */
function getPreviousElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling;
    } else {
        var el = element.previousSibling;//上一个兄弟节点
        while (el && 1 !== el.nodeType) {
            el = el.previousSibling;
        }
        return el;
    }
}

/**
 * 获取下一个兄弟元素的兼容写法
 * @param element
 * @returns {*}
 */
function getNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling;//如果能找到就直接返回
    } else {
        var el = element.nextSibling;
        while (el && el.nodeType !== 1) {//有 而且不是元素
            //此时就要继续往下找
            el = el.nextSibling;
        }
        return el;
    }
}
/**
 * 获取任意对象的第一个子元素的兼容写法
 * @param element
 * @returns {*}
 */
function getFirstElementChild(element) {
    if (element.firstElementChild) {
        return element.firstElementChild;
    }
    var el = element.firstChild;
    while (el && 1 !== el.nodeType) {
        el = el.nextSibling;
    }
    return el;
}
/**
 * 获取任意对象的最后一个子元素的兼容写法
 * @param element
 * @returns {*}
 */
function getLastElement(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    }
    var el = element.lastChild;
    while (el && 1 != el.nodeType) {
        el = el.previousSibling;
    }
    return el;
}
/**
 * 数组的深层复制，返回新数组
 * @param arr
 * @returns {any[]|Array}
 */
function deepClone(arr) {
    var newArr = new Array();
    for (var i = 0; i < arr.length; i++) {
        newArr[newArr.length] = arr[i];
    }
    return newArr;
}

/**
 * 对于数组sort方法改进的封装，返回一个新数组，并且不对元数组产生影响。
 * @param fn
 * @returns {any[]|Array}
 */
Array.prototype.newSort = function (fn) {
    var newArr = new Array();
    for (var i = 0; i < this.length; i++) {
        newArr[i] = this[i];
    }
    for (var i = 0; i < newArr.length - 1; i++) {
        var flag = true;
        for (var j = 0; j < newArr.length - 1 - i; j++) {
            if (fn(newArr[j], newArr[j + 1]) > 0) {
                var temp = newArr[j];
                newArr[j] = newArr[j + 1];
                newArr[j + 1] = temp;
                flag = false;
            }
        }
        if (flag) {
            break;
        }
    }
    return newArr;

}

/**
 * 对于数组reverse方法的改进，返回新数组，不对元数组产生影响
 * @returns {any[]|Array}
 */
Array.prototype.newReverse = function () {
    var newArr = new Array();
    for (var i = this.length - 1; i >= 0; i--) {
        newArr[newArr.length] = arr[i];
    }
    return newArr;
}

/**
 * 相对于insertBefore,insertAfter方法的封装
 * @param newElement
 * @param targetElement
 */
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (targetElement === parent.lastElementChild) {
        parent.appendChild(newElement);
    }
    else {
        parent.insertBefore(newElement, targetElement.nextElementSibling);
    }
}

/**缓动动画框架封装
 * 获取任意对象计算后的任意样式属性
 * @param obj
 * @param attr
 * @returns {*}
 */
function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj, null)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

function animate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flag = true;
        for (var key in json) {
            if (key === "opacity") {
                var leader = getStyle(obj, key) * 100;
                var target = json[key] * 100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[key] = leader / 100;
            }
            //兼容ie678透明度的设置
            else if (key === "filter") {
                var str = getStyle(obj, key);
                var leader = parseInt(str.substring(14, str.length - 1)) || 100;
                var target = parseInt(json[key]);
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[key] = "alpha(opacity=" + leader + ")";
            }
            else if (key === "zIndex") {
                obj.style[key] = json[key];
            }
            else {
                var leader = parseInt(getStyle(obj, key)) || 0;
                var target = json[key];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                leader = leader + step;
                obj.style[key] = leader + "px";

            }
            if (leader !== target) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 15);
}
/**
 * 获取网页可视区域(clientWidth clientHeight)方法的封装
 * @returns {{clientWidth: number, clientHeight: number}}
 */
function client() {
    return {
        clientWidth: window.innerWidth || document.documentElement.clientWidth ||
        document.body.clientWidth || 0,
        clientHeight: window.innerHeight || document.documentElement.clientHeight ||
        document.body.clientHeight,
    }
}
/**
 * 获取页面滚动坐标(scrollTop scrollLeft)兼容性方法封装
 * @returns {{scrollTop: number, scrollLeft: number}}
 */
function scroll() {
    return {
        scrollTop: window.pageYOffset || document.documentElement.scrollTop ||
        document.body.scrollTop,
        scrollLeft: window.pageXOffset || document.documentElement.scrollLeft ||
        document.body.scrollLeft
    }
}
//event事件对象工具包
var eventUtil = {
    getEvent: function (event) {
        return event || window.event;
    },
    getPageX: function (event) {
        return event.pageX || event.clientX + document.documentElement.scrollLeft;
    },
    getPageY: function (event) {
        return event.pageY || event.clientY + document.documentElement.scrollTop;
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    }
};
/**
 * addClass方法的封装
 * @param element
 * @param theclass
 */
function addClass(element, theclass) {
    if (element.className === "") {
        element.className = theclass;
    }
    else {
        var arr = element.className.split(" ");
        arr.push(theclass);
        element.className=arr.join(" ");
    }
}
/**
 * removeClass方法的封装
 * @param element
 * @param theclass
 */
function removeClass(element, theclass) {

    if(!element.className){
        return;
    }

    else {
        if (element.className === theclass) {
            element.removeAttribute("class");
        }
        else {
            var arr = element.className.split(" ");
            var arr1 = [];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === theclass) {
                    continue;
                }
                arr1[arr1.length] = arr[i];
            }
            element.className = arr1.join(" ");
        }
    }
}

