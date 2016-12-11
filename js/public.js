/**
 * ͨ��������ȡԪ�صļ���д��
 * @param node
 * @param classname(classname���Ĳ�������Ϊ�ַ���)
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
 * ��ȡ��������ڲ��ı��ļ���д��
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
 * ������������ڲ��ı��ļ���д��
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
 *��ҳ��������ʱ��ִ�в����еķ�����window.onload��������ǿ�棡
 * @param func
 */
function addLoadEvent(func) {
    var oldonload = window.onload;            //�����е�window.onload�¼���������ֵ�������oldonload.
    if (typeof window.onload != 'function') {
        window.onload = func;                //���������������ϻ�û�а��κκ���������ƽ���������º�����Ӹ�����
    } else {
        window.onload = function () {       //�����������������Ѿ�����һЩ�������Ͱ��º���׷�ӵ����к�����ĩβ��
            oldonload();
            func();
        }
    }
}

/**
 * ��ȡ��һ���ֵ�Ԫ�صļ���д��
 * @param element
 * @returns {*}
 */
function getPreviousElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling;
    } else {
        var el = element.previousSibling;//��һ���ֵܽڵ�
        while (el && 1 !== el.nodeType) {
            el = el.previousSibling;
        }
        return el;
    }
}

/**
 * ��ȡ��һ���ֵ�Ԫ�صļ���д��
 * @param element
 * @returns {*}
 */
function getNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling;//������ҵ���ֱ�ӷ���
    } else {
        var el = element.nextSibling;
        while (el && el.nodeType !== 1) {//�� ���Ҳ���Ԫ��
            //��ʱ��Ҫ����������
            el = el.nextSibling;
        }
        return el;
    }
}
/**
 * ��ȡ�������ĵ�һ����Ԫ�صļ���д��
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
 * ��ȡ�����������һ����Ԫ�صļ���д��
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
 * �������㸴�ƣ�����������
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
 * ��������sort�����Ľ��ķ�װ������һ�������飬���Ҳ���Ԫ�������Ӱ�졣
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
 * ��������reverse�����ĸĽ������������飬����Ԫ�������Ӱ��
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
 * �����insertBefore,insertAfter�����ķ�װ
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

/**����������ܷ�װ
 * ��ȡ������������������ʽ����
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
            //����ie678͸���ȵ�����
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
 * ��ȡ��ҳ��������(clientWidth clientHeight)�����ķ�װ
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
 * ��ȡҳ���������(scrollTop scrollLeft)�����Է�����װ
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
//event�¼����󹤾߰�
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
 * addClass�����ķ�װ
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
 * removeClass�����ķ�װ
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

