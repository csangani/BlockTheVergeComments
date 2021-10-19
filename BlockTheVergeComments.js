// ==UserScript==
// @name         Block authors on The Verge comments
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Block people on The Verge comments. This script will hide entire threads.
// @author       Chirag Sangani
// @match        https://www.theverge.com/*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var blocked_users = ['brianericford']

    var delete_comments = function() {
        var delete_level = Number.MAX_SAFE_INTEGER
        var comment_objects = document.getElementsByClassName("c-comments__comment")

        for(var i = 0; i < comment_objects.length; i++) {

            var comment_level = 0
            var depth_match = comment_objects[i].getAttribute("class").match("c-comments__depth-(\\d*)")
            if (depth_match !== null) {
                comment_level = parseInt(depth_match[1])
            }

            if (comment_level > delete_level) {
                comment_objects[i].setAttribute("style", "display:none");
            }
            else {
                delete_level = Number.MAX_SAFE_INTEGER;
            }

            if (blocked_users.includes(comment_objects[i].getElementsByTagName("a")[0].text)
                || blocked_users.includes(comment_objects[i].getElementsByTagName("a")[1].text)) {

                if (comment_level < delete_level) {
                    delete_level = comment_level
                }
                comment_objects[i].setAttribute("style", "display:none");
            }
        }
    }

    setInterval(delete_comments, 1000);

})();
