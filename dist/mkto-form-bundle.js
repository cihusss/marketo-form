(()=>{"use strict";const e=e=>{const t=document.getElementsByClassName("lp-form")[0].id.split("mktoForm_").pop();console.log("formId:",t),MktoForms2.loadForm("https://learn.bisk.com","058-NIT-467",t);const o=e.getAttribute("requiredFields").split(","),n=e.getAttribute("btnBg"),l=e.getAttribute("btnFg"),r=[];o.forEach((e=>{r.push({name:e.trim(),message:"This field is required."})}));var i={buttons:{prev:{label:"Back",disabled:!1},next:{label:"Next"}},requiredFields:r};MktoForms2.whenReady((function(e){console.log("form is ready");var t=e.getFormElem()[0],o=getSelection.call.bind([].slice),r=".mktoButtonRow .mktoButton",a="fsaat-",s="data-form-local-fragment",c=t.querySelectorAll(".mktoForm > .mktoFormRow"),u=t.querySelector(".mktoForm > .mktoButtonRow"),d=u.querySelector(r);i.requiredFields.map((function(e){return e.label=t.querySelector("[for='"+e.name+"']"),e.refEl=t.querySelector("[name='"+e.name+"']"),e})).forEach((function(e){e.label.parentNode.classList.add("mktoRequiredField")}));var m=o(document.styleSheets).filter((function(e){return"STYLE"==e.ownerNode.nodeName}))[0];function p(e,o){var n,l,r="next";o=o||r,n=e instanceof HTMLElement?+e.id.split(a)[1]:isNaN(e)?-1:e,l="#"+a+(o==r?++n:--n),t.setAttribute(s,l)}function y(o,n){e.submittable(!1),n=n||t;var l=e.getValues(),r=i.requiredFields.filter((function(e){return n.contains(e.refEl)&&(!l[e.name]||"checkbox"==e.refEl.type&&"no"==l[e.name])}));return r.length?(e.showErrorMessage(r[0].message,MktoForms2.$(r[0].refEl)),!1):(e.submittable(!0),!0)}o(c).forEach((function(e,t){var o=0==t,n=t==c.length-1;e.id=a+t;var l,f,b=n?u:u.cloneNode(!0),g=e.nextSibling,h=!n,k=!o&&!i.buttons.prev.disabled,E={};h&&(E.next=b.querySelector(r)),k&&(f=l=E.next||d,E.prev=f.cloneNode()),Object.keys(E).forEach((function(e){E[e].type="button",E[e].setAttribute("data-dir",e),E[e].innerHTML=i.buttons[e].label})),h&&e.parentNode.insertBefore(b,g),k&&l.parentNode.insertBefore(E.prev,l),b.addEventListener("click",(function(t){if("BUTTON"==t.target.tagName&&"button"==t.target.type){if("next"==t.target.getAttribute("data-dir")&&!y(0,e))return;p(e,t.target.getAttribute("data-dir"))}})),m.insertRule([".mktoForm["+s+"='#"+e.id+"'] .mktoFormRow#"+e.id+",",".mktoForm["+s+"='#"+e.id+"'] .mktoFormRow#"+e.id+" + .mktoButtonRow","{ display: block; }"].join(" "),0)})),e.onValidate(y),p();let f=document.getElementsByClassName("mktoLabel"),b=document.getElementsByClassName("mktoField"),g=[];for(S=0;S<f.length;S++){let e=document.getElementsByClassName("mktoLabel")[S];e.style.opacity="0",name=e.innerHTML.split("</div>").pop(),e.nextSibling.nextSibling.setAttribute("placeholder",name)}const h=e=>{"text"===e.type?(e.addEventListener("focusin",(function(){this.previousSibling.previousSibling.style.opacity="1",this.setAttribute("placeholder",""),this.setAttribute("style","padding: 12px 6px 0 6px !important")})),e.addEventListener("focusout",(function(){let e=this.previousSibling.previousSibling;this.setAttribute("placeholder",e.innerHTML.split("</div>").pop()),""==this.value?(e.style.opacity="0",this.setAttribute("style","padding: 2px 6px 0 6px !important")):e.style.opacity="1"}))):e.type};for(S=0;S<b.length;S++){let e=document.getElementsByClassName("mktoField")[S];h(e)}document.querySelectorAll('input[name="Group_Opportunity__c"]')[1].addEventListener("click",(()=>{console.log("clicked"),setTimeout((()=>{let e=document.querySelectorAll('input[name="Company_Name__c"]')[0];e.placeholder=document.querySelectorAll('label[for="Company_Name__c"]')[0].innerText,h(e)}),10)})),console.log(b[0].value);let k=document.querySelector('button[type="submit"]');k.addEventListener("click",(function(){for(S=0;S<b.length;S++){let e=document.getElementsByClassName("mktoField")[S].value;console.log(e),g.push(e)}g.includes("")?console.log("one of the values is empty"):(k.innerHTML="Wait...",document.querySelector('button[type="button"]:nth-child(1)').style.display="none !important")})),k.style.background=n,k.style.color=l;let E=document.querySelector('button[data-dir="next"]');E.style.background=n,E.style.color=l,document.querySelectorAll("legend").forEach((e=>{let t=e.innerHTML.replace("0",""),o=document.querySelectorAll("fieldset");e.innerHTML=t+" of "+o.length,e.setAttribute("style","display: block !important")})),document.querySelectorAll(".mktoField").forEach((e=>{e.addEventListener("focusin",(function(){})),e.addEventListener("focusout",(function(){}))})),o(t.querySelectorAll("SELECT")).forEach((function(e){var t;o(e.querySelectorAll("OPTION")).forEach((function(o,n){"[OPTGROUP]"==o.value?((t=document.createElement("OPTGROUP")).label=o.textContent,e.appendChild(t),e.removeChild(o)):t&&t.appendChild(o)}))}));let v=t.querySelectorAll('.mktoFormRow input[type="hidden"]');for(var S=0;S<v.length;S++)v[S].parentNode.style.display="none";let A=t.querySelectorAll("OPTION"),q=/^\[DISABLED\]\s/;Array.prototype.forEach.call(A,(function(e){q.test(e.textContent)&&(e.textContent=e.textContent.replace(q,""),e.disabled=!0)})),e.addHiddenFields({Landing_Page_URL__c:document.location})}))};(()=>{const t=document.currentScript;window.addEventListener("load",(o=>{e(t)}))})()})();