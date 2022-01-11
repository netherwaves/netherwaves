import Vue from "vue";
import LocomotiveScroll from "@/plugins/LocomotiveScroll/plugin/index.js";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from 'gsap/SplitText';

Vue.use(LocomotiveScroll);
gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(SplitText);

export default ({ app }, inject) => {
    inject("initScrolltrigger", (refs) => {
        if (window.locomotive) return;

        window.locomotive = refs;
        window.locomotive.on("scroll", ScrollTrigger.update);
        ScrollTrigger.scrollerProxy(window.locomotive.el, {
            scrollTop(value) {
                return arguments.length
                    ? window.locomotive.scrollTo(value, 0, 0)
                    : window.locomotive.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
        });
    });
};
