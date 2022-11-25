/*
 * glfx.js
 * http://evanw.github.com/glfx.js/
 *
 * Copyright 2011 Evan Wallace
 * Released under the MIT license
 */
var fx = function () {
  function q(a, d, c) {
    return Math.max(a, Math.min(d, c))
  }

  function w(b) {
    return {
      _: b,
      loadContentsOf: function (b) {
        a = this._.gl;
        this._.loadContentsOf(b)
      },
      destroy: function () {
        a = this._.gl;
        this._.destroy()
      }
    }
  }

  function A(a) {
    return w(r.fromElement(a))
  }

  function B(b, d) {
    var c = a.UNSIGNED_BYTE;
    if (a.getExtension("OES_texture_float") && a.getExtension("OES_texture_float_linear")) {
      var e = new r(100, 100, a.RGBA, a.FLOAT);
      try {
        e.drawTo(function () {
          c = a.FLOAT
        })
      } catch (g) {}
      e.destroy()
    }
    this._.texture && this._.texture.destroy();
    this._.spareTexture && this._.spareTexture.destroy();
    this.width = b;
    this.height = d;
    this._.texture = new r(b, d, a.RGBA, c);
    this._.spareTexture = new r(b, d, a.RGBA, c);
    this._.extraTexture = this._.extraTexture || new r(0, 0, a.RGBA, c);
    this._.flippedShader = this._.flippedShader || new h(null, "uniform sampler2D texture;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,vec2(texCoord.x,1.0-texCoord.y));}");
    this._.isInitialized = !0
  }

  function C(a, d, c) {
    this._.isInitialized &&
      a._.width == this.width && a._.height == this.height || B.call(this, d ? d : a._.width, c ? c : a._.height);
    a._.use();
    this._.texture.drawTo(function () {
      h.getDefaultShader().drawRect()
    });
    return this
  }

  function D() {
    this._.texture.use();
    this._.flippedShader.drawRect();
    return this
  }

  function f(a, d, c, e) {
    (c || this._.texture).use();
    this._.spareTexture.drawTo(function () {
      a.uniforms(d).drawRect()
    });
    this._.spareTexture.swapWith(e || this._.texture)
  }

  function k(b) {
    return function () {
      a = this._.gl;
      return b.apply(this, arguments)
    }
  }

  function z(a) {
    var d = a.length;
    this.xa = [];
    this.ya = [];
    this.u = [];
    this.y2 = [];
    a.sort(function (a, b) {
      return a[0] - b[0]
    });
    for (var c = 0; c < d; c++) this.xa.push(a[c][0]), this.ya.push(a[c][1]);
    this.u[0] = 0;
    this.y2[0] = 0;
    for (c = 1; c < d - 1; ++c) {
      a = this.xa[c + 1] - this.xa[c - 1];
      var e = (this.xa[c] - this.xa[c - 1]) / a,
        g = e * this.y2[c - 1] + 2;
      this.y2[c] = (e - 1) / g;
      this.u[c] = (6 * ((this.ya[c + 1] - this.ya[c]) / (this.xa[c + 1] - this.xa[c]) - (this.ya[c] - this.ya[c - 1]) / (this.xa[c] - this.xa[c - 1])) / a - e * this.u[c - 1]) / g
    }
    this.y2[d - 1] = 0;
    for (c = d - 2; 0 <= c; --c) this.y2[c] = this.y2[c] * this.y2[c + 1] + this.u[c]
  }

  function u(a, d) {
    return new h(null, a + "uniform sampler2D texture;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 coord=texCoord*texSize;" +
      d + "gl_FragColor=texture2D(texture,coord/texSize);vec2 clampedCoord=clamp(coord,vec2(0.0),texSize);if(coord!=clampedCoord){gl_FragColor.a*=max(0.0,1.0-length(coord-clampedCoord));}}")
  }

  function H(b, d) {
    a.brightnessContrast = a.brightnessContrast || new h(null, "uniform sampler2D texture;uniform float brightness;uniform float contrast;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color.rgb+=brightness;if(contrast>0.0){color.rgb=(color.rgb-0.5)/(1.0-contrast)+0.5;}else{color.rgb=(color.rgb-0.5)*(1.0+contrast)+0.5;}gl_FragColor=color;}");
    f.call(this, a.brightnessContrast, {
      brightness: q(-1, b, 1),
      contrast: q(-1, d, 1)
    });
    return this
  }

  function t(a) {
    a = new z(a);
    for (var d = [], c = 0; 256 > c; c++) d.push(q(0, Math.floor(256 * a.interpolate(c / 255)), 255));
    return d
  }

  function Z(b, d, c, e) {
    a.bulgePinch = a.bulgePinch || u("uniform float radius;uniform float strength;uniform vec2 center;", "coord-=center;float distance=length(coord);if(distance<radius){float percent=distance/radius;if(strength>0.0){coord*=mix(1.0,smoothstep(0.0,radius/distance,percent),strength*0.75);}else{coord*=mix(1.0,pow(percent,1.0+strength*0.75)*radius/distance,1.0-percent);}}coord+=center;");
    f.call(this, a.bulgePinch, {
      radius: c,
      strength: q(-1, e, 1),
      center: [b, d],
      texSize: [this.width, this.height]
    });
    return this
  }

  var v = {};
  (function () {
    function a(b) {
      if (!b.getExtension("OES_texture_float")) return !1;
      var c = b.createFramebuffer(),
        e = b.createTexture();
      b.bindTexture(b.TEXTURE_2D, e);
      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST);
      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST);
      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
      b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, 1, 1, 0, b.RGBA, b.UNSIGNED_BYTE, null);
      b.bindFramebuffer(b.FRAMEBUFFER, c);
      b.framebufferTexture2D(b.FRAMEBUFFER, b.COLOR_ATTACHMENT0, b.TEXTURE_2D, e, 0);
      c = b.createTexture();
      b.bindTexture(b.TEXTURE_2D, c);
      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR);
      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
      b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
      b.texImage2D(b.TEXTURE_2D,
        0, b.RGBA, 2, 2, 0, b.RGBA, b.FLOAT, new Float32Array([2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
      var e = b.createProgram(),
        d = b.createShader(b.VERTEX_SHADER),
        g = b.createShader(b.FRAGMENT_SHADER);
      b.shaderSource(d, "attribute vec2 vertex;void main(){gl_Position=vec4(vertex,0.0,1.0);}");
      b.shaderSource(g, "uniform sampler2D texture;void main(){gl_FragColor=texture2D(texture,vec2(0.5));}");
      b.compileShader(d);
      b.compileShader(g);
      b.attachShader(e, d);
      b.attachShader(e,
        g);
      b.linkProgram(e);
      d = b.createBuffer();
      b.bindBuffer(b.ARRAY_BUFFER, d);
      b.bufferData(b.ARRAY_BUFFER, new Float32Array([0, 0]), b.STREAM_DRAW);
      b.enableVertexAttribArray(0);
      b.vertexAttribPointer(0, 2, b.FLOAT, !1, 0, 0);
      d = new Uint8Array(4);
      b.useProgram(e);
      b.viewport(0, 0, 1, 1);
      b.bindTexture(b.TEXTURE_2D, c);
      b.drawArrays(b.POINTS, 0, 1);
      b.readPixels(0, 0, 1, 1, b.RGBA, b.UNSIGNED_BYTE, d);
      return 127 === d[0] || 128 === d[0]
    }

    function d() {}

    function c(a) {
      "OES_texture_float_linear" === a ? (void 0 === this.$OES_texture_float_linear$ && Object.defineProperty(this,
        "$OES_texture_float_linear$", {
          enumerable: !1,
          configurable: !1,
          writable: !1,
          value: new d
        }), a = this.$OES_texture_float_linear$) : a = n.call(this, a);
      return a
    }

    function e() {
      var a = f.call(this); - 1 === a.indexOf("OES_texture_float_linear") && a.push("OES_texture_float_linear");
      return a
    }
    try {
      var g = document.createElement("canvas").getContext("experimental-webgl")
    } catch (l) {}
    if (g && -1 === g.getSupportedExtensions().indexOf("OES_texture_float_linear") && a(g)) {
      var n = WebGLRenderingContext.prototype.getExtension,
        f = WebGLRenderingContext.prototype.getSupportedExtensions;
      WebGLRenderingContext.prototype.getExtension = c;
      WebGLRenderingContext.prototype.getSupportedExtensions = e
    }
  })();
  var a;
  v.canvas = function () {
    var b = document.createElement("canvas");
    try {
      a = b.getContext("experimental-webgl", {
        premultipliedAlpha: !1
      })
    } catch (d) {
      a = null
    }
    if (!a) throw "This browser does not support WebGL";
    b._ = {
      gl: a,
      isInitialized: !1,
      texture: null,
      spareTexture: null,
      flippedShader: null
    };
    b.texture = k(A);
    b.draw = k(C);
    b.update = k(D);
    b.bulgePinch = k(Z);

    return b
  };
  v.splineInterpolate = t;
  var h = function () {
    function b(b, c) {
      var e = a.createShader(b);
      a.shaderSource(e, c);
      a.compileShader(e);
      if (!a.getShaderParameter(e,
          a.COMPILE_STATUS)) throw "compile error: " + a.getShaderInfoLog(e);
      return e
    }

    function d(d, l) {
      this.texCoordAttribute = this.vertexAttribute = null;
      this.program = a.createProgram();
      d = d || c;
      l = l || e;
      l = "precision highp float;" + l;
      a.attachShader(this.program, b(a.VERTEX_SHADER, d));
      a.attachShader(this.program, b(a.FRAGMENT_SHADER, l));
      a.linkProgram(this.program);
      if (!a.getProgramParameter(this.program, a.LINK_STATUS)) throw "link error: " + a.getProgramInfoLog(this.program);
    }
    var c = "attribute vec2 vertex;attribute vec2 _texCoord;varying vec2 texCoord;void main(){texCoord=_texCoord;gl_Position=vec4(vertex*2.0-1.0,0.0,1.0);}",
      e = "uniform sampler2D texture;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,texCoord);}";
    d.prototype.destroy = function () {
      a.deleteProgram(this.program);
      this.program = null
    };
    d.prototype.uniforms = function (b) {
      a.useProgram(this.program);
      for (var e in b)
        if (b.hasOwnProperty(e)) {
          var c = a.getUniformLocation(this.program, e);
          if (null !== c) {
            var d = b[e];
            if ("[object Array]" == Object.prototype.toString.call(d)) switch (d.length) {
                case 1:
                  a.uniform1fv(c, new Float32Array(d));
                  break;
                case 2:
                  a.uniform2fv(c, new Float32Array(d));
                  break;
                case 3:
                  a.uniform3fv(c, new Float32Array(d));
                  break;
                case 4:
                  a.uniform4fv(c, new Float32Array(d));
                  break;
                case 9:
                  a.uniformMatrix3fv(c, !1, new Float32Array(d));
                  break;
                case 16:
                  a.uniformMatrix4fv(c, !1, new Float32Array(d));
                  break;
                default:
                  throw "dont't know how to load uniform \"" + e + '" of length ' + d.length;
              } else if ("[object Number]" == Object.prototype.toString.call(d)) a.uniform1f(c, d);
              else throw 'attempted to set uniform "' + e + '" to invalid value ' + (d || "undefined").toString();
          }
        } return this
    };
    d.prototype.textures = function (b) {
      a.useProgram(this.program);
      for (var c in b) b.hasOwnProperty(c) && a.uniform1i(a.getUniformLocation(this.program, c), b[c]);
      return this
    };
    d.prototype.drawRect = function (b, c, e, d) {
      var f = a.getParameter(a.VIEWPORT);
      c = void 0 !== c ? (c - f[1]) / f[3] : 0;
      b = void 0 !== b ? (b - f[0]) / f[2] : 0;
      e = void 0 !== e ? (e - f[0]) / f[2] : 1;
      d = void 0 !== d ? (d - f[1]) / f[3] : 1;
      null == a.vertexBuffer && (a.vertexBuffer = a.createBuffer());
      a.bindBuffer(a.ARRAY_BUFFER, a.vertexBuffer);
      a.bufferData(a.ARRAY_BUFFER, new Float32Array([b,
        c, b, d, e, c, e, d
      ]), a.STATIC_DRAW);
      null == a.texCoordBuffer && (a.texCoordBuffer = a.createBuffer(), a.bindBuffer(a.ARRAY_BUFFER, a.texCoordBuffer), a.bufferData(a.ARRAY_BUFFER, new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]), a.STATIC_DRAW));
      null == this.vertexAttribute && (this.vertexAttribute = a.getAttribLocation(this.program, "vertex"), a.enableVertexAttribArray(this.vertexAttribute));
      null == this.texCoordAttribute && (this.texCoordAttribute = a.getAttribLocation(this.program, "_texCoord"), a.enableVertexAttribArray(this.texCoordAttribute));
      a.useProgram(this.program);
      a.bindBuffer(a.ARRAY_BUFFER, a.vertexBuffer);
      a.vertexAttribPointer(this.vertexAttribute, 2, a.FLOAT, !1, 0, 0);
      a.bindBuffer(a.ARRAY_BUFFER, a.texCoordBuffer);
      a.vertexAttribPointer(this.texCoordAttribute, 2, a.FLOAT, !1, 0, 0);
      a.drawArrays(a.TRIANGLE_STRIP, 0, 4)
    };
    d.getDefaultShader = function () {
      a.defaultShader = a.defaultShader || new d;
      return a.defaultShader
    };
    return d
  }();
  z.prototype.interpolate = function (a) {
    for (var d = 0, c = this.ya.length - 1; 1 < c - d;) {
      var e = c + d >> 1;
      this.xa[e] > a ? c = e : d = e
    }
    var e = this.xa[c] -
      this.xa[d],
      g = (this.xa[c] - a) / e;
    a = (a - this.xa[d]) / e;
    return g * this.ya[d] + a * this.ya[c] + ((g * g * g - g) * this.y2[d] + (a * a * a - a) * this.y2[c]) * e * e / 6
  };
  var r = function () {
      function b(b, c, d, f) {
        this.gl = a;
        this.id = a.createTexture();
        this.width = b;
        this.height = c;
        this.format = d;
        this.type = f;
        a.bindTexture(a.TEXTURE_2D, this.id);
        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR);
        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR);
        a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE);
        a.texParameteri(a.TEXTURE_2D,
          a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE);
        b && c && a.texImage2D(a.TEXTURE_2D, 0, this.format, b, c, 0, this.format, this.type, null)
      }

      function d(a) {
        null == c && (c = document.createElement("canvas"));
        c.width = a.width;
        c.height = a.height;
        a = c.getContext("2d");
        a.clearRect(0, 0, c.width, c.height);
        return a
      }
      b.fromElement = function (c) {
        var d = new b(0, 0, a.RGBA, a.UNSIGNED_BYTE);
        d.loadContentsOf(c);
        return d
      };
      b.prototype.loadContentsOf = function (b) {
        this.width = b.width || b.videoWidth;
        this.height = b.height || b.videoHeight;
        a.bindTexture(a.TEXTURE_2D,
          this.id);
        a.texImage2D(a.TEXTURE_2D, 0, this.format, this.format, this.type, b)
      };
      b.prototype.initFromBytes = function (b, c, d) {
        this.width = b;
        this.height = c;
        this.format = a.RGBA;
        this.type = a.UNSIGNED_BYTE;
        a.bindTexture(a.TEXTURE_2D, this.id);
        a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, b, c, 0, a.RGBA, this.type, new Uint8Array(d))
      };
      b.prototype.destroy = function () {
        a.deleteTexture(this.id);
        this.id = null
      };
      b.prototype.use = function (b) {
        a.activeTexture(a.TEXTURE0 + (b || 0));
        a.bindTexture(a.TEXTURE_2D, this.id)
      };
      b.prototype.unuse = function (b) {
        a.activeTexture(a.TEXTURE0 +
          (b || 0));
        a.bindTexture(a.TEXTURE_2D, null)
      };
      b.prototype.ensureFormat = function (b, c, d, f) {
        if (1 == arguments.length) {
          var h = arguments[0];
          b = h.width;
          c = h.height;
          d = h.format;
          f = h.type
        }
        if (b != this.width || c != this.height || d != this.format || f != this.type) this.width = b, this.height = c, this.format = d, this.type = f, a.bindTexture(a.TEXTURE_2D, this.id), a.texImage2D(a.TEXTURE_2D, 0, this.format, b, c, 0, this.format, this.type, null)
      };
      b.prototype.drawTo = function (b) {
        a.framebuffer = a.framebuffer || a.createFramebuffer();
        a.bindFramebuffer(a.FRAMEBUFFER,
          a.framebuffer);
        a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, this.id, 0);
        if (a.checkFramebufferStatus(a.FRAMEBUFFER) !== a.FRAMEBUFFER_COMPLETE) throw Error("incomplete framebuffer");
        a.viewport(0, 0, this.width, this.height);
        b();
        a.bindFramebuffer(a.FRAMEBUFFER, null)
      };
      var c = null;
      b.prototype.fillUsingCanvas = function (b) {
        b(d(this));
        this.format = a.RGBA;
        this.type = a.UNSIGNED_BYTE;
        a.bindTexture(a.TEXTURE_2D, this.id);
        a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, c);
        return this
      };
      b.prototype.toImage = function (b) {
        this.use();
        h.getDefaultShader().drawRect();
        var f = 4 * this.width * this.height,
          k = new Uint8Array(f),
          n = d(this),
          p = n.createImageData(this.width, this.height);
        a.readPixels(0, 0, this.width, this.height, a.RGBA, a.UNSIGNED_BYTE, k);
        for (var m = 0; m < f; m++) p.data[m] = k[m];
        n.putImageData(p, 0, 0);
        b.src = c.toDataURL()
      };
      b.prototype.swapWith = function (a) {
        var b;
        b = a.id;
        a.id = this.id;
        this.id = b;
        b = a.width;
        a.width = this.width;
        this.width = b;
        b = a.height;
        a.height = this.height;
        this.height = b;
        b = a.format;
        a.format =
          this.format;
        this.format = b
      };
      return b
    }(),
    s = "float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}";
  return v
}();