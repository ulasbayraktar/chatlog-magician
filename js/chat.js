(function() {
    function C() {
        var a = "{}";
        if ("userDataBehavior" == f) {
            g.load("jStorage");
            try {
                a = g.getAttribute("jStorage")
            } catch (b) {}
            try {
                r = g.getAttribute("jStorage_update")
            } catch (c) {}
            h.jStorage = a
        }
        D();
        x();
        E()
    }

    function u() {
        var a;
        clearTimeout(F);
        F = setTimeout(function() {
            if ("localStorage" == f || "globalStorage" == f) a = h.jStorage_update;
            else if ("userDataBehavior" == f) {
                g.load("jStorage");
                try {
                    a = g.getAttribute("jStorage_update")
                } catch (b) {}
            }
            if (a && a != r) {
                r = a;
                var l = p.parse(p.stringify(c.__jstorage_meta.CRC32)),
                    k;
                C();
                k = p.parse(p.stringify(c.__jstorage_meta.CRC32));
                var d, n = [],
                    e = [];
                for (d in l) l.hasOwnProperty(d) && (k[d] ? l[d] != k[d] && "2." == String(l[d]).substr(0, 2) && n.push(d) : e.push(d));
                for (d in k) k.hasOwnProperty(d) && (l[d] || n.push(d));
                s(n, "updated");
                s(e, "deleted")
            }
        }, 25)
    }

    function s(a, b) {
        a = [].concat(a || []);
        var c, k, d, n;
        if ("flushed" == b) {
            a = [];
            for (c in m) m.hasOwnProperty(c) && a.push(c);
            b = "deleted"
        }
        c = 0;
        for (d = a.length; c < d; c++) {
            if (m[a[c]])
                for (k = 0, n = m[a[c]].length; k < n; k++) m[a[c]][k](a[c], b);
            if (m["*"])
                for (k = 0, n = m["*"].length; k < n; k++) m["*"][k](a[c], b)
        }
    }

    function v() {
        var a = (+new Date).toString();
        if ("localStorage" == f || "globalStorage" == f) try {
            h.jStorage_update = a
        } catch (b) {
            f = !1
        } else "userDataBehavior" == f && (g.setAttribute("jStorage_update", a), g.save("jStorage"));
        u()
    }

    function D() {
        if (h.jStorage) try {
            c = p.parse(String(h.jStorage))
        } catch (a) {
            h.jStorage = "{}"
        } else h.jStorage = "{}";
        z = h.jStorage ? String(h.jStorage).length : 0;
        c.__jstorage_meta || (c.__jstorage_meta = {});
        c.__jstorage_meta.CRC32 || (c.__jstorage_meta.CRC32 = {})
    }

    function w() {
        if (c.__jstorage_meta.PubSub) {
            for (var a = +new Date - 2E3, b = 0, l = c.__jstorage_meta.PubSub.length; b <
                l; b++)
                if (c.__jstorage_meta.PubSub[b][0] <= a) {
                    c.__jstorage_meta.PubSub.splice(b, c.__jstorage_meta.PubSub.length - b);
                    break
                }
            c.__jstorage_meta.PubSub.length || delete c.__jstorage_meta.PubSub
        }
        try {
            h.jStorage = p.stringify(c), g && (g.setAttribute("jStorage", h.jStorage), g.save("jStorage")), z = h.jStorage ? String(h.jStorage).length : 0
        } catch (k) {}
    }

    function q(a) {
        if ("string" != typeof a && "number" != typeof a) throw new TypeError("Key name must be string or numeric");
        if ("__jstorage_meta" == a) throw new TypeError("Reserved key name");
        return !0
    }

    function x() {
        var a, b, l, k, d = Infinity,
            n = !1,
            e = [];
        clearTimeout(G);
        if (c.__jstorage_meta && "object" == typeof c.__jstorage_meta.TTL) {
            a = +new Date;
            l = c.__jstorage_meta.TTL;
            k = c.__jstorage_meta.CRC32;
            for (b in l) l.hasOwnProperty(b) && (l[b] <= a ? (delete l[b], delete k[b], delete c[b], n = !0, e.push(b)) : l[b] < d && (d = l[b]));
            Infinity != d && (G = setTimeout(x, Math.min(d - a, 2147483647)));
            n && (w(), v(), s(e, "deleted"))
        }
    }

    function E() {
        var a;
        if (c.__jstorage_meta.PubSub) {
            var b, l = A,
                k = [];
            for (a = c.__jstorage_meta.PubSub.length - 1; 0 <= a; a--) b =
                c.__jstorage_meta.PubSub[a], b[0] > A && (l = b[0], k.unshift(b));
            for (a = k.length - 1; 0 <= a; a--) {
                b = k[a][1];
                var d = k[a][2];
                if (t[b])
                    for (var n = 0, e = t[b].length; n < e; n++) try {
                        t[b][n](b, p.parse(p.stringify(d)))
                    } catch (g) {}
            }
            A = l
        }
    }
    var y = window.jQuery || window.$ || (window.$ = {}),
        p = {
            parse: window.JSON && (window.JSON.parse || window.JSON.decode) || String.prototype.evalJSON && function(a) {
                return String(a).evalJSON()
            } || y.parseJSON || y.evalJSON,
            stringify: Object.toJSON || window.JSON && (window.JSON.stringify || window.JSON.encode) || y.toJSON
        };
    if ("function" !==
        typeof p.parse || "function" !== typeof p.stringify) throw Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");
    var c = {
            __jstorage_meta: {
                CRC32: {}
            }
        },
        h = {
            jStorage: "{}"
        },
        g = null,
        z = 0,
        f = !1,
        m = {},
        F = !1,
        r = 0,
        t = {},
        A = +new Date,
        G, B = {
            isXML: function(a) {
                return (a = (a ? a.ownerDocument || a : 0).documentElement) ? "HTML" !== a.nodeName : !1
            },
            encode: function(a) {
                if (!this.isXML(a)) return !1;
                try {
                    return (new XMLSerializer).serializeToString(a)
                } catch (b) {
                    try {
                        return a.xml
                    } catch (c) {}
                }
                return !1
            },
            decode: function(a) {
                var b = "DOMParser" in window && (new DOMParser).parseFromString || window.ActiveXObject && function(a) {
                    var b = new ActiveXObject("Microsoft.XMLDOM");
                    b.async = "false";
                    b.loadXML(a);
                    return b
                };
                if (!b) return !1;
                a = b.call("DOMParser" in window && new DOMParser || window, a, "text/xml");
                return this.isXML(a) ? a : !1
            }
        };
    y.jStorage = {
        version: "0.4.12",
        set: function(a, b, l) {
            q(a);
            l = l || {};
            if ("undefined" == typeof b) return this.deleteKey(a), b;
            if (B.isXML(b)) b = {
                _is_xml: !0,
                xml: B.encode(b)
            };
            else {
                if ("function" == typeof b) return;
                b && "object" == typeof b && (b = p.parse(p.stringify(b)))
            }
            c[a] = b;
            for (var k = c.__jstorage_meta.CRC32, d = p.stringify(b), g = d.length, e = 2538058380 ^ g, h = 0, f; 4 <= g;) f = d.charCodeAt(h) & 255 | (d.charCodeAt(++h) & 255) << 8 | (d.charCodeAt(++h) & 255) << 16 | (d.charCodeAt(++h) & 255) << 24, f = 1540483477 * (f & 65535) + ((1540483477 * (f >>> 16) & 65535) << 16), f ^= f >>> 24, f = 1540483477 * (f & 65535) + ((1540483477 * (f >>> 16) & 65535) << 16), e = 1540483477 * (e & 65535) + ((1540483477 * (e >>> 16) & 65535) << 16) ^ f, g -= 4, ++h;
            switch (g) {
                case 3:
                    e ^= (d.charCodeAt(h + 2) & 255) << 16;
                case 2:
                    e ^=
                        (d.charCodeAt(h + 1) & 255) << 8;
                case 1:
                    e ^= d.charCodeAt(h) & 255, e = 1540483477 * (e & 65535) + ((1540483477 * (e >>> 16) & 65535) << 16)
            }
            e ^= e >>> 13;
            e = 1540483477 * (e & 65535) + ((1540483477 * (e >>> 16) & 65535) << 16);
            k[a] = "2." + ((e ^ e >>> 15) >>> 0);
            this.setTTL(a, l.TTL || 0);
            s(a, "updated");
            return b
        },
        get: function(a, b) {
            q(a);
            return a in c ? c[a] && "object" == typeof c[a] && c[a]._is_xml ? B.decode(c[a].xml) : c[a] : "undefined" == typeof b ? null : b
        },
        deleteKey: function(a) {
            q(a);
            return a in c ? (delete c[a], "object" == typeof c.__jstorage_meta.TTL && a in c.__jstorage_meta.TTL &&
                delete c.__jstorage_meta.TTL[a], delete c.__jstorage_meta.CRC32[a], w(), v(), s(a, "deleted"), !0) : !1
        },
        setTTL: function(a, b) {
            var l = +new Date;
            q(a);
            b = Number(b) || 0;
            return a in c ? (c.__jstorage_meta.TTL || (c.__jstorage_meta.TTL = {}), 0 < b ? c.__jstorage_meta.TTL[a] = l + b : delete c.__jstorage_meta.TTL[a], w(), x(), v(), !0) : !1
        },
        getTTL: function(a) {
            var b = +new Date;
            q(a);
            return a in c && c.__jstorage_meta.TTL && c.__jstorage_meta.TTL[a] ? (a = c.__jstorage_meta.TTL[a] - b) || 0 : 0
        },
        flush: function() {
            c = {
                __jstorage_meta: {
                    CRC32: {}
                }
            };
            w();
            v();
            s(null,
                "flushed");
            return !0
        },
        storageObj: function() {
            function a() {}
            a.prototype = c;
            return new a
        },
        index: function() {
            var a = [],
                b;
            for (b in c) c.hasOwnProperty(b) && "__jstorage_meta" != b && a.push(b);
            return a
        },
        storageSize: function() {
            return z
        },
        currentBackend: function() {
            return f
        },
        storageAvailable: function() {
            return !!f
        },
        listenKeyChange: function(a, b) {
            q(a);
            m[a] || (m[a] = []);
            m[a].push(b)
        },
        stopListening: function(a, b) {
            q(a);
            if (m[a])
                if (b)
                    for (var c = m[a].length - 1; 0 <= c; c--) m[a][c] == b && m[a].splice(c, 1);
                else delete m[a]
        },
        subscribe: function(a,
            b) {
            a = (a || "").toString();
            if (!a) throw new TypeError("Channel not defined");
            t[a] || (t[a] = []);
            t[a].push(b)
        },
        publish: function(a, b) {
            a = (a || "").toString();
            if (!a) throw new TypeError("Channel not defined");
            c.__jstorage_meta || (c.__jstorage_meta = {});
            c.__jstorage_meta.PubSub || (c.__jstorage_meta.PubSub = []);
            c.__jstorage_meta.PubSub.unshift([+new Date, a, b]);
            w();
            v()
        },
        reInit: function() {
            C()
        },
        noConflict: function(a) {
            delete window.$.jStorage;
            a && (window.jStorage = this);
            return this
        }
    };
    (function() {
        var a = !1;
        if ("localStorage" in
            window) try {
            window.localStorage.setItem("_tmptest", "tmpval"), a = !0, window.localStorage.removeItem("_tmptest")
        } catch (b) {}
        if (a) try {
            window.localStorage && (h = window.localStorage, f = "localStorage", r = h.jStorage_update)
        } catch (c) {} else if ("globalStorage" in window) try {
            window.globalStorage && (h = "localhost" == window.location.hostname ? window.globalStorage["localhost.localdomain"] : window.globalStorage[window.location.hostname], f = "globalStorage", r = h.jStorage_update)
        } catch (k) {} else if (g = document.createElement("link"),
            g.addBehavior) {
            g.style.behavior = "url(#default#userData)";
            document.getElementsByTagName("head")[0].appendChild(g);
            try {
                g.load("jStorage")
            } catch (d) {
                g.setAttribute("jStorage", "{}"), g.save("jStorage"), g.load("jStorage")
            }
            a = "{}";
            try {
                a = g.getAttribute("jStorage")
            } catch (m) {}
            try {
                r = g.getAttribute("jStorage_update")
            } catch (e) {}
            h.jStorage = a;
            f = "userDataBehavior"
        } else {
            g = null;
            return
        }
        D();
        x();
        "localStorage" == f || "globalStorage" == f ? "addEventListener" in window ? window.addEventListener("storage", u, !1) : document.attachEvent("onstorage",
            u) : "userDataBehavior" == f && setInterval(u, 1E3);
        E();
        "addEventListener" in window && window.addEventListener("pageshow", function(a) {
            a.persisted && u()
        }, !1)
    })()
})();