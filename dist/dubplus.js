
/*
     /$$$$$$$            /$$                
    | $$__  $$          | $$          /$$   
    | $$  | $$ /$$   /$$| $$$$$$$    | $$   
    | $$  | $$| $$  | $$| $$__  $$ /$$$$$$$$
    | $$  | $$| $$  | $$| $$  | $$|__  $$__/
    | $$  | $$| $$  | $$| $$  | $$   | $$   
    | $$$$$$$/|  $$$$$$/| $$$$$$$/   |__/   
    |_______/  ______/ |_______/           
                                            
                                            
    https://github.com/DubPlus/DubPlus

    This source code is licensed under the MIT license 
    found here: https://github.com/DubPlus/DubPlus/blob/master/LICENSE

    Copyright (c) 2017-present DubPlus

    more info at https://dub.plus
*/
var DubPlus=function(){"use strict";var e={},t=[],n=[];function o(o,r){var i,s,a,l,u=n;for(l=arguments.length;l-- >2;)t.push(arguments[l]);for(r&&null!=r.children&&(t.length||t.push(r.children),delete r.children);t.length;)if((s=t.pop())&&void 0!==s.pop)for(l=s.length;l--;)t.push(s[l]);else"boolean"==typeof s&&(s=null),(a="function"!=typeof o)&&(null==s?s="":"number"==typeof s?s=String(s):"string"!=typeof s&&(a=!1)),a&&i?u[u.length-1]+=s:u===n?u=[s]:u.push(s),i=a;var c=new function(){};return c.nodeName=o,c.children=u,c.attributes=null==r?void 0:r,c.key=null==r?void 0:r.key,void 0!==e.vnode&&e.vnode(c),c}function r(e,t){for(var n in t)e[n]=t[n];return e}var i="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout,s=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,a=[];function l(t){!t._dirty&&(t._dirty=!0)&&1==a.push(t)&&(e.debounceRendering||i)(u)}function u(){var e,t=a;for(a=[];e=t.pop();)e._dirty&&D(e)}function c(e,t){return e.normalizedNodeName===t||e.nodeName.toLowerCase()===t.toLowerCase()}function p(e){var t=r({},e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(void 0!==n)for(var o in n)void 0===t[o]&&(t[o]=n[o]);return t}function d(e){var t=e.parentNode;t&&t.removeChild(e)}function f(e,t,n,o,r){if("className"===t&&(t="class"),"key"===t);else if("ref"===t)n&&n(null),o&&o(e);else if("class"!==t||r)if("style"===t){if(o&&"string"!=typeof o&&"string"!=typeof n||(e.style.cssText=o||""),o&&"object"==typeof o){if("string"!=typeof n)for(var i in n)i in o||(e.style[i]="");for(var i in o)e.style[i]="number"==typeof o[i]&&!1===s.test(i)?o[i]+"px":o[i]}}else if("dangerouslySetInnerHTML"===t)o&&(e.innerHTML=o.__html||"");else if("o"==t[0]&&"n"==t[1]){var a=t!==(t=t.replace(/Capture$/,""));t=t.toLowerCase().substring(2),o?n||e.addEventListener(t,h,a):e.removeEventListener(t,h,a),(e._listeners||(e._listeners={}))[t]=o}else if("list"!==t&&"type"!==t&&!r&&t in e)!function(e,t,n){try{e[t]=n}catch(e){}}(e,t,null==o?"":o),null!=o&&!1!==o||e.removeAttribute(t);else{var l=r&&t!==(t=t.replace(/^xlink\:?/,""));null==o||!1===o?l?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.removeAttribute(t):"function"!=typeof o&&(l?e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),o):e.setAttribute(t,o))}else e.className=o||""}function h(t){return this._listeners[t.type](e.event&&e.event(t)||t)}var m=[],v=0,y=!1,b=!1;function g(){for(var t;t=m.pop();)e.afterMount&&e.afterMount(t),t.componentDidMount&&t.componentDidMount()}function _(e,t,n,o,r,i){v++||(y=null!=r&&void 0!==r.ownerSVGElement,b=null!=e&&!("__preactattr_"in e));var s=k(e,t,n,o,i);return r&&s.parentNode!==r&&r.appendChild(s),--v||(b=!1,i||g()),s}function k(e,t,n,o,r){var i=e,s=y;if(null!=t&&"boolean"!=typeof t||(t=""),"string"==typeof t||"number"==typeof t)return e&&void 0!==e.splitText&&e.parentNode&&(!e._component||r)?e.nodeValue!=t&&(e.nodeValue=t):(i=document.createTextNode(t),e&&(e.parentNode&&e.parentNode.replaceChild(i,e),w(e,!0))),i.__preactattr_=!0,i;var a,l,u=t.nodeName;if("function"==typeof u)return function(e,t,n,o){var r=e&&e._component,i=r,s=e,a=r&&e._componentConstructor===t.nodeName,l=a,u=p(t);for(;r&&!l&&(r=r._parentComponent);)l=r.constructor===t.nodeName;r&&l&&(!o||r._component)?(N(r,u,3,n,o),e=r.base):(i&&!a&&(T(i),e=s=null),r=S(t.nodeName,u,n),e&&!r.nextBase&&(r.nextBase=e,s=null),N(r,u,1,n,o),e=r.base,s&&e!==s&&(s._component=null,w(s,!1)));return e}(e,t,n,o);if(y="svg"===u||"foreignObject"!==u&&y,u=String(u),(!e||!c(e,u))&&(a=u,(l=y?document.createElementNS("http://www.w3.org/2000/svg",a):document.createElement(a)).normalizedNodeName=a,i=l,e)){for(;e.firstChild;)i.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(i,e),w(e,!0)}var h=i.firstChild,m=i.__preactattr_,v=t.children;if(null==m){m=i.__preactattr_={};for(var g=i.attributes,_=g.length;_--;)m[g[_].name]=g[_].value}return!b&&v&&1===v.length&&"string"==typeof v[0]&&null!=h&&void 0!==h.splitText&&null==h.nextSibling?h.nodeValue!=v[0]&&(h.nodeValue=v[0]):(v&&v.length||null!=h)&&function(e,t,n,o,r){var i,s,a,l,u,p=e.childNodes,f=[],h={},m=0,v=0,y=p.length,b=0,g=t?t.length:0;if(0!==y)for(var _=0;_<y;_++){var x=p[_],C=x.__preactattr_,S=g&&C?x._component?x._component.__key:C.key:null;null!=S?(m++,h[S]=x):(C||(void 0!==x.splitText?!r||x.nodeValue.trim():r))&&(f[b++]=x)}if(0!==g)for(var _=0;_<g;_++){l=t[_],u=null;var S=l.key;if(null!=S)m&&void 0!==h[S]&&(u=h[S],h[S]=void 0,m--);else if(!u&&v<b)for(i=v;i<b;i++)if(void 0!==f[i]&&(O=s=f[i],D=r,"string"==typeof(N=l)||"number"==typeof N?void 0!==O.splitText:"string"==typeof N.nodeName?!O._componentConstructor&&c(O,N.nodeName):D||O._componentConstructor===N.nodeName)){u=s,f[i]=void 0,i===b-1&&b--,i===v&&v++;break}u=k(u,l,n,o),a=p[_],u&&u!==e&&u!==a&&(null==a?e.appendChild(u):u===a.nextSibling?d(a):e.insertBefore(u,a))}var O,N,D;if(m)for(var _ in h)void 0!==h[_]&&w(h[_],!1);for(;v<=b;)void 0!==(u=f[b--])&&w(u,!1)}(i,v,n,o,b||null!=m.dangerouslySetInnerHTML),function(e,t,n){var o;for(o in n)t&&null!=t[o]||null==n[o]||f(e,o,n[o],n[o]=void 0,y);for(o in t)"children"===o||"innerHTML"===o||o in n&&t[o]===("value"===o||"checked"===o?e[o]:n[o])||f(e,o,n[o],n[o]=t[o],y)}(i,t.attributes,m),y=s,i}function w(e,t){var n=e._component;n?T(n):(null!=e.__preactattr_&&e.__preactattr_.ref&&e.__preactattr_.ref(null),!1!==t&&null!=e.__preactattr_||d(e),x(e))}function x(e){for(e=e.lastChild;e;){var t=e.previousSibling;w(e,!0),e=t}}var C={};function S(e,t,n){var o,r=C[e.name];if(e.prototype&&e.prototype.render?(o=new e(t,n),P.call(o,t,n)):((o=new P(t,n)).constructor=e,o.render=O),r)for(var i=r.length;i--;)if(r[i].constructor===e){o.nextBase=r[i].nextBase,r.splice(i,1);break}return o}function O(e,t,n){return this.constructor(e,n)}function N(t,n,o,r,i){t._disable||(t._disable=!0,(t.__ref=n.ref)&&delete n.ref,(t.__key=n.key)&&delete n.key,!t.base||i?t.componentWillMount&&t.componentWillMount():t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),r&&r!==t.context&&(t.prevContext||(t.prevContext=t.context),t.context=r),t.prevProps||(t.prevProps=t.props),t.props=n,t._disable=!1,0!==o&&(1!==o&&!1===e.syncComponentUpdates&&t.base?l(t):D(t,1,i)),t.__ref&&t.__ref(t))}function D(t,n,o,i){if(!t._disable){var s,a,l,u=t.props,c=t.state,d=t.context,f=t.prevProps||u,h=t.prevState||c,y=t.prevContext||d,b=t.base,k=t.nextBase,x=b||k,C=t._component,O=!1;if(b&&(t.props=f,t.state=h,t.context=y,2!==n&&t.shouldComponentUpdate&&!1===t.shouldComponentUpdate(u,c,d)?O=!0:t.componentWillUpdate&&t.componentWillUpdate(u,c,d),t.props=u,t.state=c,t.context=d),t.prevProps=t.prevState=t.prevContext=t.nextBase=null,t._dirty=!1,!O){s=t.render(u,c,d),t.getChildContext&&(d=r(r({},d),t.getChildContext()));var P,M,A=s&&s.nodeName;if("function"==typeof A){var E=p(s);(a=C)&&a.constructor===A&&E.key==a.__key?N(a,E,1,d,!1):(P=a,t._component=a=S(A,E,d),a.nextBase=a.nextBase||k,a._parentComponent=t,N(a,E,0,d,!1),D(a,1,o,!0)),M=a.base}else l=x,(P=C)&&(l=t._component=null),(x||1===n)&&(l&&(l._component=null),M=_(l,s,d,o||!b,x&&x.parentNode,!0));if(x&&M!==x&&a!==C){var j=x.parentNode;j&&M!==j&&(j.replaceChild(M,x),P||(x._component=null,w(x,!1)))}if(P&&T(P),t.base=M,M&&!i){for(var U=t,z=t;z=z._parentComponent;)(U=z).base=M;M._component=U,M._componentConstructor=U.constructor}}if(!b||o?m.unshift(t):O||(t.componentDidUpdate&&t.componentDidUpdate(f,h,y),e.afterUpdate&&e.afterUpdate(t)),null!=t._renderCallbacks)for(;t._renderCallbacks.length;)t._renderCallbacks.pop().call(t);v||i||g()}}function T(t){e.beforeUnmount&&e.beforeUnmount(t);var n=t.base;t._disable=!0,t.componentWillUnmount&&t.componentWillUnmount(),t.base=null;var o=t._component;o?T(o):n&&(n.__preactattr_&&n.__preactattr_.ref&&n.__preactattr_.ref(null),t.nextBase=n,d(n),function(e){var t=e.constructor.name;(C[t]||(C[t]=[])).push(e)}(t),x(n)),t.__ref&&t.__ref(null)}function P(e,t){this._dirty=!0,this.context=t,this.props=e,this.state=this.state||{}}function M(e,t,n){return _(n,e,{},!1,t,!1)}r(P.prototype,{setState:function(e,t){var n=this.state;this.prevState||(this.prevState=r({},n)),r(n,"function"==typeof e?e(n,this.props):e),t&&(this._renderCallbacks=this._renderCallbacks||[]).push(t),l(this)},forceUpdate:function(e){e&&(this._renderCallbacks=this._renderCallbacks||[]).push(e),D(this,2)},render:function(){}});var A=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},E=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),j=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},U=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},z=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},L={currentVol:50,snoozed:!1},W=function(e){if(e.startTime<2)return L.snoozed&&(Dubtrack.room.player.setVolume(L.currentVol),L.snoozed=!1),!0},V=function(){!L.snoozed&&!Dubtrack.room.player.muted_player&&Dubtrack.playerController.volume>2?(L.currentVol=Dubtrack.playerController.volume,Dubtrack.room.player.mutePlayer(),L.snoozed=!0,Dubtrack.Events.bind("realtime:room_playlist-update",W)):L.snoozed&&(Dubtrack.room.player.setVolume(L.currentVol),Dubtrack.room.player.updateVolumeBar(),L.snoozed=!1)},B={position:"absolute",font:"1rem/1.5 proxima-nova,sans-serif",display:"block",left:"-33px",cursor:"pointer",borderRadius:"1.5rem",padding:"8px 16px",background:"#fff",fontWeight:"700",fontSize:"13.6px",textTransform:"uppercase",color:"#000",opacity:"0.8",textAlign:"center",zIndex:"9"},F=function(e){function t(e){A(this,t);var n=z(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={show:!1},n.showTooltip=n.showTooltip.bind(n),n.hideTooltip=n.hideTooltip.bind(n),n}return U(t,P),E(t,[{key:"showTooltip",value:function(){this.setState({show:!0})}},{key:"hideTooltip",value:function(){this.setState({show:!1})}},{key:"render",value:function(e,t){return o("span",{className:"icon-mute snooze_btn",onClick:V,onMouseOver:this.showTooltip,onMouseOut:this.hideTooltip},t.show&&o("div",{className:"snooze_tooltip",style:B},"Mute current song"))}}]),t}();var I={position:"absolute",font:"1rem/1.5 proxima-nova,sans-serif",display:"block",left:"-33px",cursor:"pointer",borderRadius:"1.5rem",padding:"8px 16px",background:"#fff",fontWeight:"700",fontSize:"13.6px",textTransform:"uppercase",color:"#000",opacity:"0.8",textAlign:"center",zIndex:"9"},R=function(e){function t(e){A(this,t);var n=z(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={show:!1,booth_time:""},n.showTooltip=n.showTooltip.bind(n),n.hideTooltip=n.hideTooltip.bind(n),n}return U(t,P),E(t,[{key:"getEta",value:function(){var e=parseInt(document.querySelector("#player-controller div.left ul li.infoContainer.display-block div.currentTime span.min").textContent),t=4*parseInt(document.querySelector(".queue-position").textContent)-4+e;return t>=0?t:"You're not in the queue"}},{key:"showTooltip",value:function(){var e=this.getEta();this.setState({show:!0,booth_time:e})}},{key:"hideTooltip",value:function(){this.setState({show:!1})}},{key:"render",value:function(e,t){return o("span",{className:"icon-history eta_tooltip_t"},this.state.show&&o("span",{className:"eta_tooltip",style:I},this.state.booth_time))}}]),t}();function H(e){return o("div",{id:e.id,className:"dubplus-menu-section-header"},o("span",{className:"fa fa-angle-"+e.arrow}),o("p",null,e.category))}var q=function(e){function t(){return A(this,t),z(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return U(t,P),E(t,[{key:"componentDidUpdate",value:function(e){for(var t in e)if(e[t]!==this.props[t])return this.renderLayer()}},{key:"componentDidMount",value:function(){this.renderLayer()}},{key:"componentWillUnmount",value:function(){this.renderLayer(!1),this.remote&&this.remote.parentNode.removeChild(this.remote)}},{key:"findNode",value:function(e){return"string"==typeof e?document.querySelector(e):e}},{key:"renderLayer",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.props.into!==this.intoPointer&&(this.intoPointer=this.props.into,this.into&&this.remote&&(this.remote=M(o(K,null),this.into,this.remote)),this.into=this.findNode(this.props.into)),this.remote=M(o(K,{context:this.context},e&&this.props.children||null),this.into,this.remote)}},{key:"render",value:function(){return null}}]),t}(),K=function(e){function t(){return A(this,t),z(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return U(t,P),E(t,[{key:"getChildContext",value:function(){return this.props.context}},{key:"render",value:function(e){var t=e.children;return t&&t[0]||null}}]),t}(),G={menu:{general:"open","user-interface":"open",settings:"open",customize:"open",contact:"open"},options:{},custom:{},srcRoot:"https://rawgit.com/FranciscoG/DubPlus/preact-version"},Y=new(function(){function e(){if(A(this,e),localStorage.dubplusUserSettings)try{var t=JSON.parse(localStorage.dubplusUserSettings);this.settings=Object.assign({},G,t)}catch(e){this.settings=G}else this.settings=G}return E(e,[{key:"save",value:function(e,t,n){this.settings[e][t]=n;try{localStorage.setItem("dubplusUserSettings",JSON.stringify(this.settings))}catch(e){console.error("an error occured saving dubplus to localStorage",e)}}}]),e}()),J=function(e){function t(e){A(this,t);var n=z(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.confirmClick=n.confirmClick.bind(n),n.keyUpHandler=n.keyUpHandler.bind(n),n}return U(t,P),E(t,[{key:"keyUpHandler",value:function(e){13===e.keyCode&&(this.props.onConfirm(this.textarea.value),this.props.onClose()),27===e.keyCode&&this.props.onClose()}},{key:"componentWillMount",value:function(){document.addEventListener("keyup",this.keyUpHandler)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keyup",this.keyUpHandler)}},{key:"confirmClick",value:function(){this.props.onConfirm(this.textarea.value),this.props.onClose()}},{key:"render",value:function(e,t){var n=this,r=e.onConfirm?"cancel":"close";return o("div",{className:"dp-modal"},o("aside",{className:"container"},o("div",{className:"title"},o("h1",null," ",e.title||"Dub+")),o("div",{className:"content"},o("p",null,e.content||""),e.placeholder&&o("textarea",{ref:function(e){return n.textarea=e},placeholder:e.placeholder,maxlength:e.maxlength||999},e.value||"")),o("div",{className:"dp-modal-buttons"},o("button",{id:"dp-modal-cancel",onClick:e.onClose},r),e.onConfirm&&o("button",{id:"dp-modal-confirm",onClick:this.confirmClick},"okay"))))}}]),t}(),$=function(e){function t(e){A(this,t);var n=z(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={open:!1},n.loadModal=n.loadModal.bind(n),n}return U(t,P),E(t,[{key:"loadModal",value:function(){this.setState({open:!0})}},{key:"render",value:function(e,t){var n,r=this;return o("span",{onClick:this.loadModal,class:"fa fa-pencil extra-icon"},t.open?o(q,{into:"body"},o(J,(j(n={title:"Dub+ Error"},"title",e.title||"Dub+ option"),j(n,"content",e.content||"Please enter a value"),j(n,"placeholder",e.placeholder||"in here"),j(n,"onConfirm",e.onConfirm),j(n,"onClose",function(){r.setState({open:!1})}),n))):null)}}]),t}(),Q=function(e){function t(e){A(this,t);var n=z(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={on:!1},n.switchOn=n.switchOn.bind(n),n.switchOff=n.switchOff.bind(n),n.toggleSwitch=n.toggleSwitch.bind(n),n}return U(t,P),E(t,[{key:"switchOn",value:function(){this.props.turnOn(),Y.save("options",this.props.id,!0),this.setState({on:!0})}},{key:"switchOff",value:function(){this.props.turnOff(),Y.save("options",this.props.id,!1),this.setState({on:!1})}},{key:"toggleSwitch",value:function(){this.state.on?this.switchOff():this.switchOn()}},{key:"render",value:function(e,t){return o("li",{id:e.id,title:e.desc,className:"dubplus-switch "+(t.on?"dubplus-switch-on":"")+" "+(e.extraClassNames||"")},e.children,o("div",{onClick:this.toggleSwitch},o("div",{class:"dubplus-switch-bg"},o("div",{class:"dubplus-switcher"})),o("span",{className:"dubplus-menu-label"},e.menuTitle)))}}]),t}(),X=function(e){function t(e){A(this,t);var n=z(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={canSend:!0},n.afk_chat_respond=n.afk_chat_respond.bind(n),n}return U(t,P),E(t,[{key:"afk_chat_respond",value:function(e){var t=this;if(this.state.canSend){var n=e.message,o=Dubtrack.session.get("username");if(n.indexOf("@"+o)>-1&&Dubtrack.session.id!==e.user.userInfo.userid){var r=document.querySelector("#chat-txt-message");Y.custom.customAfkMessage?r.value="[AFK] "+Y.custom.customAfkMessage:r.value="[AFK] I'm not here right now.",Dubtrack.room.chat.sendMessage(),this.setState({canSend:!1}),setTimeout(function(){t.setState({canSend:!0})},3e4)}}}},{key:"turnOn",value:function(){Dubtrack.Events.bind("realtime:chat-message",this.afk_chat_respond)}},{key:"turnOff",value:function(){Dubtrack.Events.unbind("realtime:chat-message",this.afk_chat_respond)}},{key:"saveAFKmessage",value:function(e){""!==e&&Y.save("custom","customAfkMessage",e)}},{key:"render",value:function(e,t){return o(Q,{id:"dubplus-afk",menuTitle:"AFK Auto-respond",desc:"Toggle Away from Keyboard and customize AFK message.",turnOn:this.turnOn,turnOff:this.turnOff},o($,{title:"Custom AFK Message",content:"Enter a custom Away From Keyboard [AFK] message here",value:Y.settings.custom.customAfkMessage||"",placeholder:"Be right back!",maxlength:"255",onConfirm:this.saveAFKmessage}))}}]),t}(),Z=function(e){function t(){A(this,t);var e=z(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={closed:!1},e.toggleSection=e.toggleSection.bind(e),e}return U(t,P),E(t,[{key:"toggleSection",value:function(){this.setState(function(e){return{closed:!e.closed}})}},{key:"render",value:function(e,t){return o("span",null,o(H,{onClick:this.toggleSection,id:"dubplus-general",arrow:this.state.closed?"right":"down",category:"General"}),o("ul",{className:"dubplus-menu-section "+(this.state.closed?"dubplus-menu-section-closed":"")},o(X,null)))}}]),t}(),ee=function(e){function t(){return A(this,t),z(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return U(t,P),E(t,[{key:"componentDidMount",value:function(){setTimeout(function(){M(o(F,null),document.querySelector(".player_sharing")),M(o(R,null),document.querySelector(".player_sharing"))},1)}},{key:"render",value:function(e,t){return o("section",{className:"dubplus-menu"},o("p",{className:"dubplus-menu-header"},"Dub+ Options"),o(Z,null))}}]),t}();function te(e,t){for(var n=e.split("."),o=n.length,r=t||window,i=0;i<o;i++){if(void 0===r[n[i]])return!1;r=r[n[i]]}return!0}function ne(e,t){for(var n=e.length,o=t||window,r=0;r<n;r++)if(!te(e[r],o))return console.log(e[r],"is not found yet"),!1;return!0}var oe={fontFamily:"'Trebuchet MS', Helvetica, sans-serif",zIndex:"2147483647",color:"white",position:"fixed",top:"69px",right:"-250px",background:"#222",padding:"10px",lineHeight:1,boxShadow:"0px 0px 5px 0px rgba(0,0,0,0.75)",borderRadius:"5px",overflow:"hidden",width:"230px",transition:"right 200ms"},re={float:"left",width:"26px",marginRight:"5px"},ie={display:"table-cell",width:"10000px",paddingTop:"5px"},se=function(e){function t(e){A(this,t);var n=z(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={mainStyles:oe},n}return U(t,P),E(t,[{key:"componentDidMount",value:function(){var e=this;setTimeout(function(){e.setState(function(e,t){return{mainStyles:Object.assign({},e.mainStyles,{right:"13px"})}})},200)}},{key:"componentWillUnmount",value:function(){this.setState(function(e,t){return{mainStyles:Object.assign({},e.mainStyles,{right:"-250px"})}})}},{key:"render",value:function(e,t){return o("div",{style:t.mainStyles},o("div",{style:re},o("img",{src:Y.srcRoot+"/images/dubplus.svg",alt:"DubPlus icon"})),o("span",{style:ie},e.text||"Waiting for Dubtrack..."))}}]),t}(),ae=function(e,t){var n=document.createElement("link");return n.rel="stylesheet",n.type="text/css",n.className=e||"",n.href=t,n};var le={load:function(e,t){if(e){var n=ae(t,Y.settings.srcRoot+e+"?1521608793002");document.head.insertAdjacentElement("beforeend",n)}},loadExternal:function(e,t){if(e){var n=ae(t,e);document.head.insertAdjacentElement("beforeend",n)}}},ue=function(e){function t(e){A(this,t);var n=z(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={open:!1},n.toggle=n.toggle.bind(n),n}return U(t,P),E(t,[{key:"toggle",value:function(){var e=document.querySelector(".dubplus-menu");this.state.open?(e.classList.add("dubplus-menu-open"),this.setState({open:!1})):(e.classList.remove("dubplus-menu-open"),this.setState({open:!0}))}},{key:"render",value:function(e,t){return o("div",{className:"dubplus-icon",onClick:this.toggle},o("img",{src:Y.settings.srcRoot+"/images/dubplus.svg",alt:"DubPlus Icon"}))}}]),t}();setTimeout(function(){le.load("/css/dubplus.css")},1),M(o(function(e){function t(){A(this,t);var e=z(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={loading:!0,error:!1,errorMsg:"",failed:!1},e}return U(t,P),E(t,[{key:"componentDidMount",value:function(){var e=this;if(window.DubPlus)Dubtrack.session.id?this.showError("Dub+ is already loaded"):this.showError("You're not logged in. Please login to use Dub+.");else{new function(e,t){if("string"==typeof e||Array.isArray(e)){var n=function(){},o=function(){},r=Array.isArray(e)?ne:te,i=Object.assign({},{interval:500,seconds:5},t),s=0,a=1e3*i.seconds/i.interval,l=function t(){return s++,r(e)?n():s<a?void window.setTimeout(t,i.interval):o()};return{then:function(e){return"function"==typeof e&&(n=e),window.setTimeout(l,i.interval),this},fail:function(e){return"function"==typeof e&&(o=e),this}}}console.warn("WaitFor: invalid first argument")}(["Dubtrack.session.id","Dubtrack.room.chat","Dubtrack.Events","Dubtrack.room.player","Dubtrack.helpers.cookie","Dubtrack.room.model","Dubtrack.room.users"],{seconds:10}).then(function(){e.setState({loading:!1,error:!1})}).fail(function(){Dubtrack.session.id?e.showError("Something happed, refresh and try again"):e.showError("You're not logged in. Please login to use Dub+.")})}}},{key:"showError",value:function(e){this.setState({loading:!1,error:!0,errorMsg:e})}},{key:"render",value:function(e,t){var n=this;return t.loading?o(se,null):t.error?o(J,{title:"Dub+ Error",onClose:function(){n.setState({failed:!0,error:!1})},content:t.errorMsg}):t.failed?null:o(ee,null)}}]),t}(),null),document.body),M(o(ue,null),document.querySelector(".header-right-navigation"));return{version:"0.1.7",description:"Dub+ - A simple script/extension for Dubtrack.fm",license:"MIT",bugs:"https://github.com/DubPlus/DubPlus/issues"}}();
