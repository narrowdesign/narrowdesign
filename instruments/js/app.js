// TODO: undoing wrap should not delete children
// TODO: add redo
// TODO: combind undo and recording
// TODO: novel element traversal without clicking

const unitRegex = /vw$|vh$|vmax$|dvh$|dvw$|svh$|svw$|lvh$|lvw$|dvmin$|dvmax$|lvmin$|lvmax$|svmin$|svmax$|vmin$|px$|rem$|em$|%$/;
const defaultImage = 'images/mountain.jpg';
const LIST_SCROLL_PAUSE = 200;

// content dom elements
const bodyEl = document.body;
const containerEl = document.querySelectorAll('.container')[0];
const appEl = document.querySelector('.AppDisplay');

// app dom elements
const displayEl = document.querySelector(".AppStyleDisplay");
const displayPropEl = document.querySelector(".AppStyleDisplay__prop");
const displayValueEl = document.querySelector(".AppStyleDisplay__value");
const displayElementEl = document.querySelector(".AppStyleDisplay__element");
const displayChannelEl = document.querySelector(".AppStyleDisplay__channel");
const displayEnumListEl = document.querySelector(".AppStyleDisplay__enumList");
const displayElementsUnderCursorListEl = document.querySelector(".AppStyleDisplay__elementsUnderCursorList");
const displayInspectStyleListEl = document.querySelector(".AppStyleDisplay__inspectStyleList");
const keyDisplayEl = document.querySelector(".AppKeyDisplay");
const scrollDisplayEl = document.querySelector('.AppScrollDisplay')
const containerGridEl = document.querySelector(".AppGridDisplay");
const searchEl = document.querySelector('.AppDisplay__search')
const classListEl = document.querySelector('.AppDisplay__classList')
const linkInputEl = document.querySelector('.AppDisplay__linkInput')

let userState;

let elements = [
  bodyEl,
  ...bodyEl.querySelectorAll('*')
];
// Remove app elements
elements.splice(elements.indexOf(containerGridEl), 1);
elements.splice(elements.indexOf(appEl), 1);
appEl.querySelectorAll('*').forEach((el) => {
  elements.splice(elements.indexOf(el), 1);
})

setTimeout(init, 200);

function init() {
  if (!window.location.search.includes('instrument')) {
    bodyEl.classList.remove('App--isClassListMode');
    bodyEl.classList.remove('App--isLinkInputMode');
    bodyEl.classList.remove('App--isEnumDisplayed');
    bodyEl.classList.remove('App--isElementsUnderCursorListDisplayed');
    bodyEl.classList.remove('App--isInspectStyleDisplayed');
    bodyEl.classList.remove('App--isInstrument');
    bodyEl.classList.remove('App--isKeyDisplayed')
    bodyEl.classList.remove('App--isScrolling');
    bodyEl.classList.remove('App--isScrollMode');
    bodyEl.classList.remove('App--isSearchMode');
    bodyEl.classList.remove("App--isAnimating");
    bodyEl.classList.remove("App--isChanging");
    bodyEl.classList.remove("App--isEditMode");
    bodyEl.classList.remove("App--isGridActive");
    bodyEl.classList.remove("App--isVisualMode");
    bodyEl.classList.remove("App--isXrayMode");
    bodyEl.classList.remove("App--isInspectStyleDisplayed");
    return
  }
  window.onbeforeunload = function() {
    return "Changes you made may not be saved";
  };
  bodyEl.classList.add('App--isInstrument');
  bodyEl.classList.add("App--isXrayMode");

  /* TODO add threejs primitives
  const keyToNew3d = {
    s: THREE.SphereGeometry(0.5, 50, 50),
    b: THREE.BoxGeometry(1, 1, 1),
    p: THREE.PlaneGeometry(2, 2),
    c: THREE.CircleGeometry(0.5, 50),
    t: THREE.TorusGeometry(0.5, 0.2, 16, 100),
    cy: THREE.CylinderGeometry(0.5, 0.5, 1, 50),
    ih: THREE.IcosahedronGeometry(0.5, 0),
    oh: THREE.OctahedronGeometry(0.5, 0),
    th: THREE.TetrahedronGeometry(0.5, 0),
    dd: THREE.DodecahedronGeometry(0.5, 0),
    ph: THREE.PolyhedronGeometry([
      { x: -1, y: 0, z: 1 },
      { x: 1, y: 0, z: 1 },
      { x: -1, y: 0, z: -1 },
      { x: 1, y: 0, z: -1 },
      { x: 0, y: 1, z: 0 }
    ], [
      [ 0, 1, 4 ],
      [ 1, 2, 4 ],
      [ 2, 3, 4 ],
      [ 3, 0, 4 ],
      [ 1, 0, 3 ],
      [ 2, 1, 3 ]
    ], 0.5),
    la: THREE.LatheGeometry(
      [
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 1, y: 1, z: 0 },
        { x: 0, y: 1, z: 0 }
      ],
      100
    ),
    ex: THREE.ExtrudeGeometry(
      new THREE.Shape([
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 0, y: 1 }
      ]),
      {
        amount: 1,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 0.1,
        bevelThickness: 0.1
      }
    ),
    al: THREE.AmbientLight( 0x404040 ), // soft white light
    dl: THREE.DirectionalLight( 0xffffff, 0.5 ), // white light shining from a specific direction
    pl: THREE.PointLight( 0xff0000, 1, 100 ), // red light at a specific point
    sl: THREE.SpotLight( 0x00ff00, 1, 100, Math.PI/3, 10 ), // green light shining from a specific point in a specific direction
    hl: THREE.HemisphereLight( 0x0000ff, 0x00ff00, 0.6 ),
  }
  */

  const keyToShiftPropIndex = ["!","@","#","$"]
  const keyToProp = {
    as: {
      name: "align-self",
      enumList: [
        "center",
        "flex-end",
        "stretch",
        "flex-start",
      ]
    },
    ai: {
      name: "align-items",
      enumList: [
        "center",
        "flex-end",
        "stretch",
        "flex-start",
        "baseline",
        "space-between",
        "space-around",
        "space-evenly",
      ]
    },
    b: {
      name: "bottom",
      initialValue: "auto"
    },
    bc: {
      name: ["--background", "--background", "--background", "--background"],
      initialValue: `hsla(360,100%,100%,0)`,
      isVariable: true
    },
    bd: {
      name: "border-width",
      min: 0,
      increment: 0.1,
      axis: "all",
      initialValue: '0vw'
    },
    bf: {
      name: "--backdrop-filter",
      min: 0,
      increment: 0.1,
      initialValue: "0vw",
      isVariable: true
    },
    bw: {
      name: "border-width",
      min: 0,
      axis: "all",
      initialValue: '0vw'
    },
    bb: {
      name: "border-bottom-width",
      min: 0,
      initialValue: '0vw'
    },
    dc: {
      name: ["--border-color", "--border-color", "--border-color", "--border-color"],
      initialValue: `var(--color)`,
      isVariable: true    
    },    
    bl: {
      name: "border-left-width",
      min: 0,
      initialValue: '0vw'
    },
    br: {
      name: "border-right-width",
      min: 0,
      initialValue: '0vw'
    },
    bp: {
      name: "background-repeat",
      enumList: ["repeat", "no-repeat",],
      initialValue: 'no-repeat'
    },
    bz: {
      name: "background-size",
      enumList: ["cover", "contain",],
      initialValue: 'cover'
    },
    bt: {
      name: "border-top-width",
      min: 0,
      initialValue: '0vw'
    },
    bx: {
      name: "border-width",
      min: 0,
      axis: "x",
      initialValue: '0vw'
    },
    by: {
      name: "border-width",
      min: 0,
      axis: "y",
      initialValue: '0vw'
    },
    sh: {
      name: ["--box-shadow", "--box-shadow", "--box-shadow", "--box-shadow"],
      initialValue: `var(--color) 0vw 0vw 0vw 0vw`,
      isVariable: true
    },
    lg: {
      name: ["--background-linear-gradient", "--background-linear-gradient", "--background-linear-gradient", "--background-linear-gradient", "--background-linear-gradient", "--background-linear-gradient", "--background-linear-gradient", "--background-linear-gradient", "--background-linear-gradient", "--background-linear-gradient"],
      initialValue: `linear-gradient(0deg, hsla(0,100%,0%,1), hsla(0,100%,100%,1))`,
      isVariable: true
    },
    ra: {
      name: "border-radius",
      min: 0,
      max: 10000,
      initialValue: "0vw"
    },
    bs: {
      name: "border-style",
      enumList: ["solid", "dotted", "dashed", "double", "groove", "ridge", "inset", "outset"],
      initialValue: "solid"
    },
    c: {
      name: ["--color", "--color", "--color", "--color"],
      initialValue: `hsla(0,50%,0%,1)`,
      isVariable: true    
    },
    cc: {
      name: "column-count",
      min: 0,
      showsGrid: true,
      increment: 1,
      step: true,
      initialValue: "1",
    },
    cg: {
      name: "column-gap",
      min: 0,
      showsGrid: true,
      initialValue: "0vw"
    },
    d: {
      name: "display",
      enumList: [
        "flex",
        "grid",
        "block",
        "inline-block",
        "inline", 
      ]
    },    
    fb: {
      name: "--filter",
      min: 0,
      increment: 0.1,
      initialValue: "0vw",
      isVariable: true
    },
    fd: {
      name: "flex-direction",
      enumList: ["row", "row-reverse", "column", "column-reverse"]
    },
    ff: {
      name: "font-family",
      enumList: [
        "system-ui",
        "Fraunces",
        "Inter",
        "EB Garamond",
        "Open Sans",
        "Playfair Display",
        "Roboto Mono",
        "Oswald",
        "Vollkorn",
        "Work Sans",
        "Roboto Slab",
      ],
      initialValue: "system-ui"
    },
    fs: {
      name: "font-size",
      min: 1,
      initialValue: "inherit"
    },
    s: {
      name: "font-size",
      min: 1,
      initialValue: "inherit"
    },
    fw: {
      name: "font-weight",
      min: 10,
      max: 900,
      increment: 10,
      initialValue: 400
    },
    g: {
      name: "gap",
      min: 0,
      showsGrid: true,
      initialValue: "0vw"
    },    
    ce: {
      name: "grid-column-end",
      min: 1,
      showsGrid: true,
      increment: 1,
      step: true,
      initialValue: 2
    },
    cs: {
      name: "grid-column-start",
      min: 1,
      showsGrid: true,
      increment: 1,
      step: true,
      initialValue: 1   
    },
    re: {
      name: "grid-row-end",
      min: 1,
      showsGrid: true,
      increment: 1,
      step: true,
      initialValue: 2
    },
    rs: {
      name: "grid-row-start",
      min: 1,
      showsGrid: true,
      increment: 1,
      step: true,
      initialValue: 1
    },
    h: {
      name: "height",
      min: 0,
      initialValue: "auto"
    },
    jc: {
      name: "justify-content",
      enumList: [
        "flex-start",
        "center",        
        "flex-end",
        "stretch",
        "space-between",
        "space-around",
      ]
    },
    js: {
      name: "justify-self",
      enumList: [
        "flex-start",        
        "center",        
        "flex-end",
        "stretch",
      ]
    },
    l: {
      name: "left",
      initialValue: "0vw"
    },
    lh: {
      name: "line-height",
      min: 0,
      initialValue: 'inherit'
    },
    ls: {
      name: "letter-spacing",
      increment: 0.1,
      initialValue: '0vw',
    },
    m: {
      name: "margin",
      axis: "all",
      initialValue: "0vw"     
    },
    mb: {
      name: "margin-bottom",
      initialValue: "0vw"
    },
    ml: {
      name: "margin-left",
      initialValue: "0vw"
    },
    mr: {
      name: "margin-right",
      initialValue: "0vw"
    },
    mt: {
      name: "margin-top",
      initialValue: "0vw"
    },
    mx: {
      name: "margin",
      initialValue: "0vw",
      axis: "x",
    },
    my: {
      name: "margin",
      initialValue: "0vw",
      axis: "y",
    },
    mw: {
      name: "max-width",
      initialValue: "none",
      min: 0,
    },
    bm: {
      name: "mix-blend-mode",
      enumList: [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity"
      ]
    },
    o: {
      name: "opacity",
      min: 0,
      max: 1,
      increment: 0.01,
      initialValue: 0
    },
    ov: {
      name: "overflow",
      enumList: [
        "visible",
        "hidden",
        "auto",
        "scroll"
      ]
    },
    p: {
      name: "padding",
      min: 0,
      axis: "all",
      initialValue: "0vw"    
    },
    po: {
      name: "position",
      enumList: ["relative", "absolute", "fixed", "sticky"]
    },
    pb: {
      name: "padding-bottom",
      min: 0,
      initialValue: "0vw"
    },
    pl: {
      name: "padding-left",
      min: 0,
      initialValue: "0vw"
    },
    pr: {
      name: "padding-right",
      min: 0,
      initialValue: "0vw"
    },
    pt: {
      name: "padding-top",
      min: 0,
      initialValue: "0vw"
    },
    px: {
      name: "padding",
      min: 0,
      initialValue: "0vw",
      axis: "x",
    },
    py: {
      name: "padding",
      min: 0,
      initialValue: "0vw",
      axis: "y",
    },
    r: {
      name: "right",
      initialValue: "auto"
    }, 
    pe: {
      name: "perspective",
      min: 0,
      initialValue: "100vw"
    }, 
    rg: {
      name: "row-gap",
      min: 0,
      showsGrid: true,
      initialValue: "0vw"
    },
    a: {
      name: "text-align",
      enumList: ["start", "left", "center", "end", "right", "justify"]
    },
    ta: {
      name: "text-align",
      enumList: ["start", "left", "center", "end", "right", "justify"]
    },
    ts: {
      name: ["--text-shadow", "--text-shadow", "--text-shadow"],
      initialValue: `var(--color) 0vw 0vw 0vw`,
      isVariable: true
    },
    tt: {
      name: "text-transform",
      enumList: ["none", "capitalize", "uppercase", "lowercase"],
    },
    t: {
      name: "top",
      initialValue: "0vw"
    },
    tr: {
      name: ["--transform", "--transform", "--transform", "--transform", "--transform", "--transform", "--transform", "--transform", "--transform"],
      initialValue: `perspective(100vw) translateX(0vw) translateY(0vw) translateZ(0vw) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg)`,
      isVariable: true
    },
    w: {
      name: "width",
      min: 0,
      initialValue: "auto"
    },
    z: {
      name: "z-index",
      increment: 1, 
      step: true,
      initialValue: 0
    }
  };

  const keyToNewElement = {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
    5: "h5",
    6: "h6",
    a: "a",
    b: "button",
    c: "canvas",
    d: "div",
    g: "div",
    i: "div",
    n: "input",
    o: "code",
    p: "p",
    q: "blockquote",
    s: "section",
    t: "textarea",
    v: "iframe",
    w: "div",
  };

  windowState = {
    width: window.innerWidth,
    height: window.innerHeight,
    centerX: window.innerWidth / 2,
    centerY: window.innerHeight / 2
  }

  userState = {
    activeContainer: containerEl,
    selectedElement: null,
    multiSelectedElementList: [],
    activeKey: "s",
    activeProp: keyToProp["s"],
    activePropName: keyToProp["s"].name,
    activePropParamIndex: 0,
    changeTimeout: null,
    inertiaScrollTimeout: null,
    firstKey: null,
    secondKey: null,

    hasFontsLoaded: false,
    isAltKey: false,
    isAnimating: false,
    isClassListMode: false,
    isLinkInputMode: false,
    isDragging: false,
    isEditMode: false,
    isListDelay: false,
    isReadingDelay: false,
    isRecording: false,
    isScrollMode: false,
    isSearchMode: false,
    isShiftKey: false,
    isTypingDelay: false,
    isVisualMode: false,
    isXrayMode: false,

    keyTimeout: null,
    keyDisplayedTimeout: null,
    inspectStyleDisplayedTimeout: null,
    scrollTimeout: null,
    lastWheelTimestamp: 0,
    wheelRotation: 0,
    mouseStartX: windowState.centerX,
    mouseStartY: windowState.centerY,
    mouseX: windowState.centerX,
    mouseY: windowState.centerY,
    searchTimeout: null,
    styleDisplayTimeout: null,
    touchStartY: windowState.centerY,
    undoStack: [],
  };
  
  // ADD EVENT LISTENERS
  window.addEventListener("click", handleWindowClick);
  window.addEventListener("touchmove", handleTouchMove);
  window.addEventListener("touchstart", handleTouchStart);
  window.addEventListener("wheel", (e) => {
    if (!userState.isAnimating) {
      handleWheel(e)
    }
  }, {passive: false});
  window.addEventListener(
    "scroll",
    (e) => {
      e.preventDefault();
    },
    {passive: false}
  );
  window.addEventListener("keydown", handleKeyPress);
  window.addEventListener("keyup", handleKeyUp);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("resize", handleResize);  
  window.addEventListener("paste", handlePaste);

  searchEl.addEventListener('click', (e) => {
    e.stopPropagation();
  })
  classListEl.addEventListener('click', (e) => {
    e.stopPropagation();
  })

  window.addEventListener('mousedown', handleMouseDown);

  // RECORDING AND PLAYBACK FUNCTIONS

  if (recording.length > 0) {
    userState.isAnimating = true;
    animateRecording(0)
    bodyEl.classList.add("App--isAnimating");
  } else {  
    userState.isRecording = true;
  }

  function animateRecording(i, then) {
    const now = performance.now();
    const elapsed = now - then;
    let stepIndex = i;
    if (!checkIfPaused()) {
      const step = recording[i]
      const nextStep = recording[i + 1]
      if (step[0] === 'new') {
        createNewElement(step[1], elements[step[2]], null, step[3])
      } else if (step[0] === 'select') {
        if (step[1] !== -1) {
          setSelectedElement(elements[step[1]])
        };
      } else if (step[0] === 'multi-select') {
        setMultiSelectedElement(elements[step[1]])
      } else if (step[0] === 'style') {
        exitEditMode();
        const propName = step[2]
        setStyleProperty(elements[step[1]], step[2], step[3])
        if (
          propName.includes('-top') && 
          typeof recording[stepIndex + 1][2] === "string" &&
          typeof recording[stepIndex + 2][2] === "string" &&
          typeof recording[stepIndex + 3][2] === "string" &&
          recording[stepIndex + 1][2].includes('-bottom') && recording[stepIndex + 2][2].includes('-right') && recording[stepIndex + 3][2].includes('-left')) {
          for (let s = 0; s < 3; s++) {
            stepIndex++;
            setStyleProperty(elements[recording[stepIndex][1]], recording[stepIndex][2], recording[stepIndex][3])
          }
        }
        const nameMatch = Object.keys(keyToProp).find((key) => keyToProp[key].name === propName || keyToProp[key].name[0] === propName);
        if (nameMatch) {
          displayKeyPressed(nameMatch.toUpperCase())
          userState.activePropName = propName;
          updateStyleDisplay()
        }
      } else if (step[0] === 'type') {
        enterEditMode();
        userState.isTypingDelay = true;
        animateTyping(elements[step[1]], step[2])
        if (nextStep && nextStep[0] !== 'type') {
          userState.isReadingDelay = true;
          setTimeout(() => {
            userState.isReadingDelay = false;
          }, 500)
        }
      } else if (step[0] === 'delete') {  
        deleteElement(elements[step[1]], step[2])
      } else if (step[0] === 'duplicate') {
        duplicateElement(elements[step[1]], elements[step[2]], step[3])
      }
      redrawGrid();
      stepIndex++;
    }
    if (stepIndex < recording.length - 1 && userState.isAnimating) {
      requestAnimationFrame(() => {
        console.log(i, stepIndex)
        animateRecording(stepIndex, now)
      })  
    } else {
      userState.isAnimating = false;
      bodyEl.classList.remove("App--isAnimating");
    }
  }

  function addToRecording(newStep) {
    if (userState.isUndoing || userState.isRewinding) return;
    const prevStep = recording[recording.length - 1];
    let push = false;
    if (prevStep) {
      prevStep.forEach((val, i) => {
        if (val !== newStep[i]) push = true;
      })
    } else {
      push = true;
    }
    if (push) {
      recording.push(newStep);
    }
  }

  function checkIfPaused() {
    return userState.isTypingDelay || userState.isListDelay || userState.isReadingDelay
  }
  
  function animateTyping(el, text) {
    el.innerHTML = text;
    const elTop = el.getBoundingClientRect().top + window.scrollY;
    if (elTop + 100 > window.scrollY + windowState.height || elTop < window.scrollY) {      
      window.scrollTo({
        top: elTop,
        left: 0
      });
    }
    setTimeout(() => {
      userState.isTypingDelay = false;
    }, Math.random() * 40 + 20);
  }

  // APP DISPLAY FUNCTIONS

  function displayScrollDisplay(e) {
    scrollDisplayEl.style.transform = `translateX(-50%) rotate(${userState.wheelRotation * 0.1}deg)`;
    bodyEl.classList.add('App--isScrolling');
    clearTimeout(userState.scrollTimeout);
    userState.scrollTimeout = setTimeout(() => {
      bodyEl.classList.remove('App--isScrolling');
    }, 200);
  }

  function displayKeyPressed(keys) {
    if (keyDisplayEl.innerText === keys) return;
    keyDisplayEl.innerText = keys.toUpperCase();
    bodyEl.classList.add('App--isKeyDisplayed')
    clearTimeout(userState.AppkeyDisplayedTimeout);
    userState.AppkeyDisplayedTimeout = setTimeout(() => {
      bodyEl.classList.remove('App--isKeyDisplayed')
    }, 800)
  }
  
  function enterSearchMode() {
    userState.isSearchMode = true;
    bodyEl.classList.add('App--isSearchMode');
    clearTimeout(userState.searchTimeout)
    userState.searchTimeout = setTimeout(() => {
      searchEl.focus();
      const propName = userState.activePropName;
      const propValue = userState.selectedElement.style[propName];
      const computedStyle = getComputedStyle(userState.selectedElement);
      const computedValue = computedStyle.getPropertyValue(`${propName}`);
      let val = propValue ? propValue.trim() : computedValue.trim();
      searchEl.value = val;
      const unitIndex = searchEl.value.search(unitRegex);
      searchEl.setSelectionRange(0, unitIndex);
    }, 10)
  }

  function exitSearchMode() {
    userState.isSearchMode = false;
    searchEl.blur();
    userState.selectedElement.focus();
    bodyEl.classList.remove('App--isSearchMode');
  }

  function enterClassListMode() {
    userState.isClassListMode = true;
    bodyEl.classList.add('App--isClassListMode');
    clearTimeout(userState.classListTimeout)
    userState.classListTimeout = setTimeout(() => {
      classListEl.focus();
      const classList = userState.selectedElement.classList.value.split(' ').filter(className => !className.includes('AppElement') && !className.includes('App--')).join(' ');
      classListEl.value = classList;
    }, 10)
  }
  function exitClassListMode() {
    userState.isClassListMode = false;
    classListEl.blur();
    userState.selectedElement.focus();
    bodyEl.classList.remove('App--isClassListMode');
  }
  
  function enterLinkInputMode() {
    userState.isLinkInputMode = true;
    bodyEl.classList.add('App--isLinkInputMode');
    clearTimeout(userState.linkTimeout)
    userState.linkTimeout = setTimeout(() => {
      linkInputEl.focus();
      const container = userState.selectedElement.parentElement;
      if (userState.selectedElement.tagName === 'A') {
        const link = userState.selectedElement.href || '';
        linkInputEl.value = link;
      } else if (container) {
        if (container.tagName !== 'A') {
          const link = container.href || '';
          linkInputEl.value = link;
        }
      }
    }, 10)
  }
  function exitLinkInputMode() {
    userState.isLinkInputMode = false;
    linkInputEl.blur();
    userState.selectedElement.focus();
    bodyEl.classList.remove('App--isLinkInputMode');
  }

  // Event handler functions

  function handleResize() {
    redrawGrid();
  }

  function handleWindowClick(e) {
    e.preventDefault()
    if (userState.isEditMode && !e.target.contentEditable) return;
    if (userState.isShiftKey) {
      setMultiSelectedElement(e.target)
    } else {
      const elementsUnderCursor = document.elementsFromPoint(e.clientX, e.clientY).filter(el => elements.includes(el));
      console.log(elementsUnderCursor)
      updateElementsUnderCursorList(elementsUnderCursor);

      setSelectedElement(e.target);
    }
  }

  function handleWheel(e) {
    if (userState.activeProp.increment === 1) return;
    if (userState.isAnimating) return;
    if (userState.isScrollMode) {
      userState.isInertiaScrolling = true;
      clearTimeout(userState.inertiaScrollTimeout);
      userState.inertiaScrollTimeout = setTimeout(() => {
        userState.isInertiaScrolling = false;
      }, 50)
      return;
    }
    if (userState.isInertiaScrolling) {
      userState.isInertiaScrolling = true;
      clearTimeout(userState.inertiaScrollTimeout);
      userState.inertiaScrollTimeout = setTimeout(() => {
        userState.isInertiaScrolling = false;
      }, 50)
      return;
    }
    userState.wheelRotation += e.deltaY;
    updateStyleDisplay()
    e.preventDefault();
    e.stopPropagation();
    if (!userState.selectedElement || userState.isEditMode) return;
    displayScrollDisplay(e);
    let delta = e.deltaY * 0.1;
    updateStyleProp(delta);
    return false;
  }

  function handleTouchStart(e) {
    userState.touchStartY = e.touches[0].pageY;
  }

  function handleTouchMove(e) {
    if (!userState.selectedElement || userState.isEditMode) return;
    let delta = -(e.touches[0].pageY - userState.touchStartY) * 0.1;
    userState.touchStartY = e.touches[0].pageY;
    updateStyleProp(delta);
  }

  function handleKeyPress(e) {
    if (e.key === "z" && e.metaKey) {
      e.preventDefault();
      undo(e);
      return;
    }
    if (e.metaKey) return;
    userState.isShiftKey = e.shiftKey;
    if (userState.isShiftKey) {
      bodyEl.classList.add('App--isScrollMode');
      userState.isScrollMode = true;
    }
    userState.isAltKey = e.altKey;
    clearTimeout(userState.keyTimeout);
    userState.keyTimeout = setTimeout(() => {
      userState.firstKey = null;
      userState.secondKey = null;
    }, 500);
    
    if (userState.isSearchMode) {
      if (e.key === "Escape") {
        handleSearchEscapeKeyPress();
      } else if (e.key === "Enter") {
        handleSearchEnterKeyPress();
      }
      return;
    } else if (userState.isClassListMode) {
      if (e.key === "Escape") {
        handleClassListEscapeKeyPress();
      } else if (e.key === "Enter") {
        handleClassListEnterKeyPress();
      }
      return;
    } else if (userState.isLinkInputMode) {
      if (e.key === "Escape") {
        handleLinkInputEscapeKeyPress();
      } else if (e.key === "Enter") {
        handleLinkInputEnterKeyPress();
      }
      return;
    } else if (userState.isEditMode) {
      if (e.key === "Enter") {
        addLineBreak(e)
      } else if (e.key === "Escape") {
        exitEditMode();
      } else if (e.key === "Tab") {
        handleTab(e)
      }
      // if (userState.isRecording && userState.selectedElement) {
      //   addToRecording(['type', elements.indexOf(userState.selectedElement), userState.selectedElement.innerText])
      // }
      return;
    } 

    displayKeyPressed(`${userState.firstKey || ''}${e.key}`);
    
    if (e.key === "Escape") {
      if (userState.isScrollMode) {
        exitEditMode();
        return;
      }
      enterEditMode();
      return;
    } else if (e.key === "Backspace") {
      deleteElement(userState.selectedElement, e.shiftKey);
      return;
    } else if (e.key === "Tab") {
      handleTab(e)
      return;
    } else if (e.key === ".") {
      enterClassListMode();
      return;
    } else if (e.key === ":" || e.key === "/") {
      enterLinkInputMode();
      return;
    } 
    // else if (e.key === "#") {
    //   enterIdMode();
    //   return;
    // }
    
    if (!userState.firstKey) {
      if (e.key === "i") {
        toggleInspectMode();
        return;
      } else if (e.key === "n") {
        userState.firstKey = "n";
        return;
      } else if (e.key === "x") {
        resetActivePropValue();
        return;
      } else if (e.key === " ") {
        e.preventDefault();
        enterSearchMode()
        return;
      } else if (e.key === "v") {
        handleViewChange();
        return;
      }
    } else if (userState.firstKey === "n") {
      createNewElement(e.key);
      userState.firstKey = undefined;
      return;
    }

    if (e.key.includes("Arrow")) {
      handleArrowKeyPress(e)
      return;
    }

    if (e.key === ']') {
      moveElementDownInDom(userState.selectedElement)
      return;
    } else if (e.key === '[') {
      moveElementUpInDom(userState.selectedElement)
      return;
    }

    userState.isActivePropParamIndexAlt = keyToShiftPropIndex.includes(e.key);
    userState.activePropParamIndex = keyToShiftPropIndex.indexOf(e.key);
    if (userState.isActivePropParamIndexAlt) { // ["!","@","#","$"] for color inside shadow
      return;
    } else if (parseInt(e.key) >= 1 && parseInt(e.key) <= 9) { // for props made of a list of values
      setActiveProp(userState.activeKey, parseInt(e.key));
      return;
    }
  
    let keys = '';
    if (userState.firstKey) {
      keys = userState.firstKey + e.key.toLowerCase();
    } else {
      const firstKeyMatch = Object.keys(keyToProp).filter(name => name[0].includes(e.key)).length > 0;
      if (firstKeyMatch) {
        userState.firstKey = e.key.toLowerCase();
        keys = userState.firstKey;
      }
    }
    if (keyToProp.hasOwnProperty(keys)) {
      setActiveProp(keys);
    }
  }

  function handleSearchEnterKeyPress() {
    const valueMatch = userState.activeProp.enumList?.filter((val) => searchEl.value === val).length > 0;
    const unitMatch = searchEl.value.match(unitRegex);
    const isNumberOnly = searchEl.value.match(/\d/);
    if (unitMatch || valueMatch || isNumberOnly) {
      if (userState.activeProp.axis) {
        setMultipleSideProps(userState.selectedElement, userState.activePropName, searchEl.value, userState.activeProp.axis)
      } else {
        setStyleProperty(userState.selectedElement, userState.activePropName, searchEl.value)
      }
      exitSearchMode();
      updateStyleDisplay();
    } else {
      searchEl.value = '';
    }
  }

  function handleClassListEscapeKeyPress() {
    if (classListEl.value === "") {          
      exitClassListMode();
    } else {
      classListEl.value = '';
    }
  }

  function handleClassListEnterKeyPress() {
    const appClassList = userState.selectedElement.classList.value.split(' ').filter(className => className.includes('AppElement') || className.includes('App--')).join(' ');
    const val = classListEl.value.replace(',', ' ');
    userState.selectedElement.classList = appClassList ? `${appClassList} ${val}` : val;
    exitClassListMode();
  }

  function handleLinkInputEscapeKeyPress() {
    if (classListEl.value === "") {          
      exitLinkInputMode();
    } else {
      linkInputEl.value = '';
    }
  }

  function handleLinkInputEnterKeyPress() {
    const container = userState.selectedElement.parentElement;
    if (userState.selectedElement.tagName === 'A') {
      userState.selectedElement.setAttribute('href', linkInputEl.value);

      if (linkInputEl.value === '') {
        userState.selectedElement.children.forEach(child => {
          userState.selectedElement.insertBefore(child, userState.selectedElement);
        })
        userState.selectedElement.remove();
      }
      // TODO: add link on playback, add to undo stack, create new link element like others
      addToRecording([
        'link',
        elements.indexOf(userState.selectedElement),
        userState.selectedElement.getAttribute('href'),
      ])
    } else if (container) {
      if (container.tagName !== 'A') {
        const linkEl = document.createElement('a');
        linkEl.setAttribute('href', linkInputEl.value);
        linkEl.appendChild(userState.selectedElement);
        container.appendChild(linkEl);
        if (elements.indexOf(linkEl) === -1) {
          elements.push(linkEl);
        }
      } else {
        container.setAttribute('href', linkInputEl.value);
      }
    } else {
      const linkEl = document.createElement('a');
      linkEl.setAttribute('href', linkInputEl.value);
      linkEl.appendChild(userState.selectedElement);
      document.body.appendChild(linkEl);
      if (elements.indexOf(linkEl) === -1) {
        elements.push(linkEl);
      }
    }
    exitLinkInputMode();
  }

  function handleSearchEscapeKeyPress() {
    if (searchEl.value === "") {          
      exitSearchMode();
    } else {
      searchEl.value = '';
    }
  }

  function handleTab(e) {
    e.preventDefault();
    if (e.shiftKey) {
      selectNextElement(-1);
    } else {      
      selectNextElement(1);
    }
  }

  function handleArrowKeyPress(e) {
    if (!userState.isScrollMode) {
      e.preventDefault();
    }
    if (e.altKey) {
      duplicateElement(userState.selectedElement, userState.activeContainer, e.key);
      return;
    }
    if (
      userState.activePropName.includes("grid-row") &&
      (e.key === "ArrowLeft" || e.key === "ArrowRight")
    ) {
      setActiveProp('cs')
      // userState.activePropName = "grid-column-start";
    } else if (
      userState.activePropName.includes("grid-column") &&
      (e.key === "ArrowUp" || e.key === "ArrowDown")
    ) {
      setActiveProp('rs')
    }
    let delta = 0.3;
    if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
      delta = -0.3;
    }
    if (userState.activePropName.includes("grid-row") || userState.activeProp.enumList) {
      delta *= -1;
    }
    updateStyleProp(delta);
  }

  function handleKeyUp(e) {
    userState.isShiftKey = e.shiftKey;
    userState.isAltKey = e.altKey;
    if (!userState.isShiftKey) {
      bodyEl.classList.remove('App--isScrollMode');
      userState.isScrollMode = false;
    }
    if (userState.isRecording && userState.selectedElement && userState.isEditMode) {
      addToRecording(['type', elements.indexOf(userState.selectedElement), userState.selectedElement.innerHTML])
      updateUndoStack({
        type: 'type',
        el: userState.selectedElement,
        value: userState.selectedElement.innerHTML
      })
    }

    redrawGrid();
  }

  function handleViewChange() {
    if (!userState.isXrayMode && !userState.isVisualMode) {
      userState.isVisualMode = true;
      bodyEl.classList.add("App--isVisualMode");
    } else if (!userState.isXrayMode && userState.isVisualMode) {
      userState.isXrayMode = true;          
      bodyEl.classList.add("App--isXrayMode");
    } else if (userState.isXrayMode && userState.isVisualMode) {
      userState.isVisualMode = false;          
      bodyEl.classList.remove("App--isVisualMode");
    } else if (userState.isXrayMode && !userState.isVisualMode) {
      userState.isXrayMode = false; 
      bodyEl.classList.remove("App--isXrayMode");
    }
  }

  function handlePaste(e) {
    // cancel paste
    if (userState.isSearchMode || userState.isClassListMode || userState.isLinkInputMode) return;
    e.preventDefault();

    const pastedText = (e.originalEvent || e).clipboardData.getData('text/plain');
    const selection = window.getSelection();
    const selectionStartIndex = Math.min(selection.focusOffset, selection.baseOffset);
    const selectionEndIndex = Math.max(selection.focusOffset, selection.baseOffset);
    const selecedCharCount = selectionEndIndex - selectionStartIndex;
    selection.deleteFromDocument();
    const range = selection.getRangeAt(0);
    const el = e.target;
    const leftText = el.innerText.substring(0, range.endOffset)
    const rightText = el.innerText.substring(range.endOffset)
    el.innerText = `${leftText}${pastedText}${rightText}`;
    el.querySelectorAll('br').forEach((br) => {
      br.remove();
    })
    
    setCurrentCaretPosition(leftText.length + pastedText.length)
  }
  
  function handleMouseDown(e) {
    userState.isDragging = true;    
    userState.mouseStartX = e.pageX;
    userState.mouseStartY = e.pageY;
    window.addEventListener('mouseup', handleMouseUp); 
  }
  
  function handleMouseMove(e) {
    userState.mouseX = e.pageX;
    userState.mouseY = e.pageY;
    userState.mouseStartX = e.pageX;
    userState.mouseStartY = e.pageY;
  }
  
  function handleMouseUp(e) {
    userState.isDragging = false;
    userState.mouseX = e.pageX;
    userState.mouseY = e.pageY;
    userState.mouseStartX = e.pageX;
    userState.mouseStartY = e.pageY;
    if (window.getSelection()) {
      console.log(window.getSelection())
    }
    window.removeEventListener('mouseup', handleMouseUp);    
  }

  // TEXT EDITING FUNCTIONS

  function addLineBreak(e) {
    e.preventDefault();
    if (e.shiftKey) {
      document.execCommand('insertHTML', false, '<br>');
    } else {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const el = e.target;
      const leftText = el.innerText.substring(0, range.endOffset)
      const rightText = el.innerText.substring(range.endOffset)
      createNewElement('p', userState.activeContainer, rightText)
      el.innerText = leftText;
    }
  }

  function createRange(node, chars, range) {
    if (!range) {
      range = document.createRange()
      range.selectNode(node);
      range.setStart(node, 0);
    }

    if (chars.count === 0) {
      range.setEnd(node, chars.count);
    } else if (node && chars.count > 0) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.length < chars.count) {
          chars.count -= node.textContent.length;
        } else {
          range.setEnd(node, chars.count);
          chars.count = 0;
        }
      } else {
        for (var lp = 0; lp < node.childNodes.length; lp++) {
          range = createRange(node.childNodes[lp], chars, range);

          if (chars.count === 0) {
            break;
          }
        }
      }
   } 

   return range;
  };
  
  function setCurrentCaretPosition(chars) {
    if (chars >= 0) {
      var selection = window.getSelection();

      range = createRange(userState.selectedElement, { count: chars });

      if (range) {
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  // State change functions

  function setSelectedElement(el) {
    if (!el.contentEditable) {
      exitEditMode()
    }
    userState.multiSelectedElementList.forEach((el) => {
      el.classList.remove('AppElement--isMultiSelected')
    })
    userState.multiSelectedElementList = [];
    if (elements.indexOf(el) === -1) {
      alert('selected element index is -1')
      console.log(el);
      console.log(elements)
    }
    if (userState.isRecording) {
      addToRecording(['select', elements.indexOf(el)])
    }
    if (userState.selectedElement) {
      userState.selectedElement.blur()
      userState.selectedElement.classList.remove(
        `AppElement--${userState.activePropName}`
      );
    }
    document.querySelectorAll(".AppElement--isSelected")?.forEach((el) => {
      el.classList.remove("AppElement--isSelected");
    });
    userState.selectedElement = el;
    document.querySelector(".AppElement--isSelected")?.classList.remove("AppElement--isSelected");
    el.classList.add("AppElement--isSelected");
    el?.focus();
    userState.selectedElement.classList.add(
      `AppElement--${userState.activePropName}`
    );
    updateStyleDisplay();
    if (userState.selectedElement?.classList.contains("container")) {
      userState.activeContainer = userState.selectedElement;
    } else {
      userState.activeContainer = userState.selectedElement.closest(".container");
    }
    redrawGrid()
    scrollIntoView(el);
  }

  function setMultiSelectedElement(el) {
    if (elements.indexOf(el) === -1) {
      alert('multi select index is -1')
      console.log(el);
      console.log(elements)
    }
    if (userState.isRecording) {
      addToRecording(['multi-select', elements.indexOf(el)])
    }
    if (userState.multiSelectedElementList.includes(el)) {
      userState.multiSelectedElementList.splice(userState.multiSelectedElementList.indexOf(el),1);
      el.classList.remove("AppElement--isMultiSelected");
    } else {
      userState.multiSelectedElementList.push(el);
      el.classList.add("AppElement--isMultiSelected");
    }
    userState.selectedElement.classList.add(
      `AppElement--${userState.activePropName}`
    );    
    redrawGrid()
  }
  
  function selectNextElement(change) {
    if (userState.isEditMode) {
      const editableElements = Array.from(document.querySelectorAll('[contenteditable=true]'));
      let newIndex = editableElements.indexOf(userState.selectedElement) + change;
      if (newIndex > editableElements.length - 1) {
        newIndex = 0;
      } else if (newIndex < 0) {
        newIndex = editableElements.length - 1;
      }
      setSelectedElement(editableElements[newIndex]);
    } else {
      let newIndex = elements.indexOf(userState.selectedElement) + change;
      if (newIndex >= elements.length) {
        newIndex = 0;
      } else if (newIndex < 0) {
        newIndex = elements.length - 1;
      }
      setSelectedElement(elements[newIndex]);
    }
  }

  function scrollIntoView(el) {
    const elTop = el.getBoundingClientRect().top;
    const elBottom = el.getBoundingClientRect().bottom;
    if (elTop > windowState.height) {      
      window.scrollTo({
        top: elTop,
        left: 0
      });
    } else if (elBottom < 0) {
      window.scrollTo({
        top: elBottom - el.getBoundingClientRect().height,
        left: 0
      });
    }
  }

  function resetActivePropValue() {
    if (userState.activeProp.axis) {
      setMultipleSideProps(userState.selectedElement, userState.activePropName, "", userState.activeProp.axis)
    } else {
      setStyleProperty(
        userState.selectedElement,
        userState.activePropName,
        ""
      );
    }
    updateStyleDisplay();
    redrawGrid();
  }

  async function setActiveProp(key, propIndex) {
    exitEditMode();
    if (key === "ff") {
      if (!userState.hasFontsLoaded) await loadFonts()
    }

    userState.selectedElement?.classList.remove(
      `AppElement--${userState.activePropName}`
    );
    let prop = keyToProp[key.toLowerCase()];
    userState.activePropParamIndex = propIndex || 0;
    if (propIndex <= prop.name.length) {
      userState.activePropParamIndex = propIndex - 1;
    } else if (!propIndex) {
      // not sure why this is empty
    }

    if (Array.isArray(prop.name)) {
      userState.activePropName = prop.name[userState.activePropParamIndex]
    } else {
      userState.activePropName = prop.name;
    }
    userState.activeProp = prop;
    if (userState.selectedElement) {
      userState.selectedElement.classList.add(
        `AppElement--${userState.activePropName}`
      );
      updateEnumList(userState.activeProp.enumList)
    }

    if (userState.activeProp.showsGrid) {
      bodyEl.classList.add("App--isGridActive");
    } else {
      bodyEl.classList.remove("App--isGridActive");
    }

    if (userState.activePropName === 'border-radius') {
      [...userState.multiSelectedElementList, userState.selectedElement].forEach((el) => {
        userState.activeProp.max = Math.max(userState.activeProp.max, el.getBoundingClientRect().height, el.getBoundingClientRect().width)
      })
    }
    userState.activeKey = key.toLowerCase();
    updateStyleDisplay();
  }

  function updateStyleProp(delta) {
    const roundedDelta = delta.toFixed(5) / 1;
    const now = performance.now();
    const elapsed = now - userState.lastWheelTimestamp;
    registerViewChange();
    const propName = userState.activePropName;
    const propValue = userState.selectedElement.style[propName];
    const computedStyle = getComputedStyle(userState.selectedElement);
    const computedValue = computedStyle.getPropertyValue(`${propName}`);
    let val = propValue ? propValue.trim().split(" ") : computedValue.trim().split(" ");
    if (userState.activeProp.axis === "x" && val.length > 1) {
      val = val[1];
    } else {
      val = val[0] || '';
    }
    let unit = val.match(unitRegex) || '';
    let enumList = userState.activeProp.enumList; // words not numbers
    if (enumList) {
      unit = '';
    } else if (unit.length === 0) {
      val = computedStyle.getPropertyValue(`${propName}`);
      unit = val.match(unitRegex) || '';
    }
    if (unit.length > 0) {
      unit = unit[0]
    }
    if (propName === "letter-spacing" && (val === "initial" || val === "normal")) {
      val = "0"
      unit = "vw"
    }
    if (propName === "z-index" && (val === "auto")) {
      val = "0"
    }
    let newVal;
    if (propName === "--box-shadow" || propName === "--text-shadow") {
      newVal = getShadow(roundedDelta)
      unit = '';
    } else if (propName === "--background-linear-gradient") {
      newVal = getLinearGradient(roundedDelta)
      unit = '';
    } else if (propName === "--color" || propName === "--background" || propName === "--border-color") {
      newVal = getHSLA(roundedDelta);
      unit = '';
    } else if (propName === "--transform") {
      newVal = getTransform(roundedDelta);
      unit = '';
    } else {
      if (userState.activeProp.increment) {
        const increment = userState.activeProp.increment;
        if (userState.activeProp.step) {
          delta = delta > 0 ? increment : -increment;          
        } else {
          delta *= increment;
        }
      }
      let oldValFloat = parseFloat(val, 100);
      if (propName === "line-height") {
        oldValFloat =
          oldValFloat /
          parseFloat(computedStyle.getPropertyValue("font-size"), 10);
        delta *= 0.01;
        unit = '';
      }
      if (unit.includes("v") || unit === "%" || unit.includes("em")) {
        delta *= 0.05;
      }
      let newValFloat = clipValue(oldValFloat + delta);
      newVal = `${newValFloat}`;
      if (
        propName.indexOf("margin") !== -1 ||
        propName.indexOf("padding") !== -1 ||
        propName.indexOf("font-size") !== -1 ||
        propName.indexOf("width") !== -1 ||
        propName.indexOf("height") !== -1
      ) {
        if (userState.isAltKey) {
          inc = 4;
          if (elapsed < inc * 20) return;
          userState.lastWheelTimestamp = now;
          newVal = oldValFloat - (oldValFloat % inc) + (delta > 0 ? inc : -inc);
        }
      }
    }

    if (enumList || userState.activeProp.step) {
      if (elapsed < LIST_SCROLL_PAUSE) return;
      userState.lastWheelTimestamp = now;
    }
    if (enumList) {
      newVal = getNewValFromList(enumList, delta, computedStyle);
    }
    newVal += unit;

    if (userState.activeProp.axis) {
      setMultipleSideProps(userState.selectedElement, propName, `${newVal}`, userState.activeProp.axis)
    } else {
      setStyleProperty(userState.selectedElement, `${propName}`,`${newVal}`)
    }

    if (propName.includes("grid-column")) {
      const gridColumnEnd = parseInt(
        computedStyle.getPropertyValue("grid-column-end")
      );
      const gridColumnStart = parseInt(
        computedStyle.getPropertyValue("grid-column-start")
      );

      if (gridColumnEnd - gridColumnStart < 1) {        
        setStyleProperty(
          userState.selectedElement,
          `grid-column-start`,
          `${newVal}`
        );
        setStyleProperty(
          userState.selectedElement,
          `grid-column-end`,
          `${Number(newVal) + 1}`
        );
      }
    } else if (propName.includes("grid-row")) {
      const gridRowEnd = parseInt(
        computedStyle.getPropertyValue("grid-row-end")
      );
      const gridRowStart = parseInt(
        computedStyle.getPropertyValue("grid-row-start")
      );
      if (gridRowEnd - gridRowStart < 1) {
        setStyleProperty(
          userState.selectedElement,
          `grid-row-start`,
          `${newVal}`
        );
        setStyleProperty(
          userState.selectedElement,
          `grid-row-end`,
          `${Number(newVal) + 1}`
        );
      }
    }
    redrawGrid();
    updateEnumList(enumList);
    userState.AppstyleDisplayTimeout = setTimeout(() => {
      updateStyleDisplay();
    },100)
    scrollIntoView(userState.selectedElement);
  }

  function updateEnumList(enumList) {
    if (!enumList) {
      displayEnumListEl.innerHTML = '';
      bodyEl.classList.remove('App--isEnumDisplayed');
      return;
    }
    bodyEl.classList.add('App--isEnumDisplayed');
    clearTimeout(userState.inspectStyleDisplayedTimeout);
    userState.inspectStyleDisplayedTimeout = setTimeout(() => {
      bodyEl.classList.remove('App--isEnumDisplayed');
    }, 900)
    const newList = enumList[0] !== displayEnumListEl.firstChild?.innerText;
    let activeEnumIndex = 0;
    if (newList) {
      displayEnumListEl.innerHTML = '';
    }
    let activeClass = '';
    enumList.forEach((value, i) => {
      if (getComputedStyle(userState.selectedElement).getPropertyValue(userState.activePropName).trim().replaceAll(',',' ').replaceAll('"', '') === value) {
        activeClass="AppStyleDisplay__enum--isActive"
        displayEnumListEl.style.transform = `translateY(${i * -39}px)`
        activeEnumIndex = i;
      } else {
        activeClass = '';
      }
      if (newList) {
        displayEnumListEl.innerHTML += `<li class="AppStyleDisplay__enum ${activeClass}">${value}</li>`;
      }
    });
    displayEnumListEl.querySelectorAll('.AppStyleDisplay__enum').forEach((el, i) => {
      if (i === activeEnumIndex) {
        el.classList.add('AppStyleDisplay__enum--isActive')
      } else {
        el.classList.remove('AppStyleDisplay__enum--isActive')
      }
    })
  }

  function updateElementsUnderCursorList(elementsUnderCursorList) {
    if (!elementsUnderCursorList) {
      displayElementsUnderCursorListEl.innerHTML = '';
      bodyEl.classList.remove('App--isElementsUnderCursorListDisplayed');
      return;
    }
    bodyEl.classList.add('App--isElementsUnderCursorListDisplayed');
    clearTimeout(userState.inspectStyleDisplayedTimeout);
    userState.inspectStyleDisplayedTimeout = setTimeout(() => {
      bodyEl.classList.remove('App--isElementsUnderCursorListDisplayed');
    }, 900)
    const newList = elementsUnderCursorList[0] !== displayElementsUnderCursorListEl.firstChild?.innerText;
    let activeElementIndex = 0;
    if (newList) {
      displayElementsUnderCursorListEl.innerHTML = '';
    }
    let activeClass = '';
    elementsUnderCursorList.forEach((element, i) => {
      if (userState.selectedElement === element) {
        activeClass="AppStyleDisplay__elementsUnderCursor--isActive"
        displayElementsUnderCursorListEl.style.transform = `translateY(${i * -39}px)`
        activeElementIndex = i;
      } else {
        activeClass = '';
      }
      if (newList) {
        displayElementsUnderCursorListEl.innerHTML += `<li class="AppStyleDisplay__elementsUnderCursor ${activeClass}">${element.tagName}</li>`;
      }
    });
    displayElementsUnderCursorListEl.querySelectorAll('.AppStyleDisplay__elementsUnderCursor').forEach((el, i) => {
      if (i === activeElementIndex) {
        el.classList.add('AppStyleDisplay__elementsUnderCursor--isActive')
      } else {
        el.classList.remove('AppStyleDisplay__elementsUnderCursor--isActive')
      }
    })
  }
  
  function updateInspectStyleList() {
    bodyEl.classList.add('App--isInspectStyleDisplayed');
    displayInspectStyleListEl.innerHTML = '';
    const styles = userState.selectedElement.getAttribute('style');
    if (!styles) return;
    const styleArray = styles.split(";").filter(Boolean); // Remove empty strings

    const sortedStyles = styleArray.sort((a, b) => {
      const aKey = a.split(":")[0].trim();
      const bKey = b.split(":")[0].trim();
      
      if (aKey < bKey) {
        return -1;
      }
      
      if (aKey > bKey) {
        return 1;
      }
      
      return 0;
    });

    sortedStyles.forEach((value) => {
      const style = value.split(':');
      if (style[0]) {
        displayInspectStyleListEl.innerHTML += `<li class="AppStyleDisplay__inspectStyleProp"><span class="AppStyleDisplay__inspectStylePropKey">${style[0]}</span>: <span class="AppStyleDisplay__inspectStylePropValue">${style[1]}</span></li>`;
      }
    });
  }

  function setStyleProperty(el, propName, newVal) {
    if (userState.isRecording) {
      // if (!axis) {
      //   addToRecording(['style', elements.indexOf(el), propName, getComputedStyle(userState.selectedElement).getPropertyValue(propName)])
      // }
      addToRecording(['style', elements.indexOf(el), propName, newVal])
    }
    if (isNaN(newVal) && !newVal.match(/\d/) && userState.isAnimating) {
      userState.isListDelay = true;
      setTimeout(() => {
        userState.isListDelay = false;
      }, 100)
    }
    // if (el === userState.selectedElement) {
      const undoable = [];
      undoable.push({
        type: 'style',
        el: userState.selectedElement,
        propName,
        value: getComputedStyle(userState.selectedElement).getPropertyValue(propName)
      })
      el.style.setProperty(
        propName,
        newVal
      );

      if (userState.multiSelectedElementList.length > 0) {
        userState.multiSelectedElementList.forEach((multiEl) => {
          undoable.push({
            type: 'style',
            el: multiEl,
            propName,
            value: getComputedStyle(multiEl).getPropertyValue(propName)
          })
          multiEl.style.setProperty(
            propName,
            newVal
          );
        })
        updateUndoStack(undoable);
      } else {
        updateUndoStack(...undoable);
      }

      if (propName.substring(0, 2) === '--') {
        if (newVal === "") {
          
        } else if (propName === '--backdrop-filter') {
          newVal = `blur(var(--backdrop-filter))`
        } else if (propName === '--filter') {
          newVal = `blur(var(--filter))`
        } else if (propName === '--background') {
          newVal = `var(--background-linear-gradient, var(--background))`
        } else if (propName === '--border-color') {
          newVal = `var(--border-color)`
        } else if (propName === '--box-shadow') {
          newVal = `var(--box-shadow)`
        } else if (propName === '--text-shadow') {
          newVal = `var(--text-shadow)`
        } else if (propName === '--transform') {
          newVal = `var(--transform)`
        }
        el.style.setProperty(
          propName.substring(2),
          newVal
        );

        userState.multiSelectedElementList.forEach((multiEl) => {
          multiEl.style.setProperty(
            propName.substring(2),
            newVal
          );
        })
      }
    // }
  }

  function updateStyleDisplay() {
    if (!userState.selectedElement) return;
    if (userState.isInspectMode) {
      updateInspectStyleList()
    }
    const propName = userState.activePropName;
    registerViewChange();

    if (userState.isEditMode) return;
    displayPropEl.innerText = `${propName}`;
    const el = userState.selectedElement;
    let text = " selected";
    if (userState.selectedElement) {
      text = getComputedStyle(el).getPropertyValue(`${userState.activePropName}`).trim() || userState.activeProp.initialValue;
    }

    let valuesArray = [text];
    if (String(text).includes(' ')) {
      valuesArray = text.split(' ');
    } else if (String(text).includes(',')) {
      valuesArray = text.split(',');
    }
    displayValueEl.innerHTML = '';
    valuesArray.forEach((value, i) => {
      const className = i === userState.activePropParamIndex ? "AppStyleDisplay__value--isActive" : '';
      // displayValueEl.innerHTML += `<div class="${className}">${value}</div>`
    })

    displayElementEl.innerHTML = userState.selectedElement.nodeName

    if (
      propName === "--color" ||
      propName === "--border-color" ||
      propName === "--background"
    ) {
      if (userState.activePropParamIndex === 0) {
        displayChannelEl.innerText = `hue`;
      } else if (userState.activePropParamIndex === 1) {
        displayChannelEl.innerText = `saturation`;
      } else if (userState.activePropParamIndex === 2) {
        displayChannelEl.innerText = `level`;
      } else if (userState.activePropParamIndex === 3) {
        displayChannelEl.innerText = `alpha`;
      }
    } else if (
      propName === "--transform"
    ) {
      if (userState.activePropParamIndex === 0) {
        if (userState.isActivePropParamIndexAlt) {
          displayChannelEl.innerText = `skewX`;
        } else {
          displayChannelEl.innerText = `perspective`;
        }
      } else if (userState.activePropParamIndex === 1) {
        if (userState.isActivePropParamIndexAlt) {
          displayChannelEl.innerText = `skewY`;
        } else {
          displayChannelEl.innerText = `translateX`;
        }
      } else if (userState.activePropParamIndex === 2) {
        displayChannelEl.innerText = `translateY`;
      } else if (userState.activePropParamIndex === 3) {
        displayChannelEl.innerText = `translateZ`;
      } else if (userState.activePropParamIndex === 4) {
        displayChannelEl.innerText = `rotateX`;
      } else if (userState.activePropParamIndex === 5) {
        displayChannelEl.innerText = `rotateY`;
      } else if (userState.activePropParamIndex === 6) {
        displayChannelEl.innerText = `rotateZ`;
      } else if (userState.activePropParamIndex === 7) {
        displayChannelEl.innerText = `scaleX`;
      } else if (userState.activePropParamIndex === 8) {
        displayChannelEl.innerText = `scaleY`;
      }
    } else if (propName === "--box-shadow" || propName === "--text-shadow") {
      if (userState.activePropParamIndex === 0) {
        if (userState.isActivePropParamIndexAlt) {
          displayChannelEl.innerText = `hue`;
        } else {
          displayChannelEl.innerText = `x`;
        }
      } else if (userState.activePropParamIndex === 1) {
        if (userState.isActivePropParamIndexAlt) {
          displayChannelEl.innerText = `saturation`;
        } else {
          displayChannelEl.innerText = `y`;
        }
      } else if (userState.activePropParamIndex === 2) {
        if (userState.isActivePropParamIndexAlt) {
          displayChannelEl.innerText = `level`;
        } else {
          displayChannelEl.innerText = `blur`;
        }
      } else if (userState.activePropParamIndex === 3) {
        if (userState.isActivePropParamIndexAlt) {
          displayChannelEl.innerText = `alpha`;
        } else {
          displayChannelEl.innerText = `spread`;
        }
      }
    } else if (propName === "filter" || propName === "backdrop-filter") {
      displayChannelEl.innerText = `blur`;
    } else {
      displayChannelEl.innerText = ``;
    }

    if (displayChannelEl.innerText === '') {
      bodyEl.classList.remove('App--isPropChannelDisplayed')
    } else {
      bodyEl.classList.add('App--isPropChannelDisplayed')
    }
  }
  
  function setMultipleSideProps(el = userState.selectedElement, prop = userState.activePropName, newVal, axis = null) {
    let width = "";
    if (prop === "border-width") {
      width = "-width";
      prop = "border";
    }
    // setStyleProperty(
    //   el,
    //   `${prop}${width}`,
    //   `${newVal}`
    // );
    if (axis !== "x") {
      setStyleProperty(
        el,
        `${prop}-top${width}`,
        `${newVal}`
      );
      setStyleProperty(
        el,
        `${prop}-bottom${width}`,
        `${newVal}`
      );
    }    
    if (axis !== "y") {
      setStyleProperty(
        el,
        `${prop}-right${width}`,
        `${newVal}`
      );
      setStyleProperty(
        el,
        `${prop}-left${width}`,
        `${newVal}`
      );
    }
  }

  // Element creation functions
  
  function duplicateElement(element, container, key) {
    if (element === bodyEl) return;
    const newElement = element.cloneNode(true);
    if (element.classList.contains('container')) {
      container = element.parentNode;
    }
    userState.firstKey = undefined;
    let rowStart = parseInt(getComputedStyle(element).getPropertyValue("grid-row-start"));
    let rowEnd = parseInt(getComputedStyle(element).getPropertyValue("grid-row-end"));
    let columnStart = parseInt(getComputedStyle(element).getPropertyValue("grid-column-start"));
    let columnEnd = parseInt(getComputedStyle(element).getPropertyValue("grid-column-end"));      
    Array.from(newElement.children).forEach((child) => {
      if (!child.classList.contains('AppGridDisplay__line') && !child.classList.contains('AppGridDisplay')) {
        elements.splice(elements.length - 1, 0, child);
      }
    })
    if (userState.isRecording) {
      addToRecording(['duplicate', elements.indexOf(element), elements.indexOf(container),key])
    }
    container.appendChild(newElement);
    elements.splice(elements.length - 1, 0, newElement);
    setSelectedElement(newElement);
    if (key === "ArrowDown") {
      setStyleProperty(newElement, "grid-row-start", rowStart + 1);
      setStyleProperty(newElement, "grid-row-end", rowEnd + 1);
      setActiveProp('rs')            
    } else if (key === "ArrowUp") {
      setStyleProperty(newElement, "grid-row-start", rowStart - 1);
      setStyleProperty(newElement, "grid-row-end", rowEnd - 1);
      setActiveProp('rs')      
    } else if (key === "ArrowRight") {
      setStyleProperty(newElement, "grid-column-start", columnEnd);
      setStyleProperty(newElement, "grid-column-end", columnEnd + 1);
      setActiveProp('cs')      
    } else if (key === "ArrowLeft") {
      setStyleProperty(newElement, "grid-column-start", columnStart - 1);
      setStyleProperty(newElement, "grid-column-end", columnEnd - 1);
      setActiveProp('cs')
    }
    updateUndoStack({
      type: 'new',
      el: newElement,
    })
    updateStyleDisplay();
    redrawGrid();
    moveAppToTopOfDom();

    return newElement;
  }

  function createNewElement(key, container = userState.activeContainer || bodyEl, text, src) {
    userState.firstKey = undefined;
    if (!keyToNewElement.hasOwnProperty(key)) return;
    const newElementType = keyToNewElement[key.toLowerCase()];
    const newElement = document.createElement(newElementType);
    let isWrapped;
    if (text) {
      newElement.innerText = text;
    }
    if (key === "i") {
      setActiveProp('w');
      newElement.classList.add("image");
      container.appendChild(newElement);      
    } if (key === "v") {
      setActiveProp('w');
      newElement.classList.add("video");
      container.appendChild(newElement);      
    } else if (key === "d") {
      newElement.classList.add("div");
      userState.activeContainer = newElement;
      container.appendChild(newElement);
    } else if (key === "s") {
      newElement.classList.add("container");
      bodyEl.appendChild(newElement);
      userState.activeContainer = newElement;
      newElement.appendChild(containerGridEl.cloneNode(false));
    } else if (key === "w") {
      if (userState.selectedElement && userState.selectedElement !== bodyEl) {
        isWrapped = true;
        wrapElement(newElement);
      } else {
        return;
      }
    } else {
      if (container) {      
        container.appendChild(newElement);
      } else {
        // create a container
        createNewElement("s")
        userState.activeContainer.appendChild(newElement);
      }
    }    
    let lastRow = 0;
    let rowEnd = 0;
    if (container) {
      Array.from(container.children).filter(el => elements.includes(el)).forEach((child) => {
        const computedStyle = getComputedStyle(child);
        rowEnd = parseInt(computedStyle.getPropertyValue("grid-row-end"));
        if (rowEnd > lastRow) {
          lastRow = rowEnd;
        }
      })
    }
    elements.splice(elements.length - 1, 0, newElement);
    // TODO Allow spaces in button
    // if (newElementType === "button") {
    //   const newSpan = document.createElement('div');
    //   newElement.appendChild(newSpan);
    //   elements.splice(elements.length - 1, 0, newSpan);      
    // }
    
    setSelectedElement(newElement)
    if (userState.selectedElement.classList.contains("image")) {
      createNewImage(src)
    } else if (userState.selectedElement.classList.contains("video")) {
      createNewVideo(src)
    }
    updateStyleDisplay();
    if (key !== "w") {
      setStyleProperty(newElement, "grid-row-start", lastRow + 1);
      setStyleProperty(newElement, "grid-row-end", lastRow + 1);
      setSelectedElement(newElement)
      enterEditMode();
    }
    if (userState.isRecording) {
      addToRecording(['new', key, elements.indexOf(container)])
    }
    updateUndoStack({
      type: 'new',
      el: newElement,
      container: container,
      isWrapped: isWrapped,
    })
    moveAppToTopOfDom();
    redrawGrid();
  }

  function createNewImage(src) {
    const searchTerm = userState.isAnimating ? src : prompt("Insert an image of a/an");
    const imgElement = userState.selectedElement;

    if (src) {
      imgElement.style.backgroundImage = `url(${src})`;
    } else {
      if (searchTerm.indexOf('https') !== -1) {
        imgElement.style.backgroundImage = `url(${searchTerm})`;
        recording[recording.length - 2].push(searchTerm)
      } else {
        fetch(`${'https://source.unsplash.com/random/1600xauto/?'}${searchTerm}`).then(
          (response) => {
            if (elements.includes(imgElement)) {            
              const url = response.url;
              imgElement.style.backgroundImage = `url(${url})`;
              for (let i = recording.length - 1; i >= 0; i--) {
                if (recording[i][0] === 'new' && recording[i][1] === 'i') {
                  recording[i].push(url);
                  break;
                }
              }
            }
          }
          ).catch(function() {
            imgElement.style.backgroundImage = `url(${defaultImage})`;
          });
      }
    }
  }

  function createNewVideo(src) {
    const searchTerm = userState.isAnimating ? src : prompt("Insert a link to a video");
    const videoElement = userState.selectedElement;

    if (searchTerm.indexOf('youtube') !== -1) {
      const videoId = searchTerm.substring(searchTerm.indexOf("v=") + 2)
      videoElement.src = `https://www.youtube.com/embed/${videoId}`
      recording[recording.length - 2].push(searchTerm)
    }
  }

  function wrapElement(newElement) {
    newElement.classList.add("container");
    const sourceStyles = userState.selectedElement.style;
    const container = userState.selectedElement.parentNode;
    container.insertBefore(newElement, userState.selectedElement);
    newElement.appendChild(userState.selectedElement);
    if (userState.multiSelectedElementList.length > 0) {
      // TODO if a parent of the selectedElement is also selected, the newElement (wrapper) should be inserted before the outermost parent
      userState.multiSelectedElementList.forEach((el) => {
        try {
          newElement.appendChild(el)
        } catch (error) {
          
        }
      })
    }
    
    // Keep the wrapper in the same grid position
    Array.from(sourceStyles).forEach((style) => {
      if (style.includes('grid')) {
        const styleValue = sourceStyles.getPropertyValue(style);
        newElement.style.setProperty(style, styleValue);
      }
    })
    resetElementGridProps(userState.selectedElement)
    // userState.selectedElement.style = '';
    userState.activeContainer = newElement;
    newElement.appendChild(containerGridEl.cloneNode(false));
    scrollIntoView(newElement);
  }
  
  function deleteElement(el, deleteChildren) {
    if (el === bodyEl) return;

    const index = elements.indexOf(el);
    if (userState.isRecording) {
      addToRecording(['delete', index, deleteChildren]);
    }
    updateUndoStack({
      type: 'delete',
      el: el,
      index: index,
      container: el.parentNode,
      deleteChildren: deleteChildren,
    })

    elements.splice(index, 1);
    const children = Array.from(el.children).filter((el) => !el.classList.contains('AppGridDisplay'));
    if (children.length === 0 || deleteChildren || confirm("Delete children?")) {
      el.remove();
      for(let i = elements.length - 1; i >= 0; i--) {
        if (el.contains(elements[i])) {
          elements.splice(i, 1);
        }
      }
    } else {
      el.replaceWith(...children);
    }
    redrawGrid();
    selectNextElement(1);
  }

  async function loadFonts() {
    userState.hasFontsLoaded = true;
    const textStyle = document.createElement("style");
    try {
      const availableFonts = await window.queryLocalFonts();
      for (const fontData of availableFonts) {
        if (!fontData.fullName.match(/[:,+,.,0-9]/)) {
          keyToProp.ff.enumList.push(fontData.fullName);

          textStyle.textContent += `
          @font-face {
            font-family: ${fontData.fullName};
            src: local("${fontData.postscriptName}");
          }`;
        }
      }
    } catch (err) {
      console.error(err.name, err.message);
    }
    bodyEl.appendChild(textStyle)
  }

  function getNewValFromList(propArray, delta, computedStyle) {
    const currentValue = computedStyle
      .getPropertyValue(`${userState.activePropName}`)
      .replaceAll('"', "");
    let index = propArray.indexOf(currentValue) + (delta > 0 ? 1 : -1);
    if (index >= propArray.length) {
      index = 0;
    } else if (index < 0) {
      index = propArray.length - 1;
    }
    return propArray[index];
  }

  function getHSLA(delta) {
    let colorVal = `${getComputedStyle(userState.selectedElement).getPropertyValue(
      `${userState.activePropName}`
    )}`.trim();
    if (colorVal === "transparent") {
      colorVal = `${getComputedStyle(container).getPropertyValue(
        `${userState.activePropName}`
      )}`.trim()
      if (colorVal === "transparent") {
        colorVal = `${getComputedStyle(bodyEl).getPropertyValue(
          `${userState.activePropName}`
        )}`.trim()
      }
      if (colorVal === "transparent") {
        colorVal = keyToProp['bc'].initialValue;
      }
    }
    if (colorVal.includes('rgb')) {
      colorVal = rgbToHSLA(colorVal)  
    }
    const startIndex = colorVal.indexOf("(") + 1;
    const endIndex = colorVal.indexOf(")");
    let colorProps = colorVal.substring(startIndex, endIndex).split(",");
    if (userState.activePropParamIndex === colorProps.length - 1) {
      delta *= 0.01;
    }
    colorProps.forEach((prop, i) => {
      const oldVal = parseFloat(prop,100);
      let newVal = oldVal;
      if (userState.activePropParamIndex === i) {
        newVal += delta; 
      }
      colorProps[i] = newVal
    })
    let h = (colorProps[0] % 360).toFixed(5) / 1;
    let s = Math.max(Math.min(100, colorProps[1]), 0).toFixed(5) / 1;
    let l = Math.max(Math.min(100, colorProps[2]), 0).toFixed(5) / 1;
    let a = Math.max(Math.min(1, colorProps[3]), 0).toFixed(5) / 1;
    return `hsla(${h},${s}%,${l}%,${a})`;
  }

  function rgbToHSLA(colorVal) {
    const startIndex = colorVal.indexOf("(") + 1;
    const endIndex = colorVal.indexOf(")");
    let colorProps = colorVal.substring(startIndex, endIndex).split(",");
    let r = colorProps[0]/255;
    let g = colorProps[1]/255;
    let b = colorProps[2]/255;
    let a = colorProps[3] || 1;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    const lVal = (100 * (2 * l - s)) / 2;
    const sVal = 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0);
    const hVal = 60 * h < 0 ? 60 * h + 360 : 60 * h
    return `hsla(${hVal.toFixed(5) / 1}deg, ${sVal.toFixed(5) / 1}%, ${lVal.toFixed(5) / 1}%, ${a})`
  }
  
  function getLinearGradient(delta) {
    let val = `${getComputedStyle(userState.selectedElement)
      .getPropertyValue(`${userState.activePropName}`)
      .trim()}`;
    if (val === '') {
      val = userState.activeProp.initialValue;
    }
    const startIndex = val.indexOf("(") + 1;
    const endIndex = val.lastIndexOf(")");
    let props = val.substring(startIndex, endIndex).split(",");
    console.log(userState.activePropParamIndex, userState.activePropParamIndex)
    if (userState.isActivePropParamIndexAlt) {
      // const color = getHSLA(delta);
      // props[1] = color || `var(--color)`;
    } else if (userState.activePropParamIndex === 0) {
      let newVal = `${parseFloat(props[0],100) + delta}deg`;
      props[0] = newVal
    } else {
      // props[userState.activePropParamIndex] = `${
      //   newVal
      // }%`;
    }
    return `linear-gradient(${props.join(",")})`;
  }

  function getShadow(delta) {
    const val = `${getComputedStyle(userState.selectedElement)
      .getPropertyValue(`${userState.activePropName}`)
      .trim()}`;
    // console.log(val)
    const unit = 'px';
    const props = val.split(" ");
    let newVal = parseFloat(props[userState.activePropParamIndex + 1], 10).toFixed(5) / 1 + delta;
    if (userState.activePropParamIndex === 2) {
      newVal = Math.abs(newVal)
    }
    if (userState.isActivePropParamIndexAlt) {
      const color = getHSLA(delta);
      props[0] = color || `var(--color)`;
    } else {
      props[userState.activePropParamIndex + 1] = `${
        newVal
      }${unit}`;
    }
    return props.join(" ");
  }
  
  function getTransform(delta) {
    const transformVal = `${getComputedStyle(userState.selectedElement)
      .getPropertyValue(`${userState.activePropName}`)
      .trim()}`;
    const transformProps = transformVal.split(" ");
    const index = userState.isActivePropParamIndexAlt ? userState.activePropParamIndex + 9 : userState.activePropParamIndex;
    const activeProp = transformProps[index];
    const name = activeProp.substring(0, activeProp.indexOf('('))
    const propVal = activeProp.substring(activeProp.indexOf('(') + 1, activeProp.indexOf(')'));
    const unit = propVal.match(/\D{2,3}/g) || '';
    if (name === "scaleX" || name === "scaleY") {
      delta *= 0.01;
    }
    let val = Math.round((parseFloat(propVal, 100) + delta) * 100) / 100;
    if (userState.isShiftKey) {
      val = Math.round(val);
    }
    transformProps[index] = `${name}(${val}${unit})`;
    let fullTransform = transformProps.join(" ");
    if (!fullTransform.includes('translate')) {
      fullTransform = userState.activeProp.initialValue;
    }
    return fullTransform;
  }

  function resetElementGridProps(element) {
    setStyleProperty(element, "grid-row-start", 1)
    setStyleProperty(element, "grid-row-end", 2)
    setStyleProperty(element, "grid-column-start", 1)
    setStyleProperty(element, "grid-column-end", 2)
  }

  function redrawGrid(container = userState.activeContainer, recursive) {
    if (!container) return;
    if (!recursive) {
      document.querySelectorAll(".AppGridDisplay__line").forEach((line) => {
        // TODO threshold on this. too many and it become unusable
        line.remove();
      });
    }
    const grid = container.querySelector(':scope > .AppGridDisplay')
    if (!grid) return;
    const computedStyle = getComputedStyle(container);
    const rows = computedStyle
      .getPropertyValue("grid-template-rows")
      .split(" ");
    const columns = computedStyle
      .getPropertyValue("grid-template-columns")
      .split(" ");
    const rowGap = parseFloat(computedStyle.getPropertyValue("row-gap"), 10);
    const columnGap = parseFloat(
      computedStyle.getPropertyValue("column-gap"),
      10
    );
    let top = parseFloat(computedStyle.getPropertyValue("padding-top"), 10);
    let bottom =
      parseFloat(computedStyle.getPropertyValue("height"), 10) -
      parseFloat(computedStyle.getPropertyValue("border-bottom-width"), 10) -
      parseFloat(computedStyle.getPropertyValue("border-top-width"), 10) -         
      parseFloat(computedStyle.getPropertyValue("padding-bottom"), 10);
    let left = parseFloat(computedStyle.getPropertyValue("padding-left"), 10);
    let right =
      parseFloat(computedStyle.getPropertyValue("width"), 10) -
      parseFloat(computedStyle.getPropertyValue("padding-right"), 10) -
      parseFloat(computedStyle.getPropertyValue("border-right-width"), 10) -
      parseFloat(computedStyle.getPropertyValue("border-left-width"), 10);
    let width = right - left;
    let height = bottom - top;
    let columnLeft = left;
    let rowTop = top;
    columns.forEach((column) => {
      let columnWidth = column !== "none" ? `${parseFloat(column, 10)}` : parseFloat(width, 10);
      grid.innerHTML += `<div class="AppGridDisplay__line" style="height:${height}px;width:${columnWidth}px;left:${columnLeft}px;top:${top}px;"></div>`;
      columnLeft = Number(columnLeft) + Number(columnWidth);
      columnLeft = Number(columnLeft) + Number(columnGap);
    });
    rows.forEach((row) => {
      let rowHeight = row !== "none" ? `${parseFloat(row, 10)}` : parseFloat(height, 10);
      grid.innerHTML += `<div class="AppGridDisplay__line" style="width:${width}px;height:${rowHeight}px;left:${left}px;top:${rowTop}px;"></div>`;
      rowTop = Number(rowTop) + Number(rowHeight);
      rowTop = Number(rowTop) + Number(rowGap);
    });
    if (container.parentNode?.classList.contains('container')) {
      redrawGrid(container.parentNode, true)
    }
  }

  function enterEditMode() {
    // if (userState.isAnimating) return;
    registerViewChange();
    if (userState.selectedElement && 
         (userState.selectedElement.classList.contains('container') || 
          userState.selectedElement.classList.contains('image') ||
          userState.selectedElement.classList.contains('video') ||
          userState.selectedElement.classList.contains('canvas') ||
          userState.selectedElement.classList.contains('div') ||
          userState.selectedElement === bodyEl
         )) {
      displayPropEl.innerText = "Scroll mode";
      displayValueEl.innerText = "(Esc to exit)";
      displayChannelEl.innerText = "";
      bodyEl.classList.remove('App--isPropChannelDisplayed')
      bodyEl.classList.add("App--isScrollMode");
      userState.isScrollMode = true;
      return;
    }
    bodyEl.classList.add("App--isEditMode");
    bodyEl.classList.remove("App--isGridActive");
    userState.isEditMode = true;
    displayPropEl.innerText = "Typing mode";
    displayValueEl.innerText = "(Esc to exit)";
    elements.forEach((el) => {
      if (verifyEditable(el)) {
        el.contentEditable = "true";
      }
    });
    setTimeout(() => {
      if(userState.selectedElement) {
        userState.selectedElement.focus();
      }
    }, 100);
  }
  
  function toggleInspectMode() {
    registerViewChange();
    bodyEl.classList.toggle("App--isInspectStyleDisplayed");
    userState.isInspectMode = !userState.isInspectMode;
    if (!userState.isInspectMode) {
      updateStyleDisplay();
    } else {
      updateInspectStyleList();
    }
  }

  function verifyEditable(el) {
    const editable = el !== bodyEl &&
                    !el.classList.contains('container') && 
                    !el.classList.contains('image') && 
                    !el.classList.contains('video') && 
                    !el.classList.contains('div')
    return editable;
  }

  function exitEditMode() {
    if (!userState.isEditMode && !userState.isScrollMode) return;
    bodyEl.classList.remove("App--isScrollMode");
    bodyEl.classList.remove("App--isEditMode");
    userState.isScrollMode = false;
    userState.isEditMode = false;
    updateStyleDisplay();
    elements.forEach((el) => {
      el.contentEditable = "false";
    });
  }

  function registerViewChange() {
    clearTimeout(userState.changeTimeout);
    bodyEl.classList.add("App--isChanging");
    userState.changeTimeout = setTimeout(completeViewChange, 600);
  }

  function completeViewChange() {
    bodyEl.classList.remove("App--isChanging");
  }

  function moveElementUpInDom(element) {
    const previousElement = element.previousElementSibling;
    if (previousElement) {
      element.parentNode.insertBefore(element, previousElement);
    }
    moveAppToTopOfDom();
  }
  
  function moveElementDownInDom(element) {
    const nextElement = element.nextElementSibling;
    if (nextElement) {
      element.parentNode.insertBefore(nextElement, element);
    }
    moveAppToTopOfDom();
  }

  function moveAppToTopOfDom() {
    bodyEl.appendChild(appEl);
  }
  

  function clipValue(val) {
    let newVal = val;
    if (userState.activeProp.hasOwnProperty('max')) {
      newVal = Math.min(userState.activeProp.max, val)
    }
    if (userState.activeProp.hasOwnProperty('min')) {
      newVal = Math.max(userState.activeProp.min, newVal)
    }
    if (isNaN(newVal)) {
      newVal = 0.01;
    }
    return newVal;
  }

  function updateUndoStack(obj) {
    if (userState.isUndoing) {
      return;
    }
    userState.undoStack.push(obj);
  }

  function undo() {
    if (userState.undoStack.length > 0) {
      const prev = userState.undoStack.pop();
      const next = userState.undoStack[userState.undoStack.length - 1]
      userState.isUndoing = true;
      if (prev.type === 'style') {
        setStyleProperty(prev.el, prev.propName, prev.value);
        setSelectedElement(prev.el);
        if (next && prev.el === next.el && next.type === 'style' && next.propName === prev.propName) {
          undo();
        }
      } else if (prev.type === 'new') {
        prev.el.remove();
        elements = elements.filter((el) => el !== prev.el)
        selectNextElement(-1);
        if (prev.isWrapped) {
          // should not delete child of wrapper
          prev.container.remove();
          elements = elements.filter((el) => el !== prev.container)
        }
        userState.undoStack.pop();
        userState.undoStack.pop();
      } else if (prev.type === 'delete') {
        elements.push(prev.el);
        if (prev.container) {
          prev.container.appendChild(prev.el);
        } else {
          bodyEl.appendChild(prev.el);
        }
        setSelectedElement(prev.el);
      } else if (prev.type === 'type') {
        prev.el.innerText = prev.value;
        setSelectedElement(prev.el);
      } else {
        alert('can’t undo that')
        console.log(prev);
        userState.isUndoing = false;
        return;
      }

      updateStyleDisplay();
      let i = recording.length - 1;
      while (i >= 0) {
        console.log(elements, recording[i][1])
        if (recording[i][0] === 'select' || recording[i][0] === 'multi-select' || (recording[i][0] === 'style' && recording[i][2] === prev.propName && elements[recording[i][1]] === prev.el)) {
          
          recording.pop()
        } else if (
          (
            ((recording[i][0] === 'new' || recording[i][0] === 'duplicate') && prev.type === 'new')
          ) 
        ) {
          recording.pop()
          recording.pop()
          recording.pop()          
          break;
        } else if (
          (
            (recording[i][0] === 'delete' && prev.type === 'delete') ||
            (recording[i][0] === 'type' && prev.type === 'type')
          ) 
        ) {
          recording.pop()
          break;
        } else {
          break
        }
        i--;
      }
      userState.isUndoing = false;
    }
  }

  function blendStyles(a, b, steps) {
    // Array.from(a.style).forEach((style) => {
    //   sourceStyles.getPropertyValue(style)
    //   const newElement = newElement
    //   newElement.style.setProperty(style, styleValue);
    // })
  }
}
