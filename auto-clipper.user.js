// ==UserScript==
// @name         Walmart Offers Auto-clipper
// @icon         https://github.com/NeurekaSoftware/Walmart-Offers-Auto-Clipper/raw/refs/heads/main/icon.png
// @namespace    https://github.com/NeurekaSoftware/Walmart-Offers-Auto-Clipper
// @version      1.0.0
// @description  A userscript that will automatically clip your Offers from Walmart.
// @author       Neureka
// @downloadURL  https://github.com/NeurekaSoftware/Walmart-Offers-Auto-Clipper/raw/refs/heads/main/auto-clipper.user.js
// @supportURL   https://github.com/NeurekaSoftware/Walmart-Offers-Auto-Clipper/issues
// @match        https://www.walmart.com/offer/all-offers
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const STARTUP_DELAY       = 2500;
    const ACTION_DELAY        = 1000;
    const DISPLAY_STATISTICS = true;

    let totalOffersClipped    = 0;
    let offersClipped        = false;
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
        // Select all checkbox inputs with the class 'input' that has the type 'checkbox'
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