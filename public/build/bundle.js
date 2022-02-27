
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

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
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

    const file$4 = "src/Education/index.svelte";

    function create_fragment$6(ctx) {
    	let section;
    	let h2;

    	const block = {
    		c: function create() {
    			section = element("section");
    			h2 = element("h2");
    			h2.textContent = "education";
    			add_location(h2, file$4, 3, 2, 31);
    			add_location(section, file$4, 2, 0, 19);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, h2);
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

    const file$3 = "src/Intro/index.svelte";

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
    	let t13;
    	let p5;
    	let t14;
    	let a1;
    	let t16;
    	let t17;
    	let p6;
    	let t19;
    	let div2;
    	let a2;
    	let i0;
    	let t20;
    	let a3;
    	let i1;
    	let t21;
    	let a4;
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
    			t12 = text(" based in Austin, Texas. They report, write, code, make data visualisations\n      and develop tools.");
    			t13 = space();
    			p5 = element("p");
    			t14 = text("Previously, they were a ");
    			a1 = element("a");
    			a1.textContent = "Reuters Tokyo correspondent";
    			t16 = text(" reporting on Japan’s economy, immigration, politics and the auto industry.\n      They were also a video journalist for Reuters Video News.");
    			t17 = space();
    			p6 = element("p");
    			p6.textContent = "They grew up in Japan, Malaysia, and India and speak Japanese, English,\n      and Mandarin.";
    			t19 = space();
    			div2 = element("div");
    			a2 = element("a");
    			i0 = element("i");
    			t20 = space();
    			a3 = element("a");
    			i1 = element("i");
    			t21 = space();
    			a4 = element("a");
    			i2 = element("i");
    			attr_dev(h1, "class", "svelte-1akiws3");
    			add_location(h1, file$3, 1, 2, 26);
    			attr_dev(p0, "class", "svelte-1akiws3");
    			add_location(p0, file$3, 3, 4, 82);
    			attr_dev(p1, "class", "svelte-1akiws3");
    			add_location(p1, file$3, 4, 4, 103);
    			attr_dev(p2, "class", "svelte-1akiws3");
    			add_location(p2, file$3, 5, 4, 125);
    			attr_dev(p3, "class", "svelte-1akiws3");
    			add_location(p3, file$3, 6, 4, 144);
    			attr_dev(div0, "class", "short-bio svelte-1akiws3");
    			add_location(div0, file$3, 2, 2, 54);
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "href", "https://graphics.reuters.com/");
    			attr_dev(a0, "class", "svelte-1akiws3");
    			add_location(a0, file$3, 10, 61, 264);
    			attr_dev(p4, "class", "svelte-1akiws3");
    			add_location(p4, file$3, 9, 4, 199);
    			attr_dev(a1, "href", "https://www.reuters.com/journalists/minami-funakoshi");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "class", "svelte-1akiws3");
    			add_location(a1, file$3, 17, 30, 502);
    			attr_dev(p5, "class", "svelte-1akiws3");
    			add_location(p5, file$3, 16, 4, 468);
    			attr_dev(p6, "class", "svelte-1akiws3");
    			add_location(p6, file$3, 23, 4, 794);
    			attr_dev(div1, "class", "full-bio svelte-1akiws3");
    			add_location(div1, file$3, 8, 2, 172);
    			attr_dev(i0, "class", "fa fa-twitter svelte-1akiws3");
    			add_location(i0, file$3, 31, 7, 1012);
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "href", "https://twitter.com/MinamiFunakoshi");
    			attr_dev(a2, "class", "svelte-1akiws3");
    			add_location(a2, file$3, 30, 4, 943);
    			attr_dev(i1, "class", "fa fa-envelope svelte-1akiws3");
    			add_location(i1, file$3, 34, 7, 1123);
    			attr_dev(a3, "target", "_blank");
    			attr_dev(a3, "href", "mailto: minami.funakoshi@gmail.com");
    			attr_dev(a3, "class", "svelte-1akiws3");
    			add_location(a3, file$3, 33, 4, 1055);
    			attr_dev(i2, "class", "fa fa-linkedin svelte-1akiws3");
    			add_location(i2, file$3, 37, 7, 1240);
    			attr_dev(a4, "target", "_blank");
    			attr_dev(a4, "href", "https://www.linkedin.com/in/mfunakoshi/");
    			attr_dev(a4, "class", "svelte-1akiws3");
    			add_location(a4, file$3, 36, 4, 1167);
    			attr_dev(div2, "class", "contact svelte-1akiws3");
    			add_location(div2, file$3, 29, 2, 917);
    			attr_dev(section, "class", "intro svelte-1akiws3");
    			add_location(section, file$3, 0, 0, 0);
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
    			append_dev(div1, t13);
    			append_dev(div1, p5);
    			append_dev(p5, t14);
    			append_dev(p5, a1);
    			append_dev(p5, t16);
    			append_dev(div1, t17);
    			append_dev(div1, p6);
    			append_dev(section, t19);
    			append_dev(section, div2);
    			append_dev(div2, a2);
    			append_dev(a2, i0);
    			append_dev(div2, t20);
    			append_dev(div2, a3);
    			append_dev(a3, i1);
    			append_dev(div2, t21);
    			append_dev(div2, a4);
    			append_dev(a4, i2);
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

    /* src/Awards/index.svelte generated by Svelte v3.46.4 */

    function create_fragment$4(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
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

    function instance$4($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Awards', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Awards> was created with unknown prop '${key}'`);
    	});

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

    const { console: console_1 } = globals;
    const file$2 = "src/Projects/Grid.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i].headline;
    	child_ctx[2] = list[i].dek;
    	child_ctx[3] = list[i].link;
    	child_ctx[5] = i;
    	return child_ctx;
    }

    // (7:2) {#each projects as { headline, dek, link }
    function create_each_block(ctx) {
    	let div;
    	let h4;
    	let t0_value = /*headline*/ ctx[1] + "";
    	let t0;
    	let t1;
    	let img;
    	let img_src_value;
    	let t2;
    	let p0;
    	let t3_value = /*dek*/ ctx[2] + "";
    	let t3;
    	let t4;
    	let p1;
    	let t5_value = /*link*/ ctx[3] + "";
    	let t5;
    	let t6;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h4 = element("h4");
    			t0 = text(t0_value);
    			t1 = space();
    			img = element("img");
    			t2 = space();
    			p0 = element("p");
    			t3 = text(t3_value);
    			t4 = space();
    			p1 = element("p");
    			t5 = text(t5_value);
    			t6 = space();
    			add_location(h4, file$2, 8, 6, 221);
    			if (!src_url_equal(img.src, img_src_value = "")) attr_dev(img, "src", img_src_value);
    			add_location(img, file$2, 9, 6, 247);
    			attr_dev(p0, "class", "dek");
    			add_location(p0, file$2, 10, 6, 268);
    			add_location(p1, file$2, 11, 6, 299);
    			attr_dev(div, "class", "item " + ((/*i*/ ctx[5] + 1) % 3 === 0 ? 'last' : '') + " svelte-dga966");
    			add_location(div, file$2, 7, 4, 162);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h4);
    			append_dev(h4, t0);
    			append_dev(div, t1);
    			append_dev(div, img);
    			append_dev(div, t2);
    			append_dev(div, p0);
    			append_dev(p0, t3);
    			append_dev(div, t4);
    			append_dev(div, p1);
    			append_dev(p1, t5);
    			append_dev(div, t6);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*projects*/ 1 && t0_value !== (t0_value = /*headline*/ ctx[1] + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*projects*/ 1 && t3_value !== (t3_value = /*dek*/ ctx[2] + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*projects*/ 1 && t5_value !== (t5_value = /*link*/ ctx[3] + "")) set_data_dev(t5, t5_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(7:2) {#each projects as { headline, dek, link }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div;
    	let each_value = /*projects*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "grid-container svelte-dga966");
    			add_location(div, file$2, 5, 0, 80);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*projects*/ 1) {
    				each_value = /*projects*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
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
    			if (detaching) detach_dev(div);
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

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Grid', slots, []);
    	let { projects } = $$props;
    	console.log('projects', projects);
    	const writable_props = ['projects'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<Grid> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('projects' in $$props) $$invalidate(0, projects = $$props.projects);
    	};

    	$$self.$capture_state = () => ({ projects });

    	$$self.$inject_state = $$props => {
    		if ('projects' in $$props) $$invalidate(0, projects = $$props.projects);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [projects];
    }

    class Grid extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { projects: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Grid",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*projects*/ ctx[0] === undefined && !('projects' in props)) {
    			console_1.warn("<Grid> was created without expected prop 'projects'");
    		}
    	}

    	get projects() {
    		throw new Error("<Grid>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set projects(value) {
    		throw new Error("<Grid>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const graphics = [
        {
            'headline': 'HEADLINE 1',
            'dek': 'DEK 1',
            'link': 'link 1'
        },
        {
            'headline': 'HEADLINE 1',
            'dek': 'DEK 1',
            'link': 'link 1'
        },
        {
            'headline': 'HEADLINE 3',
            'dek': 'DEK 3',
            'link': 'link 3'
        },
    ];

    /* src/Projects/index.svelte generated by Svelte v3.46.4 */
    const file$1 = "src/Projects/index.svelte";

    function create_fragment$2(ctx) {
    	let section;
    	let h2;
    	let t1;
    	let hr;
    	let t2;
    	let div0;
    	let h30;
    	let t4;
    	let grid0;
    	let t5;
    	let p0;
    	let t7;
    	let div1;
    	let h31;
    	let t9;
    	let grid1;
    	let t10;
    	let p1;
    	let t12;
    	let div2;
    	let h32;
    	let t14;
    	let grid2;
    	let t15;
    	let p2;
    	let current;

    	grid0 = new Grid({
    			props: { projects: graphics },
    			$$inline: true
    		});

    	grid1 = new Grid({
    			props: { projects: graphics },
    			$$inline: true
    		});

    	grid2 = new Grid({
    			props: { projects: graphics },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			section = element("section");
    			h2 = element("h2");
    			h2.textContent = "Projects";
    			t1 = space();
    			hr = element("hr");
    			t2 = space();
    			div0 = element("div");
    			h30 = element("h3");
    			h30.textContent = "Graphics";
    			t4 = space();
    			create_component(grid0.$$.fragment);
    			t5 = space();
    			p0 = element("p");
    			p0.textContent = "Some description on awards?";
    			t7 = space();
    			div1 = element("div");
    			h31 = element("h3");
    			h31.textContent = "Investigative";
    			t9 = space();
    			create_component(grid1.$$.fragment);
    			t10 = space();
    			p1 = element("p");
    			p1.textContent = "Some description on awards?";
    			t12 = space();
    			div2 = element("div");
    			h32 = element("h3");
    			h32.textContent = "Video news";
    			t14 = space();
    			create_component(grid2.$$.fragment);
    			t15 = space();
    			p2 = element("p");
    			p2.textContent = "Some description on awards?";
    			add_location(h2, file$1, 6, 2, 129);
    			add_location(hr, file$1, 7, 2, 149);
    			attr_dev(h30, "class", "svelte-bu2lhu");
    			add_location(h30, file$1, 9, 4, 185);
    			add_location(p0, file$1, 11, 4, 242);
    			attr_dev(div0, "class", "graphics svelte-bu2lhu");
    			add_location(div0, file$1, 8, 2, 158);
    			attr_dev(h31, "class", "svelte-bu2lhu");
    			add_location(h31, file$1, 14, 4, 320);
    			add_location(p1, file$1, 16, 4, 382);
    			attr_dev(div1, "class", "investigative svelte-bu2lhu");
    			add_location(div1, file$1, 13, 2, 288);
    			attr_dev(h32, "class", "svelte-bu2lhu");
    			add_location(h32, file$1, 19, 4, 452);
    			add_location(p2, file$1, 21, 4, 511);
    			attr_dev(div2, "class", "video svelte-bu2lhu");
    			add_location(div2, file$1, 18, 2, 428);
    			attr_dev(section, "class", "projects svelte-bu2lhu");
    			add_location(section, file$1, 5, 0, 100);
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
    			mount_component(grid0, div0, null);
    			append_dev(div0, t5);
    			append_dev(div0, p0);
    			append_dev(section, t7);
    			append_dev(section, div1);
    			append_dev(div1, h31);
    			append_dev(div1, t9);
    			mount_component(grid1, div1, null);
    			append_dev(div1, t10);
    			append_dev(div1, p1);
    			append_dev(section, t12);
    			append_dev(section, div2);
    			append_dev(div2, h32);
    			append_dev(div2, t14);
    			mount_component(grid2, div2, null);
    			append_dev(div2, t15);
    			append_dev(div2, p2);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(grid0.$$.fragment, local);
    			transition_in(grid1.$$.fragment, local);
    			transition_in(grid2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(grid0.$$.fragment, local);
    			transition_out(grid1.$$.fragment, local);
    			transition_out(grid2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			destroy_component(grid0);
    			destroy_component(grid1);
    			destroy_component(grid2);
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

    	$$self.$capture_state = () => ({ Grid, graphics });
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
    			attr_dev(p, "class", "svelte-ry28qo");
    			add_location(p, file, 3, 2, 31);
    			attr_dev(section, "class", "svelte-ry28qo");
    			add_location(section, file, 2, 0, 19);
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
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
