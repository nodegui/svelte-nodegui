(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{126:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return a})),n.d(t,"default",(function(){return p}));var o=n(2),s=n(6),r=(n(0),n(133)),i={sidebar_label:"Styling",title:"Styling"},l={unversionedId:"guides/styling",id:"guides/styling",isDocsHomePage:!1,title:"Styling",description:"With Svelte NodeGui, you can style a component to your needs. If you are familiar with CSS in the web world you would feel right at home. All components accept the style prop for setting inline styles. The style names and values usually match how CSS works on the web.",source:"@site/docs/guides/styling.md",slug:"/guides/styling",permalink:"/docs/guides/styling",version:"current",sidebar_label:"Styling",sidebar:"guides",previous:{title:"Learn the Basics",permalink:"/docs/guides/tutorial"},next:{title:"Layout",permalink:"/docs/guides/layout"}},a=[{value:"Overview",id:"overview",children:[]},{value:"Global styles",id:"global-styles",children:[]},{value:"Inline styles",id:"inline-styles",children:[]},{value:"Selectors",id:"selectors",children:[]},{value:"Pseudo states",id:"pseudo-states",children:[]},{value:"Cascading",id:"cascading",children:[]},{value:"Properties",id:"properties",children:[]},{value:"Supported properties",id:"supported-properties",children:[]},{value:"Advanced usage (Setting QObject Properties)",id:"advanced-usage-setting-qobject-properties",children:[]}],c={rightToc:a};function p(e){var t=e.components,n=Object(s.a)(e,["components"]);return Object(r.b)("wrapper",Object(o.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"With Svelte NodeGui, you can style a component to your needs. If you are familiar with CSS in the web world you would feel right at home. All components accept the ",Object(r.b)("inlineCode",{parentName:"p"},"style")," prop for setting inline styles. The style names and values usually match how CSS works on the web."),Object(r.b)("p",null,"Here's an example:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-html"}),'<script lang="ts">\n  import { onMount } from "svelte";\n\n  onMount(() => {\n    (window as any).win = win; // Prevent garbage collection.\n    win.nativeView.show();\n    return () => {\n      delete (window as any).win;\n    };\n  });\n<\/script>\n\n<window bind:this={win}>\n  <text style="color: green; background-color: white;">\n    Hello World\n  </text>\n</window>\n')),Object(r.b)("h2",{id:"overview"},"Overview"),Object(r.b)("p",null,"Svelte NodeGui makes use of ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://doc.qt.io/qt-5/stylesheet-syntax.html"}),"Qt's stylesheet")," for styling. Qt Style Sheet terminology and syntactic rules are almost identical to those of HTML CSS. Additionally, Svelte NodeGui adds support for layout using flex properties like align-items, justify-content, etc. Flexbox layout support is added using ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://github.com/facebook/yoga"}),"facebook's yoga library"),"."),Object(r.b)("p",null,"You would write your style properties in a string and pass it to the Svelte NodeGui components either via global styles or inline styles (similar to how it works in the web)."),Object(r.b)("h2",{id:"global-styles"},"Global styles"),Object(r.b)("p",null,"Lets take a look at an example:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-html"}),'<script lang="ts">\n  import { onMount } from "svelte";\n\n  onMount(() => {\n    (window as any).win = win; // Prevent garbage collection.\n    win.nativeView.show();\n    return () => {\n      delete (window as any).win;\n    };\n  });\n<\/script>\n\n<window bind:this={win}>\n  <view id="rootView">\n    <text id="helloLabel">Hello</text>\n    <text id="worldLabel">World</text>\n  </view>\n</window>\n\n<style>\n  #helloLabel {\n    color: red;\n    padding: 10px;\n  }\n  #worldLabel {\n    color: green;\n    padding: 10px;\n  }\n  #rootView {\n    background-color: black;\n    height: \'100%\';\n  }\n</style>\n')),Object(r.b)("p",null,"In the case of global stylesheet you can define all your style properties in a stylesheet string and the tell the root view or window to set it as a stylsheet for it and its child components. The only difference here from web is that you can set a stylesheet on a component at any level in the whole tree of components, the stylesheet will affect the component and its children."),Object(r.b)("p",null,"In the above example, in order to reference a component in a stylesheet we will assign it a ",Object(r.b)("inlineCode",{parentName:"p"},"id")," using id prop. Think of it as similar to an ",Object(r.b)("inlineCode",{parentName:"p"},"id")," in the case of web (but in reality it calls setObjectName method in nodegui). Now using the id you could reference the component in the stylesheet and set style properties on them. Do not worry about the layout stuff that is going on here, that will be covered in the next section."),Object(r.b)("p",null,"Global stylesheet really becomes powerful when you use things like pseudo-selectors (hover, checked, etc). It also has helps in implementing cascaded styles which allow you to style a group of components at once. We will see more about these features below."),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"More details on all the features and the syntax can be found here: ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://doc.qt.io/qt-5/stylesheet-syntax.html"}),"https://doc.qt.io/qt-5/stylesheet-syntax.html"))),Object(r.b)("h2",{id:"inline-styles"},"Inline styles"),Object(r.b)("p",null,"Lets look at this example again:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-html"}),'<script lang="ts">\n  import { onMount } from "svelte";\n\n  onMount(() => {\n    (window as any).win = win; // Prevent garbage collection.\n    win.nativeView.show();\n    return () => {\n      delete (window as any).win;\n    };\n  });\n<\/script>\n\n<window bind:this={win}>\n  <text style="color: green; background-color: white; height: \'100%\';">Hello World</text>\n</window>\n')),Object(r.b)("p",null,"In most cases it would be easier to style the components inline. Svelte NodeGui supports inline styling using ",Object(r.b)("inlineCode",{parentName:"p"},"style")," prop. Inline styles will only affect the component to which the style is applied to and is often easier to understand and manage. All properties you use in the global stylesheet are available in inline styles as well."),Object(r.b)("h2",{id:"selectors"},"Selectors"),Object(r.b)("p",null,"NodeGui style sheets support all the selectors defined in CSS2.\nSome examples include:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-css"}),"* {\n  color: blue;\n}\n\nQPushButton {\n  padding: 10px;\n}\n\n#okButton {\n  margin: 10px;\n}\n\n#mainView > QPushButton {\n  margin: 10px;\n}\n")),Object(r.b)("p",null,"Note we are using QPushButton here instead of PushButton. This is because ",Object(r.b)("inlineCode",{parentName:"p"},"<PushButton />")," component internally renders a QPushButton. See PushButton docs for more details."),Object(r.b)("p",null,"To see a complete list of selectors see here: ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://doc.qt.io/qt-5/stylesheet-syntax.html#selector-types"}),"https://doc.qt.io/qt-5/stylesheet-syntax.html#selector-types")),Object(r.b)("h2",{id:"pseudo-states"},"Pseudo states"),Object(r.b)("p",null,"Like in the web, you can style your component based on its state. An example would be, you might want the color of the button text to be red when its hovered upon. These are possible with pseudo states. Pseudo-states appear at the end of the selector, with a colon (:) in between."),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-css"}),"#okButton:hover {\n  color: red;\n}\n")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"More details here : ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://doc.qt.io/qt-5/stylesheet-syntax.html#pseudo-states"}),"https://doc.qt.io/qt-5/stylesheet-syntax.html#pseudo-states"))),Object(r.b)("h2",{id:"cascading"},"Cascading"),Object(r.b)("p",null,"Style sheets can be set on the parent components and on child components. An arbitrary component's effective style sheet is obtained by merging the style sheets set on the component's ancestors (parent, grandparent, etc.)."),Object(r.b)("p",null,"When conflicts arise, the component's own inline style sheet is always preferred to any inherited style sheet, irrespective of the specificity of the conflicting rules. Likewise, the parent component's style sheet is preferred to the grandparent's, etc."),Object(r.b)("p",null,"The behaviour is similar to what we see on the web."),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"For more in depth examples see here: ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://doc.qt.io/qt-5/stylesheet-syntax.html#cascading"}),"https://doc.qt.io/qt-5/stylesheet-syntax.html#cascading"))),Object(r.b)("h2",{id:"properties"},"Properties"),Object(r.b)("p",null,"NodeGui style sheet is a css string."),Object(r.b)("p",null,"For example:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-typescript"}),"const textStyle: string = `\n  color: 'green';\n  padding: 12;\n  height: '100%';\n`;\n")),Object(r.b)("p",null,"Here if you look carefully, you would notice that there are some differences in the way we write style properties as compared to web.\nThe quotes you see around ",Object(r.b)("inlineCode",{parentName:"p"},"'green'")," and ",Object(r.b)("inlineCode",{parentName:"p"},"'100%'")," are necessary so that Qt doesnt interpret them as numbers.\nSo the rule of thumb is that any integer based property like margin, border, etc can be written without quotes while any string property, it is better to surround them with quotes. PS: Qt does recognise some string based properties without quotes also."),Object(r.b)("h2",{id:"supported-properties"},"Supported properties"),Object(r.b)("p",null,"Since we are not running inside a web browser, there are few differences in the properties you could use in NodeGui vs in web."),Object(r.b)("p",null,"The complete list is detailed here: ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://doc.qt.io/qt-5/stylesheet-reference.html#list-of-properties"}),"https://doc.qt.io/qt-5/stylesheet-reference.html#list-of-properties")),Object(r.b)("p",null,"Apart from the properties listed in the link, NodeGui also supports layout properties related to Flex. You can use all flex properties such as align-items, justify-content, flex, etc on all components. ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"/docs/guides/layout"}),"The layout styling will be converted in more detail in the section: Layout.")),Object(r.b)("h2",{id:"advanced-usage-setting-qobject-properties"},"Advanced usage (Setting QObject Properties)"),Object(r.b)("p",null,"In Qt, every component has certain properties set on them using something called as ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://doc.qt.io/qt-5/qobject.html#Q_PROPERTY"}),"Q_PROPERTY"),". There are many q-properties that are defined on each component already. You can also define custom qproperties in the native C++ code yourself too. What does it have to do with styling ? The thing is some of these properties can be altered using qt stylesheet. In Qt's terminology, these properties are called designable properties."),Object(r.b)("p",null,"For example:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-css"}),"MyLabel {\n  qproperty-alignment: AlignCenter;\n}\nMyGroupBox {\n  qproperty-titlecolor: rgb(100, 200, 100);\n}\nQPushButton {\n  qproperty-iconsize: 20px 20px;\n}\n")),Object(r.b)("p",null,'You can discover these properties by following Qt\'s documentation or by running a simple google search like "center text in QLabel using stylesheet in Qt". These are advanced properties and in practice will come in use rarely but its good to know.'),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"More details : ",Object(r.b)("a",Object(o.a)({parentName:"p"},{href:"https://doc.qt.io/qt-5/stylesheet-syntax.html#setting-qobject-properties"}),"https://doc.qt.io/qt-5/stylesheet-syntax.html#setting-qobject-properties"))),Object(r.b)("hr",null),Object(r.b)("p",null,"In this section, we mostly covered the paint properties in the Svelte NodeGui stylesheet. The next section would cover on how you can use flex to layout your components with stylesheet."))}p.isMDXComponent=!0},133:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return h}));var o=n(0),s=n.n(o);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,o,s=function(e,t){if(null==e)return{};var n,o,s={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var c=s.a.createContext({}),p=function(e){var t=s.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=p(e.components);return s.a.createElement(c.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return s.a.createElement(s.a.Fragment,{},t)}},d=s.a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,i=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),u=p(n),d=o,h=u["".concat(i,".").concat(d)]||u[d]||b[d]||r;return n?s.a.createElement(h,l(l({ref:t},c),{},{components:n})):s.a.createElement(h,l({ref:t},c))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=d;var l={};for(var a in t)hasOwnProperty.call(t,a)&&(l[a]=t[a]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var c=2;c<r;c++)i[c]=n[c];return s.a.createElement.apply(null,i)}return s.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);