import{S as e,i as t,s,e as l,b as a,l as r,h as c,j as n,n as o,d as h,f as i,p as f,r as v,a as u,t as g,q as d,c as m,g as p,u as I,k as E,o as N,v as S}from"./client.f3ee7f42.js";function G(e,t,s){const l=e.slice();return l[12]=t[s],l[14]=s,l}function T(e,t,s){const l=e.slice();return l[15]=t[s],l}function b(e){let t,s;return{c(){t=l("img"),this.h()},l(e){t=a(e,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){r(t.src,s=e[15])||c(t,"src",s),c(t,"alt",""),c(t,"class","svelte-9t9r7")},m(e,s){n(e,t,s)},p:o,d(e){e&&h(t)}}}function D(e){let t,s,r,o;function u(){return e[8](e[14])}return{c(){t=l("button"),this.h()},l(e){t=a(e,"BUTTON",{class:!0}),i(t).forEach(h),this.h()},h(){c(t,"class",s=f(e[0]===e[14]?"active":"")+" svelte-9t9r7")},m(e,s){n(e,t,s),r||(o=v(t,"click",u),r=!0)},p(l,a){e=l,1&a&&s!==(s=f(e[0]===e[14]?"active":"")+" svelte-9t9r7")&&c(t,"class",s)},d(e){e&&h(t),r=!1,o()}}}function P(e){let t,s,r,f,P,V,k,x,y,B,M,O,U,j,q,w,A=e[2],L=[];for(let t=0;t<A.length;t+=1)L[t]=b(T(e,A,t));let R=e[2],z=[];for(let t=0;t<R.length;t+=1)z[t]=D(G(e,R,t));return{c(){t=u(),s=l("main"),r=l("div"),f=l("div"),P=l("div");for(let e=0;e<L.length;e+=1)L[e].c();V=u(),k=l("div"),x=l("button"),y=g("◀"),B=u(),M=l("button"),O=g("▶"),U=u(),j=l("div");for(let e=0;e<z.length;e+=1)z[e].c();this.h()},l(e){d('[data-svelte="svelte-2sbtyy"]',document.head).forEach(h),t=m(e),s=a(e,"MAIN",{});var l=i(s);r=a(l,"DIV",{class:!0});var c=i(r);f=a(c,"DIV",{class:!0});var n=i(f);P=a(n,"DIV",{class:!0,style:!0});var o=i(P);for(let e=0;e<L.length;e+=1)L[e].l(o);o.forEach(h),V=m(n),k=a(n,"DIV",{class:!0});var v=i(k);x=a(v,"BUTTON",{class:!0});var u=i(x);y=p(u,"◀"),u.forEach(h),B=m(v),M=a(v,"BUTTON",{class:!0});var g=i(M);O=p(g,"▶"),g.forEach(h),v.forEach(h),U=m(n),j=a(n,"DIV",{class:!0});var I=i(j);for(let e=0;e<z.length;e+=1)z[e].l(I);I.forEach(h),n.forEach(h),c.forEach(h),l.forEach(h),this.h()},h(){document.title="SIML - Research",c(P,"class","slider svelte-9t9r7"),I(P,"left","-"+e[1]+"%"),c(x,"class","prev svelte-9t9r7"),c(M,"class","next svelte-9t9r7"),c(k,"class","arrow svelte-9t9r7"),c(j,"class","papagination svelte-9t9r7"),c(f,"class","container svelte-9t9r7"),c(r,"class","content svelte-9t9r7")},m(l,a){n(l,t,a),n(l,s,a),E(s,r),E(r,f),E(f,P);for(let e=0;e<L.length;e+=1)L[e].m(P,null);E(f,V),E(f,k),E(k,x),E(x,y),E(k,B),E(k,M),E(M,O),E(f,U),E(f,j);for(let e=0;e<z.length;e+=1)z[e].m(j,null);q||(w=[v(x,"click",e[4]),v(M,"click",e[3]),v(f,"focus",e[7]),v(f,"mouseover",e[7]),v(f,"mouseleave",e[6])],q=!0)},p(e,[t]){if(4&t){let s;for(A=e[2],s=0;s<A.length;s+=1){const l=T(e,A,s);L[s]?L[s].p(l,t):(L[s]=b(l),L[s].c(),L[s].m(P,null))}for(;s<L.length;s+=1)L[s].d(1);L.length=A.length}if(2&t&&I(P,"left","-"+e[1]+"%"),33&t){let s;for(R=e[2],s=0;s<R.length;s+=1){const l=G(e,R,s);z[s]?z[s].p(l,t):(z[s]=D(l),z[s].c(),z[s].m(j,null))}for(;s<z.length;s+=1)z[s].d(1);z.length=R.length}},i:o,o:o,d(e){e&&h(t),e&&h(s),N(L,e),N(z,e),q=!1,S(w)}}}function V(e,t,s){let l=0;const a=["image/research/Slide1.PNG","image/research/Slide2.PNG","image/research/Slide3.PNG","image/research/Slide4.PNG","image/research/Slide5.PNG"],r=a.length;let c=0;const n=()=>{s(1,c=100*l)},o=()=>{s(0,l=l===r-1?0:l+1),n()},h=e=>{s(0,l=e),n()};let i=setInterval(o,2e3);return[l,c,a,o,()=>{s(0,l=0===l?r-1:l-1),n()},h,()=>{i=setInterval(o,2e3)},()=>{clearInterval(i)},e=>h(e)]}class k extends e{constructor(e){super(),t(this,e,V,P,s,{})}}export{k as default};