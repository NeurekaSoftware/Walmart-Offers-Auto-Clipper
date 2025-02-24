// ==UserScript==
// @name         Walmart Offers Auto-clipper
// @icon         https://code.neureka.dev/uploads/-/system/project/avatar/9/walmart-icon.png
// @namespace    https://code.neureka.dev/userscripts/walmart-offers-auto-clipper
// @version      1.0.0
// @description  A Violentmonkey userscript that will automatically clip your Offers from Walmart.
// @author       Neureka
// @downloadURL  https://code.neureka.dev/userscripts/walmart-offers-auto-clipper/-/raw/main/auto-clipper.user.js
// @supportURL   https://code.neureka.dev/userscripts/walmart-offers-auto-clipper/-/issues
// @match        https://www.walmart.com/offer/all-offers
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const STARTUP_DELAY      = 2500;
    const ACTION_DELAY       = 1000;
    const DISPLAY_STATISTICS = true;

    let totalOffersClipped  = 0;
    let offersClipped       = false;
    let statisticsSent       = false;

    setTimeout(function() {

        setInterval(function() {
            if(!offersClipped) {
                clipCoupons();
            }
            else if(DISPLAY_STATISTICS && !statisticsSent) {
                alert(`Walmart Offers Auto-clipper\n\Offers Clipped: ${totalOffersClipped}`);
                statisticsSent = true;
            }

        }, ACTION_DELAY);

    }, STARTUP_DELAY);

    function clipCoupons() {
        // Select all checkbox inputs with the class 'w_9fd1'
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');

        // Loop through each checkbox and click it
        checkboxes.forEach(checkbox => checkbox.click());
        totalOffersClipped += checkboxes.length;

        // Select the "Next Page" link element
        const nextPageLink = document.querySelector('a[data-testid="NextPage"]');

        // Click the "Next Page" link
        if (nextPageLink) {
          setTimeout(function() {
              nextPageLink.click();
          }, ACTION_DELAY);
        }
        else {
            offersClipped = true;
        }
    }

})();