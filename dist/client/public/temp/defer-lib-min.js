!window.XMLHttpRequest||window.FileAPI&&FileAPI.shouldLoad||(window.XMLHttpRequest.prototype.setRequestHeader=function(e){return function(t,n){if("__setXHR_"===t){var r=n(this);r instanceof Function&&r(this)}else e.apply(this,arguments)}}(window.XMLHttpRequest.prototype.setRequestHeader));var ngFileUpload=angular.module("ngFileUpload",[]);ngFileUpload.version="7.3.8",ngFileUpload.service("UploadBase",["$http","$q","$timeout",function(e,t,n){function r(r){function o(e){s.notify&&s.notify(e),f.progressFunc&&n(function(){f.progressFunc(e)})}function l(e){return null!=r._start&&a?{loaded:e.loaded+r._start,total:r._file.size,type:e.type,config:r,lengthComputable:!0,target:e.target}:e}function u(){e(r).then(function(e){a&&r._chunkSize&&!r._finished?(o({loaded:r._end,total:r._file.size,config:r,type:"progress"}),i.upload(r)):(r._finished&&delete r._finished,s.resolve(e))},function(e){s.reject(e)},function(e){s.notify(e)})}r.method=r.method||"POST",r.headers=r.headers||{};var s=r._deferred=r._deferred||t.defer(),f=s.promise;return r.headers.__setXHR_=function(){return function(e){e&&(r.__XHR=e,r.xhrFn&&r.xhrFn(e),e.upload.addEventListener("progress",function(e){e.config=r,o(l(e))},!1),e.upload.addEventListener("load",function(e){e.lengthComputable&&(e.config=r,o(l(e)))},!1))}},a?r._chunkSize&&r._end&&!r._finished?(r._start=r._end,r._end+=r._chunkSize,u()):r.resumeSizeUrl?e.get(r.resumeSizeUrl).then(function(e){r.resumeSizeResponseReader?r._start=r.resumeSizeResponseReader(e.data):r._start=parseInt((null==e.data.size?e.data:e.data.size).toString()),r._chunkSize&&(r._end=r._start+r._chunkSize),u()},function(e){throw e}):r.resumeSize?r.resumeSize().then(function(e){r._start=e,u()},function(e){throw e}):u():u(),f.success=function(e){return f.then(function(t){e(t.data,t.status,t.headers,r)}),f},f.error=function(e){return f.then(null,function(t){e(t.data,t.status,t.headers,r)}),f},f.progress=function(e){return f.progressFunc=e,f.then(null,null,function(t){e(t)}),f},f.abort=f.pause=function(){return r.__XHR&&n(function(){r.__XHR.abort()}),f},f.xhr=function(e){return r.xhrFn=function(t){return function(){t&&t.apply(f,arguments),e.apply(f,arguments)}}(r.xhrFn),f},f}var i=this;this.isResumeSupported=function(){return window.Blob&&(new Blob).slice};var a=this.isResumeSupported();this.upload=function(e){function t(n,r,i){if(void 0!==r)if(angular.isDate(r)&&(r=r.toISOString()),angular.isString(r))n.append(i,r);else if("form"===e.sendFieldsAs)if(angular.isObject(r))for(var a in r)r.hasOwnProperty(a)&&t(n,r[a],i+"["+a+"]");else n.append(i,r);else r=angular.isString(r)?r:angular.toJson(r),"json-blob"===e.sendFieldsAs?n.append(i,new Blob([r],{type:"application/json"})):n.append(i,r)}function n(e){return e instanceof Blob||e.flashId&&e.name&&e.size}function o(t,r,i){if(n(r)){if(e._file=e._file||r,null!=e._start&&a){e._end&&e._end>=r.size&&(e._finished=!0,e._end=r.size);var l=r.slice(e._start,e._end||r.size);l.name=r.name,r=l,e._chunkSize&&(t.append("chunkSize",e._end-e._start),t.append("chunkNumber",Math.floor(e._start/e._chunkSize)),t.append("totalSize",e._file.size))}t.append(i,r,r.fileName||r.name)}else{if(!angular.isObject(r))throw"Expected file object in Upload.upload file option: "+r.toString();for(var u in r)if(r.hasOwnProperty(u)){var s=u.split(",");s[1]&&(r[u].fileName=s[1].replace(/^\s+|\s+$/g,"")),o(t,r[u],s[0])}}}return e._chunkSize=i.translateScalars(e.resumeChunkSize),e._chunkSize=e._chunkSize?parseInt(e._chunkSize.toString()):null,e.headers=e.headers||{},e.headers["Content-Type"]=void 0,e.transformRequest=e.transformRequest?angular.isArray(e.transformRequest)?e.transformRequest:[e.transformRequest]:[],e.transformRequest.push(function(n){var r,i=new FormData,a={};for(r in e.fields)e.fields.hasOwnProperty(r)&&(a[r]=e.fields[r]);n&&(a.data=n);for(r in a)if(a.hasOwnProperty(r)){var l=a[r];e.formDataAppender?e.formDataAppender(i,r,l):t(i,l,r)}if(null!=e.file)if(angular.isArray(e.file))for(var u=0;u<e.file.length;u++)o(i,e.file[u],"file");else o(i,e.file,"file");return i}),r(e)},this.http=function(t){return t.transformRequest=t.transformRequest||function(t){return window.ArrayBuffer&&t instanceof window.ArrayBuffer||t instanceof Blob?t:e.defaults.transformRequest[0].apply(this,arguments)},t._chunkSize=i.translateScalars(t.resumeChunkSize),t._chunkSize=t._chunkSize?parseInt(t._chunkSize.toString()):null,r(t)},this.translateScalars=function(e){if(angular.isString(e)){if(e.search(/kb/i)===e.length-2)return parseFloat(1e3*e.substring(0,e.length-2));if(e.search(/mb/i)===e.length-2)return parseFloat(1e6*e.substring(0,e.length-2));if(e.search(/gb/i)===e.length-2)return parseFloat(1e9*e.substring(0,e.length-2));if(e.search(/b/i)===e.length-1)return parseFloat(e.substring(0,e.length-1));if(e.search(/s/i)===e.length-1)return parseFloat(e.substring(0,e.length-1));if(e.search(/m/i)===e.length-1)return parseFloat(60*e.substring(0,e.length-1));if(e.search(/h/i)===e.length-1)return parseFloat(3600*e.substring(0,e.length-1))}return e},this.setDefaults=function(e){this.defaults=e||{}},this.defaults={},this.version=ngFileUpload.version}]),ngFileUpload.service("Upload",["$parse","$timeout","$compile","UploadResize",function(e,t,n,r){var i=r;return i.getAttrWithDefaults=function(e,t){return null!=e[t]?e[t]:null==i.defaults[t]?i.defaults[t]:i.defaults[t].toString()},i.attrGetter=function(t,n,r,i){if(!r)return this.getAttrWithDefaults(n,t);try{return i?e(this.getAttrWithDefaults(n,t))(r,i):e(this.getAttrWithDefaults(n,t))(r)}catch(a){if(t.search(/min|max|pattern/i))return this.getAttrWithDefaults(n,t);throw a}},i.updateModel=function(n,r,a,o,l,u,s){function f(){var s=l&&l.length?l[0]:null;if(n){var f=!i.attrGetter("ngfMultiple",r,a)&&!i.attrGetter("multiple",r)&&!p;e(i.attrGetter("ngModel",r)).assign(a,f?s:l)}var c=i.attrGetter("ngfModel",r);c&&e(c).assign(a,l),o&&e(o)(a,{$files:l,$file:s,$newFiles:d,$duplicateFiles:g,$event:u}),t(function(){})}function c(e,t){var n=i.attrGetter("ngfResize",r,a);if(!n||!i.isResizeSupported())return t();for(var o=e.length,l=function(){o--,0===o&&t()},u=function(t){return function(n){e.splice(t,1,n),l()}},s=function(e){return function(t){l(),e.$error="resize",e.$errorParam=(t?(t.message?t.message:t)+": ":"")+(e&&e.name)}},f=0;f<e.length;f++){var c=e[f];c.$error||0!==c.type.indexOf("image")?l():i.resize(c,n.width,n.height,n.quality).then(u(f),s(c))}}var d=l,g=[],h=(n&&n.$modelValue||r.$$ngfPrevFiles||[]).slice(0),p=i.attrGetter("ngfKeep",r,a);if(p===!0){if(!l||!l.length)return;var m=!1;if(i.attrGetter("ngfKeepDistinct",r,a)===!0){for(var v=h.length,b=0;b<l.length;b++){for(var $=0;v>$;$++)if(l[b].name===h[$].name){g.push(l[b]);break}$===v&&(h.push(l[b]),m=!0)}if(!m)return;l=h}else l=h.concat(l)}r.$$ngfPrevFiles=l,s?f():i.validate(l,n,r,a,i.attrGetter("ngfValidateLater",r),function(){c(l,function(){t(function(){f()})})});for(var w=h.length;w--;){var y=h[w];window.URL&&y.blobUrl&&(URL.revokeObjectURL(y.blobUrl),delete y.blobUrl)}},i}]),ngFileUpload.directive("ngfSelect",["$parse","$timeout","$compile","Upload",function(e,t,n,r){function i(e){var t=e.match(/Android[^\d]*(\d+)\.(\d+)/);if(t&&t.length>2){var n=r.defaults.androidFixMinorVersion||4;return parseInt(t[1])<4||parseInt(t[1])===n&&parseInt(t[2])<n}return-1===e.indexOf("Chrome")&&/.*Windows.*Safari.*/.test(e)}function a(e,t,n,r,a,l,u,s){function f(){return"input"===t[0].tagName.toLowerCase()&&n.type&&"file"===n.type.toLowerCase()}function c(){return $("ngfChange")||$("ngfSelect")}function d(t){for(var i=t.__files_||t.target&&t.target.files,a=[],o=0;o<i.length;o++)a.push(i[o]);s.updateModel(r,n,e,c(),a.length?a:null,t)}function g(e){if(t!==e)for(var n=0;n<t[0].attributes.length;n++){var r=t[0].attributes[n];"type"!==r.name&&"class"!==r.name&&"id"!==r.name&&"style"!==r.name&&((null==r.value||""===r.value)&&("required"===r.name&&(r.value="required"),"multiple"===r.name&&(r.value="multiple")),e.attr(r.name,r.value))}}function h(){if(f())return t;var e=angular.element('<input type="file">');return g(e),e.css("visibility","hidden").css("position","absolute").css("overflow","hidden").css("width","0px").css("height","0px").css("border","none").css("margin","0px").css("padding","0px").attr("tabindex","-1"),o.push({el:t,ref:e}),document.body.appendChild(e[0]),e}function p(n){if(t.attr("disabled")||$("ngfSelectDisabled",e))return!1;var r=m(n);return null!=r?r:(v(n),i(navigator.userAgent)?setTimeout(function(){_[0].click()},0):_[0].click(),!1)}function m(e){var t=e.changedTouches||e.originalEvent&&e.originalEvent.changedTouches;if("touchstart"===e.type)return y=t?t[0].clientY:0,!0;if(e.stopPropagation(),e.preventDefault(),"touchend"===e.type){var n=t?t[0].clientY:0;if(Math.abs(n-y)>20)return!1}}function v(t){_.val()&&(_.val(null),s.updateModel(r,n,e,c(),null,t,!0))}function b(e){if(_&&!_.attr("__ngf_ie10_Fix_")){if(!_[0].parentNode)return void(_=null);e.preventDefault(),e.stopPropagation(),_.unbind("click");var t=_.clone();return _.replaceWith(t),_=t,_.attr("__ngf_ie10_Fix_","true"),_.bind("change",d),_.bind("click",b),_[0].click(),!1}_.removeAttr("__ngf_ie10_Fix_")}var $=function(e,t){return s.attrGetter(e,n,t)},w=[];w.push(e.$watch($("ngfMultiple"),function(){_.attr("multiple",$("ngfMultiple",e))})),w.push(e.$watch($("ngfCapture"),function(){_.attr("capture",$("ngfCapture",e))})),n.$observe("accept",function(){_.attr("accept",$("accept"))}),w.push(function(){n.$$observers&&delete n.$$observers.accept});var y=0,_=t;f()||(_=h()),_.bind("change",d),f()?t.bind("click",v):t.bind("click touchstart touchend",p),s.registerValidators(r,_,n,e),-1!==navigator.appVersion.indexOf("MSIE 10")&&_.bind("click",b),e.$on("$destroy",function(){f()||_.remove(),angular.forEach(w,function(e){e()})}),l(function(){for(var e=0;e<o.length;e++){var t=o[e];document.body.contains(t.el[0])||(o.splice(e,1),t.ref.remove())}}),window.FileAPI&&window.FileAPI.ngfFixIE&&window.FileAPI.ngfFixIE(t,_,d)}var o=[];return{restrict:"AEC",require:"?ngModel",link:function(i,o,l,u){a(i,o,l,u,e,t,n,r)}}}]),function(){function e(e){return"img"===e.tagName.toLowerCase()?"image":"audio"===e.tagName.toLowerCase()?"audio":"video"===e.tagName.toLowerCase()?"video":/./}function t(t,n,r,i,a,o,l,u){function s(e){var o=t.attrGetter("ngfNoObjectUrl",a,r);t.dataUrl(e,o)["finally"](function(){n(function(){var t=(o?e.dataUrl:e.blobUrl)||e.dataUrl;u?i.css("background-image","url('"+(t||"")+"')"):i.attr("src",t),t?i.removeClass("ngf-hide"):i.addClass("ngf-hide")})})}n(function(){var n=r.$watch(a[o],function(n){var r=l;if("ngfThumbnail"===o&&(r||(r={width:i[0].clientWidth,height:i[0].clientHeight}),0===r.width&&window.getComputedStyle)){var a=getComputedStyle(i[0]);r={width:parseInt(a.width.slice(0,-2)),height:parseInt(a.height.slice(0,-2))}}return angular.isString(n)?(i.removeClass("ngf-hide"),u?i.css("background-image","url('"+n+"')"):i.attr("src",n)):void(!n||!n.type||0!==n.type.search(e(i[0]))||u&&0!==n.type.indexOf("image")?i.addClass("ngf-hide"):r&&t.isResizeSupported()?t.resize(n,r.width,r.height,r.quality).then(function(e){s(e)},function(e){throw e}):s(n))});r.$on("$destroy",function(){n()})})}ngFileUpload.service("UploadDataUrl",["UploadBase","$timeout","$q",function(e,t,n){var r=e;return r.dataUrl=function(e,r){if(r&&null!=e.dataUrl||!r&&null!=e.blobUrl){var i=n.defer();return t(function(){i.resolve(r?e.dataUrl:e.blobUrl)}),i.promise}var a=r?e.$ngfDataUrlPromise:e.$ngfBlobUrlPromise;if(a)return a;var o=n.defer();return t(function(){if(window.FileReader&&e&&(!window.FileAPI||-1===navigator.userAgent.indexOf("MSIE 8")||e.size<2e4)&&(!window.FileAPI||-1===navigator.userAgent.indexOf("MSIE 9")||e.size<4e6)){var n=window.URL||window.webkitURL;if(n&&n.createObjectURL&&!r){var i;try{i=n.createObjectURL(e)}catch(a){return void t(function(){e.blobUrl="",o.reject()})}t(function(){e.blobUrl=i,i&&o.resolve(i)})}else{var l=new FileReader;l.onload=function(n){t(function(){e.dataUrl=n.target.result,o.resolve(n.target.result)})},l.onerror=function(){t(function(){e.dataUrl="",o.reject()})},l.readAsDataURL(e)}}else t(function(){e[r?"dataUrl":"blobUrl"]="",o.reject()})}),a=r?e.$ngfDataUrlPromise=o.promise:e.$ngfBlobUrlPromise=o.promise,a["finally"](function(){delete e[r?"$ngfDataUrlPromise":"$ngfBlobUrlPromise"]}),a},r}]);var n=angular.element("<style>.ngf-hide{display:none !important}</style>");document.getElementsByTagName("head")[0].appendChild(n[0]),ngFileUpload.directive("ngfSrc",["Upload","$timeout",function(e,n){return{restrict:"AE",link:function(r,i,a){t(e,n,r,i,a,"ngfSrc",e.attrGetter("ngfResize",a,r),!1)}}}]),ngFileUpload.directive("ngfBackground",["Upload","$timeout",function(e,n){return{restrict:"AE",link:function(r,i,a){t(e,n,r,i,a,"ngfBackground",e.attrGetter("ngfResize",a,r),!0)}}}]),ngFileUpload.directive("ngfThumbnail",["Upload","$timeout",function(e,n){return{restrict:"AE",link:function(r,i,a){var o=e.attrGetter("ngfSize",a,r);t(e,n,r,i,a,"ngfThumbnail",o,e.attrGetter("ngfAsBackground",a,r))}}}])}(),ngFileUpload.service("UploadValidate",["UploadDataUrl","$q","$timeout",function(e,t,n){function r(e){if(e.length>2&&"/"===e[0]&&"/"===e[e.length-1])return e.substring(1,e.length-1);var t=e.split(","),n="";if(t.length>1)for(var i=0;i<t.length;i++)n+="("+r(t[i])+")",i<t.length-1&&(n+="|");else 0===e.indexOf(".")&&(e="*"+e),n="^"+e.replace(new RegExp("[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]","g"),"\\$&")+"$",n=n.replace(/\\\*/g,".*").replace(/\\\?/g,".");return n}var i=e;return i.registerValidators=function(e,t,n,r){function a(e){angular.forEach(e.$ngfValidations,function(t){e.$setValidity(t.name,t.valid)})}e&&(e.$ngfValidations=[],e.$formatters.push(function(o){return i.attrGetter("ngfValidateLater",n,r)||!e.$$ngfValidated?(i.validate(o,e,n,r,!1,function(){a(e),e.$$ngfValidated=!1}),o&&0===o.length&&(o=null),!t||null!=o&&0!==o.length||t.val()&&t.val(null)):(a(e),e.$$ngfValidated=!1),o}))},i.validatePattern=function(e,t){if(!t)return!0;var n=new RegExp(r(t),"gi");return null!=e.type&&n.test(e.type.toLowerCase())||null!=e.name&&n.test(e.name.toLowerCase())},i.validate=function(e,t,n,r,a,o){function l(n,r,i){if(e){for(var a="ngf"+n[0].toUpperCase()+n.substr(1),o=e.length,l=null;o--;){var u=e[o],f=s(a,{$file:u});null==f&&(f=r(s("ngfValidate")||{}),l=null==l?!0:l),null!=f&&(i(u,f)||(u.$error=n,u.$errorParam=f,e.splice(o,1),l=!1))}null!==l&&t.$ngfValidations.push({name:n,valid:l})}}function u(n,r,i,a,l){if(e){var u=0,c=!1,d="ngf"+n[0].toUpperCase()+n.substr(1);e=void 0===e.length?[e]:e,angular.forEach(e,function(e){if(0!==e.type.search(i))return!0;var g=s(d,{$file:e})||r(s("ngfValidate",{$file:e})||{});g&&(f++,u++,a(e,g).then(function(t){l(t,g)||(e.$error=n,e.$errorParam=g,c=!0)},function(){s("ngfValidateForce",{$file:e})&&(e.$error=n,e.$errorParam=g,c=!0)})["finally"](function(){f--,u--,u||t.$ngfValidations.push({name:n,valid:!c}),f||o.call(t,t.$ngfValidations)}))})}}t=t||{},t.$ngfValidations=t.$ngfValidations||[],angular.forEach(t.$ngfValidations,function(e){e.valid=!0});var s=function(e,t){return i.attrGetter(e,n,r,t)};if(a)return void o.call(t);if(t.$$ngfValidated=!0,null==e||0===e.length)return void o.call(t);if(e=void 0===e.length?[e]:e.slice(0),l("pattern",function(e){return e.pattern},i.validatePattern),l("minSize",function(e){return e.size&&e.size.min},function(e,t){return e.size>=i.translateScalars(t)}),l("maxSize",function(e){return e.size&&e.size.max},function(e,t){return e.size<=i.translateScalars(t)}),l("validateFn",function(){return null},function(e,t){return t===!0||null===t||""===t}),!e.length)return void o.call(t,t.$ngfValidations);var f=0;u("maxHeight",function(e){return e.height&&e.height.max},/image/,this.imageDimensions,function(e,t){return e.height<=t}),u("minHeight",function(e){return e.height&&e.height.min},/image/,this.imageDimensions,function(e,t){return e.height>=t}),u("maxWidth",function(e){return e.width&&e.width.max},/image/,this.imageDimensions,function(e,t){return e.width<=t}),u("minWidth",function(e){return e.width&&e.width.min},/image/,this.imageDimensions,function(e,t){return e.width>=t}),u("ratio",function(e){return e.ratio},/image/,this.imageDimensions,function(e,t){for(var n=t.toString().split(","),r=!1,i=0;i<n.length;i++){var a=n[i],o=a.search(/x/i);a=o>-1?parseFloat(a.substring(0,o))/parseFloat(a.substring(o+1)):parseFloat(a),Math.abs(e.width/e.height-a)<1e-4&&(r=!0)}return r}),u("maxDuration",function(e){return e.duration&&e.duration.max},/audio|video/,this.mediaDuration,function(e,t){return e<=i.translateScalars(t)}),u("minDuration",function(e){return e.duration&&e.duration.min},/audio|video/,this.mediaDuration,function(e,t){return e>=i.translateScalars(t)}),u("validateAsyncFn",function(){return null},/./,function(e,t){return t},function(e){return e===!0||null===e||""===e}),f||o.call(t,t.$ngfValidations)},i.imageDimensions=function(e){if(e.width&&e.height){var r=t.defer();return n(function(){r.resolve({width:e.width,height:e.height})}),r.promise}if(e.$ngfDimensionPromise)return e.$ngfDimensionPromise;var a=t.defer();return n(function(){return 0!==e.type.indexOf("image")?void a.reject("not image"):void i.dataUrl(e).then(function(t){function r(){var t=l[0].clientWidth,n=l[0].clientHeight;l.remove(),e.width=t,e.height=n,a.resolve({width:t,height:n})}function i(){l.remove(),a.reject("load error")}function o(){n(function(){l[0].parentNode&&(l[0].clientWidth?r():u>10?i():o())},1e3)}var l=angular.element("<img>").attr("src",t).css("visibility","hidden").css("position","fixed");l.on("load",r),l.on("error",i);var u=0;o(),angular.element(document.getElementsByTagName("body")[0]).append(l)},function(){a.reject("load error")})}),e.$ngfDimensionPromise=a.promise,e.$ngfDimensionPromise["finally"](function(){delete e.$ngfDimensionPromise}),e.$ngfDimensionPromise},i.mediaDuration=function(e){if(e.duration){var r=t.defer();return n(function(){r.resolve(e.duration)}),r.promise}if(e.$ngfDurationPromise)return e.$ngfDurationPromise;var a=t.defer();return n(function(){return 0!==e.type.indexOf("audio")&&0!==e.type.indexOf("video")?void a.reject("not media"):void i.dataUrl(e).then(function(t){function r(){var t=l[0].duration;e.duration=t,l.remove(),a.resolve(t)}function i(){l.remove(),a.reject("load error")}function o(){n(function(){l[0].parentNode&&(l[0].duration?r():u>10?i():o())},1e3)}var l=angular.element(0===e.type.indexOf("audio")?"<audio>":"<video>").attr("src",t).css("visibility","none").css("position","fixed");l.on("loadedmetadata",r),l.on("error",i);var u=0;o(),angular.element(document.body).append(l)},function(){a.reject("load error")})}),e.$ngfDurationPromise=a.promise,e.$ngfDurationPromise["finally"](function(){delete e.$ngfDurationPromise}),e.$ngfDurationPromise},i}]),ngFileUpload.service("UploadResize",["UploadValidate","$q","$timeout",function(e,t,n){var r=e,i=function(e,t,n,r){var i=Math.min(n/e,r/t);return{width:e*i,height:t*i}},a=function(e,n,r,a,o){var l=t.defer(),u=document.createElement("canvas"),s=document.createElement("img");return 0===n&&(n=s.width,r=s.height),s.onload=function(){try{var e=i(s.width,s.height,n,r);u.width=e.width,u.height=e.height;var t=u.getContext("2d");t.drawImage(s,0,0,e.width,e.height),l.resolve(u.toDataURL(o||"image/WebP",a||1))}catch(f){l.reject(f)}},s.onerror=function(){l.reject()},s.src=e,l.promise},o=function(e){for(var t=e.split(","),n=t[0].match(/:(.*?);/)[1],r=atob(t[1]),i=r.length,a=new Uint8Array(i);i--;)a[i]=r.charCodeAt(i);return new Blob([a],{type:n})};return r.isResizeSupported=function(){var e=document.createElement("canvas");return window.atob&&e.getContext&&e.getContext("2d")},r.resize=function(e,i,l,u){var s=t.defer();return 0!==e.type.indexOf("image")?(n(function(){s.resolve("Only images are allowed for resizing!")}),s.promise):(r.dataUrl(e,!0).then(function(t){a(t,i,l,u,e.type).then(function(t){var n=o(t);n.name=e.name,s.resolve(n)},function(){s.reject()})},function(){s.reject()}),s.promise)},r}]),function(){function e(e,n,r,i,a,o,l,u){function s(){return n.attr("disabled")||g("ngfDropDisabled",e)}function f(e,t,n,r){var i=g("ngfDragOverClass",e,{$event:n}),a=g("ngfDragOverClass")||"dragover";if(angular.isString(i))return void r(i);if(i&&(i.delay&&(v=i.delay),i.accept||i.reject)){var o=n.dataTransfer.items;if(null!=o)for(var l=g("ngfPattern",e,{$event:n}),s=0;s<o.length;s++)if("file"===o[s].kind||""===o[s].kind){if(!u.validatePattern(o[s],l)){a=i.reject;break}a=i.accept}}r(a)}function c(e,t,n,r){function i(e,t,n){if(null!=t)if(t.isDirectory){var r=(n||"")+t.name;e.push({name:t.name,type:"directory",path:r});var a=t.createReader(),o=[];u++;var l=function(){a.readEntries(function(r){try{if(r.length)o=o.concat(Array.prototype.slice.call(r||[],0)),l();else{for(var a=0;a<o.length;a++)i(e,o[a],(n?n:"")+t.name+"/");u--}}catch(s){u--,console.error(s)}},function(){u--})};l()}else u++,t.file(function(t){try{u--,t.path=(n?n:"")+t.name,e.push(t)}catch(r){u--,console.error(r)}},function(){u--})}var a=[],u=0,s=e.dataTransfer.items;if(s&&s.length>0&&"file"!==l.protocol())for(var f=0;f<s.length;f++){if(s[f].webkitGetAsEntry&&s[f].webkitGetAsEntry()&&s[f].webkitGetAsEntry().isDirectory){var c=s[f].webkitGetAsEntry();if(c.isDirectory&&!n)continue;null!=c&&i(a,c)}else{var d=s[f].getAsFile();null!=d&&a.push(d)}if(!r&&a.length>0)break}else{var g=e.dataTransfer.files;if(null!=g)for(var h=0;h<g.length&&(a.push(g.item(h)),r||!(a.length>0));h++);}var p=0;!function m(e){o(function(){if(u)10*p++<2e4&&m(10);else{if(!r&&a.length>1){for(f=0;"directory"===a[f].type;)f++;a=[a[f]]}t(a)}},e||0)}()}var d=t(),g=function(e,t,n){return u.attrGetter(e,r,t,n)};if(g("dropAvailable")&&o(function(){e[g("dropAvailable")]?e[g("dropAvailable")].value=d:e[g("dropAvailable")]=d}),!d)return void(g("ngfHideOnDropNotAvailable",e)===!0&&n.css("display","none"));u.registerValidators(i,null,r,e);var h,p=null,m=a(g("ngfStopPropagation")),v=1;n[0].addEventListener("dragover",function(t){if(!s()){if(t.preventDefault(),m(e)&&t.stopPropagation(),navigator.userAgent.indexOf("Chrome")>-1){var i=t.dataTransfer.effectAllowed;t.dataTransfer.dropEffect="move"===i||"linkMove"===i?"move":"copy"}o.cancel(p),h||(h="C",f(e,r,t,function(e){h=e,n.addClass(h)}))}},!1),n[0].addEventListener("dragenter",function(t){s()||(t.preventDefault(),m(e)&&t.stopPropagation())},!1),n[0].addEventListener("dragleave",function(){s()||(p=o(function(){h&&n.removeClass(h),h=null},v||1))},!1),n[0].addEventListener("drop",function(t){s()||(t.preventDefault(),m(e)&&t.stopPropagation(),h&&n.removeClass(h),h=null,c(t,function(n){u.updateModel(i,r,e,g("ngfChange")||g("ngfDrop"),n,t)},g("ngfAllowDir",e)!==!1,g("multiple")||g("ngfMultiple",e)))},!1),n[0].addEventListener("paste",function(t){if(!s()){var n=[],a=t.clipboardData||t.originalEvent.clipboardData;if(a&&a.items){for(var o=0;o<a.items.length;o++)-1!==a.items[o].type.indexOf("image")&&n.push(a.items[o].getAsFile());u.updateModel(i,r,e,g("ngfChange")||g("ngfDrop"),n,t)}}},!1)}function t(){var e=document.createElement("div");return"draggable"in e&&"ondrop"in e&&!/Edge\/12./i.test(navigator.userAgent)}ngFileUpload.directive("ngfDrop",["$parse","$timeout","$location","Upload",function(t,n,r,i){return{restrict:"AEC",require:"?ngModel",link:function(a,o,l,u){e(a,o,l,u,t,n,r,i)}}}]),ngFileUpload.directive("ngfNoFileDrop",function(){return function(e,n){t()&&n.css("display","none")}}),ngFileUpload.directive("ngfDropAvailable",["$parse","$timeout","Upload",function(e,n,r){return function(i,a,o){if(t()){var l=e(r.attrGetter("ngfDropAvailable",o));n(function(){l(i),l.assign&&l.assign(i,!0)})}}}])}();