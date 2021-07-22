(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{41:function(e,n,t){"use strict";t.r(n);var r=t(17),c=t.n(r),a=t(6),o=t(3),u=t(2),i=t(5),l=t.n(i),s="/api/persons",d={getAll:function(){return l.a.get(s)},create:function(e){return l.a.post(s,e)},remove:function(e){return l.a.delete("".concat(s,"/").concat(e))},update:function(e){return l.a.put("".concat(s,"/").concat(e.id),e)}},b=t(0),f=function(e){var n=e.list,t=e.display,r=n.map((function(e,n){return{name:e.name,number:e.number,visible:t[n],id:e.id}}));if(r.length){var c=r.filter((function(e){return!0===e.visible})).map((function(n){return Object(b.jsxs)("p",{children:[n.name,"  ",n.number," ",Object(b.jsx)("button",{onClick:function(){return e.handleDeleteSender(n)},children:"Delete"})]},n.name)}));return Object(b.jsx)("div",{children:c})}return Object(b.jsx)(b.Fragment,{})},j=function(e){var n=e.searchField,t=e.handleSearchField;return Object(b.jsxs)("div",{children:["form shown with ",Object(b.jsx)("input",{value:n,onChange:t})]})},h=function(e){var n=e.newName,t=e.newNumber,r=e.handleNameSender,c=e.handleNumberSender,a=e.handleSubmitSender;return Object(b.jsxs)("form",{children:[Object(b.jsxs)("div",{children:["name: ",Object(b.jsx)("input",{value:n,onChange:function(e){return r(e)}})]}),Object(b.jsxs)("div",{children:["number: ",Object(b.jsx)("input",{value:t,onChange:function(e){return c(e)}})]}),Object(b.jsx)("div",{children:Object(b.jsx)("button",{type:"submit",onClick:function(e){return a(e)},children:"add"})})]})},m=function(e){var n=e.text,t=e.color,r={color:"".concat(t),background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"};return n?Object(b.jsx)("div",{style:r,children:Object(b.jsx)("h1",{children:n})}):Object(b.jsx)(b.Fragment,{})},O=function(){var e=Object(u.useState)([]),n=Object(o.a)(e,2),t=n[0],r=n[1],c=Object(u.useState)([]),i=Object(o.a)(c,2),l=i[0],s=i[1],O=Object(u.useState)(null),v=Object(o.a)(O,2),p=v[0],g=v[1],x=Object(u.useState)(""),S=Object(o.a)(x,2),w=S[0],k=S[1],y=Object(u.useState)(""),N=Object(o.a)(y,2),C=N[0],D=N[1],F=Object(u.useState)(""),A=Object(o.a)(F,2),T=A[0],B=A[1],E=Object(u.useState)(""),I=Object(o.a)(E,2),J=I[0],L=I[1];Object(u.useEffect)((function(){!function(){var e=l;d.getAll().then((function(n){for(var t=0;t<n.data.length;t++)e.push(!0);s(e),r(n.data)})).catch((function(e){console.log({error:e.message})}))}()}),[l]);return Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{children:"Phonebook"}),Object(b.jsx)(m,{text:p,color:w}),Object(b.jsx)(j,{searchField:J,handleSearchField:function(e){return function(e){e.preventDefault();var n=Object(a.a)(t);L(e.target.value);var r=Object(a.a)(l),c=n.map((function(n,t){return n.name.toLowerCase().includes(e.target.value.toLowerCase())?r[t]=!0:r[t]=!1,r[t]}));s(c)}(e)}}),Object(b.jsx)("h2",{children:"Add a new "}),Object(b.jsx)(h,{newNmae:T,newNumber:C,handleNameSender:function(e){return function(e){B(e.target.value)}(e)},handleNumberSender:function(e){return function(e){e.preventDefault(),D(e.target.value)}(e)},handleSubmitSender:function(e){return function(e){e.preventDefault();var n=Object(a.a)(t),c=Object(a.a)(l);if(n.map((function(e){return e.name})).includes(T)){if(window.confirm("".concat(T," is already added to phonebook, replace old number with new one?"))){var o=t.map((function(e){return e.name===T&&(e.number=C),e})),u=t.filter((function(e){return e.name===T}));u[0].number=C,d.update(u[0]).then((function(e){r(o),g("Changed the number of ".concat(T)),k("green"),setTimeout((function(){g(null)}),3e3)})).catch((function(e){console.log({error:e.message})}))}}else{var i={name:T,number:C};d.create(i).then((function(e){c.push(!0),n.push(e.data),r(n),s(c),g("Added ".concat(T)),k("green"),setTimeout((function(){g(null)}),3e3)})).catch((function(e){console.log({error:e.message})}))}}(e)}}),Object(b.jsx)("h2",{children:"Numbers"}),Object(b.jsx)(f,{list:t,display:l,handleDeleteSender:function(e){return function(e){var n=t,c=l,a=n.map((function(n){return n.id===e.id}));window.confirm("Delete ".concat(e.name," ?"))&&d.remove(e.id).then((function(t){for(var o=function(e){if(a[e]){var n=c.filter((function(n,t){return t!==e}));return s(n),"break"}},u=0;u<a.length&&"break"!==o(u);u++);r(n.filter((function(n){return n.id!==e.id})))})).catch((function(n){console.log({error:n.message}),g("Information of ".concat(e.name," is already removed from the server. Refresh to see the changes")),k("red"),setTimeout((function(){g(null)}),3e3)}))}(e)}})]})};c.a.render(Object(b.jsx)(O,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.259773d2.chunk.js.map