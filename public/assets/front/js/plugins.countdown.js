/** Abstract base class for collection plugins.
 Written by Keith Wood (kbwood{at}iinet.com.au) December 2013.
 Licensed under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) license. */
(function () {
    var j = false;
    window.JQClass = function () {};
    JQClass.classes = {};
    JQClass.extend = function extender (f) {
        var g = this.prototype;
        j = true;
        var h = new this();
        j = false;
        for (var i in f) {
            h[i] = typeof f[i] == 'function' && typeof g[i] == 'function'
                ? (function (d, e) {
                    return function () {
                        var b = this._super;
                        this._super = function (a) {
                            return g[d].apply(this, a);
                        };
                        var c = e.apply(this, arguments);
                        this._super = b;
                        return c;
                    };
                })(i, f[i])
                : f[i];
        }

        function JQClass () {
            if (!j && this._init) {
                this._init.apply(this, arguments);
            }
        }

        JQClass.prototype = h;
        JQClass.prototype.constructor = JQClass;
        JQClass.extend = extender;
        return JQClass;
    };
})();
(function ($) {
    JQClass.classes.JQPlugin = JQClass.extend({
        name: 'plugin',
        defaultOptions: {},
        regionalOptions: {},
        _getters: [],
        _getMarker: function () {return 'is-' + this.name;},
        _init: function () {
            $.extend(this.defaultOptions,
                (this.regionalOptions && this.regionalOptions['']) || {});
            var c = camelCase(this.name);
            $[c] = this;
            $.fn[c] = function (a) {
                var b = Array.prototype.slice.call(arguments, 1);
                if ($[c]._isNotChained(a, b)) {
                    return $[c][a].apply($[c], [this[0]].concat(b));
                }
                return this.each(function () {
                    if (typeof a === 'string') {
                        if (a[0] === '_' || !$[c][a]) {
                            throw'Unknown method: ' + a;
                        }
                        $[c][a].apply($[c], [this].concat(b));
                    } else {$[c]._attach(this, a);}
                });
            };
        },
        setDefaults: function (a) {$.extend(this.defaultOptions, a || {});},
        _isNotChained: function (a, b) {
            if (a === 'option' && (b.length === 0 ||
                (b.length === 1 && typeof b[0] === 'string'))) {return true;}
            return $.inArray(a, this._getters) > -1;
        },
        _attach: function (a, b) {
            a = $(a);
            if (a.hasClass(this._getMarker())) {return;}
            a.addClass(this._getMarker());
            b = $.extend({}, this.defaultOptions, this._getMetadata(a),
                b || {});
            var c = $.extend({ name: this.name, elem: a, options: b },
                this._instSettings(a, b));
            a.data(this.name, c);
            this._postAttach(a, c);
            this.option(a, b);
        },
        _instSettings: function (a, b) {return {};},
        _postAttach: function (a, b) {},
        _getMetadata: function (d) {
            try {
                var f = d.data(this.name.toLowerCase()) || '';
                f = f.replace(/'/g, '"');
                f = f.replace(/([a-zA-Z0-9]+):/g, function (a, b, i) {
                    var c = f.substring(0, i).match(/"/g);
                    return (!c || c.length % 2 === 0 ? '"' + b + '":' : b +
                        ':');
                });
                f = $.parseJSON('{' + f + '}');
                for (var g in f) {
                    var h = f[g];
                    if (typeof h === 'string' &&
                        h.match(/^new Date\((.*)\)$/)) {f[g] = eval(h);}
                }
                return f;
            } catch (e) {return {};}
        },
        _getInst: function (a) {return $(a).data(this.name) || {};},
        option: function (a, b, c) {
            a = $(a);
            var d = a.data(this.name);
            if (!b || (typeof b === 'string' && c == null)) {
                var e = (d || {}).options;
                return (e && b ? e[b] : e);
            }
            if (!a.hasClass(this._getMarker())) {return;}
            var e = b || {};
            if (typeof b === 'string') {
                e = {};
                e[b] = c;
            }
            this._optionsChanged(a, d, e);
            $.extend(d.options, e);
        },
        _optionsChanged: function (a, b, c) {},
        destroy: function (a) {
            a = $(a);
            if (!a.hasClass(this._getMarker())) {return;}
            this._preDestroy(a, this._getInst(a));
            a.removeData(this.name).removeClass(this._getMarker());
        },
        _preDestroy: function (a, b) {},
    });

    function camelCase (c) {
        return c.replace(/-([a-z])/g,
            function (a, b) {return b.toUpperCase();});
    }

    $.JQPlugin = {
        createPlugin: function (a, b) {
            if (typeof a === 'object') {
                b = a;
                a = 'JQPlugin';
            }
            a = camelCase(a);
            var c = camelCase(b.name);
            JQClass.classes[c] = JQClass.classes[a].extend(b);
            new JQClass.classes[c]();
        },
    };
})(jQuery);

/*! http://keith-wood.name/countdown.html
	Countdown for jQuery v2.1.0.
	Written by Keith Wood (wood.keith{at}optusnet.com.au) January 2008.
	Available under the MIT (http://keith-wood.name/licence.html) license.
	Please attribute the author if you use it.
*/
!function (a) {
    'use strict';
    var b = 'countdown', c = 0, d = 1, e = 2, f = 3, g = 4, h = 5, i = 6;
    a.JQPlugin.createPlugin({
        name: b,
        defaultOptions: {
            until: null,
            since: null,
            timezone: null,
            serverSync: null,
            format: 'dHMS',
            layout: '',
            compact: !1,
            padZeroes: !1,
            significant: 0,
            description: '',
            expiryUrl: '',
            expiryText: '',
            alwaysExpire: !1,
            onExpiry: null,
            onTick: null,
            tickInterval: 1,
        },
        regionalOptions: {
            '': {
                labels: [
                    'Years',
                    'Months',
                    'Weeks',
                    'Days',
                    'Hours',
                    'Minutes',
                    'Seconds'],
                labels1: [
                    'Year',
                    'Month',
                    'Week',
                    'Day',
                    'Hour',
                    'Minute',
                    'Second'],
                compactLabels: ['y', 'm', 'w', 'd'],
                whichLabels: null,
                digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                timeSeparator: ':',
                isRTL: !1,
            },
        },
        _rtlClass: b + '-rtl',
        _sectionClass: b + '-section',
        _amountClass: b + '-amount',
        _periodClass: b + '-period',
        _rowClass: b + '-row',
        _holdingClass: b + '-holding',
        _showClass: b + '-show',
        _descrClass: b + '-descr',
        _timerElems: [],
        _init: function () {
            function b (a) {
                var h = a < 1e12 ? e
                    ? window.performance.now() +
                    window.performance.timing.navigationStart
                    : d() : a || d();
                h - g >= 1e3 && (c._updateElems(), g = h), f(b);
            }

            var c = this;
            this._super(), this._serverSyncs = [];
            var d = 'function' == typeof Date.now
                ? Date.now
                : function () {return (new Date).getTime();},
                e = window.performance && 'function' ==
                    typeof window.performance.now,
                f = window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame || null, g = 0;
            !f || a.noRequestAnimationFrame
                ? (a.noRequestAnimationFrame = null, a.countdown._timer = setInterval(
                function () {c._updateElems();}, 1e3))
                : (g = window.animationStartTime ||
                window.webkitAnimationStartTime ||
                window.mozAnimationStartTime || window.oAnimationStartTime ||
                window.msAnimationStartTime || d(), f(b));
        },
        UTCDate: function (a, b, c, d, e, f, g, h) {
            'object' == typeof b && b instanceof Date &&
            (h = b.getMilliseconds(), g = b.getSeconds(), f = b.getMinutes(), e = b.getHours(), d = b.getDate(), c = b.getMonth(), b = b.getFullYear());
            var i = new Date;
            return i.setUTCFullYear(b), i.setUTCDate(1), i.setUTCMonth(
                c || 0), i.setUTCDate(d || 1), i.setUTCHours(
                e || 0), i.setUTCMinutes(
                (f || 0) - (Math.abs(a) < 30 ? 60 * a : a)), i.setUTCSeconds(
                g || 0), i.setUTCMilliseconds(h || 0), i;
        },
        periodsToSeconds: function (a) {
            return 31557600 * a[0] + 2629800 * a[1] + 604800 * a[2] + 86400 *
                a[3] + 3600 * a[4] + 60 * a[5] + a[6];
        },
        resync: function () {
            var b = this;
            a('.' + this._getMarker()).
                each(function () {
                    var c = a.data(this, b.name);
                    if (c.options.serverSync) {
                        for (var d = null, e = 0; e <
                        b._serverSyncs.length; e++) if (b._serverSyncs[e][0] ===
                            c.options.serverSync) {
                            d = b._serverSyncs[e];
                            break;
                        }
                        if (b._eqNull(d[2])) {
                            var f = a.isFunction(c.options.serverSync)
                                ? c.options.serverSync.apply(this, [])
                                : null;
                            d[2] = (f
                                ? (new Date).getTime() - f.getTime()
                                : 0) - d[1];
                        }
                        c._since && c._since.setMilliseconds(
                            c._since.getMilliseconds() +
                            d[2]), c._until.setMilliseconds(
                            c._until.getMilliseconds() + d[2]);
                    }
                });
            for (var c = 0; c < b._serverSyncs.length; c++) b._eqNull(
                b._serverSyncs[c][2]) ||
            (b._serverSyncs[c][1] += b._serverSyncs[c][2], delete b._serverSyncs[c][2]);
        },
        _instSettings: function (a, b) {
            return {
                _periods: [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0],
            };
        },
        _addElem: function (a) {this._hasElem(a) || this._timerElems.push(a);},
        _hasElem: function (b) {return a.inArray(b, this._timerElems) > -1;},
        _removeElem: function (b) {
            this._timerElems = a.map(this._timerElems,
                function (a) {return a === b ? null : a;});
        },
        _updateElems: function () {
            for (var a = this._timerElems.length - 1; a >=
            0; a--) this._updateCountdown(this._timerElems[a]);
        },
        _optionsChanged: function (b, c, d) {
            d.layout && (d.layout = d.layout.replace(/&lt;/g, '<').
                replace(/&gt;/g, '>')), this._resetExtraLabels(c.options, d);
            var e = c.options.timezone !== d.timezone;
            a.extend(c.options, d), this._adjustSettings(b, c,
                !this._eqNull(d.until) || !this._eqNull(d.since) || e);
            var f = new Date;
            (c._since && c._since < f || c._until && c._until > f) &&
            this._addElem(b[0]), this._updateCountdown(b, c);
        },
        _updateCountdown: function (b, c) {
            if (b = b.jquery ? b : a(b), c = c || this._getInst(b)) {
                if (b.html(this._generateHTML(c)).
                    toggleClass(this._rtlClass, c.options.isRTL), 'pause' !==
                c._hold && a.isFunction(c.options.onTick)) {
                    var d = 'lap' !== c._hold
                        ? c._periods
                        : this._calculatePeriods(c, c._show,
                            c.options.significant, new Date);
                    1 !== c.options.tickInterval && this.periodsToSeconds(d) %
                    c.options.tickInterval !== 0 ||
                    c.options.onTick.apply(b[0], [d]);
                }
                var e = 'pause' !== c._hold && (c._since
                    ? c._now.getTime() < c._since.getTime()
                    : c._now.getTime() >= c._until.getTime());
                if (e && !c._expiring) {
                    if (c._expiring = !0, this._hasElem(b[0]) ||
                    c.options.alwaysExpire) {
                        if (this._removeElem(b[0]), a.isFunction(
                            c.options.onExpiry) &&
                        c.options.onExpiry.apply(b[0],
                            []), c.options.expiryText) {
                            var f = c.options.layout;
                            c.options.layout = c.options.expiryText, this._updateCountdown(
                                b[0], c), c.options.layout = f;
                        }
                        c.options.expiryUrl &&
                        (window.location = c.options.expiryUrl);
                    }
                    c._expiring = !1;
                } else 'pause' === c._hold && this._removeElem(b[0]);
            }
        },
        _resetExtraLabels: function (a, b) {
            var c = null;
            for (c in b) c.match(/[Ll]abels[02-9]|compactLabels1/) &&
            (a[c] = b[c]);
            for (c in a) c.match(/[Ll]abels[02-9]|compactLabels1/) &&
            'undefined' == typeof b[c] && (a[c] = null);
        },
        _eqNull: function (a) {return 'undefined' == typeof a || null === a;},
        _adjustSettings: function (b, c, d) {
            for (var e = null, f = 0; f <
            this._serverSyncs.length; f++) if (this._serverSyncs[f][0] ===
                c.options.serverSync) {
                e = this._serverSyncs[f][1];
                break;
            }
            var g = null, h = null;
            if (this._eqNull(e)) {
                var i = a.isFunction(c.options.serverSync)
                    ? c.options.serverSync.apply(b[0], [])
                    : null;
                g = new Date, h = i
                    ? g.getTime() - i.getTime()
                    : 0, this._serverSyncs.push([c.options.serverSync, h]);
            } else g = new Date, h = c.options.serverSync ? e : 0;
            var j = c.options.timezone;
            j = this._eqNull(j) ? -g.getTimezoneOffset() : j, (d || !d &&
                this._eqNull(c._until) && this._eqNull(c._since)) &&
            (c._since = c.options.since, this._eqNull(c._since) ||
            (c._since = this.UTCDate(j,
                this._determineTime(c._since, null)), c._since && h &&
            c._since.setMilliseconds(
                c._since.getMilliseconds() + h)), c._until = this.UTCDate(j,
                this._determineTime(c.options.until, g)), h &&
            c._until.setMilliseconds(
                c._until.getMilliseconds() + h)), c._show = this._determineShow(
                c);
        },
        _preDestroy: function (a, b) {this._removeElem(a[0]), a.empty();},
        pause: function (a) {this._hold(a, 'pause');},
        lap: function (a) {this._hold(a, 'lap');},
        resume: function (a) {this._hold(a, null);},
        toggle: function (b) {
            var c = a.data(b, this.name) || {};
            this[c._hold ? 'resume' : 'pause'](b);
        },
        toggleLap: function (b) {
            var c = a.data(b, this.name) || {};
            this[c._hold ? 'resume' : 'lap'](b);
        },
        _hold: function (b, c) {
            var d = a.data(b, this.name);
            if (d) {
                if ('pause' === d._hold && !c) {
                    d._periods = d._savePeriods;
                    var e = d._since ? '-' : '+';
                    d[d._since ? '_since' : '_until'] = this._determineTime(
                        e + d._periods[0] + 'y' + e + d._periods[1] + 'o' + e +
                        d._periods[2] + 'w' + e + d._periods[3] + 'd' + e +
                        d._periods[4] + 'h' + e + d._periods[5] + 'm' + e +
                        d._periods[6] + 's'), this._addElem(b);
                }
                d._hold = c, d._savePeriods = 'pause' === c
                    ? d._periods
                    : null, a.data(b, this.name, d), this._updateCountdown(b,
                    d);
            }
        },
        getTimes: function (b) {
            var c = a.data(b, this.name);
            return c ? 'pause' === c._hold ? c._savePeriods : c._hold
                ? this._calculatePeriods(c, c._show, c.options.significant,
                    new Date)
                : c._periods : null;
        },
        _determineTime: function (a, b) {
            var c = this, d = function (a) {
                var b = new Date;
                return b.setTime(b.getTime() + 1e3 * a), b;
            }, e = function (a) {
                a = a.toLowerCase();
                for (var b = new Date, d = b.getFullYear(), e = b.getMonth(), f = b.getDate(), g = b.getHours(), h = b.getMinutes(), i = b.getSeconds(), j = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g, k = j.exec(
                    a); k;) {
                    switch (k[2] || 's') {
                        case's':
                            i += parseInt(k[1], 10);
                            break;
                        case'm':
                            h += parseInt(k[1], 10);
                            break;
                        case'h':
                            g += parseInt(k[1], 10);
                            break;
                        case'd':
                            f += parseInt(k[1], 10);
                            break;
                        case'w':
                            f += 7 * parseInt(k[1], 10);
                            break;
                        case'o':
                            e += parseInt(k[1], 10), f = Math.min(f,
                                c._getDaysInMonth(d, e));
                            break;
                        case'y':
                            d += parseInt(k[1], 10), f = Math.min(f,
                                c._getDaysInMonth(d, e));
                    }
                    k = j.exec(a);
                }
                return new Date(d, e, f, g, h, i, 0);
            }, f = this._eqNull(a) ? b : 'string' == typeof a
                ? e(a)
                : 'number' == typeof a ? d(a) : a;
            return f && f.setMilliseconds(0), f;
        },
        _getDaysInMonth: function (a, b) {
            return 32 - new Date(a, b, 32).getDate();
        },
        _normalLabels: function (a) {return a;},
        _generateHTML: function (b) {
            var j = this;
            b._periods = b._hold ? b._periods : this._calculatePeriods(b,
                b._show, b.options.significant, new Date);
            var k = !1, l = 0, m = b.options.significant,
                n = a.extend({}, b._show), o = null;
            for (o = c; o <= i; o++) k = k || '?' === b._show[o] &&
                b._periods[o] > 0, n[o] = '?' !== b._show[o] || k
                ? b._show[o]
                : null, l += n[o] ? 1 : 0, m -= b._periods[o] > 0 ? 1 : 0;
            var p = [!1, !1, !1, !1, !1, !1, !1];
            for (o = i; o >= c; o--) b._show[o] &&
            (b._periods[o] ? p[o] = !0 : (p[o] = m > 0, m--));
            var q = b.options.compact
                ? b.options.compactLabels
                : b.options.labels,
                r = b.options.whichLabels || this._normalLabels,
                s = function (a) {
                    var c = b.options['compactLabels' + r(b._periods[a])];
                    return n[a] ? j._translateDigits(b, b._periods[a]) +
                        (c ? c[a] : q[a]) + ' ' : '';
                }, t = b.options.padZeroes ? 2 : 1, u = function (a) {
                    var c = b.options['labels' + r(b._periods[a])];
                    return !b.options.significant && n[a] ||
                    b.options.significant && p[a] ? '<span class="' +
                        j._sectionClass + '"><span class="' + j._amountClass +
                        '">' + j._minDigits(b, b._periods[a], t) +
                        '</span><span class="' + j._periodClass + '">' +
                        (c ? c[a] : q[a]) + '</span></span>' : '';
                };
            return b.options.layout
                ? this._buildLayout(b, n, b.options.layout, b.options.compact,
                    b.options.significant, p)
                : (b.options.compact
                ? '<span class="' + this._rowClass + ' ' + this._amountClass +
                (b._hold ? ' ' + this._holdingClass : '') + '">' + s(c) + s(d) +
                s(e) + s(f) +
                (n[g] ? this._minDigits(b, b._periods[g], 2) : '') +
                (n[h] ? (n[g] ? b.options.timeSeparator : '') +
                    this._minDigits(b, b._periods[h], 2) : '') +
                (n[i] ? (n[g] || n[h] ? b.options.timeSeparator : '') +
                    this._minDigits(b, b._periods[i], 2) : '')
                : '<span class="' + this._rowClass + ' ' + this._showClass +
                (b.options.significant || l) +
                (b._hold ? ' ' + this._holdingClass : '') + '">' + u(c) + u(d) +
                u(e) + u(f) + u(g) + u(h) + u(i)) + '</span>' +
                (b.options.description ? '<span class="' + this._rowClass +
                    ' ' + this._descrClass + '">' + b.options.description +
                    '</span>' : '');
        },
        _buildLayout: function (b, j, k, l, m, n) {
            for (var o = b.options[l
                ? 'compactLabels'
                : 'labels'], p = b.options.whichLabels ||
                this._normalLabels, q = function (a) {
                return (b.options[(l
                    ? 'compactLabels'
                    : 'labels') + p(b._periods[a])] || o)[a];
            }, r = function (a, c) {
                return b.options.digits[Math.floor(a / c) % 10];
            }, s = {
                desc: b.options.description,
                sep: b.options.timeSeparator,
                yl: q(c),
                yn: this._minDigits(b, b._periods[c], 1),
                ynn: this._minDigits(b, b._periods[c], 2),
                ynnn: this._minDigits(b, b._periods[c], 3),
                y1: r(b._periods[c], 1),
                y10: r(b._periods[c], 10),
                y100: r(b._periods[c], 100),
                y1000: r(b._periods[c], 1e3),
                ol: q(d),
                on: this._minDigits(b, b._periods[d], 1),
                onn: this._minDigits(b, b._periods[d], 2),
                onnn: this._minDigits(b, b._periods[d], 3),
                o1: r(b._periods[d], 1),
                o10: r(b._periods[d], 10),
                o100: r(b._periods[d], 100),
                o1000: r(b._periods[d], 1e3),
                wl: q(e),
                wn: this._minDigits(b, b._periods[e], 1),
                wnn: this._minDigits(b, b._periods[e], 2),
                wnnn: this._minDigits(b, b._periods[e], 3),
                w1: r(b._periods[e], 1),
                w10: r(b._periods[e], 10),
                w100: r(b._periods[e], 100),
                w1000: r(b._periods[e], 1e3),
                dl: q(f),
                dn: this._minDigits(b, b._periods[f], 1),
                dnn: this._minDigits(b, b._periods[f], 2),
                dnnn: this._minDigits(b, b._periods[f], 3),
                d1: r(b._periods[f], 1),
                d10: r(b._periods[f], 10),
                d100: r(b._periods[f], 100),
                d1000: r(b._periods[f], 1e3),
                hl: q(g),
                hn: this._minDigits(b, b._periods[g], 1),
                hnn: this._minDigits(b, b._periods[g], 2),
                hnnn: this._minDigits(b, b._periods[g], 3),
                h1: r(b._periods[g], 1),
                h10: r(b._periods[g], 10),
                h100: r(b._periods[g], 100),
                h1000: r(b._periods[g], 1e3),
                ml: q(h),
                mn: this._minDigits(b, b._periods[h], 1),
                mnn: this._minDigits(b, b._periods[h], 2),
                mnnn: this._minDigits(b, b._periods[h], 3),
                m1: r(b._periods[h], 1),
                m10: r(b._periods[h], 10),
                m100: r(b._periods[h], 100),
                m1000: r(b._periods[h], 1e3),
                sl: q(i),
                sn: this._minDigits(b, b._periods[i], 1),
                snn: this._minDigits(b, b._periods[i], 2),
                snnn: this._minDigits(b, b._periods[i], 3),
                s1: r(b._periods[i], 1),
                s10: r(b._periods[i], 10),
                s100: r(b._periods[i], 100),
                s1000: r(b._periods[i], 1e3),
            }, t = k, u = c; u <= i; u++) {
                var v = 'yowdhms'.charAt(u), w = new RegExp(
                    '\\{' + v + '<\\}([\\s\\S]*)\\{' + v + '>\\}', 'g');
                t = t.replace(w, !m && j[u] || m && n[u] ? '$1' : '');
            }
            return a.each(s, function (a, b) {
                var c = new RegExp('\\{' + a + '\\}', 'g');
                t = t.replace(c, b);
            }), t;
        },
        _minDigits: function (a, b, c) {
            return b = '' + b, b.length >= c
                ? this._translateDigits(a, b)
                : (b = '0000000000' + b, this._translateDigits(a,
                    b.substr(b.length - c)));
        },
        _translateDigits: function (a, b) {
            return ('' + b).replace(/[0-9]/g,
                function (b) {return a.options.digits[b];});
        },
        _determineShow: function (a) {
            var b = a.options.format, j = [];
            return j[c] = b.match('y') ? '?' : b.match('Y')
                ? '!'
                : null, j[d] = b.match('o') ? '?' : b.match('O')
                ? '!'
                : null, j[e] = b.match('w') ? '?' : b.match('W')
                ? '!'
                : null, j[f] = b.match('d') ? '?' : b.match('D')
                ? '!'
                : null, j[g] = b.match('h') ? '?' : b.match('H')
                ? '!'
                : null, j[h] = b.match('m') ? '?' : b.match('M')
                ? '!'
                : null, j[i] = b.match('s') ? '?' : b.match('S')
                ? '!'
                : null, j;
        },
        _calculatePeriods: function (a, b, j, k) {
            a._now = k, a._now.setMilliseconds(0);
            var l = new Date(a._now.getTime());
            a._since ? k.getTime() < a._since.getTime()
                ? a._now = k = l
                : k = a._since : (l.setTime(a._until.getTime()), k.getTime() >
            a._until.getTime() && (a._now = k = l));
            var m = [0, 0, 0, 0, 0, 0, 0];
            if (b[c] || b[d]) {
                var n = this._getDaysInMonth(k.getFullYear(), k.getMonth()),
                    o = this._getDaysInMonth(l.getFullYear(), l.getMonth()),
                    p = l.getDate() === k.getDate() || l.getDate() >=
                        Math.min(n, o) && k.getDate() >= Math.min(n, o),
                    q = function (a) {
                        return 60 * (60 * a.getHours() + a.getMinutes()) +
                            a.getSeconds();
                    }, r = Math.max(0,
                    12 * (l.getFullYear() - k.getFullYear()) + l.getMonth() -
                    k.getMonth() +
                    (l.getDate() < k.getDate() && !p || p && q(l) < q(k)
                        ? -1
                        : 0));
                m[c] = b[c] ? Math.floor(r / 12) : 0, m[d] = b[d] ? r - 12 *
                    m[c] : 0, k = new Date(k.getTime());
                var s = k.getDate() === n,
                    t = this._getDaysInMonth(k.getFullYear() + m[c],
                        k.getMonth() + m[d]);
                k.getDate() > t && k.setDate(t), k.setFullYear(
                    k.getFullYear() + m[c]), k.setMonth(
                    k.getMonth() + m[d]), s && k.setDate(t);
            }
            var u = Math.floor((l.getTime() - k.getTime()) / 1e3), v = null,
                w = function (a, c) {
                    m[a] = b[a]
                        ? Math.floor(u / c)
                        : 0, u -= m[a] * c;
                };
            if (w(e, 604800), w(f, 86400), w(g, 3600), w(h, 60), w(i, 1), u >
            0 && !a._since) {
                var x = [1, 12, 4.3482, 7, 24, 60, 60], y = i, z = 1;
                for (v = i; v >= c; v--) b[v] &&
                (m[y] >= z && (m[y] = 0, u = 1), u > 0 &&
                (m[v]++, u = 0, y = v, z = 1)), z *= x[v];
            }
            if (j) for (v = c; v <= i; v++) j && m[v] ? j-- : j || (m[v] = 0);
            return m;
        },
    });
}(jQuery);

window.SEMICOLON_countdownInit = function ($countdownEl) {

    $countdownEl = $countdownEl.filter(':not(.customjs)');

    if ($countdownEl.length < 1) {
        return true;
    }

    $countdownEl.each(function () {

        let element = $(this),
            elFormat = element.attr('data-format') || 'dHMS',
            elSince = element.attr('data-since'),
            elYear = element.attr('data-year'),
            elMonth = element.attr('data-month'),
            elDay = element.attr('data-day'),
            elHour = element.attr('data-hour'),
            elMin = element.attr('data-minute'),
            elSec = element.attr('data-second'),
            elRedirect = element.attr('data-redirect'),
            dateFormat = '';

        if (elYear) {
            dateFormat = elYear;
        }

        if (elMonth && elMonth < 13) {
            dateFormat = dateFormat + '-' +
                (elMonth < 10 ? '0' + elMonth : elMonth);
        } else {
            if (elYear) {
                dateFormat = dateFormat + '-01';
            }
        }

        if (elDay && elDay < 32) {
            dateFormat = dateFormat + '-' + (elDay < 10 ? '0' + elDay : elDay);
        } else {
            if (elYear) {
                dateFormat = dateFormat + '-01';
            }
        }

        setDate = dateFormat != '' ? new Date(moment(dateFormat)) : new Date();

        if (elHour && elHour < 25) {
            setDate.setHours(setDate.getHours() + Number(elHour));
        }

        if (elMin && elMin < 60) {
            setDate.setMinutes(setDate.getMinutes() + Number(elMin));
        }

        if (elSec && elSec < 60) {
            setDate.setSeconds(setDate.getSeconds() + Number(elSec));
        }

        if (!elRedirect) {
            elRedirect = false;
        }

        if (elSince == 'true') {
            element.countdown({
                since: setDate,
                format: elFormat,
                expiryUrl: elRedirect,
            });
        } else {
            element.countdown({
                until: setDate,
                format: elFormat,
                expiryUrl: elRedirect,
            });
        }

    });

};

