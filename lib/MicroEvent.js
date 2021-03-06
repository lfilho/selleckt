// Full MicroEvents library @ 54e85c036c3f903b963a0e4a671f72c1089ae4d4
// (added some missing semi-colons etc, that's it)
/**
 * MicroEvent - to make any js object an event emitter (server or browser)
 *
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
 *
 * - create a MicroEventDebug with goodies to debug
 *   - make it safer to use
*/
'use strict';

var MicroEvent = function(){};
MicroEvent.prototype = {
    on: function(event, fct){
        this._events = this._events || {};
        this._events[event] = this._events[event] || [];
        this._events[event].push(fct);
    },
    bind: function() {
        console.warn('SELLECKT: .bind() is deprecated. Use .on() instead.');
        this.on.apply(this, arguments);
    },
    off: function(event, fct){
        this._events = this._events || {};
        if (event in this._events === false) {
            return;
        }
        this._events[event].splice(this._events[event].indexOf(fct), 1);
    },
    unbind: function() {
        console.warn('SELLECKT: .unbind() is deprecated. Use .off() instead.');
        this.off.apply(this, arguments);
    },
    trigger: function(event /* , args... */){
        this._events = this._events || {};
        if (event in this._events === false) {
            return;
        }
        for (var i = 0; i < this._events[event].length; i++) {
            this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
};

/**
 * mixin will delegate all MicroEvent.js function in the destination object
 *
 * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
 *
 * @param {Object} the object which will support MicroEvent
*/
MicroEvent.mixin = function(destObject){
    var props = ['bind', 'on', 'unbind', 'off', 'trigger'];
    for (var i = 0; i < props.length; i++) {
        destObject.prototype[props[i]] = MicroEvent.prototype[props[i]];
    }
};

module.exports = MicroEvent;
