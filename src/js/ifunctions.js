function getColor(col1) {
  // Return the value of one of the theme-based colors
  // e.g. --r-link-color

  // console.log("Running getColor");
  let icolor = getComputedStyle(document.documentElement)
    .getPropertyValue(col1)
    .trim();

  return icolor;
  // let colorNorm = chroma(icolor).hex();
  //   console.log(colorNorm);
  // return colorNorm;
}

function setPaletteGradient2(col1, col2) {
  // Return a gradient (5) between two colors

  // console.log("Running setPaletteGradient2");
  icolor1 = getColor(col1);
  icolor2 = getColor(col2);

  const paletteGradient = chroma
    .scale([chroma(icolor1), chroma(icolor2)])
    .colors(5);

  return paletteGradient;
}

function setPaletteGradient1(col1) {
  // Return a gradient between a dark and a light shade of
  // a single color

  // console.log("Running setPaletteGradient1");
  icolor1 = getColor(col1);

  const paletteGradient = chroma
    .scale([chroma(icolor1).darken(2), chroma(icolor2).brighten(2)])
    .colors(5);

  return paletteGradient;
}

function setPaletteWheel(col1, deg1, deg2, alpha1, deg3 = 180) {
  // Return a palette of 5 colors at fixed distance in
  // the color wheel (in degrees + and -)
  // The last color is placed at 180 degrees by default
  // but it can be changed with the 5 argument deg3

  // console.log("Running setPaletteWheel");
  icolor = getColor(col1);

  const paletteWheel = [
    chroma(icolor).set("hsl.h", `-${deg2}`).alpha(alpha1).hex(),
    chroma(icolor).set("hsl.h", `-${deg1}`).alpha(alpha1).hex(),
    chroma(icolor).set("hsl.h", `+${deg1}`).alpha(alpha1).hex(),
    chroma(icolor).set("hsl.h", `+${deg2}`).alpha(alpha1).hex(),
    chroma(icolor).set("hsl.h", `+${deg3}`).alpha(alpha1).hex(),
  ];

  return paletteWheel;
}

function setPaletteDesaturate(col1, alpha1) {
  // Return a palette of 2 desaturated variants of a color

  // console.log("Running setPaletteDesaturate");
  icolor = getColor(col1);

  const paletteDes = [
    chroma(icolor).desaturate(1).alpha(alpha1).hex(),
    chroma(icolor).desaturate(2).alpha(alpha1).hex(),
  ];

  return paletteDes;
}

function setPaletteMix(col1, col2, alpha1, ...iprops) {
  // Return a palette of 5 colors resulting from a mix
  // between two colors at fixed proportion
  // The 4th argument is for an array that represents
  // the proportion of the second color in the mix.

  // console.log("Running setPaletteMix");
  let icolor1 = getColor(col1);
  let icolor2 = getColor(col2);

  let mixCol1Col2 = [];
  iprops.forEach((iprop) => {
    let imix = chroma.mix(icolor1, icolor2, iprop, "lab").alpha(alpha1).hex();
    mixCol1Col2.push(imix);
  });

  return mixCol1Col2;
}

// Functions to set the Colors
function setPalettes() {
  //Runs all functions to create color palettes
  // and sets style properties for each color
  // Also updates the customColors object with
  // each generated color

  console.log("Running setPalettes");
  var paletteGradientLinkBg = setPaletteGradient2(
    "--r-link-color",
    "--r-background-color",
  );

  var paletteGradientLinkMain = setPaletteGradient2(
    "--r-link-color",
    "--r-main-color",
  );

  var paletteGradientLink = setPaletteGradient1("--r-link-color");

  var paletteGradientMainBg = setPaletteGradient2(
    "--r-main-color",
    "--r-background-color",
  );

  var paletteAnaA = setPaletteWheel("--r-link-color", 15, 30, 1, 5);

  var paletteAnaB = setPaletteWheel("--r-link-color", 45, 60, 1, 65);

  var paletteAnaC = setPaletteWheel("--r-link-color", 75, 90, 1, 105);

  var paletteOpLink = setPaletteWheel("--r-link-color", 120, 150, 1);

  var paletteDesLink = setPaletteDesaturate("--r-link-color", 1);

  var iprops = [0.125, 0.25, 0.375, 0.5, 0.625];
  var mixLinkBg = setPaletteMix(
    "--r-link-color",
    "--r-background-color",
    1,
    ...iprops,
  );

  var mixLinkMain = setPaletteMix(
    "--r-link-color",
    "--r-main-color",
    1,
    ...iprops,
  );

  paletteGradientLinkBg.forEach((col, i) => {
    document.documentElement.style.setProperty(
      `--clr-grad-LinkBg-${i + 1}`,
      col,
    );
  });

  paletteGradientLinkMain.forEach((col, i) => {
    document.documentElement.style.setProperty(
      `--clr-grad-LinkMain-${i + 1}`,
      col,
    );
  });

  paletteGradientLink.forEach((col, i) => {
    document.documentElement.style.setProperty(`--clr-grad-Link-${i + 1}`, col);
  });

  paletteGradientMainBg.forEach((col, i) => {
    document.documentElement.style.setProperty(
      `--clr-grad-MainBg-${i + 1}`,
      col,
    );
  });

  paletteAnaA.forEach((col, i) => {
    document.documentElement.style.setProperty(`--clr-ana-A-${i + 1}`, col);
  });

  paletteAnaB.forEach((col, i) => {
    document.documentElement.style.setProperty(`--clr-ana-B-${i + 1}`, col);
  });

  paletteAnaC.forEach((col, i) => {
    document.documentElement.style.setProperty(`--clr-ana-C-${i + 1}`, col);
  });

  paletteOpLink.forEach((col, i) => {
    document.documentElement.style.setProperty(`--clr-opp-Link-${i + 1}`, col);
  });

  paletteDesLink.forEach((col, i) => {
    document.documentElement.style.setProperty(`--clr-des-Link-${i + 1}`, col);
  });

  mixLinkBg.forEach((col, i) => {
    document.documentElement.style.setProperty(
      `--clr-mix-LinkBg-${i + 1}`,
      col,
    );
  });

  mixLinkMain.forEach((col, i) => {
    document.documentElement.style.setProperty(
      `--clr-mix-LinkMain-${i + 1}`,
      col,
    );
  });

  let customPalettes = {
    "grad-LinkBg": paletteGradientLinkBg,
    "grad-LinkMain": paletteGradientLinkMain,
    "grad-Link": paletteGradientLink,
    "grad-MainBg": paletteGradientMainBg,
    "ana-A": paletteAnaA,
    "ana-B": paletteAnaB,
    "ana-C": paletteAnaC,
    "opp-Link": paletteOpLink,
    "des-Link": paletteDesLink,
    "mix-LinkBg": mixLinkBg,
    "mix-LinkMain": mixLinkMain,
  };
  Object.entries(customPalettes).forEach(([group, colors]) => {
    colors.forEach((hex, i) => {
      customColors[`${group}-${i + 1}`] = hex;
    });
  });
}

function checkUtil(position) {
  // Checks whether bg-<position>-box is a CSS class
  // or a TailwindCSS utility based on the
  // first characters of the backgroundColor property
  // Returns true if it is a CSS class.
  // position: e.g., 'outer' or 'inner'

  if (position === "outer") {
    var cssClass = ".bg-outer-box";
  } else {
    var cssClass = ".bg-inner-box";
  }
  let box = document.querySelector(cssClass);
  let style = getComputedStyle(box);
  if (style.backgroundColor.startsWith("rgb")) {
    console.log("Looks like CSS class");
    return true;
  } else {
    console.log("Looks like TailwindCSS Utility");
    return false;
  }
}

function setState() {
  // Defines the attributes of the State object
  // which are used to update the colors

  console.log("Running setState");
  state = {
    outerKey: null, // "ana-A-1",
    outerColor: null, // customColors["ana-A-1"],
    outerOpacity: 50,
    innerKey: null, // "grad-MainBg-1",
    innerColor: null, // customColors["grad-MainBg-1"],
    innerOpacity: 50,
  };
}

function setColors() {
  // Sets the key for the customColors object and
  // with these the values the colors of the two
  // backgrounds, outer and inner

  console.log("Running setColors");
  const innbox = document.querySelector(".bg-inner-box");
  if (innbox) {
    const innstyle = getComputedStyle(innbox);
    const innhex = chroma(innstyle.backgroundColor).alpha(1).hex();
    const key = Object.keys(customColors).find(
      (key) => customColors[key] === innhex,
    );
    if (key) {
      state.innerKey = key;
      state.innerColor = customColors[key];
      colorBoxes.forEach((colorBox) => {
        if (colorBox.classList.contains(`bg-${key}`)) {
          var defaultColorBox = colorBox;
          addIcon(defaultColorBox, `fa-regular ${innIcon} checkedBox`);
          return;
        }
      });
    }
  } else {
    console.error("Element .bg-inner-box not found!");
  }
  const outbox = document.querySelector(".bg-outer-box");
  if (outbox) {
    const outstyle = getComputedStyle(outbox);
    const outhex = chroma(outstyle.backgroundColor).alpha(1).hex();
    const key = Object.keys(customColors).find(
      (key) => customColors[key] === outhex,
    );
    if (key) {
      state.outerKey = key;
      state.outerColor = customColors[key];
      colorBoxes.forEach((colorBox) => {
        if (colorBox.classList.contains(`bg-${key}`)) {
          var defaultColorBox = colorBox;
          addIcon(defaultColorBox, `fa-regular ${outIcon} checkedBox`);
          return;
        }
      });
    }
  } else {
    console.error("Element .bg-outer-box not found!");
  }
}

function updateCSSVar(position) {
  // Updates the value of the CSS variables
  // --bg-outBox or --bg-innBox which are used to
  // set the background color of  the classes
  // .bg-outer-box and .bg-inner-box
  // position: e.g., 'outer' or 'inner'

  console.log(`Running updateCSSVar for ${position}`);
  if (position === "outer") {
    var cssVar = "--bg-outBox";
  } else {
    var cssVar = "--bg-innBox";
  }
  const opacityKey = `${position}Opacity`;
  const colorKey = `${position}Color`;

  if (!state[opacityKey]) {
    state[opacityKey] = opacitySlider.value;
  }

  const alpha = Math.round((state[opacityKey] / 100) * 255)
    .toString(16)
    .padStart(2, "0");
  const color = `${state[colorKey]}${alpha}`;

  document.documentElement.style.setProperty(cssVar, color);
}

function getSelectedBox() {
  //Returns the value of the selected radio button
  // (outer or inner) for the corresponding box

  // console.log("Running getSelectedBox");
  return (
    document.querySelector('input[name="boxSelector"]:checked')?.value ||
    "outer"
  );
}

function checkColorPick() {
  // Gets the background color of a colored box
  // and applies it to the State object based on
  // the value of the getSelectedBox() function

  console.log("Running checkColorPick");
  const bgClass = [...this.classList].find((cls) => cls.startsWith("bg-"));
  if (!bgClass) {
    console.log("bgClass is not defined");
    return;
  } else {
    var currentColorBoxes =
      Reveal.getCurrentSlide().querySelectorAll(".color-option");
    var currBox = this;
    //this.classList.add("checkedBox")
  }

  const key = bgClass.replace("bg-", "");
  const hex = customColors[key];

  if (!hex) {
    console.warn("No hex found for class:", bgClass);
    return;
  }

  const boxType = getSelectedBox();

  if (boxType === "outer") {
    currentColorBoxes.forEach((colorBox) => {
      removeIcon(colorBox, outIcon);
    });
    let newClasses = `fa-regular ${outIcon} checkedBox`;
    addIcon(currBox, newClasses);
    state.outerColor = hex;
    state.outerKey = key;
    updateCSSVar("outer");
    updateBoxLabel("outer");
  } else {
    currentColorBoxes.forEach((colorBox) => {
      removeIcon(colorBox, innIcon);
    });
    let newClasses = `fa-regular ${innIcon} checkedBox`;
    addIcon(currBox, newClasses);
    state.innerColor = hex;
    state.innerKey = key;
    updateCSSVar("inner");
    updateBoxLabel("inner");
  }
}

function updateOpacityElement() {
  // Updates the label and input elements based on
  // - The selected radio option, inner or outer
  // - The current value state.opacity

  const opacity =
    getSelectedBox() === "outer" ? state.outerOpacity : state.innerOpacity;
  opacityDisplayedValue.textContent = `${opacity}%`;
  opacitySlider.value = opacity;
}

function updateOpacitySlider() {
  // Updates the values of the opacity based on the
  // slider input

  const value = parseInt(opacitySlider.value, 10);
  if (getSelectedBox() === "outer") {
    state.outerOpacity = value;
    updateCSSVar("outer");
    updateBoxLabel("outer");
  } else {
    state.innerOpacity = value;
    updateCSSVar("inner");
    updateBoxLabel("inner");
  }
  opacityDisplayedValue.textContent = `${value}%`;
}

function updateOpacitySliderWheel(ev) {
  // Updates the values of the opacity based on the
  // slider input using the mouse wheel

  ev.preventDefault();

  // Determine direction
  const step = Number(opacitySlider.step) || 1;
  const direction = ev.deltaY > 0 ? -step : step;

  // Update the value
  opacitySlider.value = Number(opacitySlider.value) + direction;

  updateOpacitySlider();
}

function addIcon(container, className) {
  // Adds a class to an object
  // Used to add FontAwesome icons
  // when picking colors

  const i = document.createElement("i");
  i.className = className;
  container.appendChild(i);
}

function removeIcon(container, className) {
  // Removes a class from an object
  // Used to remove FontAwesome icons
  // when picking colors

  const el = container.querySelector("." + className);
  if (el) el.remove();
}

function initColorPicker() {
  // Runs all the functions for the customization of
  // the slides

  console.log("Running initColorPicker");
  updateCSSVar("inner");
  updateCSSVar("outer");
  updateBoxLabel("inner");
  updateBoxLabel("outer");
  colorBoxes.forEach((swatch) => {
    swatch.addEventListener("click", checkColorPick);
  });

  // Handle radio button changes
  document.querySelectorAll('input[name="boxSelector"]').forEach((radio) => {
    radio.addEventListener("change", updateOpacityElement);
  });

  // Handle slider input
  opacitySlider.addEventListener("input", updateOpacitySlider);
  opacitySlider.addEventListener("wheel", updateOpacitySliderWheel, {
    passive: false,
  });
}

function updateBoxes() {
  // Updates the color values of the State object
  // based on the key values. It is fired after
  // changing theme which changes the palettes

  console.log("Running updateBoxes");
  state.innerColor = customColors[state.innerKey];
  state.outerColor = customColors[state.outerKey];
}

function updateBoxLabel(position) {
  // Updates the label that indicates the background
  // color (and opacity) for the 'position' box. Uses the
  // properties of the State object
  // position: e.g., 'outer' or 'inner'

  console.log(`Running updateBoxLabel for ${position}`);

  if (position === "outer") {
    var icon = outIcon;
  } else {
    var icon = innIcon;
  }

  var iLabel = position.charAt(0).toUpperCase() + position.slice(1);
  const boxValue = `${position}-box-value`;
  const boxElement = document.getElementById(boxValue);

  let posValue;
  const iKey = `${position}Key`;
  const opacityKey = `${position}Opacity`;
  if (!state[iKey]) {
    posValue = `ana-A-2/${state[opacityKey]}`;
  } else {
    posValue = `${state[iKey]}/${state[opacityKey]}`;
  }
  const posBoxUtil =
    `<i class="fa-regular ${icon} checkedBox"></i> ${iLabel} Box:\n` + posValue;

  boxElement.innerHTML = posBoxUtil;
}

function updateColors() {
  // Runs all the functions to update the colors upon
  // a change in theme
  console.log("Updating theme-based colors");
  setPalettes();
  updateBoxes();
  if (!opacitySlider || !opacityDisplayedValue) {
    updateCSSVar("inner");
    updateCSSVar("outer");
  } else {
    updateCSSVar("inner");
    updateCSSVar("outer");
    updateBoxLabel("inner");
    updateBoxLabel("outer");
  }
}
