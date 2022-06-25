import { gsap, Quad, Quint, Expo} from 'gsap'

/** 
* Revealer classes and animation adpated from Codrops example at https://tympanus.net/codrops/2019/04/18/how-to-create-and-animate-rotated-overlays/ | Licensed under the MIT license.  http://www.opensource.org/licenses/mit-license.php  | Copyright 2019, Codrops  http://www.codrops.com
*/

export class Revealer {
    constructor(el, options) {
        this.options = { angle: 0 };
        Object.assign(this.options, options);

        this.DOM = {};
        this.DOM.el = el;
        this.DOM.inner = this.DOM.el.firstElementChild;
        
        this.DOM.inner.style.width = `calc(100vw * ${Math.abs(Math.cos(this.options.angle * Math.PI/180))} + 102.5vh * ${Math.abs(Math.sin(this.options.angle * Math.PI/180))})`;
        this.DOM.inner.style.height = `calc(100vw * ${Math.abs(Math.sin(this.options.angle * Math.PI/180))} + 102.5vh * ${Math.abs(Math.cos(this.options.angle * Math.PI/180))})`;
        this.DOM.el.style.transform = `rotate3d(0,0,1,${this.options.angle}deg)`;

        this.DOM.reverse = this.DOM.inner.querySelector('.content__reverse');
        if ( this.DOM.reverse ) {
            gsap.set(this.DOM.reverse, {rotation: -1 * this.options.angle});
        }
    }
}

