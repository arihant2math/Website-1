import{S as ie,i as ue,s as ce,e as d,w as R,k as H,t as O,c as g,a as F,x as Y,m as I,h as B,d as c,b as m,V as Ie,I as Fe,g as y,y as q,J as h,j as ke,z as $e,q as C,o as S,B as N,l as fe,n as _e,p as de,ak as Ye,C as pe,Y as he,H as le,A as ge,P as Ce,Q as De,al as Be,R as Q,a3 as qe,K as Me,am as Ae,f as ve,an as Ne,G as ye,ao as Te,ap as Le,_ as Xe}from"../chunks/vendor-ec6aa394.js";import{P as be}from"../chunks/PageSection-45e2382a.js";import"../chunks/BlogCard.svelte_svelte_type_style_lang-3569a11f.js";import{e as W}from"../chunks/utils-9a9bd3c9.js";import{l as te}from"../chunks/Footer.svelte_svelte_type_style_lang-266e6168.js";import{H as Ee}from"../chunks/HeaderChip-b92ad979.js";import{M as ze}from"../chunks/Metadata-25f018aa.js";function Se(i){let e,r,t,s,a,l,o,n,f,v,u=(i[4]>1?"contributions":"contribution")+"",p,E;r=new Ye({props:{src:i[1],size:32,alt:""+(i[3]+"'s avatar"),loading:"lazy"}});let A=[{tabindex:"-1"},{class:"contributor"},{href:i[0]},W],M={};for(let k=0;k<A.length;k+=1)M=pe(M,A[k]);return{c(){e=d("a"),R(r.$$.fragment),t=H(),s=d("div"),a=d("h5"),l=O(i[3]),o=H(),n=d("span"),f=O(i[4]),v=H(),p=O(u),this.h()},l(k){e=g(k,"A",{tabindex:!0,class:!0,href:!0});var $=F(e);Y(r.$$.fragment,$),t=I($),s=g($,"DIV",{class:!0});var b=F(s);a=g(b,"H5",{class:!0});var j=F(a);l=B(j,i[3]),j.forEach(c),o=I(b),n=g(b,"SPAN",{});var w=F(n);f=B(w,i[4]),v=I(w),p=B(w,u),w.forEach(c),b.forEach(c),$.forEach(c),this.h()},h(){m(a,"class","svelte-t0rlj5"),m(s,"class","info svelte-t0rlj5"),Ie(e,M),Fe(e,"svelte-t0rlj5",!0)},m(k,$){y(k,e,$),q(r,e,null),h(e,t),h(e,s),h(s,a),h(a,l),h(s,o),h(s,n),h(n,f),h(n,v),h(n,p),E=!0},p(k,$){const b={};$&2&&(b.src=k[1]),$&8&&(b.alt=""+(k[3]+"'s avatar")),r.$set(b),(!E||$&8)&&ke(l,k[3]),(!E||$&16)&&ke(f,k[4]),(!E||$&16)&&u!==(u=(k[4]>1?"contributions":"contribution")+"")&&ke(p,u),Ie(e,M=$e(A,[{tabindex:"-1"},{class:"contributor"},(!E||$&1)&&{href:k[0]},W])),Fe(e,"svelte-t0rlj5",!0)},i(k){E||(C(r.$$.fragment,k),E=!0)},o(k){S(r.$$.fragment,k),E=!1},d(k){k&&c(e),N(r)}}}function Je(i){let e,r,t=i[2]==="User"&&Se(i);return{c(){t&&t.c(),e=fe()},l(s){t&&t.l(s),e=fe()},m(s,a){t&&t.m(s,a),y(s,e,a),r=!0},p(s,[a]){s[2]==="User"?t?(t.p(s,a),a&4&&C(t,1)):(t=Se(s),t.c(),C(t,1),t.m(e.parentNode,e)):t&&(_e(),S(t,1,1,()=>{t=null}),de())},i(s){r||(C(t),r=!0)},o(s){S(t),r=!1},d(s){t&&t.d(s),s&&c(e)}}}function Ke(i,e,r){let{html_url:t=void 0}=e,{avatar_url:s=void 0}=e,{type:a="User"}=e,{login:l="Unknown"}=e,{contributions:o=0}=e;return i.$$set=n=>{"html_url"in n&&r(0,t=n.html_url),"avatar_url"in n&&r(1,s=n.avatar_url),"type"in n&&r(2,a=n.type),"login"in n&&r(3,l=n.login),"contributions"in n&&r(4,o=n.contributions)},[t,s,a,l,o]}class Ve extends ie{constructor(e){super();ue(this,e,Ke,Je,ce,{html_url:0,avatar_url:1,type:2,login:3,contributions:4})}}function Qe(i){let e,r,t,s,a,l,o,n;return{c(){e=new Ce,r=H(),t=d("div"),s=d("h5"),a=O("Install"),l=H(),o=d("span"),n=O("Build FluentHub from source"),this.h()},l(f){e=De(f),r=I(f),t=g(f,"DIV",{class:!0});var v=F(t);s=g(v,"H5",{class:!0});var u=F(s);a=B(u,"Install"),u.forEach(c),l=I(v),o=g(v,"SPAN",{});var p=F(o);n=B(p,"Build FluentHub from source"),p.forEach(c),v.forEach(c),this.h()},h(){e.a=r,m(s,"class","svelte-1yc667v"),m(t,"class","hero-button-inner svelte-1yc667v")},m(f,v){e.m(Be,f,v),y(f,r,v),y(f,t,v),h(t,s),h(s,a),h(t,l),h(t,o),h(o,n)},p:Q,d(f){f&&e.d(),f&&c(r),f&&c(t)}}}function We(i){let e,r,t,s,a,l,o,n;return{c(){e=new Ce,r=H(),t=d("div"),s=d("h5"),a=O("View GitHub"),l=H(),o=d("span"),n=O("FluentHub is free and open-source!"),this.h()},l(f){e=De(f),r=I(f),t=g(f,"DIV",{class:!0});var v=F(t);s=g(v,"H5",{class:!0});var u=F(s);a=B(u,"View GitHub"),u.forEach(c),l=I(v),o=g(v,"SPAN",{});var p=F(o);n=B(p,"FluentHub is free and open-source!"),p.forEach(c),v.forEach(c),this.h()},h(){e.a=r,m(s,"class","svelte-1yc667v"),m(t,"class","hero-button-inner svelte-1yc667v")},m(f,v){e.m(qe,f,v),y(f,r,v),y(f,t,v),h(t,s),h(s,a),h(t,l),h(t,o),h(o,n)},p:Q,d(f){f&&e.d(),f&&c(r),f&&c(t)}}}function Ze(i){let e,r,t,s,a,l,o,n,f,v,u,p,E,A,M,k,$,b,j,w,V,P;const T=[{variant:"accent"},{href:"https://github.com/"+te.github.owner+"/"+te.github.repo+"/blob/main/docs/build-from-source.md"},W];let L={$$slots:{default:[Qe]},$$scope:{ctx:i}};for(let D=0;D<T.length;D+=1)L=pe(L,T[D]);f=new he({props:L});const X=[{href:"https://github.com/files-community"},W];let J={$$slots:{default:[We]},$$scope:{ctx:i}};for(let D=0;D<X.length;D+=1)J=pe(J,X[D]);return u=new he({props:J}),{c(){e=d("div"),r=d("h1"),t=O("FluentHub"),s=H(),a=d("p"),l=O("A stylish yet wonderfully powerful GitHub Oauth client"),o=H(),n=d("div"),R(f.$$.fragment),v=H(),R(u.$$.fragment),p=H(),E=d("div"),A=d("div"),M=d("picture"),k=d("source"),$=H(),b=d("source"),j=H(),w=d("img"),this.h()},l(D){e=g(D,"DIV",{class:!0});var U=F(e);r=g(U,"H1",{});var z=F(r);t=B(z,"FluentHub"),z.forEach(c),s=I(U),a=g(U,"P",{});var x=F(a);l=B(x,"A stylish yet wonderfully powerful GitHub Oauth client"),x.forEach(c),o=I(U),n=g(U,"DIV",{class:!0});var Z=F(n);Y(f.$$.fragment,Z),v=I(Z),Y(u.$$.fragment,Z),Z.forEach(c),U.forEach(c),p=I(D),E=g(D,"DIV",{class:!0});var ee=F(E);A=g(ee,"DIV",{class:!0});var ne=F(A);M=g(ne,"PICTURE",{});var K=F(M);k=g(K,"SOURCE",{media:!0,srcset:!0}),$=I(K),b=g(K,"SOURCE",{media:!0,srcset:!0}),j=I(K),w=g(K,"IMG",{alt:!0,height:!0,src:!0,width:!0,class:!0}),K.forEach(c),ne.forEach(c),ee.forEach(c),this.h()},h(){m(n,"class","buttons-spacer svelte-1yc667v"),m(e,"class","hero-left svelte-1yc667v"),m(k,"media","(prefers-color-scheme: dark)"),m(k,"srcset","/screenshots/hero-dark.png"),m(b,"media","(prefers-color-scheme: light)"),m(b,"srcset","/screenshots/hero-light.png"),m(w,"alt","FluentHub screenshot"),m(w,"height","768"),le(w.src,V="/screenshots/hero-dark.png")||m(w,"src",V),m(w,"width","1024"),m(w,"class","svelte-1yc667v"),m(A,"class","hero-image-container svelte-1yc667v"),m(E,"class","hero-right svelte-1yc667v")},m(D,U){y(D,e,U),h(e,r),h(r,t),h(e,s),h(e,a),h(a,l),h(e,o),h(e,n),q(f,n,null),h(n,v),q(u,n,null),y(D,p,U),y(D,E,U),h(E,A),h(A,M),h(M,k),h(M,$),h(M,b),h(M,j),h(M,w),P=!0},p(D,U){const z=U&0?$e(T,[T[0],U&0&&{href:"https://github.com/"+te.github.owner+"/"+te.github.repo+"/blob/main/docs/build-from-source.md"},U&0&&ge(W)]):{};U&1&&(z.$$scope={dirty:U,ctx:D}),f.$set(z);const x=U&0?$e(X,[X[0],ge(W)]):{};U&1&&(x.$$scope={dirty:U,ctx:D}),u.$set(x)},i(D){P||(C(f.$$.fragment,D),C(u.$$.fragment,D),P=!0)},o(D){S(f.$$.fragment,D),S(u.$$.fragment,D),P=!1},d(D){D&&c(e),N(f),N(u),D&&c(p),D&&c(E)}}}function xe(i){let e,r;return e=new be({props:{id:"hero-section",$$slots:{default:[Ze]},$$scope:{ctx:i}}}),{c(){R(e.$$.fragment)},l(t){Y(e.$$.fragment,t)},m(t,s){q(e,t,s),r=!0},p(t,[s]){const a={};s&1&&(a.$$scope={dirty:s,ctx:t}),e.$set(a)},i(t){r||(C(e.$$.fragment,t),r=!0)},o(t){S(e.$$.fragment,t),r=!1},d(t){N(e,t)}}}class et extends ie{constructor(e){super();ue(this,e,null,xe,ce,{})}}const{window:tt}=Ae;function st(i){let e,r;return{c(){e=d("img"),this.h()},l(t){e=g(t,"IMG",{src:!0}),this.h()},h(){le(e.src,r="https://img.icons8.com/fluency/speedometer")||m(e,"src",r)},m(t,s){y(t,e,s)},d(t){t&&c(e)}}}function rt(i){let e;return{c(){e=O("Try it")},l(r){e=B(r,"Try it")},m(r,t){y(r,e,t)},d(r){r&&c(e)}}}function lt(i){let e;return{c(){e=O("Design System")},l(r){e=B(r,"Design System")},m(r,t){y(r,e,t)},d(r){r&&c(e)}}}function nt(i){let e,r,t,s,a,l,o,n,f,v,u,p,E,A,M,k,$,b,j,w,V,P=`translateY(${Math.floor(i[0]/-10)}px)`,T,L,X,J,D,U,z,x,Z;e=new Ee({props:{$$slots:{default:[st]},$$scope:{ctx:i}}});const ee=[{href:"https://github.com/FluentHub/FluentHub/blob/main/docs/build-from-source.md"},W,{variant:"accent"}];let ne={$$slots:{default:[rt]},$$scope:{ctx:i}};for(let _=0;_<ee.length;_+=1)ne=pe(ne,ee[_]);v=new he({props:ne});const K=[{href:"https://www.microsoft.com/design/fluent/"},W,{variant:"hyperlink"}];let we={$$slots:{default:[lt]},$$scope:{ctx:i}};for(let _=0;_<K.length;_+=1)we=pe(we,K[_]);return p=new he({props:we}),{c(){R(e.$$.fragment),r=H(),t=d("h2"),s=O("Fast and fluent"),a=H(),l=d("p"),o=O("Coded with XAML and in-line with the Fluent design system, FluentHub's UI is truly perfect."),n=H(),f=d("div"),R(v.$$.fragment),u=H(),R(p.$$.fragment),E=H(),A=d("div"),M=d("picture"),k=d("source"),$=H(),b=d("source"),j=H(),w=d("img"),T=H(),L=d("picture"),X=d("source"),J=H(),D=d("source"),U=H(),z=d("img"),this.h()},l(_){Y(e.$$.fragment,_),r=I(_),t=g(_,"H2",{});var G=F(t);s=B(G,"Fast and fluent"),G.forEach(c),a=I(_),l=g(_,"P",{});var me=F(l);o=B(me,"Coded with XAML and in-line with the Fluent design system, FluentHub's UI is truly perfect."),me.forEach(c),n=I(_),f=g(_,"DIV",{class:!0});var se=F(f);Y(v.$$.fragment,se),u=I(se),Y(p.$$.fragment,se),se.forEach(c),E=I(_),A=g(_,"DIV",{class:!0});var re=F(A);M=g(re,"PICTURE",{});var oe=F(M);k=g(oe,"SOURCE",{media:!0,srcset:!0}),$=I(oe),b=g(oe,"SOURCE",{media:!0,srcset:!0}),j=I(oe),w=g(oe,"IMG",{alt:!0,class:!0,height:!0,src:!0,width:!0}),oe.forEach(c),T=I(re),L=g(re,"PICTURE",{});var ae=F(L);X=g(ae,"SOURCE",{media:!0,srcset:!0}),J=I(ae),D=g(ae,"SOURCE",{media:!0,srcset:!0}),U=I(ae),z=g(ae,"IMG",{alt:!0,class:!0,height:!0,src:!0,width:!0}),ae.forEach(c),re.forEach(c),this.h()},h(){m(f,"class","buttons-spacer"),m(k,"media","(prefers-color-scheme: dark)"),m(k,"srcset","/screenshots/hero-dark.png"),m(b,"media","(prefers-color-scheme: light)"),m(b,"srcset","/screenshots/hero-light.png"),m(w,"alt","FluentHub screenshot"),m(w,"class","files-screenshot svelte-yr8tyk"),m(w,"height","384"),le(w.src,V="/screenshots/hero-dark.png")||m(w,"src",V),m(w,"width","512"),ve(w,"transform",P,!1),m(X,"media","(prefers-color-scheme: dark)"),m(X,"srcset","/screenshots/desktop-dark.png"),m(D,"media","(prefers-color-scheme: light)"),m(D,"srcset","/screenshots/desktop-light.png"),m(z,"alt","Desktop wallpaper"),m(z,"class","files-wallpaper svelte-yr8tyk"),m(z,"height","900"),le(z.src,x="/screenshots/desktop-dark.png")||m(z,"src",x),m(z,"width","1440"),m(A,"class","design-image svelte-yr8tyk")},m(_,G){q(e,_,G),y(_,r,G),y(_,t,G),h(t,s),y(_,a,G),y(_,l,G),h(l,o),y(_,n,G),y(_,f,G),q(v,f,null),h(f,u),q(p,f,null),y(_,E,G),y(_,A,G),h(A,M),h(M,k),h(M,$),h(M,b),h(M,j),h(M,w),h(A,T),h(A,L),h(L,X),h(L,J),h(L,D),h(L,U),h(L,z),Z=!0},p(_,G){const me={};G&4&&(me.$$scope={dirty:G,ctx:_}),e.$set(me);const se=G&0?$e(ee,[ee[0],ge(W),ee[2]]):{};G&4&&(se.$$scope={dirty:G,ctx:_}),v.$set(se);const re=G&0?$e(K,[K[0],ge(W),K[2]]):{};G&4&&(re.$$scope={dirty:G,ctx:_}),p.$set(re),G&1&&P!==(P=`translateY(${Math.floor(_[0]/-10)}px)`)&&ve(w,"transform",P,!1)},i(_){Z||(C(e.$$.fragment,_),C(v.$$.fragment,_),C(p.$$.fragment,_),Z=!0)},o(_){S(e.$$.fragment,_),S(v.$$.fragment,_),S(p.$$.fragment,_),Z=!1},d(_){N(e,_),_&&c(r),_&&c(t),_&&c(a),_&&c(l),_&&c(n),_&&c(f),N(v),N(p),_&&c(E),_&&c(A)}}}function ot(i){let e,r,t,s;return e=new be({props:{id:"design-section",$$slots:{default:[nt]},$$scope:{ctx:i}}}),{c(){R(e.$$.fragment)},l(a){Y(e.$$.fragment,a)},m(a,l){q(e,a,l),r=!0,t||(s=Me(tt,"scroll",i[1]),t=!0)},p(a,[l]){const o={};l&5&&(o.$$scope={dirty:l,ctx:a}),e.$set(o)},i(a){r||(C(e.$$.fragment,a),r=!0)},o(a){S(e.$$.fragment,a),r=!1},d(a){N(e,a),t=!1,s()}}}function at(i,e,r){let t;return[t,()=>window.requestAnimationFrame(()=>r(0,t=window.scrollY))]}class it extends ie{constructor(e){super();ue(this,e,at,ot,ce,{})}}const{window:ut}=Ae;function ct(i){let e,r;return{c(){e=d("img"),this.h()},l(t){e=g(t,"IMG",{src:!0}),this.h()},h(){le(e.src,r="https://img.icons8.com/fluency/link")||m(e,"src",r)},m(t,s){y(t,e,s)},d(t){t&&c(e)}}}function ft(i){let e,r,t,s,a,l,o,n,f,v,u,p,E,A,M=`translateY(${Math.floor(i[0]/-15)}px)`,k;return e=new Ee({props:{$$slots:{default:[ct]},$$scope:{ctx:i}}}),{c(){R(e.$$.fragment),r=H(),t=d("h2"),s=O("Integration without the fuss"),a=H(),l=d("p"),o=O("FluentHub integrates GitHub's features without fuss. All you need to do is "),n=d("a"),f=O("authenticate"),v=O(" and FluentHub will do the rest."),u=H(),p=d("div"),E=d("img"),this.h()},l($){Y(e.$$.fragment,$),r=I($),t=g($,"H2",{});var b=F(t);s=B(b,"Integration without the fuss"),b.forEach(c),a=I($),l=g($,"P",{});var j=F(l);o=B(j,"FluentHub integrates GitHub's features without fuss. All you need to do is "),n=g(j,"A",{href:!0});var w=F(n);f=B(w,"authenticate"),w.forEach(c),v=B(j," and FluentHub will do the rest."),j.forEach(c),u=I($),p=g($,"DIV",{class:!0});var V=F(p);E=g(V,"IMG",{alt:!0,class:!0,height:!0,src:!0,width:!0}),V.forEach(c),this.h()},h(){m(n,"href","https://github.com/"+te.github.owner+"/"+te.github.repo+"/blob/main/docs/build-from-source.md"),m(E,"alt","FluentHub word-map"),m(E,"class","files-wallpaper svelte-yr8tyk"),m(E,"height","-1024"),le(E.src,A="/branding/map.png")||m(E,"src",A),m(E,"width","-1024"),ve(E,"transform",M,!1),m(p,"class","design-image svelte-yr8tyk")},m($,b){q(e,$,b),y($,r,b),y($,t,b),h(t,s),y($,a,b),y($,l,b),h(l,o),h(l,n),h(n,f),h(l,v),y($,u,b),y($,p,b),h(p,E),k=!0},p($,b){const j={};b&4&&(j.$$scope={dirty:b,ctx:$}),e.$set(j),b&1&&M!==(M=`translateY(${Math.floor($[0]/-15)}px)`)&&ve(E,"transform",M,!1)},i($){k||(C(e.$$.fragment,$),k=!0)},o($){S(e.$$.fragment,$),k=!1},d($){N(e,$),$&&c(r),$&&c(t),$&&c(a),$&&c(l),$&&c(u),$&&c(p)}}}function ht(i){let e,r,t,s;return e=new be({props:{id:"design-section",$$slots:{default:[ft]},$$scope:{ctx:i}}}),{c(){R(e.$$.fragment)},l(a){Y(e.$$.fragment,a)},m(a,l){q(e,a,l),r=!0,t||(s=Me(ut,"scroll",i[1]),t=!0)},p(a,[l]){const o={};l&5&&(o.$$scope={dirty:l,ctx:a}),e.$set(o)},i(a){r||(C(e.$$.fragment,a),r=!0)},o(a){S(e.$$.fragment,a),r=!1},d(a){N(e,a),t=!1,s()}}}function mt(i,e,r){let t;return[t,()=>window.requestAnimationFrame(()=>r(0,t=window.scrollY))]}class $t extends ie{constructor(e){super();ue(this,e,mt,ht,ce,{})}}const{owner:pt,repo:_t}=te.github,He=async(i=0)=>await fetch(`https://api.github.com/repos/${pt}/${_t}/contributors?per_page=35&page=${i}`).then(e=>e.json()).catch(e=>(console.error(e),""));function Pe(i,e,r){const t=i.slice();return t[2]=e[r],t}function je(i,e,r){const t=i.slice();return t[14]=e[r],t}function Ue(i,e,r){const t=i.slice();return t[6]=e[r].html_url,t[7]=e[r].avatar_url,t[8]=e[r].login,t[9]=e[r].contributions,t[10]=e[r].type,t}function dt(i){let e,r;return{c(){e=d("img"),this.h()},l(t){e=g(t,"IMG",{src:!0}),this.h()},h(){le(e.src,r="https://img.icons8.com/fluency/team")||m(e,"src",r)},m(t,s){y(t,e,s)},d(t){t&&c(e)}}}function gt(i){let e;return{c(){e=O("Join the discussion")},l(r){e=B(r,"Join the discussion")},m(r,t){y(r,e,t)},d(r){r&&c(e)}}}function vt(i){let e;return{c(){e=O("Contribute to the project")},l(r){e=B(r,"Contribute to the project")},m(r,t){y(r,e,t)},d(r){r&&c(e)}}}function bt(i){let e,r,t=i[0],s=[];for(let l=0;l<t.length;l+=1)s[l]=Oe(Pe(i,t,l));const a=l=>S(s[l],1,1,()=>{s[l]=null});return{c(){e=d("div");for(let l=0;l<s.length;l+=1)s[l].c();this.h()},l(l){e=g(l,"DIV",{class:!0});var o=F(e);for(let n=0;n<s.length;n+=1)s[n].l(o);o.forEach(c),this.h()},h(){m(e,"class","contributors-container svelte-13dbi9r")},m(l,o){y(l,e,o);for(let n=0;n<s.length;n+=1)s[n].m(e,null);r=!0},p(l,o){if(o&1){t=l[0];let n;for(n=0;n<t.length;n+=1){const f=Pe(l,t,n);s[n]?(s[n].p(f,o),C(s[n],1)):(s[n]=Oe(f),s[n].c(),C(s[n],1),s[n].m(e,null))}for(_e(),n=t.length;n<s.length;n+=1)a(n);de()}},i(l){if(!r){for(let o=0;o<t.length;o+=1)C(s[o]);r=!0}},o(l){s=s.filter(Boolean);for(let o=0;o<s.length;o+=1)S(s[o]);r=!1},d(l){l&&c(e),ye(s,l)}}}function wt(i){let e,r,t=Array(35),s=[];for(let l=0;l<t.length;l+=1)s[l]=Ge(je(i,t,l));const a=l=>S(s[l],1,1,()=>{s[l]=null});return{c(){for(let l=0;l<s.length;l+=1)s[l].c();e=fe()},l(l){for(let o=0;o<s.length;o+=1)s[o].l(l);e=fe()},m(l,o){for(let n=0;n<s.length;n+=1)s[n].m(l,o);y(l,e,o),r=!0},p(l,o){if(o&0){t=Array(35);let n;for(n=0;n<t.length;n+=1){const f=je(l,t,n);s[n]?(s[n].p(f,o),C(s[n],1)):(s[n]=Ge(),s[n].c(),C(s[n],1),s[n].m(e.parentNode,e))}for(_e(),n=t.length;n<s.length;n+=1)a(n);de()}},i(l){if(!r){for(let o=0;o<t.length;o+=1)C(s[o]);r=!0}},o(l){s=s.filter(Boolean);for(let o=0;o<s.length;o+=1)S(s[o]);r=!1},d(l){ye(s,l),l&&c(e)}}}function Ge(i){let e,r;return e=new Ve({props:{html_url:"https://github.com/onein528",avatar_url:"data:image/svg+xml;"+encodeURIComponent(Le),contributions:0}}),{c(){R(e.$$.fragment)},l(t){Y(e.$$.fragment,t)},m(t,s){q(e,t,s),r=!0},p:Q,i(t){r||(C(e.$$.fragment,t),r=!0)},o(t){S(e.$$.fragment,t),r=!1},d(t){N(e,t)}}}function kt(i){let e,r,t=i[5].sort(i[1]),s=[];for(let l=0;l<t.length;l+=1)s[l]=Re(Ue(i,t,l));const a=l=>S(s[l],1,1,()=>{s[l]=null});return{c(){for(let l=0;l<s.length;l+=1)s[l].c();e=fe()},l(l){for(let o=0;o<s.length;o+=1)s[o].l(l);e=fe()},m(l,o){for(let n=0;n<s.length;n+=1)s[n].m(l,o);y(l,e,o),r=!0},p(l,o){if(o&1){t=l[5].sort(l[1]);let n;for(n=0;n<t.length;n+=1){const f=Ue(l,t,n);s[n]?(s[n].p(f,o),C(s[n],1)):(s[n]=Re(f),s[n].c(),C(s[n],1),s[n].m(e.parentNode,e))}for(_e(),n=t.length;n<s.length;n+=1)a(n);de()}},i(l){if(!r){for(let o=0;o<t.length;o+=1)C(s[o]);r=!0}},o(l){s=s.filter(Boolean);for(let o=0;o<s.length;o+=1)S(s[o]);r=!1},d(l){ye(s,l),l&&c(e)}}}function Re(i){let e,r;return e=new Ve({props:{html_url:i[6],avatar_url:i[7],login:i[8],contributions:i[9],type:i[10]}}),{c(){R(e.$$.fragment)},l(t){Y(e.$$.fragment,t)},m(t,s){q(e,t,s),r=!0},p:Q,i(t){r||(C(e.$$.fragment,t),r=!0)},o(t){S(e.$$.fragment,t),r=!1},d(t){N(e,t)}}}function yt(i){return{c:Q,l:Q,m:Q,p:Q,i:Q,o:Q,d:Q}}function Oe(i){let e,r,t,s={ctx:i,current:null,token:null,hasCatch:!0,pending:yt,then:kt,catch:wt,value:5,error:13,blocks:[,,,]};return Te(i[2],s),{c(){e=d("div"),s.block.c(),r=H(),this.h()},l(a){e=g(a,"DIV",{class:!0});var l=F(e);s.block.l(l),r=I(l),l.forEach(c),this.h()},h(){m(e,"class","contributors-row svelte-13dbi9r")},m(a,l){y(a,e,l),s.block.m(e,s.anchor=null),s.mount=()=>e,s.anchor=r,h(e,r),t=!0},p(a,l){i=a,Ne(s,i,l)},i(a){t||(C(s.block),t=!0)},o(a){for(let l=0;l<3;l+=1){const o=s.blocks[l];S(o)}t=!1},d(a){a&&c(e),s.block.d(),s.token=null,s=null}}}function Et(i){let e,r,t,s,a,l,o,n,f,v,u,p,E,A,M,k=i[0].every(It),$,b,j;t=new Ee({props:{$$slots:{default:[dt]},$$scope:{ctx:i}}}),p=new he({props:{variant:"hyperlink",href:"https://discord.gg/"+te.discord,$$slots:{default:[gt]},$$scope:{ctx:i}}}),A=new he({props:{variant:"hyperlink",href:"https://github.com/FluentHub/Fluenthub",$$slots:{default:[vt]},$$scope:{ctx:i}}});let w=k&&bt(i);return{c(){e=d("div"),r=d("div"),R(t.$$.fragment),s=H(),a=d("h2"),l=O("A thriving community"),o=H(),n=d("p"),f=O(`FluentHub is open-source and anyone can contribute to it. Made with C#, XAML and \u{1F497}, our app has no limits.
				Our community is what makes Fluenthub real - what point is there in an app that isn't influenced
				by it's users and community?`),v=H(),u=d("div"),R(p.$$.fragment),E=H(),R(A.$$.fragment),M=H(),w&&w.c(),$=H(),b=d("div"),this.h()},l(V){e=g(V,"DIV",{class:!0});var P=F(e);r=g(P,"DIV",{class:!0});var T=F(r);Y(t.$$.fragment,T),s=I(T),a=g(T,"H2",{class:!0});var L=F(a);l=B(L,"A thriving community"),L.forEach(c),o=I(T),n=g(T,"P",{class:!0});var X=F(n);f=B(X,`FluentHub is open-source and anyone can contribute to it. Made with C#, XAML and \u{1F497}, our app has no limits.
				Our community is what makes Fluenthub real - what point is there in an app that isn't influenced
				by it's users and community?`),X.forEach(c),v=I(T),u=g(T,"DIV",{class:!0});var J=F(u);Y(p.$$.fragment,J),E=I(J),Y(A.$$.fragment,J),J.forEach(c),T.forEach(c),M=I(P),w&&w.l(P),$=I(P),b=g(P,"DIV",{class:!0}),F(b).forEach(c),P.forEach(c),this.h()},h(){m(a,"class","svelte-13dbi9r"),m(n,"class","svelte-13dbi9r"),m(u,"class","buttons-spacer"),m(r,"class","community-section-text svelte-13dbi9r"),m(b,"class","rainbow-background svelte-13dbi9r"),m(e,"class","community-section-card svelte-13dbi9r")},m(V,P){y(V,e,P),h(e,r),q(t,r,null),h(r,s),h(r,a),h(a,l),h(r,o),h(r,n),h(n,f),h(r,v),h(r,u),q(p,u,null),h(u,E),q(A,u,null),h(e,M),w&&w.m(e,null),h(e,$),h(e,b),j=!0},p(V,P){const T={};P&131072&&(T.$$scope={dirty:P,ctx:V}),t.$set(T);const L={};P&131072&&(L.$$scope={dirty:P,ctx:V}),p.$set(L);const X={};P&131072&&(X.$$scope={dirty:P,ctx:V}),A.$set(X),k&&w.p(V,P)},i(V){j||(C(t.$$.fragment,V),C(p.$$.fragment,V),C(A.$$.fragment,V),C(w),j=!0)},o(V){S(t.$$.fragment,V),S(p.$$.fragment,V),S(A.$$.fragment,V),S(w),j=!1},d(V){V&&c(e),N(t),N(p),N(A),w&&w.d()}}}function Ht(i){let e,r;return e=new be({props:{id:"community-section",$$slots:{default:[Et]},$$scope:{ctx:i}}}),{c(){R(e.$$.fragment)},l(t){Y(e.$$.fragment,t)},m(t,s){q(e,t,s),r=!0},p(t,[s]){const a={};s&131072&&(a.$$scope={dirty:s,ctx:t}),e.$set(a)},i(t){r||(C(e.$$.fragment,t),r=!0)},o(t){S(e.$$.fragment,t),r=!1},d(t){N(e,t)}}}const It=i=>i;function Ft(i){return[[He(1),He(2),He(3)],()=>Math.random()-.5]}class Ct extends ie{constructor(e){super();ue(this,e,Ft,Ht,ce,{})}}function Dt(i){let e,r,t,s,a,l,o,n,f,v;return e=new ze({props:{title:"FluentHub"}}),t=new et({}),a=new it({}),o=new $t({}),f=new Ct({}),{c(){R(e.$$.fragment),r=H(),R(t.$$.fragment),s=H(),R(a.$$.fragment),l=H(),R(o.$$.fragment),n=H(),R(f.$$.fragment)},l(u){const p=Xe('[data-svelte="svelte-1owuugt"]',document.head);Y(e.$$.fragment,p),p.forEach(c),r=I(u),Y(t.$$.fragment,u),s=I(u),Y(a.$$.fragment,u),l=I(u),Y(o.$$.fragment,u),n=I(u),Y(f.$$.fragment,u)},m(u,p){q(e,document.head,null),y(u,r,p),q(t,u,p),y(u,s,p),q(a,u,p),y(u,l,p),q(o,u,p),y(u,n,p),q(f,u,p),v=!0},p:Q,i(u){v||(C(e.$$.fragment,u),C(t.$$.fragment,u),C(a.$$.fragment,u),C(o.$$.fragment,u),C(f.$$.fragment,u),v=!0)},o(u){S(e.$$.fragment,u),S(t.$$.fragment,u),S(a.$$.fragment,u),S(o.$$.fragment,u),S(f.$$.fragment,u),v=!1},d(u){N(e),u&&c(r),N(t,u),u&&c(s),N(a,u),u&&c(l),N(o,u),u&&c(n),N(f,u)}}}class Gt extends ie{constructor(e){super();ue(this,e,null,Dt,ce,{})}}export{Gt as default};