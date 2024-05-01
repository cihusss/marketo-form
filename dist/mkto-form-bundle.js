(()=>{"use strict";const e=e=>{let t;try{t=document.getElementsByClassName("lp-form")[0].id.split("mktoForm_").pop()}catch(e){return void console.log("No form ID found in DOM")}if(void 0===t)return void console.log("No form ID found in DOM");console.log(`Found form ${t} in DOM`),MktoForms2.loadForm("https://learn.bisk.com","058-NIT-467",t);const o=e.getAttribute("requiredFields").split(","),n=e.getAttribute("btnBg"),l=e.getAttribute("btnFg"),r=[];o.forEach((e=>{r.push({name:e.trim(),message:"This field is required."})}));var i={buttons:{prev:{label:"Back",disabled:!1},next:{label:"Next"}},requiredFields:r};MktoForms2.whenReady((function(e){console.log(`Form ${t} is now ready`);var o=e.getFormElem()[0],r=getSelection.call.bind([].slice),a=".mktoButtonRow .mktoButton",s="fsaat-",d="data-form-local-fragment",c=o.querySelectorAll(".mktoForm > .mktoFormRow"),u=o.querySelector(".mktoForm > .mktoButtonRow"),m=u.querySelector(a);i.requiredFields.map((function(e){return e.label=o.querySelector("[for='"+e.name+"']"),e.refEl=o.querySelector("[name='"+e.name+"']"),e})).forEach((function(e){e.label.parentNode.classList.add("mktoRequiredField")}));var p=r(document.styleSheets).filter((function(e){return"STYLE"==e.ownerNode.nodeName}))[0];function y(e,t){var n,l,r="next";t=t||r,n=e instanceof HTMLElement?+e.id.split(s)[1]:isNaN(e)?-1:e,l="#"+s+(t==r?++n:--n),o.setAttribute(d,l)}function f(t,n){e.submittable(!1),n=n||o;var l=e.getValues(),r=i.requiredFields.filter((function(e){return n.contains(e.refEl)&&(!l[e.name]||"checkbox"==e.refEl.type&&"no"==l[e.name])}));return r.length?(e.showErrorMessage(r[0].message,MktoForms2.$(r[0].refEl)),!1):(e.submittable(!0),!0)}r(c).forEach((function(e,t){var o=0==t,n=t==c.length-1;e.id=s+t;var l,r,g=n?u:u.cloneNode(!0),b=e.nextSibling,h=!n,v=!o&&!i.buttons.prev.disabled,E={};h&&(E.next=g.querySelector(a)),v&&(r=l=E.next||m,E.prev=r.cloneNode()),Object.keys(E).forEach((function(e){E[e].type="button",E[e].setAttribute("data-dir",e),E[e].innerHTML=i.buttons[e].label})),h&&e.parentNode.insertBefore(g,b),v&&l.parentNode.insertBefore(E.prev,l),g.addEventListener("click",(function(t){if("BUTTON"==t.target.tagName&&"button"==t.target.type){if("next"==t.target.getAttribute("data-dir")&&!f(0,e))return;y(e,t.target.getAttribute("data-dir"))}})),p.insertRule([".mktoForm["+d+"='#"+e.id+"'] .mktoFormRow#"+e.id+",",".mktoForm["+d+"='#"+e.id+"'] .mktoFormRow#"+e.id+" + .mktoButtonRow","{ display: block; }"].join(" "),0)})),e.onValidate(f),y();let g=document.getElementsByClassName("mktoLabel"),b=document.getElementsByClassName("mktoField"),h=[];for(S=0;S<g.length;S++){let e=document.getElementsByClassName("mktoLabel")[S];e.style.opacity="0",name=e.innerHTML.split("</div>").pop(),e.nextSibling.nextSibling.setAttribute("placeholder",name)}const v=e=>{"radio"!==e.type?(e.addEventListener("focusin",(function(){this.previousSibling.previousSibling.style.opacity="1",this.setAttribute("placeholder",""),this.setAttribute("style","padding: 12px 6px 0 6px !important")})),e.addEventListener("focusout",(function(){let e=this.previousSibling.previousSibling;this.setAttribute("placeholder",e.innerHTML.split("</div>").pop()),""==this.value?(e.style.opacity="0",this.setAttribute("style","padding: 2px 6px 0 6px !important")):e.style.opacity="1"}))):e.type};for(S=0;S<b.length;S++){let e=document.getElementsByClassName("mktoField")[S];v(e)}try{let e=document.querySelectorAll("input[type='radio']")[1],t=e.parentNode.parentNode.parentNode.parentNode;e.addEventListener("click",(()=>{setTimeout((()=>{let e=t.nextSibling.childNodes[0].childNodes[1].childNodes[2],o=t.nextSibling.childNodes[0].childNodes[1].childNodes[0];e.placeholder=o.innerText,v(e)}),10)}))}catch(e){console.log("No custom group field found")}console.log(b[0].value);let E=document.querySelector('button[type="submit"]');E.addEventListener("click",(function(){for(S=0;S<b.length;S++){let e=document.getElementsByClassName("mktoField")[S].value;console.log(e),h.push(e)}h.includes("")?console.log("one of the values is empty"):(E.innerHTML="Wait...",document.querySelector('button[type="button"]:nth-child(1)').style.display="none !important")})),E.style.background=n,E.style.color=l;try{let e=document.querySelector('button[data-dir="next"]');e.style.background=n,e.style.color=l}catch(e){}let N=document.querySelectorAll("legend");N.forEach((e=>{let t=e.innerHTML.replace("0",""),o=document.querySelectorAll("fieldset");e.innerHTML=t+" of "+o.length,1===N.length?(e.setAttribute("style","opacity: 0 !important"),document.getElementById("fsaat-0").setAttribute("style","margin-top: -20px !important")):e.setAttribute("style","display: block !important")})),document.querySelectorAll(".mktoField").forEach((e=>{e.addEventListener("focusin",(function(){})),e.addEventListener("focusout",(function(){}))})),r(o.querySelectorAll("SELECT")).forEach((function(e){var t;r(e.querySelectorAll("OPTION")).forEach((function(o,n){"[OPTGROUP]"==o.value?((t=document.createElement("OPTGROUP")).label=o.textContent,e.appendChild(t),e.removeChild(o)):t&&t.appendChild(o)}))}));let k=o.querySelectorAll('.mktoFormRow input[type="hidden"]');for(var S=0;S<k.length;S++)k[S].parentNode.style.display="none";let F=o.querySelectorAll("OPTION"),A=/^\[DISABLED\]\s/;Array.prototype.forEach.call(F,(function(e){A.test(e.textContent)&&(e.textContent=e.textContent.replace(A,""),e.disabled=!0)})),e.addHiddenFields({Landing_Page_URL__c:document.location})}))};(()=>{const t=document.currentScript;window.addEventListener("load",(o=>{e(t)}))})()})();