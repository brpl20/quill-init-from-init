./CONTRIBUTING.md
---
# Contributing

## Building

To build __quill-autoformat__, run the following command:

```sh
yarn
yarn build
```

## Maintainers

__@klaslundberg__


---
./LICENSE
---
MIT License

Copyright (c) 2018 Weavy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


---
./README.md
---
# Quill Autoformat
Module for transforming and formatting text as you type or paste in [Quill](https://github.com/quilljs/quill). Using RegExp to find and trigger transformations for text such as links, mentions, hashtags or emojis.
Out of the box support for:
- Links
- Hashtags
- Mentions

*Note: Requires Quill 2.0*

## Usage
To add quill-autoformat to your Quill, simply add the javascript after quill or import it in your project. Use the provided quill-formats or define your own parchments.

```html
<body>
  ...
  <form action="#" method="get">
    <div id="editor-container"></div>
  </form>
  ...
  <script src="/path/to/quill.min.js"></script>
  <script src="/path/to/quill-autoformat.js"></script>
  <script>
    var editor = new Quill('#editor-container', {
      modules: {
        autoformat: true
      }
    });
  </script>
  ...
</body>
```

## Transforms
You can specify as many transforms as you like, just give each transform a unique name. Three transforms are enabled by default; hashtag, mention and link. Just set the default types to false to disable them or change any property you like to a custom value.

Each transform may have the following properties:

```javascript
transform: {
   trigger:     RegExp, // RegExp for matching text input characters to trigger the match. Defaults to /./ which is matching any character
   find:        RegExp, // Global RegExp to search for in the text
   extract:     RegExp, // Additional RegExp to finetune and override the found text match
   transform:   String || Function, // String or function passed to String.replace() to rewrite find/extract results
   insert:      String || {...}, // Insert name string or embed insert object.
   format:      String || {...} // Format name string or attributes object.
 }
```
#### Reference
- [Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [String Replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
- [Quill Delta Inserts](https://github.com/quilljs/delta/#insert)

## Default Options
Specify one option or more to override defaults.

```javascript
var editor = new Quill('#editor-container', {
  modules: {
    autoformat: {
      hashtag: {
        trigger: /[\s.,;:!?]/,
        find: /(?:^|\s)#[^\s.,;:!?]+/i,
        extract: /#([^\s.,;:!?]+)/i,
        transform: '$1',
        insert: 'hashtag'
      },
      mention: {
        trigger: /[\s.,;:!?]/,
        find: /(?:^|\s)@[^\s.,;:!?]+/i,
        extract: /@([^\s.,;:!?]+)/i,
        transform: '$1',
        insert: 'mention'
      },
      link: {
        trigger: /[\s]/,
        find: /https?:\/\/[\S]+|(www\.[\S]+)/gi,
        transform: function (value, noProtocol) { // value == match[0], noProtocol == match[1]
          return noProtocol ? "http://" + value : value;
        },
        format: 'link'
      }
    }
  }
});
```

---
./demo/index.html
---
<html>

  <head>
    <meta charset="utf-8">
    <link href="https://cdn.quilljs.com/2.0.0-dev.2/quill.snow.css" rel="stylesheet">
  </head>

  <body>
    <div class="container" style="position:relative;">
      <h2>Editor</h2>
      <div id="quill-editor" style="max-height: 300px"></div>
    </div>

    <script src="https://cdn.quilljs.com/2.0.0-dev.3/quill.js"></script>
    <script src="../dist/quill-autoformat.js"></script>

    <script type="text/javascript">
      var quill = new Quill('#quill-editor', {
        modules: {
          toolbar: true,
          autoformat: true
        },
        placeholder: 'Compose an epic...',
        theme: 'snow',
      });
    </script>
  </body>

</html>

---
./dist/quill-autoformat.js
---
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("quill")):"function"==typeof define&&define.amd?define(["quill"],t):"object"==typeof exports?exports.QuillAutoformat=t(require("quill")):e.QuillAutoformat=t(e.Quill)}(window,function(e){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(t,r){t.exports=e},function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n);const i=o.a.import("blots/embed"),s=o.a.import("blots/inline"),l=o.a.import("blots/text"),a=o.a.import("blots/cursor");class u extends i{static create(e){let t=super.create(e);return t.setAttribute("href",this.BASE_URL+e),t.setAttribute("spellcheck",!1),t.textContent="#"+e,t}static formats(e){return e.getAttribute("href").substr(this.BASE_URL.length)}format(e,t){this.domNode.setAttribute("href",this.BASE_URL+t)}static value(e){return e.textContent.substr(1)}}u.blotName="hashtag",u.className="ql-hashtag",u.tagName="A",u.BASE_URL="#";class f extends s{static create(e){let t=super.create(e);return t.setAttribute("href",this.BASE_URL+e),t.setAttribute("spellcheck",!1),t}static formats(e){return e.getAttribute("href").substr(this.BASE_URL.length)}format(e,t){this.domNode.setAttribute("href",this.BASE_URL+t)}}f.blotName="hashtag",f.className="ql-hashtag",f.tagName="A",f.allowedChildren=[l,a],f.BASE_URL="#";const c=o.a.import("blots/embed");class h extends c{static create(e){const t=super.create(e);return t.setAttribute("title",e),t.setAttribute("href",this.BASE_URL+e),t.textContent="@"+e,t}static value(e){return e.textContent.substr(1)}}h.blotName="mention",h.className="ql-mention",h.tagName="A",h.BASE_URL="/";var p=h;function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],n=!0,o=!1,i=void 0;try{for(var s,l=e[Symbol.iterator]();!(n=(s=l.next()).done)&&(r.push(s.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==l.return||l.return()}finally{if(o)throw i}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}const m=o.a.import("core/module"),g=o.a.import("delta"),b=o.a.import("parchment"),y=b.Attributor,x=b.Scope;class w extends m{constructor(e,t){super(e,t),this.transforms=t,this.registerTypeListener(),this.registerPasteListener()}registerPasteListener(){for(const e in this.transforms){const t=this.transforms[e];this.quill.clipboard.addMatcher(Node.TEXT_NODE,(e,r)=>{if("string"==typeof e.data)return r.ops.forEach((e,r,n)=>{if("string"==typeof e.insert){let o=A(t,e.insert),i=new g([e]).compose(o);n.splice(r,1,...i.ops)}}),r})}}registerTypeListener(){this.quill.keyboard.addBinding({key:38,collapsed:!0,format:["autoformat-helper"]},this.forwardKeyboardUp.bind(this)),this.quill.keyboard.addBinding({key:40,collapsed:!0,format:["autoformat-helper"]},this.forwardKeyboardDown.bind(this)),this.quill.on(o.a.events.TEXT_CHANGE,(e,t,r)=>{let n=e.ops;if("user"!==r||!n||n.length<1)return;let i=n.length-1,s=n[i];for(;!s.insert&&i>0;)s=n[--i];if(!s.insert||"string"!=typeof s.insert)return;let l="\n"===s.insert,a=this.quill.getSelection();if(!a)return;let u=this.quill.getLength()-a.index-(l?1:0),f=a.index,c=d(this.quill.getLeaf(f),1)[0];if(!c||!c.text)return;let h=c.offset(c.scroll),p=f-h,m=!1;for(const e in this.transforms){const t=this.transforms[e];if(t.helper&&t.helper.trigger&&s.insert.match(t.helper.trigger))this.quill.formatText(f,1,"autoformat-helper",e,o.a.sources.API),this.openHelper(t,f);else if(s.insert.match(t.trigger||/./)){this.closeHelper(t);let e=(new g).retain(h),r=A(t,c.text,p);r&&(e=e.concat(r)),this.quill.updateContents(e,"api"),m=!0}}m&&setTimeout(()=>{this.quill.setSelection(this.quill.getLength()-u,"api")},0)})}forwardKeyboard(e,t){if(this.currentHelper&&this.currentHelper.container){let e=this.currentHelper.container.querySelector(".dropdown-menu");console.log("keyboard",e,t.event),e.dispatchEvent(t.event)}}forwardKeyboardUp(e,t){var r=new KeyboardEvent("keydown",{key:"ArrowUp",keyCode:38,which:38,bubbles:!0,cancelable:!0});t.event=r,this.forwardKeyboard(e,t)}forwardKeyboardDown(e,t){var r=new KeyboardEvent("keydown",{key:"ArrowDown",keyCode:40,which:40,bubbles:!0,cancelable:!0});t.event=r,this.forwardKeyboard(e,t)}openHelper(e,t){if(e.helper&&(this.currentHelper=e.helper,"function"==typeof e.helper.open)){console.log("openHelper",t,this.quill.getFormat(t));let r=this.quill.getBounds(t),n=this.quill.addContainer("ql-helper");n.style.position="absolute",n.style.top=r.top+"px",n.style.left=r.left+"px",n.style.width=r.width+"px",n.style.height=r.height+"px",console.log("openHelper",r,n),e.helper.container=n,e.helper.open(n)}}closeHelper(e){e.helper&&"function"==typeof e.helper.close&&e.helper.close(e.helper.container)}}function A(e,t,r){e.find.global||(e.find=new RegExp(e.find,e.find.flags+"g")),e.find.lastIndex=0;let n=new g,o=null;if(null!=r)for(o=e.find.exec(t);o&&o.length&&o.index<r;){if(o.index<r&&o.index+o[0].length+1>=r){n=n.concat(v(e,o).ops);break}o=e.find.exec(t)}else for(;null!==(o=e.find.exec(t));){let r=v(e,o);n=n.concat(r.ops),t=t.substr(r.rightIndex),e.find.lastIndex=0}return n}function v(e,t){let r=(t=function(e,t){if(e.extract){let r=new RegExp(e.extract).exec(t[0]);return r&&r.length?(r.index+=t.index,r):t}return t}(e,t)).index,n=function(e,t){let r=new RegExp(e.extract||e.find);return e.transform?t.replace(r,e.transform):t}(e,t[0]),o=n;e.insert&&((o={})[e.insert]=n);let i=function(e,t){let r={};return"string"==typeof e.format?r[e.format]=t:"object"==typeof e.format&&(r=e.format),r}(e,n);const s=new g;return s.retain(r).delete(t[0].length).insert(o,i),{ops:s,rightIndex:r+t[0].length}}w.DEFAULTS={hashtag:{trigger:/[\s.,;:!?]/,find:/(?:^|\s)#[^\s.,;:!?]+/i,extract:/#([^\s.,;:!?]+)/i,transform:"$1",insert:"hashtag"},mention:{trigger:/[\s.,;:!?]/,find:/(?:^|\s)@[^\s.,;:!?]+/i,extract:/@([^\s.,;:!?]+)/i,transform:"$1",insert:"mention"},link:{trigger:/[\s]/,find:/https?:\/\/[\S]+|(www\.[\S]+)/gi,transform:function(e,t){return t?"http://"+e:e},format:"link"}};const q=new y("autoformat-helper","data-helper",{scope:x.INLINE});r.d(t,"default",function(){return w}),r.d(t,"Hashtag",function(){return u}),r.d(t,"Mention",function(){return p}),r.d(t,"AutoformatHelperAttribute",function(){return q}),o.a.version&&parseInt(o.a.version[0])<2&&console.warn("quill-autoformat requires Quill 2.0 or higher to work properly"),o.a.register({"modules/autoformat":w,"formats/hashtag":u,"formats/mention":p,"formats/autoformat-helper":q})}])});

---
./src/quill-autoformat.js
---
import Quill from 'quill';

import Hashtag from './formats/hashtag';
import Mention from './formats/mention';

import Autoformat, { AutoformatHelperAttribute } from './modules/autoformat';

if(Quill.version && parseInt(Quill.version[0]) < 2) {
  console.warn("quill-autoformat requires Quill 2.0 or higher to work properly")
}

Quill.register({
  'modules/autoformat': Autoformat,
  'formats/hashtag': Hashtag,
  'formats/mention': Mention,
  'formats/autoformat-helper': AutoformatHelperAttribute
});

export {
  Autoformat as default,
  Hashtag,
  Mention,
  AutoformatHelperAttribute
}


---
./src/formats/hashtag.js
---
import Quill from 'quill';

const Embed = Quill.import('blots/embed');
const Inline = Quill.import('blots/inline');
const Text = Quill.import('blots/text');
const Cursor = Quill.import('blots/cursor');

class Hashtag extends Embed {
  static create(value) {
    let node = super.create(value);
    node.setAttribute('href', this.BASE_URL + value);
    node.setAttribute('spellcheck', false);
    node.textContent = "#" + value;
    return node;
  }

  static formats(domNode) {
    return domNode.getAttribute('href').substr(this.BASE_URL.length);
  }

  format(name, value) {
    this.domNode.setAttribute('href', this.BASE_URL + value);
  }

  static value(domNode) {
    return domNode.textContent.substr(1);
  }
}
Hashtag.blotName = 'hashtag';
Hashtag.className = 'ql-hashtag';
Hashtag.tagName = 'A';
Hashtag.BASE_URL = '#';

class HashtagInline extends Inline {
  static create(value) {
    let node = super.create(value);
    node.setAttribute('href', this.BASE_URL + value);
    node.setAttribute('spellcheck', false);
    return node;
  }

  static formats(domNode) {
    return domNode.getAttribute('href').substr(this.BASE_URL.length);
  }

  format(name, value) {
    this.domNode.setAttribute('href', this.BASE_URL + value);
  }
}
HashtagInline.blotName = 'hashtag';
HashtagInline.className = 'ql-hashtag';
HashtagInline.tagName = 'A';
HashtagInline.allowedChildren = [Text, Cursor];
HashtagInline.BASE_URL = '#';

export { Hashtag as default, HashtagInline };


---
./src/formats/mention.js
---
import Quill from 'quill';

const Embed = Quill.import('blots/embed');

class Mention extends Embed {
  static create(value) {
    const node = super.create(value);
    node.setAttribute('title', value);
    node.setAttribute('href', this.BASE_URL + value);
    node.textContent = '@' + value;
    return node;
  }

  static value(domNode) {
    return domNode.textContent.substr(1);
  }
}
Mention.blotName = 'mention';
Mention.className = 'ql-mention';
Mention.tagName = 'A';
Mention.BASE_URL = '/';

export default Mention;


---
./src/modules/autoformat.js
---
import Quill from 'quill';

const Module = Quill.import('core/module');
const Delta = Quill.import('delta');
const { Attributor, Scope } = Quill.import('parchment');

// Binds autoformat transforms to typing and pasting

class Autoformat extends Module {
  constructor(quill, options) {
    super(quill, options);
    this.transforms = options;

    this.registerTypeListener()
    this.registerPasteListener();
  }

  registerPasteListener() {
    for (const name in this.transforms) {
      const transform = this.transforms[name];
      this.quill.clipboard.addMatcher(Node.TEXT_NODE, (node, delta) => {
        if (typeof node.data !== 'string') {
          return
        }

        delta.ops.forEach((op, index, deltaOps) => {
          // Find insert string ops
          if (typeof op.insert === 'string') {
            let changeDelta = makeTransformedDelta(transform, op.insert);
            let composedDelta = new Delta([op]).compose(changeDelta);

            // Replace the current op with transformed ops
            deltaOps.splice(index, 1, ...composedDelta.ops);
          }
        });

        return delta;
      })
    }
  }

  registerTypeListener() {
    this.quill.keyboard.addBinding({
      key: 38,  // Arrow Up
      collapsed: true,
      format: ["autoformat-helper"]
    }, this.forwardKeyboardUp.bind(this));

    this.quill.keyboard.addBinding({
      key: 40,  // Arrow Down
      collapsed: true,
      format: ["autoformat-helper"]
    }, this.forwardKeyboardDown.bind(this));

    this.quill.on(Quill.events.TEXT_CHANGE, (delta, oldDelta, source) => {
      let ops = delta.ops
      if (source !== 'user' || !ops || ops.length < 1) {
        return
      }

      // Check last insert
      let lastOpIndex = ops.length - 1;
      let lastOp = ops[lastOpIndex]

      while (!lastOp.insert && lastOpIndex > 0) {
        lastOpIndex--;
        lastOp = ops[lastOpIndex];
      }

      if (!lastOp.insert || typeof lastOp.insert !== 'string') {
        return
      }
      let isEnter = lastOp.insert === "\n";

      // Get selection
      let sel = this.quill.getSelection()
      if (!sel) {
        return
      }
      let endSelIndex = this.quill.getLength() - sel.index - (isEnter ? 1 : 0);

      // Get leaf
      let checkIndex = sel.index;
      let [leaf] = this.quill.getLeaf(checkIndex)

      if (!leaf || !leaf.text) {
        return
      }

      let leafIndex = leaf.offset(leaf.scroll);
      let leafSelIndex = checkIndex - leafIndex;

      let transformed = false;

      // Check transforms
      for (const name in this.transforms) {
        const transform = this.transforms[name];

        // Check helper trigger
        if(transform.helper && transform.helper.trigger) {
          if(lastOp.insert.match(transform.helper.trigger)) { // TODO: check leaf/atindex instead
            this.quill.formatText(checkIndex, 1, 'autoformat-helper', name, Quill.sources.API);
            this.openHelper(transform, checkIndex);
            continue;
          }
        }

        // Check transform trigger
        if (lastOp.insert.match(transform.trigger || /./)) {
          this.closeHelper(transform);

          let ops = new Delta().retain(leafIndex);
          let transformOps = makeTransformedDelta(transform, leaf.text, leafSelIndex);

          if (transformOps) {
            ops = ops.concat(transformOps);
          }

          this.quill.updateContents(ops, 'api')
          transformed = true;
        }
      }

      // Restore cursor position
      if(transformed) {
        setTimeout(() => {
          this.quill.setSelection(this.quill.getLength() - endSelIndex, 'api')
        }, 0);
      }
    });
  }

  forwardKeyboard(range, context) {
    if (this.currentHelper && this.currentHelper.container) {
      let target = this.currentHelper.container.querySelector('.dropdown-menu');
      console.log("keyboard",target, context.event);
      target.dispatchEvent(context.event);
    }
  }

  forwardKeyboardUp(range, context) {
    var e = new KeyboardEvent("keydown", {
      key: "ArrowUp",
      keyCode: 38,
      which: 38,
      bubbles: true,
      cancelable: true
    });
    context.event = e;
    this.forwardKeyboard(range, context);
  }

  forwardKeyboardDown(range, context) {
    var e = new KeyboardEvent("keydown", {
      key: "ArrowDown",
      keyCode: 40,
      which: 40,
      bubbles: true,
      cancelable: true
    });
    context.event = e;
    this.forwardKeyboard(range, context);
  }

  openHelper(transform, index) {
    if(transform.helper) {
      this.currentHelper = transform.helper;
      if(typeof transform.helper.open === 'function') {
        console.log("openHelper", index, this.quill.getFormat(index))
        let pos = this.quill.getBounds(index)
        let helperNode = this.quill.addContainer('ql-helper')
        helperNode.style.position = 'absolute';
        helperNode.style.top = pos.top + "px";
        helperNode.style.left = pos.left + "px";
        helperNode.style.width = pos.width + "px";
        helperNode.style.height = pos.height + "px";
        console.log("openHelper", pos, helperNode);


        transform.helper.container = helperNode;
        transform.helper.open(helperNode);
      }
    }
  }

  closeHelper(transform) {
    if(transform.helper) {
      if(typeof transform.helper.close === 'function') {
        transform.helper.close(transform.helper.container);
      }
    }
  }

}

function getFormat(transform, match) {
  let format = {};

  if (typeof transform.format === "string") {
    format[transform.format] = match;
  } else if (typeof transform.format === "object") {
    format = transform.format;
  }

  return format;
}

function transformMatch(transform, match) {
  let find = new RegExp(transform.extract || transform.find);
  return transform.transform ? match.replace(find, transform.transform) : match;
}

function applyExtract(transform, match) {
  // Extract
  if (transform.extract) {
    let extract = new RegExp(transform.extract);
    let extractMatch = extract.exec(match[0]);

    if (!extractMatch || !extractMatch.length) {
      return match;
    }

    extractMatch.index += match.index;
    return extractMatch;
  }

  return match;
}

function makeTransformedDelta(transform, text, atIndex) {

  if (!transform.find.global) {
    transform.find = new RegExp(transform.find, transform.find.flags + 'g');
  }
  transform.find.lastIndex = 0;

  let ops = new Delta();
  let findResult = null;
  let checkAtIndex = atIndex !== undefined && atIndex !== null;

  if (checkAtIndex) {
    // find match at index
    findResult = transform.find.exec(text);

    while (findResult && findResult.length && findResult.index < atIndex) {
      if (findResult.index < atIndex && (findResult.index + findResult[0].length + 1) >= atIndex) {
        ops = ops.concat(transformedMatchOps(transform, findResult).ops);
        break;
      } else {
        findResult = transform.find.exec(text);
      }
    }
  } else {
    // find all matches
    while ((findResult = transform.find.exec(text)) !== null) {
      let transformedMatch = transformedMatchOps(transform, findResult);
      ops = ops.concat(transformedMatch.ops);
      text = text.substr(transformedMatch.rightIndex);
      transform.find.lastIndex = 0;
    }
  }

  return ops;
}

function transformedMatchOps(transform, result) {
  result = applyExtract(transform, result);

  let resultIndex = result.index;
  let transformedMatch = transformMatch(transform, result[0]);

  let insert = transformedMatch;

  if (transform.insert) {
    insert = {};
    insert[transform.insert] = transformedMatch;
  }

  let format = getFormat(transform, transformedMatch);

  const ops = new Delta();

  ops
    .retain(resultIndex)
    .delete(result[0].length)
    .insert(insert, format)

  let rightIndex = resultIndex + result[0].length

  return {
    ops,
    rightIndex
  };
}

// TRANSFORM {
//   trigger:     RegExp for matching text input characters to trigger the match. Defaults to /./ which is matching any character
//   find:        Global RegExp to search for in the text
//   extract:     Additional RegExp to finetune and override the found text match
//   transform:   String or function passed to String.replace() to rewrite find/extract results
//   insert:      Insert name string or embed insert object.
//   format:      Format name string or attributes object.
// }

// Reference:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
// https://github.com/quilljs/delta/#insert


Autoformat.DEFAULTS = {
  hashtag: {
    trigger: /[\s.,;:!?]/,
    find: /(?:^|\s)#[^\s.,;:!?]+/i,
    extract: /#([^\s.,;:!?]+)/i,
    transform: '$1',
    insert: 'hashtag',
    /*helper: {
      trigger: /(?:^|\s)#/,
      open: function(target) {
        console.log("hashtag search", target)
      },
      select: function(target, callback) {
        callback()
      },
      close: function(target) {
        console.log("hashtag search canceled")
        if (target) {
          target.innerHTML = "";
        }
      }
    }*/
  },
  mention: {
    trigger: /[\s.,;:!?]/,
    find: /(?:^|\s)@[^\s.,;:!?]+/i,
    extract: /@([^\s.,;:!?]+)/i,
    transform: '$1',
    insert: 'mention'
  },
  link: {
    trigger: /[\s]/,
    find: /https?:\/\/[\S]+|(www\.[\S]+)/gi,
    transform: function (value, noProtocol) {
      return noProtocol ? "http://" + value : value;
    },
    format: 'link'
  }
};

const AutoformatHelperAttribute = new Attributor('autoformat-helper', 'data-helper', { scope: Scope.INLINE });

export {
  Autoformat as default,
  AutoformatHelperAttribute
};


---
