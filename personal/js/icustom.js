slideHeight=getComputedStyle(document.body).getPropertyValue('--slide-height');
document.documentElement.style.setProperty('--slide-height',slideHeight);

// Define background colors and initial theme
var [bgMsg, bgColorA, bgColorB] = getColor();

// Set the color value
document.documentElement.style.setProperty('--clr-bg-message',bgMsg);
document.documentElement.style.setProperty('--clr-bg-A',bgColorA);
document.documentElement.style.setProperty('--clr-bg-B',bgColorB);

// rgba to hex (from https://stackoverflow.com/a/73401564/12414497)
function rgba2hexa(rgba, forceRemoveAlpha = false) {
  return "#" + rgba.replace(/^rgba?\(|\s+|\)$/g, '')
    .split(',')
    .filter((string, index) => !forceRemoveAlpha || index !== 3)
    .map(string => parseFloat(string))
    .map((number, index) => index === 3 ? Math.round(number * 255) : number)
    .map(number => number.toString(16))
    .map(string => string.length === 1 ? "0" + string : string)
    .join("")
}

// Return the value of the link color
function getColor(){
    clrLink=getComputedStyle(document.body).getPropertyValue('--r-link-color');
    clrBg=getComputedStyle(document.body).getPropertyValue('--r-main-color');

    if (clrLink.startsWith('#')){
	clrLink=clrNorm(clrLink);
    } else {
	clrLink=rgba2hexa(clrLink);
	clrLink=clrNorm(clrLink);
    }

    if (clrBg.startsWith('#')){
	clrBg=clrNorm(clrBg);
    } else {
	clrBg=rgba2hexa(clrBg);
	clrBg=clrNorm(clrBg);
    }
    
    let bgMsg=clrLink+"b2"; // b2 = 70% opacity
    let bgColorA=clrLink+"26"; // 26 = 15% opacity
    let bgColorB=clrBg+"40"; // 40 = 25% opacity

    return [bgMsg, bgColorA, bgColorB];
}

// Return a six character color, useful if a 3 letter is supplied
function clrNorm(clr){
    col=clr.replace("#","");
    if (col.length == 3){
	clr="#"+col[0].repeat(2)+col[1].repeat(2)+col[2].repeat(2);
    } else if ((col.length == 8)) {
	clr="#"+col.slice(0,5)
    }
    
    return clr;
}


// Function to update background colors of div and button elements
function updateBGcol(){
    var [bgMsgCurr, bgColorACurr, bgColorBCurr] = getColor();
    if ( bgMsgCurr != bgMsg ||
	 bgColorACurr != bgColorA ||
	 bgColorB != bgColorBCurr ){
	console.log("updating color");
	bgMsg=bgMsgCurr;
	bgColorA=bgColorACurr;
	bgColorB=bgColorBCurr;
	document.documentElement.style.setProperty('--clr-bg-message',bgMsg);
	document.documentElement.style.setProperty('--clr-bg-A',bgColorA);
	document.documentElement.style.setProperty('--clr-bg-B',bgColorB);
    }  
}


// Function to toggle the visibility of the div element in the iframe slide
function ilegend(){
    console.log("ilegend launched")
    islide=Reveal.getCurrentSlide()
    if (islide.className.includes("iframe")){
	id=islide.id;
	isec=document.getElementById(id);
	idiv=isec.children[0];
	idiv.classList.toggle('out');
	updateBGcol();
    }
}


// Update slide upon changing slide
Reveal.addEventListener('slidechanged', updateBGcol);

