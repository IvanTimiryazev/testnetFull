"use strict";(self.webpackChunkkeysee=self.webpackChunkkeysee||[]).push([[181],{5181:function(e,r,s){s.r(r),s.d(r,{default:function(){return g}});var n=s(2791),a=s(4165),t=s(5861),i=s(8152),o=s(1483),l=s(5932),c=s(270),u=s(4880),d=s(9434),p=s(8124),h=s(512),m=s(5998),f=s(184),x=function(){var e=(0,u.k6)(),r=(0,d.I0)(),s=(0,d.v9)((function(e){return e.auth.error})),x=(0,n.useState)(!1),g=(0,i.Z)(x,2),v=g[0],j=g[1],w=(0,c.Z)((function(e){return e.includes("@")&&e.includes(".")&&e.trim().length>=6})),Z=w.value,k=w.hasError,y=w.isValid,C=w.valueChangeHandler,N=w.inputBlurHandler,b=w.inputFocusHandler,H=w.reset,E=(0,c.Z)((function(e){return e.trim().length>=6})),I=E.value,S=E.hasError,T=E.isValid,P=E.valueChangeHandler,B=E.inputBlurHandler,F=E.reset,Y=!1;y&&T&&(Y=!0);var U=!1;(k||S)&&(U=!0);var V=k||s?"formInput wrongCredentials":"formInput";return(0,f.jsxs)("div",{className:o.Z.container,children:[(0,f.jsxs)("form",{onSubmit:function(e){e.preventDefault();var s=function(){var e=(0,t.Z)((0,a.Z)().mark((function e(){var s,n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/v1/register",{method:"POST",body:JSON.stringify({email:Z,password:I}),headers:{"Content-Type":"application/json"}});case 2:if((s=e.sent).ok){e.next=5;break}throw new Error("This email already exists");case 5:return e.next=7,s.json();case 7:n=e.sent,j(!0),setTimeout((function(){j(!1),r(p.Y.logIn(n.access_token))}),2e3);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();try{s()}catch(n){r(p.Y.showError(n.message))}document.activeElement.blur(),H(),F()},className:o.Z.loginForm,children:[!v&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("h1",{children:"Sign Up"}),(0,f.jsxs)("div",{className:o.Z.newUser,children:[(0,f.jsx)("p",{children:"Have an account?"}),(0,f.jsx)("span",{onClick:function(){e.replace("/login"),r(p.Y.removeError())},children:"Sign in."})]}),(0,f.jsxs)("div",{className:"inputsContainer",children:[(0,f.jsx)("input",{type:"email",placeholder:"Email",className:V,value:Z,onChange:C,onBlur:N,onFocus:b}),(0,f.jsx)(m.Z,{inputType:"password",enteredPassword:I,passwordInputHasError:S,enteredPasswordIsValid:T,passwordChangedHandler:P,passwordBlurHandler:B,resetPasswordInput:F,placeholder:"Password"})]}),U&&(0,f.jsx)("p",{className:o.Z.errorText,children:"Please enter correct email & password."}),s&&(0,f.jsx)("p",{className:o.Z.errorText,children:s.errorMessage}),(0,f.jsx)(h.Z,{title:"Sign Up",type:"submit",disabled:!Y})]}),v&&(0,f.jsxs)("span",{className:o.Z.sucessReg,children:["Congratulations!",(0,f.jsx)("br",{}),"You have successfully registered!"]})]}),(0,f.jsx)("img",{src:l,alt:"keysee",className:o.Z.mainLogo})]})},g=function(){return(0,f.jsx)(x,{})}}}]);
//# sourceMappingURL=181.61c1aa80.chunk.js.map