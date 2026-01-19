const root = document.documentElement;

// Get the height of the slide
slideHeight = getComputedStyle(root).getPropertyValue('--slide-height');
document.documentElement.style.setProperty('--slide-height', slideHeight);

// Object to store all color boxes for customization
const colorBoxes = document.querySelectorAll(".color-option");

const customColors = {};
const GROUP_NAMES = ['grad-LinkBg', 'grad-LinkMain', 'grad-Link',
		     'grad-MainBg', 'ana-A', 'ana-B', 'ana-C',
		     'opp-Link', 'des-Link', 'mix-LinkBg', 'mix-LinkMain'];


// Opacity slider
const opacitySlider = document.getElementById('opacitySlider');
const opacityDisplayedValue = document.getElementById('opacityDisplayedValue');

// Fontawesome icons
const innIcon = "fa-circle-down"; //fa-square-caret-down
const outIcon = "fa-circle-up"; //fa-square-caret-up

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log("Page loaded");
    let state = {};
    setPalettes();
    if (checkUtil("inner") && checkUtil("outer")){
	setState();
	setColors();
	if (!opacitySlider || !opacityDisplayedValue) {
	    updateCSSVar("inner");
	    updateCSSVar("outer");
	} else {
	    initColorPicker();
	}
    }
});

// Update colors when theme change
const targetId = 'theme';
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    // Look through added nodes for the stylesheet
    mutation.addedNodes.forEach((node) => {
      if (node.tagName === 'LINK' && node.id === targetId) {
        
        node.onload = function() {
            console.log('Theme changed');
	    if (checkUtil("inner") && checkUtil("outer")){
		updateColors();
	    } else {
		setPalettes();
	    }
        };
      }
    });
  });
});

// Start observing the <head> for changes to its children
observer.observe(document.head, { childList: true });
