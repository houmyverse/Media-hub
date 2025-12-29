// ==UserScript==

// @name         GLWiz_Launcher_Link_Curtain

// @namespace    http://tampermonkey.net/

// @version      64.0

// @match        *://*/*

// @grant        none

// ==/UserScript==

(function() {

    'use strict';

    // --- 1. GET CHANNEL ID FROM URL ---

    // We look for the standard GLWiz parameter: ?id=XXXXXX

    const urlParams = new URLSearchParams(window.location.search);

    let targetID = urlParams.get('id');

    // PERSISTENCE (Crucial for Login Reloads)

    // If the URL has an ID, we save it as the "Active Target"

    if (targetID) {

        sessionStorage.setItem('glwiz_active_target', targetID);

    } else {

        // If URL has no ID (e.g. after login redirect), recall the last one used

        targetID = sessionStorage.getItem('glwiz_active_target');

    }

    // Default to iFilm if absolutely nothing is found

    if (!targetID) targetID = "302508";



    console.log("GLWiz Target Active:", targetID);

    // --- 2. LOGIN (Reliable) ---

    const emailField = document.querySelector('input[name*="txtEmail"]');

    const passField = document.querySelector('input[name*="txtPassword"]');

    const loginBtn = document.querySelector('input[name*="btnSignIn"]');

    if (emailField && passField && loginBtn) {

        if (emailField.value === "") {

            emailField.value = "mommyezzat@gmail.com";

            passField.value = "2025Sucked";

            setTimeout(() => { loginBtn.click(); }, 500);

        }

        return;

    }

    const guestSignIn = document.getElementById("SignInSignUp");

    if (guestSignIn) { guestSignIn.click(); return; }

    // --- 3. CURTAIN LOGIC ---

    if (!window.location.href.includes("glwiz")) return;

    let isLocked = false;

    let hasClicked = false;

    setInterval(() => {

        if (hasClicked) return;

        // DYNAMIC SEARCH: Look for the image matching the ID from the link

        const img = document.querySelector(`img[src*="${targetID}"]`);



        if (img) {



            if (!isLocked) {

                isLocked = true;



                // 1. CENTER IT

                img.scrollIntoView({behavior: "auto", block: "center", inline: "center"});

                // 2. LOCK THE PAGE

                document.body.style.overflow = "hidden";

                document.body.style.pointerEvents = "none";



                // 3. UNLOCK THE IMAGE ONLY

                img.style.pointerEvents = "auto";



                // 4. BLACKOUT SHADOW (The Curtain)

                img.style.boxShadow = "0 0 0 10000px black";



                // 5. STYLE THE BUTTON

                img.style.borderRadius = "15px";

                img.style.transform = "scale(3.5)";

                img.style.position = "relative";

                img.style.zIndex = "2147483647";

                img.style.transition = "all 0.5s";

                img.style.cursor = "pointer";

                // 6. CLICK HANDLER (Lift Curtain)

                img.onclick = function() {

                    hasClicked = true;



                    // A. Visual Feedback (Green)

                    img.style.border = "5px solid #00FF00";

                    img.style.boxShadow = "0 0 50px #00FF00, 0 0 0 10000px black";



                    // B. Wait 3 seconds for video load, then UNLOCK

                    setTimeout(() => {

                        console.log("Lifting Curtain...");

                        img.style.boxShadow = "none";

                        img.style.border = "none";

                        img.style.transform = "scale(1)";

                        img.style.zIndex = "auto";

                        document.body.style.pointerEvents = "auto";

                        document.body.style.overflow = "auto";

                        window.scrollTo({ top: 0, behavior: 'smooth' });

                    }, 3000);

                };

            }

        } else {

            // NAVIGATE TABS (Hunt for the channel if not found)

            if (!isLocked) {

                const tabs = document.querySelectorAll('.AccordionPanelTab');

                tabs.forEach(tab => {

                    if (!tab.classList.contains("AccordionPanelOpen")) {

                        // Random delay to avoid rapid-fire clicks

                        if (Math.random() > 0.8) tab.click();

                    }

                });

            }

        }

    }, 1000);

})();

