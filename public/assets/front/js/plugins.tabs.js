/*! jQuery UI - v1.12.1 - 2018-01-02
* http://jqueryui.com
* Includes: widget.js, keycode.js, unique-id.js, widgets/tabs.js, effect.js, effects/effect-fade.js, effects/effect-slide.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */
(function (t) {
    'function' == typeof define && define.amd
        ? define(['jquery'], t)
        : t(jQuery);
})(function (t) {
    t.ui = t.ui || {}, t.ui.version = '1.12.1';
    var e = 0, i = Array.prototype.slice;
    t.cleanData = function (e) {
        return function (i) {
            var s, n, o;
            for (o = 0; null != (n = i[o]); o++) try {
                s = t._data(n, 'events'), s && s.remove &&
                t(n).triggerHandler('remove');
            } catch (a) {}
            e(i);
        };
    }(t.cleanData), t.widget = function (e, i, s) {
        var n, o, a, r = {}, l = e.split('.')[0];
        e = e.split('.')[1];
        var h = l + '-' + e;
        return s || (s = i, i = t.Widget), t.isArray(s) &&
        (s = t.extend.apply(null, [{}].concat(
            s))), t.expr[':'][h.toLowerCase()] = function (e) {
            return !!t.data(e, h);
        }, t[l] = t[l] || {}, n = t[l][e], o = t[l][e] = function (
            t, e) {
            return this._createWidget
                ? (arguments.length && this._createWidget(t, e), void 0)
                : new o(t, e);
        }, t.extend(o, n, {
            version: s.version,
            _proto: t.extend({}, s),
            _childConstructors: [],
        }), a = new i, a.options = t.widget.extend({}, a.options), t.each(s,
            function (e, s) {
                return t.isFunction(s)
                    ? (r[e] = function () {
                        function t () {
                            return i.prototype[e].apply(this, arguments);
                        }

                        function n (t) {return i.prototype[e].apply(this, t);}

                        return function () {
                            var e, i = this._super, o = this._superApply;
                            return this._super = t, this._superApply = n, e = s.apply(
                                this,
                                arguments), this._super = i, this._superApply = o, e;
                        };
                    }(), void 0)
                    : (r[e] = s, void 0);
            }), o.prototype = t.widget.extend(a,
            { widgetEventPrefix: n ? a.widgetEventPrefix || e : e }, r, {
                constructor: o,
                namespace: l,
                widgetName: e,
                widgetFullName: h,
            }), n ? (t.each(n._childConstructors, function (e, i) {
            var s = i.prototype;
            t.widget(s.namespace + '.' + s.widgetName, o, i._proto);
        }), delete n._childConstructors) : i._childConstructors.push(
            o), t.widget.bridge(e, o), o;
    }, t.widget.extend = function (e) {
        for (var s, n, o = i.call(arguments, 1), a = 0, r = o.length; r >
        a; a++) for (s in o[a]) n = o[a][s], o[a].hasOwnProperty(s) &&
        void 0 !== n &&
        (e[s] = t.isPlainObject(n) ? t.isPlainObject(e[s]) ? t.widget.extend({},
            e[s], n) : t.widget.extend({}, n) : n);
        return e;
    }, t.widget.bridge = function (e, s) {
        var n = s.prototype.widgetFullName || e;
        t.fn[e] = function (o) {
            var a = 'string' == typeof o, r = i.call(arguments, 1), l = this;
            return a ? this.length || 'instance' !== o ? this.each(function () {
                var i, s = t.data(this, n);
                return 'instance' === o ? (l = s, !1) : s
                    ? t.isFunction(s[o]) && '_' !== o.charAt(0)
                        ? (i = s[o].apply(s, r), i !== s && void 0 !== i
                            ? (l = i && i.jquery
                                ? l.pushStack(i.get())
                                : i, !1)
                            : void 0)
                        : t.error('no such method \'' + o + '\' for ' + e +
                            ' widget instance')
                    : t.error('cannot call methods on ' + e +
                        ' prior to initialization; ' +
                        'attempted to call method \'' + o + '\'');
            }) : l = void 0 : (r.length &&
            (o = t.widget.extend.apply(null, [o].concat(r))), this.each(
                function () {
                    var e = t.data(this, n);
                    e ? (e.option(o || {}), e._init && e._init()) : t.data(this,
                        n, new s(o, this));
                })), l;
        };
    }, t.Widget = function () {}, t.Widget._childConstructors = [], t.Widget.prototype = {
        widgetName: 'widget',
        widgetEventPrefix: '',
        defaultElement: '<div>',
        options: { classes: {}, disabled: !1, create: null },
        _createWidget: function (i, s) {
            s = t(s || this.defaultElement || this)[0], this.element = t(
                s), this.uuid = e++, this.eventNamespace = '.' +
                this.widgetName +
                this.uuid, this.bindings = t(), this.hoverable = t(), this.focusable = t(), this.classesElementLookup = {}, s !==
            this &&
            (t.data(s, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function (t) {
                    t.target === s && this.destroy();
                },
            }), this.document = t(
                s.style ? s.ownerDocument : s.document || s), this.window = t(
                this.document[0].defaultView ||
                this.document[0].parentWindow)), this.options = t.widget.extend(
                {}, this.options, this._getCreateOptions(),
                i), this._create(), this.options.disabled &&
            this._setOptionDisabled(this.options.disabled), this._trigger(
                'create', null, this._getCreateEventData()), this._init();
        },
        _getCreateOptions: function () {return {};},
        _getCreateEventData: t.noop,
        _create: t.noop,
        _init: t.noop,
        destroy: function () {
            var e = this;
            this._destroy(), t.each(this.classesElementLookup,
                function (t, i) {e._removeClass(i, t);}), this.element.off(
                this.eventNamespace).
                removeData(this.widgetFullName), this.widget().
                off(this.eventNamespace).
                removeAttr('aria-disabled'), this.bindings.off(
                this.eventNamespace);
        },
        _destroy: t.noop,
        widget: function () {return this.element;},
        option: function (e, i) {
            var s, n, o, a = e;
            if (0 === arguments.length) return t.widget.extend({},
                this.options);
            if ('string' == typeof e) if (a = {}, s = e.split(
                '.'), e = s.shift(), s.length) {
                for (n = a[e] = t.widget.extend({},
                    this.options[e]), o = 0; s.length - 1 >
                     o; o++) n[s[o]] = n[s[o]] || {}, n = n[s[o]];
                if (e = s.pop(), 1 === arguments.length) return void 0 === n[e]
                    ? null
                    : n[e];
                n[e] = i;
            } else {
                if (1 === arguments.length) return void 0 === this.options[e]
                    ? null
                    : this.options[e];
                a[e] = i;
            }
            return this._setOptions(a), this;
        },
        _setOptions: function (t) {
            var e;
            for (e in t) this._setOption(e, t[e]);
            return this;
        },
        _setOption: function (t, e) {
            return 'classes' === t &&
            this._setOptionClasses(e), this.options[t] = e, 'disabled' === t &&
            this._setOptionDisabled(e), this;
        },
        _setOptionClasses: function (e) {
            var i, s, n;
            for (i in e) n = this.classesElementLookup[i], e[i] !==
            this.options.classes[i] && n && n.length &&
            (s = t(n.get()), this._removeClass(n, i), s.addClass(
                this._classes({ element: s, keys: i, classes: e, add: !0 })));
        },
        _setOptionDisabled: function (t) {
            this._toggleClass(this.widget(), this.widgetFullName + '-disabled',
                null, !!t), t && (this._removeClass(this.hoverable, null,
                'ui-state-hover'), this._removeClass(this.focusable, null,
                'ui-state-focus'));
        },
        enable: function () {return this._setOptions({ disabled: !1 });},
        disable: function () {return this._setOptions({ disabled: !0 });},
        _classes: function (e) {
            function i (i, o) {
                var a, r;
                for (r = 0; i.length >
                r; r++) a = n.classesElementLookup[i[r]] || t(), a = e.add
                    ? t(t.unique(a.get().concat(e.element.get())))
                    : t(a.not(e.element).
                        get()), n.classesElementLookup[i[r]] = a, s.push(
                    i[r]), o && e.classes[i[r]] && s.push(e.classes[i[r]]);
            }

            var s = [], n = this;
            return e = t.extend(
                { element: this.element, classes: this.options.classes || {} },
                e), this._on(e.element,
                { remove: '_untrackClassesElement' }), e.keys &&
            i(e.keys.match(/\S+/g) || [], !0), e.extra &&
            i(e.extra.match(/\S+/g) || []), s.join(' ');
        },
        _untrackClassesElement: function (e) {
            var i = this;
            t.each(i.classesElementLookup, function (s, n) {
                -1 !== t.inArray(e.target, n) &&
                (i.classesElementLookup[s] = t(n.not(e.target).get()));
            });
        },
        _removeClass: function (t, e, i) {
            return this._toggleClass(t, e, i, !1);
        },
        _addClass: function (t, e, i) {return this._toggleClass(t, e, i, !0);},
        _toggleClass: function (t, e, i, s) {
            s = 'boolean' == typeof s ? s : i;
            var n = 'string' == typeof t || null === t, o = {
                extra: n ? e : i,
                keys: n ? t : e,
                element: n ? this.element : t,
                add: s,
            };
            return o.element.toggleClass(this._classes(o), s), this;
        },
        _on: function (e, i, s) {
            var n, o = this;
            'boolean' != typeof e && (s = i, i = e, e = !1), s
                ? (i = n = t(i), this.bindings = this.bindings.add(i))
                : (s = i, i = this.element, n = this.widget()), t.each(s,
                function (s, a) {
                    function r () {
                        return e || o.options.disabled !== !0 &&
                        !t(this).hasClass('ui-state-disabled') ? ('string' ==
                        typeof a ? o[a] : a).apply(o, arguments) : void 0;
                    }

                    'string' != typeof a &&
                    (r.guid = a.guid = a.guid || r.guid || t.guid++);
                    var l = s.match(/^([\w:-]*)\s*(.*)$/),
                        h = l[1] + o.eventNamespace, c = l[2];
                    c ? n.on(h, c, r) : i.on(h, r);
                });
        },
        _off: function (e, i) {
            i = (i || '').split(' ').
                join(this.eventNamespace + ' ') + this.eventNamespace, e.off(i).
                off(i), this.bindings = t(
                this.bindings.not(e).get()), this.focusable = t(
                this.focusable.not(e).get()), this.hoverable = t(
                this.hoverable.not(e).get());
        },
        _delay: function (t, e) {
            function i () {
                return ('string' == typeof t
                    ? s[t]
                    : t).apply(s, arguments);
            }

            var s = this;
            return setTimeout(i, e || 0);
        },
        _hoverable: function (e) {
            this.hoverable = this.hoverable.add(e), this._on(e, {
                mouseenter: function (e) {
                    this._addClass(t(e.currentTarget), null, 'ui-state-hover');
                },
                mouseleave: function (e) {
                    this._removeClass(t(e.currentTarget), null,
                        'ui-state-hover');
                },
            });
        },
        _focusable: function (e) {
            this.focusable = this.focusable.add(e), this._on(e, {
                focusin: function (e) {
                    this._addClass(t(e.currentTarget), null, 'ui-state-focus');
                },
                focusout: function (e) {
                    this._removeClass(t(e.currentTarget), null,
                        'ui-state-focus');
                },
            });
        },
        _trigger: function (e, i, s) {
            var n, o, a = this.options[e];
            if (s = s || {}, i = t.Event(i), i.type = (e ===
            this.widgetEventPrefix ? e : this.widgetEventPrefix +
                e).toLowerCase(), i.target = this.element[0], o = i.originalEvent) for (n in o) n in
            i || (i[n] = o[n]);
            return this.element.trigger(i, s), !(t.isFunction(a) &&
                a.apply(this.element[0], [i].concat(s)) === !1 ||
                i.isDefaultPrevented());
        },
    }, t.each({ show: 'fadeIn', hide: 'fadeOut' }, function (e, i) {
        t.Widget.prototype['_' + e] = function (s, n, o) {
            'string' == typeof n && (n = { effect: n });
            var a, r = n
                ? n === !0 || 'number' == typeof n ? i : n.effect || i
                : e;
            n = n || {}, 'number' == typeof n &&
            (n = { duration: n }), a = !t.isEmptyObject(
                n), n.complete = o, n.delay && s.delay(n.delay), a &&
            t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](
                n.duration, n.easing, o) : s.queue(
                function (i) {t(this)[e](), o && o.call(s[0]), i();});
        };
    }), t.widget, t.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38,
    }, t.fn.extend({
        uniqueId: function () {
            var t = 0;
            return function () {
                return this.each(
                    function () {this.id || (this.id = 'ui-id-' + ++t);});
            };
        }(),
        removeUniqueId: function () {
            return this.each(function () {
                /^ui-id-\d+$/.test(this.id) && t(this).removeAttr('id');
            });
        },
    }), t.ui.escapeSelector = function () {
        var t = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;
        return function (e) {return e.replace(t, '\\$1');};
    }(), t.ui.safeActiveElement = function (t) {
        var e;
        try {e = t.activeElement;} catch (i) {e = t.body;}
        return e || (e = t.body), e.nodeName || (e = t.body), e;
    }, t.widget('ui.tabs', {
        version: '1.12.1',
        delay: 300,
        options: {
            active: null,
            classes: {
                'ui-tabs': 'ui-corner-all',
                'ui-tabs-nav': 'ui-corner-all',
                'ui-tabs-panel': 'ui-corner-bottom',
                'ui-tabs-tab': 'ui-corner-top',
            },
            collapsible: !1,
            event: 'click',
            heightStyle: 'content',
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null,
        },
        _isLocal: function () {
            var t = /#.*$/;
            return function (e) {
                var i, s;
                i = e.href.replace(t, ''), s = location.href.replace(t, '');
                try {i = decodeURIComponent(i);} catch (n) {}
                try {s = decodeURIComponent(s);} catch (n) {}
                return e.hash.length > 1 && i === s;
            };
        }(),
        _create: function () {
            var e = this, i = this.options;
            this.running = !1, this._addClass('ui-tabs',
                'ui-widget ui-widget-content'), this._toggleClass(
                'ui-tabs-collapsible', null,
                i.collapsible), this._processTabs(), i.active = this._initialActive(), t.isArray(
                i.disabled) && (i.disabled = t.unique(i.disabled.concat(
                t.map(this.tabs.filter('.ui-state-disabled'),
                    function (t) {return e.tabs.index(t);}))).
                sort()), this.active = this.options.active !== !1 &&
            this.anchors.length
                ? this._findActive(i.active)
                : t(), this._refresh(), this.active.length &&
            this.load(i.active);
        },
        _initialActive: function () {
            var e = this.options.active, i = this.options.collapsible,
                s = location.hash.substring(1);
            return null === e && (s && this.tabs.each(function (i, n) {
                return t(n).attr('aria-controls') === s
                    ? (e = i, !1)
                    : void 0;
            }), null === e && (e = this.tabs.index(
                this.tabs.filter('.ui-tabs-active'))), (null === e || -1 ===
                e) && (e = this.tabs.length ? 0 : !1)), e !== !1 &&
            (e = this.tabs.index(this.tabs.eq(e)), -1 === e &&
            (e = i ? !1 : 0)), !i && e === !1 && this.anchors.length &&
            (e = 0), e;
        },
        _getCreateEventData: function () {
            return {
                tab: this.active,
                panel: this.active.length
                    ? this._getPanelForTab(this.active)
                    : t(),
            };
        },
        _tabKeydown: function (e) {
            var i = t(t.ui.safeActiveElement(this.document[0])).closest('li'),
                s = this.tabs.index(i), n = !0;
            if (!this._handlePageNav(e)) {
                switch (e.keyCode) {
                    case t.ui.keyCode.RIGHT:
                    case t.ui.keyCode.DOWN:
                        s++;
                        break;
                    case t.ui.keyCode.UP:
                    case t.ui.keyCode.LEFT:
                        n = !1, s--;
                        break;
                    case t.ui.keyCode.END:
                        s = this.anchors.length - 1;
                        break;
                    case t.ui.keyCode.HOME:
                        s = 0;
                        break;
                    case t.ui.keyCode.SPACE:
                        return e.preventDefault(), clearTimeout(
                            this.activating), this._activate(s), void 0;
                    case t.ui.keyCode.ENTER:
                        return e.preventDefault(), clearTimeout(
                            this.activating), this._activate(
                            s === this.options.active ? !1 : s), void 0;
                    default:
                        return;
                }
                e.preventDefault(), clearTimeout(
                    this.activating), s = this._focusNextTab(s, n), e.ctrlKey ||
                e.metaKey || (i.attr('aria-selected', 'false'), this.tabs.eq(s).
                    attr('aria-selected',
                        'true'), this.activating = this._delay(
                    function () {this.option('active', s);}, this.delay));
            }
        },
        _panelKeydown: function (e) {
            this._handlePageNav(e) || e.ctrlKey && e.keyCode ===
            t.ui.keyCode.UP &&
            (e.preventDefault(), this.active.trigger('focus'));
        },
        _handlePageNav: function (e) {
            return e.altKey && e.keyCode === t.ui.keyCode.PAGE_UP
                ? (this._activate(
                    this._focusNextTab(this.options.active - 1, !1)), !0)
                : e.altKey && e.keyCode === t.ui.keyCode.PAGE_DOWN
                    ? (this._activate(
                        this._focusNextTab(this.options.active + 1, !0)), !0)
                    : void 0;
        },
        _findNextTab: function (e, i) {
            function s () {
                return e > n && (e = 0), 0 > e && (e = n), e;
            }

            for (var n = this.tabs.length - 1; -1 !==
            t.inArray(s(), this.options.disabled);) e = i ? e + 1 : e - 1;
            return e;
        },
        _focusNextTab: function (t, e) {
            return t = this._findNextTab(t, e), this.tabs.eq(t).
                trigger('focus'), t;
        },
        _setOption: function (t, e) {
            return 'active' === t ? (this._activate(e), void 0) : (this._super(
                t, e), 'collapsible' === t &&
            (this._toggleClass('ui-tabs-collapsible', null, e), e ||
            this.options.active !== !1 || this._activate(0)), 'event' === t &&
            this._setupEvents(e), 'heightStyle' === t &&
            this._setupHeightStyle(e), void 0);
        },
        _sanitizeSelector: function (t) {
            return t
                ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, '\\$&')
                : '';
        },
        refresh: function () {
            var e = this.options, i = this.tablist.children(':has(a[href])');
            e.disabled = t.map(i.filter('.ui-state-disabled'), function (t) {
                return i.index(t);
            }), this._processTabs(), e.active !== !1 && this.anchors.length
                ? this.active.length &&
                !t.contains(this.tablist[0], this.active[0])
                    ? this.tabs.length === e.disabled.length
                        ? (e.active = !1, this.active = t())
                        : this._activate(
                            this._findNextTab(Math.max(0, e.active - 1), !1))
                    : e.active = this.tabs.index(this.active)
                : (e.active = !1, this.active = t()), this._refresh();
        },
        _refresh: function () {
            this._setOptionDisabled(this.options.disabled), this._setupEvents(
                this.options.event), this._setupHeightStyle(
                this.options.heightStyle), this.tabs.not(this.active).
                attr({
                    'aria-selected': 'false',
                    'aria-expanded': 'false',
                    tabIndex: -1,
                }), this.panels.not(this._getPanelForTab(this.active)).
                hide().
                attr({ 'aria-hidden': 'true' }), this.active.length
                ? (this.active.attr({
                    'aria-selected': 'true',
                    'aria-expanded': 'true',
                    tabIndex: 0,
                }), this._addClass(this.active, 'ui-tabs-active',
                    'ui-state-active'), this._getPanelForTab(this.active).
                    show().
                    attr({ 'aria-hidden': 'false' }))
                : this.tabs.eq(0).attr('tabIndex', 0);
        },
        _processTabs: function () {
            var e = this, i = this.tabs, s = this.anchors, n = this.panels;
            this.tablist = this._getList().
                attr('role', 'tablist'), this._addClass(this.tablist,
                'ui-tabs-nav',
                'ui-helper-reset ui-helper-clearfix ui-widget-header'), this.tablist.on(
                'mousedown' + this.eventNamespace, '> li', function (e) {
                    t(this).is('.ui-state-disabled') && e.preventDefault();
                }).
                on('focus' + this.eventNamespace, '.ui-tabs-anchor',
                    function () {
                        t(this).
                            closest('li').
                            is('.ui-state-disabled') && this.blur();
                    }), this.tabs = this.tablist.find('> li:has(a[href])').
                attr({ role: 'tab', tabIndex: -1 }), this._addClass(this.tabs,
                'ui-tabs-tab',
                'ui-state-default'), this.anchors = this.tabs.map(
                function () {return t('a', this)[0];}).
                attr({ role: 'presentation', tabIndex: -1 }), this._addClass(
                this.anchors,
                'ui-tabs-anchor'), this.panels = t(), this.anchors.each(
                function (i, s) {
                    var n, o, a, r = t(s).uniqueId().attr('id'),
                        l = t(s).closest('li'), h = l.attr('aria-controls');
                    e._isLocal(s)
                        ? (n = s.hash, a = n.substring(1), o = e.element.find(
                        e._sanitizeSelector(n)))
                        : (a = l.attr('aria-controls') ||
                        t({}).uniqueId()[0].id, n = '#' + a, o = e.element.find(
                        n), o.length || (o = e._createPanel(a), o.insertAfter(
                        e.panels[i - 1] || e.tablist)), o.attr('aria-live',
                        'polite')), o.length &&
                    (e.panels = e.panels.add(o)), h &&
                    l.data('ui-tabs-aria-controls', h), l.attr(
                        { 'aria-controls': a, 'aria-labelledby': r }), o.attr(
                        'aria-labelledby', r);
                }), this.panels.attr('role', 'tabpanel'), this._addClass(
                this.panels, 'ui-tabs-panel', 'ui-widget-content'), i &&
            (this._off(i.not(this.tabs)), this._off(
                s.not(this.anchors)), this._off(n.not(this.panels)));
        },
        _getList: function () {
            return this.tablist || this.element.find('ol, ul').eq(0);
        },
        _createPanel: function (e) {
            return t('<div>').
                attr('id', e).
                data('ui-tabs-destroy', !0);
        },
        _setOptionDisabled: function (e) {
            var i, s, n;
            for (t.isArray(e) && (e.length
                ? e.length === this.anchors.length && (e = !0)
                : e = !1), n = 0; s = this.tabs[n]; n++) i = t(s), e === !0 ||
            -1 !== t.inArray(n, e)
                ? (i.attr('aria-disabled', 'true'), this._addClass(i, null,
                    'ui-state-disabled'))
                : (i.removeAttr('aria-disabled'), this._removeClass(i, null,
                    'ui-state-disabled'));
            this.options.disabled = e, this._toggleClass(this.widget(),
                this.widgetFullName + '-disabled', null, e === !0);
        },
        _setupEvents: function (e) {
            var i = {};
            e && t.each(e.split(' '),
                function (t, e) {i[e] = '_eventHandler';}), this._off(
                this.anchors.add(this.tabs).add(this.panels)), this._on(!0,
                this.anchors,
                { click: function (t) {t.preventDefault();} }), this._on(
                this.anchors, i), this._on(this.tabs,
                { keydown: '_tabKeydown' }), this._on(this.panels,
                { keydown: '_panelKeydown' }), this._focusable(
                this.tabs), this._hoverable(this.tabs);
        },
        _setupHeightStyle: function (e) {
            var i, s = this.element.parent();
            'fill' === e ? (i = s.height(), i -= this.element.outerHeight() -
                this.element.height(), this.element.siblings(':visible').
                each(function () {
                    var e = t(this), s = e.css('position');
                    'absolute' !== s && 'fixed' !== s &&
                    (i -= e.outerHeight(!0));
                }), this.element.children().
                not(this.panels).
                each(function () {
                    i -= t(this).
                        outerHeight(!0);
                }), this.panels.each(function () {
                t(this).
                    height(Math.max(0,
                        i - t(this).innerHeight() + t(this).height()));
            }).css('overflow', 'auto')) : 'auto' === e &&
                (i = 0, this.panels.each(
                    function () {
                        i = Math.max(i, t(this).height('').height());
                    }).
                    height(i));
        },
        _eventHandler: function (e) {
            var i = this.options, s = this.active, n = t(e.currentTarget),
                o = n.closest('li'), a = o[0] === s[0], r = a && i.collapsible,
                l = r ? t() : this._getPanelForTab(o),
                h = s.length ? this._getPanelForTab(s) : t(), c = {
                    oldTab: s,
                    oldPanel: h,
                    newTab: r ? t() : o,
                    newPanel: l,
                };
            e.preventDefault(), o.hasClass('ui-state-disabled') ||
            o.hasClass('ui-tabs-loading') || this.running || a &&
            !i.collapsible || this._trigger('beforeActivate', e, c) === !1 ||
            (i.active = r ? !1 : this.tabs.index(o), this.active = a
                ? t()
                : o, this.xhr && this.xhr.abort(), h.length || l.length ||
            t.error(
                'jQuery UI Tabs: Mismatching fragment identifier.'), l.length &&
            this.load(this.tabs.index(o), e), this._toggle(e, c));
        },
        _toggle: function (e, i) {
            function s () {
                o.running = !1, o._trigger('activate', e, i);
            }

            function n () {
                o._addClass(i.newTab.closest('li'), 'ui-tabs-active',
                    'ui-state-active'), a.length && o.options.show ? o._show(a,
                    o.options.show, s) : (a.show(), s());
            }

            var o = this, a = i.newPanel, r = i.oldPanel;
            this.running = !0, r.length && this.options.hide ? this._hide(r,
                this.options.hide, function () {
                    o._removeClass(i.oldTab.closest('li'), 'ui-tabs-active',
                        'ui-state-active'), n();
                }) : (this._removeClass(i.oldTab.closest('li'),
                'ui-tabs-active', 'ui-state-active'), r.hide(), n()), r.attr(
                'aria-hidden', 'true'), i.oldTab.attr({
                'aria-selected': 'false',
                'aria-expanded': 'false',
            }), a.length && r.length
                ? i.oldTab.attr('tabIndex', -1)
                : a.length && this.tabs.filter(
                function () {return 0 === t(this).attr('tabIndex');}).
                attr('tabIndex', -1), a.attr('aria-hidden',
                'false'), i.newTab.attr({
                'aria-selected': 'true',
                'aria-expanded': 'true',
                tabIndex: 0,
            });
        },
        _activate: function (e) {
            var i, s = this._findActive(e);
            s[0] !== this.active[0] &&
            (s.length || (s = this.active), i = s.find(
                '.ui-tabs-anchor')[0], this._eventHandler(
                { target: i, currentTarget: i, preventDefault: t.noop }));
        },
        _findActive: function (e) {return e === !1 ? t() : this.tabs.eq(e);},
        _getIndex: function (e) {
            return 'string' == typeof e && (e = this.anchors.index(
                this.anchors.filter(
                    '[href$=\'' + t.ui.escapeSelector(e) + '\']'))), e;
        },
        _destroy: function () {
            this.xhr && this.xhr.abort(), this.tablist.removeAttr('role').
                off(this.eventNamespace), this.anchors.removeAttr(
                'role tabIndex').removeUniqueId(), this.tabs.add(this.panels).
                each(function () {
                    t.data(this, 'ui-tabs-destroy') ? t(this).
                        remove() : t(this).
                        removeAttr(
                            'role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded');
                }), this.tabs.each(function () {
                var e = t(this), i = e.data('ui-tabs-aria-controls');
                i ? e.attr('aria-controls', i).
                    removeData('ui-tabs-aria-controls') : e.removeAttr(
                    'aria-controls');
            }), this.panels.show(), 'content' !== this.options.heightStyle &&
            this.panels.css('height', '');
        },
        enable: function (e) {
            var i = this.options.disabled;
            i !== !1 &&
            (void 0 === e ? i = !1 : (e = this._getIndex(e), i = t.isArray(i)
                ? t.map(i, function (t) {return t !== e ? t : null;})
                : t.map(this.tabs, function (t, i) {
                    return i !== e
                        ? i
                        : null;
                })), this._setOptionDisabled(i));
        },
        disable: function (e) {
            var i = this.options.disabled;
            if (i !== !0) {
                if (void 0 === e) i = !0; else {
                    if (e = this._getIndex(e), -1 !== t.inArray(e, i)) return;
                    i = t.isArray(i) ? t.merge([e], i).sort() : [e];
                }
                this._setOptionDisabled(i);
            }
        },
        load: function (e, i) {
            e = this._getIndex(e);
            var s = this, n = this.tabs.eq(e), o = n.find('.ui-tabs-anchor'),
                a = this._getPanelForTab(n), r = { tab: n, panel: a },
                l = function (t, e) {
                    'abort' === e && s.panels.stop(!1, !0), s._removeClass(n,
                        'ui-tabs-loading'), a.removeAttr('aria-busy'), t ===
                    s.xhr && delete s.xhr;
                };
            this._isLocal(o[0]) ||
            (this.xhr = t.ajax(this._ajaxSettings(o, i, r)), this.xhr &&
            'canceled' !== this.xhr.statusText &&
            (this._addClass(n, 'ui-tabs-loading'), a.attr('aria-busy',
                'true'), this.xhr.done(function (t, e, n) {
                setTimeout(
                    function () {a.html(t), s._trigger('load', i, r), l(n, e);},
                    1);
            }).fail(function (t, e) {setTimeout(function () {l(t, e);}, 1);})));
        },
        _ajaxSettings: function (e, i, s) {
            var n = this;
            return {
                url: e.attr('href').replace(/#.*$/, ''),
                beforeSend: function (e, o) {
                    return n._trigger('beforeLoad', i,
                        t.extend({ jqXHR: e, ajaxSettings: o }, s));
                },
            };
        },
        _getPanelForTab: function (e) {
            var i = t(e).attr('aria-controls');
            return this.element.find(this._sanitizeSelector('#' + i));
        },
    }), t.uiBackCompat !== !1 && t.widget('ui.tabs', t.ui.tabs, {
        _processTabs: function () {
            this._superApply(arguments), this._addClass(this.tabs, 'ui-tab');
        },
    }), t.ui.tabs;
    var s = 'ui-effects-', n = 'ui-effects-style', o = 'ui-effects-animated',
        a = t;
    t.effects = { effect: {} }, function (t, e) {
        function i (t, e, i) {
            var s = u[e.type] || {};
            return null == t ? i || !e.def ? null : e.def : (t = s.floor
                ? ~~t
                : parseFloat(t), isNaN(t) ? e.def : s.mod
                ? (t + s.mod) % s.mod
                : 0 > t ? 0 : t > s.max ? s.max : t);
        }

        function s (i) {
            var s = h(), n = s._rgba = [];
            return i = i.toLowerCase(), f(l, function (t, o) {
                var a, r = o.re.exec(i), l = r && o.parse(r),
                    h = o.space || 'rgba';
                return l
                    ? (a = s[h](
                        l), s[c[h].cache] = a[c[h].cache], n = s._rgba = a._rgba, !1)
                    : e;
            }), n.length ? ('0,0,0,0' === n.join() &&
            t.extend(n, o.transparent), s) : o[i];
        }

        function n (t, e, i) {
            return i = (i + 1) % 1, 1 > 6 * i ? t + 6 * (e - t) * i : 1 > 2 * i
                ? e
                : 2 > 3 * i ? t + 6 * (e - t) * (2 / 3 - i) : t;
        }

        var o,
            a = 'backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor',
            r = /^([\-+])=\s*(\d+\.?\d*)/, l = [
                {
                    re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function (t) {return [t[1], t[2], t[3], t[4]];},
                },
                {
                    re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function (t) {
                        return [
                            2.55 * t[1],
                            2.55 * t[2],
                            2.55 * t[3],
                            t[4]];
                    },
                },
                {
                    re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                    parse: function (t) {
                        return [
                            parseInt(t[1], 16),
                            parseInt(t[2], 16),
                            parseInt(t[3], 16)];
                    },
                },
                {
                    re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                    parse: function (t) {
                        return [
                            parseInt(t[1] + t[1], 16),
                            parseInt(t[2] + t[2], 16),
                            parseInt(t[3] + t[3], 16)];
                    },
                },
                {
                    re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    space: 'hsla',
                    parse: function (t) {
                        return [
                            t[1],
                            t[2] / 100,
                            t[3] / 100,
                            t[4]];
                    },
                }], h = t.Color = function (e, i, s, n) {
                return new t.Color.fn.parse(e, i, s, n);
            }, c = {
                rgba: {
                    props: {
                        red: { idx: 0, type: 'byte' },
                        green: { idx: 1, type: 'byte' },
                        blue: { idx: 2, type: 'byte' },
                    },
                },
                hsla: {
                    props: {
                        hue: { idx: 0, type: 'degrees' },
                        saturation: { idx: 1, type: 'percent' },
                        lightness: { idx: 2, type: 'percent' },
                    },
                },
            }, u = {
                'byte': { floor: !0, max: 255 },
                percent: { max: 1 },
                degrees: { mod: 360, floor: !0 },
            }, d = h.support = {}, p = t('<p>')[0], f = t.each;
        p.style.cssText = 'background-color:rgba(1,1,1,.5)', d.rgba = p.style.backgroundColor.indexOf(
            'rgba') > -1, f(c, function (t, e) {
            e.cache = '_' + t, e.props.alpha = {
                idx: 3,
                type: 'percent',
                def: 1,
            };
        }), h.fn = t.extend(h.prototype, {
            parse: function (n, a, r, l) {
                if (n === e) return this._rgba = [null, null, null, null], this;
                (n.jquery || n.nodeType) && (n = t(n).css(a), a = e);
                var u = this, d = t.type(n), p = this._rgba = [];
                return a !== e && (n = [n, a, r, l], d = 'array'), 'string' ===
                d ? this.parse(s(n) || o._default) : 'array' === d
                    ? (f(c.rgba.props,
                        function (t, e) {p[e.idx] = i(n[e.idx], e);}), this)
                    : 'object' === d ? (n instanceof h ? f(c, function (t, e) {
                        n[e.cache] && (u[e.cache] = n[e.cache].slice());
                    }) : f(c, function (e, s) {
                        var o = s.cache;
                        f(s.props, function (t, e) {
                            if (!u[o] && s.to) {
                                if ('alpha' === t || null == n[t]) return;
                                u[o] = s.to(u._rgba);
                            }
                            u[o][e.idx] = i(n[t], e, !0);
                        }), u[o] && 0 > t.inArray(null, u[o].slice(0, 3)) &&
                        (u[o][3] = 1, s.from && (u._rgba = s.from(u[o])));
                    }), this) : e;
            },
            is: function (t) {
                var i = h(t), s = !0, n = this;
                return f(c, function (t, o) {
                    var a, r = i[o.cache];
                    return r &&
                    (a = n[o.cache] || o.to && o.to(n._rgba) || [], f(o.props,
                        function (t, i) {
                            return null != r[i.idx]
                                ? s = r[i.idx] === a[i.idx]
                                : e;
                        })), s;
                }), s;
            },
            _space: function () {
                var t = [], e = this;
                return f(c,
                    function (i, s) {e[s.cache] && t.push(i);}), t.pop();
            },
            transition: function (t, e) {
                var s = h(t), n = s._space(), o = c[n],
                    a = 0 === this.alpha() ? h('transparent') : this,
                    r = a[o.cache] || o.to(a._rgba), l = r.slice();
                return s = s[o.cache], f(o.props, function (t, n) {
                    var o = n.idx, a = r[o], h = s[o], c = u[n.type] || {};
                    null !== h && (null === a ? l[o] = h : (c.mod &&
                    (h - a > c.mod / 2 ? a += c.mod : a - h > c.mod / 2 &&
                        (a -= c.mod)), l[o] = i((h - a) * e + a, n)));
                }), this[n](l);
            },
            blend: function (e) {
                if (1 === this._rgba[3]) return this;
                var i = this._rgba.slice(), s = i.pop(), n = h(e)._rgba;
                return h(
                    t.map(i, function (t, e) {return (1 - s) * n[e] + s * t;}));
            },
            toRgbaString: function () {
                var e = 'rgba(', i = t.map(this._rgba,
                    function (t, e) {return null == t ? e > 2 ? 1 : 0 : t;});
                return 1 === i[3] && (i.pop(), e = 'rgb('), e + i.join() + ')';
            },
            toHslaString: function () {
                var e = 'hsla(', i = t.map(this.hsla(), function (t, e) {
                    return null == t && (t = e > 2 ? 1 : 0), e && 3 > e &&
                    (t = Math.round(100 * t) + '%'), t;
                });
                return 1 === i[3] && (i.pop(), e = 'hsl('), e + i.join() + ')';
            },
            toHexString: function (e) {
                var i = this._rgba.slice(), s = i.pop();
                return e && i.push(~~(255 * s)), '#' + t.map(i, function (t) {
                    return t = (t || 0).toString(16), 1 === t.length
                        ? '0' + t
                        : t;
                }).join('');
            },
            toString: function () {
                return 0 === this._rgba[3]
                    ? 'transparent'
                    : this.toRgbaString();
            },
        }), h.fn.parse.prototype = h.fn, c.hsla.to = function (t) {
            if (null == t[0] || null == t[1] || null == t[2]) return [
                null,
                null,
                null,
                t[3]];
            var e, i, s = t[0] / 255, n = t[1] / 255, o = t[2] / 255, a = t[3],
                r = Math.max(s, n, o), l = Math.min(s, n, o), h = r - l,
                c = r + l, u = .5 * c;
            return e = l === r ? 0 : s === r ? 60 * (n - o) / h + 360 : n === r
                ? 60 * (o - s) / h + 120
                : 60 * (s - n) / h + 240, i = 0 === h ? 0 : .5 >= u
                ? h / c
                : h / (2 - c), [Math.round(e) % 360, i, u, null == a ? 1 : a];
        }, c.hsla.from = function (t) {
            if (null == t[0] || null == t[1] || null == t[2]) return [
                null,
                null,
                null,
                t[3]];
            var e = t[0] / 360, i = t[1], s = t[2], o = t[3],
                a = .5 >= s ? s * (1 + i) : s + i - s * i, r = 2 * s - a;
            return [
                Math.round(255 * n(r, a, e + 1 / 3)),
                Math.round(255 * n(r, a, e)),
                Math.round(255 * n(r, a, e - 1 / 3)),
                o];
        }, f(c, function (s, n) {
            var o = n.props, a = n.cache, l = n.to, c = n.from;
            h.fn[s] = function (s) {
                if (l && !this[a] && (this[a] = l(this._rgba)), s ===
                e) return this[a].slice();
                var n, r = t.type(s),
                    u = 'array' === r || 'object' === r ? s : arguments,
                    d = this[a].slice();
                return f(o, function (t, e) {
                    var s = u['object' === r ? t : e.idx];
                    null == s && (s = d[e.idx]), d[e.idx] = i(s, e);
                }), c ? (n = h(c(d)), n[a] = d, n) : h(d);
            }, f(o, function (e, i) {
                h.fn[e] || (h.fn[e] = function (n) {
                    var o, a = t.type(n), l = 'alpha' === e
                        ? this._hsla ? 'hsla' : 'rgba'
                        : s, h = this[l](), c = h[i.idx];
                    return 'undefined' === a ? c : ('function' === a &&
                    (n = n.call(this, c), a = t.type(n)), null == n && i.empty
                        ? this
                        : ('string' === a && (o = r.exec(n), o &&
                        (n = c + parseFloat(o[2]) *
                            ('+' === o[1] ? 1 : -1))), h[i.idx] = n, this[l](
                            h)));
                });
            });
        }), h.hook = function (e) {
            var i = e.split(' ');
            f(i, function (e, i) {
                t.cssHooks[i] = {
                    set: function (e, n) {
                        var o, a, r = '';
                        if ('transparent' !== n &&
                            ('string' !== t.type(n) || (o = s(n)))) {
                            if (n = h(o || n), !d.rgba && 1 !== n._rgba[3]) {
                                for (a = 'backgroundColor' === i
                                    ? e.parentNode
                                    : e; ("" === r || "transparent" === r) &&
                                     a && a.style;) try {
                                    r = t.css(a,
                                        'backgroundColor'), a = a.parentNode;
                                } catch (l) {}
                                n = n.blend(
                                    r && 'transparent' !== r ? r : '_default');
                            }
                            n = n.toRgbaString();
                        }
                        try {e.style[i] = n;} catch (l) {}
                    },
                }, t.fx.step[i] = function (e) {
                    e.colorInit || (e.start = h(e.elem, i), e.end = h(
                        e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem,
                        e.start.transition(e.end, e.pos));
                };
            });
        }, h.hook(a), t.cssHooks.borderColor = {
            expand: function (t) {
                var e = {};
                return f(['Top', 'Right', 'Bottom', 'Left'],
                    function (i, s) {e['border' + s + 'Color'] = t;}), e;
            },
        }, o = t.Color.names = {
            aqua: '#00ffff',
            black: '#000000',
            blue: '#0000ff',
            fuchsia: '#ff00ff',
            gray: '#808080',
            green: '#008000',
            lime: '#00ff00',
            maroon: '#800000',
            navy: '#000080',
            olive: '#808000',
            purple: '#800080',
            red: '#ff0000',
            silver: '#c0c0c0',
            teal: '#008080',
            white: '#ffffff',
            yellow: '#ffff00',
            transparent: [null, null, null, 0],
            _default: '#ffffff',
        };
    }(a), function () {
        function e (e) {
            var i, s, n = e.ownerDocument.defaultView
                ? e.ownerDocument.defaultView.getComputedStyle(e, null)
                : e.currentStyle, o = {};
            if (n && n.length && n[0] &&
                n[n[0]]) for (s = n.length; s--;) i = n[s], 'string' ==
            typeof n[i] &&
            (o[t.camelCase(i)] = n[i]); else for (i in n) 'string' ==
            typeof n[i] && (o[i] = n[i]);
            return o;
        }

        function i (e, i) {
            var s, o, a = {};
            for (s in i) o = i[s], e[s] !== o &&
            (n[s] || (t.fx.step[s] || !isNaN(parseFloat(o))) && (a[s] = o));
            return a;
        }

        var s = ['add', 'remove', 'toggle'], n = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1,
        };
        t.each([
            'borderLeftStyle',
            'borderRightStyle',
            'borderBottomStyle',
            'borderTopStyle'], function (e, i) {
            t.fx.step[i] = function (t) {
                ('none' !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) &&
                (a.style(t.elem, i, t.end), t.setAttr = !0);
            };
        }), t.fn.addBack || (t.fn.addBack = function (t) {
            return this.add(
                null == t ? this.prevObject : this.prevObject.filter(t));
        }), t.effects.animateClass = function (n, o, a, r) {
            var l = t.speed(o, a, r);
            return this.queue(function () {
                var o, a = t(this), r = a.attr('class') || '',
                    h = l.children ? a.find('*').addBack() : a;
                h = h.map(function () {
                    var i = t(this);
                    return { el: i, start: e(this) };
                }), o = function () {
                    t.each(s, function (t, e) {n[e] && a[e + 'Class'](n[e]);});
                }, o(), h = h.map(function () {
                    return this.end = e(this.el[0]), this.diff = i(this.start,
                        this.end), this;
                }), a.attr('class', r), h = h.map(function () {
                    var e = this, i = t.Deferred(), s = t.extend({}, l,
                        { queue: !1, complete: function () {i.resolve(e);} });
                    return this.el.animate(this.diff, s), i.promise();
                }), t.when.apply(t, h.get()).
                    done(function () {
                        o(), t.each(arguments, function () {
                            var e = this.el;
                            t.each(this.diff, function (t) {e.css(t, '');});
                        }), l.complete.call(a[0]);
                    });
            });
        }, t.fn.extend({
            addClass: function (e) {
                return function (i, s, n, o) {
                    return s
                        ? t.effects.animateClass.call(this, { add: i }, s, n, o)
                        : e.apply(this, arguments);
                };
            }(t.fn.addClass),
            removeClass: function (e) {
                return function (i, s, n, o) {
                    return arguments.length > 1
                        ? t.effects.animateClass.call(this, { remove: i }, s, n,
                            o)
                        : e.apply(this, arguments);
                };
            }(t.fn.removeClass),
            toggleClass: function (e) {
                return function (i, s, n, o, a) {
                    return 'boolean' == typeof s || void 0 === s
                        ? n ? t.effects.animateClass.call(this,
                            s ? { add: i } : { remove: i }, n, o, a) : e.apply(
                            this, arguments)
                        : t.effects.animateClass.call(this, { toggle: i }, s, n,
                            o);
                };
            }(t.fn.toggleClass),
            switchClass: function (e, i, s, n, o) {
                return t.effects.animateClass.call(this, { add: i, remove: e },
                    s, n, o);
            },
        });
    }(), function () {
        function e (e, i, s, n) {
            return t.isPlainObject(e) &&
            (i = e, e = e.effect), e = { effect: e }, null == i &&
            (i = {}), t.isFunction(i) && (n = i, s = null, i = {}), ('number' ==
                typeof i || t.fx.speeds[i]) &&
            (n = s, s = i, i = {}), t.isFunction(s) && (n = s, s = null), i &&
            t.extend(e, i), s = s || i.duration, e.duration = t.fx.off
                ? 0
                : 'number' == typeof s
                    ? s
                    : s in t.fx.speeds
                        ? t.fx.speeds[s]
                        : t.fx.speeds._default, e.complete = n || i.complete, e;
        }

        function i (e) {
            return !e || 'number' == typeof e || t.fx.speeds[e]
                ? !0
                : 'string' != typeof e || t.effects.effect[e] ? t.isFunction(e)
                    ? !0
                    : 'object' != typeof e || e.effect ? !1 : !0 : !0;
        }

        function a (t, e) {
            var i = e.outerWidth(), s = e.outerHeight(),
                n = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,
                o = n.exec(t) || ['', 0, i, s, 0];
            return {
                top: parseFloat(o[1]) || 0,
                right: 'auto' === o[2] ? i : parseFloat(o[2]),
                bottom: 'auto' === o[3] ? s : parseFloat(o[3]),
                left: parseFloat(o[4]) || 0,
            };
        }

        t.expr && t.expr.filters && t.expr.filters.animated &&
        (t.expr.filters.animated = function (e) {
            return function (i) {
                return !!t(i).data(o) || e(i);
            };
        }(t.expr.filters.animated)), t.uiBackCompat !== !1 &&
        t.extend(t.effects, {
            save: function (t, e) {
                for (var i = 0, n = e.length; n > i; i++) null !== e[i] &&
                t.data(s + e[i], t[0].style[e[i]]);
            },
            restore: function (t, e) {
                for (var i, n = 0, o = e.length; o > n; n++) null !== e[n] &&
                (i = t.data(s + e[n]), t.css(e[n], i));
            },
            setMode: function (t, e) {
                return 'toggle' === e &&
                (e = t.is(':hidden') ? 'show' : 'hide'), e;
            },
            createWrapper: function (e) {
                if (e.parent().
                    is('.ui-effects-wrapper')) return e.parent();
                var i = {
                        width: e.outerWidth(!0),
                        height: e.outerHeight(!0),
                        'float': e.css('float'),
                    }, s = t('<div></div>').
                        addClass('ui-effects-wrapper').
                        css({
                            fontSize: '100%',
                            background: 'transparent',
                            border: 'none',
                            margin: 0,
                            padding: 0,
                        }), n = { width: e.width(), height: e.height() },
                    o = document.activeElement;
                try {o.id;} catch (a) {o = document.body;}
                return e.wrap(s), (e[0] === o || t.contains(e[0], o)) &&
                t(o).trigger('focus'), s = e.parent(), 'static' ===
                e.css('position') ? (s.css({ position: 'relative' }), e.css(
                    { position: 'relative' })) : (t.extend(i, {
                    position: e.css('position'),
                    zIndex: e.css('z-index'),
                }), t.each(['top', 'left', 'bottom', 'right'], function (t, s) {
                    i[s] = e.css(s), isNaN(parseInt(i[s], 10)) &&
                    (i[s] = 'auto');
                }), e.css({
                    position: 'relative',
                    top: 0,
                    left: 0,
                    right: 'auto',
                    bottom: 'auto',
                })), e.css(n), s.css(i).show();
            },
            removeWrapper: function (e) {
                var i = document.activeElement;
                return e.parent().is('.ui-effects-wrapper') &&
                (e.parent().replaceWith(e), (e[0] === i ||
                    t.contains(e[0], i)) && t(i).trigger('focus')), e;
            },
        }), t.extend(t.effects, {
            version: '1.12.1',
            define: function (e, i, s) {
                return s ||
                (s = i, i = 'effect'), t.effects.effect[e] = s, t.effects.effect[e].mode = i, s;
            },
            scaledDimensions: function (t, e, i) {
                if (0 === e) return {
                    height: 0,
                    width: 0,
                    outerHeight: 0,
                    outerWidth: 0,
                };
                var s = 'horizontal' !== i ? (e || 100) / 100 : 1,
                    n = 'vertical' !== i ? (e || 100) / 100 : 1;
                return {
                    height: t.height() * n,
                    width: t.width() * s,
                    outerHeight: t.outerHeight() * n,
                    outerWidth: t.outerWidth() * s,
                };
            },
            clipToBox: function (t) {
                return {
                    width: t.clip.right - t.clip.left,
                    height: t.clip.bottom - t.clip.top,
                    left: t.clip.left,
                    top: t.clip.top,
                };
            },
            unshift: function (t, e, i) {
                var s = t.queue();
                e > 1 &&
                s.splice.apply(s, [1, 0].concat(s.splice(e, i))), t.dequeue();
            },
            saveStyle: function (t) {t.data(n, t[0].style.cssText);},
            restoreStyle: function (t) {
                t[0].style.cssText = t.data(n) || '', t.removeData(n);
            },
            mode: function (t, e) {
                var i = t.is(':hidden');
                return 'toggle' === e && (e = i ? 'show' : 'hide'), (i
                    ? 'hide' === e
                    : 'show' === e) && (e = 'none'), e;
            },
            getBaseline: function (t, e) {
                var i, s;
                switch (t[0]) {
                    case'top':
                        i = 0;
                        break;
                    case'middle':
                        i = .5;
                        break;
                    case'bottom':
                        i = 1;
                        break;
                    default:
                        i = t[0] / e.height;
                }
                switch (t[1]) {
                    case'left':
                        s = 0;
                        break;
                    case'center':
                        s = .5;
                        break;
                    case'right':
                        s = 1;
                        break;
                    default:
                        s = t[1] / e.width;
                }
                return { x: s, y: i };
            },
            createPlaceholder: function (e) {
                var i, n = e.css('position'), o = e.position();
                return e.css({
                    marginTop: e.css('marginTop'),
                    marginBottom: e.css('marginBottom'),
                    marginLeft: e.css('marginLeft'),
                    marginRight: e.css('marginRight'),
                }).
                    outerWidth(e.outerWidth()).
                    outerHeight(e.outerHeight()), /^(static|relative)/.test(
                    n) && (n = 'absolute', i = t('<' + e[0].nodeName + '>').
                    insertAfter(e).
                    css({
                        display: /^(inline|ruby)/.test(e.css('display'))
                            ? 'inline-block'
                            : 'block',
                        visibility: 'hidden',
                        marginTop: e.css('marginTop'),
                        marginBottom: e.css('marginBottom'),
                        marginLeft: e.css('marginLeft'),
                        marginRight: e.css('marginRight'),
                        'float': e.css('float'),
                    }).
                    outerWidth(e.outerWidth()).
                    outerHeight(e.outerHeight()).
                    addClass('ui-effects-placeholder'), e.data(
                    s + 'placeholder', i)), e.css(
                    { position: n, left: o.left, top: o.top }), i;
            },
            removePlaceholder: function (t) {
                var e = s + 'placeholder', i = t.data(e);
                i && (i.remove(), t.removeData(e));
            },
            cleanUp: function (e) {
                t.effects.restoreStyle(e), t.effects.removePlaceholder(e);
            },
            setTransition: function (e, i, s, n) {
                return n = n || {}, t.each(i, function (t, i) {
                    var o = e.cssUnit(i);
                    o[0] > 0 && (n[i] = o[0] * s + o[1]);
                }), n;
            },
        }), t.fn.extend({
            effect: function () {
                function i (e) {
                    function i () {
                        l.removeData(o), t.effects.cleanUp(l), 'hide' ===
                        s.mode && l.hide(), r();
                    }

                    function r () {
                        t.isFunction(h) && h.call(l[0]), t.isFunction(e) && e();
                    }

                    var l = t(this);
                    s.mode = u.shift(), t.uiBackCompat === !1 || a ? 'none' ===
                    s.mode ? (l[c](), r()) : n.call(l[0], s, i) : (l.is(
                        ':hidden')
                        ? 'hide' === c
                        : 'show' === c) ? (l[c](), r()) : n.call(l[0], s, r);
                }

                var s = e.apply(this, arguments),
                    n = t.effects.effect[s.effect], a = n.mode, r = s.queue,
                    l = r || 'fx', h = s.complete, c = s.mode, u = [],
                    d = function (e) {
                        var i = t(this), s = t.effects.mode(i, c) || a;
                        i.data(o, !0), u.push(s), a &&
                        ('show' === s || s === a && 'hide' === s) &&
                        i.show(), a && 'none' === s ||
                        t.effects.saveStyle(i), t.isFunction(e) && e();
                    };
                return t.fx.off || !n ? c ? this[c](s.duration, h) : this.each(
                    function () {h && h.call(this);}) : r === !1 ? this.each(d).
                    each(i) : this.queue(l, d).queue(l, i);
            },
            show: function (t) {
                return function (s) {
                    if (i(s)) return t.apply(this, arguments);
                    var n = e.apply(this, arguments);
                    return n.mode = 'show', this.effect.call(this, n);
                };
            }(t.fn.show),
            hide: function (t) {
                return function (s) {
                    if (i(s)) return t.apply(this, arguments);
                    var n = e.apply(this, arguments);
                    return n.mode = 'hide', this.effect.call(this, n);
                };
            }(t.fn.hide),
            toggle: function (t) {
                return function (s) {
                    if (i(s) || 'boolean' == typeof s) return t.apply(this,
                        arguments);
                    var n = e.apply(this, arguments);
                    return n.mode = 'toggle', this.effect.call(this, n);
                };
            }(t.fn.toggle),
            cssUnit: function (e) {
                var i = this.css(e), s = [];
                return t.each(['em', 'px', '%', 'pt'], function (t, e) {
                    i.indexOf(e) > 0 && (s = [parseFloat(i), e]);
                }), s;
            },
            cssClip: function (t) {
                return t ? this.css('clip',
                    'rect(' + t.top + 'px ' + t.right + 'px ' + t.bottom +
                    'px ' + t.left + 'px)') : a(this.css('clip'), this);
            },
            transfer: function (e, i) {
                var s = t(this), n = t(e.to), o = 'fixed' === n.css('position'),
                    a = t('body'), r = o ? a.scrollTop() : 0,
                    l = o ? a.scrollLeft() : 0, h = n.offset(), c = {
                        top: h.top - r,
                        left: h.left - l,
                        height: n.innerHeight(),
                        width: n.innerWidth(),
                    }, u = s.offset(),
                    d = t('<div class=\'ui-effects-transfer\'></div>').
                        appendTo('body').
                        addClass(e.className).
                        css({
                            top: u.top - r,
                            left: u.left - l,
                            height: s.innerHeight(),
                            width: s.innerWidth(),
                            position: o ? 'fixed' : 'absolute',
                        }).
                        animate(c, e.duration, e.easing,
                            function () {d.remove(), t.isFunction(i) && i();});
            },
        }), t.fx.step.clip = function (e) {
            e.clipInit ||
            (e.start = t(e.elem).cssClip(), 'string' == typeof e.end &&
            (e.end = a(e.end, e.elem)), e.clipInit = !0), t(e.elem).
                cssClip({
                    top: e.pos * (e.end.top - e.start.top) + e.start.top,
                    right: e.pos * (e.end.right - e.start.right) +
                        e.start.right,
                    bottom: e.pos * (e.end.bottom - e.start.bottom) +
                        e.start.bottom,
                    left: e.pos * (e.end.left - e.start.left) + e.start.left,
                });
        };
    }(), function () {
        var e = {};
        t.each(['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'], function (t, i) {
            e[i] = function (e) {
                return Math.pow(e, t + 2);
            };
        }), t.extend(e, {
            Sine: function (t) {return 1 - Math.cos(t * Math.PI / 2);},
            Circ: function (t) {return 1 - Math.sqrt(1 - t * t);},
            Elastic: function (t) {
                return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) *
                    Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15);
            },
            Back: function (t) {return t * t * (3 * t - 2);},
            Bounce: function (t) {
                for (var e, i = 4; ((e = Math.pow(2, --i)) - 1) / 11 > t;) ;
                return 1 / Math.pow(4, 3 - i) - 7.5625 *
                    Math.pow((3 * e - 2) / 22 - t, 2);
            },
        }), t.each(e, function (e, i) {
            t.easing['easeIn' + e] = i, t.easing['easeOut' +
            e] = function (t) {return 1 - i(1 - t);}, t.easing['easeInOut' +
            e] = function (t) {
                return .5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2;
            };
        });
    }(), t.effects, t.effects.define('fade', 'toggle', function (e, i) {
        var s = 'show' === e.mode;
        t(this).
            css('opacity', s ? 0 : 1).
            animate({ opacity: s ? 1 : 0 }, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: i,
            });
    }), t.effects.define('slide', 'show', function (e, i) {
        var s, n, o = t(this), a = {
                up: ['bottom', 'top'],
                down: ['top', 'bottom'],
                left: ['right', 'left'],
                right: ['left', 'right'],
            }, r = e.mode, l = e.direction || 'left',
            h = 'up' === l || 'down' === l ? 'top' : 'left',
            c = 'up' === l || 'left' === l,
            u = e.distance || o['top' === h ? 'outerHeight' : 'outerWidth'](!0),
            d = {};
        t.effects.createPlaceholder(
            o), s = o.cssClip(), n = o.position()[h], d[h] = (c ? -1 : 1) * u +
            n, d.clip = o.cssClip(), d.clip[a[l][1]] = d.clip[a[l][0]], 'show' ===
        r &&
        (o.cssClip(d.clip), o.css(h, d[h]), d.clip = s, d[h] = n), o.animate(d,
            { queue: !1, duration: e.duration, easing: e.easing, complete: i });
    });
});

window.SEMICOLON_tabsInit = function ($tabsEl) {

    $tabsEl = $tabsEl.filter(':not(.customjs)');

    if ($tabsEl.length < 1) {
        return true;
    }

    $tabsEl.each(function () {
        let element = $(this),
            elAction = element.attr('data-action') || 'click',
            elSpeed = element.attr('data-speed') || 400,
            elActive = element.attr('data-active') || 1;

        elActive = elActive - 1;

        let windowHash = window.location.hash;
        if ($(windowHash).length > 0 && element.find(windowHash).length > 0) {
            elActive = $(windowHash).index();
        }

        element.tabs({
            event: elAction,
            active: Number(elActive),
            show: {
                effect: 'fade',
                duration: Number(elSpeed),
            },
            activate: function (event, ui) {
                $(ui.newPanel).find('.flexslider .slide').resize();
            },
        });

        SEMICOLON_tabsResponsive(element);
        SEMICOLON_tabsResponsiveResizeInit(element);

        $(window).on('scwWindowResize', function () {
            SEMICOLON_tabsResponsiveResizeInit(element);
        });
    });

};

window.SEMICOLON_tabsResponsive = function ($tabsEl) {

    $tabsEl = $tabsEl.filter('.tabs-responsive');

    if ($tabsEl.length < 1) {
        return true;
    }

    $tabsEl.each(function () {
        let element = $(this),
            elementNav = element.find('.tab-nav'),
            elementContent = element.find('.tab-container');

        elementNav.children('li').each(function () {
            let navEl = $(this),
                navElAnchor = navEl.children('a'),
                navElTarget = navElAnchor.attr('href'),
                navElContent = navElAnchor.html();

            elementContent.find(navElTarget).
                before(
                    '<div class="accordion-header d-none"><div class="accordion-icon"><i class="accordion-closed icon-ok-circle"></i><i class="accordion-open icon-remove-circle"></i></div><div class="accordion-title">' +
                    navElContent + '</div></div>');
        });
    });
};

window.SEMICOLON_tabsResponsiveResizeInit = function ($tabsEl) {

    let $body = $('body');
    $tabsEl = $tabsEl.filter('.tabs-responsive');

    if ($tabsEl.length < 1) {
        return true;
    }

    $tabsEl.each(function () {
        let element = $(this),
            elActive = element.tabs('option', 'active') + 1,
            elementAccStyle = element.attr('data-accordion-style');

        if ($body.hasClass('device-sm') || $body.hasClass('device-xs')) {

            element.find('.tab-nav').addClass('d-none');
            element.find('.tab-container').
                addClass('accordion ' + elementAccStyle).
                attr('data-active', elActive);
            element.find('.tab-content').addClass('accordion-content');
            element.find('.accordion-header').removeClass('d-none');
            SEMICOLON.widget.accordions({ 'parent': element });

        } else if ($body.hasClass('device-md') || $body.hasClass('device-lg') ||
            $body.hasClass('device-xl')) {

            element.find('.tab-nav').removeClass('d-none');
            element.find('.tab-container').
                removeClass('accordion ' + elementAccStyle).
                attr('data-active', '');
            elActive = element.find('.acctitlec').next('.tab-content').index();
            element.find('.tab-content').removeClass('accordion-content');
            element.find('.accordion-header').addClass('d-none');
            element.tabs('refresh');
            if (elActive > 0) {
                element.tabs('option', 'active', ((elActive - 1) / 2));
            }

        }
    });
};

