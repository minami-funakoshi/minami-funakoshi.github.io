
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.4' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/Education/index.svelte generated by Svelte v3.46.4 */

    const file$5 = "src/Education/index.svelte";

    function create_fragment$6(ctx) {
    	let section;
    	let h2;
    	let t1;
    	let hr;
    	let t2;
    	let div0;
    	let h30;
    	let t4;
    	let p0;
    	let t5;
    	let i;
    	let t7;
    	let div1;
    	let h31;
    	let t9;
    	let p1;
    	let t11;
    	let div2;
    	let h32;
    	let t13;
    	let p2;
    	let t15;
    	let div3;
    	let h33;
    	let t17;
    	let p3;

    	const block = {
    		c: function create() {
    			section = element("section");
    			h2 = element("h2");
    			h2.textContent = "Education";
    			t1 = space();
    			hr = element("hr");
    			t2 = space();
    			div0 = element("div");
    			h30 = element("h3");
    			h30.textContent = "Yale University";
    			t4 = space();
    			p0 = element("p");
    			t5 = text("B.A. in Literature, ");
    			i = element("i");
    			i.textContent = "magna cum laude";
    			t7 = space();
    			div1 = element("div");
    			h31 = element("h3");
    			h31.textContent = "Columbia University";
    			t9 = space();
    			p1 = element("p");
    			p1.textContent = "Lede programme, School of Journalism";
    			t11 = space();
    			div2 = element("div");
    			h32 = element("h3");
    			h32.textContent = "Tsinghua University";
    			t13 = space();
    			p2 = element("p");
    			p2.textContent = "Inter-University Program for Chinese Language";
    			t15 = space();
    			div3 = element("div");
    			h33 = element("h3");
    			h33.textContent = "NAtional Taiwan University";
    			t17 = space();
    			p3 = element("p");
    			p3.textContent = "International Chinese Language Program";
    			add_location(h2, file$5, 1, 2, 30);
    			add_location(hr, file$5, 2, 2, 51);
    			attr_dev(h30, "class", "svelte-lufun");
    			add_location(h30, file$5, 4, 4, 70);
    			add_location(i, file$5, 5, 27, 122);
    			attr_dev(p0, "class", "svelte-lufun");
    			add_location(p0, file$5, 5, 4, 99);
    			add_location(div0, file$5, 3, 2, 60);
    			attr_dev(h31, "class", "svelte-lufun");
    			add_location(h31, file$5, 8, 4, 170);
    			attr_dev(p1, "class", "svelte-lufun");
    			add_location(p1, file$5, 9, 4, 203);
    			add_location(div1, file$5, 7, 2, 160);
    			attr_dev(h32, "class", "svelte-lufun");
    			add_location(h32, file$5, 12, 4, 268);
    			attr_dev(p2, "class", "svelte-lufun");
    			add_location(p2, file$5, 13, 4, 301);
    			add_location(div2, file$5, 11, 2, 258);
    			attr_dev(h33, "class", "svelte-lufun");
    			add_location(h33, file$5, 16, 4, 375);
    			attr_dev(p3, "class", "svelte-lufun");
    			add_location(p3, file$5, 17, 4, 415);
    			add_location(div3, file$5, 15, 2, 365);
    			attr_dev(section, "class", "education");
    			add_location(section, file$5, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, h2);
    			append_dev(section, t1);
    			append_dev(section, hr);
    			append_dev(section, t2);
    			append_dev(section, div0);
    			append_dev(div0, h30);
    			append_dev(div0, t4);
    			append_dev(div0, p0);
    			append_dev(p0, t5);
    			append_dev(p0, i);
    			append_dev(section, t7);
    			append_dev(section, div1);
    			append_dev(div1, h31);
    			append_dev(div1, t9);
    			append_dev(div1, p1);
    			append_dev(section, t11);
    			append_dev(section, div2);
    			append_dev(div2, h32);
    			append_dev(div2, t13);
    			append_dev(div2, p2);
    			append_dev(section, t15);
    			append_dev(section, div3);
    			append_dev(div3, h33);
    			append_dev(div3, t17);
    			append_dev(div3, p3);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Education', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Education> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Education extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Education",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/Intro/index.svelte generated by Svelte v3.46.4 */

    const file$4 = "src/Intro/index.svelte";

    function create_fragment$5(ctx) {
    	let section;
    	let h1;
    	let t1;
    	let div0;
    	let p0;
    	let t3;
    	let p1;
    	let t5;
    	let p2;
    	let t7;
    	let p3;
    	let t9;
    	let div1;
    	let p4;
    	let t10;
    	let a0;
    	let t12;
    	let a1;
    	let t14;
    	let t15;
    	let p5;
    	let t16;
    	let a2;
    	let t18;
    	let t19;
    	let p6;
    	let t21;
    	let div2;
    	let a3;
    	let i0;
    	let t22;
    	let a4;
    	let i1;
    	let t23;
    	let a5;
    	let i2;

    	const block = {
    		c: function create() {
    			section = element("section");
    			h1 = element("h1");
    			h1.textContent = "Minami Funakoshi";
    			t1 = space();
    			div0 = element("div");
    			p0 = element("p");
    			p0.textContent = "they/them";
    			t3 = space();
    			p1 = element("p");
    			p1.textContent = "journalist";
    			t5 = space();
    			p2 = element("p");
    			p2.textContent = "dataviz";
    			t7 = space();
    			p3 = element("p");
    			p3.textContent = "developer";
    			t9 = space();
    			div1 = element("div");
    			p4 = element("p");
    			t10 = text("Minami Funakoshi is a nonbinary graphics journalist at ");
    			a0 = element("a");
    			a0.textContent = "Reuters";
    			t12 = text("\n      based in Austin, Texas. They report, write, code, make data visualisations\n      and develop tools. They have worked as a mentor at Columbia Journalism School’s\n      ");
    			a1 = element("a");
    			a1.textContent = "Lede";
    			t14 = text(" programme.");
    			t15 = space();
    			p5 = element("p");
    			t16 = text("Previously, they were a ");
    			a2 = element("a");
    			a2.textContent = "Reuters Tokyo correspondent";
    			t18 = text(" reporting on Japan’s economy, immigration, politics and the auto industry.\n      They were also a video journalist for Reuters Video News.");
    			t19 = space();
    			p6 = element("p");
    			p6.textContent = "They grew up in Japan, Malaysia, and India and speak Japanese, English,\n      and Mandarin.";
    			t21 = space();
    			div2 = element("div");
    			a3 = element("a");
    			i0 = element("i");
    			t22 = space();
    			a4 = element("a");
    			i1 = element("i");
    			t23 = space();
    			a5 = element("a");
    			i2 = element("i");
    			attr_dev(h1, "class", "svelte-3g78ux");
    			add_location(h1, file$4, 1, 2, 26);
    			attr_dev(p0, "class", "svelte-3g78ux");
    			add_location(p0, file$4, 3, 4, 82);
    			attr_dev(p1, "class", "svelte-3g78ux");
    			add_location(p1, file$4, 4, 4, 103);
    			attr_dev(p2, "class", "svelte-3g78ux");
    			add_location(p2, file$4, 5, 4, 125);
    			attr_dev(p3, "class", "svelte-3g78ux");
    			add_location(p3, file$4, 6, 4, 144);
    			attr_dev(div0, "class", "short-bio svelte-3g78ux");
    			add_location(div0, file$4, 2, 2, 54);
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "href", "https://graphics.reuters.com/");
    			add_location(a0, file$4, 10, 61, 264);
    			attr_dev(a1, "href", "https://ledeprogram.com/");
    			attr_dev(a1, "target", "_blank");
    			add_location(a1, file$4, 16, 6, 528);
    			add_location(p4, file$4, 9, 4, 199);
    			attr_dev(a2, "href", "https://www.reuters.com/journalists/minami-funakoshi");
    			attr_dev(a2, "target", "_blank");
    			add_location(a2, file$4, 19, 30, 647);
    			add_location(p5, file$4, 18, 4, 613);
    			add_location(p6, file$4, 25, 4, 939);
    			attr_dev(div1, "class", "full-bio");
    			add_location(div1, file$4, 8, 2, 172);
    			attr_dev(i0, "class", "fa fa-twitter svelte-3g78ux");
    			add_location(i0, file$4, 33, 7, 1157);
    			attr_dev(a3, "target", "_blank");
    			attr_dev(a3, "href", "https://twitter.com/MinamiFunakoshi");
    			attr_dev(a3, "class", "svelte-3g78ux");
    			add_location(a3, file$4, 32, 4, 1088);
    			attr_dev(i1, "class", "fa fa-envelope svelte-3g78ux");
    			add_location(i1, file$4, 36, 7, 1268);
    			attr_dev(a4, "target", "_blank");
    			attr_dev(a4, "href", "mailto: minami.funakoshi@gmail.com");
    			attr_dev(a4, "class", "svelte-3g78ux");
    			add_location(a4, file$4, 35, 4, 1200);
    			attr_dev(i2, "class", "fa fa-linkedin svelte-3g78ux");
    			add_location(i2, file$4, 39, 7, 1385);
    			attr_dev(a5, "target", "_blank");
    			attr_dev(a5, "href", "https://www.linkedin.com/in/mfunakoshi/");
    			attr_dev(a5, "class", "svelte-3g78ux");
    			add_location(a5, file$4, 38, 4, 1312);
    			attr_dev(div2, "class", "contact svelte-3g78ux");
    			add_location(div2, file$4, 31, 2, 1062);
    			attr_dev(section, "class", "intro svelte-3g78ux");
    			add_location(section, file$4, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, h1);
    			append_dev(section, t1);
    			append_dev(section, div0);
    			append_dev(div0, p0);
    			append_dev(div0, t3);
    			append_dev(div0, p1);
    			append_dev(div0, t5);
    			append_dev(div0, p2);
    			append_dev(div0, t7);
    			append_dev(div0, p3);
    			append_dev(section, t9);
    			append_dev(section, div1);
    			append_dev(div1, p4);
    			append_dev(p4, t10);
    			append_dev(p4, a0);
    			append_dev(p4, t12);
    			append_dev(p4, a1);
    			append_dev(p4, t14);
    			append_dev(div1, t15);
    			append_dev(div1, p5);
    			append_dev(p5, t16);
    			append_dev(p5, a2);
    			append_dev(p5, t18);
    			append_dev(div1, t19);
    			append_dev(div1, p6);
    			append_dev(section, t21);
    			append_dev(section, div2);
    			append_dev(div2, a3);
    			append_dev(a3, i0);
    			append_dev(div2, t22);
    			append_dev(div2, a4);
    			append_dev(a4, i1);
    			append_dev(div2, t23);
    			append_dev(div2, a5);
    			append_dev(a5, i2);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Intro', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Intro> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Intro extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Intro",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    var awards = [
    	{
    		award: "Bronze medal",
    		org: "Malofiej29",
    		year: 2021,
    		description: "Innovation format"
    	},
    	{
    		award: "Bronze medal",
    		org: "Malofiej29",
    		year: 2021,
    		description: "Reuters portfolios"
    	},
    	{
    		award: "Silver medal",
    		org: "Society for News Design (SND)",
    		year: 2021,
    		description: "Portfolio: Art Direction"
    	},
    	{
    		award: "Silver medal",
    		org: "SND",
    		year: 2021,
    		description: "Coronavirus coverage"
    	},
    	{
    		award: "Award of excellence",
    		org: "SND",
    		year: 2021,
    		description: "Line of Coverage: U.S. Presidential Election"
    	},
    	{
    		award: "Award of excellence",
    		org: "SND",
    		year: 2021,
    		description: "Coronavirus coverage: Use of original/commissioned illustrations"
    	},
    	{
    		award: "Award of excellence",
    		org: "SND",
    		year: 2021,
    		description: "Story page design : Health/coronavirus"
    	},
    	{
    		award: "Award of excellence",
    		org: "SND",
    		year: 2021,
    		description: "Use of animation"
    	},
    	{
    		award: "Honourable mention",
    		org: "Society of Publishers in Asia (SOPA)",
    		year: 2017,
    		description: "Japan's abuse of asylum seekers",
    		link: "https: //2017.sopawards.com/wp-content/uploads/2017/03/Japans-abuse-of-asylum-seekers.pdf"
    	},
    	{
    		award: "Finalist for business reporting",
    		org: "SOPA",
    		year: 2017,
    		description: "BOJ loses its mojo",
    		link: "https: //2017.sopawards.com/wp-content/uploads/2017/03/BOJ-loses-its-mojo.pdf"
    	},
    	{
    		award: "Elmore A. Willetts Prize for Fiction",
    		org: "Yale University",
    		year: 2015,
    		description: "A love story",
    		link: "https://yaledailynews.com/blog/2015/04/23/a-love-story"
    	}
    ];

    /* src/Awards/index.svelte generated by Svelte v3.46.4 */
    const file$3 = "src/Awards/index.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i];
    	return child_ctx;
    }

    // (17:6) {:else}
    function create_else_block(ctx) {
    	let p;
    	let t_value = /*award*/ ctx[0].description + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			attr_dev(p, "class", "description svelte-1fnh816");
    			add_location(p, file$3, 17, 8, 444);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(17:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (13:6) {#if award.link}
    function create_if_block$1(ctx) {
    	let p;
    	let a;
    	let t_value = /*award*/ ctx[0].description + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			a = element("a");
    			t = text(t_value);
    			attr_dev(a, "href", /*award*/ ctx[0].link);
    			attr_dev(a, "target", "_blank");
    			add_location(a, file$3, 14, 10, 346);
    			attr_dev(p, "class", "description svelte-1fnh816");
    			add_location(p, file$3, 13, 8, 312);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, a);
    			append_dev(a, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(13:6) {#if award.link}",
    		ctx
    	});

    	return block;
    }

    // (8:2) {#each awards as award}
    function create_each_block$2(ctx) {
    	let div;
    	let p0;
    	let t0_value = /*award*/ ctx[0].award + "";
    	let t0;
    	let t1;
    	let p1;
    	let t2_value = /*award*/ ctx[0].org + "";
    	let t2;
    	let t3;
    	let p2;
    	let t4_value = /*award*/ ctx[0].year + "";
    	let t4;
    	let t5;
    	let t6;

    	function select_block_type(ctx, dirty) {
    		if (/*award*/ ctx[0].link) return create_if_block$1;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			p0 = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			p1 = element("p");
    			t2 = text(t2_value);
    			t3 = space();
    			p2 = element("p");
    			t4 = text(t4_value);
    			t5 = space();
    			if_block.c();
    			t6 = space();
    			attr_dev(p0, "class", "award svelte-1fnh816");
    			add_location(p0, file$3, 9, 6, 170);
    			attr_dev(p1, "class", "org svelte-1fnh816");
    			add_location(p1, file$3, 10, 6, 211);
    			attr_dev(p2, "class", "year svelte-1fnh816");
    			add_location(p2, file$3, 11, 6, 248);
    			attr_dev(div, "class", "container svelte-1fnh816");
    			add_location(div, file$3, 8, 4, 140);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p0);
    			append_dev(p0, t0);
    			append_dev(div, t1);
    			append_dev(div, p1);
    			append_dev(p1, t2);
    			append_dev(div, t3);
    			append_dev(div, p2);
    			append_dev(p2, t4);
    			append_dev(div, t5);
    			if_block.m(div, null);
    			append_dev(div, t6);
    		},
    		p: function update(ctx, dirty) {
    			if_block.p(ctx, dirty);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(8:2) {#each awards as award}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let section;
    	let h2;
    	let t1;
    	let hr;
    	let t2;
    	let each_value = awards;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			section = element("section");
    			h2 = element("h2");
    			h2.textContent = "Awards";
    			t1 = space();
    			hr = element("hr");
    			t2 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h2, file$3, 5, 2, 85);
    			add_location(hr, file$3, 6, 2, 103);
    			attr_dev(section, "class", "awards");
    			add_location(section, file$3, 4, 0, 58);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, h2);
    			append_dev(section, t1);
    			append_dev(section, hr);
    			append_dev(section, t2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(section, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*awards*/ 0) {
    				each_value = awards;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(section, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Awards', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Awards> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ awards });
    	return [];
    }

    class Awards extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Awards",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/Projects/Grid.svelte generated by Svelte v3.46.4 */

    const file$2 = "src/Projects/Grid.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i].headline;
    	child_ctx[3] = list[i].dek;
    	child_ctx[4] = list[i].link;
    	child_ctx[5] = list[i].imgSrc;
    	child_ctx[6] = list[i].videoSrc;
    	child_ctx[7] = list[i].posterSrc;
    	child_ctx[2] = list[i].headline;
    	child_ctx[4] = list[i].link;
    	child_ctx[9] = i;
    	return child_ctx;
    }

    // (29:29) 
    function create_if_block_1(ctx) {
    	let video;
    	let source;
    	let source_src_value;
    	let t;
    	let video_poster_value;

    	const block = {
    		c: function create() {
    			video = element("video");
    			source = element("source");
    			t = text("\n              Video is not supported in your browser.");
    			if (!src_url_equal(source.src, source_src_value = "" + (baseSrc + "/" + /*projectType*/ ctx[1] + "/" + /*videoSrc*/ ctx[6]))) attr_dev(source, "src", source_src_value);
    			add_location(source, file$2, 36, 14, 931);
    			video.muted = true;
    			video.autoplay = true;
    			video.playsInline = true;
    			video.loop = true;
    			attr_dev(video, "poster", video_poster_value = "" + (baseSrc + "/" + /*projectType*/ ctx[1] + "/" + /*posterSrc*/ ctx[7]));
    			attr_dev(video, "class", "svelte-azzwtc");
    			add_location(video, file$2, 29, 12, 749);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, video, anchor);
    			append_dev(video, source);
    			append_dev(video, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*projectType, projects*/ 3 && !src_url_equal(source.src, source_src_value = "" + (baseSrc + "/" + /*projectType*/ ctx[1] + "/" + /*videoSrc*/ ctx[6]))) {
    				attr_dev(source, "src", source_src_value);
    			}

    			if (dirty & /*projectType, projects*/ 3 && video_poster_value !== (video_poster_value = "" + (baseSrc + "/" + /*projectType*/ ctx[1] + "/" + /*posterSrc*/ ctx[7]))) {
    				attr_dev(video, "poster", video_poster_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(video);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(29:29) ",
    		ctx
    	});

    	return block;
    }

    // (23:10) {#if imgSrc}
    function create_if_block(ctx) {
    	let img;
    	let img_src_value;
    	let img_alt_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "" + (baseSrc + "/" + /*projectType*/ ctx[1] + "/" + /*imgSrc*/ ctx[5]))) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "aria-hidden", "true");
    			attr_dev(img, "alt", img_alt_value = /*headline*/ ctx[2]);
    			attr_dev(img, "class", "svelte-azzwtc");
    			add_location(img, file$2, 23, 12, 570);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*projectType, projects*/ 3 && !src_url_equal(img.src, img_src_value = "" + (baseSrc + "/" + /*projectType*/ ctx[1] + "/" + /*imgSrc*/ ctx[5]))) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*projects*/ 1 && img_alt_value !== (img_alt_value = /*headline*/ ctx[2])) {
    				attr_dev(img, "alt", img_alt_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(23:10) {#if imgSrc}",
    		ctx
    	});

    	return block;
    }

    // (20:4) {#each projects as { headline, dek, link, imgSrc, videoSrc, posterSrc, headline, link }
    function create_each_block$1(ctx) {
    	let div;
    	let a;
    	let t0;
    	let h3;
    	let t1_value = /*headline*/ ctx[2] + "";
    	let t1;
    	let t2;
    	let p;
    	let t3_value = /*dek*/ ctx[3] + "";
    	let t3;
    	let a_href_value;
    	let t4;

    	function select_block_type(ctx, dirty) {
    		if (/*imgSrc*/ ctx[5]) return create_if_block;
    		if (/*videoSrc*/ ctx[6]) return create_if_block_1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type && current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			a = element("a");
    			if (if_block) if_block.c();
    			t0 = space();
    			h3 = element("h3");
    			t1 = text(t1_value);
    			t2 = space();
    			p = element("p");
    			t3 = text(t3_value);
    			t4 = space();
    			attr_dev(h3, "class", "svelte-azzwtc");
    			add_location(h3, file$2, 40, 10, 1084);
    			attr_dev(p, "class", "svelte-azzwtc");
    			add_location(p, file$2, 41, 10, 1114);
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "href", a_href_value = /*link*/ ctx[4]);
    			attr_dev(a, "class", "svelte-azzwtc");
    			add_location(a, file$2, 21, 8, 501);
    			attr_dev(div, "class", "project col-4 svelte-azzwtc");
    			add_location(div, file$2, 20, 6, 465);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, a);
    			if (if_block) if_block.m(a, null);
    			append_dev(a, t0);
    			append_dev(a, h3);
    			append_dev(h3, t1);
    			append_dev(a, t2);
    			append_dev(a, p);
    			append_dev(p, t3);
    			append_dev(div, t4);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if (if_block) if_block.d(1);
    				if_block = current_block_type && current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(a, t0);
    				}
    			}

    			if (dirty & /*projects*/ 1 && t1_value !== (t1_value = /*headline*/ ctx[2] + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*projects*/ 1 && t3_value !== (t3_value = /*dek*/ ctx[3] + "")) set_data_dev(t3, t3_value);

    			if (dirty & /*projects*/ 1 && a_href_value !== (a_href_value = /*link*/ ctx[4])) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);

    			if (if_block) {
    				if_block.d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(20:4) {#each projects as { headline, dek, link, imgSrc, videoSrc, posterSrc, headline, link }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div1;
    	let div0;
    	let each_value = /*projects*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "row");
    			add_location(div0, file$2, 18, 2, 345);
    			attr_dev(div1, "class", "container");
    			add_location(div1, file$2, 17, 0, 319);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*projects, baseSrc, projectType*/ 3) {
    				each_value = /*projects*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const baseSrc = './statics/share-cards';

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Grid', slots, []);
    	let { projects } = $$props;
    	let { projectType } = $$props;
    	const writable_props = ['projects', 'projectType'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Grid> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('projects' in $$props) $$invalidate(0, projects = $$props.projects);
    		if ('projectType' in $$props) $$invalidate(1, projectType = $$props.projectType);
    	};

    	$$self.$capture_state = () => ({ projects, projectType, baseSrc });

    	$$self.$inject_state = $$props => {
    		if ('projects' in $$props) $$invalidate(0, projects = $$props.projects);
    		if ('projectType' in $$props) $$invalidate(1, projectType = $$props.projectType);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [projects, projectType];
    }

    class Grid extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { projects: 0, projectType: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Grid",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*projects*/ ctx[0] === undefined && !('projects' in props)) {
    			console.warn("<Grid> was created without expected prop 'projects'");
    		}

    		if (/*projectType*/ ctx[1] === undefined && !('projectType' in props)) {
    			console.warn("<Grid> was created without expected prop 'projectType'");
    		}
    	}

    	get projects() {
    		throw new Error("<Grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set projects(value) {
    		throw new Error("<Grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get projectType() {
    		throw new Error("<Grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set projectType(value) {
    		throw new Error("<Grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var projects = [
    	[
    		{
    			type: "graphics",
    			projects: [
    				{
    					headline: "Gender and language",
    					dek: "The movement to recognize a spectrum of genders is changing languages around the world.",
    					videoSrc: "gender-cropped3.mp4",
    					posterSrc: "gender-poster.png",
    					link: "https://graphics.reuters.com/GENDER-LANGUAGE/LGBT/mopanqoelva/index.html"
    				},
    				{
    					headline: "Vaccine bootcamp",
    					dek: "DEK 2",
    					imgSrc: "vax-bootcamp.png",
    					link: "https://graphics.reuters.com/HEALTH-CORONAVIRUS/VACCINE/yzdpxqxnwvx/index.html"
    				},
    				{
    					headline: "Clippings from the longest year",
    					dek: "DEK 3",
    					imgSrc: "clippings.png",
    					link: "https://graphics.reuters.com/HEALTH-CORONAVIRUS/SCRAPBOOK/gjnpwklkopw/index.html"
    				},
    				{
    					headline: "Hot and humid Olympic summer",
    					dek: "DEK 3",
    					imgSrc: "olympics.png",
    					link: "https://graphics.reuters.com/OLYMPICS-2020/SUMMER-HEAT/bdwvkogrzvm/index.html"
    				},
    				{
    					headline: "Myanmar’s internet suppression",
    					dek: "DEK 3",
    					imgSrc: "myanmar.png",
    					link: "https://graphics.reuters.com/MYANMAR-POLITICS/INTERNET-RESTRICTION/rlgpdbreepo/index.html"
    				},
    				{
    					headline: "Speed and trust",
    					dek: "DEK 3",
    					imgSrc: "speed-trust.png",
    					link: "https://graphics.reuters.com/HEALTH-CORONAVIRUS/VACCINE-ROLLOUT/rlgvdegqqpo/index.html"
    				}
    			]
    		}
    	],
    	[
    		{
    			type: "investigative",
    			projects: [
    				{
    					headline: "INVESTIGATIVE 1",
    					dek: "DEK 1",
    					imgSrc: "",
    					link: "link 1"
    				},
    				{
    					headline: "INVESTIGATIVE 2",
    					dek: "DEK 2",
    					imgSrc: "",
    					link: "link 2"
    				},
    				{
    					headline: "INVESTIGATIVE 3",
    					dek: "DEK 3",
    					imgSrc: "",
    					link: "link 3"
    				}
    			]
    		}
    	],
    	[
    		{
    			type: "video",
    			projects: [
    				{
    					headline: "VIDEO 1",
    					dek: "DEK 1",
    					imgSrc: "",
    					link: "link 1"
    				},
    				{
    					headline: "VIDEO 2",
    					dek: "DEK 2",
    					imgSrc: "",
    					link: "link 2"
    				},
    				{
    					headline: "VIDEO 3",
    					dek: "DEK 3",
    					imgSrc: "",
    					link: "link 3"
    				}
    			]
    		}
    	]
    ];

    /* src/Projects/index.svelte generated by Svelte v3.46.4 */
    const file$1 = "src/Projects/index.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[0] = list[i];
    	return child_ctx;
    }

    // (9:2) {#each projects as projectType}
    function create_each_block(ctx) {
    	let div;
    	let h3;
    	let t0_value = /*projectType*/ ctx[0][0].type + "";
    	let t0;
    	let t1;
    	let grid;
    	let t2;
    	let current;

    	grid = new Grid({
    			props: {
    				projects: /*projectType*/ ctx[0][0].projects,
    				projectType: /*projectType*/ ctx[0][0].type
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			h3 = element("h3");
    			t0 = text(t0_value);
    			t1 = space();
    			create_component(grid.$$.fragment);
    			t2 = space();
    			attr_dev(h3, "class", "svelte-lql2o2");
    			add_location(h3, file$1, 10, 6, 243);
    			attr_dev(div, "class", "" + (null_to_empty(/*projectType*/ ctx[0][0].type) + " svelte-lql2o2"));
    			add_location(div, file$1, 9, 4, 201);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h3);
    			append_dev(h3, t0);
    			append_dev(div, t1);
    			mount_component(grid, div, null);
    			append_dev(div, t2);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(grid.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(grid.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(grid);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(9:2) {#each projects as projectType}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let section;
    	let h2;
    	let t1;
    	let hr;
    	let t2;
    	let current;
    	let each_value = projects;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			section = element("section");
    			h2 = element("h2");
    			h2.textContent = "Selected projects";
    			t1 = space();
    			hr = element("hr");
    			t2 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h2, file$1, 6, 2, 127);
    			add_location(hr, file$1, 7, 2, 156);
    			attr_dev(section, "class", "projects svelte-lql2o2");
    			add_location(section, file$1, 5, 0, 98);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, h2);
    			append_dev(section, t1);
    			append_dev(section, hr);
    			append_dev(section, t2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(section, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*projects*/ 0) {
    				each_value = projects;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(section, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Projects', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Projects> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Grid, projects });
    	return [];
    }

    class Projects extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Projects",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/Footer/index.svelte generated by Svelte v3.46.4 */

    const file = "src/Footer/index.svelte";

    function create_fragment$1(ctx) {
    	let section;
    	let p;

    	const block = {
    		c: function create() {
    			section = element("section");
    			p = element("p");
    			p.textContent = "Updated Feb. 2022";
    			attr_dev(p, "class", "svelte-k70e6m");
    			add_location(p, file, 1, 2, 27);
    			attr_dev(section, "class", "footer svelte-k70e6m");
    			add_location(section, file, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, p);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/Page.svelte generated by Svelte v3.46.4 */

    function create_fragment(ctx) {
    	let intro;
    	let t0;
    	let projects;
    	let t1;
    	let awards;
    	let t2;
    	let education;
    	let t3;
    	let footer;
    	let current;
    	intro = new Intro({ $$inline: true });
    	projects = new Projects({ $$inline: true });
    	awards = new Awards({ $$inline: true });
    	education = new Education({ $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(intro.$$.fragment);
    			t0 = space();
    			create_component(projects.$$.fragment);
    			t1 = space();
    			create_component(awards.$$.fragment);
    			t2 = space();
    			create_component(education.$$.fragment);
    			t3 = space();
    			create_component(footer.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(intro, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(projects, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(awards, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(education, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro$1(local) {
    			if (current) return;
    			transition_in(intro.$$.fragment, local);
    			transition_in(projects.$$.fragment, local);
    			transition_in(awards.$$.fragment, local);
    			transition_in(education.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(intro.$$.fragment, local);
    			transition_out(projects.$$.fragment, local);
    			transition_out(awards.$$.fragment, local);
    			transition_out(education.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(intro, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(projects, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(awards, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(education, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Page', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Page> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Education,
    		Intro,
    		Awards,
    		Projects,
    		Footer
    	});

    	return [];
    }

    class Page extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Page",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new Page({
    	target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
