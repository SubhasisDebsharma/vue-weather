export const harlemShake = function() {
  function c() {
    let e = document.createElement("link");
    e.setAttribute("type", "text/css");
    e.setAttribute("rel", "stylesheet");
    e.setAttribute("href", f);
    e.setAttribute("class", l);
    document.body.appendChild(e);
  }
  function h() {
    let e = document.getElementsByClassName(l);
    for (let t = 0; t < e.length; t++) {
      document.body.removeChild(e[t]);
    }
  }
  function p() {
    let e = document.createElement("div");
    e.setAttribute("class", a);
    document.body.appendChild(e);
    setTimeout(function() {
      document.body.removeChild(e);
    }, 100);
  }
  function d(e) {
    return {
      height: e.offsetHeight,
      width: e.offsetWidth
    };
  }
  function v(i) {
    let s = d(i);
    return s.height > e && s.height < n && s.width > t && s.width < r;
  }
  function m(e) {
    let t = e;
    let n = 0;
    while (t) {
      n += t.offsetTop;
      t = t.offsetParent;
    }
    return n;
  }
  function g() {
    let e = document.documentElement;
    if (window.innerWidth) {
      return window.innerHeight;
    } else if (e && !isNaN(e.clientHeight)) {
      return e.clientHeight;
    }
    return 0;
  }
  function y() {
    if (window.pageYOffset) {
      return window.pageYOffset;
    }
    return Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
  }
  function E(e) {
    let t = m(e);
    return t >= w && t <= b + w;
  }
  function S() {
    let e = document.createElement("audio");
    e.setAttribute("class", l);
    e.src = i;
    e.loop = false;
    e.addEventListener(
      "canplay",
      function() {
        setTimeout(function() {
          x(k);
        }, 500);
        setTimeout(function() {
          N();
          p();
          for (let e = 0; e < O.length; e++) {
            T(O[e]);
          }
        }, 15500);
      },
      true
    );
    e.addEventListener(
      "ended",
      function() {
        N();
        h();
      },
      true
    );
    e.innerHTML =
      " <p>If you are reading this, it is because your browser does not support the audio element. We recommend that you get a new browser.</p> <p>";
    document.body.appendChild(e);
    e.play();
  }
  function x(e) {
    e.className += " " + s + " " + o;
  }
  function T(e) {
    e.className += " " + s + " " + u[Math.floor(Math.random() * u.length)];
  }
  function N() {
    let e = document.getElementsByClassName(s);
    let t = new RegExp("\\b" + s + "\\b");
    for (let n = 0; n < e.length; ) {
      e[n].className = e[n].className.replace(t, "");
    }
  }
  let e = 30;
  let t = 30;
  let n = 350;
  let r = 350;
  let i =
    "https://s3.amazonaws.com/moovweb-marketing/playground/harlem-shake.mp3";
  let s = "mw-harlem_shake_me";
  let o = "im_first";
  let u = ["im_drunk", "im_baked", "im_trippin", "im_blown"];
  let a = "mw-strobe_light";
  let f =
    "https://s3.amazonaws.com/moovweb-marketing/playground/harlem-shake-style.css";
  let l = "mw_added_css";
  let b = g();
  let w = y();
  let C = document.getElementsByTagName("*");
  let k = null;
  for (let L = 0; L < C.length; L++) {
    var A = C[L];
    if (v(A)) {
      if (E(A)) {
        k = A;
        break;
      }
    }
  }
  if (A === null) {
    console.warn(
      "Could not find a node of the right size. Please try a different page."
    );
    return;
  }
  c();
  S();
  let O = [];
  for (let L = 0; L < C.length; L++) {
    let A = C[L];
    if (v(A)) {
      O.push(A);
    }
  }
};
