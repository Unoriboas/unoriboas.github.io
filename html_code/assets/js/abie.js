/*!
=========================================================
* Landing page
=========================================================

* Copyright: 2022 Unoriboas (https://github.com/Unoriboas)

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
* Imported to make sure everything works!
*/

// The locale our app first shows
const defaultLocale = "en";
// The active locale
let locale;
// Gets filled with active locale translations
let translations = {};

// When the page content is ready...
document.addEventListener("DOMContentLoaded", () => {
    // Translate the page to the default locale
    setLocale(defaultLocale);
    bindLocaleSwitcher();
});
// Load translations for the given locale and translate
// the page to this locale
async function setLocale(newLocale, fadeIn = false) {
    switchColor(newLocale);

    if (newLocale === locale) return;
    const newTranslations =
        await fetchTranslationsFor(newLocale);
    locale = newLocale;
    translations = newTranslations;
    translatePage(fadeIn);
}
// Retrieve translations JSON object for the given
// locale over the network
async function fetchTranslationsFor(newLocale) {
    const response = await fetch(`html_code/assets/js/translations/${newLocale}.json`);
    return response.json();
}
// Replace the inner text of each element that has a
// data-i18n-key attribute with the translation corresponding
// to its data-i18n-key
function translatePage(fadeIn) {
    document
        .querySelectorAll(".data-i18n-key")
        .forEach(item => translateElement(item, fadeIn));
}
// Replace the inner text of the given HTML element
// with the translation in the active locale,
// corresponding to the element's data-i18n-key
async function translateElement(element, fadeIn) {
    if (element === null) {
        return
    }
    const key = element.id;
    let lastNode = element;
    while (lastNode.children.length !== 0) {
        lastNode = element.children[0];
    }
    if (fadeIn) {
        $(lastNode).slideToggle(400, 'linear', function () {
            lastNode.innerText = translations[key];
            $(lastNode).slideToggle()
        })
    } else {
        lastNode.innerText = translations[key];
    }
}

function bindLocaleSwitcher() {
    const switches =
        document.querySelectorAll(".js-locale");
    switches.forEach(item => {
        item.addEventListener("click",event => {
            event.preventDefault();
            setLocale(event.currentTarget.id, true)
        })
    })
}

function switchColor(switchingLocale) {
    const buttons = document.querySelectorAll('.js-locale')
    const element = document.querySelector(`#${switchingLocale}`);
    for (let child of buttons) {
        if (child === element) {
            child.firstChild.classList.add('text-primary')
            child.firstChild.classList.remove('text-white')
        } else {
            child.firstChild.classList.add('text-white')
            child.firstChild.classList.remove('text-primary')
        }
    }
}
