//////////////////////////////////////////////////////////////////////
// Pano2VR 5.0.3/15088 HTML5/CSS3 & WebGL Panorama Player           //
// Trial License: For evaluation only!                              //
// (c) 2016, Garden Gnome Software, http://ggnome.com               //
//////////////////////////////////////////////////////////////////////

var h = function () {
  function e (a, b) {
    this.x = a;
    this.y = b
  }

  e.prototype.Ka = function (a, b) {
    this.x = a;
    this.y = b
  };
  e.prototype.hc = function (a, b, c) {
    var d = b.y - a.y;
    this.x = a.x + (b.x - a.x) * c;
    this.y = a.y + d * c
  };
  e.prototype.ri = function (a, b, c, d, g) {
    var n;
    n = new e;
    n.hc(a, c, g);
    a = new e;
    a.hc(c, d, g);
    c = new e;
    c.hc(d, b, g);
    b = new e;
    b.hc(n, a, g);
    n = new e;
    n.hc(a, c, g);
    a = new e;
    a.hc(b, n, g);
    this.x = a.x;
    this.y = a.y
  };
  e.prototype.si = function (a, b, c, d, g) {
    var n = new e, f = .5, k = .25;
    do {
      n.ri(a, b, c, d, f);
      var m = n.x - g, f = 0 < m ? f - k : f + k, k = k / 2
    } while (.01 < Math.abs(m));
    this.x =
      n.x;
    this.y = n.y
  };
  return e
}(),
  y = function () {
  function e (a, b, c, d, g) {
    this.x = a;
    this.y = b;
    this.z = c;
    this.$b = d;
    this.$a = g
  }

  e.prototype.Ka = function (a, b, c, d, g) {
    this.x = a;
    this.y = b;
    this.z = c;
    this.$b = d;
    this.$a = g
  };
  e.prototype.toString = function () {
    return "(" + this.x + "," + this.y + "," + this.z + ") - (" + this.$b + "," + this.$a + ")"
  };
  e.prototype.pa = function (a) {
    var b = Math.sin(a);
    a = Math.cos(a);
    var c = this.y, d = this.z;
    this.y = a * c - b * d;
    this.z = b * c + a * d
  };
  e.prototype.Nj = function () {
    var a = this.y;
    this.y = -this.z;
    this.z = a
  };
  e.prototype.Mj = function () {
    var a =
      this.y;
    this.y = this.z;
    this.z = -a
  };
  e.prototype.wa = function (a) {
    var b = Math.sin(a);
    a = Math.cos(a);
    var c = this.x, d = this.z;
    this.x = a * c + b * d;
    this.z = -b * c + a * d
  };
  e.prototype.Oj = function () {
    var a = this.x;
    this.x = -this.z;
    this.z = a
  };
  e.prototype.Ra = function (a) {
    var b = Math.sin(a);
    a = Math.cos(a);
    var c = this.x, d = this.y;
    this.x = a * c - b * d;
    this.y = b * c + a * d
  };
  e.prototype.Hh = function () {
    var a = this.x;
    this.x = -this.y;
    this.y = a
  };
  e.prototype.Yf = function (a) {
    this.pa(a * Math.PI / 180)
  };
  e.prototype.Gh = function (a) {
    this.wa(a * Math.PI / 180)
  };
  e.prototype.Lj =
    function (a) {
      this.Ra(a * Math.PI / 180)
    };
  e.prototype.clone = function () {
    return new e(this.x, this.y, this.z, this.$b, this.$a)
  };
  e.prototype.length = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  };
  e.prototype.Me = function (a) {
    return this.x * a.x + this.y * a.y + this.z * a.z
  };
  e.prototype.Cg = function (a, b) {
    var c;
    c = Math.cos(b * Math.PI / 180);
    this.x = c * Math.sin(a * Math.PI / 180);
    this.y = Math.sin(b * Math.PI / 180);
    this.z = c * Math.cos(a * Math.PI / 180)
  };
  e.prototype.mi = function () {
    return 180 * Math.atan2(-this.x, -this.z) / Math.PI
  };
  e.prototype.ni = function () {
    return 180 * Math.asin(this.y / this.length()) / Math.PI
  };
  e.prototype.hc = function (a, b, c) {
    this.x = a.x * c + b.x * (1 - c);
    this.y = a.y * c + b.y * (1 - c);
    this.z = a.z * c + b.z * (1 - c);
    this.$b = a.$b * c + b.$b * (1 - c);
    this.$a = a.$a * c + b.$a * (1 - c)
  };
  return e
}();
function A () {
  var e;
  "undefined" != typeof Float32Array ? e = new Float32Array(16) : e = Array(16);
  return e
}
function D (e) {
  e[0] = 1;
  e[1] = 0;
  e[2] = 0;
  e[3] = 0;
  e[4] = 0;
  e[5] = 1;
  e[6] = 0;
  e[7] = 0;
  e[8] = 0;
  e[9] = 0;
  e[10] = 1;
  e[11] = 0;
  e[12] = 0;
  e[13] = 0;
  e[14] = 0;
  e[15] = 1
}
function F (e, a) {
  var b = a[0], c = a[1];
  a = a[2];
  e[12] = e[0] * b + e[4] * c + e[8] * a + e[12];
  e[13] = e[1] * b + e[5] * c + e[9] * a + e[13];
  e[14] = e[2] * b + e[6] * c + e[10] * a + e[14];
  e[15] = e[3] * b + e[7] * c + e[11] * a + e[15]
}
function K (e, a, b) {
  var c, d = b[0], g = b[1];
  b = b[2];
  var n = Math.sqrt(d * d + g * g + b * b);
  if (n) {
    1 != n && (n = 1 / n, d *= n, g *= n, b *= n);
    var f = Math.sin(a), k = Math.cos(a), m = 1 - k;
    a = e[0];
    var n = e[1], p = e[2], l = e[3], r = e[4], q = e[5], t = e[6], v = e[7], w = e[8], u = e[9], C = e[10], B = e[11], x = d * d * m + k, z = g * d * m + b * f, E = b * d * m - g * f, G = d * g * m - b * f, H = g * g * m + k, I = b * g * m + d * f, J = d * b * m + g * f, d = g * b * m - d * f, g = b * b * m + k;
    c ? e != c && (c[12] = e[12], c[13] = e[13], c[14] = e[14], c[15] = e[15]) : c = e;
    c[0] = a * x + r * z + w * E;
    c[1] = n * x + q * z + u * E;
    c[2] = p * x + t * z + C * E;
    c[3] = l * x + v * z + B * E;
    c[4] = a * G + r * H + w * I;
    c[5] = n * G + q * H + u *
      I;
    c[6] = p * G + t * H + C * I;
    c[7] = l * G + v * H + B * I;
    c[8] = a * J + r * d + w * g;
    c[9] = n * J + q * d + u * g;
    c[10] = p * J + t * d + C * g;
    c[11] = l * J + v * d + B * g
  }
}
function L (e, a, b) {
  e = .1 * Math.tan(e * Math.PI / 360);
  a = e * a;
  var c = -a, d = -e;
  b || (b = A());
  var g = a - c, n = e - d;
  b[0] = .2 / g;
  b[1] = 0;
  b[2] = 0;
  b[3] = 0;
  b[4] = 0;
  b[5] = .2 / n;
  b[6] = 0;
  b[7] = 0;
  b[8] = (a + c) / g;
  b[9] = (e + d) / n;
  b[10] = -100.1 / 99.9;
  b[11] = -1;
  b[12] = 0;
  b[13] = 0;
  b[14] = -20 / 99.9;
  b[15] = 0
}
function M (e, a) {
  this.m = e;
  this.ma = a;
  var b, c, d = this.__div = document.createElement("div");
  b = document.createElement("img");
  b.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5xJREFUeNqclmlIVFEUx997TjrplFQW2WKBBSYtRFlpWUILSSsRZRQIBdGHCFqIoKIvQRsUFRJC9LEgaSFbMMpcWi1pLzOLsjItKms0U5t5/c/wH7nc5o2jF374xrv87z33nHOPaRsRtbFgDpgJxoD+wATfwDNQDK6CyrCr5OcbhgiGIRsUAZt4QTWoIFXgp9JfAhY7rgdBl8NeBoLDYBloA+dBOagFTcDHcVEgDgwBGWA+OAcugvXgvb5wKMGJoAAMp9BpUA96EBf/Btsf8BI8AWfAErAcpHHDZeriliY2AVwDg8AucAQ0Ag+I4XhTm2Oxz8PT46KMbTx5EZjuJDgAnAVusJUm9DhYwalFcc59sIXXIaceFkowDySBPTRPL20xm+b7zYXa+N3CPrWJ6GuwGySA40HLBHc/GywFhbS5R1lEBrZy7FQwiSaX9pmnqeAYt+KUcew7BVZw/QKTq0ocpYPVvDOXItZCk2xgDIZqL8BR8Ab0VDbr4yZOgLeIwzQx6WiQxcCt1+6sld66L4yYtFSwF4yg2dU7/cEwGW9YVkAwmycp1dzdpvgm0DcCh4kHmxWzBls0uBX4qqmZJ4KzePm1IeJLgjmlC16aDKZpp5Q168B3o6wsSwTHgU+MIUs74RSj6y1d+212HKimJlUE+tFRfJpYtOKNXWmJTASqWf2Bu/R6+4TKHOrOzG4IhptjWgHbGkZvepQ6SQK7oRuCXzjX1DJavBEX1ygfT8FgBqpfm1zRDcEKbR2bsZlkJCdXieB1ZhZ5YtqVgXIPN+m9kbY6hpdb+d9fPncJRmZmqQheZkemJmgxyxykl3XWJEkcAl7N21s7PDcl5ZJ0PAa3wVwmWtVbZafPwQ7wLozYB7ATPNJO56d/LAikP9u+66KNJS1d4IOZp7wU0hfLukUyzgwm70T2N/DOxIy/eFdqawa5DL2NEGwP5k15Ja4woz9glvcomd9NzyvkFcQo5gomaLfm5c0svnKZ2k7q7+FauvR2MJKZR3+sY5WgtvkdG6JyELGhNHMTXyGfLviRJ5Tcd4Dlhle7086Sgp8CqVxDkn4OqHaqacr5ekjy3Q/W0FRNNGmoMtamdzdxsytZC0lqXKhEgWPVVgImg2NgFT1MHOoOk3yLEtgWN5TEOYvoIFI1rGM19//2wpAD7imF7lfwENwAxaASNCj90pcLLKdC2Iyw1M9gnEplMEp5kOU1f8WwKGJm8oUr9f8JMAAVMDM6HSDa9QAAAABJRU5ErkJggg%3D%3D");
  b.setAttribute("style",
    "position: absolute;top: -14px;left: -14px; " + e.ua + "user-select: none;");
  b.ondragstart = function () {
    return !1
  };
  d.appendChild(b);
  b = "position:absolute;" + (e.ua + "user-select: none;");
  b += e.ua + "touch-callout: none;";
  b += e.ua + "tap-highlight-color: rgba(0,0,0,0);";
  e.Ic && !e.ka && (b += e.ua + "transform: translateZ(9999999px);");
  d.setAttribute("style", b);
  d.onclick = function () {
    e.gd(a);
    e.Qf(a.url, a.target)
  };
  var g = e.v.fg;
  g.enabled && (c = document.createElement("div"), b = "position:absolute;top:\t 20px;", b = g.jf ? b + "white-space: pre-wrap;" :
    b + "white-space: nowrap;", b += e.ua + "transform-origin: 50% 50%;", c.setAttribute("style", b + "visibility: hidden;overflow: hidden;padding: 0px 1px 0px 1px;"), c.style.color = this.m.X(g.gg, g.eg), g.background ? c.style.backgroundColor = this.m.X(g.mb, g.Mb) : c.style.backgroundColor = "transparent", c.style.border = "solid " + this.m.X(g.ob, g.Nb) + " " + g.nf + "px", c.style.borderRadius = g.mf + "px", c.style.textAlign = "center", 0 < g.width ? (c.style.left = -g.width / 2 + "px", c.style.width = g.width + "px") : c.style.width = "auto", c.style.height =
    0 < g.height ? g.height + "px" : "auto", c.style.overflow = "hidden", c.innerHTML = a.title, d.onmouseover = function () {
    0 == g.width && (c.style.left = -c.offsetWidth / 2 + "px");
    c.style.visibility = "inherit"
  }, d.onmouseout = function () {
    c.style.visibility = "hidden"
  }, d.appendChild(c))
}
var N = function () {
  function e (a) {
    this.m = a;
    this.enable = !1;
    this.ng = 1;
    this.ie = 0;
    this.type = "crossdissolve";
    this.Kb = this.Ba = this.Zb = 0;
    this.kf = 5;
    this.ge = 1;
    this.lf = !1;
    this.We = this.Ve = this.dg = 0;
    this.jd = 70;
    this.hi = 0;
    this.Na = this.gi = 1;
    this.fe = this.ee = .5;
    this.sd = this.th = this.gh = !1;
    this.wf = 1
  }

  e.prototype.Jd = function () {
    var a = this.m.a, b = a.createShader(a.VERTEX_SHADER);
    a.shaderSource(b, "attribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nvarying vec2 vTextureCoord;\nuniform bool uZoomIn;\nuniform float uZoomFactor;\nuniform vec2 uZoomCenter;\nvoid main(void) {\n\t gl_Position = vec4(aVertexPosition, 1.0);\n\t if(!uZoomIn) {\n\t \n\t   vTextureCoord = aTextureCoord;\n\t }\n\t else {\n\t   vTextureCoord = (aTextureCoord - vec2(0.5, 0.5)) * (1.0/uZoomFactor) + uZoomCenter;\n\t }\n}\n");
    a.compileShader(b);
    a.getShaderParameter(b, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(b)), b = null);
    var c = a.createShader(a.FRAGMENT_SHADER);
    a.shaderSource(c, "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec2 vTextureCoord;\nuniform float uAlpha;\nuniform sampler2D uSampler;\nvoid main(void) {\n vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n gl_FragColor = vec4(textureColor.x, textureColor.y, textureColor.z, uAlpha);\n}\n");
    a.compileShader(c);
    a.getShaderParameter(c, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(c)), c = null);
    this.ga = a.createProgram();
    a.attachShader(this.ga, b);
    a.attachShader(this.ga, c);
    a.linkProgram(this.ga);
    a.getProgramParameter(this.ga, a.LINK_STATUS) || alert("Could not initialise shaders");
    this.ga.ca = a.getAttribLocation(this.ga, "aVertexPosition");
    a.enableVertexAttribArray(this.ga.ca);
    this.ga.Ga = a.getAttribLocation(this.ga, "aTextureCoord");
    a.enableVertexAttribArray(this.ga.Ga);
    c = a.createShader(a.FRAGMENT_SHADER);
    a.shaderSource(c, "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec2 vTextureCoord;\nuniform float uColorPercent;\nuniform float uAlpha;\nuniform vec3 uDipColor;\nuniform sampler2D uSampler;\nvoid main(void) {\n vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n gl_FragColor = vec4(textureColor.x * (1.0 - uColorPercent) + uDipColor.x * uColorPercent, textureColor.y * (1.0 - uColorPercent) + uDipColor.y * uColorPercent, textureColor.z * (1.0 - uColorPercent) + uDipColor.z * uColorPercent, uAlpha);\n}\n");
    a.compileShader(c);
    a.getShaderParameter(c, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(c)), c = null);
    this.ya = a.createProgram();
    a.attachShader(this.ya, b);
    a.attachShader(this.ya, c);
    a.linkProgram(this.ya);
    a.getProgramParameter(this.ya, a.LINK_STATUS) || alert("Could not initialise shaders");
    this.ya.ca = a.getAttribLocation(this.ya, "aVertexPosition");
    a.enableVertexAttribArray(this.ya.ca);
    this.ya.Ga = a.getAttribLocation(this.ya, "aTextureCoord");
    a.enableVertexAttribArray(this.ya.Ga);
    c = a.createShader(a.FRAGMENT_SHADER);
    a.shaderSource(c, "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec2 vTextureCoord;\nuniform bool uRound;\nuniform float uRadius;\nuniform vec2 uRectDim;\nuniform vec2 uIrisCenter;\nuniform float uSoftEdge;\nuniform sampler2D uSampler;\nvoid main(void) {\n float alpha = 0.0;\n vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n if (uRound) {\n\t  vec2 diff = uIrisCenter - gl_FragCoord.xy;\n\t   float distFromCenter = sqrt( (diff.x * diff.x) + (diff.y * diff.y) );\n\t   if (distFromCenter > uRadius) {\n      alpha = 1.0;\n    } else {\n      alpha = 1.0 - ((uRadius - distFromCenter) / uSoftEdge);\n    };\n }\n else {\n    float alphaFromLeft = 1.0 - ((gl_FragCoord.x -(uIrisCenter.x - uRectDim.x)) / uSoftEdge);\n    float alphaFromRight = 1.0 - (((uIrisCenter.x + uRectDim.x) - gl_FragCoord.x) / uSoftEdge);\n    float alphaFromTop = 1.0 - ((gl_FragCoord.y -(uIrisCenter.y - uRectDim.y)) / uSoftEdge);\n    float alphaFromBottom = 1.0 - (((uIrisCenter.y + uRectDim.y) - gl_FragCoord.y) / uSoftEdge);\n    alpha = max(max(alphaFromLeft, alphaFromRight), max(alphaFromTop, alphaFromBottom));\n }\n gl_FragColor = vec4(textureColor.x, textureColor.y, textureColor.z, alpha);\n}\n");
    a.compileShader(c);
    a.getShaderParameter(c, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(c)), c = null);
    this.qa = a.createProgram();
    a.attachShader(this.qa, b);
    a.attachShader(this.qa, c);
    a.linkProgram(this.qa);
    a.getProgramParameter(this.qa, a.LINK_STATUS) || alert("Could not initialise shaders");
    this.qa.ca = a.getAttribLocation(this.qa, "aVertexPosition");
    a.enableVertexAttribArray(this.qa.ca);
    this.qa.Ga = a.getAttribLocation(this.qa, "aTextureCoord");
    a.enableVertexAttribArray(this.qa.Ga);
    c = a.createShader(a.FRAGMENT_SHADER);
    a.shaderSource(c, "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec2 vTextureCoord;\nuniform float uPercent;\nuniform int uDirection;\nuniform vec2 uCanvasDimensions;\nuniform float uSoftEdge;\nuniform sampler2D uSampler;\nvoid main(void) {\n vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n float alpha = 0.0;\n if (uDirection == 1) {\n\t if (gl_FragCoord.x > uPercent) {\n    alpha = 1.0; \n  } else {\n    alpha = 1.0 - ((uPercent - gl_FragCoord.x) / uSoftEdge);\n  }\n }\n if (uDirection == 2) {\n\t if (gl_FragCoord.x < uCanvasDimensions.x - uPercent) {\n    alpha = 1.0; \n  } else {\n    alpha = 1.0 - ((gl_FragCoord.x - (uCanvasDimensions.x - uPercent)) / uSoftEdge);\n  }\n }\n if (uDirection == 3) {\n\t if (gl_FragCoord.y < uCanvasDimensions.y - uPercent) {\n    alpha = 1.0; \n  } else {\n    alpha = 1.0 - ((gl_FragCoord.y - (uCanvasDimensions.y - uPercent)) / uSoftEdge);\n  }\n }\n if (uDirection == 4) {\n\t if (gl_FragCoord.y > uPercent) {\n    alpha = 1.0; \n  } else {\n    alpha = 1.0 - ((uPercent - gl_FragCoord.y) / uSoftEdge);\n  }\n }\n gl_FragColor = vec4(textureColor.x, textureColor.y, textureColor.z, alpha);\n}\n");
    a.compileShader(c);
    a.getShaderParameter(c, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(c)), c = null);
    this.ta = a.createProgram();
    a.attachShader(this.ta, b);
    a.attachShader(this.ta, c);
    a.linkProgram(this.ta);
    a.getProgramParameter(this.ta, a.LINK_STATUS) || alert("Could not initialise shaders");
    this.ta.ca = a.getAttribLocation(this.ta, "aVertexPosition");
    a.enableVertexAttribArray(this.ta.ca);
    this.ta.Ga = a.getAttribLocation(this.ta, "aTextureCoord");
    a.enableVertexAttribArray(this.ta.Ga)
  };
  e.prototype.xc = function () {
    var a =
      this.m.a;
    if (!a)return !1;
    if (this.kb = a.createFramebuffer()) {
      a.bindFramebuffer(a.FRAMEBUFFER, this.kb);
      this.kb.width = 1024;
      this.kb.height = 1024;
      this.Qc = a.createTexture();
      a.bindTexture(a.TEXTURE_2D, this.Qc);
      a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR);
      a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR);
      a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, this.kb.width, this.kb.height, 0, a.RGBA, a.UNSIGNED_BYTE, null);
      var b = a.createRenderbuffer();
      a.bindRenderbuffer(a.RENDERBUFFER, b);
      a.renderbufferStorage(a.RENDERBUFFER,
        a.DEPTH_COMPONENT16, this.kb.width, this.kb.height);
      a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, this.Qc, 0);
      a.framebufferRenderbuffer(a.FRAMEBUFFER, a.DEPTH_ATTACHMENT, a.RENDERBUFFER, b);
      a.bindTexture(a.TEXTURE_2D, null);
      a.bindRenderbuffer(a.RENDERBUFFER, null);
      a.bindFramebuffer(a.FRAMEBUFFER, null);
      return !0
    }
    return !1
  };
  e.prototype.wh = function (a) {
    var b = this.m.a, c = this.m.Ta;
    if (this.Ec) {
      b.useProgram(this.ga);
      b.bindBuffer(b.ARRAY_BUFFER, this.m.Fa);
      b.vertexAttribPointer(this.ga.ca, this.m.Fa.Qb,
        b.FLOAT, !1, 0, 0);
      b.bindBuffer(b.ARRAY_BUFFER, this.m.ed);
      b.vertexAttribPointer(this.ga.Ga, 2, b.FLOAT, !1, 0, 0);
      b.activeTexture(b.TEXTURE0);
      b.bindTexture(b.TEXTURE_2D, this.Qc);
      var c = 1 + (this.Na - 1) * a, d = b.getUniformLocation(this.ga, "uAlpha");
      b.uniform1f(d, 1);
      d = b.getUniformLocation(this.ga, "uZoomIn");
      b.uniform1i(d, 1);
      var d = b.getUniformLocation(this.ga, "uZoomCenter"), g = .5 + (this.ee - .5) * Math.sqrt(a), e = .5 + (this.fe - .5) * Math.sqrt(a);
      0 > g - .5 / c && (g = .5 / c);
      0 > e - .5 / c && (e = .5 / c);
      1 < g + .5 / c && (g = 1 - .5 / c);
      1 < e + .5 / c && (e = 1 - .5 / c);
      b.uniform2f(d, g, e);
      g = b.getUniformLocation(this.ga, "uZoomFactor");
      b.uniform1f(g, c);
      b.uniform1i(b.getUniformLocation(this.ga, "uSampler"), 0);
      b.drawArrays(b.TRIANGLE_STRIP, 0, this.m.Fa.Ac);
      b.useProgram(this.m.F)
    } else {
      this.m.$d();
      b.blendFuncSeparate(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA, b.SRC_ALPHA, b.ONE);
      b.enable(b.BLEND);
      b.disable(b.DEPTH_TEST);
      g = .5 + (this.ee - .5);
      e = .5 + (this.fe - .5);
      0 > g - .5 / this.Na && (g = .5 / this.Na);
      0 > e - .5 / this.Na && (e = .5 / this.Na);
      1 < g + .5 / this.Na && (g = 1 - .5 / this.Na);
      1 < e + .5 / this.Na && (e = 1 - .5 / this.Na);
      if ("crossdissolve" == this.type) b.useProgram(this.ga), b.bindBuffer(b.ARRAY_BUFFER, this.m.Fa), b.vertexAttribPointer(this.ga.ca, this.m.Fa.Qb, b.FLOAT, !1, 0, 0), b.bindBuffer(b.ARRAY_BUFFER, this.m.ed), b.vertexAttribPointer(this.ga.Ga, 2, b.FLOAT, !1, 0, 0), b.activeTexture(b.TEXTURE0), b.bindTexture(b.TEXTURE_2D, this.Qc), d = b.getUniformLocation(this.ga, "uAlpha"), b.uniform1f(d, 1 - a), d = b.getUniformLocation(this.ga, "uZoomIn"), b.uniform1i(d, 1 == this.Ba || 2 == this.Ba ? 1 : 0), d = b.getUniformLocation(this.ga, "uZoomCenter"), b.uniform2f(d,
        g, e), g = b.getUniformLocation(this.ga, "uZoomFactor"), b.uniform1f(g, this.Na), b.uniform1i(b.getUniformLocation(this.ga, "uSampler"), 0); else if ("diptocolor" == this.type) b.useProgram(this.ya), b.bindBuffer(b.ARRAY_BUFFER, this.m.Fa), b.vertexAttribPointer(this.ya.ca, this.m.Fa.Qb, b.FLOAT, !1, 0, 0), b.bindBuffer(b.ARRAY_BUFFER, this.m.ed), b.vertexAttribPointer(this.ya.Ga, 2, b.FLOAT, !1, 0, 0), b.activeTexture(b.TEXTURE0), b.bindTexture(b.TEXTURE_2D, this.Qc), b.uniform1f(b.getUniformLocation(this.ya, "uColorPercent"), Math.min(2 *
        a, 1)), d = b.getUniformLocation(this.ya, "uAlpha"), b.uniform1f(d, 1 - Math.max(2 * (a - .5), 0)), b.uniform3f(b.getUniformLocation(this.ya, "uDipColor"), (this.ie >> 16 & 255) / 255, (this.ie >> 8 & 255) / 255, (this.ie & 255) / 255), d = b.getUniformLocation(this.ya, "uZoomIn"), b.uniform1i(d, 1 == this.Ba || 2 == this.Ba ? 1 : 0), d = b.getUniformLocation(this.ya, "uZoomCenter"), b.uniform2f(d, g, e), g = b.getUniformLocation(this.ya, "uZoomFactor"), b.uniform1f(g, this.Na), b.uniform1i(b.getUniformLocation(this.ya, "uSampler"), 0); else if ("irisround" == this.type ||
        "irisrectangular" == this.type) {
        b.useProgram(this.qa);
        b.bindBuffer(b.ARRAY_BUFFER, this.m.Fa);
        b.vertexAttribPointer(this.qa.ca, this.m.Fa.Qb, b.FLOAT, !1, 0, 0);
        b.bindBuffer(b.ARRAY_BUFFER, this.m.ed);
        b.vertexAttribPointer(this.qa.Ga, 2, b.FLOAT, !1, 0, 0);
        b.activeTexture(b.TEXTURE0);
        b.bindTexture(b.TEXTURE_2D, this.Qc);
        var f;
        1 == this.Ba || 2 == this.Ba ? f = d = .5 : (d = this.ee, f = this.fe);
        var k = d * c.width, m = f * c.height, k = Math.max(k, c.width - k), m = Math.max(m, c.height - m);
        "irisround" == this.type ? b.uniform1f(b.getUniformLocation(this.qa,
            "uRadius"), (Math.sqrt(k * k + m * m) + this.Zb) * a) : (k > m ? (m = c.height / c.width * k + this.Zb, k += this.Zb) : (k = c.width / c.height * m + this.Zb, m += this.Zb), b.uniform2f(b.getUniformLocation(this.qa, "uRectDim"), k * a, m * a));
        a = b.getUniformLocation(this.qa, "uSoftEdge");
        b.uniform1f(a, this.Zb);
        b.uniform1i(b.getUniformLocation(this.qa, "uRound"), "irisround" == this.type ? 1 : 0);
        b.uniform2f(b.getUniformLocation(this.qa, "uIrisCenter"), d * c.width, f * c.height);
        d = b.getUniformLocation(this.qa, "uZoomIn");
        b.uniform1i(d, 1 == this.Ba || 2 == this.Ba ? 1 : 0);
        d = b.getUniformLocation(this.qa, "uZoomCenter");
        b.uniform2f(d, g, e);
        g = b.getUniformLocation(this.qa, "uZoomFactor");
        b.uniform1f(g, this.Na);
        b.uniform1i(b.getUniformLocation(this.qa, "uSampler"), 0)
      } else if ("wipeleftright" == this.type || "wiperightleft" == this.type || "wipetopbottom" == this.type || "wipebottomtop" == this.type || "wiperandom" == this.type) b.useProgram(this.ta), b.bindBuffer(b.ARRAY_BUFFER, this.m.Fa), b.vertexAttribPointer(this.ta.ca, this.m.Fa.Qb, b.FLOAT, !1, 0, 0), b.bindBuffer(b.ARRAY_BUFFER, this.m.ed), b.vertexAttribPointer(this.ta.Ga,
        2, b.FLOAT, !1, 0, 0), b.activeTexture(b.TEXTURE0), b.bindTexture(b.TEXTURE_2D, this.Qc), b.uniform1f(b.getUniformLocation(this.ta, "uPercent"), 3 > this.wf ? a * (c.width + this.Zb) : a * (c.height + this.Zb)), a = b.getUniformLocation(this.ta, "uSoftEdge"), b.uniform1f(a, this.Zb), b.uniform1i(b.getUniformLocation(this.ta, "uDirection"), this.wf), b.uniform2f(b.getUniformLocation(this.ta, "uCanvasDimensions"), c.width, c.height), d = b.getUniformLocation(this.ta, "uZoomIn"), b.uniform1i(d, 1 == this.Ba || 2 == this.Ba ? 1 : 0), d = b.getUniformLocation(this.ta,
        "uZoomCenter"), b.uniform2f(d, g, e), g = b.getUniformLocation(this.ta, "uZoomFactor"), b.uniform1f(g, this.Na), b.uniform1i(b.getUniformLocation(this.ta, "uSampler"), 0);
      b.drawArrays(b.TRIANGLE_STRIP, 0, this.m.Fa.Ac);
      b.useProgram(this.m.F);
      b.disable(b.BLEND);
      b.enable(b.DEPTH_TEST)
    }
  };
  return e
}(),
  O = function () {
  function e (a) {
    this.Zd = [];
    this.m = a;
    this.enable = !1;
    this.pc = 2;
    this.tg = !1
  }

  e.prototype.Af = function (a) {
    if (2 == a.mode || 3 == a.mode || 5 == a.mode) {
      var b = this.m.lb.currentTime, c = a.zb.gain.value, d = a.xb.gain.value, g = a.yb.gain.value;
      a.wb.gain.linearRampToValueAtTime(a.wb.gain.value, b);
      a.wb.gain.linearRampToValueAtTime(0, b + this.pc);
      a.zb.gain.linearRampToValueAtTime(c, b);
      a.zb.gain.linearRampToValueAtTime(0, b + this.pc);
      a.xb.gain.linearRampToValueAtTime(d, b);
      a.xb.gain.linearRampToValueAtTime(0, b + this.pc);
      a.yb.gain.linearRampToValueAtTime(g, b);
      a.yb.gain.linearRampToValueAtTime(0, b + this.pc)
    } else b = this.m.lb.currentTime, a.fc.gain.linearRampToValueAtTime(a.fc.gain.value, b), a.fc.gain.linearRampToValueAtTime(0, b + this.pc);
    a.Bf = !0;
    setTimeout(function () {
        a.Nc()
      },
      1E3 * this.pc + 5)
  };
  e.prototype.ik = function () {
    for (var a = 0; a < this.m.R.length; a++) {
      var b = this.m.R[a];
      this.m.zc(b.id) || 4 == b.mode || 6 == b.mode || (b.c.play(), b.c.currentTime = 0)
    }
  };
  e.prototype.Di = function () {
    for (var a = (this.m.lb.currentTime - this.fk) / this.pc, a = Math.min(1, a), b = 0; b < this.m.R.length; b++) {
      var c = this.m.R[b];
      this.m.zc(c.id) && 1 > c.aa && (c.aa = a)
    }
    1 == a && clearInterval(this.ek)
  };
  return e
}(), P = function () {
  function e (a) {
    this.Pd = [];
    this.ac = null;
    this.ib = [];
    this.cb = [];
    this.jb = [];
    this.m = a;
    this.zi()
  }

  e.prototype.Jd = function () {
    var a =
      this.m.a, b = a.createShader(a.VERTEX_SHADER);
    a.shaderSource(b, "attribute vec3 aVertexPosition;\nvoid main(void) {\n gl_Position = vec4(aVertexPosition, 1.0);\n}\n");
    a.compileShader(b);
    a.getShaderParameter(b, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(b)), b = null);
    var c = a.createShader(a.FRAGMENT_SHADER);
    a.shaderSource(c, "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec4 vColor;\nuniform vec2 uCanvasDimensions;\nuniform vec2 uFlareCenterPosition;\nuniform float uBlindingValue;\nuniform float uAspectRatio;\nvoid main(void) {\n float canvasDiag = sqrt( (uCanvasDimensions.x * uCanvasDimensions.x) + (uCanvasDimensions.y * uCanvasDimensions.y) );\n vec2 diff = uFlareCenterPosition - gl_FragCoord.xy;\n diff.y = diff.y * uAspectRatio;\n float distFromFlarePoint = sqrt( (diff.x * diff.x) + (diff.y * diff.y) );\n float factor = (distFromFlarePoint / canvasDiag) / 10.0;\n gl_FragColor = vec4(1.0, 1.0, 1.0, pow(((1.0 - factor) * 0.8) * uBlindingValue, 2.0));\n}\n");
    a.compileShader(c);
    a.getShaderParameter(c, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(c)), c = null);
    this.nb = a.createProgram();
    a.attachShader(this.nb, b);
    a.attachShader(this.nb, c);
    a.linkProgram(this.nb);
    a.getProgramParameter(this.nb, a.LINK_STATUS) || alert("Could not initialise shaders");
    this.nb.ca = a.getAttribLocation(this.nb, "aVertexPosition");
    a.enableVertexAttribArray(this.nb.ca);
    c = a.createShader(a.VERTEX_SHADER);
    b = a.createShader(a.VERTEX_SHADER);
    a.shaderSource(c, "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nattribute vec3 aVertexPosition;\nvarying vec4 vColor;\nuniform vec2 uCirclePosition;\nuniform float uCircleRadius;\nuniform vec2 uCanvasDimensions2;\nuniform float uAspectRatio;\nvoid main(void) {\n vec2 circleOnScreen = aVertexPosition.xy * uCircleRadius + uCirclePosition;\n circleOnScreen.y = circleOnScreen.y / uAspectRatio;\n vec2 circleNorm = (circleOnScreen / uCanvasDimensions2) * 2.0 - vec2(1.0, 1.0);\n gl_Position = vec4(circleNorm.x, circleNorm.y, 0.0, 1.0);\n}\n");
    a.compileShader(c);
    a.getShaderParameter(c, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(c)), c = null);
    a.shaderSource(b, "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nattribute vec3 aVertexPosition;\nvarying vec4 vColor;\nuniform vec2 uCirclePosition;\nuniform float uCircleRadius;\nuniform vec2 uCanvasDimensions2;\nuniform float uAspectRatio;\nvoid main(void) {\n vec2 circleOnScreen = aVertexPosition.xy * uCircleRadius + uCirclePosition;\n circleOnScreen.y = circleOnScreen.y / uAspectRatio;\n vec2 circleNorm = (circleOnScreen / uCanvasDimensions2) * 2.0 - vec2(1.0, 1.0);\n gl_Position = vec4(circleNorm.x, circleNorm.y, 0.0, 1.0);\n}\n");
    a.compileShader(b);
    a.getShaderParameter(b, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(b)), c = null);
    var d = a.createShader(a.FRAGMENT_SHADER);
    a.shaderSource(d, "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec4 vColor;\nuniform vec2 uCircleTexturePosition;\nuniform vec3 uCircleColor;\nuniform float uCircleRadius;\nuniform float uCircleAlpha;\nuniform float uCircleSoftness;\nuniform float uAspectRatio;\nvoid main(void) {\n vec2 diff = uCircleTexturePosition - gl_FragCoord.xy;\n diff.y = diff.y * uAspectRatio;\n float distFromCircleCenter = sqrt( (diff.x * diff.x) + (diff.y * diff.y) );\n float softnessDistance = uCircleRadius * (1.0 - uCircleSoftness);\n if (distFromCircleCenter > uCircleRadius)\n {\n\t  gl_FragColor = vec4(uCircleColor, 0.0);\n }\n else if (distFromCircleCenter <= (softnessDistance))\n {\n\t  float factor = distFromCircleCenter / softnessDistance;\n\t  gl_FragColor = vec4(uCircleColor, pow((1.0 - (0.2 * factor)) * uCircleAlpha, 1.8));\n }\n else\n {\n\t  float factor = (distFromCircleCenter - softnessDistance) / (uCircleRadius - softnessDistance);\n\t  gl_FragColor = vec4(uCircleColor, pow((0.8 - (0.8 * factor)) * uCircleAlpha, 1.8));\n }\n}\n");
    a.compileShader(d);
    a.getShaderParameter(d, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(d)), d = null);
    this.fa = a.createProgram();
    a.attachShader(this.fa, c);
    a.attachShader(this.fa, d);
    a.linkProgram(this.fa);
    a.getProgramParameter(this.fa, a.LINK_STATUS) || alert("Could not initialise shaders");
    this.fa.ca = a.getAttribLocation(this.fa, "aVertexPosition");
    a.enableVertexAttribArray(this.fa.ca);
    c = a.createShader(a.FRAGMENT_SHADER);
    a.shaderSource(c, "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec4 vColor;\nuniform vec2 uRingTexturePosition;\nuniform float uRingRadius;\nuniform float uRingAlpha;\nuniform float uAspectRatio;\nuniform sampler2D uSampler;\nvoid main(void) {\n vec2 diff = uRingTexturePosition - gl_FragCoord.xy;\n diff.y = diff.y * uAspectRatio;\n float distFromRingCenter = sqrt( (diff.x * diff.x) + (diff.y * diff.y) );\n float factor = distFromRingCenter / uRingRadius;\n if (distFromRingCenter > uRingRadius)\n {\n\t gl_FragColor = vec4(1.0, 1.0, 1.0, 0.0);\n }\n else\n {\n vec4 textureColor = texture2D(uSampler, vec2(factor / uAspectRatio, 0.5));\n gl_FragColor = vec4(textureColor.x, textureColor.y, textureColor.z, uRingAlpha);\n }\n}\n");
    a.compileShader(c);
    a.getShaderParameter(c, a.COMPILE_STATUS) || (alert(a.getShaderInfoLog(c)), c = null);
    this.La = a.createProgram();
    a.attachShader(this.La, b);
    a.attachShader(this.La, c);
    a.linkProgram(this.La);
    a.getProgramParameter(this.La, a.LINK_STATUS) || alert("Could not initialise shaders");
    this.La.ca = a.getAttribLocation(this.La, "aVertexPosition")
  };
  e.prototype.xc = function () {
    var a = this.m.a;
    this.ec = a.createBuffer();
    a.bindBuffer(a.ARRAY_BUFFER, this.ec);
    a.bufferData(a.ARRAY_BUFFER, new Float32Array([-1, -1, 0, 1,
      -1, 0, 1, 1, 0, -1, 1, 0]), a.STATIC_DRAW);
    this.ec.Qb = 3;
    this.ec.Ac = 4;
    this.Xc = a.createBuffer();
    a.bindBuffer(a.ARRAY_BUFFER, this.Xc);
    for (var b = [0, 0, 0], c = 2 * Math.PI / 6, d = Math.PI / 180 * 35, g = 1, e = d; e <= d + 2 * Math.PI; e += c)b.push(Math.sin(e)), b.push(-Math.cos(e)), b.push(0), g++;
    a.bufferData(a.ARRAY_BUFFER, new Float32Array(b), a.STATIC_DRAW);
    this.Xc.Qb = 3;
    this.Xc.Ac = g;
    this.Fh = a.createTexture();
    a.bindTexture(a.TEXTURE_2D, this.Fh);
    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR);
    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER,
      a.LINEAR);
    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE);
    a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE);
    b = document.createElement("canvas");
    b.width = 100;
    b.height = 1;
    c = b.getContext("2d");
    c.width = 100;
    c.height = 1;
    d = c.createLinearGradient(0, 0, 100, 0);
    d.addColorStop(0, this.m.X(16777215, 0));
    d.addColorStop(.88, this.m.X(0, 0));
    d.addColorStop(.9, this.m.X(16654848, 1));
    d.addColorStop(.92, this.m.X(16776448, 1));
    d.addColorStop(.94, this.m.X(4849466, 1));
    d.addColorStop(.96, this.m.X(131071,
      1));
    d.addColorStop(.98, this.m.X(8190, 1));
    d.addColorStop(1, this.m.X(0, 0));
    c.fillStyle = d;
    c.fillRect(0, 0, 100, 1);
    a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, b)
  };
  e.prototype.Jj = function () {
    for (; 0 < this.Pd.length;)this.Pd.pop()
  };
  e.prototype.zi = function () {
    var a = [], b = [], c = [], d = {i: 14, alpha: .2, color: 11390415, h: .27};
    a.push(d);
    d = {i: 20, alpha: .25, color: 11390415, h: .4};
    a.push(d);
    d = {i: 10, alpha: .2, color: 12442332, h: .6};
    a.push(d);
    d = {i: 15, alpha: .2, color: 11390415, h: .8};
    a.push(d);
    d = {
      i: 10, alpha: .2, color: 12442332,
      h: 1.5
    };
    a.push(d);
    d = {i: 15, alpha: .2, color: 11390415, h: 1.8};
    a.push(d);
    d = {i: 8, alpha: .2, color: 12575203, s: .8, h: .7};
    b.push(d);
    d = {i: 7, alpha: .4, color: 12575203, s: .5, h: 1.6};
    b.push(d);
    d = {i: 5, alpha: .4, color: 12575203, s: .6, h: .9};
    b.push(d);
    d = {i: 8, alpha: .3, color: 12575203, s: .4, h: 1.1};
    b.push(d);
    this.ib.push(a);
    this.cb.push(b);
    this.jb.push(c);
    a = [];
    b = [];
    c = [];
    d = {i: 30, alpha: .3, color: 11390415, h: .5};
    a.push(d);
    d = {i: 10, alpha: .3, color: 11390415, h: 1};
    a.push(d);
    d = {i: 20, alpha: .3, color: 11390415, h: 1.3};
    a.push(d);
    d = {
      i: 10, alpha: .3, color: 11390415,
      h: 1.5
    };
    a.push(d);
    d = {i: 15, alpha: .3, color: 11390415, h: 1.8};
    a.push(d);
    d = {i: 10, alpha: .3, color: 15506856, s: .8, h: .7};
    b.push(d);
    d = {i: 20, alpha: .5, color: 15506856, s: .5, h: 1.6};
    b.push(d);
    d = {i: 5, alpha: .5, color: 15506856, s: .6, h: .9};
    b.push(d);
    d = {i: 60, alpha: .4, color: 15506856, s: .2, h: 1.1};
    b.push(d);
    c.push({i: 220, alpha: .035, h: 2});
    this.ib.push(a);
    this.cb.push(b);
    this.jb.push(c);
    a = [];
    b = [];
    c = [];
    d = {i: 30, alpha: .5, color: 15465727, h: .5};
    a.push(d);
    d = {i: 40, alpha: .28, color: 15726842, h: .8};
    a.push(d);
    d = {
      i: 25, alpha: .32, color: 15726842,
      h: 1.1
    };
    a.push(d);
    d = {i: 15, alpha: .25, color: 15726842, h: 1.35};
    a.push(d);
    d = {i: 10, alpha: .28, color: 15465727, h: 1.65};
    a.push(d);
    d = {i: 10, alpha: .45, color: 15465727, s: .8, h: .7};
    b.push(d);
    d = {i: 7, alpha: .5, color: 15465727, s: .4, h: .9};
    b.push(d);
    d = {i: 40, alpha: .4, color: 15465727, s: .3, h: .38};
    b.push(d);
    d = {i: 50, alpha: .4, color: 15465727, s: .5, h: 1.25};
    b.push(d);
    d = {i: 18, alpha: .2, color: 15465727, s: .5, h: 1.25};
    b.push(d);
    d = {i: 10, alpha: .34, color: 15726842, s: .8, h: 1.5};
    b.push(d);
    d = {i: 38, alpha: .37, color: 15465727, s: .3, h: -.5};
    b.push(d);
    this.ib.push(a);
    this.cb.push(b);
    this.jb.push(c);
    a = [];
    b = [];
    c = [];
    d = {i: 16, alpha: .5, color: 16363159, h: .1};
    a.push(d);
    d = {i: 26, alpha: .3, color: 16091819, h: .32};
    a.push(d);
    d = {i: 29, alpha: .2, color: 16091819, h: 1.32};
    a.push(d);
    d = {i: 20, alpha: .18, color: 16363159, h: 1.53};
    a.push(d);
    d = {i: 27, alpha: .13, color: 16425092, h: 1.6};
    a.push(d);
    d = {i: 20, alpha: .1, color: 16091819, h: 1.75};
    a.push(d);
    d = {i: 12, alpha: .45, color: 16312238, s: .45, h: .2};
    b.push(d);
    d = {i: 8, alpha: .25, color: 16434209, s: .7, h: .33};
    b.push(d);
    d = {i: 9, alpha: .25, color: 16091819, s: .4, h: .7};
    b.push(d);
    d = {i: 7, alpha: .2, color: 16091819, s: .4, h: .85};
    b.push(d);
    d = {i: 60, alpha: .23, color: 16091819, s: .55, h: 1.05};
    b.push(d);
    d = {i: 37, alpha: .1, color: 16091819, s: .55, h: 1.22};
    b.push(d);
    d = {i: 10, alpha: .25, color: 16363159, s: .65, h: 1.38};
    b.push(d);
    d = {i: 7, alpha: .2, color: 16434209, s: .5, h: 1.45};
    b.push(d);
    d = {i: 3, alpha: .2, color: 16416033, s: .5, h: 1.78};
    b.push(d);
    d = {i: 6, alpha: .18, color: 16434209, s: .45, h: 1.9};
    b.push(d);
    d = {i: 4, alpha: .14, color: 16766514, s: .45, h: 2.04};
    b.push(d);
    d = {i: 30, alpha: .14, color: 16766514, s: .8, h: .04};
    b.push(d);
    this.ib.push(a);
    this.cb.push(b);
    this.jb.push(c);
    a = [];
    b = [];
    c = [];
    d = {i: 9, alpha: .3, color: 14346999, s: .3, h: .3};
    b.push(d);
    d = {i: 5, alpha: .5, color: 14148072, s: .8, h: .6};
    b.push(d);
    d = {i: 3, alpha: .37, color: 14346999, s: .66, h: .8};
    b.push(d);
    d = {i: 45, alpha: .2, color: 14346999, s: .36, h: 1.2};
    b.push(d);
    d = {i: 13, alpha: .2, color: 14346999, s: .36, h: 1.23};
    b.push(d);
    d = {i: 11, alpha: .2, color: 14148072, s: .36, h: 1.28};
    b.push(d);
    d = {i: 27, alpha: .16, color: 14346999, s: .36, h: 1.55};
    b.push(d);
    d = {i: 6, alpha: .36, color: 14148072, s: .8, h: 1.7};
    b.push(d);
    this.ib.push(a);
    this.cb.push(b);
    this.jb.push(c);
    a = [];
    b = [];
    c = [];
    d = {i: 24, alpha: .2, color: 15186464, h: .2};
    a.push(d);
    d = {i: 7, alpha: .26, color: 15186464, h: .35};
    a.push(d);
    d = {i: 23, alpha: .18, color: 15186464, h: .65};
    a.push(d);
    d = {i: 13, alpha: .2, color: 15186464, h: .8};
    a.push(d);
    d = {i: 11, alpha: .15, color: 15186464, h: 1.4};
    a.push(d);
    d = {i: 15, alpha: .11, color: 15451904, h: 1.6};
    a.push(d);
    d = {i: 6, alpha: .45, color: 15579138, s: .45, h: .22};
    b.push(d);
    d = {i: 3, alpha: .3, color: 15451904, s: .25, h: .4};
    b.push(d);
    d = {i: 4, alpha: .2, color: 15451904, s: .25, h: .45};
    b.push(d);
    d = {
      i: 65, alpha: .17,
      color: 15186464, s: .25, h: .5
    };
    b.push(d);
    d = {i: 5, alpha: .45, color: 15579138, s: .45, h: .88};
    b.push(d);
    d = {i: 140, alpha: .18, color: 15579138, s: .32, h: .95};
    b.push(d);
    d = {i: 12, alpha: .22, color: 15579138, s: .32, h: 1.1};
    b.push(d);
    d = {i: 8, alpha: .32, color: 15451904, s: .72, h: 1.2};
    b.push(d);
    d = {i: 55, alpha: .2, color: 15451904, s: .45, h: 1.33};
    b.push(d);
    d = {i: 4, alpha: .3, color: 15451904, s: .25, h: 1.42};
    b.push(d);
    this.ib.push(a);
    this.cb.push(b);
    this.jb.push(c);
    a = [];
    b = [];
    c = [];
    d = {i: 16, alpha: .4, color: 10933495, h: .32};
    a.push(d);
    d = {
      i: 14, alpha: .3, color: 11007484,
      h: .36
    };
    a.push(d);
    d = {i: 10, alpha: .3, color: 4037331, h: .58};
    a.push(d);
    d = {i: 14, alpha: .22, color: 8835068, h: .68};
    a.push(d);
    d = {i: 10, alpha: .27, color: 11007484, h: .82};
    a.push(d);
    d = {i: 11, alpha: .27, color: 10867450, h: 1};
    a.push(d);
    d = {i: 9, alpha: .2, color: 6158332, h: 1.05};
    a.push(d);
    d = {i: 10, alpha: .17, color: 10867450, h: 1.78};
    a.push(d);
    d = {i: 10, alpha: .3, color: 4037331, h: -.23};
    a.push(d);
    d = {i: 8, alpha: .45, color: 8835068, s: .45, h: .175};
    b.push(d);
    d = {i: 7, alpha: .4, color: 12574715, s: .55, h: .46};
    b.push(d);
    d = {
      i: 3, alpha: .3, color: 10867450, s: .35,
      h: .5
    };
    b.push(d);
    d = {i: 60, alpha: .37, color: 4031699, s: .75, h: .75};
    b.push(d);
    d = {i: 3, alpha: .25, color: 4031699, s: .25, h: .75};
    b.push(d);
    d = {i: 3, alpha: .2, color: 6158332, s: .25, h: .9};
    b.push(d);
    d = {i: 7, alpha: .45, color: 8835068, s: .45, h: 1.3};
    b.push(d);
    d = {i: 32, alpha: .22, color: 8835068, s: .75, h: 1.62};
    b.push(d);
    d = {i: 9, alpha: .45, color: 4031699, s: .65, h: 1.6};
    b.push(d);
    d = {i: 8, alpha: .25, color: 4031699, s: .65, h: 1.83};
    b.push(d);
    d = {i: 7, alpha: .4, color: 12574715, s: .55, h: -.18};
    b.push(d);
    this.ib.push(a);
    this.cb.push(b);
    this.jb.push(c);
    a =
      [];
    b = [];
    c = [];
    d = {i: 16, alpha: .4, color: 16389120, h: .32};
    a.push(d);
    d = {i: 26, alpha: .22, color: 16389120, h: .4};
    a.push(d);
    d = {i: 26, alpha: .25, color: 16389120, h: .65};
    a.push(d);
    d = {i: 18, alpha: .3, color: 16389120, h: 1.23};
    a.push(d);
    d = {i: 14, alpha: .26, color: 16389120, h: 1.33};
    a.push(d);
    d = {i: 17, alpha: .18, color: 16389120, h: 1.7};
    a.push(d);
    d = {i: 30, alpha: .16, color: 16389120, h: 2.15};
    a.push(d);
    d = {i: 100, alpha: .25, color: 16389120, s: .22, h: 1.45};
    b.push(d);
    d = {i: 7, alpha: .5, color: 15628151, s: .3, h: 1.5};
    b.push(d);
    d = {
      i: 3, alpha: .5, color: 15628151,
      s: .3, h: 1.52
    };
    b.push(d);
    d = {i: 4, alpha: .5, color: 16389120, s: .3, h: 1.745};
    b.push(d);
    d = {i: 9, alpha: .22, color: 16389120, s: .3, h: 1.8};
    b.push(d);
    this.ib.push(a);
    this.cb.push(b);
    this.jb.push(c);
    a = [];
    b = [];
    c = [];
    d = {i: 16, alpha: .4, color: 10933495, h: .32};
    a.push(d);
    d = {i: 14, alpha: .3, color: 11007484, h: .36};
    a.push(d);
    d = {i: 10, alpha: .3, color: 4037331, h: .58};
    a.push(d);
    d = {i: 14, alpha: .22, color: 8835068, h: .68};
    a.push(d);
    d = {i: 10, alpha: .27, color: 11007484, h: .82};
    a.push(d);
    d = {i: 11, alpha: .27, color: 10867450, h: 1};
    a.push(d);
    d = {
      i: 9, alpha: .2,
      color: 6158332, h: 1.05
    };
    a.push(d);
    d = {i: 10, alpha: .17, color: 10867450, h: 1.78};
    a.push(d);
    d = {i: 10, alpha: .3, color: 4037331, h: -.23};
    a.push(d);
    d = {i: 8, alpha: .45, color: 8835068, s: .45, h: .175};
    b.push(d);
    d = {i: 7, alpha: .4, color: 12574715, s: .55, h: .46};
    b.push(d);
    d = {i: 3, alpha: .3, color: 10867450, s: .35, h: .5};
    b.push(d);
    d = {i: 60, alpha: .37, color: 4031699, s: .75, h: .75};
    b.push(d);
    d = {i: 3, alpha: .25, color: 4031699, s: .25, h: .75};
    b.push(d);
    d = {i: 3, alpha: .2, color: 6158332, s: .25, h: .9};
    b.push(d);
    d = {i: 7, alpha: .45, color: 8835068, s: .45, h: 1.3};
    b.push(d);
    d = {i: 32, alpha: .22, color: 8835068, s: .75, h: 1.62};
    b.push(d);
    d = {i: 9, alpha: .45, color: 4031699, s: .65, h: 1.6};
    b.push(d);
    d = {i: 8, alpha: .25, color: 4031699, s: .65, h: 1.83};
    b.push(d);
    d = {i: 7, alpha: .4, color: 12574715, s: .55, h: -.18};
    b.push(d);
    this.ib.push(a);
    this.cb.push(b);
    this.jb.push(c);
    a = [];
    b = [];
    c = [];
    d = {i: 16, alpha: .4, color: 16389120, h: .32};
    a.push(d);
    d = {i: 26, alpha: .22, color: 16389120, h: .4};
    a.push(d);
    d = {i: 26, alpha: .25, color: 16389120, h: .65};
    a.push(d);
    d = {i: 18, alpha: .3, color: 16389120, h: 1.23};
    a.push(d);
    d = {
      i: 14, alpha: .26, color: 16389120,
      h: 1.33
    };
    a.push(d);
    d = {i: 17, alpha: .18, color: 16389120, h: 1.7};
    a.push(d);
    d = {i: 30, alpha: .16, color: 16389120, h: 2.15};
    a.push(d);
    d = {i: 100, alpha: .25, color: 16389120, s: .22, h: 1.45};
    b.push(d);
    d = {i: 7, alpha: .5, color: 15628151, s: .3, h: 1.5};
    b.push(d);
    d = {i: 3, alpha: .5, color: 15628151, s: .3, h: 1.52};
    b.push(d);
    d = {i: 4, alpha: .5, color: 16389120, s: .3, h: 1.745};
    b.push(d);
    d = {i: 9, alpha: .22, color: 16389120, s: .3, h: 1.8};
    b.push(d);
    this.ib.push(a);
    this.cb.push(b);
    this.jb.push(c);
    a = [];
    b = [];
    c = [];
    d = {i: 24, alpha: .2, color: 15186464, h: .2};
    a.push(d);
    d = {i: 7, alpha: .26, color: 15186464, h: .35};
    a.push(d);
    d = {i: 23, alpha: .18, color: 15186464, h: .65};
    a.push(d);
    d = {i: 13, alpha: .2, color: 15186464, h: .8};
    a.push(d);
    d = {i: 11, alpha: .15, color: 15186464, h: 1.4};
    a.push(d);
    d = {i: 15, alpha: .11, color: 15451904, h: 1.6};
    a.push(d);
    d = {i: 6, alpha: .45, color: 15579138, s: .45, h: .22};
    b.push(d);
    d = {i: 3, alpha: .3, color: 15451904, s: .25, h: .4};
    b.push(d);
    d = {i: 4, alpha: .2, color: 15451904, s: .25, h: .45};
    b.push(d);
    d = {i: 65, alpha: .17, color: 15186464, s: .25, h: .5};
    b.push(d);
    d = {
      i: 5, alpha: .45, color: 15579138, s: .45,
      h: .88
    };
    b.push(d);
    d = {i: 140, alpha: .18, color: 15579138, s: .32, h: .95};
    b.push(d);
    d = {i: 12, alpha: .22, color: 15579138, s: .32, h: 1.1};
    b.push(d);
    d = {i: 8, alpha: .32, color: 15451904, s: .72, h: 1.2};
    b.push(d);
    d = {i: 55, alpha: .2, color: 15451904, s: .45, h: 1.33};
    b.push(d);
    d = {i: 4, alpha: .3, color: 15451904, s: .25, h: 1.42};
    b.push(d);
    this.ib.push(a);
    this.cb.push(b);
    this.jb.push(c)
  };
  e.prototype.yj = function () {
    var a = this.m.a, b, c, d, g = new y(0, 0, -100), e = this.m.bc(), f, k;
    if (this.m.ka) f = this.m.Ta.width, k = this.m.Ta.height, this.m.S.Yd && (f = this.m.S.kb.width,
      k = this.m.S.kb.height); else {
      this.H || (this.H = this.ac.getContext("2d"));
      if (this.H.width !== this.m.l.width || this.H.height !== this.m.l.height) this.H.width = this.m.l.width, this.H.height = this.m.l.height;
      this.H.clear ? this.H.clear() : this.H.clearRect(0, 0, this.ac.width, this.ac.height);
      f = this.H.width;
      k = this.H.height
    }
    var m = Math.sqrt(f * f + k * k), p = m / 800;
    for (c = 0; c < this.Pd.length; c++) {
      var l = this.Pd[c];
      g.Ka(0, 0, -100);
      g.pa(-l.j * Math.PI / 180);
      g.wa(l.pan * Math.PI / 180);
      g.wa(-this.m.pan.b * Math.PI / 180);
      g.pa(this.m.j.b * Math.PI /
        180);
      g.Ra(this.m.G.b * Math.PI / 180);
      var r = !1;
      if (-.01 > g.z) {
        var q, t;
        t = -e / g.z;
        q = g.x * t;
        t *= g.y;
        Math.abs(q) < f / 2 + 100 && Math.abs(t) < k / 2 + 100 && (r = !0, q += f / 2, t += k / 2)
      }
      if (r) {
        this.m.ka && (a.blendFunc(a.SRC_ALPHA, a.DST_ALPHA), a.enable(a.BLEND), a.disable(a.DEPTH_TEST));
        var r = f / 2, v = k / 2;
        d = Math.sqrt((r - q) * (r - q) + (v - t) * (v - t));
        var w = m / 2, v = f > k ? f : k, r = l.og / 100 * ((w - d) / w);
        0 > r && (r = 0);
        if (this.m.ka) {
          a.useProgram(this.nb);
          a.bindBuffer(a.ARRAY_BUFFER, this.m.Fa);
          a.vertexAttribPointer(this.nb.ca, this.m.Fa.Qb, a.FLOAT, !1, 0, 0);
          var u = a.getUniformLocation(this.nb,
            "uCanvasDimensions");
          a.uniform2f(u, a.drawingBufferWidth, a.drawingBufferHeight);
          a.uniform2f(a.getUniformLocation(this.nb, "uFlareCenterPosition"), a.drawingBufferWidth / f * q, k - a.drawingBufferHeight / k * t);
          a.uniform1f(a.getUniformLocation(this.nb, "uBlindingValue"), r);
          u = a.getUniformLocation(this.nb, "uAspectRatio");
          a.uniform1f(u, this.m.S.Yd ? a.drawingBufferWidth / a.drawingBufferHeight : a.drawingBufferWidth / a.drawingBufferHeight / (f / k));
          a.drawArrays(a.TRIANGLE_STRIP, 0, this.m.Fa.Ac)
        } else u = this.H.createRadialGradient(q,
          t, 1, q, t, v), u.addColorStop(0, "rgba(255, 255, 255, " + r + ")"), u.addColorStop(.5, "rgba(255, 255, 255, " + .8 * r + ")"), u.addColorStop(1, "rgba(255, 255, 255, " + .6 * r + ")"), this.H.fillStyle = u, this.H.fillRect(0, 0, this.H.width, this.H.height);
        if (0 != Number(l.type) && !this.m.S.Yd) {
          var r = f / 2 - q, v = k / 2 - t, C = 1, B = Number(l.type) - 1;
          d < .35 * w && (C = d / (.35 * w), C *= C);
          d > .7 * w && (C = (w - d) / (.3 * w));
          C *= l.alpha / 100;
          if (0 < this.ib[B].length)for (d = 0; d < this.ib[B].length; d++) {
            var x = this.ib[B][d], w = x.i * p;
            b = x.alpha * C;
            0 > b && (b = 0);
            var z = x.color;
            if (8 == B ||
              9 == B || 10 == B) z = l.color;
            if (this.m.ka) a.useProgram(this.fa), a.bindBuffer(a.ARRAY_BUFFER, this.Xc), a.vertexAttribPointer(this.fa.ca, this.Xc.Qb, a.FLOAT, !1, 0, 0), u = a.getUniformLocation(this.fa, "uCanvasDimensions2"), a.uniform2f(u, a.drawingBufferWidth, a.drawingBufferHeight), a.uniform2f(a.getUniformLocation(this.fa, "uCirclePosition"), a.drawingBufferWidth / f * (q + r * x.h), a.drawingBufferWidth / f * (k - (t + v * x.h))), a.uniform2f(a.getUniformLocation(this.fa, "uCircleTexturePosition"), a.drawingBufferWidth / f * (q + r * x.h), k - (t +
              v * x.h)), a.uniform1f(a.getUniformLocation(this.fa, "uCircleRadius"), w), a.uniform3f(a.getUniformLocation(this.fa, "uCircleColor"), (z >> 16 & 255) / 255, (z >> 8 & 255) / 255, (z & 255) / 255), a.uniform1f(a.getUniformLocation(this.fa, "uCircleAlpha"), b), a.uniform1f(a.getUniformLocation(this.fa, "uCircleSoftness"), .1), u = a.getUniformLocation(this.fa, "uAspectRatio"), a.uniform1f(u, a.drawingBufferWidth / a.drawingBufferHeight / (f / k)), a.drawArrays(a.TRIANGLE_FAN, 0, this.Xc.Ac); else {
              this.H.save();
              this.H.translate(q + r * x.h, t + v * x.h);
              u =
                this.H.createRadialGradient(0, 0, 1, 0, 0, 1.1 * w);
              u.addColorStop(0, this.m.X(z, b));
              u.addColorStop(.65, this.m.X(z, .9 * b));
              u.addColorStop(.8, this.m.X(z, .7 * b));
              u.addColorStop(1, this.m.X(z, .2 * b));
              this.H.beginPath();
              var z = 2 * Math.PI / 6, x = Math.PI / 180 * 35, E = !0;
              for (b = x; b <= x + 2 * Math.PI; b += z)E ? (this.H.moveTo(w * Math.sin(b), w * Math.cos(b)), E = !1) : this.H.lineTo(w * Math.sin(b), w * Math.cos(b));
              this.H.closePath();
              this.H.fillStyle = u;
              this.H.fill();
              this.H.restore()
            }
          }
          if (0 < this.cb[B].length)for (d = 0; d < this.cb[B].length; d++) {
            x = this.cb[B][d];
            w = x.i * p;
            b = x.alpha * C;
            0 > b && (b = 0);
            z = x.color;
            if (8 == B || 9 == B || 10 == B) z = l.color;
            this.m.ka ? (a.useProgram(this.fa), a.bindBuffer(a.ARRAY_BUFFER, this.ec), a.vertexAttribPointer(this.fa.ca, this.ec.Qb, a.FLOAT, !1, 0, 0), u = a.getUniformLocation(this.fa, "uCanvasDimensions2"), a.uniform2f(u, a.drawingBufferWidth, a.drawingBufferHeight), u = a.getUniformLocation(this.fa, "uCirclePosition"), a.uniform2f(u, a.drawingBufferWidth / f * (q + r * x.h), a.drawingBufferWidth / f * (k - (t + v * x.h))), u = a.getUniformLocation(this.fa, "uCircleTexturePosition"),
                a.uniform2f(u, a.drawingBufferWidth / f * (q + r * x.h), k - (t + v * x.h)), u = a.getUniformLocation(this.fa, "uCircleRadius"), a.uniform1f(u, w), a.uniform3f(a.getUniformLocation(this.fa, "uCircleColor"), (z >> 16 & 255) / 255, (z >> 8 & 255) / 255, (z & 255) / 255), a.uniform1f(a.getUniformLocation(this.fa, "uCircleAlpha"), b), a.uniform1f(a.getUniformLocation(this.fa, "uCircleSoftness"), x.s), u = a.getUniformLocation(this.fa, "uAspectRatio"), a.uniform1f(u, a.drawingBufferWidth / a.drawingBufferHeight / (f / k)), a.drawArrays(a.TRIANGLE_FAN, 0, this.ec.Ac)) :
              (this.H.save(), this.H.translate(q + r * x.h, t + v * x.h), u = this.H.createRadialGradient(0, 0, 1, 0, 0, w), u.addColorStop(0, this.m.X(z, b)), u.addColorStop(1 - x.s, this.m.X(z, .8 * b)), u.addColorStop(1, this.m.X(z, 0)), this.H.beginPath(), this.H.arc(0, 0, w, 0, 2 * Math.PI, !1), this.H.closePath(), this.H.fillStyle = u, this.H.fill(), this.H.restore())
          }
          if (0 < this.jb[B].length)for (d = 0; d < this.jb[B].length; d++)l = this.jb[B][d], w = l.i * p, b = l.alpha * C, 0 > b && (b = 0), this.m.ka ? (a.useProgram(this.La), a.activeTexture(a.TEXTURE0), a.bindTexture(a.TEXTURE_2D,
              this.Fh), a.bindBuffer(a.ARRAY_BUFFER, this.ec), a.vertexAttribPointer(this.La.ca, this.ec.Qb, a.FLOAT, !1, 0, 0), u = a.getUniformLocation(this.La, "uCanvasDimensions2"), a.uniform2f(u, f, k), u = a.getUniformLocation(this.La, "uCirclePosition"), a.uniform2f(u, q + r * l.h, k - (t + v * l.h)), u = a.getUniformLocation(this.La, "uRingTexturePosition"), a.uniform2f(u, a.drawingBufferWidth / f * (q + r * l.h), k - (t + v * l.h)), u = a.getUniformLocation(this.La, "uCircleRadius"), a.uniform1f(u, w), a.uniform2f(a.getUniformLocation(this.La, "uRingPosition"),
              q + r * l.h, k - (t + v * l.h)), a.uniform1f(a.getUniformLocation(this.La, "uRingRadius"), w), a.uniform1f(a.getUniformLocation(this.La, "uRingAlpha"), b), u = a.getUniformLocation(this.La, "uAspectRatio"), a.uniform1f(u, a.drawingBufferWidth / a.drawingBufferHeight / (f / k)), a.uniform1i(a.getUniformLocation(this.La, "uSampler"), 0), a.drawArrays(a.TRIANGLE_FAN, 0, this.ec.Ac)) : (this.H.save(), this.H.translate(q + r * l.h, t + v * l.h), u = this.H.createRadialGradient(0, 0, 0, 0, 0, w), u.addColorStop(0, this.m.X(16777215, 0)), u.addColorStop(.88, this.m.X(0,
              0)), u.addColorStop(.9, this.m.X(16654848, b)), u.addColorStop(.92, this.m.X(16776448, b)), u.addColorStop(.94, this.m.X(4849466, b)), u.addColorStop(.96, this.m.X(131071, b)), u.addColorStop(.98, this.m.X(8190, b)), u.addColorStop(1, this.m.X(0, 0)), this.H.beginPath(), this.H.arc(0, 0, w, 0, 2 * Math.PI, !1), this.H.closePath(), this.H.fillStyle = u, this.H.fill(), this.H.restore())
        }
        this.m.ka && (a.useProgram(this.m.F), a.disable(a.BLEND), a.enable(a.DEPTH_TEST))
      }
    }
  };
  return e
}();
function Q () {
  var e = "perspective", a = ["Webkit", "Moz", "O", "ms", "Ms"], b;
  for (b = 0; b < a.length; b++)"undefined" !== typeof document.documentElement.style[a[b] + "Perspective"] && (e = a[b] + "Perspective");
  "undefined" !== typeof document.documentElement.style[e] ? "webkitPerspective" in document.documentElement.style ? (e = document.createElement("style"), a = document.createElement("div"), b = document.head || document.getElementsByTagName("head")[0], e.textContent = "@media (-webkit-transform-3d) {#ggswhtml5{height:5px}}", b.appendChild(e),
        a.id = "ggswhtml5", document.documentElement.appendChild(a), b = 5 === a.offsetHeight, e.parentNode.removeChild(e), a.parentNode.removeChild(a)) : b = !0 : b = !1;
  return b
}
function R () {
  var e;
  if (e = !!window.WebGLRenderingContext)try {
    var a = document.createElement("canvas");
    a.width = 100;
    a.height = 100;
    var b = a.getContext("webgl");
    b || (b = a.getContext("experimental-webgl"));
    e = !!b
  } catch (c) {
    e = !1
  }
  return e
}
window.ggHasHtml5Css3D = Q;
window.ggHasWebGL = R;
var S = this && this.Nk || function (e, a) {
      function b () {
        this.constructor = e
      }

      for (var c in a)a.hasOwnProperty(c) && (e[c] = a[c]);
      e.prototype = null === a ? Object.create(a) : (b.prototype = a.prototype, new b)
    }, T = function () {
    function e (a) {
      this.m = null;
      this.Dd = this.Tg = this.hb = !1;
      this.Ra = this.wa = this.pa = 0;
      this.g = 70;
      this.za = 0;
      this.autoplay = this.Hd = !1;
      this.id = "";
      this.j = this.pan = 0;
      this.m = a;
      this.Xb = this.Ob = 100;
      this.gc = 1
    }

    e.prototype.Za = function (a) {
      var b;
      if (b = a.getAttributeNode("id")) this.id = b.nodeValue.toString();
      if (b = a.getAttributeNode("pan")) this.pan =
        Number(b.nodeValue);
      if (b = a.getAttributeNode("tilt")) this.j = Number(b.nodeValue)
    };
    e.prototype.Zh = function (a) {
      var b = "", c = this.m;
      c.Eb && (b += "perspective(" + a + "px) ");
      b = b + ("translate3d(0px,0px," + a + "px) ") + ("rotateZ(" + c.G.b.toFixed(10) + "deg) ");
      b += "rotateX(" + c.j.b.toFixed(10) + "deg) ";
      b += "rotateY(" + (-c.pan.b).toFixed(10) + "deg) ";
      b += "rotateY(" + this.pan.toFixed(10) + "deg) ";
      b += "rotateX(" + (-this.j).toFixed(10) + "deg) ";
      a = 1E4;
      var d = this.c.videoWidth, g = this.c.videoHeight;
      if (0 == d || 0 == g) d = 640, g = 480;
      0 < this.Ob && (d = this.Ob);
      0 < this.Xb && (g = this.Xb);
      0 < d && 0 < g && (this.c.width = d, this.c.height = g, this.c.style.width = d + "px", this.c.style.height = g + "px");
      0 < this.g && (a = d / (2 * Math.tan(this.g / 2 * Math.PI / 180)));
      b += "translate3d(0px,0px," + (-a).toFixed(10) + "px) ";
      b += "rotateZ(" + this.Ra.toFixed(10) + "deg) ";
      b += "rotateY(" + (-this.wa).toFixed(10) + "deg) ";
      b += "rotateX(" + this.pa.toFixed(10) + "deg) ";
      this.gc && 1 != this.gc && (b += "scaleY(" + this.gc + ") ");
      b += "translate3d(" + -d / 2 + "px," + -g / 2 + "px,0px) ";
      this.c.style[c.Aa + "Origin"] = "0% 0%";
      this.hb && (b = "", 1 == this.za &&
      (b += "scale(" + Math.min(c.l.width / d, c.l.height / g) + ") "), b += "translate3d(" + -d / 2 + "px," + -g / 2 + "px,0px) ");
      this.ij != b && (this.ij = b, this.c.style[c.Aa] = b, this.c.style.visibility = "visible", this.Dd && this.Tg == this.hb && (this.c.style[c.Vb] = "all 0s linear 0s"), this.Tg = this.hb)
    };
    e.prototype.Rc = function () {
      var a = this.m;
      this.c.style.left = a.margin.left + a.l.width / 2 + "px";
      this.c.style.top = a.margin.top + a.l.height / 2 + "px"
    };
    return e
  }(), U = function (e) {
    function a (a) {
      e.call(this, a);
      this.Tf = this.Bf = this.md = !1;
      this.url = [];
      this.loop =
        0;
      this.level = 1;
      this.Lb = 0;
      this.mode = 1;
      this.zg = 10;
      this.bf = this.Xa = 0;
      this.aa = 1;
      this.Sb = this.Jb = this.Ib = this.Rb = 0
    }

    S(a, e);
    a.prototype.dk = function () {
      0 == this.loop ? this.c.play() : 0 < this.tc && (this.tc--, this.c.currentTime = 0, this.Bf && (this.fc && 0 == this.fc.gain.value || 0 == this.wb.gain.value && 0 == this.zb.gain.value && 0 == this.xb.gain.value && 0 == this.yb.gain.value) || this.c.play())
    };
    a.prototype.lg = function () {
      var a = this.m.lb;
      a && (this.source = a.createMediaElementSource(this.c), 2 == this.mode || 3 == this.mode || 5 == this.mode ? (this.wd =
          a.createChannelSplitter(2), this.wb = a.createGain(), this.xb = a.createGain(), this.yb = a.createGain(), this.zb = a.createGain(), this.vd = a.createChannelMerger(2), this.source.connect(this.wd), this.wd.connect(this.wb, 0), this.wd.connect(this.xb, 0), this.wd.connect(this.yb, 1), this.wd.connect(this.zb, 1), this.wb.connect(this.vd, 0, 0), this.xb.connect(this.vd, 0, 1), this.yb.connect(this.vd, 0, 0), this.zb.connect(this.vd, 0, 1), this.vd.connect(a.destination)) : (this.fc = a.createGain(), this.source.connect(this.fc), this.fc.connect(a.destination)))
    };
    a.prototype.Vd = function () {
      var a = this.m.lb;
      this.hb || this.Tf || (this.wb.gain.setValueAtTime(this.Rb, a.currentTime), this.zb.gain.setValueAtTime(this.Sb, a.currentTime), this.xb.gain.setValueAtTime(this.Ib, a.currentTime), this.yb.gain.setValueAtTime(this.Jb, a.currentTime))
    };
    a.prototype.ff = function () {
      var a = this.m, c = this.m.lb;
      if (this.c) {
        var d, g = this.pan - a.pan.b;
        for (d = this.j - a.j.b; -180 > g;)g += 360;
        for (; 180 < g;)g -= 360;
        var e = this.Lb, f = this.zg;
        0 == f && (f = .01);
        0 > f && (f = a.g.b);
        this.$a || (this.$a = new y, this.$a.Cg(this.pan,
          this.j));
        0 != this.mode && 1 != this.mode || !c || this.fc && this.fc.gain.setValueAtTime(this.level * a.ba * this.aa, c.currentTime);
        if (2 == this.mode && c) {
          var k = .5 * Math.cos(g * Math.PI / 180) + .5;
          this.Rb = Math.sqrt(k) * this.aa;
          this.Sb = Math.sqrt(k) * this.aa;
          this.Ib = Math.sqrt(1 - k) * this.aa;
          this.Jb = Math.sqrt(1 - k) * this.aa;
          this.Vd()
        }
        if (3 == this.mode) {
          0 > g ? g < -this.Xa ? g += this.Xa : g = 0 : g = g > this.Xa ? g - this.Xa : 0;
          k = this.level;
          d = Math.abs(d);
          d = d < this.bf ? 0 : d - this.bf;
          var m = 1 - d / f;
          if (Math.abs(g) > f || 0 > m) {
            var p = k * e * a.ba;
            c ? (this.Rb = p * this.aa, this.Sb =
                p * this.aa, this.Jb = this.Ib = 0, this.Vd()) : this.c.volume = k * e * a.ba
          } else if (p = 1 - Math.abs(g / f), c) {
            var l = k * (e + (1 - e) * m * p) * a.ba, p = k * e * a.ba;
            0 <= g ? (this.Rb = l * this.aa, this.Sb = p * this.aa) : (this.Rb = p * this.aa, this.Sb = l * this.aa);
            2 * Math.abs(g) < f ? (p = 1 - Math.abs(2 * g) / f, l = k * (e + (1 - e) * m * p) * a.ba, p = .5 * k * (1 - e) * m * (1 - p) * a.ba, 0 <= g ? (this.Sb = l * this.aa, this.Jb = p * this.aa, this.Ib = 0) : (this.Rb = l * this.aa, this.Ib = p * this.aa, this.Jb = 0)) : (p = 1 - (Math.abs(2 * g) - f) / f, l = .5 * k * (1 - e) * m * p * a.ba, 0 <= g ? (this.Jb = l * this.aa, this.Ib = 0) : (this.Ib = l * this.aa, this.Jb =
                  0));
            this.Vd()
          } else this.c.volume = k * (e + (1 - e) * m * p) * a.ba
        }
        4 == this.mode && (Math.abs(g) < this.Xa && Math.abs(d) < this.bf ? this.md || (this.md = !0, this.c.play()) : this.md = !1);
        5 == this.mode && (d = 180 * Math.acos(a.uf.Me(this.$a)) / Math.PI, d < this.Xa ? c ? (this.Rb = this.level * a.ba * this.aa, this.Sb = this.level * a.ba * this.aa, this.Jb = this.Ib = 0, this.Vd()) : this.c.volume = this.level * a.ba : c ? d < this.Xa + f ? (0 > g ? g = g > -this.Xa ? 0 : g + this.Xa : g = g < this.Xa ? 0 : g - this.Xa, l = 1 - Math.max(d - this.Xa, 0) / f, p = Math.max(1 - Math.abs(g) * Math.cos(this.j * Math.PI / 180) /
                f, 0), 0 < g ? (this.Rb = this.level * (l * (1 - this.Lb) + this.Lb) * this.aa, this.Sb = this.level * (l * p * (1 - this.Lb) + this.Lb) * this.aa, this.Ib = 0, this.Jb = this.level * l * (1 - p) * this.aa) : (this.Rb = this.level * (l * p * (1 - this.Lb) + this.Lb) * this.aa, this.Sb = this.level * (l * (1 - this.Lb) + this.Lb) * this.aa, this.Ib = this.level * l * (1 - p) * this.aa, this.Jb = 0), this.Vd()) : (l = this.level * this.Lb, this.Rb = l * this.aa, this.Sb = l * this.aa, this.Jb = this.Ib = 0) : (d -= this.Xa, this.c.volume = d < f && 0 < f ? this.level * (e + (1 - e) * (1 - Math.abs(d / f))) * a.ba : e * a.ba));
        6 == this.mode &&
        (d = 180 * Math.acos(a.uf.Me(this.$a)) / Math.PI, Math.abs(d) < this.Xa ? this.md || (this.md = !0, this.c.play()) : this.md = !1)
      }
    };
    a.prototype.addElement = function () {
      var a = -1, c = this, d = this.m, g = this.m.lb;
      try {
        for (var e = !1, f = 0; f < d.R.length; f++)d.R[f].id == c.id && (a = f, null != d.R[f].c && d.R[f].url.join() == c.url.join() && d.R[f].loop == c.loop && d.R[f].mode == c.mode && (e = !0));
        if (!e) {
          if (0 <= a) {
            var k = d.R[a];
            if (null != k.c)if (g && d.ra.enabled) d.ra.Zd.push(k), 1 != d.S.Ba && 2 != d.S.Ba && d.ra.Af(k); else {
              try {
                k.c.pause()
              } catch (m) {
              }
              try {
                k.Nc()
              } catch (m) {
              }
            }
          }
          c.c =
            document.createElement("audio");
          c.c.crossOrigin = d.crossOrigin;
          c.c.setAttribute("class", "ggmedia");
          d.Zc && c.c.setAttribute("id", d.Zc + c.id);
          for (f = 0; f < c.url.length; f++)e = void 0, e = document.createElement("source"), "" != c.url[f] && "#" != c.url[f] && (e.crossOrigin = d.crossOrigin, e.setAttribute("src", d.ub(c.url[f])), c.c.appendChild(e));
          c.c.volume = c.level * d.ba;
          1 <= c.loop && (c.tc = c.loop - 1);
          0 <= a ? d.R[a] = c : d.R.push(c);
          0 < c.c.childNodes.length && (d.M.appendChild(c.c), c.c.addEventListener("ended", function () {
            c.dk()
          }, !1), g &&
          (c.lg(), c.Bf = !1, 0 == c.loop && c.source.mediaElement && (c.source.mediaElement.loop = !0)));
          1 != c.mode && 2 != c.mode && 3 != c.mode && 5 != c.mode || !(0 <= c.loop) || g && d.ra.enabled || (c.c.autoplay = !0, c.autoplay = !0);
          0 == c.mode && 0 <= c.loop && (c.autoplay = !0);
          c.ff()
        }
      } catch (m) {
      }
    };
    a.prototype.Nc = function () {
      try {
        this.m.M.removeChild(this.c), this.c = null
      } catch (a) {
      }
    };
    a.prototype.Za = function (a) {
      e.prototype.Za.call(this, a);
      var c;
      (c = a.getAttributeNode("url")) && this.url.push(c.nodeValue.toString());
      if (c = a.getAttributeNode("level")) this.level =
        Number(c.nodeValue);
      if (c = a.getAttributeNode("loop")) this.loop = Number(c.nodeValue);
      if (c = a.getAttributeNode("mode")) this.mode = Number(c.nodeValue);
      if (c = a.getAttributeNode("field")) this.zg = Number(c.nodeValue);
      if (c = a.getAttributeNode("ambientlevel")) this.Lb = Number(c.nodeValue);
      if (c = a.getAttributeNode("pansize")) this.Xa = Number(c.nodeValue);
      if (c = a.getAttributeNode("tiltsize")) this.bf = Number(c.nodeValue);
      for (a = a.firstChild; a;)"source" == a.nodeName && (c = a.getAttributeNode("url")) && this.url.push(c.nodeValue.toString()),
        a = a.nextSibling
    };
    return a
  }(T), V = function (e) {
    function a (a) {
      e.call(this, a);
      this.poster = "";
      this.Ra = this.wa = this.pa = 0;
      this.g = 50;
      this.za = 0;
      this.Hd = !1
    }

    S(a, e);
    a.prototype.Yb = function () {
      1 != this.za && 4 != this.za || this.Ed(!this.hb);
      2 == this.za && this.m.yh(this.id)
    };
    a.prototype.Ed = function (a) {
      var c = this.m.lb;
      if (1 == this.za || 4 == this.za)if (this.hb = a, this.m.Sa) (c = this.m.Y) && c.activateSound(this.id, this.hb ? 1 : 0); else {
        if (this.hb) this.c.play(), this.c.style.zIndex = "80000", this.c.style[this.m.Vb] = "all 1s ease 0s", this.m.cd(this.id);
        else {
          this.c.style.zIndex = "0";
          this.c.style[this.m.Vb] = "all 1s ease 0s";
          this.Tf = !0;
          var d = this;
          setTimeout(function () {
            d.Tf = !1
          }, 1E3)
        }
        if (c) {
          var c = c.currentTime, g = this.wb.gain.value, e = this.zb.gain.value, f = this.xb.gain.value, k = this.yb.gain.value;
          this.hb ? (this.wb.gain.linearRampToValueAtTime(g, c), this.wb.gain.linearRampToValueAtTime(this.level * this.m.ba, c + 1), this.zb.gain.linearRampToValueAtTime(e, c), this.zb.gain.linearRampToValueAtTime(this.level * this.m.ba, c + 1), this.xb.gain.linearRampToValueAtTime(f, c), this.xb.gain.linearRampToValueAtTime(0,
              c + 1), this.yb.gain.linearRampToValueAtTime(k, c), this.yb.gain.linearRampToValueAtTime(0, c + 1)) : (this.wb.gain.linearRampToValueAtTime(g, c), this.wb.gain.linearRampToValueAtTime(this.Rb, c + 1), this.zb.gain.linearRampToValueAtTime(e, c), this.zb.gain.linearRampToValueAtTime(this.Sb, c + 1), this.xb.gain.linearRampToValueAtTime(f, c), this.xb.gain.linearRampToValueAtTime(this.Ib, c + 1), this.yb.gain.linearRampToValueAtTime(k, c), this.yb.gain.linearRampToValueAtTime(this.Jb, c + 1))
        }
        this.Dd = !0;
        this.m.$h()
      }
      2 == this.za && (a ? this.m.cd(this.id) :
        this.m.Sf(this.id))
    };
    a.prototype.Fd = function () {
      this.Dd = !1;
      this.c.style[this.m.Vb] = "none"
    };
    a.prototype.Gk = function () {
      0 == this.loop ? this.c.play() : 0 < this.tc ? (this.tc--, this.c.currentTime = 0, this.c.play()) : this.fh = !1
    };
    a.prototype.Za = function (a) {
      e.prototype.Za.call(this, a);
      var c;
      if (c = a.getAttributeNode("poster")) this.poster = String(c.nodeValue);
      if (c = a.getAttributeNode("rotx")) this.pa = Number(c.nodeValue);
      if (c = a.getAttributeNode("roty")) this.wa = Number(c.nodeValue);
      if (c = a.getAttributeNode("rotz")) this.Ra = Number(c.nodeValue);
      if (c = a.getAttributeNode("fov")) this.g = Number(c.nodeValue);
      if (c = a.getAttributeNode("width")) this.Ob = Number(c.nodeValue);
      if (c = a.getAttributeNode("height")) this.Xb = Number(c.nodeValue);
      this.gc = (c = a.getAttributeNode("stretch")) ? Number(c.nodeValue) : 1;
      if (c = a.getAttributeNode("clickmode")) this.za = Number(c.nodeValue);
      if (c = a.getAttributeNode("handcursor")) this.Hd = 1 == Number(c.nodeValue)
    };
    a.prototype.addElement = function () {
      var a = this, c = this.m;
      try {
        a.c = document.createElement("video");
        a.c.setAttribute("class", "ggmedia");
        a.c.crossOrigin = c.crossOrigin;
        a.c.hidden = !0;
        c.Zc && a.c.setAttribute("id", c.Zc + a.id);
        if (c.be) a.c.setAttribute("style", "display: none; max-width:none;"); else if (a.c.setAttribute("style", "max-width:none;pointer-events:none;"), 1 == a.za || 4 == a.za) a.c.addEventListener(c.fi(), function () {
          a.Fd()
        }, !1), a.c.addEventListener("transitionend", function () {
          a.Fd()
        }, !1);
        var d;
        for (d = 0; d < a.url.length; d++) {
          var g;
          g = document.createElement("source");
          g.crossOrigin = c.crossOrigin;
          g.setAttribute("src", c.ub(a.url[d]));
          a.c.appendChild(g)
        }
        "" !=
        a.poster && (a.c.poster = c.ub(a.poster), 0 > a.loop && (a.c.ji = "none"));
        a.c.volume = a.level * c.ba;
        1 <= a.loop && (a.tc = a.loop - 1);
        (1 == a.mode || 2 == a.mode || 3 == a.mode || 5 == a.mode) && 0 <= a.loop && (a.c.autoplay = !0, a.fh = !0, a.autoplay = !0);
        c.J.push(this);
        c.be ? c.M.appendChild(a.c) : (a.c.style.position = "absolute", a.Ob && (a.c.width = a.Ob), a.Xb && (a.c.height = a.Xb), c.w.appendChild(a.c), a.lg());
        a.c.onclick = function () {
          a.Yb()
        };
        a.c.addEventListener("ended", function () {
          a.Gk()
        }, !1)
      } catch (e) {
      }
    };
    a.prototype.Nc = function () {
      var a = this.m;
      a.be && (a.a.deleteTexture(this.Gb),
        this.Gb = 0, a.M.removeChild(this.c));
      a.ai && a.w.removeChild(this.c);
      this.c = null
    };
    return a
  }(U), W = function (e) {
    function a (a) {
      e.call(this, a);
      this.url = "";
      this.Ra = this.wa = this.pa = 0;
      this.g = 50;
      this.za = 0;
      this.Hd = !1;
      this.Xb = this.Ob = 100;
      this.gc = 1
    }

    S(a, e);
    a.prototype.Za = function (a) {
      e.prototype.Za.call(this, a);
      var c;
      if (c = a.getAttributeNode("url")) this.url = c.nodeValue.toString();
      if (c = a.getAttributeNode("rotx")) this.pa = Number(c.nodeValue);
      if (c = a.getAttributeNode("roty")) this.wa = Number(c.nodeValue);
      if (c = a.getAttributeNode("rotz")) this.Ra =
        Number(c.nodeValue);
      if (c = a.getAttributeNode("fov")) this.g = Number(c.nodeValue);
      if (c = a.getAttributeNode("width")) this.Ob = Number(c.nodeValue);
      if (c = a.getAttributeNode("height")) this.Xb = Number(c.nodeValue);
      this.gc = (c = a.getAttributeNode("stretch")) ? Number(c.nodeValue) : 1;
      if (c = a.getAttributeNode("clickmode")) this.za = Number(c.nodeValue);
      if (c = a.getAttributeNode("handcursor")) this.Hd = 1 == Number(c.nodeValue);
      for (a = a.firstChild; a;)"source" == a.nodeName && (c = a.getAttributeNode("url")) && (this.url = c.nodeValue.toString()),
        a = a.nextSibling
    };
    a.prototype.Fd = function () {
      this.Dd = !1;
      this.c.style[this.m.Vb] = "none"
    };
    a.prototype.Yb = function () {
      1 !== this.za && 4 !== this.za || this.Ed(!this.hb)
    };
    a.prototype.Ed = function (a) {
      var c = this.m;
      if (1 === this.za || 4 === this.za) this.hb = a, this.m.Sa ? (a = this.m.Y) && a.activateSound(this.id, this.hb ? 1 : 0) : (this.c.style.zIndex = this.hb ? "80000" : "0", this.c.style[c.Vb] = "all 1s ease 0s", this.Dd = !0, c.Vh())
    };
    a.prototype.addElement = function () {
      var a = this, c = this.m;
      try {
        a.c = document.createElement("img");
        a.c.setAttribute("style",
          "-webkit-user-drag:none; max-width:none;");
        a.c.setAttribute("class", "ggmedia");
        a.c.hidden = !0;
        c.Zc && a.c.setAttribute("id", c.Zc + a.id);
        a.c.ondragstart = function () {
          return !1
        };
        if (1 === a.za || 4 === a.za) a.c.addEventListener(c.fi(), function () {
          a.Fd()
        }, !1), a.c.addEventListener("transitionend", function () {
          a.Fd()
        }, !1);
        a.c.setAttribute("src", c.ub(a.url));
        a.Ob && (a.c.width = a.Ob);
        a.Xb && (a.c.height = a.Xb);
        c.Ua.push(a);
        a.c.style.position = "absolute";
        a.Yb && (a.c.onclick = function () {
          a.Yb()
        });
        c.w.appendChild(a.c)
      } catch (d) {
      }
    };
    a.prototype.Nc =
      function () {
        this.m.w.removeChild(this.c);
        this.c = null
      };
    return a
  }(T), X = function (e) {
    function a (a) {
      e.call(this, a);
      this.alpha = this.og = 50;
      this.type = 0;
      this.color = 16777215
    }

    S(a, e);
    a.prototype.Za = function (a) {
      e.prototype.Za.call(this, a);
      var c;
      if (c = a.getAttributeNode("blinding")) this.og = Number(c.nodeValue);
      if (c = a.getAttributeNode("alpha")) this.alpha = Number(c.nodeValue);
      if (c = a.getAttributeNode("type")) this.type = Number(c.nodeValue);
      if (c = a.getAttributeNode("color")) this.color = 1 * Number(c.nodeValue)
    };
    return a
  }(T),
  Y = function () {
    function e (a) {
      this.type = "empty";
      this.Mh = this.id = this.target = this.description = this.title = this.url = "";
      this.hf = 100;
      this.ze = 20;
      this.jf = !1;
      this.c = null;
      this.Ha = this.ea = this.j = this.pan = 0;
      this.ob = a.v.ob;
      this.mb = a.v.mb;
      this.Nb = a.v.Nb;
      this.Mb = a.v.Mb;
      this.Yc = a.v.Yc;
      this.ce = []
    }

    e.prototype.Wc = function () {
      this.id = this.id;
      this.pan = this.pan;
      this.tilt = this.j;
      this.url = this.url;
      this.target = this.target;
      this.title = this.title;
      this.description = this.description;
      this.skinid = this.Mh;
      this.obj = this.c
    };
    e.prototype.Za =
      function (a) {
        var b;
        if (b = a.getAttributeNode("url")) this.url = b.nodeValue.toString();
        if (b = a.getAttributeNode("target")) this.target = b.nodeValue.toString();
        if (b = a.getAttributeNode("title")) this.title = b.nodeValue.toString();
        if (b = a.getAttributeNode("description")) this.description = b.nodeValue.toString();
        if (b = a.getAttributeNode("id")) this.id = b.nodeValue.toString();
        if (b = a.getAttributeNode("skinid")) this.Mh = b.nodeValue.toString();
        if (b = a.getAttributeNode("width")) this.hf = Number(b.nodeValue);
        if (b = a.getAttributeNode("height")) this.ze =
          Number(b.nodeValue);
        if (b = a.getAttributeNode("wordwrap")) this.jf = 1 == Number(b.nodeValue);
        b = a.getAttributeNode("pan");
        this.pan = 1 * (b ? Number(b.nodeValue) : 0);
        b = a.getAttributeNode("tilt");
        this.j = 1 * (b ? Number(b.nodeValue) : 0);
        if (b = a.getAttributeNode("bordercolor")) this.ob = 1 * Number(b.nodeValue);
        if (b = a.getAttributeNode("backgroundcolor")) this.mb = 1 * Number(b.nodeValue);
        if (b = a.getAttributeNode("borderalpha")) this.Nb = 1 * Number(b.nodeValue);
        if (b = a.getAttributeNode("backgroundalpha")) this.Mb = 1 * Number(b.nodeValue);
        if (b =
            a.getAttributeNode("handcursor")) this.Yc = 1 == Number(b.nodeValue);
        for (a = a.firstChild; a;) {
          if ("vertex" == a.nodeName) {
            var c = {pan: 0, j: 0};
            b = a.getAttributeNode("pan");
            c.pan = 1 * (b ? Number(b.nodeValue) : 0);
            b = a.getAttributeNode("tilt");
            c.j = 1 * (b ? Number(b.nodeValue) : 0);
            this.ce.push(c)
          }
          a = a.nextSibling
        }
        this.Wc()
      };
    return e
  }();
function aa () {
  this.bd = {zd: 1, Ad: 1, Rd: 0, Sd: 0, pd: 0, de: 0, scale: 1};
  this.Ab = !0;
  this.Tc = []
}
var ba = function () {
  function e () {
    var a;
    this.Ja = Array(6);
    for (a = 0; 6 > a; a++)this.Ja[a] = new aa
  }

  e.prototype.yi = function (a, b, c, d) {
    for (var g = 0; 6 > g; g++) {
      var e;
      if (e = this.Ja[g]) {
        var f;
        f = [];
        f.push(new y(-1, -1, -1, 0, 0));
        f.push(new y(1, -1, -1, 1, 0));
        f.push(new y(1, 1, -1, 1, 1));
        f.push(new y(-1, 1, -1, 0, 1));
        for (var k = 0; k < f.length; k++)4 > g ? f[k].wa(-Math.PI / 2 * g) : f[k].pa(Math.PI / 2 * (4 === g ? -1 : 1)), d && (f[k].Ra(d.G * Math.PI / 180), f[k].pa(-d.pitch * Math.PI / 180)), f[k].wa(-a * Math.PI / 180), f[k].pa(b * Math.PI / 180), f[k].Ra(c * Math.PI / 180);
        e.Ab =
          0 < f.length
      }
    }
  };
  return e
}(),
  Z = function () {
  function e (a, b) {
    this.pan = {b: 0, fb: 0, min: 0, max: 360, d: 0, Pf: 0};
    this.j = {b: 0, fb: 0, min: -90, max: 90, d: 0};
    this.G = {b: 0, fb: 0, min: -180, max: 180, d: 0};
    this.g = {b: 90, fb: 90, min: 1, Ud: 0, max: 170, dd: 0, d: 0, mode: 0, Oh: 0, vg: 0};
    this.oa = {G: 0, pitch: 0};
    this.l = {width: 10, height: 10};
    this.rb = 0;
    this.uf = new y;
    this.crossOrigin = "anonymous";
    this.O = {start: {x: 0, y: 0}, W: {x: 0, y: 0}, kc: {x: 0, y: 0}, b: {x: 0, y: 0}, V: {x: 0, y: 0}};
    this.N = {
      Da: -1, startTime: 0, start: {x: 0, y: 0}, W: {x: 0, y: 0}, kc: {x: 0, y: 0}, b: {x: 0, y: 0}, V: {
        x: 0,
        y: 0
      }
    };
    this.te = !0;
    this.A = {enabled: !0, W: {x: 0, y: 0}, V: {x: 0, y: 0}, g: {active: !1, Ia: 0}};
    this.o = {
      src: [],
      he: 4,
      width: 640,
      height: 480,
      $c: !1,
      Ce: !1,
      Fc: "loop",
      c: HTMLVideoElement = null,
      Gb: null,
      ig: null,
      Xe: null,
      If: null,
      format: "",
      ye: 0
    };
    this.Jc = 0;
    this.Y = this.la = this.va = this.M = this.pb = this.Oa = this.w = null;
    this.Gc = "pano";
    this.Cf = "flashcontainer";
    this.vf = "";
    this.control = null;
    this.bb = [];
    this.Ca = !1;
    this.qe = 1;
    this.D = null;
    this.rd = this.Id = !1;
    this.lc = "";
    this.fd = this.Eb = !1;
    this.Ke = 0;
    this.me = [];
    this.Vc = [];
    this.Xd = this.oc = 1;
    this.td =
      1024;
    this.Oe = !1;
    this.Qh = 0;
    this.u = {
      enabled: !1,
      timeout: 5,
      active: !1,
      Wd: !1,
      speed: .4,
      af: 0,
      Ie: 0,
      Of: !0,
      bi: !1,
      startTime: 0,
      jc: 0
    };
    this.K = {active: !1, qd: !1, speed: .1, pan: 0, j: 0, G: 0, g: 70, jd: 70, ih: 0, kh: 0, jh: 0, hh: 0};
    this.xa = null;
    this.od = {};
    this.v = {
      mode: 1,
      Nd: -1,
      ea: 0,
      Ha: 0,
      Tb: .05,
      ob: 255,
      Nb: 1,
      mb: 255,
      Mb: .3,
      Yc: !0,
      fg: {
        enabled: !0,
        width: 180,
        height: 20,
        gg: 0,
        eg: 1,
        background: !0,
        mb: 16777215,
        Mb: 1,
        ob: 0,
        Nb: 1,
        mf: 3,
        nf: 1,
        jf: !0
      }
    };
    this.na = null;
    this.I = [];
    this.R = [];
    this.J = [];
    this.Ua = [];
    this.Pc = [];
    this.sa = [];
    this.sc = [];
    this.ba = 1;
    this.rc =
      this.Uc = null;
    this.yd = {};
    this.addListener = function (a, b) {
      (this.yd[a] = this.yd[a] || []).push(b)
    };
    this.Sh = function (a, b) {
      var g = this.yd[a], e, f;
      if (g)for (f = 0, e = g.length; f < e; f++)g[f].apply(null, b)
    };
    this.removeEventListener = function (a, b) {
      var g = this.yd[a];
      if (g) {
        var e, f;
        f = 0;
        for (e = g.length; f < e; f++)if (g[f] === b) {
          1 === e ? delete this.yd[a] : g.splice(f, 1);
          break
        }
      }
    };
    this.f = {L: [], mc: "0x000000", zh: !1, nh: .4, oh: .4, Z: 512, Va: 1, lh: 0, ph: "", width: 0, height: 0, Eh: 0};
    this.xj = {target: 0, current: 0, Tb: .01, Ai: 2, yf: 0, pe: !1, pi: !1};
    this.margin =
      {left: 0, top: 0, right: 0, bottom: 0};
    this.B = {Qd: !1, Mf: !1, Wa: !1, Nf: !1, yc: !0, $g: !1, Nh: 1, xf: !0, le: !0, Ae: !1, sensitivity: 8};
    this.Td = [];
    this.cc = !0;
    this.ha = {x: 0, y: 0};
    this.be = this.Sa = this.ae = this.Hb = this.ka = !1;
    this.gf = this.ai = !0;
    this.Hf = !1;
    this.ue = !0;
    this.Gf = !1;
    this.ja = 0;
    this.Ye = 5;
    this.Oc = 0;
    this.rh = 200;
    this.ua = this.qc = "";
    this.Vb = "transition";
    this.Aa = "transform";
    this.dc = "perspective";
    this.yg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYBgeACDAAADIAAE3iTbkAAAAAElFTkSuQmCC";
    this.Ta = {width: 0, height: 0};
    this.Fg = new y;
    this.Eg = new y;
    this.Gg = new y;
    this.Hg = new y;
    this.Dg = new y;
    this.Ld = !1;
    this.currentNode = "";
    this.jg = [];
    this.df = [];
    this.ah = this.Lf = this.eh = this.Jf = this.Kf = this.Kd = this.bh = this.Ih = this.Ic = this.dh = !1;
    this.Wg = [];
    this.vh = !1;
    this.Pa = new ba;
    this.hg = !1;
    this.xd = function (a, b) {
      if (0 == a.length)return a;
      var g, e, f, k, m, p, l, r;
      r = [];
      g = b.Me(a[0]) - 0;
      for (k = 0; k < a.length; k++) {
        p = k;
        l = k + 1;
        l == a.length && (l = 0);
        e = b.Me(a[l]) - 0;
        if (0 <= g && 0 <= e) r.push(a[p]); else if (0 <= g || 0 <= e) f = e / (e - g), 0 > f && (f = 0),
        1 < f && (f = 1), m = new y, m.hc(a[p], a[l], f), 0 > g || r.push(a[p]), r.push(m);
        g = e
      }
      return r
    };
    this.cg = 0;
    this.eb = [];
    this.P = A();
    this.qb = A();
    this.Ee = -1;
    this.Cd = function (a) {
      return a ? a.pageX || a.pageY ? {
            x: a.pageX,
            y: a.pageY
          } : a.clientX || a.clientY ? {
              x: a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
              y: a.clientY + document.body.scrollTop + document.documentElement.scrollTop
            } : a.touches && a.touches[0] ? {x: a.touches[0].pageX, y: a.touches[0].pageY} : {x: 0, y: 0} : {x: 0, y: 0}
    };
    this.Ge = 1;
    this.Ei = this.Df = this.zf = this.Xf = this.Ne =
      0;
    this.se = !0;
    this.Qa = new Y(this);
    this.Qa.Yc = !1;
    this.xg();
    this.gd(this.Qa);
    this.checkLoaded = this.bb;
    this.isLoaded = !1;
    b && b.hasOwnProperty("useFlash") && b.useFlash && (this.Sa = !0, this.ka = this.Hb = !1, b.hasOwnProperty("flashPlayerId") ? this.Gc = b.flashPlayerId : this.Gc = "pano", b.hasOwnProperty("flashContainerId") ? this.Cf = b.flashContainerId : this.Cf = a + "flash");
    this.ia();
    this.Sa || (this.Ea = new P(this));
    this.sg(a);
    this.oi();
    this.userdata = this.od = this.re();
    this.emptyHotspot = this.Qa;
    this.mouse = this.ha;
    this.Kj();
    this.S =
      new N(this);
    this.ra = new O(this)
  }

  e.prototype.xg = function () {
    var a;
    this.dh = navigator.userAgent.match(/(MSIE)/g) ? !0 : !1;
    if (this.Ic = navigator.userAgent.match(/(Safari)/g) ? !0 : !1) a = navigator.userAgent.indexOf("Safari"), this.Dc = navigator.userAgent.substring(a + 7), a = navigator.userAgent.indexOf("Version"), -1 != a && (this.Dc = navigator.userAgent.substring(a + 8)), this.Dc = this.Dc.substring(0, this.Dc.indexOf(" ")), this.Dc = this.Dc.substring(0, this.Dc.indexOf(".")), this.Ih = !0;
    if (this.bh = navigator.userAgent.match(/(Chrome)/g) ?
        !0 : !1) this.Ic = !1;
    this.Kd = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? !0 : !1;
    this.Kf = navigator.userAgent.match(/(iPhone|iPod)/g) ? !0 : !1;
    this.Jf = navigator.userAgent.match(/(android)/i) ? !0 : !1;
    this.eh = navigator.userAgent.match(/(IEMobile)/i) ? !0 : !1;
    this.Lf = this.Kd || this.Jf || this.eh;
    /iP(hone|od|ad)/.test(navigator.platform) && (a = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), this.Wg = [parseInt(a[1], 10), parseInt(a[2], 10), parseInt(a[3] || "0", 10)]);
    a = ["Webkit", "Moz", "O", "ms", "Ms"];
    var b;
    this.ua = "";
    this.Vb =
      "transition";
    this.Aa = "transform";
    this.dc = "perspective";
    for (b = 0; b < a.length; b++)"undefined" !== typeof document.documentElement.style[a[b] + "Transform"] && (this.ua = "-" + a[b].toLowerCase() + "-", this.Vb = a[b] + "Transition", this.Aa = a[b] + "Transform", this.dc = a[b] + "Perspective");
    this.Hf = Q();
    this.ka = R();
    this.Hb = this.Hf;
    this.ka && (this.Hb = !1);
    this.Eb = !0;
    this.fd = !1;
    if (this.Kd || this.Jf) this.Kh(80), this.Ye = 2;
    this.ad("Pano2VR player - Prefix:" + this.ua + ", " + (this.Hf ? "CSS 3D available" : "CSS 3D not available") + ", " + (this.ka ?
        "WebGL available" : "WebGL not available"));
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext, this.lb = new AudioContext
    } catch (c) {
      this.lb = null
    }
    if (this.Ic && !(this.Ih && 9 <= Number(this.Dc)) || this.Kd) this.lb = null
  };
  e.prototype.ad = function (a) {
    var b = document.getElementById("debug");
    b && (b.innerHTML = a + "<br />");
    window.console && window.console.log(a)
  };
  e.prototype.Kj = function () {
    this.requestAnimationFrame = function () {
      var a = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame || window.msRequestAnimationFrame;
      return a ? a : function (a) {
          window.setTimeout(a, 10)
        }
    }()
  };
  e.prototype.Kh = function (a) {
    this.rh = a
  };
  e.prototype.Qj = function (a) {
    this.crossOrigin = a
  };
  e.prototype.Sj = function (a) {
    this.Zc = a
  };
  e.prototype.Wi = function () {
    return this.Ke
  };
  e.prototype.Pj = function (a) {
    this.qc = a
  };
  e.prototype.Gi = function () {
    return this.qc
  };
  e.prototype.Ni = function () {
    return this.Lf
  };
  e.prototype.Ki = function () {
    return this.u.active
  };
  e.prototype.Tj = function (a) {
    this.Lf = !!a
  };
  e.prototype.Mi =
    function () {
      return this.isLoaded
    };
  e.prototype.bc = function () {
    return 1 * this.l.height / (2 * Math.tan(Math.PI / 180 * (this.Wb() / 2)))
  };
  e.prototype.Lh = function (a, b) {
    this.isFullscreen && (a = window.innerWidth, b = window.innerHeight);
    var c = a - this.margin.left - this.margin.right, d = b - this.margin.top - this.margin.bottom;
    if (!(10 > c || 10 > d)) {
      var g = window.devicePixelRatio || 1;
      this.Oe && (g = 1);
      this.w.style.width = c + "px";
      this.w.style.height = d + "px";
      this.w.style.left = this.margin.left + "px";
      this.w.style.top = this.margin.top + "px";
      if (this.ka)try {
        this.Oa &&
        (this.Oa.style.position = "absolute", this.Oa.style.display = "inline", this.Oa.style.width = c + "px", this.Oa.style.height = d + "px", this.Oa.width = c * g, this.Oa.height = d * g), this.a && (this.Ta.width = c * g, this.Ta.height = d * g, this.a.viewport(0, 0, this.a.drawingBufferWidth, this.a.drawingBufferHeight))
      } catch (e) {
        alert(e)
      }
      this.pb && (this.pb.style.width = a + "px", this.pb.style.height = b + "px", this.pb.width = a, this.pb.height = b);
      this.va && (this.va.style.width = a + "px", this.va.style.height = b + "px", this.la.style.width = a + "px", this.la.style.height =
        b + "px", this.la.width = a, this.la.height = b, this.la.style.left = this.margin.left + "px", this.la.style.top = this.margin.top + "px", this.D && this.D != this.va && (this.D.style.width = a + "px", this.D.style.height = b + "px"));
      this.Ea && (c = this.Ea.ac, c.style.width = a + "px", c.style.height = b + "px", c.width = a, c.height = b, c.style.left = this.margin.left + "px", c.style.top = this.margin.top + "px");
      this.Id && (this.Ca = !0);
      c = this.w.offsetWidth;
      d = this.w.offsetHeight;
      if (this.l.width != c || this.l.height != d) this.l.width = c, this.l.height = d;
      this.Fk();
      this.D &&
      this.D.ggUpdateSize && this.D.ggUpdateSize(a, b)
    }
  };
  e.prototype.Rc = function () {
    this.hg = !0
  };
  e.prototype.Sc = function () {
    this.Lh(this.Uc.offsetWidth, this.Uc.offsetHeight)
  };
  e.prototype.hj = function () {
    var a = {width: 0, height: 0};
    a.width = this.l.width;
    a.height = this.l.height;
    return a
  };
  e.prototype.Hc = function () {
    var a = {x: 0, y: 0}, b = this.w;
    if (b.offsetParent) {
      do a.x += b.offsetLeft, a.y += b.offsetTop, b = b.offsetParent; while (b)
    }
    return a
  };
  e.prototype.Zj = function (a) {
    this.xa = a
  };
  e.prototype.Vj = function (a, b, c, d) {
    this.margin.left = a;
    this.margin.top = b;
    this.margin.right = c;
    this.margin.bottom = d;
    this.xa = this.skinObj;
    this.Rc()
  };
  e.prototype.vi = function (a) {
    0 == a && (this.B.yc = !1);
    1 == a && (this.B.yc = !0);
    2 == a && (this.B.yc = this.B.yc ? !1 : !0)
  };
  e.prototype.fj = function () {
    return 1 == this.B.yc ? 1 : 0
  };
  e.prototype.qg = function (a, b) {
    this.v.mode = 1 == b && 0 < this.v.mode ? 0 : Math.round(a);
    this.update();
    this.Y && (this.Y.changePolygonMode(a, b), this.Y.update())
  };
  e.prototype.Yi = function () {
    return this.v.mode
  };
  e.prototype.wi = function () {
  };
  e.prototype.gj = function () {
    return 0
  };
  e.prototype.Xg = function (a, b, c) {
    a = Math.atan2(a + 1, c);
    var d = Math.atan2(b + 1, c);
    b = Math.sin(a);
    c = Math.sin(d);
    a = Math.cos(a);
    d = Math.cos(d);
    this.Fg.Ka(0, 0, -1);
    this.Eg.Ka(a, 0, -b);
    this.Gg.Ka(-a, 0, -b);
    this.Hg.Ka(0, d, -c);
    this.Dg.Ka(0, -d, -c)
  };
  e.prototype.sf = function (a) {
    a = this.xd(a, this.Fg);
    a = this.xd(a, this.Eg);
    a = this.xd(a, this.Gg);
    a = this.xd(a, this.Hg);
    return a = this.xd(a, this.Dg)
  };
  e.prototype.Uh = function (a) {
    if (!this.Eb && this.mj != a) {
      this.mj = a;
      var b;
      b = this.margin.left + this.l.width / 2 + "px ";
      b += this.margin.top + this.l.height /
        2 + "px ";
      this.va.style[this.dc] = a + "px";
      this.va.style[this.dc + "Origin"] = b;
      this.w.style[this.dc] = a + "px";
      this.w.style[this.dc + "Origin"] = b
    }
  };
  e.prototype.ef = function () {
    var a, b = new y(0, 0, -100), c = this.bc(), d, g, e;
    g = 100 / this.g.b;
    e = this.f.width / this.f.height;
    d = this.l.height * g * e;
    g *= this.l.height;
    for (var f = 0; f < this.I.length; f++) {
      var k = this.I[f], m, p;
      "point" == k.type && (p = !1, 2 == this.rb ? (a = (this.pan.b - k.pan) / 100 / e * d, m = (this.j.b - k.j) / 100 * g, Math.abs(a) < this.l.width / 2 + 500 && Math.abs(m) < this.l.height / 2 + 500 && (p = !0)) : (b.Ka(0,
          0, -100), b.pa(-k.j * Math.PI / 180), b.wa(k.pan * Math.PI / 180), b.wa(-this.pan.b * Math.PI / 180), b.pa(this.j.b * Math.PI / 180), b.Ra(this.G.b * Math.PI / 180), .01 > b.z ? (m = -c / b.z, a = b.x * m, m *= b.y, Math.abs(a) < this.l.width / 2 + 500 && Math.abs(m) < this.l.height / 2 + 500 && (p = !0)) : m = a = 0), k.sb = a + this.l.width / 2, k.Ya = m + this.l.height / 2, k.c && k.c.__div && ("none" != k.c.__div.style[this.Vb] && (k.c.__div.style[this.Vb] = "none"), k.c.ggUse3d ? (this.Eb || this.Uh(c), k.c.__div.style.width = "1px", k.c.__div.style.height = "1px", a = "", this.Eb && (a += "perspective(" +
          c + "px) "), a += "translate3d(0px,0px," + c + "px) ", a += "rotateZ(" + this.G.b.toFixed(10) + "deg) ", a += "rotateX(" + this.j.b.toFixed(10) + "deg) ", a += "rotateY(" + (-this.pan.b).toFixed(10) + "deg) ", a += "rotateY(" + k.pan.toFixed(10) + "deg) ", a += "rotateX(" + (-k.j).toFixed(10) + "deg) ", a += "translate3d(0px,0px," + (-1 * k.c.gg3dDistance).toFixed(10) + "px) ", k.c.__div.style[this.Aa + "Origin"] = "0% 0%", k.c.__div.style[this.Aa] = a, k.c.__div.style.left = this.margin.left + this.l.width / 2 + "px", k.c.__div.style.top = this.margin.top + this.l.height /
          2 + "px") : !p || this.S.ld || this.S.Ec ? (k.c.__div.style.left = "-1000px", k.c.__div.style.top = "-1000px") : (k.c.__div.style.left = this.margin.left + a + this.l.width / 2 + "px", k.c.__div.style.top = this.margin.top + m + this.l.height / 2 + "px")));
      if ("poly" == k.type) {
        var l = [];
        if (2 == this.rb)for (k.Bc = [], p = 0; p < k.ce.length; p++)m = k.ce[p], a = (this.pan.b - m.pan) / 100 / e * d, m = (this.j.b - m.j) / 100 * g, a += this.margin.left + this.l.width / 2, m += this.margin.top + this.l.height / 2, k.Bc.push({
          sb: a,
          Ya: m
        }); else {
          for (p = 0; p < k.ce.length; p++)m = k.ce[p], b.Ka(0, 0, -100),
            b.pa(-m.j * Math.PI / 180), b.wa(m.pan * Math.PI / 180), b.wa(-this.pan.b * Math.PI / 180), b.pa(this.j.b * Math.PI / 180), b.Ra(this.G.b * Math.PI / 180), l.push(b.clone());
          l = this.sf(l);
          if (0 < l.length)for (p = 0; p < l.length; p++)b = l[p], .1 > b.z ? (m = -c / b.z, a = this.l.width / 2 + b.x * m, m = this.l.height / 2 + b.y * m): m= a = 0, b.sb = a, b.Ya = m;
          k.Bc = l
        }
      }
    }
  };
  e.prototype.Hi = function () {
    for (var a = [], b = 0; b < this.I.length; b++) {
      var c = this.I[b];
      "point" == c.type && c.c && c.c.__div && a.push(c.c.__div)
    }
    return a
  };
  e.prototype.X = function (a, b) {
    a = Number(a);
    isNaN(b) && (b = 0);
    0 >
    b && (b = 0);
    1 < b && (b = 1);
    return "rgba(" + (a >> 16 & 255) + "," + (a >> 8 & 255) + "," + (a & 255) + "," + b + ")"
  };
  e.prototype.zj = function () {
    var a, b;
    if (this.la && (this.v.Nd != this.v.mode && (this.v.Nd = this.v.mode, this.la.style.visibility = 0 < this.v.mode ? "inherit" : "hidden"), 0 < this.v.mode)) {
      this.U || (this.U = this.la.getContext("2d"));
      if (this.U.width != this.l.width || this.U.height != this.l.height) this.U.width = this.l.width, this.U.height = this.l.height;
      this.U.clear ? this.U.clear() : this.U.clearRect(0, 0, this.la.width, this.la.height);
      var c = 1;
      3 == this.v.mode &&
      (c = this.v.ea);
      for (a = 0; a < this.I.length; a++)if (b = this.I[a], "poly" == b.type) {
        var d = b.Bc;
        2 == this.v.mode && (c = b.ea);
        this.U.fillStyle = this.X(b.mb, b.Mb * c);
        this.U.strokeStyle = this.X(b.ob, b.Nb * c);
        if (0 < d.length) {
          this.U.beginPath();
          for (b = 0; b < d.length; b++) {
            var g = d[b];
            0 == b ? this.U.moveTo(g.sb, g.Ya) : this.U.lineTo(g.sb, g.Ya)
          }
          this.U.closePath();
          this.U.stroke();
          this.U.fill()
        }
      }
    }
  };
  e.prototype.Aj = function () {
    var a, b;
    this.la.style.visibility = "hidden";
    this.v.Nd != this.v.mode && (this.v.Nd = this.v.mode);
    if (0 < this.v.mode && !this.S.Yd) {
      var c =
        1;
      3 == this.v.mode && (c = this.v.ea);
      for (a = 0; a < this.I.length; a++) {
        var d = this.I[a];
        if ("poly" == d.type) {
          var g = d.Bc;
          2 == this.v.mode && (c = d.ea);
          if (0 < g.length) {
            var e = [];
            for (b = 0; b < g.length; b++)e.push(g[b].sb), e.push(g[b].Ya), e.push(0);
            this.a.useProgram(this.Db);
            this.a.enable(this.a.BLEND);
            this.a.blendFuncSeparate(this.a.SRC_ALPHA, this.a.ONE_MINUS_SRC_ALPHA, this.a.SRC_ALPHA, this.a.ONE);
            this.a.disable(this.a.DEPTH_TEST);
            b = this.a.createBuffer();
            this.a.bindBuffer(this.a.ARRAY_BUFFER, b);
            this.a.bufferData(this.a.ARRAY_BUFFER,
              new Float32Array(e), this.a.STATIC_DRAW);
            this.a.uniform2f(this.a.getUniformLocation(this.Db, "uCanvasDimensions"), this.l.width, this.l.height);
            b = this.a.getUniformLocation(this.Db, "uColor");
            this.a.uniform3f(b, (d.ob >> 16 & 255) / 255, (d.ob >> 8 & 255) / 255, (d.ob & 255) / 255);
            g = this.a.getUniformLocation(this.Db, "uAlpha");
            this.a.uniform1f(g, d.Nb * c);
            this.a.vertexAttribPointer(this.Db.ca, 3, this.a.FLOAT, !1, 0, 0);
            this.a.drawArrays(this.a.LINE_LOOP, 0, e.length / 3);
            this.a.uniform3f(b, (d.mb >> 16 & 255) / 255, (d.mb >> 8 & 255) / 255, (d.mb &
              255) / 255);
            this.a.uniform1f(g, d.Mb * c);
            this.a.enable(this.a.STENCIL_TEST);
            this.a.clearStencil(0);
            this.a.clear(this.a.STENCIL_BUFFER_BIT);
            this.a.colorMask(!1, !1, !1, !1);
            this.a.stencilFunc(this.a.ALWAYS, 1, 1);
            this.a.stencilOp(this.a.INCR, this.a.INCR, this.a.INCR);
            this.a.drawArrays(this.a.TRIANGLE_FAN, 0, e.length / 3);
            this.a.colorMask(!0, !0, !0, !0);
            this.a.stencilFunc(this.a.EQUAL, 1, 1);
            this.a.stencilOp(this.a.ZERO, this.a.ZERO, this.a.ZERO);
            this.a.drawArrays(this.a.TRIANGLE_FAN, 0, e.length / 3);
            this.a.disable(this.a.BLEND);
            this.a.enable(this.a.DEPTH_TEST);
            this.a.disable(this.a.STENCIL_TEST);
            this.a.useProgram(this.F)
          }
        }
      }
    }
  };
  e.prototype.Vg = function (a, b, c) {
    var d, g, e = !1;
    d = 0;
    for (g = a.length - 1; d < a.length; g = d++) {
      var f = a[d];
      g = a[g];
      f.Ya > c != g.Ya > c && b < (g.sb - f.sb) * (c - f.Ya) / (g.Ya - f.Ya) + f.sb && (e = !e)
    }
    return e
  };
  e.prototype.rf = function (a, b) {
    var c = -1;
    if (0 <= this.v.mode)for (var d = 0; d < this.I.length; d++) {
      var g = this.I[d];
      "poly" == g.type && g.Bc && 0 < g.Bc.length && this.Vg(g.Bc, a, b) && (c = d, g.sb = a, g.Ya = b)
    }
    return 0 <= c ? this.I[c] : !1
  };
  e.prototype.Wb = function () {
    var a;
    switch (this.g.mode) {
      case 0:
        a = this.g.b / 2;
        break;
      case 1:
        a = 180 * Math.atan(this.l.height / this.l.width * Math.tan(this.g.b / 2 * Math.PI / 180)) / Math.PI;
        break;
      case 2:
        a = 180 * Math.atan(this.l.height / Math.sqrt(this.l.width * this.l.width + this.l.height * this.l.height) * Math.tan(this.g.b / 2 * Math.PI / 180)) / Math.PI;
        break;
      case 3:
        a = 4 * this.l.height / 3 > this.l.width ? this.g.b / 2 : 180 * Math.atan(4 * this.l.height / (3 * this.l.width) * Math.tan(this.g.b / 2 * Math.PI / 180)) / Math.PI
    }
    return 2 * a
  };
  e.prototype.Ue = function (a) {
    a /= 2;
    var b;
    switch (this.g.mode) {
      case 0:
        this.g.b =
          2 * a;
        break;
      case 1:
        a = 180 * Math.atan(this.l.width / this.l.height * Math.tan(a * Math.PI / 180)) / Math.PI;
        this.g.b = 2 * a;
        break;
      case 2:
        b = Math.sqrt(this.l.width * this.l.width + this.l.height * this.l.height);
        a = 180 * Math.atan(b / this.l.height * Math.tan(a * Math.PI / 180)) / Math.PI;
        this.g.b = 2 * a;
        break;
      case 3:
        4 * this.l.height / 3 > this.l.width || (a = 180 * Math.atan(3 * this.l.width / (4 * this.l.height) * Math.tan(a * Math.PI / 180)) / Math.PI), this.g.b = 2 * a
    }
  };
  e.prototype.ab = function () {
    var a, b, c = this.l.width / this.l.height;
    if (2 == this.rb) {
      0 < this.g.Ud && (a =
        this.oc, this.f.L && 0 < this.f.L.length && (a = this.f.L[0].height), this.g.min = 100 * this.l.height / (a * this.g.Ud));
      b = this.g.b / 2;
      a = c * b;
      var d = 50 * this.f.width / (.01 + this.f.height);
      this.g.b < this.g.min && (this.g.b = this.g.min);
      this.g.b > this.g.max && (this.g.b = this.g.max);
      100 < this.g.b && (this.g.b = 100);
      this.g.b > 2 * d / c && (this.g.b = 2 * d / c);
      this.g.b > this.j.max - this.j.min && (this.g.b = this.j.max - this.j.min);
      this.g.b > this.pan.max - this.pan.min && (this.g.b = this.pan.max - this.pan.min);
      50 < this.j.b + b && (this.j.b = 50 - b);
      -50 > this.j.b - b && (this.j.b =
        -50 + b);
      this.pan.b + a > d && (this.pan.b = d - a, this.u.active && (this.u.speed = -this.u.speed, this.pan.d = 0));
      this.pan.b - a < -d && (this.pan.b = -d + a, this.u.active && (this.u.speed = -this.u.speed, this.pan.d = 0));
      this.j.b + b > this.j.max && (this.j.b = this.j.max - b);
      this.j.b - b < this.j.min && (this.j.b = this.j.min + b)
    } else if (0 < this.g.Ud && (a = this.oc, this.f.L && 0 < this.f.L.length && (a = this.f.L[0].height), this.g.min = 360 * Math.atan2(this.l.height / 2, a / 2 * this.g.Ud) / Math.PI), this.g.b < this.g.min && (this.g.b = this.g.min), this.g.b > this.g.max && (this.g.b =
        this.g.max), b = this.Wb() / 2, a = 180 * Math.atan(this.l.width / this.l.height * Math.tan(b * Math.PI / 180)) / Math.PI, 2 * b > this.j.max - this.j.min && (b = (this.j.max - this.j.min) / 2, this.Ue(2 * b)), 90 > this.j.max ? this.j.b + b > this.j.max && (this.j.b = this.j.max - b) : this.j.b > this.j.max && (this.j.b = this.j.max), -90 < this.j.min ? this.j.b - b < this.j.min && (this.j.b = this.j.min + b) : this.j.b < this.j.min && (this.j.b = this.j.min), c = this.pan.max - this.pan.min, 359.99 > c) {
      var d = 90, g = Math.tan(b * Math.PI / 180), e = Math.tan((Math.abs(this.j.b) + b) * Math.PI / 180),
        e = Math.sqrt(e * e + 1) / Math.sqrt(g * g + 1);
      b = 180 * Math.atan(e * Math.tan(a * Math.PI / 180)) / Math.PI;
      2 * b > c && (e = Math.tan(c * Math.PI / 360) / Math.tan(a * Math.PI / 180), c = e * Math.sqrt(g * g + 1), e = Math.sqrt(c * c - 1), d = 180 / Math.PI * Math.atan(e));
      this.pan.b + b > this.pan.max && (this.pan.b = this.pan.max - b, this.u.active && (this.u.speed = -this.u.speed, this.pan.d = 0));
      this.pan.b - b < this.pan.min && (this.pan.b = this.pan.min + b, this.u.active && (this.u.speed = -this.u.speed, this.pan.d = 0));
      this.j.b + a > d && (this.j.b = d - a);
      this.j.b - a < -d && (this.j.b = -d + a)
    }
  };
  e.prototype.update =
    function (a) {
      void 0 === a && (a = 0);
      this.Ca = !0;
      a && (this.qe = a)
    };
  e.prototype.Oi = function () {
    return this.Y ? !!this.Y.isTileLoading : 0 < this.ja || 0 < this.Oc
  };
  e.prototype.$d = function () {
    var a = Date.now(), b;
    this.Sa ? this.Y && (this.vk(), 2 === this.rb ? (this.ab(), this.ab(), this.ef()) : 0 === this.rb && (b = this.bc(), this.Xg(this.l.width / 2, this.l.height / 2, b), this.ef())) : (this.ab(), 2 === this.rb ? (this.ab(), this.ef(), this.zk()) : 0 === this.rb && (b = this.bc(), this.Xg(this.l.width / 2, this.l.height / 2, b), this.ef(), this.be ? this.Ek() : this.ai && this.$h(),
          this.Vh(), this.ka ? (this.o.$c ? this.Dk() : 0 < this.f.L.length ? this.Ck() : this.Bk(), this.Aj()) : (this.Hb ? 0 < this.f.L.length ? this.yk() : this.xk() : this.ae && this.uk(), this.zj()), this.Ea && this.Ea.yj()));
    50 < Date.now() - a ? this.Oe || (2 < this.cg ? (this.Oe = !0, this.Sc()) : this.cg++) : this.cg = 0;
    this.Id && this.f.Eh++
  };
  e.prototype.Bk = function () {
    var a;
    this.ab();
    if (this.l.width != this.w.offsetWidth || this.l.height != this.w.offsetHeight) this.l.width = this.w.offsetWidth, this.l.height = this.w.offsetHeight;
    this.ue && (this.xc(0), this.Sc());
    if (this.a)for (this.f.mc && 6 < this.f.mc.length && (a = parseInt(this.f.mc), this.a.clearColor((a >> 16 & 255) / 255, (a >> 8 & 255) / 255, (a >> 0 & 255) / 255, 1)), this.a.clear(this.a.DEPTH_BUFFER_BIT), D(this.qb), L(this.Wb(), this.Ta.width / this.Ta.height, this.qb), this.a.uniformMatrix4fv(this.F.Mc, !1, this.qb), a = 0; 6 > a; a++)D(this.P), K(this.P, -this.G.b * Math.PI / 180, [0, 0, 1]), K(this.P, -this.j.b * Math.PI / 180, [1, 0, 0]), K(this.P, (180 - this.pan.b) * Math.PI / 180, [0, 1, 0]), this.oa && (K(this.P, -this.oa.pitch * Math.PI / 180, [1, 0, 0]), K(this.P, this.oa.G *
      Math.PI / 180, [0, 0, 1])), 4 > a ? K(this.P, -Math.PI / 2 * a, [0, 1, 0]) : K(this.P, Math.PI / 2 * (5 == a ? 1 : -1), [1, 0, 0]), this.a.bindBuffer(this.a.ARRAY_BUFFER, this.tf), this.a.vertexAttribPointer(this.F.ca, 3, this.a.FLOAT, !1, 0, 0), this.a.bindBuffer(this.a.ARRAY_BUFFER, this.oe), this.a.vertexAttribPointer(this.F.Ga, 2, this.a.FLOAT, !1, 0, 0), 6 <= this.eb.length && this.eb[a].loaded && (this.a.activeTexture(this.a.TEXTURE0), this.a.bindTexture(this.a.TEXTURE_2D, this.eb[a]), this.a.bindBuffer(this.a.ELEMENT_ARRAY_BUFFER, this.ne), this.a.uniform1i(this.F.Pe,
      0), this.a.uniformMatrix4fv(this.F.He, !1, this.P), this.a.uniformMatrix4fv(this.F.Mc, !1, this.qb), this.a.drawElements(this.a.TRIANGLES, 6, this.a.UNSIGNED_SHORT, 0))
  };
  e.prototype.nk = function (a) {
    var b = this;
    return function () {
      b.Ca = !0;
      b.cc = !0;
      a.loaded = !0;
      var c = b.a;
      b.ja && b.ja--;
      0 == b.ja && b.D && b.D.ggLoadedLevels && b.D.ggLoadedLevels();
      c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, 1);
      if (null != a.f && a.f.complete) {
        a.Pb = c.createTexture();
        c.bindTexture(c.TEXTURE_2D, a.Pb);
        try {
          c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, c.RGBA, c.UNSIGNED_BYTE,
            a.f)
        } catch (d) {
          c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, 1, 1, 0, c.RGBA, c.UNSIGNED_BYTE, new Uint8Array([128, 128, 128, 250]))
        }
        c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.LINEAR);
        c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, c.LINEAR);
        c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, c.CLAMP_TO_EDGE);
        c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, c.CLAMP_TO_EDGE);
        c.bindTexture(c.TEXTURE_2D, null)
      }
      b.update()
    }
  };
  e.prototype.sj = function (a) {
    var b = this;
    return function () {
      b.Ca = !0;
      b.cc = !0;
      try {
        if (null != a && a.complete) {
          var c =
            {width: a.width, height: a.width, cache: !0, Uf: !0, Ma: 1, Fb: 1, $: []}, d;
          for (d = 0; 6 > d; d++) {
            var g = {C: null, da: null, f: null, Pb: null};
            g.C = document.createElement("canvas");
            b.ka ? (g.C.width = c.width, g.C.height = c.height) : (g.C.width = b.f.Z + 2 * b.f.Va, g.C.height = b.f.Z + 2 * b.f.Va);
            g.da = g.C.getContext("2d");
            g.C.Rg = g.da;
            g.C.style[b.Aa + "Origin"] = "0% 0%";
            g.C.style.overflow = "hidden";
            g.C.style.position = "absolute";
            g.f = a;
            g.da && (b.Hb ? g.da.drawImage(a, 0, d * c.height, c.width, c.height, 0, 0, c.width + 2, c.height + 2) : g.da.drawImage(a, 0, d * c.height,
                c.width, c.height, 0, 0, c.width, c.height));
            if (b.ka && b.a) {
              var e = b.a;
              e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, 1);
              g.Pb = e.createTexture();
              e.bindTexture(e.TEXTURE_2D, g.Pb);
              try {
                e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, g.C)
              } catch (f) {
              }
              e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR);
              e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR);
              e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE);
              e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
              e.bindTexture(e.TEXTURE_2D,
                null)
            }
            b.Hb && (g.C.wc = -1, b.w.insertBefore(g.C, b.w.firstChild));
            c.$[d] = g
          }
          b.f.L.push(c)
        }
      } catch (f) {
      }
      b.update()
    }
  };
  e.prototype.Rh = function () {
    var a = this;
    return function () {
      a.Ca = !0;
      a.cc = !0;
      a.ja && a.ja--;
      0 == a.ja && a.D && a.D.ggLoadedLevels && a.D.ggLoadedLevels()
    }
  };
  e.prototype.Ck = function () {
    this.ab();
    var a, b, c;
    this.ue && (this.xc(0), this.Sc());
    if (this.a) {
      if (this.f.mc && 6 < this.f.mc.length) {
        var d = parseInt(this.f.mc);
        this.a.clearColor((d >> 16 & 255) / 255, (d >> 8 & 255) / 255, (d >> 0 & 255) / 255, 1)
      }
      this.a.clear(this.a.DEPTH_BUFFER_BIT);
      this.a.enable(this.a.DEPTH_TEST);
      D(this.qb);
      L(this.Wb(), this.Ta.width / this.Ta.height, this.qb);
      this.a.uniformMatrix4fv(this.F.Mc, !1, this.qb);
      this.Oc = 0;
      this.Xh();
      this.qh();
      var g = this.Ag(), e, d = this.f.L;
      for (e = d.length - 1; e >= g;) {
        var f = d[e], k = 1;
        e == d.length - 1 && 0 == this.f.Va && (k = this.f.Z / (this.f.Z - .5));
        for (var m = 0; 6 > m; m++) {
          var p;
          p = this.Pa.Ja[m];
          var l = p.bd;
          if (p.Ab && 0 < l.pd && 0 < l.de && 0 < l.scale || f.cache) {
            p.Ca = !1;
            var r;
            p.Tc[e] || (p.Tc[e] = {gb: 0, vb: 0, Bb: 0, Cb: 0});
            r = p.Tc[e];
            f.cache ? (r.gb = 0, r.vb = 0, r.Bb = f.Ma - 1, r.Cb = f.Fb -
                1) : this.Qg(f, l, r);
            l = !0;
            for (b = r.vb; b <= r.Cb; b++)for (a = r.gb; a <= r.Bb; a++) {
              c = a + b * f.Ma + m * f.Ma * f.Fb;
              var q = f.$[c];
              q || (q = f.$[c] = {});
              this.ja < this.Ye ? q.f || (q.f = new Image, q.f.onload = this.nk(q), q.f.onerror = this.Rh(), q.f.onabort = this.Rh(), q.f.crossOrigin = this.crossOrigin, q.f.setAttribute("src", this.$e(m, e, a, b)), f.cache && this.bb.push(q.f), 0 == this.ja && this.D && this.D.ggReLoadedLevels && this.D.ggReLoadedLevels(), this.ja++, this.Ca = !0) : this.Oc++;
              if (q.Pb) {
                if (!q.Gd) {
                  var t;
                  t = .5 * e + 1;
                  q.Gd = this.a.createBuffer();
                  this.a.bindBuffer(this.a.ARRAY_BUFFER,
                    q.Gd);
                  var v = [-1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1];
                  v[3] = a * this.f.Z - this.f.Va;
                  v[0] = Math.min((a + 1) * this.f.Z, f.width) + this.f.Va;
                  v[7] = b * this.f.Z - this.f.Va;
                  v[1] = Math.min((b + 1) * this.f.Z, f.height) + this.f.Va;
                  v[4] = v[1];
                  v[6] = v[3];
                  v[9] = v[0];
                  v[10] = v[7];
                  for (c = 0; 12 > c; c++)v[c] = 0 == c % 3 ? k * t * (-2 * v[c] / f.width + 1) : 1 == c % 3 ? k * t * (-2 * v[c] / f.height + 1) : t;
                  this.a.bufferData(this.a.ARRAY_BUFFER, new Float32Array(v), this.a.STATIC_DRAW)
                }
              } else l = !1;
              q.visible = p.Ab
            }
            r.mh = l
          }
        }
        e--
      }
      for (m = 0; 6 > m; m++)if (p = this.Pa.Ja[m], p.Ab)for (l = p.bd, D(this.P), K(this.P,
        -this.G.b * Math.PI / 180, [0, 0, 1]), K(this.P, -this.j.b * Math.PI / 180, [1, 0, 0]), K(this.P, (180 - this.pan.b) * Math.PI / 180, [0, 1, 0]), this.oa && (K(this.P, -this.oa.pitch * Math.PI / 180, [1, 0, 0]), K(this.P, this.oa.G * Math.PI / 180, [0, 0, 1])), 4 > m ? K(this.P, -Math.PI / 2 * m, [0, 1, 0]) : K(this.P, Math.PI / 2 * (5 == m ? 1 : -1), [1, 0, 0]), this.a.uniform1i(this.F.Pe, 0), this.a.uniformMatrix4fv(this.F.Mc, !1, this.qb), this.a.uniformMatrix4fv(this.F.He, !1, this.P), this.a.bindBuffer(this.a.ARRAY_BUFFER, this.oe), this.a.vertexAttribPointer(this.F.Ga, 2, this.a.FLOAT,
        !1, 0, 0), this.a.activeTexture(this.a.TEXTURE0), this.a.bindBuffer(this.a.ELEMENT_ARRAY_BUFFER, this.ne), this.a.useProgram(this.F), e = g; e <= d.length - 1;) {
        f = d[e];
        if (p.Ab && 0 < l.pd && p.Tc[e] && 0 <= p.Tc[e].gb) {
          r = p.Tc[e];
          for (b = r.vb; b <= r.Cb; b++)for (a = r.gb; a <= r.Bb; a++)c = a + b * f.Ma + m * f.Ma * f.Fb, (q = f.$[c]) || (q = f.$[c] = {}), q.Pb && (this.a.uniform1f(this.F.ii, 1E-4 * (a % 2 + b % 2 * 2)), this.a.bindBuffer(this.a.ARRAY_BUFFER, q.Gd), this.a.vertexAttribPointer(this.F.ca, 3, this.a.FLOAT, !1, 0, 0), this.a.bindTexture(this.a.TEXTURE_2D, q.Pb), this.a.texParameteri(this.a.TEXTURE_2D,
            this.a.TEXTURE_MAG_FILTER, this.a.LINEAR), this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_MIN_FILTER, this.a.LINEAR), this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_WRAP_S, this.a.CLAMP_TO_EDGE), this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_WRAP_T, this.a.CLAMP_TO_EDGE), this.a.drawElements(this.a.TRIANGLES, 6, this.a.UNSIGNED_SHORT, 0)), q.visible = p.Ab;
          r.mh && (e = d.length)
        }
        e++
      }
      for (a = 0; a < d.length; a++)if (f = d[a], !f.cache)for (var w in f.$)f.$.hasOwnProperty(w) && (q = f.$[w], q.visible || (q.Pb && this.a.deleteTexture(q.Pb),
        q.f = null, q.Gd && this.a.deleteBuffer(q.Gd), delete f.$[w]));
      this.cc = !1
    }
  };
  e.prototype.Ek = function () {
    this.a.disable(this.a.DEPTH_TEST);
    var a;
    for (a = 0; a < this.J.length; a++) {
      var b = this.J[a];
      D(this.P);
      K(this.P, -this.G.b * Math.PI / 180, [0, 0, 1]);
      K(this.P, -this.j.b * Math.PI / 180, [1, 0, 0]);
      K(this.P, (180 - this.pan.b) * Math.PI / 180, [0, 1, 0]);
      K(this.P, b.pan * Math.PI / 180, [0, 1, 0]);
      K(this.P, -b.j * Math.PI / 180, [1, 0, 0]);
      F(this.P, [0, 0, 1]);
      K(this.P, b.Ra * Math.PI / 180, [0, 0, 1]);
      K(this.P, -b.wa * Math.PI / 180, [0, 1, 0]);
      K(this.P, b.pa * Math.PI / 180,
        [1, 0, 0]);
      var c = Math.tan(b.g / 2 * Math.PI / 180), d = b.mg;
      d || (d = 16 / 9);
      var g = this.P, c = [c, c / d, 1], d = c[0], e = c[1], c = c[2];
      g[0] *= d;
      g[1] *= d;
      g[2] *= d;
      g[3] *= d;
      g[4] *= e;
      g[5] *= e;
      g[6] *= e;
      g[7] *= e;
      g[8] *= c;
      g[9] *= c;
      g[10] *= c;
      g[11] *= c;
      F(this.P, [0, 0, -1]);
      this.a.bindBuffer(this.a.ARRAY_BUFFER, this.tf);
      this.a.vertexAttribPointer(this.F.ca, 3, this.a.FLOAT, !1, 0, 0);
      this.a.bindBuffer(this.a.ARRAY_BUFFER, this.oe);
      this.a.vertexAttribPointer(this.F.Ga, 2, this.a.FLOAT, !1, 0, 0);
      this.a.activeTexture(this.a.TEXTURE0);
      this.a.bindTexture(this.a.TEXTURE_2D,
        b.Gb);
      this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_MAG_FILTER, this.a.LINEAR);
      this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_MIN_FILTER, this.a.LINEAR);
      this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_WRAP_S, this.a.CLAMP_TO_EDGE);
      this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_WRAP_T, this.a.CLAMP_TO_EDGE);
      this.a.bindBuffer(this.a.ELEMENT_ARRAY_BUFFER, this.ne);
      this.a.uniform1i(this.F.Pe, 0);
      this.a.uniformMatrix4fv(this.F.He, !1, this.P);
      this.a.uniformMatrix4fv(this.F.Mc, !1, this.qb);
      this.a.drawElements(this.a.TRIANGLES, 6, this.a.UNSIGNED_SHORT, 0)
    }
    this.a.enable(this.a.DEPTH_TEST)
  };
  e.prototype.Dk = function () {
    this.ab();
    var a;
    if (this.l.width != this.w.offsetWidth || this.l.height != this.w.offsetHeight) this.l.width = this.w.offsetWidth, this.l.height = this.w.offsetHeight;
    this.ue && (this.xc(0), this.Sc());
    if (this.a)for (D(this.qb), L(this.Wb(), this.Ta.width / this.Ta.height, this.qb), this.a.uniformMatrix4fv(this.F.Mc, !1, this.qb), this.a.bindTexture(this.a.TEXTURE_2D, this.o.Gb), a = 0; 1 > a; a++)D(this.P),
      K(this.P, -this.G.b * Math.PI / 180, [0, 0, 1]), K(this.P, -this.j.b * Math.PI / 180, [1, 0, 0]), K(this.P, (180 - this.pan.b) * Math.PI / 180, [0, 1, 0]), this.oa && (K(this.P, -this.oa.pitch * Math.PI / 180, [1, 0, 0]), K(this.P, this.oa.G * Math.PI / 180, [0, 0, 1])), this.a.bindBuffer(this.a.ARRAY_BUFFER, this.o.ig), this.a.vertexAttribPointer(this.F.ca, 3, this.a.FLOAT, !1, 0, 0), this.a.bindBuffer(this.a.ARRAY_BUFFER, this.o.Xe), this.a.vertexAttribPointer(this.F.Ga, 2, this.a.FLOAT, !1, 0, 0), this.a.activeTexture(this.a.TEXTURE0), this.a.bindBuffer(this.a.ELEMENT_ARRAY_BUFFER,
      this.o.If), this.a.uniform1i(this.F.Pe, 0), this.a.uniformMatrix4fv(this.F.He, !1, this.P), this.a.uniformMatrix4fv(this.F.Mc, !1, this.qb), this.a.drawElements(this.a.TRIANGLES, 36, this.a.UNSIGNED_SHORT, 0)
  };
  e.prototype.xk = function () {
    this.ab();
    var a = !1;
    if (this.l.width != this.w.offsetWidth || this.l.height != this.w.offsetHeight) this.l.width = this.w.offsetWidth, this.l.height = this.w.offsetHeight, this.w.style[this.Aa + "OriginX"] = this.l.width / 2 + "px", this.w.style[this.Aa + "OriginY"] = this.l.height / 2 + "px", a = !0;
    var b = Math.round(this.bc());
    this.Od == b && !a || this.Eb || (this.Od = b, this.w.style[this.dc] = b + "px");
    this.Pa.yi(this.pan.b, this.j.b, this.G.b, this.oa);
    for (a = 0; 6 > a; a++) {
      var c, d;
      if (c = this.Pa.Ja[a]) d = "", this.Eb ? (d += "translate3d(" + this.l.width / 2 + "px," + this.l.height / 2 + "px,0px) ", d += "perspective(" + b + "px) ", d += "translate3d(0px,0px," + b + "px) ") : d += "translate3d(" + this.l.width / 2 + "px," + this.l.height / 2 + "px," + b + "px) ", d += "rotateZ(" + Number(this.G.b).toFixed(10) + "deg) ", d += "rotateX(" + Number(this.j.b).toFixed(10) + "deg) ", d += "rotateY(" + Number(-this.pan.b).toFixed(10) +
        "deg) ", c.Sg && (d += c.Sg, c.Ab || (d = "translate3d(-10px,-10px,0px) scale(0.001,0.001)"), c.C.style[this.Aa] = d)
    }
  };
  e.prototype.uk = function () {
    this.ab();
    var a;
    this.pb && (a = this.pb.getContext("2d"));
    if (this.l.width !== this.w.offsetWidth || this.l.height !== this.w.offsetHeight) this.l.width = this.w.offsetWidth, this.l.height = this.w.offsetHeight;
    if (a) {
      var b = a.canvas.width / 2, c = a.canvas.height / 2, d = a.createRadialGradient(b, c, 5, b, c, Math.max(b, c));
      d.addColorStop(0, "#333");
      d.addColorStop(1, "#fff");
      a.rect(0, 0, a.canvas.width,
        a.canvas.height);
      a.fillStyle = d;
      a.fill();
      a.fillStyle = "#f00";
      a.font = "20px Helvetica";
      a.textAlign = "center";
      a.fillText("Pan: " + this.pan.b.toFixed(1), b, c - 60);
      a.fillText("Tilt: " + this.j.b.toFixed(1), b, c - 30);
      a.fillText("Fov: " + this.g.b.toFixed(1), b, c + 0);
      a.fillText("Node: " + this.Kg(), b, c + 30);
      a.fillText("Title: " + this.od.title, b, c + 60)
    }
  };
  e.prototype.vk = function () {
    this.ab();
    if (this.l.width !== this.w.offsetWidth || this.l.height !== this.w.offsetHeight) this.l.width = this.w.offsetWidth, this.l.height = this.w.offsetHeight;
    this.Y && this.Y.setPan && (this.Y.setPan(this.pan.b), this.Y.setTilt(this.j.b), this.Y.setFov(this.g.b))
  };
  e.prototype.zk = function () {
    this.la.style.visibility = "inherit";
    this.U || (this.U = this.la.getContext("2d"));
    if (this.U.width != this.l.width || this.U.height != this.l.height) this.U.width = this.l.width, this.U.height = this.l.height;
    this.U.clear ? this.U.clear() : this.U.clearRect(0, 0, this.la.width, this.la.height);
    this.Oc = 0;
    this.ab();
    var a, b, c;
    b = 100 / this.g.b;
    c = this.f.width / this.f.height;
    var d = this.l.height * b * c;
    b *= this.l.height;
    a = (this.pan.b / 100 / c - .5) * d + this.l.width / 2;
    for (var g = (this.j.b / 100 - .5) * b + this.l.height / 2, e, f, k, m, p = 0; this.f.L.length >= p + 2 && this.f.L[p + 1].width > d;)p++;
    var l, r;
    r = [];
    for (l = this.f.L.length - 1; l >= p;) {
      c = this.f.L[l];
      var q;
      if (c.cache) q = {gb: 0, vb: 0}, q.Bb = c.Ma - 1, q.Cb = c.Fb - 1; else {
        q = {};
        var t = -g / b * (c.height / this.f.Z);
        e = (-a + this.l.width) / d * (c.width / this.f.Z);
        f = (-g + this.l.height) / b * (c.height / this.f.Z);
        q.gb = Math.min(Math.max(0, Math.floor(-a / d * (c.width / this.f.Z))), c.Ma - 1);
        q.vb = Math.min(Math.max(0, Math.floor(t)), c.Fb -
          1);
        q.Bb = Math.min(Math.max(0, Math.floor(e)), c.Ma - 1);
        q.Cb = Math.min(Math.max(0, Math.floor(f)), c.Fb - 1)
      }
      r[l] = q;
      var v = !0;
      for (f = q.vb; f <= q.Cb; f++)for (e = q.gb; e <= q.Bb; e++)m = e + f * c.Ma, (t = c.$[m]) || (t = c.$[m] = {}), this.ja < this.Ye ? t.f || (t.f = new Image, t.f.onload = this.mk(), t.f.onerror = this.Ze(t), t.f.onabort = this.Ze(t), t.f.crossOrigin = this.crossOrigin, t.f.setAttribute("src", this.$e(0, l, e, f)), c.cache && this.bb.push(t.f), 0 == this.ja && this.D && this.D.ggReLoadedLevels && this.D.ggReLoadedLevels(), this.ja++, this.Ca = !0) : this.Oc++,
      t.f && t.f.complete || (v = !1), t.visible = !0;
      q.mh = v;
      l--
    }
    for (l = this.f.L.length - 1; l >= p;) {
      c = this.f.L[l];
      if (r[l] && 0 <= r[l].gb)for (q = r[l], f = q.vb; f <= q.Cb; f++)for (e = q.gb; e <= q.Bb; e++)m = e + f * c.Ma, (t = c.$[m]) || (t = c.$[m] = {}), t.f && t.f.complete && this.U.drawImage(t.f, a + (-this.f.Va + this.f.Z * e) * d / c.width, g + (-this.f.Va + this.f.Z * f) * b / c.height, t.f.width * d / c.width, t.f.height * b / c.height), t.visible = !0;
      l--
    }
    for (d = 0; d < this.f.L.length; d++)if (c = this.f.L[d], !c.cache)for (k in c.$)c.$.hasOwnProperty(k) && (t = c.$[k], t.visible || (t.f = null,
      delete c.$[k]));
    if (0 < this.v.mode)for (d = 1, 3 == this.v.mode && (d = this.v.ea), k = 0; k < this.I.length; k++)if (c = this.I[k], "poly" == c.type && (b = c.Bc, 2 == this.v.mode && (d = c.ea), 0 < b.length)) {
      this.U.fillStyle = this.X(c.mb, c.Mb * d);
      this.U.strokeStyle = this.X(c.ob, c.Nb * d);
      this.U.beginPath();
      for (c = 0; c < b.length; c++)a = b[c], 0 == c ? this.U.moveTo(a.sb, a.Ya) : this.U.lineTo(a.sb, a.Ya);
      this.U.closePath();
      this.U.stroke();
      this.U.fill()
    }
    this.cc = !1
  };
  e.prototype.lk = function (a) {
    var b = this;
    return function () {
      b.Ca = !0;
      b.cc = !0;
      a.loaded = !0;
      a.f && !a.C && b.w.appendChild(a.f);
      b.ja && b.ja--;
      0 == b.ja && b.D && b.D.ggLoadedLevels && b.D.ggLoadedLevels();
      a.f && a.da && (a.da.drawImage(a.f, 0, 0), a.f = null)
    }
  };
  e.prototype.mk = function () {
    var a = this;
    return function () {
      a.Ca = !0;
      a.cc = !0;
      a.ja && a.ja--;
      0 == a.ja && a.D && a.D.ggLoadedLevels && a.D.ggLoadedLevels()
    }
  };
  e.prototype.Ze = function (a) {
    var b = this;
    return function () {
      b.Ca = !0;
      b.cc = !0;
      b.ja && b.ja--;
      0 == b.ja && b.D && b.D.ggLoadedLevels && b.D.ggLoadedLevels();
      a.f = null
    }
  };
  e.prototype.Qg = function (a, b, c) {
    c.gb = a.width / this.f.Z * b.zd;
    c.vb = a.height /
      this.f.Z * b.Ad;
    c.Bb = a.width / this.f.Z * b.Rd;
    c.Cb = a.height / this.f.Z * b.Sd;
    c.gb = Math.min(Math.max(0, Math.floor(c.gb)), a.Ma - 1);
    c.vb = Math.min(Math.max(0, Math.floor(c.vb)), a.Fb - 1);
    c.Bb = Math.min(Math.max(0, Math.floor(c.Bb)), a.Ma - 1);
    c.Cb = Math.min(Math.max(0, Math.floor(c.Cb)), a.Fb - 1)
  };
  e.prototype.Xj = function (a) {
    a = Math.round(a);
    this.Eb = 0 < (a & 1);
    this.fd = 0 < (a & 2);
    this.gf = 0 < (a & 4);
    this.Oe = 0 < (a & 8);
    4096 <= a && (this.Hb = 0 < (a & 4096), this.ka = 0 < (a & 8192), this.ae = 0 < (a & 32768))
  };
  e.prototype.aj = function () {
    var a = 0;
    this.Eb && (a |= 1);
    this.fd && (a |= 2);
    this.gf && (a |= 4);
    this.Hb && (a |= 4096);
    this.ka && (a |= 8192);
    this.ae && (a |= 32768);
    return a
  };
  e.prototype.Xh = function () {
    var a;
    if (!(6 > this.Pa.Ja.length))for (a = 0; 6 > a; a++) {
      var b;
      b = this.Pa.Ja[a];
      var c;
      c = [];
      c.push(new y(-1, -1, -1, 0, 0));
      c.push(new y(1, -1, -1, 1, 0));
      c.push(new y(1, 1, -1, 1, 1));
      c.push(new y(-1, 1, -1, 0, 1));
      for (var d = 0; 4 > d; d++)4 > a ? c[d].wa(-Math.PI / 2 * a) : c[d].pa(Math.PI / 2 * (4 == a ? -1 : 1)), this.oa && (c[d].Ra(this.oa.G * Math.PI / 180), c[d].pa(-this.oa.pitch * Math.PI / 180)), c[d].wa(-this.pan.b * Math.PI / 180),
        c[d].pa(this.j.b * Math.PI / 180), c[d].Ra(this.G.b * Math.PI / 180);
      c = this.sf(c);
      b.Ab = 0 < c.length;
      if (b.Ab) {
        b = b.bd;
        b.zd = c[0].$b;
        b.Rd = c[0].$b;
        b.Ad = c[0].$a;
        b.Sd = c[0].$a;
        for (d = 1; d < c.length; d++)b.zd = Math.min(b.zd, c[d].$b), b.Rd = Math.max(b.Rd, c[d].$b), b.Ad = Math.min(b.Ad, c[d].$a), b.Sd = Math.max(b.Sd, c[d].$a);
        b.pd = b.Rd - b.zd;
        b.de = b.Sd - b.Ad;
        b.scale = Math.max(b.pd, b.de)
      } else b.bd.pd = -1, b.bd.de = -1
    }
  };
  e.prototype.qh = function () {
    for (var a = 0; a < this.f.L.length; a++) {
      var b = this.f.L[a], c;
      for (c in b.$)b.$.hasOwnProperty(c) && (b.$[c].visible = !1)
    }
  };
  e.prototype.Ag = function () {
    for (var a = 0, b = Math.tan(this.Wb() * Math.PI / 360), c = this.l.height / (2 * b), c = c * (1 + this.l.width / this.l.height * b / 2), c = c * Math.pow(2, 1 < (window.devicePixelRatio || 1) ? this.f.oh : this.f.nh); this.f.L.length >= a + 2 && !this.f.L[a + 1].Uf && this.f.L[a + 1].width > c;)a++;
    return a
  };
  e.prototype.yk = function () {
    this.ab();
    var a = !1, b, c, d;
    if (this.l.width !== this.w.offsetWidth || this.l.height !== this.w.offsetHeight) this.l.width = this.w.offsetWidth, this.l.height = this.w.offsetHeight, this.w.style[this.Aa + "OriginX"] =
      this.l.width / 2 + "px", this.w.style[this.Aa + "OriginY"] = this.l.height / 2 + "px", a = !0;
    var g = Math.round(this.bc());
    if (this.Od != g || a) this.Od = g, this.Eb || (this.w.style[this.dc] = g + "px", this.w.style[this.dc + "Origin"] = "50% 50%");
    this.Oc = 0;
    if (0 < this.f.L.length) {
      this.Xh();
      this.qh();
      var e;
      e = "";
      for (b = 0; 6 > b; b++) {
        var f;
        f = this.Pa.Ja[b];
        f.Ab && (e = e + b + ",")
      }
      var k = this.Ag(), m;
      for (m = this.f.L.length - 1; m >= k;) {
        var a = this.f.L[m], p = 1;
        m == this.f.L.length - 1 && 0 == this.f.Va && (p = this.f.Z / (this.f.Z - 2));
        for (b = 0; 6 > b; b++) {
          f = this.Pa.Ja[b];
          var l =
            f.bd;
          if (f.Ab && 0 < l.pd && 0 < l.de && 0 < l.scale || a.cache) {
            f.Ca = !1;
            var r;
            r = {};
            a.cache ? (r.gb = 0, r.vb = 0, r.Bb = a.Ma - 1, r.Cb = a.Fb - 1) : this.Qg(a, l, r);
            for (d = r.vb; d <= r.Cb; d++)for (c = r.gb; c <= r.Bb; c++) {
              e = c + d * a.Ma + b * a.Ma * a.Fb;
              (l = a.$[e]) || (l = a.$[e] = {});
              if (!l.C && this.ja < this.Ye) {
                if (0 < this.df.length) {
                  l.C = this.df.shift();
                  for (e = this.w.firstChild; e && e.wc && (-1 == e.wc || e.wc >= m);)e = e.nextSibling;
                  this.w.insertBefore(l.C, e);
                  l.da = l.C.Rg
                } else if (this.Qh < this.rh) {
                  this.Qh++;
                  l.C = document.createElement("canvas");
                  l.C.width = this.f.Z + 2 * this.f.Va;
                  l.C.height = this.f.Z + 2 * this.f.Va;
                  l.da = l.C.getContext("2d");
                  l.C.Rg = l.da;
                  l.C.style[this.Aa + "Origin"] = "0% 0%";
                  l.C.style.overflow = "hidden";
                  l.C.style.position = "absolute";
                  for (e = this.w.firstChild; e && e.wc && (-1 == e.wc || e.wc >= m);)e = e.nextSibling;
                  this.w.insertBefore(l.C, e)
                }
                l.C && (l.f = new Image, l.f.crossOrigin = this.crossOrigin, l.f.style[this.Aa + "Origin"] = "0% 0%", l.f.style.position = "absolute", l.f.style.overflow = "hidden", l.C.wc = m, l.f.onload = this.lk(l), l.f.onerror = this.Ze(l), l.f.onabort = this.Ze(l), l.f.setAttribute("src",
                  this.$e(b, m, c, d)), a.cache && this.bb.push(l.f), 0 == this.ja && this.D && this.D.ggReLoadedLevels && this.D.ggReLoadedLevels(), this.ja++, this.Ca = !0)
              } else this.Oc++;
              if (l.C) {
                e = "";
                this.Eb ? (e += "translate3d(" + this.l.width / 2 + "px," + this.l.height / 2 + "px,0px) ", e += " perspective(" + g + "px) ", e += "translate3d(0px,0px," + g + "px) ") : e += "translate3d(" + this.l.width / 2 + "px," + this.l.height / 2 + "px," + g + "px) ";
                e += "rotateZ(" + Number(this.G.b).toFixed(10) + "deg) rotateX(" + Number(this.j.b).toFixed(10) + "deg) rotateY(" + Number(-this.pan.b).toFixed(10) +
                  "deg) ";
                this.oa && (e += "rotateX(" + Number(-this.oa.pitch).toFixed(10) + "deg) rotateZ(" + Number(this.oa.G).toFixed(10) + "deg) ");
                e = 4 > b ? e + ("rotateY(" + -90 * b + "deg)") : e + ("rotateX(" + (4 == b ? -90 : 90) + "deg)");
                var q;
                this.fd ? (q = this.td / this.f.Z * (this.f.Z / a.width) * (2 * m + 1), q = this.Ic ? 2 / Math.tan(this.g.b * Math.PI / 360) * q : 2 * q, e += " scale(" + q * p * p + ")") : q = 1 / (p * p);
                e += " translate3d(" + (1 / p * c * this.f.Z - this.f.Va - a.width / 2) + "px," + (1 / p * d * this.f.Z - this.f.Va - a.width / 2) + "px," + -a.width * q / 2 + "px)";
                f.Ab && (l.visible = !0, l.C ? l.C.style[this.Aa] =
                    e : l.f && (l.f.style[this.Aa] = e))
              }
            }
          }
        }
        m--
      }
      for (g = 0; g < this.f.L.length; g++) {
        var a = this.f.L[g], t;
        for (t in a.$)a.$.hasOwnProperty(t) && (l = a.$[t], !l.visible && l.C && (a.cache ? (e = "translate3d(-10px,-10px,0px) scale(0.001,0.001)", l.C ? l.C.style[this.Aa] = e : l.f && (l.f.style[this.Aa] = "")) : (l.da && (l.da.clear ? l.da.clear() : l.da.clearRect(0, 0, l.da.canvas.width, l.da.canvas.height)), this.df.push(l.C), l.C ? (e = "translate3d(-10px,-10px,0px) scale(0.001,0.001)", l.C.style[this.Aa] = e, l.C.wc = -1) : l.loaded && this.w.removeChild(l.f), l.C =
            null, l.f = null, l.da = null, delete a.$[t])))
      }
      this.cc = !1
    }
  };
  e.prototype.Vh = function () {
    var a = Math.round(this.bc()), b;
    this.Eb || this.Uh(a);
    for (b = 0; b < this.Ua.length; b++) {
      var c;
      c = this.Ua[b];
      c.Zh(a);
      c.c.hidden = !1
    }
  };
  e.prototype.$h = function () {
    for (var a = Math.round(this.bc()), b = 0; b < this.J.length; b++) {
      var c;
      c = this.J[b];
      c.Zh(a);
      c.c.hidden = !1
    }
  };
  e.prototype.Fk = function () {
    for (var a = 0; a < this.J.length; a++) {
      var b;
      b = this.J[a];
      b.Rc()
    }
    for (a = 0; a < this.Ua.length; a++)b = this.Ua[a], b.Rc()
  };
  e.prototype.xc = function (a) {
    this.ue = !1;
    try {
      if (a ?
          this.Oa = a : this.Oa = document.createElement("canvas"), this.Oa.width = 100, this.Oa.height = 100, this.Oa.style.display = "none", this.Oa.style.Qk = "none", this.w.insertBefore(this.Oa, this.w.firstChild), a = {
          stencil: !0,
          depth: !0,
          alpha: !1
        }, this.Kd && 10 <= this.Wg[0] && (a.antialias = !1), this.a = this.Oa.getContext("webgl", a), this.a || (this.a = this.Oa.getContext("experimental-webgl", a)), this.a) {
        var b = this.a;
        this.Ta.width = 500;
        this.Ta.height = 500;
        b.clearColor(0, 0, 0, 0);
        b.enable(this.a.DEPTH_TEST);
        b.viewport(0, 0, 500, 500);
        b.clear(b.COLOR_BUFFER_BIT |
          b.DEPTH_BUFFER_BIT);
        this.Jd();
        this.Yg(this.Xd);
        this.Zg();
        this.S && (this.S.Jd(), this.S.xc());
        this.Ea && (this.Ea.Jd(), this.Ea.xc())
      }
    } catch (c) {
    }
    this.a ? this.ka = !0 : alert("Could not initialise WebGL!")
  };
  e.prototype.Jd = function () {
    var a = this.a.createShader(this.a.FRAGMENT_SHADER);
    this.a.shaderSource(a, "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nvoid main(void) {\n gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n}\n");
    this.a.compileShader(a);
    this.a.getShaderParameter(a, this.a.COMPILE_STATUS) || (console && console.log(this.a.getShaderInfoLog(a)), alert(this.a.getShaderInfoLog(a)), a = null);
    var b = this.a.createShader(this.a.VERTEX_SHADER);
    this.a.shaderSource(b, "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\nuniform mat4 uMVMatrix;\nuniform mat4 uPMatrix;\nuniform float uZoffset;\nvarying vec2 vTextureCoord;\nvoid main(void) {\n gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n gl_Position.z += uZoffset;\n vTextureCoord = aTextureCoord;\n}\n");
    this.a.compileShader(b);
    this.a.getShaderParameter(b, this.a.COMPILE_STATUS) || (console && console.log(this.a.getShaderInfoLog(a)), alert(this.a.getShaderInfoLog(b)), b = null);
    this.F = this.a.createProgram();
    this.a.attachShader(this.F, b);
    this.a.attachShader(this.F, a);
    this.a.linkProgram(this.F);
    this.a.getProgramParameter(this.F, this.a.LINK_STATUS) || alert("Could not initialise shaders");
    this.a.useProgram(this.F);
    this.F.ca = this.a.getAttribLocation(this.F, "aVertexPosition");
    this.a.enableVertexAttribArray(this.F.ca);
    this.F.Ga = this.a.getAttribLocation(this.F, "aTextureCoord");
    this.a.enableVertexAttribArray(this.F.Ga);
    this.F.Mc = this.a.getUniformLocation(this.F, "uPMatrix");
    this.F.He = this.a.getUniformLocation(this.F, "uMVMatrix");
    this.F.Pe = this.a.getUniformLocation(this.F, "uSampler");
    this.F.ii = this.a.getUniformLocation(this.F, "uZoffset");
    a = this.a.createShader(this.a.VERTEX_SHADER);
    this.a.shaderSource(a, "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nattribute vec3 aVertexPosition;\nuniform vec2 uCanvasDimensions;\nvoid main(void) {\n vec2 pointNorm = (aVertexPosition.xy / uCanvasDimensions) * 2.0 - vec2(1.0, 1.0);\n gl_Position = vec4(pointNorm.x, pointNorm.y * -1.0, 0.0, 1.0);\n}\n");
    this.a.compileShader(a);
    this.a.getShaderParameter(a, this.a.COMPILE_STATUS) || (alert(this.a.getShaderInfoLog(a)), a = null);
    b = this.a.createShader(this.a.FRAGMENT_SHADER);
    this.a.shaderSource(b, "#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nuniform vec3 uColor;\nuniform float uAlpha;\nvoid main(void) {\n gl_FragColor = vec4(uColor, uAlpha);\n}\n");
    this.a.compileShader(b);
    this.a.getShaderParameter(b, this.a.COMPILE_STATUS) || (alert(this.a.getShaderInfoLog(b)),
      b = null);
    this.Db = this.a.createProgram();
    this.a.attachShader(this.Db, a);
    this.a.attachShader(this.Db, b);
    this.a.linkProgram(this.Db);
    this.a.getProgramParameter(this.Db, this.a.LINK_STATUS) || alert("Could not initialise shaders");
    this.Db.ca = this.a.getAttribLocation(this.Db, "aVertexPosition");
    this.a.enableVertexAttribArray(this.Db.ca)
  };
  e.prototype.Ff = function (a) {
    var b = this;
    return function () {
      try {
        if (a.uj)return;
        var c = b.a;
        c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, 1);
        var d = !1;
        null != a.Fe && a.Fe.complete ? a.Ug || (c.bindTexture(c.TEXTURE_2D,
            a), c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, c.RGBA, c.UNSIGNED_BYTE, a.Fe), d = a.Ug = !0) : null != a.Le && a.Le.complete && (c.bindTexture(c.TEXTURE_2D, a), c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, c.RGBA, c.UNSIGNED_BYTE, a.Le), d = !0);
        d && (c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.LINEAR), c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, c.LINEAR), c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, c.CLAMP_TO_EDGE), c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, c.CLAMP_TO_EDGE), a.loaded = !0);
        c.bindTexture(c.TEXTURE_2D, null)
      } catch (e) {
      }
      b.update()
    }
  };
  e.prototype.ub = function (a) {
    return a ? "{" == a.charAt(0) || "/" == a.charAt(0) || 0 < a.indexOf("://") || 0 == a.indexOf("javascript:") ? a : this.qc + a : this.qc
  };
  e.prototype.Cc = function (a, b, c) {
    var d = (new RegExp("%0*" + b, "i")).exec(a.toString());
    if (d) {
      var d = d.toString(), e = c.toString();
      for (d.charAt(d.length - 1) != b && (e = (1 + c).toString()); e.length < d.length - 1;)e = "0" + e;
      a = a.replace(d, e)
    }
    return a
  };
  e.prototype.$e = function (a, b, c, d) {
    var e = this.f.lh - 1 - b, n = this.f.ph, f = "x";
    switch (a) {
      case 0:
        f = "f";
        break;
      case 1:
        f = "r";
        break;
      case 2:
        f = "b";
        break;
      case 3:
        f = "l";
        break;
      case 4:
        f = "u";
        break;
      case 5:
        f = "d"
    }
    for (var k = 0; 3 > k; k++)n = this.Cc(n, "c", a), n = this.Cc(n, "s", f), n = this.Cc(n, "r", b), n = this.Cc(n, "l", e), n = this.Cc(n, "x", c), n = this.Cc(n, "y", d), n = this.Cc(n, "v", d), n = this.Cc(n, "h", c);
    return this.ub(n)
  };
  e.prototype.Zg = function () {
    var a, b;
    if (this.eb)for (; 0 < this.eb.length;)this.a.deleteTexture(this.eb.pop());
    this.eb = [];
    for (var c = 0; 6 > c; c++)b = this.a.createTexture(), b.Le = null, b.Fe = null, b.Ug = !1, this.a.bindTexture(this.a.TEXTURE_2D, b), this.a.texImage2D(this.a.TEXTURE_2D,
      0, this.a.RGB, 1, 1, 0, this.a.RGB, this.a.UNSIGNED_BYTE, null), this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_MIN_FILTER, this.a.LINEAR), this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_WRAP_S, this.a.CLAMP_TO_EDGE), this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_WRAP_T, this.a.CLAMP_TO_EDGE), this.Vc[c] && (a = new Image, a.crossOrigin = this.crossOrigin, a.src = this.ub(this.Vc[c]), b.Le = a, a.addEventListener && a.addEventListener("load", this.Ff(b), !1), this.bb.push(a)), this.eb.push(b);
    for (c = 0; 6 > c; c++)this.me[c] &&
    (a = new Image, a.crossOrigin = this.crossOrigin, a.src = this.ub(this.me[c]), a.addEventListener ? a.addEventListener("load", this.Ff(this.eb[c]), !1) : a.onload = this.Ff(this.eb[c]), this.eb[c].Fe = a, this.bb.push(a));
    for (c = 0; c < this.J.length; c++)this.J[c].Gb = this.a.createTexture(), this.a.bindTexture(this.a.TEXTURE_2D, this.J[c].Gb), this.a.texImage2D(this.a.TEXTURE_2D, 0, this.a.RGB, 1, 1, 0, this.a.RGB, this.a.UNSIGNED_BYTE, null), this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_MIN_FILTER, this.a.LINEAR), this.a.texParameteri(this.a.TEXTURE_2D,
      this.a.TEXTURE_WRAP_S, this.a.CLAMP_TO_EDGE), this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_WRAP_T, this.a.CLAMP_TO_EDGE);
    this.o.Gb = this.a.createTexture();
    this.a.bindTexture(this.a.TEXTURE_2D, this.o.Gb);
    this.a.texImage2D(this.a.TEXTURE_2D, 0, this.a.RGB, 1, 1, 0, this.a.RGB, this.a.UNSIGNED_BYTE, null);
    this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_MIN_FILTER, this.a.LINEAR);
    this.a.texParameteri(this.a.TEXTURE_2D, this.a.TEXTURE_WRAP_S, this.a.CLAMP_TO_EDGE);
    this.a.texParameteri(this.a.TEXTURE_2D,
      this.a.TEXTURE_WRAP_T, this.a.CLAMP_TO_EDGE);
    this.a.bindTexture(this.a.TEXTURE_2D, null)
  };
  e.prototype.Yg = function (a) {
    var b, c, d, e;
    this.tf = this.a.createBuffer();
    this.a.bindBuffer(this.a.ARRAY_BUFFER, this.tf);
    var n = [-1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1];
    for (b = 0; 12 > b; b++)2 > b % 3 && (n[b] *= a);
    this.a.bufferData(this.a.ARRAY_BUFFER, new Float32Array(n), this.a.STATIC_DRAW);
    this.oe = this.a.createBuffer();
    this.a.bindBuffer(this.a.ARRAY_BUFFER, this.oe);
    var f = [1, 0, 0, 0, 0, 1, 1, 1];
    this.a.bufferData(this.a.ARRAY_BUFFER, new Float32Array(f),
      this.a.STATIC_DRAW);
    this.ne = this.a.createBuffer();
    this.a.bindBuffer(this.a.ELEMENT_ARRAY_BUFFER, this.ne);
    var k = [0, 1, 2, 0, 2, 3];
    this.a.bufferData(this.a.ELEMENT_ARRAY_BUFFER, new Uint16Array(k), this.a.STATIC_DRAW);
    var n = [], k = [], f = [], m = new y;
    for (a = 0; 6 > a; a++) {
      d = a % 3;
      e = 3 > a ? 1 : 0;
      for (c = 0; 4 > c; c++) {
        m.x = -1;
        m.y = -1;
        m.z = 1;
        for (b = 0; b < c; b++)m.Hh();
        f.push((0 > m.x ? .33 : 0) + .33 * d, (0 > m.y ? 0 : .5) + .5 * e);
        if (4 > a)for (b = 0; b < a; b++)m.Oj(); else 5 == a ? m.Nj() : m.Mj();
        n.push(m.x, m.y, m.z)
      }
      b = 4 * a;
      k.push(0 + b, 1 + b, 2 + b, 0 + b, 2 + b, 3 + b)
    }
    this.o.ig = this.a.createBuffer();
    this.a.bindBuffer(this.a.ARRAY_BUFFER, this.o.ig);
    this.a.bufferData(this.a.ARRAY_BUFFER, new Float32Array(n), this.a.STATIC_DRAW);
    this.o.Xe = this.a.createBuffer();
    this.a.bindBuffer(this.a.ARRAY_BUFFER, this.o.Xe);
    this.a.bufferData(this.a.ARRAY_BUFFER, new Float32Array(f), this.a.STATIC_DRAW);
    this.o.If = this.a.createBuffer();
    this.a.bindBuffer(this.a.ELEMENT_ARRAY_BUFFER, this.o.If);
    this.a.bufferData(this.a.ELEMENT_ARRAY_BUFFER, new Uint16Array(k), this.a.STATIC_DRAW);
    this.Fa = this.a.createBuffer();
    this.a.bindBuffer(this.a.ARRAY_BUFFER,
      this.Fa);
    this.a.bufferData(this.a.ARRAY_BUFFER, new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]), this.a.STATIC_DRAW);
    this.Fa.Qb = 3;
    this.Fa.Ac = 4;
    this.ed = this.a.createBuffer();
    this.a.bindBuffer(this.a.ARRAY_BUFFER, this.ed);
    f = [0, 0, 1, 0, 0, 1, 1, 1];
    this.a.bufferData(this.a.ARRAY_BUFFER, new Float32Array(f), this.a.STATIC_DRAW)
  };
  e.prototype.ve = function () {
    return this.pan.b
  };
  e.prototype.Ui = function () {
    return this.K.pan
  };
  e.prototype.Vi = function () {
    for (var a = this.pan.b; -180 > a;)a += 360;
    for (; 180 < a;)a -= 360;
    return a
  };
  e.prototype.we =
    function () {
      for (var a = this.pan.b - this.pan.Pf; -180 > a;)a += 360;
      for (; 180 < a;)a -= 360;
      return a
    };
  e.prototype.Zf = function (a) {
    this.ia();
    isNaN(a) || (this.pan.b = Number(a));
    this.update()
  };
  e.prototype.$f = function (a) {
    this.ia();
    isNaN(a) || (this.pan.b = Number(a) + this.pan.Pf);
    this.update()
  };
  e.prototype.je = function (a, b) {
    isNaN(a) || (this.Zf(this.ve() + a), b && (this.pan.d = a))
  };
  e.prototype.ti = function (a, b) {
    this.je(a * this.vc(), b)
  };
  e.prototype.xe = function () {
    return this.j.b
  };
  e.prototype.cj = function () {
    return this.K.j
  };
  e.prototype.bg =
    function (a) {
      this.ia();
      isNaN(a) || (this.j.b = Number(a));
      this.update()
    };
  e.prototype.ke = function (a, b) {
    this.bg(this.xe() + a);
    b && (this.j.d = a)
  };
  e.prototype.ui = function (a, b) {
    this.ke(a * this.vc(), b)
  };
  e.prototype.Yj = function (a) {
    this.ia();
    isNaN(a) || (this.G.b = Number(a));
    this.update()
  };
  e.prototype.bj = function () {
    return this.G.b
  };
  e.prototype.Bd = function () {
    return this.g.b
  };
  e.prototype.Ii = function () {
    return this.K.jd
  };
  e.prototype.Re = function (a) {
    this.ia();
    if (!isNaN(a) && 0 < a && 180 > a) {
      var b = this.g.b;
      this.g.b = Number(a);
      this.ab();
      b != this.g.b && this.update()
    }
  };
  e.prototype.pg = function (a, b) {
    this.Re(this.Bd() + a);
    b && (this.g.d = a)
  };
  e.prototype.ud = function (a, b) {
    if (!isNaN(a)) {
      var c;
      c = a / 90 * Math.cos(Math.min(this.g.b, 90) * Math.PI / 360);
      c = this.g.b * Math.exp(c);
      this.Re(c);
      b && (this.g.d = a)
    }
  };
  e.prototype.Wj = function (a, b) {
    this.ia();
    isNaN(a) || (this.pan.b = a);
    isNaN(b) || (this.j.b = b);
    this.update()
  };
  e.prototype.ag = function (a, b, c) {
    this.ia();
    isNaN(a) || (this.pan.b = a);
    isNaN(b) || (this.j.b = b);
    !isNaN(c) && 0 < c && 180 > c && (this.g.b = c);
    this.update()
  };
  e.prototype.Rj =
    function () {
      this.ag(this.pan.fb, this.j.fb, this.g.fb)
    };
  e.prototype.Uj = function (a) {
    this.Te(a);
    this.Jh(a);
    this.Se(a)
  };
  e.prototype.Te = function (a) {
    this.B.Wa = a
  };
  e.prototype.Se = function (a) {
    this.B.Qd = a
  };
  e.prototype.Jh = function (a) {
    this.B.Nf = a
  };
  e.prototype.moveTo = function (a, b, c, d, e) {
    this.ia();
    if ("_blank" !== a && "" !== a) {
      this.K.active = !0;
      this.K.qd = !1;
      var n = a.toString().split("/");
      1 < n.length && (a = Number(n[0]), d = Number(b), b = Number(n[1]), 2 < n.length && (c = Number(n[2])));
      isNaN(a) ? this.K.pan = this.pan.b : this.K.pan = Number(a);
      isNaN(b) ? this.K.j = this.j.b : this.K.j = Number(b);
      !isNaN(c) && 0 < c && 180 > c ? this.K.g = Number(c) : this.K.g = this.g.b;
      this.K.speed = !isNaN(d) && 0 < d ? Number(d) : 1;
      isNaN(e) ? this.K.G = this.G.b : this.K.G = Number(e)
    }
  };
  e.prototype.qj = function (a) {
    this.moveTo(this.pan.fb, this.j.fb, this.g.fb, a)
  };
  e.prototype.li = function (a, b, c, d) {
    var e = new Y(this);
    e.type = "point";
    e.pan = b;
    e.j = c;
    e.id = a;
    e.c = {};
    e.c.player = this;
    e.Wc();
    e.c.hotspot = e;
    e.c.__div = document.createElement("div");
    e.c.__div.appendChild(d);
    this.I.push(e);
    e.c.__div.style.position =
      "absolute";
    e.c.__div.style.left = "-1000px";
    e.c.__div.style.top = "-1000px";
    this.va.insertBefore(e.c.__div, this.va.firstChild);
    this.Ca = !0
  };
  e.prototype.wk = function (a, b, c) {
    for (var d = 0; d < this.I.length; d++) {
      var e = this.I[d];
      e.id == a && (e.pan = b, e.j = c, e.Wc())
    }
    this.Ca = !0
  };
  e.prototype.Ij = function (a) {
    for (var b = -1, c, d = 0; d < this.I.length; d++)c = this.I[d], c.id == a && (b = d);
    -1 < b && (c = this.I.splice(b, 1).pop(), c.c && c.c.__div && this.va.removeChild(c.c.__div))
  };
  e.prototype.Xi = function () {
    for (var a = [], b = 0; b < this.I.length; b++) {
      var c =
        this.I[b];
      "point" == c.type && a.push(String(c.id))
    }
    return a
  };
  e.prototype.Ji = function (a) {
    for (var b = 0; b < this.I.length; b++) {
      var c = this.I[b];
      if (c.id == a)return b = {}, b.id = a, b.pan = c.pan, b.tilt = c.j, c.c && c.c.__div && (b.div = c.c.__div), b
    }
  };
  e.prototype.ei = function (a, b) {
    this.O.start.x = a;
    this.O.start.y = b;
    this.O.W.x = a;
    this.O.W.y = b;
    this.A.W.x = a;
    this.A.W.y = b;
    this.Xf++
  };
  e.prototype.ci = function (a, b) {
    var c = this.Wb();
    this.pan.b += a * c / this.l.height;
    this.j.b += b * c / this.l.height;
    this.ab()
  };
  e.prototype.di = function (a, b) {
    this.O.b.x =
      a;
    this.O.b.y = b;
    this.O.V.x = this.O.b.x - this.O.W.x;
    this.O.V.y = this.O.b.y - this.O.W.y;
    this.B.yc && (this.O.W.x = this.O.b.x, this.O.W.y = this.O.b.y, this.update())
  };
  e.prototype.ia = function () {
    this.u.active && (this.u.active = !1, this.pan.d = 0, this.j.d = 0, this.g.d = 0);
    this.K.active && (this.K.active = !1, this.pan.d = 0, this.j.d = 0, this.g.d = 0);
    this.rd = this.K.qd = !1;
    this.De = (new Date).getTime()
  };
  e.prototype.Pi = function () {
    return this.De
  };
  e.prototype.Og = function (a, b) {
    a || (a = this.ha.x, b = this.ha.y);
    var c = this.l.height / (2 * Math.tan(this.g.b *
        Math.PI / 360)), d = a - this.l.width / 2, e = b - this.l.height / 2, n = {};
    n.pan = 180 * Math.atan(d / c) / Math.PI;
    n.tilt = 180 * Math.atan(-e / Math.sqrt(d * d + c * c)) / Math.PI;
    return n
  };
  e.prototype.Zi = function (a, b) {
    var c, d;
    a || (a = this.ha.x, b = this.ha.y);
    if (2 === this.rb) d = this.g.b / this.l.height, c = -(a - this.l.width / 2) * d + this.pan.b, d = -(b - this.l.height / 2) * d + this.j.b; else {
      d = new y(0, 0, 1);
      c = this.Og(a, b);
      d.Yf(-c.tilt);
      d.Gh(c.pan);
      d.Yf(-this.j.b);
      d.Gh(-this.pan.b);
      d.Yf(-this.oa.pitch);
      d.Lj(this.oa.G);
      for (c = d.mi() - 180; -180 > c;)c += 360;
      d = d.ni()
    }
    var e =
      {};
    e.pan = c;
    e.tilt = d;
    return e
  };
  e.prototype.ic = function (a) {
    return a == this.control || a && a.ggType && ("container" == a.ggType || "cloner" == a.ggType || "timer" == a.ggType) ? !0 : !1
  };
  e.prototype.qf = function (a, b) {
    var c = this.bc(), d, e, n;
    for (d = 0; d < this.J.length + this.Ua.length; d++) {
      var f;
      f = d < this.J.length ? this.J[d] : this.Ua[d - this.J.length];
      if (f.hb)return f
    }
    for (d = 0; d < this.J.length + this.Ua.length; d++) {
      f = d < this.J.length ? this.J[d] : this.Ua[d - this.J.length];
      var k = [], m = new y, p, l, r;
      0 < f.g && (l = Math.tan(f.g / 2 * Math.PI / 180), r = 0 < f.Ob ?
        l * f.Xb / f.Ob : l, f.gc && 1 != f.gc && (r *= f.gc));
      for (p = 0; 4 > p; p++) {
        switch (p) {
          case 0:
            m.Ka(-l, -r, -1);
            break;
          case 1:
            m.Ka(l, -r, -1);
            break;
          case 2:
            m.Ka(l, r, -1);
            break;
          case 3:
            m.Ka(-l, r, -1)
        }
        m.pa(-f.j * Math.PI / 180);
        m.wa(f.pan * Math.PI / 180);
        m.wa(-this.pan.b * Math.PI / 180);
        m.pa(this.j.b * Math.PI / 180);
        m.Ra(this.G.b * Math.PI / 180);
        k.push(m.clone())
      }
      k = this.sf(k);
      if (0 < k.length) {
        for (p = 0; p < k.length; p++)m = k[p], .1 > m.z ? (n = -c / m.z, e = this.l.width / 2 + m.x * n, n = this.l.height / 2 + m.y * n): n= e = 0, m.sb = e, m.Ya = n;
        if (this.Vg(k, a, b))return f
      }
    }
    return null
  };
  e.prototype.Be = function () {
    return document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement && null != document.msFullscreenElement || document.fullScreen
  };
  e.prototype.pj = function (a) {
    this.Wh(a);
    if (this.Ub) this.Ub.onclick();
    this.rc = null;
    if (!this.B.Wa) {
      a = a ? a : window.event;
      if ((a.which || 0 == a.which || 1 == a.which) && this.ic(a.target)) {
        var b;
        (b = this.qf(this.ha.x, this.ha.y)) && b.Yb && (this.rc = b);
        this.ei(a.pageX, a.pageY);
        this.N.Da = 1;
        this.N.startTime = (new Date).getTime();
        a.preventDefault();
        this.ia()
      }
      this.O.V.x =
        0;
      this.O.V.y = 0
    }
  };
  e.prototype.nd = function (a, b) {
    var c = this.v.fg;
    c.enabled && (this.ma != this.Qa && 0 <= a && 0 <= b && "" != this.ma.title ? (this.na.innerHTML = this.ma.title, this.na.style.color = this.X(c.gg, c.eg), c.background ? this.na.style.backgroundColor = this.X(c.mb, c.Mb) : this.na.style.backgroundColor = "transparent", this.na.style.border = "solid " + this.X(c.ob, c.Nb) + " " + c.nf + "px", this.na.style.borderRadius = c.mf + "px", this.na.style.textAlign = "center", 0 < c.width ? (this.na.style.left = a - c.width / 2 + this.margin.left + "px", this.na.style.width =
          c.width + "px") : (this.na.style.width = "auto", this.na.style.left = a - this.na.offsetWidth / 2 + this.margin.left + "px"), this.na.style.height = 0 < c.height ? c.height + "px" : "auto", this.na.style.top = b + 25 + +this.margin.top + "px", this.na.style.visibility = "inherit", this.na.style.overflow = "hidden") : (this.na.style.visibility = "hidden", this.na.innerHTML = ""))
  };
  e.prototype.Wh = function (a) {
    var b = this.Hc();
    this.Be() ? (this.ha.x = a.pageX - this.margin.left, this.ha.y = a.pageY - this.margin.top) : (this.ha.x = a.pageX - b.x, this.ha.y = a.pageY - b.y);
    return b
  };
  e.prototype.gd = function (a) {
    a && null !== a && "object" == typeof a ? this.ma = a : this.ma = this.Qa;
    this.ma.Wc && this.ma.Wc();
    this.hotspot = this.ma
  };
  e.prototype.oj = function (a) {
    a = a ? a : window.event;
    var b = this.Wh(a);
    if (!this.B.Wa) {
      0 <= this.N.Da && (a.preventDefault(), (a.which || 0 == a.which || 1 == a.which) && this.di(a.pageX, a.pageY), this.ia());
      var c = !1;
      if (this.ma == this.Qa || "poly" == this.ma.type) {
        var d = this.Qa;
        0 < this.I.length && this.ic(a.target) && (d = this.rf(this.ha.x, this.ha.y));
        this.Qe(d);
        this.nd(a.pageX - b.x, a.pageY - b.y);
        0 != d && (c = !0)
      }
      a = null;
      c || (a = this.qf(this.ha.x, this.ha.y));
      this.va.style.cursor = this.ma != this.Qa && this.ma.Yc && c || a && a.Hd ? "pointer" : "auto"
    }
  };
  e.prototype.Qe = function (a) {
    !1 === a && (a = this.Qa);
    this.ma != a && (this.ma != this.Qa && (0 < this.v.mode && (this.ma.Ha = 0), this.xa && this.xa.hotspotProxyOut && this.xa.hotspotProxyOut(this.ma.id)), a != this.Qa ? (this.gd(a), this.xa && this.xa.hotspotProxyOver && this.xa.hotspotProxyOver(this.ma.id), 0 < this.v.mode && (this.v.Ha = 1, this.ma.Ha = 1)) : (this.gd(this.Qa), 0 < this.v.mode && (this.v.Ha = 0)),
    this.Y && this.Y.changeCurrentHotspot(this.ma.id))
  };
  e.prototype.nj = function (a) {
    a = a ? a : window.event;
    this.Ee = -1;
    if (!this.B.Wa && 0 <= this.N.Da) {
      this.ia();
      a.preventDefault();
      this.N.Da = -3;
      this.O.V.x = 0;
      this.O.V.y = 0;
      a = (new Date).getTime();
      var b;
      b = Math.abs(this.O.start.x - this.O.W.x) + Math.abs(this.O.start.y - this.O.W.y);
      400 > a - this.N.startTime && 0 <= b && 20 > b && (this.rc && this.rc.Yb(), (b = this.rf(this.ha.x, this.ha.y)) && this.Th(b), b = Math.abs(this.O.kc.x - this.O.W.x) + Math.abs(this.O.kc.y - this.O.W.y), 700 > a - this.Md && 0 <= b && 20 >
      b ? (this.B.xf && this.cf(), this.Md = 0) : this.Md = a, this.O.kc.x = this.O.W.x, this.O.kc.y = this.O.W.y)
    }
  };
  e.prototype.sh = function (a) {
    if (!this.B.Nf && (a = a ? a : window.event, this.ic(a.target))) {
      var b = a.detail ? -1 * a.detail : a.wheelDelta / 40;
      this.B.$g && (b = -b);
      a.axis && (-1 == this.Ee ? this.Ee = a.axis : this.Ee != a.axis && (b = 0));
      var c = 0 < b ? 1 : -1;
      0 != b && (this.ud(c * this.B.Nh, !0), this.update());
      a.preventDefault();
      this.ia()
    }
  };
  e.prototype.tk = function (a) {
    a || (a = window.event);
    var b = a.touches, c = this.Hc();
    this.ha.x = b[0].pageX - c.x;
    this.ha.y = b[0].pageY -
      c.y;
    this.kd = this.rc = null;
    this.te && (this.te = !1, this.Bg());
    if (!this.B.Wa) {
      if (0 > this.N.Da && b[0]) {
        this.N.startTime = (new Date).getTime();
        this.N.start.x = b[0].pageX;
        this.N.start.y = b[0].pageY;
        this.N.W.x = b[0].pageX;
        this.N.W.y = b[0].pageY;
        this.tb = b[0].target;
        if (this.ic(a.target)) {
          var d;
          (d = this.qf(this.ha.x, this.ha.y)) && d.Yb && (this.rc = d);
          if (d = this.rf(this.ha.x, this.ha.y)) this.kd = d, this.Qe(d), d = this.Cd(a), this.nd(d.x - c.x, d.y - c.y);
          this.ei(b[0].pageX, b[0].pageY);
          this.N.Da = b[0].identifier;
          a.preventDefault();
          this.ia()
        }
        if (this.tb) {
          c =
            this.tb;
          for (d = !1; c && c != this.control;) {
            if (c.onmouseover) c.onmouseover();
            c.onmousedown && !d && (c.onmousedown(), d = !0);
            c = c.parentNode
          }
          d && a.preventDefault()
        }
      }
      1 < b.length && (this.N.Da = -5);
      !this.Gf && 2 == b.length && b[0] && b[1] && (a = b[0].pageX - b[1].pageX, b = b[0].pageY - b[1].pageY, this.g.Oh = Math.sqrt(a * a + b * b), this.g.dd = this.g.b);
      this.O.V.x = 0;
      this.O.V.y = 0
    }
  };
  e.prototype.Bg = function () {
    for (var a = 0; a < this.R.length; a++) {
      var b = this.R[a];
      !this.zc(b.id) && 0 <= b.loop && b.autoplay && this.cd(b.id, b.loop)
    }
    for (a = 0; a < this.J.length; a++)b =
      this.J[a], this.zc(b.id) || !b.autoplay || this.Kf || this.cd(b.id, b.loop)
  };
  e.prototype.sk = function (a) {
    a || (a = window.event);
    var b = a.touches, c = this.Hc();
    this.ha.x = b[0].pageX - c.x;
    this.ha.y = b[0].pageY - c.y;
    if (!this.B.Wa) {
      b[0] && (this.N.W.x = b[0].pageX, this.N.W.y = b[0].pageY);
      if (0 <= this.N.Da) {
        a.preventDefault();
        for (var d = 0; d < b.length; d++)if (b[d].identifier == this.N.Da) {
          this.di(b[d].pageX, b[d].pageY);
          break
        }
        this.kd && (d = this.Cd(a), this.nd(d.x - c.x, d.y - c.y));
        this.ia()
      }
      2 == b.length && b[0] && b[1] && (this.N.Da = -6, this.Gf || (c =
        b[0].pageX - b[1].pageX, b = b[0].pageY - b[1].pageY, this.g.vg = Math.sqrt(c * c + b * b), this.A.g.active = !0, this.A.g.Ia = this.g.dd * Math.sqrt(this.g.Oh / this.g.vg), this.A.g.Ia > this.g.max && (this.A.g.Ia = this.g.max), this.A.g.Ia < this.g.min && (this.A.g.Ia = this.g.min), this.ia(), a.preventDefault()))
    }
  };
  e.prototype.rk = function (a) {
    var b, c = this.Hc(), d = !1;
    this.te && (this.te = !1, this.Bg());
    if (!this.B.Wa) {
      0 <= this.N.Da && this.ia();
      var e = (new Date).getTime(), n;
      b = Math.abs(this.N.start.x - this.N.W.x) + Math.abs(this.N.start.y - this.N.W.y);
      if (0 <= b && 20 > b) {
        a.preventDefault();
        d = !0;
        this.ic(this.tb) && this.rc && this.rc.Yb();
        if (this.tb)for (b = this.tb, n = !1; b && b != this.control;)b.onclick && !n && (b.onclick(), n = !0, d = !1), b = b.parentNode;
        b = Math.abs(this.N.kc.x - this.N.W.x) + Math.abs(this.N.kc.y - this.N.W.y);
        if (700 > e - this.Md && 0 <= b && 20 > b) {
          a.preventDefault();
          if (this.ic(this.tb) && this.B.xf) {
            var f = this;
            setTimeout(function () {
              f.cf()
            }, 1)
          }
          if (this.tb)for (b = this.tb, n = !1; b && b != this.control;)b.ondblclick && !n && (b.ondblclick(), n = !0, d = !1), b = b.parentNode;
          this.Md = 0
        } else this.Md =
          e;
        this.N.kc.x = this.N.W.x;
        this.N.kc.y = this.N.W.y
      }
      if (this.tb)for (a.preventDefault(), b = this.tb, n = !1; b && b != this.control;) {
        if (b.onmouseout) b.onmouseout();
        b.onmouseup && !n && (b.onmouseup(), n = !0);
        b = b.parentNode
      }
      this.tb = null;
      this.N.Da = -11;
      this.Qe(this.Qa);
      a = this.Cd(a);
      this.nd(a.x - c.x, a.y - c.y);
      this.kd && d && this.Th(this.kd);
      this.kd = null
    }
  };
  e.prototype.qk = function (a) {
    var b = this.Hc();
    this.B.Wa || (this.N.Da = -2);
    this.kd = null;
    this.Qe(this.Qa);
    a = this.Cd(a);
    this.nd(a.x - b.x, a.y - b.y)
  };
  e.prototype.jj = function () {
    return null !=
      this.tb || 0 <= this.N.Da
  };
  e.prototype.uh = function (a) {
    !this.Kc && window.MSGesture && (this.Kc = new MSGesture, this.Kc.target = this.control);
    this.Kc && this.Kc.addPointer(a.pointerId)
  };
  e.prototype.Jg = function (a) {
    this.Gf = !0;
    this.Ge = 1;
    this.B.Wa || (a.touches ? (this.tb = a.touches.target, this.ic(a.target) && (a.preventDefault(), this.g.dd = this.g.b, this.ia())) : (a.preventDefault(), this.g.dd = this.g.b, this.ia()))
  };
  e.prototype.Fi = function (a) {
    !this.B.Wa && this.ic(a.target) && (a.preventDefault(), this.A.g.active = !0, this.A.g.Ia = this.g.dd /
      Math.sqrt(a.scale), this.A.g.Ia > this.g.max && (this.A.g.Ia = this.g.max), this.A.g.Ia < this.g.min && (this.A.g.Ia = this.g.min), this.update(), this.ia())
  };
  e.prototype.rj = function (a) {
    this.B.Wa || (a.preventDefault(), 1 != a.scale && (this.A.g.active = !0, this.Ge *= a.scale, this.A.g.Ia = this.g.dd / Math.sqrt(this.Ge), this.A.g.Ia > this.g.max && (this.A.g.Ia = this.g.max), this.A.g.Ia < this.g.min && (this.A.g.Ia = this.g.min), this.update(), this.ia()))
  };
  e.prototype.Ig = function (a) {
    this.B.Wa || (this.A.g.active = !1, a.preventDefault(), this.ia(),
    this.Kc && this.Kc.reset && this.Kc.reset())
  };
  e.prototype.kj = function (a) {
    this.B.Qd || (this.isFullscreen && a.preventDefault(), this.Jc = a.keyCode, this.ia())
  };
  e.prototype.lj = function (a) {
    this.Jc && (this.Jc = 0, a.preventDefault(), this.ia())
  };
  e.prototype.wj = function () {
    this.Jc = 0
  };
  e.prototype.Je = function () {
    this.isFullscreen && (this.Be() || this.exitFullscreen(), this.Be() && (this.M.style.left = "0px", this.M.style.top = "0px"))
  };
  e.prototype.Th = function (a) {
    this.xa && this.xa.hotspotProxyClick && this.xa.hotspotProxyClick(a.id);
    "" !=
    a.url && (this.Qf(a.url, a.target), this.nd(-1, -1))
  };
  e.prototype.vc = function () {
    return Math.min(1, 2 * Math.tan(Math.PI * this.g.b / 360))
  };
  e.prototype.xh = function () {
    var a = this;
    setTimeout(function () {
      a.xh()
    }, 100);
    9 != a.Ne || a.ah || requestAnimationFrame(function () {
      a.ad("restart recover timer")
    });
    10 < a.Ne && 1 < a.Xf && (a.ad("recover timer - disabling requestAnimationFrame"), a.ah = !0, a.Rf());
    a.Ne++
  };
  e.prototype.Ak = function () {
    var a = this.a;
    if (0 < this.J.length)for (var b = 0; b < this.J.length; b++) {
      var c = this.J[b];
      if (c.fh && c.ye != c.c.currentTime &&
        (c.ye = c.c.currentTime, !c.mg && 0 < c.c.videoHeight && (c.mg = c.c.videoWidth / c.c.videoHeight), this.be))try {
        c.Gb && (a.bindTexture(a.TEXTURE_2D, c.Gb), a.texImage2D(a.TEXTURE_2D, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, c.c), this.update())
      } catch (d) {
      }
    }
    if (this.o.c && this.o.ye != this.o.c.currentTime) {
      this.o.ye = this.o.c.currentTime;
      try {
        this.o.Gb && this.o.Ce && 0 < this.o.c.readyState && (this.o.$c = !0, a.bindTexture(a.TEXTURE_2D, this.o.Gb), a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, 0), a.texImage2D(a.TEXTURE_2D, 0, a.RGB, a.RGB, a.UNSIGNED_BYTE, this.o.c),
          this.update())
      } catch (d) {
      }
    }
  };
  e.prototype.Bj = function (a) {
    var b;
    if (this.K.active) {
      this.pan.d = this.K.pan - this.pan.b;
      if (360 == this.pan.max - this.pan.min) {
        for (; -180 > this.pan.d;)this.pan.d += 360;
        for (; 180 < this.pan.d;)this.pan.d -= 360
      }
      this.j.d = this.K.j - this.j.b;
      this.G.d = this.K.G - this.G.b;
      this.g.d = this.K.g - this.g.b;
      var c = this.K.speed * this.vc(), d = Math.sqrt(this.pan.d * this.pan.d + this.j.d * this.j.d + this.G.d * this.G.d + this.g.d * this.g.d);
      b = this.pan.b - this.K.ih;
      var e = this.j.b - this.K.kh, n = this.G.b - this.K.jh, f = this.g.b -
        this.K.hh;
      100 * Math.sqrt(b * b + e * e + n * n + f * f) < c && (this.K.qd = !0);
      this.K.ih = this.pan.b;
      this.K.kh = this.j.b;
      this.K.jh = this.G.b;
      this.K.hh = this.g.b;
      if (100 * d < c || this.K.qd) {
        if (this.K.active = !1, this.pan.d = 0, this.j.d = 0, this.G.d = 0, this.g.d = 0, this.pan.b = this.K.pan, this.j.b = this.K.j, this.G.b = this.K.G, this.g.b = this.K.g, this.onMoveComplete) this.onMoveComplete()
      } else d = d > 5 * c ? c / d : .2, this.pan.d *= d, this.j.d *= d, this.g.d *= d;
      this.pan.b += this.pan.d;
      this.j.b += this.j.d;
      this.G.b += this.G.d;
      this.g.b += this.g.d;
      this.De = a.getTime();
      this.update()
    } else if (this.u.active)if (d = a.getTime() - this.u.startTime, this.u.bi && 0 < this.sc.length) {
      d /= 100;
      e = !1;
      if (this.lc != this.T.cliptitle) {
        for (b = 0; b < this.sc.length; b++)if ("" == this.lc || "" != this.lc && this.sc[b].cliptitle == this.lc) {
          e = !0;
          this.T = this.sc[b];
          this.lc = this.T.cliptitle;
          break
        }
        !e && 0 < this.sc.length && (e = !0, this.T = this.sc[0], this.lc = this.T.cliptitle)
      } else e = !0;
      if (e)if (this.rd)if (d >= this.T.length)if (this.rd = !1, this.lc = this.T.nextcliptitle, this.lc == this.T.cliptitle) {
        if (1 < this.sa.length && 0 < this.u.Ie) {
          if (this.u.Of) {
            b =
              1E3;
            do c = this.sa[Math.floor(Math.random() * this.sa.length)]; while (b-- && c == this.currentNode)
          } else c = this.Ng();
          this.Lc("{" + c + "}");
          this.u.startTime = a.getTime();
          this.rd = !1;
          this.u.active = !0;
          this.S.sd = !0
        }
      } else this.Ld && this.T.nextclipnodeid != this.currentNode && (this.Lc("{" + this.T.nextclipnodeid + "}"), this.S.enabled ? (this.u.active = !1, this.S.sd = !0) : this.u.active = !0), this.u.startTime = a.getTime(); else {
        a = {Lk: {value: 0, name: "pan"}, Mk: {value: 1, name: "tilt"}, Kk: {value: 2, name: "fov"}};
        for (c in a) {
          b = a[c];
          for (e = Math.floor(d); !this.Lg(e,
            b.value) && 0 < e;)e--;
          var f = this.Lg(e, b.value), k = this.Qi(f);
          if (k) {
            var e = new h(f.time, f.value), n = new h(k.time, k.value), m = (d - f.time) / (k.time - f.time);
            if (0 != f.type || 0 != k.type && 3 != k.type)if (3 == f.type) e = f.value; else {
              var m = new h, p = new h, l = k.time - f.time;
              0 == f.type ? p.Ka(f.time + .3 * l, f.value) : p.Ka(f.bezierouttime, f.bezieroutvalue);
              0 == k.type || 3 == k.type ? m.Ka(k.time - .3 * l, k.value) : m.Ka(k.bezierintime, k.bezierinvalue);
              f = new h;
              f.si(e, n, p, m, d);
              e = f.y
            } else f = new h, f.hc(e, n, m), e = f.y
          } else e = f.value;
          switch (b.value) {
            case 0:
              b =
                this.pan.b;
              this.pan.b = e;
              this.pan.d = this.pan.b - b;
              break;
            case 1:
              b = this.j.b;
              this.j.b = e;
              this.j.d = this.j.b - b;
              break;
            case 2:
              b = this.g.b, this.g.b = e, this.g.d = this.g.b - b
          }
        }
        this.update()
      } else c = this.T.keyframes[0], d = this.T.keyframes[1], b = this.T.keyframes[2], this.K.qd || this.ve() == c.value && this.xe() == d.value && this.Bd() == b.value ? (this.rd = !0, this.u.startTime = a.getTime()) : (this.moveTo(c.value, d.value, b.value, 1), this.u.active = !0)
    } else if (0 < this.u.Ie && this.Ld && d >= 1E3 * this.u.Ie) {
      if (1 < this.sa.length) {
        if (this.u.Of) {
          b = 1E3;
          do c = this.sa[Math.floor(Math.random() * this.sa.length)]; while (b-- && c == this.currentNode)
        } else b = this.sa.indexOf(this.currentNode), b++, b >= this.sa.length && (b = 0), c = this.sa[b];
        this.u.startTime = a.getTime();
        this.u.jc = a.getTime();
        this.u.timeout = 0;
        this.Lc("{" + c + "}");
        this.u.active = !0;
        this.S.sd = !0
      }
    } else c = a.getTime(), a = d = 1E3 / 60, 0 != this.u.jc && (a = c - this.u.jc), this.j.d = this.u.af * (0 - this.j.b) / 100, this.g.d = this.u.af * (this.g.fb - this.g.b) / 100, this.pan.d = .95 * this.pan.d + -this.u.speed * this.vc() * .05, d = a / d, this.pan.b += this.pan.d *
      d, this.j.b += this.j.d * d, this.g.b += this.g.d * d, this.u.jc = c, this.update(); else this.u.enabled && 0 > this.N.Da && a.getTime() - this.De > 1E3 * this.u.timeout && (this.u.Wd && this.isLoaded || !this.u.Wd) && (this.u.active = !0, this.u.startTime = a.getTime(), this.u.jc = 0, this.pan.d = 0, this.j.d = 0, this.g.d = 0), this.A.enabled && 0 == this.Jc && 0 > this.N.Da && (0 != this.pan.d || 0 != this.j.d || 0 != this.g.d) && (this.pan.d *= .9, this.j.d *= .9, this.g.d *= .9, this.pan.b += this.pan.d, this.j.b += this.j.d, this.ud(this.g.d), 1E-4 > this.pan.d * this.pan.d + this.j.d *
    this.j.d + this.g.d * this.g.d && (this.pan.d = 0, this.j.d = 0, this.g.d = 0), this.update())
  };
  e.prototype.Cj = function (a) {
    var b = this.S;
    if (b.Ec) {
      var c = a.getTime() - b.hi, c = c / (1E3 * b.gi);
      if (1 <= c) {
        b.Ec = !1;
        for (c = 0; c < this.ra.Zd.length; c++)this.ra.Af(this.ra.Zd[c]);
        b.dg = a.getTime();
        this.Ph();
        b.ld = !0;
        1 != b.Kb && 2 != b.Kb && 3 != b.Kb || b.lf || this.moveTo(b.Ve, b.We, b.jd, b.ge)
      } else b.wh(c)
    } else b.ld && (c = a.getTime() - b.dg, c /= 1E3 * b.ng, 1 <= c ? (b.ld = !1, this.De = a.getTime(), this.update(), 1 != b.Kb && 2 != b.Kb && 3 != b.Kb || !b.lf || this.moveTo(b.Ve, b.We,
        b.jd, b.ge), this.Te(b.th), this.Se(b.gh), this.u.active = b.sd, this.u.jc = 0, b.sd = !1) : b.wh(c));
    b = this.xj;
    b.pi && (b.pe ? a.getTime() - b.yf >= 1E3 * b.Ai && (b.pe = !1) : (b.current += b.Tb, 0 > b.current && (b.current = 0, b.Tb = -b.Tb, b.pe = !0, b.yf = a.getTime()), 1 < b.current && (b.current = 1, b.Tb = -b.Tb, b.pe = !0, b.yf = a.getTime())))
  };
  e.prototype.Gj = function () {
    var a;
    if (2 == this.v.mode)for (a = 0; a < this.I.length; a++) {
      var b = this.I[a];
      "poly" == b.type && b.Ha != b.ea && (b.Ha > b.ea ? (b.ea += this.v.Tb, b.Ha < b.ea && (b.ea = b.Ha)) : (b.ea -= this.v.Tb, b.Ha > b.ea && (b.ea =
          b.Ha)), this.update())
    }
    3 == this.v.mode && this.v.Ha != this.v.ea && (this.v.Ha > this.v.ea ? (this.v.ea += this.v.Tb, this.v.Ha < this.v.ea && (this.v.ea = this.v.Ha)) : (this.v.ea -= this.v.Tb, this.v.Ha > this.v.ea && (this.v.ea = this.v.Ha)), this.update())
  };
  e.prototype.Dj = function () {
    0 <= this.N.Da && (this.B.yc ? (this.A.V.x = .4 * (this.O.W.x - this.A.W.x), this.A.V.y = .4 * (this.O.W.y - this.A.W.y), this.A.W.x += this.A.V.x, this.A.W.y += this.A.V.y) : (this.A.V.x = .1 * -this.O.V.x * this.B.sensitivity / 8, this.A.V.y = .1 * -this.O.V.y * this.B.sensitivity / 8), this.ci(this.A.V.x,
      this.A.V.y), this.update());
    this.A.g.active && (this.pg(.4 * (this.A.g.Ia - this.g.b)), .001 > Math.abs(this.A.g.Ia - this.g.b) / this.g.b && (this.A.g.active = !1), this.update());
    this.A.enabled && (0 != this.A.V.x || 0 != this.A.V.y) && 0 > this.N.Da && (this.A.V.x = .9 * this.A.V.x, this.A.V.y = .9 * this.A.V.y, .1 > this.A.V.x * this.A.V.x + this.A.V.y * this.A.V.y ? (this.A.V.x = 0, this.A.V.y = 0) : (this.ci(this.A.V.x, this.A.V.y), this.update()))
  };
  e.prototype.Ej = function () {
    if (0 != this.Jc) {
      var a = this.B.sensitivity / 8;
      switch (this.Jc) {
        case 37:
        case 65:
          this.je(a *
            this.vc(), !0);
          break;
        case 38:
        case 87:
          this.ke(a * this.vc(), !0);
          break;
        case 39:
        case 68:
          this.je(-a * this.vc(), !0);
          break;
        case 40:
        case 83:
          this.ke(-a * this.vc(), !0);
          break;
        case 43:
        case 107:
        case 16:
        case 81:
          this.B.Mf || this.ud(-a, !0);
          break;
        case 17:
        case 18:
        case 109:
        case 45:
        case 91:
        case 69:
          this.B.Mf || this.ud(a, !0)
      }
      this.update()
    }
  };
  e.prototype.Fj = function () {
    if (!this.isLoaded && this.Id && 5 < this.f.Eh) {
      var a, b = 0, c = this.bb.length;
      if (this.ae) c = 50, this.zf < c && this.zf++, b = this.zf; else for (a = 0; a < c; a++)(this.bb[a].complete && this.bb[a].src !=
      this.yg || "" == this.bb[a].src) && b++;
      b == c ? (this.Ke = 1, this.isLoaded = !0, this.D && this.D.ggLoaded && this.D.ggLoaded(), this.u.Wd && this.u.enabled && !this.K.active && !this.S.Ec && (this.u.active = !0, this.u.jc = 0)) : this.Ke = b / (1 * c)
    }
  };
  e.prototype.Rf = function () {
    var a = new Date;
    this.Sa && "" !== this.Gc && !this.Y && document.hasOwnProperty(this.Gc) && document[this.Gc].setPan && 0 == this.Ei-- && (this.Y = document[this.Gc], this.Hb = this.ka = !1, this.la && (this.la.style.visibility = "hidden"), this.Y.setLocked(!0), this.Y.setSlaveMode(!0), this.Y.readConfigString(this.vf),
      this.ad("Flash player '" + this.Gc + "' connected."));
    this.Df++;
    120 <= this.Df && (this.Df = 0);
    this.Xf = this.Ne = 0;
    this.hg && (this.Sc(), this.hg = !1);
    this.Dj();
    this.Ej();
    for (this.Fj(); 360 < this.pan.b;)this.pan.b -= 360;
    for (; -360 > this.pan.b;)this.pan.b += 360;
    this.Bj(a);
    this.Cj(a);
    this.Ak();
    0 < this.v.mode && this.Gj();
    this.ff();
    this.Ca && (0 < this.qe ? this.qe-- : (this.Ca = !1, this.qe = 0), this.S.ld || this.S.Ec || this.$d());
    var b = this;
    setTimeout(function () {
      b.Rf()
    }, 1E3 / 60)
  };
  e.prototype.Yh = function () {
    var a = this;
    setTimeout(function () {
        a.hd(!1)
      },
      10);
    setTimeout(function () {
      a.hd(!1)
    }, 100)
  };
  e.prototype.ff = function () {
    this.uf.Cg(this.pan.b, this.j.b);
    for (var a = 0; a < this.R.length + this.J.length; a++)(a < this.R.length ? this.R[a] : this.J[a - this.R.length]).ff()
  };
  e.prototype.wg = function (a) {
    var b = "", c, d, e, n, f, k = 0;
    a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    do c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)),
      f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(k++)), c = c << 2 | d >> 4, d = (d & 15) << 4 | n >> 2, e = (n & 3) << 6 | f, b += String.fromCharCode(c), 64 != n && (b += String.fromCharCode(d)), 64 != f && (b += String.fromCharCode(e)); while (k < a.length);
    return b
  };
  e.prototype.ck = function (a, b) {
    var c, d, e = this;
    if (0 != e.Td.length || !e.B.Ae || e.B.le)if (e.Ub) e.Ub = null, e.M.removeChild(e.Ub); else {
      e.Ub = document.createElement("div");
      var n = e.Ub;
      c = "left: " + a + "px;" + ("top:\t " + b + "px;") + "z-index: 32000;";
      c += "position:relative;";
      c += "display: table;";
      c += "background-color: white;";
      c += "border: 1px solid lightgray;";
      c += "box-shadow: 1px 1px 3px #333;";
      c += "font-family: Verdana, Arial, Helvetica, sans-serif;";
      c += "font-size: 9pt;";
      c += "opacity : 0.95;";
      n.setAttribute("style", c);
      n.setAttribute("class", "gg_contextmenu");
      c = document.createElement("style");
      d = document.createTextNode(".gg_context_row:hover { background-color: #3399FF }");
      c.type = "text/css";
      c.styleSheet ? c.styleSheet.cssText = d.nodeValue : c.appendChild(d);
      n.appendChild(c);
      for (d =
             0; d < e.Td.length; d++) {
        var f = e.Td[d], k = document.createElement("div");
        c = "text-align: left;";
        c += "margin: 0;";
        c += "padding: 5px 20px;";
        c += "vertical-align: left;";
        k.setAttribute("style", c);
        k.setAttribute("class", "gg_context_row");
        c = document.createElement("a");
        c.href = f.url;
        c.target = "_blank";
        c.innerHTML = f.text;
        c.setAttribute("style", "color: black; text-decoration: none;");
        k.appendChild(c);
        n.appendChild(k)
      }
      0 < e.Td.length && (!e.B.Ae || e.B.le) && n.appendChild(document.createElement("hr"));
      e.B.le && (d = document.createElement("div"),
        d.setAttribute("class", "gg_context_row"), c = "text-align: left;margin: 0;padding: 5px 20px;", c += "vertical-align: left;", c += "cursor: pointer;", d.setAttribute("style", c), d.onclick = function () {
        e.cf()
      }, d.innerHTML = e.Be() ? "Exit Fullscreen" : "Enter Fullscreen", n.appendChild(d));
      e.B.Ae || (d = document.createElement("div"), c = "text-align: left;margin: 0;padding: 5px 20px;", c += "vertical-align: left;", d.setAttribute("style", c), d.setAttribute("class", "gg_context_row"), c = document.createElement("a"), c.href = e.wg("aHR0cDovL3Bhbm8ydnIuY29tLw=="),
        c.target = "_blank", c.innerHTML = e.wg("Q3JlYXRlZCB3aXRoIFBhbm8yVlI="), c.setAttribute("style", "color: black; text-decoration: none;"), d.appendChild(c), n.appendChild(d));
      e.M.insertBefore(e.Ub, e.M.firstChild);
      n.onclick = function () {
        e.Ub && (e.M.removeChild(e.Ub), e.Ub = null)
      };
      n.oncontextmenu = n.onclick
    }
  };
  e.prototype.oi = function () {
    var a = this, b;
    b = a.va;
    a.control = b;
    a.control = b;
    a.Yh();
    setTimeout(function () {
      a.Rf()
    }, 10);
    setTimeout(function () {
      a.xh()
    }, 200);
    setTimeout(function () {
      a.Rc();
      a.$d()
    }, 10);
    b.addEventListener && (b.addEventListener("touchstart",
      function (b) {
        a.tk(b)
      }, !1), b.addEventListener("touchmove", function (b) {
      a.sk(b)
    }, !1), b.addEventListener("touchend", function (b) {
      a.rk(b)
    }, !1), b.addEventListener("touchcancel", function (b) {
      a.qk(b)
    }, !1), b.addEventListener("pointerdown", function (b) {
      a.uh(b)
    }, !1), b.addEventListener("MSPointerDown", function (b) {
      a.uh(b)
    }, !1), b.addEventListener("MSGestureStart", function (b) {
      a.Jg(b)
    }, !1), b.addEventListener("MSGestureEnd", function (b) {
      a.Ig(b)
    }, !1), b.addEventListener("MSGestureChange", function (b) {
      a.rj(b)
    }, !1), b.addEventListener("gesturestart",
      function (b) {
        a.Jg(b)
      }, !1), b.addEventListener("gesturechange", function (b) {
      a.Fi(b)
    }, !1), b.addEventListener("gestureend", function (b) {
      a.Ig(b)
    }, !1), b.addEventListener("mousedown", function (b) {
      a.pj(b)
    }, !1), b.addEventListener("mousemove", function (b) {
      a.oj(b)
    }, !1), document.addEventListener("mouseup", function (b) {
      a.nj(b)
    }, !1), b.addEventListener("mousewheel", function (b) {
      a.sh(b)
    }, !1), b.addEventListener("DOMMouseScroll", function (b) {
      a.sh(b)
    }, !1), document.addEventListener("keydown", function (b) {
      a.kj(b)
    }, !1), document.addEventListener("keyup",
      function (b) {
        a.lj(b)
      }, !1), window.addEventListener("orientationchange", function () {
      a.Yh()
    }, !1), window.addEventListener("resize", function () {
      a.Rc()
    }, !1), window.addEventListener("blur", function () {
      a.wj()
    }, !1), a.M.addEventListener("webkitfullscreenchange", function () {
      a.Je()
    }, !1), document.addEventListener("mozfullscreenchange", function () {
      a.Je()
    }, !1), window.addEventListener("webkitfullscreenchange", function () {
      a.Je()
    }, !1), document.addEventListener("MSFullscreenChange", function () {
      a.Je()
    }, !1));
    b.oncontextmenu =
      function (b) {
        void 0 === b && (b = window.event);
        if (b.target && !a.ic(b.target))return !0;
        if (!b.ctrlKey) {
          b = a.Cd(b);
          var d = a.Hc();
          a.ck(b.x - d.x, b.y - d.y);
          return !1
        }
        return !0
      }
  };
  e.prototype.kg = function () {
    for (var a = 0; a < this.I.length; a++)if ("point" == this.I[a].type && (this.xa && this.xa.addSkinHotspot ? (this.I[a].Wc(), this.I[a].c = new this.xa.addSkinHotspot(this.I[a])) : this.I[a].c = new M(this, this.I[a]), this.I[a].c.__div.style.left = "-1000px", this.I[a].c.__div.style.top = "-1000px", this.I[a].c && this.I[a].c.__div)) {
      var b = this.va.firstChild;
      b ? this.va.insertBefore(this.I[a].c.__div, b) : this.va.appendChild(this.I[a].c.__div)
    }
  };
  e.prototype.fi = function () {
    var a, b = document.createElement("fakeelement"), c = {
      OTransition: "oTransitionEnd",
      MSTransition: "msTransitionEnd",
      MozTransition: "transitionend",
      WebkitTransition: "webkitTransitionEnd",
      transition: "transitionEnd"
    };
    for (a in c)if (void 0 !== b.style[a])return c[a]
  };
  e.prototype.uc = function (a) {
    var b = [];
    a = new RegExp(a, "");
    for (var c = 0; c < this.R.length; c++)a.test(this.R[c].id) && b.push(this.R[c]);
    for (c = 0; c <
    this.J.length; c++)a.test(this.J[c].id) && b.push(this.J[c]);
    for (c = 0; c < this.Ua.length; c++)a.test(this.Ua[c].id) && b.push(this.Ua[c]);
    return b
  };
  e.prototype.zc = function (a) {
    if (this.Sa) {
      var b = this.Y;
      if (b)return b.isPlaying(a)
    } else {
      if ("_main" === a)return !0;
      a = this.uc(a);
      if (0 < a.length)return !a[0].c.ended && !a[0].c.paused
    }
    return !1
  };
  e.prototype.cd = function (a, b) {
    if (this.Sa) {
      var c = this.Y;
      c && c.playSound(a, b)
    } else try {
      for (var c = this.uc(a), d = 0; d < c.length; d++) {
        var e = c[d];
        e.tc = b && !isNaN(Number(b)) ? Number(b) - 1 : e.loop - 1;
        -1 == e.tc && (e.tc = 1E7);
        e.c.play()
      }
    } catch (n) {
    }
  };
  e.prototype.yh = function (a, b) {
    for (var c = this.uc(a), d = 0; d < c.length; d++) {
      var e = c[d];
      this.zc(e.id) ? this.Sf(e.id) : this.cd(e.id, b)
    }
  };
  e.prototype.Sf = function (a) {
    if (this.Sa) {
      var b = this.Y;
      b && b.pauseSound(a)
    } else try {
      if ("_main" == a) {
        for (b = 0; b < this.R.length; b++)this.R[b].c.pause();
        for (b = 0; b < this.J.length; b++)this.J[b].c.pause()
      } else for (var c = this.uc(a), b = 0; b < c.length; b++)c[b].c.pause()
    } catch (d) {
    }
  };
  e.prototype.ki = function (a, b) {
    for (var c = this.uc(a), d = 0; d < c.length; d++) {
      var e =
        c[d];
      0 == b || 1 == b ? e.Ed && e.Ed(1 == b) : 2 == b && e.Yb && e.Yb()
    }
  };
  e.prototype.kk = function (a) {
    var b;
    if (this.Sa) (b = this.Y) && b.stopSound(a); else try {
      if ("_main" === a) {
        for (b = 0; b < this.R.length; b++)this.R[b].c.pause(), this.R[b].c.currentTime = 0;
        for (b = 0; b < this.J.length; b++)this.J[b].c.pause(), this.J[b].c.currentTime = 0
      } else {
        var c = this.uc(a);
        for (b = 0; b < c.length; b++) {
          var d = c[b];
          d.c && d.c.pause && (d.c.pause(), d.c.currentTime = 0)
        }
      }
    } catch (e) {
    }
  };
  e.prototype.ak = function (a, b) {
    if (this.Sa) {
      var c = this.Y;
      c && c.setVolume(a, b)
    } else try {
      var d =
        Number(b);
      1 < d && (d = 1);
      0 > d && (d = 0);
      "_video" === a && this.o.c && (this.o.c.volume = d);
      if ("_main" === a) {
        this.ba = d;
        for (c = 0; c < this.R.length; c++)this.R[c].c.volume = this.R[c].level * this.ba;
        for (c = 0; c < this.J.length; c++)this.J[c].c.volume = this.J[c].level * this.ba;
        this.o.c && (this.o.c.volume = this.ba)
      } else for (var e = this.uc(a), c = 0; c < e.length; c++) {
        var n = e[c];
        n.c && n.c.volume && (n.level = d, n.c.volume = d * this.ba)
      }
    } catch (f) {
    }
  };
  e.prototype.xi = function (a, b) {
    if (this.Sa) {
      var c = this.Y;
      c && c.changeVolume(a, b)
    } else try {
      var d;
      "_video" ===
      a && this.o.c && (this.o.c.volume = this.o.c.volume + Number(b));
      if ("_main" === a) {
        c = this.ba;
        c += Number(b);
        1 < c && (c = 1);
        0 > c && (c = 0);
        this.ba = c;
        for (d = 0; d < this.R.length; d++)this.R[d].c.volume = this.R[d].level * this.ba;
        for (d = 0; d < this.J.length; d++)this.J[d].c.volume = this.J[d].level * this.ba;
        this.o.c && (this.o.c.volume = this.ba)
      } else {
        var e = this.uc(a);
        for (d = 0; d < e.length; d++) {
          var n = e[d], c = n.level, c = c + Number(b);
          1 < c && (c = 1);
          0 > c && (c = 0);
          n.level = c;
          n.c.volume = c * this.ba
        }
      }
    } catch (f) {
    }
  };
  e.prototype.Ph = function () {
    try {
      for (var a = this, b =
        !1, c = !1, d = 0; d < this.R.length; d++) {
        var e = this.R[d];
        -1 != e.loop && (this.lb && this.ra.enabled && 4 != e.mode && 6 != e.mode ? this.ra.tg ? (e.c.play(), e.c.currentTime = 0, e.aa = 0, c = !0) : b = !0 : 4 == e.mode || 6 == e.mode || "_background" == e.id && this.zc(e.id) || (e.c.play(), e.c.currentTime && (e.c.currentTime = 0)))
      }
      b && setTimeout(function () {
        a.ra.ik()
      }, 1E3 * this.ra.pc);
      c && (this.ra.fk = this.lb.currentTime, this.ra.ek = setInterval(function () {
        a.ra.Di()
      }, 10))
    } catch (n) {
    }
  };
  e.prototype.Ch = function () {
    for (var a; 0 < this.I.length;)a = this.I.pop(), a.c && (this.va.removeChild(a.c.__div),
      delete a.c), a.c = null
  };
  e.prototype.bk = function () {
    this.M.style.zIndex = "auto";
    this.w.style.zIndex = "auto";
    this.Ea && this.Ea.ac && (this.Ea.ac.zIndex = (900).toString());
    this.va.style.zIndex = (1E3).toString();
    this.la.style.zIndex = (900).toString();
    this.na.style.zIndex = (1100).toString()
  };
  e.prototype.hd = function (a) {
    var b = this.isFullscreen !== a;
    this.isFullscreen !== a && (this.isFullscreen = a, this.update(100));
    if (this.isFullscreen) {
      if (this.gf)try {
        this.M.webkitRequestFullScreen ? this.M.webkitRequestFullScreen() : this.M.mozRequestFullScreen ?
            this.M.mozRequestFullScreen() : this.M.msRequestFullscreen ? this.M.msRequestFullscreen() : this.M.requestFullScreen ? this.M.requestFullScreen() : this.M.requestFullscreen && this.M.requestFullscreen()
      } catch (c) {
      }
      this.M.style.position = "absolute";
      a = this.Hc();
      this.M.style.left = window.pageXOffset - a.x + this.margin.left + "px";
      this.M.style.top = window.pageYOffset - a.y + this.margin.top + "px";
      document.body.style.overflow = "hidden";
      b && this.D && this.D.ggEnterFullscreen && this.D.ggEnterFullscreen()
    } else {
      if (this.gf)try {
        document.webkitIsFullScreen ?
          document.webkitCancelFullScreen() : document.mozFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.fullScreen && (document.cancelFullScreen ? document.cancelFullScreen() : document.exitFullscreen && document.exitFullscreen())
      } catch (c) {
      }
      this.M.style.position = "relative";
      this.M.style.left = "0px";
      this.M.style.top = "0px";
      document.body.style.overflow = "";
      b && this.D && this.D.ggExitFullscreen && this.D.ggExitFullscreen()
    }
    this.Rc()
  };
  e.prototype.cf = function () {
    this.hd(!this.isFullscreen)
  };
  e.prototype.Ci = function () {
    this.hd(!0)
  };
  e.prototype.exitFullscreen = function () {
    this.hd(!1)
  };
  e.prototype.Li = function () {
    return this.isFullscreen
  };
  e.prototype.gk = function (a, b, c) {
    this.u.enabled = !0;
    this.u.active = !0;
    this.u.jc = 0;
    this.u.startTime = (new Date).getTime();
    a && 0 != a && (this.u.speed = a);
    b && (this.u.timeout = b);
    c && (this.u.af = c)
  };
  e.prototype.jk = function () {
    this.u.active = !1;
    this.u.enabled = !1
  };
  e.prototype.pk = function () {
    this.u.enabled = !this.u.active;
    this.u.active = this.u.enabled;
    this.u.jc = 0;
    this.u.enabled && (this.u.startTime =
      (new Date).getTime())
  };
  e.prototype.sg = function (a) {
    if (this.Uc = document.getElementById(a)) {
      this.Uc.innerHTML = "";
      this.M = document.createElement("div");
      a = "top:\t0px;left: 0px;position:relative;-ms-touch-action: none;touch-action: none;text-align: left;" + (this.ua + "user-select: none;");
      this.M.setAttribute("style", a);
      this.Uc.appendChild(this.M);
      this.w = document.createElement("div");
      a = "top:\t0px;left: 0px;width:  100px;height: 100px;overflow: hidden;position:absolute;-ms-touch-action: none;touch-action: none;" +
        (this.ua + "user-select: none;");
      this.w.setAttribute("style", a);
      this.M.appendChild(this.w);
      if (this.Sa) {
        var b = document.createElement("div");
        a = "top:\t0px;left: 0px;width:  100%;height: 100%;overflow: hidden;position:absolute;-ms-touch-action: none;touch-action: none;" + (this.ua + "user-select: none;");
        b.setAttribute("id", this.Cf);
        b.setAttribute("style", a);
        this.w.appendChild(b)
      }
      this.Ea && (this.Ea.ac = document.createElement("canvas"), a = "top:\t0px;left: 0px;width:  100px;height: 100px;overflow: hidden;position:absolute;" +
        (this.ua + "user-select: none;"), a += this.ua + "pointer-events: none;", this.Ea.ac.setAttribute("style", a), this.M.appendChild(this.Ea.ac));
      this.va = document.createElement("div");
      a = "top:\t0px;left: 0px;width:  100px;height: 100px;overflow: hidden;position:absolute;";
      this.dh && (a += "background-image: url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7);");
      this.Ic && !this.ka && (a += this.ua + "transform: translateZ(9999999px);");
      a += this.ua + "user-select: none;";
      this.va.setAttribute("style",
        a);
      this.M.appendChild(this.va);
      this.la = document.createElement("canvas");
      a = "top:\t0px;left: 0px;width:  100px;height: 100px;overflow: hidden;position:absolute;" + (this.ua + "user-select: none;");
      a += this.ua + "pointer-events: none;";
      this.la.setAttribute("style", a);
      this.M.appendChild(this.la);
      this.na = document.createElement("div");
      this.na.setAttribute("style", "top:\t0px;left: 0px;position:absolute;padding: 3px;visibility: hidden;");
      this.na.innerHTML = " Hotspot text!";
      this.M.appendChild(this.na);
      this.divSkin =
        this.D = this.va;
      this.bk()
    } else alert("container not found!")
  };
  e.prototype.ug = function (a) {
    this.Ca = !0;
    return function () {
      a.da && (a.f && a.f.complete ? (a.loaded = !0, a.da.drawImage(a.f, 0, 0, a.width, a.height), a.f = null, a.nc = null) : a.nc && a.nc.complete && !a.loaded && (a.da.drawImage(a.nc, 0, 0, a.width, a.height), a.nc = null))
    }
  };
  e.prototype.rg = function (a) {
    var b, c, d, e = 128;
    this.f.mc && (this.w.style.backgroundColor = this.f.mc.replace("0x", "#"));
    a ? (e = this.td, this.Xd = 1) : this.oc > e && (e = this.oc);
    for (d = 0; 6 > d; d++) {
      c = this.Pa.Ja[d];
      a ? (c.width =
          this.td, c.height = this.td) : (c.C = document.createElement("canvas"), c.C.width = this.oc, c.C.height = this.oc, c.width = this.oc, c.height = this.oc, c.da = c.C.getContext("2d"));
      b = "position:absolute;";
      b += "left: 0px;";
      b += "top: 0px;";
      b += "width: " + e + "px;";
      b += "height: " + e + "px;";
      a && (b += "outline: 1px solid transparent;");
      b += this.ua + "transform-origin: 0% 0%;";
      b += "-webkit-user-select: none;";
      b += this.ua + "transform: ";
      var n;
      n = "";
      var f = 1;
      this.fd && (f = 100);
      n = 4 > d ? n + ("rotateY(" + -90 * d + "deg)") : n + ("rotateX(" + (4 == d ? -90 : 90) + "deg)");
      this.fd && (n += " scale(" + f + ")");
      n += " translate3d(" + -e / 2 + "px," + -e / 2 + "px," + -e * f / (2 * this.Xd) + "px)";
      b += n + ";";
      c.Sg = n;
      a || (c.C.setAttribute("style", b), this.w.insertBefore(c.C, this.w.firstChild))
    }
    if (!a) {
      for (d = 0; 6 > d; d++)c = this.Pa.Ja[d], "" != this.Vc[d] && (c.nc = new Image, c.nc.crossOrigin = this.crossOrigin, c.nc.onload = this.ug(c), c.nc.setAttribute("src", this.ub(this.Vc[d])), this.bb.push(c.nc));
      for (d = 0; 6 > d; d++)c = this.Pa.Ja[d], c.loaded = !1, c.f = new Image, c.f.crossOrigin = this.crossOrigin, c.f.onload = this.ug(c), c.f.setAttribute("src",
        this.ub(this.me[d])), this.bb.push(c.f)
    }
  };
  e.prototype.Dh = function () {
    var a;
    if (this.Hb) {
      for (a = 0; a < this.Pa.Ja.length; a++)this.Pa.Ja[a].C && this.Pa.Ja[a].C.setAttribute && (this.Pa.Ja[a].C.setAttribute("src", this.yg), this.w.removeChild(this.Pa.Ja[a].C));
      if (this.f.L) {
        for (a = 0; a < this.f.L.length; a++) {
          var b = this.f.L[a], c;
          for (c in b.$)if (b.$.hasOwnProperty(c)) {
            var d = b.$[c];
            d.visible = !1;
            d.C && (d.da && (d.da.clear ? d.da.clear() : d.da.clearRect(0, 0, d.da.canvas.width, d.da.canvas.height)), this.df.push(d.C));
            d.f && delete d.f;
            d.Pb && this.a.deleteTexture(d.Pb);
            d.da = null;
            d.C = null;
            d.f = null
          }
          delete b.$
        }
        delete this.f.L;
        this.f.L = null
      }
    }
    if (this.a && this.eb)for (; 0 < this.eb.length;)c = this.eb.pop(), c.uj = !0, this.a.deleteTexture(c);
    for (a = 0; a < this.J.length; a++)this.J[a].Nc();
    for (a = 0; a < this.Ua.length; a++)this.Ua[a].Nc();
    this.v.Nd = -1;
    this.la.style.visibility = "hidden";
    this.rb = 0;
    c = [];
    this.ra.Zd = [];
    for (a = 0; a < this.R.length; a++)if (b = this.R[a], 0 == b.mode || 1 == b.mode) c.push(b); else if (this.lb && this.ra.enabled && this.zc(b.id)) this.ra.Zd.push(b), 1 !=
    this.S.Ba && 2 != this.S.Ba && this.ra.Af(b); else {
      try {
        b.c.pause()
      } catch (e) {
      }
      b.Nc()
    }
    this.R = c;
    this.J = [];
    this.Ua = [];
    this.o.c && (this.M.removeChild(this.o.c), this.o.c = null);
    this.o.$c = !1;
    this.o.Ce = !1
  };
  e.prototype.Pg = function () {
    var a = 1, b = -1 != navigator.userAgent.indexOf("Mac");
    window.devicePixelRatio && b && (a = window.devicePixelRatio);
    return {hf: screen.width * a, ze: screen.height * a}
  };
  e.prototype.Mg = function () {
    var a = this.Pg();
    return a.hf > a.ze ? a.hf : a.ze
  };
  e.prototype.Wf = function (a, b) {
    var c = (new DOMParser).parseFromString(a,
      "text/xml");
    this.vf = a;
    this.Bh(c, b);
    this.Y && (this.Y.readConfigString(this.vf), this.Y.setLocked(!0), this.Y.setSlaveMode(!0))
  };
  e.prototype.Ah = function (a, b, c) {
    try {
      var d;
      d = new XMLHttpRequest;
      d.open("GET", a, !1);
      d.send(null);
      if (d.responseXML) {
        var e = a.lastIndexOf("/");
        0 <= e && (this.qc = a.substr(0, e + 1));
        2 <= arguments.length && null != b && (this.qc = b);
        this.Wf(d.responseText, c)
      } else alert("Error loading panorama XML")
    } catch (n) {
      alert("Error:" + n)
    }
  };
  e.prototype.Hj = function (a, b, c, d) {
    var e;
    e = new XMLHttpRequest;
    var n = this;
    e.onload = function (f) {
      if (4 <= e.readyState)if (e.responseXML) {
        var k = a.lastIndexOf("/");
        0 <= k && (n.qc = a.substr(0, k + 1));
        3 <= arguments.length && null != c && (n.qc = c);
        n.Wf(e.responseText, d);
        b && b()
      } else alert("Error loading panorama XML"); else console.error("Wrong state loading XML:" + e.statusText)
    };
    e.onerror = function () {
      console.error("Error loading XML:" + e.statusText)
    };
    e.open("GET", a, !0);
    e.send(null)
  };
  e.prototype.pf = function (a) {
    this.Sh("beforechangenode", {vj: this.currentNode, Pk: a});
    "" != this.currentNode && -1 == this.jg.indexOf(this.currentNode) &&
    this.jg.push(this.currentNode);
    "{" == a.charAt(0) ? this.currentNode = a.substr(1, a.length - 2) : this.currentNode = "";
    this.xa && this.xa.changeActiveNode && this.xa.changeActiveNode(a);
    this.Sh("changenode", {vj: this.currentNode, Ok: a})
  };
  e.prototype.Kg = function () {
    return this.currentNode
  };
  e.prototype.Ng = function () {
    if (0 < this.sa.length) {
      var a;
      a = this.sa.indexOf(this.currentNode);
      a++;
      a >= this.sa.length && (a = 0);
      return this.sa[a]
    }
    return ""
  };
  e.prototype.$i = function () {
    if (0 < this.sa.length) {
      var a;
      a = this.sa.indexOf(this.currentNode);
      a--;
      0 > a && (a = this.sa.length - 1);
      return this.sa[a]
    }
    return ""
  };
  e.prototype.tj = function (a) {
    return -1 != this.jg.indexOf(a)
  };
  e.prototype.Bh = function (a, b) {
    var c = a.firstChild;
    this.Pc = [];
    this.sa = [];
    if ("tour" == c.nodeName) {
      this.Ld = !0;
      var d = "", e;
      (e = c.getAttributeNode("start")) && (d = e.nodeValue.toString());
      this.hasOwnProperty("startNode") && this.startNode && (d = String(this.startNode), this.startNode = "");
      for (var c = c.firstChild, n = ""; c;)"panorama" == c.nodeName && (e = c.getAttributeNode("id")) && (e = e.nodeValue.toString(), "" == d &&
      (d = e), "" == n && (n = e), this.Pc[e] = c, this.sa.push(e)), c = c.nextSibling;
      this.Pc.hasOwnProperty(d) || (this.ad("Start node " + d + " not found!"), d = n);
      this.Vf(this.Pc[d], b);
      this.pf("{" + d + "}")
    } else this.Ld = !1, this.Vf(c, b), this.pf(""), this.sa.push("")
  };
  e.prototype.Vf = function (a, b) {
    this.Ch();
    this.Ea && this.Ea.Jj();
    this.gd(this.Qa);
    this.Dh();
    this.Od = 0;
    for (var c = a.firstChild, d, e, n = 0; c;) {
      if ("view" == c.nodeName) {
        if (d = c.getAttributeNode("fovmode")) this.g.mode = Number(d.nodeValue);
        d = c.getAttributeNode("pannorth");
        this.pan.Pf =
          1 * (d ? d.nodeValue : 0);
        for (var f = c.firstChild; f;)"start" == f.nodeName && (d = f.getAttributeNode("pan"), this.pan.b = Number(d ? d.nodeValue : 0), this.pan.fb = this.pan.b, d = f.getAttributeNode("tilt"), this.j.b = Number(d ? d.nodeValue : 0), this.j.fb = this.j.b, d = f.getAttributeNode("roll"), this.G.b = Number(d ? d.nodeValue : 0), this.G.fb = this.G.b, d = f.getAttributeNode("fov"), this.g.b = Number(d ? d.nodeValue : 70), this.g.fb = this.g.b), "min" == f.nodeName && (d = f.getAttributeNode("pan"), this.pan.min = 1 * (d ? d.nodeValue : 0), d = f.getAttributeNode("tilt"),
          this.j.min = 1 * (d ? d.nodeValue : -90), d = f.getAttributeNode("fov"), this.g.min = 1 * (d ? d.nodeValue : 5), 1E-20 > this.g.min && (this.g.min = 1E-20), d = f.getAttributeNode("fovpixel"), this.g.Ud = 1 * (d ? d.nodeValue : 0)), "max" == f.nodeName && (d = f.getAttributeNode("pan"), this.pan.max = 1 * (d ? d.nodeValue : 0), d = f.getAttributeNode("tilt"), this.j.max = 1 * (d ? d.nodeValue : 90), d = f.getAttributeNode("fov"), this.g.max = 1 * (d ? d.nodeValue : 120), 180 <= this.g.max && (this.g.max = 179.9)), f = f.nextSibling
      }
      if ("autorotate" == c.nodeName) {
        if (d = c.getAttributeNode("speed")) this.u.speed =
          1 * d.nodeValue;
        if (d = c.getAttributeNode("delay")) this.u.timeout = 1 * d.nodeValue;
        if (d = c.getAttributeNode("returntohorizon")) this.u.af = 1 * d.nodeValue;
        if (d = c.getAttributeNode("nodedelay")) this.u.Ie = 1 * d.nodeValue;
        if (d = c.getAttributeNode("noderandom")) this.u.Of = 1 == d.nodeValue;
        this.se && (this.u.enabled = !0, this.u.active = !1);
        if (d = c.getAttributeNode("startloaded")) this.u.Wd = 1 == d.nodeValue, this.u.Wd && (this.u.active = !1);
        if (d = c.getAttributeNode("useanimation")) this.u.bi = 1 == d.nodeValue
      }
      if ("animation" == c.nodeName)for (this.sc =
                                           [], f = c.firstChild; f;) {
        if ("clip" == f.nodeName) {
          this.T = {};
          (d = f.getAttributeNode("animtitle")) && (this.T.animtitle = d.nodeValue.toString());
          (d = f.getAttributeNode("cliptitle")) && (this.T.cliptitle = d.nodeValue.toString());
          (d = f.getAttributeNode("nodeid")) && (this.T.nodeid = d.nodeValue.toString());
          (d = f.getAttributeNode("length")) && (this.T.length = Number(d.nodeValue));
          (d = f.getAttributeNode("animtype")) && (this.T.animtype = Number(d.nodeValue));
          (d = f.getAttributeNode("nextcliptitle")) && (this.T.nextcliptitle = d.nodeValue.toString());
          (d = f.getAttributeNode("nextclipnodeid")) && (this.T.nextclipnodeid = d.nodeValue.toString());
          (d = f.getAttributeNode("transitiontype")) && (this.T.transitiontype = Number(d.nodeValue));
          var k = f.firstChild;
          for (this.T.keyframes = []; k;) {
            if ("keyframe" == k.nodeName) {
              var m = {};
              (d = k.getAttributeNode("time")) && (m.time = Number(d.nodeValue));
              (d = k.getAttributeNode("value")) && (m.value = Number(d.nodeValue));
              d = k.getAttributeNode("type");
              var p = 0;
              d && (m.type = Number(d.nodeValue), p = Number(d.nodeValue));
              (d = k.getAttributeNode("property")) &&
              (m.property = Number(d.nodeValue));
              if (1 == p || 2 == p) (d = k.getAttributeNode("bezierintime")) && (m.bezierintime = Number(d.nodeValue)), (d = k.getAttributeNode("bezierinvalue")) && (m.bezierinvalue = Number(d.nodeValue)), (d = k.getAttributeNode("bezierouttime")) && (m.bezierouttime = Number(d.nodeValue)), (d = k.getAttributeNode("bezieroutvalue")) && (m.bezieroutvalue = Number(d.nodeValue));
              this.T.keyframes.push(m)
            }
            k = k.nextSibling
          }
          this.lc == this.T.cliptitle && (d = this.T.keyframes, this.ag(d[0].value, d[1].value, d[2].value));
          this.sc.push(this.T)
        }
        f =
          f.nextSibling
      }
      "input" == c.nodeName && (e || (e = c));
      if (e)for (f = 0; 6 > f; f++)d = e.getAttributeNode("prev" + f + "url"), this.Vc[f] = d ? String(d.nodeValue) : "";
      "altinput" == c.nodeName && (f = 0, (d = c.getAttributeNode("screensize")) && (f = 1 * d.nodeValue), 0 < f && f <= this.Mg() && f > n && (n = f, e = c));
      if ("control" == c.nodeName && this.se) {
        if (d = c.getAttributeNode("simulatemass")) this.A.enabled = 1 == d.nodeValue;
        if (d = c.getAttributeNode("locked")) this.B.Wa = 1 == d.nodeValue;
        d && (this.B.Qd = 1 == d.nodeValue);
        if (d = c.getAttributeNode("lockedmouse")) this.B.Wa =
          1 == d.nodeValue;
        if (d = c.getAttributeNode("lockedkeyboard")) this.B.Qd = 1 == d.nodeValue;
        if (d = c.getAttributeNode("lockedkeyboardzoom")) this.B.Mf = 1 == d.nodeValue;
        if (d = c.getAttributeNode("lockedwheel")) this.B.Nf = 1 == d.nodeValue;
        if (d = c.getAttributeNode("invertwheel")) this.B.$g = 1 == d.nodeValue;
        if (d = c.getAttributeNode("speedwheel")) this.B.Nh = 1 * d.nodeValue;
        if (d = c.getAttributeNode("invertcontrol")) this.B.yc = 1 == d.nodeValue;
        if (d = c.getAttributeNode("sensitivity")) this.B.sensitivity = 1 * d.nodeValue, 1 > this.B.sensitivity &&
        (this.B.sensitivity = 1);
        if (d = c.getAttributeNode("dblclickfullscreen")) this.B.xf = 1 == d.nodeValue;
        if (d = c.getAttributeNode("contextfullscreen")) this.B.le = 1 == d.nodeValue;
        if (d = c.getAttributeNode("hideabout")) this.B.Ae = 1 == d.nodeValue;
        for (f = c.firstChild; f;)"menulink" == f.nodeName && (k = {
          text: "",
          url: ""
        }, d = f.getAttributeNode("text"), k.text = d.nodeValue, d = f.getAttributeNode("url"), k.url = d.nodeValue, this.Td.push(k)), f = f.nextSibling
      }
      if ("transition" == c.nodeName) {
        if (d = c.getAttributeNode("enabled")) this.S.enabled = 1 ==
          d.nodeValue;
        if (d = c.getAttributeNode("blendtime")) this.S.ng = d.nodeValue;
        if (d = c.getAttributeNode("blendcolor")) this.S.ie = d.nodeValue.toString();
        if (d = c.getAttributeNode("type")) this.S.type = d.nodeValue.toString();
        if (d = c.getAttributeNode("softedge")) this.S.Zb = 1 * d.nodeValue;
        if (d = c.getAttributeNode("zoomin")) this.S.Ba = d.nodeValue;
        if (d = c.getAttributeNode("zoomout")) this.S.Kb = d.nodeValue;
        if (d = c.getAttributeNode("zoomfov")) this.S.kf = d.nodeValue;
        if (d = c.getAttributeNode("zoomspeed")) this.S.ge = d.nodeValue;
        if (d =
            c.getAttributeNode("zoomoutpause")) this.S.lf = 1 == d.nodeValue
      }
      if ("soundstransition" == c.nodeName) {
        if (d = c.getAttributeNode("enabled")) this.ra.enabled = 1 == d.nodeValue;
        if (d = c.getAttributeNode("transitiontime")) this.ra.pc = 1 * d.nodeValue;
        if (d = c.getAttributeNode("crossfade")) this.ra.tg = 1 == d.nodeValue
      }
      "userdata" == c.nodeName && (this.userdata = this.od = this.re(c));
      if ("hotspots" == c.nodeName)for (f = c.firstChild; f;) {
        if ("label" == f.nodeName) {
          k = this.v.fg;
          if (d = f.getAttributeNode("enabled")) k.enabled = 1 == d.nodeValue;
          if (d = f.getAttributeNode("width")) k.width =
            1 * d.nodeValue;
          if (d = f.getAttributeNode("height")) k.height = 1 * d.nodeValue;
          if (d = f.getAttributeNode("textcolor")) k.gg = 1 * d.nodeValue;
          if (d = f.getAttributeNode("textalpha")) k.eg = 1 * d.nodeValue;
          if (d = f.getAttributeNode("background")) k.background = 1 == d.nodeValue;
          if (d = f.getAttributeNode("backgroundalpha")) k.Mb = 1 * d.nodeValue;
          if (d = f.getAttributeNode("backgroundcolor")) k.mb = 1 * d.nodeValue;
          if (d = f.getAttributeNode("border")) k.nf = 1 * d.nodeValue;
          if (d = f.getAttributeNode("bordercolor")) k.ob = 1 * d.nodeValue;
          if (d = f.getAttributeNode("borderalpha")) k.Nb =
            1 * d.nodeValue;
          if (d = f.getAttributeNode("borderradius")) k.mf = 1 * d.nodeValue;
          if (d = f.getAttributeNode("wordwrap")) k.jf = 1 == d.nodeValue
        }
        if ("polystyle" == f.nodeName) {
          if (d = f.getAttributeNode("mode")) this.v.mode = 1 * d.nodeValue;
          if (d = f.getAttributeNode("bordercolor")) this.v.ob = 1 * d.nodeValue;
          if (d = f.getAttributeNode("backgroundcolor")) this.v.mb = 1 * d.nodeValue;
          if (d = f.getAttributeNode("borderalpha")) this.v.Nb = 1 * d.nodeValue;
          if (d = f.getAttributeNode("backgroundalpha")) this.v.Mb = 1 * d.nodeValue;
          if (d = f.getAttributeNode("handcursor")) this.v.Yc =
            1 == d.nodeValue
        }
        d = void 0;
        "hotspot" == f.nodeName && (d = new Y(this), d.type = "point", d.Za(f), this.I.push(d));
        "polyhotspot" == f.nodeName && (d = new Y(this), d.type = "poly", d.Za(f), this.I.push(d));
        f = f.nextSibling
      }
      if ("sounds" == c.nodeName || "media" == c.nodeName)for (f = c.firstChild; f;)"sound" != f.nodeName || this.vh || (d = new U(this), d.Za(f), this.Sa || d.addElement()), "video" == f.nodeName && (d = new V(this), d.Za(f), this.Sa || d.addElement()), "image" == f.nodeName && (d = new W(this), d.Za(f), this.Sa || d.addElement()), "lensflare" == f.nodeName &&
      this.Ea && (d = new X(this), d.Za(f), this.Ea.Pd.push(d)), f = f.nextSibling;
      c = c.nextSibling
    }
    b && "" != b && (c = b.toString().split("/"), 0 < c.length && (d = String(c[0]), "N" == d.charAt(0) ? this.$f(Number(d.substr(1))) : "S" == d.charAt(0) ? this.$f(-180 + Number(d.substr(1))) : this.Zf(Number(d))), 1 < c.length && this.bg(Number(c[1])), 2 < c.length && this.Re(Number(c[2])));
    if (e) {
      for (f = 0; 6 > f; f++)(d = e.getAttributeNode("tile" + f + "url")) && (this.me[f] = String(d.nodeValue)), d = e.getAttributeNode("tile" + f + "url1");
      for (f = 0; 6 > f; f++)(d = e.getAttributeNode("prev" +
        f + "url")) && (this.Vc[f] = String(d.nodeValue));
      if (d = e.getAttributeNode("tilesize")) this.oc = 1 * d.nodeValue;
      if (d = e.getAttributeNode("canvassize")) this.td = Number(d.nodeValue);
      if (d = e.getAttributeNode("tilescale")) this.Xd = 1 * d.nodeValue;
      if (d = e.getAttributeNode("leveltileurl")) this.f.ph = d.nodeValue;
      if (d = e.getAttributeNode("leveltilesize")) this.f.Z = Number(d.nodeValue);
      if (d = e.getAttributeNode("levelbias")) this.f.nh = Number(d.nodeValue);
      if (d = e.getAttributeNode("levelbiashidpi")) this.f.oh = Number(d.nodeValue);
      d = e.getAttributeNode("overlap");
      this.oa.G = 0;
      this.oa.pitch = 0;
      d && (this.f.Va = Number(d.nodeValue));
      if (d = e.getAttributeNode("levelingroll")) this.oa.G = Number(d.nodeValue);
      if (d = e.getAttributeNode("levelingpitch")) this.oa.pitch = Number(d.nodeValue);
      this.rb = 0;
      (d = e.getAttributeNode("flat")) && 1 == d.nodeValue && (this.rb = 2);
      d = e.getAttributeNode("width");
      this.f.width = 1 * (d ? d.nodeValue : 1);
      d = e.getAttributeNode("height");
      this.f.height = 1 * (d ? d.nodeValue : this.f.width);
      this.o.src = [];
      this.f.L = [];
      for (f = e.firstChild; f;) {
        if ("preview" == f.nodeName) {
          if (d = f.getAttributeNode("color")) this.f.mc =
            d.nodeValue;
          if (d = f.getAttributeNode("strip")) this.f.zh = 1 == d.nodeValue
        }
        if ("video" == f.nodeName) {
          if (d = f.getAttributeNode("format")) this.o.format = d.nodeValue.toString();
          if (d = f.getAttributeNode("bleed")) this.o.he = Number(d.nodeValue);
          if (d = f.getAttributeNode("endaction")) this.o.Fc = String(d.nodeValue);
          if (d = f.getAttributeNode("width")) this.o.width = Number(d.nodeValue);
          if (d = f.getAttributeNode("height")) this.o.height = Number(d.nodeValue);
          for (e = f.firstChild; e;)"source" == e.nodeName && (d = e.getAttributeNode("url")) &&
          this.o.src.push(d.nodeValue.toString()), e = e.nextSibling
        }
        if ("level" == f.nodeName) {
          e = {width: 0, height: 0, cache: !1, Uf: !1, Ma: 0, Fb: 0, $: []};
          d = f.getAttributeNode("width");
          e.width = 1 * (d ? d.nodeValue : 1);
          d = f.getAttributeNode("height");
          e.height = 1 * (d ? d.nodeValue : e.width);
          if (d = f.getAttributeNode("preload")) e.cache = 1 == d.nodeValue;
          if (d = f.getAttributeNode("preview")) e.Uf = 1 == d.nodeValue;
          e.Ma = Math.floor((e.width + this.f.Z - 1) / this.f.Z);
          e.Fb = Math.floor((e.height + this.f.Z - 1) / this.f.Z);
          this.f.L.push(e)
        }
        f = f.nextSibling
      }
      this.f.lh =
        this.f.L.length
    }
    this.ae && (this.ka = this.Hb = !1, this.pb || (this.pb = document.createElement("canvas"), this.pb.width = 100, this.pb.height = 100, this.pb.id = "dummycanvas", this.w.appendChild(this.pb)), this.Sc());
    this.ka && this.a && (this.Yg(this.Xd), this.Zg());
    this.Hb && (0 < this.f.L.length ? this.rg(!0) : this.rg(!1), this.Od = 0);
    var l = this;
    0 < this.f.L.length && this.f.zh && 0 == this.rb && (e = new Image, e.crossOrigin = this.crossOrigin, e.onload = this.sj(e), e.setAttribute("src", this.$e(6, this.f.L.length - 1, 0, 0)));
    if (0 < this.o.src.length)if (this.Kf) "{" ==
    this.o.Fc.charAt(0) && l.Lc(l.o.Fc, "$fwd"); else {
      this.o.c = document.createElement("video");
      this.o.c.crossOrigin = this.crossOrigin;
      this.o.c.setAttribute("style", "display:none; max-width:none;");
      this.o.c.ji = !0;
      this.o.c.volume = this.ba;
      this.M.appendChild(this.o.c);
      this.o.$c = !1;
      this.o.c.oncanplay = function () {
        if (!l.o.$c) {
          l.o.Ce = !0;
          var a, b, c, d, e, f, g = [], k = new y, m = l.a, n = l.o.c.videoWidth / 3;
          for (a = 0; 6 > a; a++)for (c = a % 3 * n + l.o.he, e = c + n - 2 * l.o.he, d = 4, 3 <= a && (d += n), f = d + n - 2 * l.o.he, b = 0; 4 > b; b++) {
            k.x = -1;
            k.y = -1;
            k.z = 1;
            for (var p =
              0; p < b; p++)k.Hh();
            g.push((0 < k.x ? c : e) / (3 * n), (0 < k.y ? d : f) / (2 * n))
          }
          m.bindBuffer(m.ARRAY_BUFFER, l.o.Xe);
          m.bufferData(m.ARRAY_BUFFER, new Float32Array(g), m.STATIC_DRAW)
        }
      };
      "exit" == this.o.Fc ? this.o.c.onended = function () {
          l.o.Ce = !1;
          l.o.$c = !1;
          l.M.removeChild(l.o.c);
          l.o.c = null
        } : "stop" == this.o.Fc ? l.o.c.onended = function () {
          } : "{" == this.o.Fc.charAt(0) ? this.o.c.onended = function () {
              l.Lc(l.o.Fc, "$fwd")
            } : this.o.c.loop = !0;
      for (f = 0; f < this.o.src.length; f++)e = document.createElement("source"), e.setAttribute("src", this.ub(this.o.src[f])),
        this.o.c.appendChild(e);
      this.o.c.play()
    }
    this.kg();
    this.S.Ec || this.Ph();
    this.update();
    this.se && this.D && this.D.ggViewerInit && this.D.ggViewerInit();
    this.se = !1;
    this.Id = !0;
    this.Sc()
  };
  e.prototype.Qf = function (a, b) {
    0 < a.length && (".xml" == a.substr(a.length - 4) || ".swf" == a.substr(a.length - 4) || "{" == a.charAt(0) ? this.Lc(this.ub(a), b) : window.open(this.ub(a), b))
  };
  e.prototype.hk = function () {
    this.Id = this.isLoaded = !1;
    this.checkLoaded = this.bb = [];
    this.Ke = 0;
    this.D && this.D.ggReLoaded && this.D.ggReLoaded()
  };
  e.prototype.Lc = function (a,
                             b) {
    this.hk();
    this.xa && this.xa.hotspotProxyOut && this.xa.hotspotProxyOut(this.ma.id);
    ".swf" == a.substr(a.length - 4) && (a = a.substr(0, a.length - 4) + ".xml");
    var c = "";
    b && (c = b.toString());
    c = c.replace("$cur", this.pan.b + "/" + this.j.b + "/" + this.g.b);
    c = c.replace("$fwd", "N" + this.we() + "/" + this.j.b + "/" + this.g.b);
    c = c.replace("$bwd", "S" + this.we() + "/" + this.j.b + "/" + this.g.b);
    c = c.replace("$ap", String(this.pan.b));
    c = c.replace("$an", String(this.we()));
    c = c.replace("$at", String(this.j.b));
    c = c.replace("$af", String(this.g.b));
    if ("" !=
      c) {
      var d = c.split("/");
      3 < d.length && "" != d[3] && (this.startNode = d[3])
    }
    this.ia();
    if ("{" == a.charAt(0)) {
      var d = a.substr(1, a.length - 2), e = this.S, n = this.a;
      if (this.Pc[d]) {
        if (0 == this.rb && this.S.enabled && this.ka && this.S.kb) {
          e.ld || e.Ec || (e.th = this.B.Wa, e.gh = this.B.Qd, this.Te(!0), this.Se(!0));
          var f;
          "wipeleftright" == e.type ? f = 1 : "wiperightleft" == e.type ? f = 2 : "wipetopbottom" == e.type ? f = 3 : "wipebottomtop" == e.type ? f = 4 : "wiperandom" == e.type && (f = Math.ceil(4 * Math.random()));
          e.wf = f;
          n.bindFramebuffer(n.FRAMEBUFFER, e.kb);
          n.viewport(0,
            0, e.kb.width, e.kb.height);
          n.clear(n.COLOR_BUFFER_BIT | n.DEPTH_BUFFER_BIT);
          e.Yd = !0;
          this.$d();
          e.Yd = !1;
          n.bindFramebuffer(n.FRAMEBUFFER, null);
          n.viewport(0, 0, this.Ta.width, this.Ta.height);
          f = new Date;
          this.ma != this.Qa ? (e.ee = this.ma.sb / this.l.width, e.fe = 1 - this.ma.Ya / this.l.height) : (e.ee = .5, e.fe = .5);
          1 != e.Ba && 2 != e.Ba ? (e.dg = f.getTime(), e.ld = !0) : (e.hi = f.getTime(), e.Ec = !0, e.Na = Math.sin(this.Wb() / 2 * Math.PI / 180) / Math.sin(e.kf / 2 * Math.PI / 180), e.Na = Math.max(e.Na, 1), e.gi = 1 / e.ge * e.Na * .3)
        }
        this.Vf(this.Pc[d], c);
        this.pf(a);
        e.enabled && this.ka && (1 == e.Kb || 2 == e.Kb || 3 == e.Kb) && (e.Ve = this.ve(), e.We = this.xe(), e.jd = this.Wb(), 1 == e.Kb || 3 == e.Kb ? this.Ue(e.kf) : this.Ue(this.Bd() + (this.Bd() - e.kf)), e.lf || 1 == e.Ba || 2 == e.Ba || this.moveTo(e.Ve, e.We, e.jd, e.ge));
        this.Y && this.Y.openNext(a, c)
      } else {
        this.ad("invalid node id: " + d);
        return
      }
    } else this.Ah(a, null, c);
    this.update(5)
  };
  e.prototype.Ri = function () {
    return this.Ld ? this.sa.slice(0) : [""]
  };
  e.prototype.re = function (a) {
    var b, c;
    c = [];
    c.title = "";
    c.description = "";
    c.author = "";
    c.datetime = "";
    c.copyright =
      "";
    c.source = "";
    c.information = "";
    c.comment = "";
    c.latitude = 0;
    c.longitude = 0;
    c.tags = [];
    if (a && ((b = a.getAttributeNode("title")) && (c.title = b.nodeValue.toString()), (b = a.getAttributeNode("description")) && (c.description = b.nodeValue.toString()), (b = a.getAttributeNode("author")) && (c.author = b.nodeValue.toString()), (b = a.getAttributeNode("datetime")) && (c.datetime = b.nodeValue.toString()), (b = a.getAttributeNode("copyright")) && (c.copyright = b.nodeValue.toString()), (b = a.getAttributeNode("source")) && (c.source = b.nodeValue.toString()),
      (b = a.getAttributeNode("info")) && (c.information = b.nodeValue.toString()), (b = a.getAttributeNode("comment")) && (c.comment = b.nodeValue.toString()), (b = a.getAttributeNode("latitude")) && (c.latitude = Number(b.nodeValue)), (b = a.getAttributeNode("longitude")) && (c.longitude = Number(b.nodeValue)), b = a.getAttributeNode("tags"))) {
      a = b.nodeValue.toString().split("|");
      for (b = 0; b < a.length; b++)"" == a[b] && (a.splice(b, 1), b--);
      c.tags = a
    }
    return c
  };
  e.prototype.Ef = function (a) {
    if (!a)return this.od;
    if (a = this.Pc[a])for (a = a.firstChild; a;) {
      if ("userdata" ==
        a.nodeName)return this.re(a);
      a = a.nextSibling
    }
    return this.re()
  };
  e.prototype.Si = function (a) {
    a = this.Ef(a);
    var b = [];
    "" != a.latitude && 0 != a.latitude && 0 != a.longitude && (b.push(a.latitude), b.push(a.longitude));
    return b
  };
  e.prototype.Ti = function (a) {
    return this.Ef(a).title
  };
  e.prototype.Lg = function (a, b) {
    var c;
    for (c = 0; c < this.T.keyframes.length; c++)if (this.T.keyframes[c].time == a && this.T.keyframes[c].property == b)return this.T.keyframes[c];
    return !1
  };
  e.prototype.Qi = function (a) {
    var b, c = 1E5, d = a, e = !1;
    for (b = 0; b < this.T.keyframes.length; b++)this.T.keyframes[b].property ==
    a.property && this.T.keyframes[b].time > a.time && this.T.keyframes[b].time < c && (d = this.T.keyframes[b], c = d.time, e = !0);
    return e ? d : !1
  };
  e.prototype.Ik = function () {
    this.o.c && this.o.c.play()
  };
  e.prototype.Jk = function () {
    this.o.c && (this.o.c.pause(), this.o.c.time = 0)
  };
  e.prototype.Hk = function () {
    this.o.c && this.o.c.pause()
  };
  e.prototype.$j = function (a) {
    this.o.c && (0 > a && (a = 0), a > this.o.c.duration && (a = this.o.c.duration - .1), this.o.c.currentTime = a, this.update())
  };
  e.prototype.ej = function () {
    return this.o.c ? this.o.c.currentTime :
      0
  };
  e.prototype.dj = function () {
    if (this.o.c)return this.o.c
  };
  e.prototype.Bi = function () {
    this.vh = !0
  };
  return e
}();
window.pano2vrPlayer = Z;
Z.prototype.readConfigString = Z.prototype.Wf;
Z.prototype.readConfigUrl = Z.prototype.Ah;
Z.prototype.readConfigUrlAsync = Z.prototype.Hj;
Z.prototype.readConfigXml = Z.prototype.Bh;
Z.prototype.openUrl = Z.prototype.Qf;
Z.prototype.openNext = Z.prototype.Lc;
Z.prototype.setMargins = Z.prototype.Vj;
Z.prototype.addListener = Z.prototype.addListener;
Z.prototype.removeEventListener = Z.prototype.removeEventListener;
Z.prototype.detectBrowser = Z.prototype.xg;
Z.prototype.initWebGL = Z.prototype.xc;
Z.prototype.getPercentLoaded = Z.prototype.Wi;
Z.prototype.setBasePath = Z.prototype.Pj;
Z.prototype.getBasePath = Z.prototype.Gi;
Z.prototype.setViewerSize = Z.prototype.Lh;
Z.prototype.getViewerSize = Z.prototype.hj;
Z.prototype.setSkinObject = Z.prototype.Zj;
Z.prototype.changeViewMode = Z.prototype.vi;
Z.prototype.getViewMode = Z.prototype.fj;
Z.prototype.changePolygonMode = Z.prototype.qg;
Z.prototype.setPolygonMode = Z.prototype.qg;
Z.prototype.getPolygonMode = Z.prototype.Yi;
Z.prototype.changeViewState = Z.prototype.wi;
Z.prototype.getViewState = Z.prototype.gj;
Z.prototype.setRenderFlags = Z.prototype.Xj;
Z.prototype.getRenderFlags = Z.prototype.aj;
Z.prototype.setMaxTileCount = Z.prototype.Kh;
Z.prototype.getVFov = Z.prototype.Wb;
Z.prototype.setVFov = Z.prototype.Ue;
Z.prototype.updatePanorama = Z.prototype.$d;
Z.prototype.isTouching = Z.prototype.jj;
Z.prototype.getIsMobile = Z.prototype.Ni;
Z.prototype.setIsMobile = Z.prototype.Tj;
Z.prototype.getIsAutorotating = Z.prototype.Ki;
Z.prototype.getIsLoaded = Z.prototype.Mi;
Z.prototype.getIsTileLoading = Z.prototype.Oi;
Z.prototype.getLastActivity = Z.prototype.Pi;
Z.prototype.getPan = Z.prototype.ve;
Z.prototype.getPanNorth = Z.prototype.we;
Z.prototype.getPanDest = Z.prototype.Ui;
Z.prototype.getPanN = Z.prototype.Vi;
Z.prototype.setPan = Z.prototype.Zf;
Z.prototype.setPanNorth = Z.prototype.$f;
Z.prototype.changePan = Z.prototype.je;
Z.prototype.changePanLog = Z.prototype.ti;
Z.prototype.getTilt = Z.prototype.xe;
Z.prototype.getTiltDest = Z.prototype.cj;
Z.prototype.setTilt = Z.prototype.bg;
Z.prototype.changeTilt = Z.prototype.ke;
Z.prototype.changeTiltLog = Z.prototype.ui;
Z.prototype.getFov = Z.prototype.Bd;
Z.prototype.getFovDest = Z.prototype.Ii;
Z.prototype.setFov = Z.prototype.Re;
Z.prototype.changeFov = Z.prototype.pg;
Z.prototype.changeFovLog = Z.prototype.ud;
Z.prototype.getRoll = Z.prototype.bj;
Z.prototype.setRoll = Z.prototype.Yj;
Z.prototype.setPanTilt = Z.prototype.Wj;
Z.prototype.setPanTiltFov = Z.prototype.ag;
Z.prototype.setDefaultView = Z.prototype.Rj;
Z.prototype.setLocked = Z.prototype.Uj;
Z.prototype.setLockedMouse = Z.prototype.Te;
Z.prototype.setLockedKeyboard = Z.prototype.Se;
Z.prototype.setLockedWheel = Z.prototype.Jh;
Z.prototype.moveTo = Z.prototype.moveTo;
Z.prototype.moveToDefaultView = Z.prototype.qj;
Z.prototype.addHotspotElements = Z.prototype.kg;
Z.prototype.playSound = Z.prototype.cd;
Z.prototype.playPauseSound = Z.prototype.yh;
Z.prototype.pauseSound = Z.prototype.Sf;
Z.prototype.activateSound = Z.prototype.ki;
Z.prototype.isPlaying = Z.prototype.zc;
Z.prototype.stopSound = Z.prototype.kk;
Z.prototype.setVolume = Z.prototype.ak;
Z.prototype.changeVolume = Z.prototype.xi;
Z.prototype.removeHotspots = Z.prototype.Ch;
Z.prototype.addHotspot = Z.prototype.li;
Z.prototype.updateHotspot = Z.prototype.wk;
Z.prototype.removeHotspot = Z.prototype.Ij;
Z.prototype.setActiveHotspot = Z.prototype.gd;
Z.prototype.getPointHotspotIds = Z.prototype.Xi;
Z.prototype.getHotspot = Z.prototype.Ji;
Z.prototype.setFullscreen = Z.prototype.hd;
Z.prototype.toggleFullscreen = Z.prototype.cf;
Z.prototype.enterFullscreen = Z.prototype.Ci;
Z.prototype.exitFullscreen = Z.prototype.exitFullscreen;
Z.prototype.getIsFullscreen = Z.prototype.Li;
Z.prototype.startAutorotate = Z.prototype.gk;
Z.prototype.stopAutorotate = Z.prototype.jk;
Z.prototype.toggleAutorotate = Z.prototype.pk;
Z.prototype.createLayers = Z.prototype.sg;
Z.prototype.removePanorama = Z.prototype.Dh;
Z.prototype.getScreenResolution = Z.prototype.Pg;
Z.prototype.getMaxScreenResolution = Z.prototype.Mg;
Z.prototype.getNodeIds = Z.prototype.Ri;
Z.prototype.getNodeUserdata = Z.prototype.Ef;
Z.prototype.getNodeLatLng = Z.prototype.Si;
Z.prototype.getNodeTitle = Z.prototype.Ti;
Z.prototype.getCurrentNode = Z.prototype.Kg;
Z.prototype.getNextNode = Z.prototype.Ng;
Z.prototype.getPrevNode = Z.prototype.$i;
Z.prototype.getCurrentPointHotspots = Z.prototype.Hi;
Z.prototype.getPositionAngles = Z.prototype.Zi;
Z.prototype.getPositionRawAngles = Z.prototype.Og;
Z.prototype.nodeVisited = Z.prototype.tj;
Z.prototype.setElementIdPrefix = Z.prototype.Sj;
Z.prototype.videoPanoPlay = Z.prototype.Ik;
Z.prototype.videoPanoStop = Z.prototype.Jk;
Z.prototype.videoPanoPause = Z.prototype.Hk;
Z.prototype.getVideoPanoTime = Z.prototype.ej;
Z.prototype.setVideoPanoTime = Z.prototype.$j;
Z.prototype.getVideoPanoObject = Z.prototype.dj;
Z.prototype.disableSoundLoading = Z.prototype.Bi;
Z.prototype.setCrossOrigin = Z.prototype.Qj;
