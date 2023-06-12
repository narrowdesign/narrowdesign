/*
multi-element select and style
cut/copy/paste element
cut/copy/paste style
instance vs class editing
see/set class names
3 letter props ptb
linear gradient
undo
hover state
suggest correct prop example: pw > padding? width? px?
fluid scaling between screen sizes
input field/text area/select (this might fall under too complex)
*/

// content dom elements
const bodyEl = document.body;
const h1El = document.querySelector("h1");
const containerEl = document.querySelector(".container");

// app dom elements
const displayEl = document.querySelector(".StyleDisplay");
const displayPropEl = document.querySelector(".StyleDisplay__prop");
const displayValueEl = document.querySelector(".StyleDisplay__value");
const displayElementEl = document.querySelector(".StyleDisplay__element");
const displayChannelEl = document.querySelector(".StyleDisplay__channel");
const keyDisplayEl = document.querySelector(".KeyDisplay");
const keyDisplayKeyEls = Array.from(document.querySelectorAll(".KeyDisplay__key"));
const containerGridEl = document.querySelector(".Container__gridLines");
const searchEl = document.querySelector('.Search')

let userState;

const elements = [
  bodyEl,
  h1El,
  containerEl,
];

setTimeout(init, 200);

function init() {
  bodyEl.classList.add("isInitialized");
  bodyEl.classList.add("isXrayMode");

  /*
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
      valueList: [
        "center",
        "flex-end",
        "stretch",
        "flex-start",
        "space-between",
        "space-around",
      ]
    },
    ai: {
      name: "align-items",
      valueList: [
        "center",
        "flex-end",
        "stretch",
        "flex-start",
      ]
    },
    b: {
      name: "bottom",
      initialValue: "auto"
    },
    bc: {
      name: ["--background-color", "--background-color", "--background-color", "--background-color"],
      initialValue: `hsla(360,100%,100%,0)`,
      isVariable: true
    },
    bd: {
      name: "border-width",
      min: 0,
      axis: "all",
      initialValue: '0px'
    },
    bb: {
      name: "border-bottom-width",
      min: 0,
      initialValue: '0px'
    },
    bl: {
      name: "border-left-width",
      min: 0,
      initialValue: '0px'
    },
    br: {
      name: "border-right-width",
      min: 0,
      initialValue: '0px'
    },
    bt: {
      name: "border-top-width",
      min: 0,
      initialValue: '0px'
    },
    bx: {
      name: "border-width",
      min: 0,
      axis: "x",
      initialValue: '0px'
    },
    by: {
      name: "border-width",
      min: 0,
      axis: "y",
      initialValue: '0px'
    },
    sh: {
      name: ["--box-shadow", "--box-shadow", "--box-shadow", "--box-shadow"],
      initialValue: `var(--color) 0px 0px 0px 0px`,
      isVariable: true
    },
    lg: {
      name: ["--background-linear-gradient", "--background-linear-gradient", "--background-linear-gradient", "--background-linear-gradient", "--background-linear-gradient", "--background-linear-gradient", "--background-linear-gradient", "--background-linear-gradient", "--background-linear-gradient", "--background-linear-gradient"],
      initialValue: `0deg, var(--color) 0% 0%, var(--background-color) 100% 100%`,
      isVariable: true
    },
    ra: {
      name: "border-radius",
      min: 0,
      max: 10000,
      initialValue: "0px"
    },
    bs: {
      name: "border-style",
      valueList: ["solid", "dotted", "dashed", "double", "groove", "ridge", "inset", "outset"],
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
      initialValue: "0px"
    },
    d: {
      name: "display",
      valueList: [
        "flex",
        "grid",
        "block",
        "inline-block",
        "inline",       
      ]
    },    
    fb: {
      name: "--blur",
      min: 0,
      initialValue: "0px",
      isVariable: true
    },
    fd: {
      name: "flex-direction",
      valueList: ["row", "row-reverse", "column", "column-reverse"]
    },
    ff: {
      name: "font-family",
      valueList: [
        "system-ui",
        "Fraunces",
        "Work Sans",
        "EB Garamond",
        "Open Sans",
        "Playfair Display",
        "Roboto Mono",
        "Oswald",
        "Vollkorn",
        "Roboto Slab"
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
      initialValue: "0px"
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
      valueList: [
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
      valueList: [
        "flex-start",        
        "center",        
        "flex-end",
        "stretch",
      ]
    },
    l: {
      name: "left",
      initialValue: "0px"
    },
    lh: {
      name: "line-height",
      min: 0,
      initialValue: 'inherit'
    },
    ls: {
      name: "letter-spacing",
      increment: 0.1,
      initialValue: '0px',
    },
    m: {
      name: "margin",
      axis: "all",
      initialValue: "0px"     
    },
    mb: {
      name: "margin-bottom",
      initialValue: "0px"
    },
    ml: {
      name: "margin-left",
      initialValue: "0px"
    },
    mr: {
      name: "margin-right",
      initialValue: "0px"
    },
    mt: {
      name: "margin-top",
      initialValue: "0px"
    },
    mx: {
      name: "margin",
      initialValue: "0px",
      axis: "x",
    },
    my: {
      name: "margin",
      initialValue: "0px",
      axis: "y",
    },
    mw: {
      name: "max-width",
      initialValue: "none",
      min: 0,
    },
    bm: {
      name: "mix-blend-mode",
      valueList: [
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
      valueList: [
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
      initialValue: "0px"    
    },
    po: {
      name: "position",
      valueList: ["relative", "absolute", "fixed", "sticky"]
    },
    pb: {
      name: "padding-bottom",
      min: 0,
      initialValue: "0px"
    },
    pl: {
      name: "padding-left",
      min: 0,
      initialValue: "0px"
    },
    pr: {
      name: "padding-right",
      min: 0,
      initialValue: "0px"
    },
    pt: {
      name: "padding-top",
      min: 0,
      initialValue: "0px"
    },
    px: {
      name: "padding",
      min: 0,
      initialValue: "0px",
      axis: "x",
    },
    py: {
      name: "padding",
      min: 0,
      initialValue: "0px",
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
      initialValue: "0px" 
    },
    a: {
      name: "text-align",
      valueList: ["start", "left", "center", "end", "right", "justify"]
    },
    ta: {
      name: "text-align",
      valueList: ["start", "left", "center", "end", "right", "justify"]
    },
    ts: {
      name: ["--text-shadow", "--text-shadow", "--text-shadow"],
      initialValue: `var(--color) 0px 0px 0px`,
      isVariable: true
    },
    tt: {
      name: "text-transform",
      valueList: ["none", "capitalize", "uppercase", "lowercase"],
    },
    t: {
      name: "top",
      initialValue: "0px"
    },
    tr: {
      name: ["--transform", "--transform", "--transform", "--transform", "--transform", "--transform", "--transform", "--transform", "--transform"],
      initialValue: `translateX(0px) translateY(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scaleX(1) scaleY(1) skewX(0deg) skewY(0deg)`,
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
    selectedElement: h1El,
    multiSelectedElementList: [],
    activeKey: "s",
    activeProp: keyToProp["s"],
    activePropName: keyToProp["s"].name,
    activePropParamIndex: 0,
    changeTimeout: null,
    firstKey: null,
    secondKey: null,

    hasFontsLoaded: false,
    isAltKey: false,
    isAnimating: false,
    isDragging: false,
    isListDelay: false,
    isReadingDelay: false,
    isRecording: false,
    isSearchOpen: false,
    isShiftKey: false,
    isTypingDelay: false,
    
    isEditMode: false,
    isScrollMode: false,
    isVisualMode: false,
    isXrayMode: false,

    keyTimeout: null,
    lastWheelEvent: 0,
    mouseStartX: windowState.centerX,
    mouseStartY: windowState.centerY,
    mouseX: windowState.centerX,
    mouseY: windowState.centerY,
    searchTimeout: null,
    styleDisplayTimeout: null,
    touchStartY: windowState.centerY,
    undoOffset: 0,
  };
  
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

  searchEl.addEventListener('mousedown', handleMouseDown);

  if (recording.length > 0) {
    userState.isAnimating = true;
    animateRecording(0)
    bodyEl.classList.add("isAnimating");
  } else {  
    userState.isRecording = true;
    enterEditMode();
  }
  
  function animateRecording(i, then) {
    const now = performance.now();
    const elapsed = now - then;
    let stepIndex = i;
    if (!checkIfPaused()) {
      const step = recording[i]
      const nextStep = recording[i + 1]
      if (step[0] === 'new') {
        createNewElement(step[1], elements[step[2]])
        hideKeyPressed()
      } else if (step[0] === 'select') {
        if (step[1] !== -1) {
          setSelectedElement(elements[step[1]])
        };
        hideKeyPressed()
      } else if (step[0] === 'multi-select') {
        setMultiSelectedElement(elements[step[1]])
        hideKeyPressed()
      } else if (step[0] === 'style') {
        exitEditMode();
        const propName = step[2]
        setStyleProperty(elements[step[1]], step[2], step[3])
        console.log(propName)
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
        hideKeyPressed()
        enterEditMode();
        userState.isTypingDelay = true;
        type(elements[step[1]], step[2])
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
        hideKeyPressed()
      }
      redrawGrid();
      stepIndex++;
    }
    if (i < recording.length - 1 && userState.isAnimating) {    
      requestAnimationFrame(() => {
        animateRecording(stepIndex, now)
      })  
    }
  }

  function displayKeyPressed(keys) {
    if (keyDisplayEl.innerText === keys) return;
    keyDisplayKeyEls[0].innerText = keys.substring(0,1);
    keyDisplayKeyEls[1].innerText = keys.substring(1,2) || '';
    bodyEl.classList.add('isKeyDisplayed')
    setTimeout(() => {
      bodyEl.classList.remove('isKeyDisplayed')
    }, 500)
  }

  function hideKeyPressed() {
    bodyEl.classList.remove('isKeyDisplayed')
  }

  function checkIfPaused() {
    return userState.isTypingDelay || userState.isListDelay || userState.isReadingDelay
  }
  
  function type(el, text) {
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
  
  function showSearch() {
    userState.isSearchOpen = true;
    bodyEl.classList.add('isSearchOpen');
    clearTimeout(userState.searchTimeout)
    userState.searchTimeout = setTimeout(() => {
      searchEl.focus();
      searchEl.value = getComputedStyle(userState.selectedElement).getPropertyValue(`${userState.activePropName}`).trim();
      const unitIndex = searchEl.value.search(/vw$|vh$|vmax$|vmin$|px$|rem$|em$|%$/);
      searchEl.setSelectionRange(0, unitIndex);
    }, 100)
  }
  
  function hideSearch() {
    userState.isSearchOpen = false;
    searchEl.blur();
    userState.selectedElement.focus();
    bodyEl.classList.remove('isSearchOpen');
  }

  function addLineBreak(event) {
    event.preventDefault();
    if (event.shiftKey) {
      document.execCommand('insertHTML', false, '<br>');
    } else {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const el = event.target;
      const leftText = el.innerText.substring(0, range.endOffset)
      const rightText = el.innerText.substring(range.endOffset)
      createNewElement('p', userState.activeContainer, rightText)
      el.innerText = leftText;
    }
  }

  // EVENT HANDLER FUNCTIONS

  function handleResize() {
    redrawGrid();
  }

  function handleWindowClick(e) {
    if (userState.isEditMode) return;
    if (userState.isShiftKey) {
      setMultiSelectedElement(e.target)
    } else {
      setSelectedElement(e.target);
    }
  }

  function handleWheel(e) {
    updateStyleDisplay()
    if (userState.isAnimating || userState.isScrollMode || userState.activeProp.increment === 1) return;
    e.preventDefault();
    e.stopPropagation();
    if (!userState.selectedElement || userState.isEditMode) return;
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
    if (e.metaKey) return;
    userState.isShiftKey = e.shiftKey;
    userState.isAltKey = e.altKey;
    clearTimeout(userState.keyTimeout);
    userState.keyTimeout = setTimeout(() => {
      userState.firstKey = null;
      userState.secondKey = null;
    }, 500);
    
    if (e.key === "z" && e.metaKey) {
      undo(e);
      return;
    } 
    if (e.key === "Tab") {
      handleTab(e)
      return;
    }
    
    if (userState.isSearchOpen) {
      if (e.key === "Escape") {
        if (searchEl.value === "") {          
          hideSearch();
        } else {
          searchEl.value = '';
        }
      } else if (e.key === "Enter") {
        const valueMatch = userState.activeProp.valueList?.includes(searchEl.value);
        const unitMatch = searchEl.value.match(/vw$|vh$|vmax$|vmin$|px$|rem$|em$|%$/);
        const isNumberOnly = searchEl.value.match(/\d/);
        if (unitMatch || valueMatch || isNumberOnly) {
          if (userState.activeProp.axis) {
            setMultipleSideProps(userState.selectedElement, userState.activePropName, 'initial', userState.activeProp.axis)
          } else {
            setStyleProperty(userState.selectedElement, userState.activePropName, searchEl.value)
          }
          hideSearch();
          updateStyleDisplay();
        } else {
          searchEl.value = '';
        }
      }
      console.log(e.key)
      return;
    } else if (userState.isEditMode) {
      if (e.key === "Enter") {
        addLineBreak(e)
      } else if (e.key === "Escape") {
        exitEditMode();
      }
      if (userState.isRecording) {      
        addToRecording(['type', elements.indexOf(userState.selectedElement), userState.selectedElement.innerText])
      }
      return;
    } else if (userState.isScrollMode && e.key === "Escape") {
      exitEditMode();
      return;
    } else if (e.key === "Escape") {
      enterEditMode();
      return;
    } else if (e.key === "Backspace") {
      deleteElement(userState.selectedElement, e.shiftKey);
      return;
    }
    
    if (!userState.firstKey) {
      if (e.key === "i" || e.key === "e") {
        enterEditMode();
        return;
      } else if (e.key === "n") {
        userState.firstKey = "n";
        return;
      } else if (e.key === "x") {
        resetActivePropValue();
        return;
      } else if (e.key === " ") {
        e.preventDefault();
        showSearch()
        return;
      } else if (e.key === "v") {
        if (!userState.isXrayMode && !userState.isVisualMode) {
          userState.isVisualMode = true;
          bodyEl.classList.add("isVisualMode");
        } else if (!userState.isXrayMode && userState.isVisualMode) {
          userState.isXrayMode = true;          
          bodyEl.classList.add("isXrayMode");
        } else if (userState.isXrayMode && userState.isVisualMode) {
          userState.isVisualMode = false;          
          bodyEl.classList.remove("isVisualMode");
        } else if (userState.isXrayMode && !userState.isVisualMode) {
          userState.isXrayMode = false; 
          bodyEl.classList.remove("isXrayMode");
        }
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
    userState.isSelectedPropParamIndexAlt = keyToShiftPropIndex.includes(e.key);
    if (userState.isSelectedPropParamIndexAlt) {
      userState.activePropParamIndex = keyToShiftPropIndex.indexOf(e.key);
    }
    if (parseInt(e.key) >= 1 && parseInt(e.key) <= 9) {
      setActiveProp(userState.activeKey, parseInt(e.key));
    } else {
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
    if (userState.isShiftKey) {
      delta *= 10;
    }
    if (userState.activePropName.includes("grid-row")) {
      delta *= -1;
    }
    updateStyleProp(delta);
  }

  function handleKeyUp(e) {
    userState.isShiftKey = e.shiftKey;
    userState.isAltKey = e.altKey;
    redrawGrid();
  }

  function handlePaste(e) {
    // cancel paste
    if (userState.isSearchOpen) return;
    e.preventDefault();

    const pastedText = (e.originalEvent || e).clipboardData.getData('text/plain');
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const el = event.target;
    const leftText = el.innerText.substring(0, range.endOffset - 1)
    const rightText = el.innerText.substring(range.endOffset)
    el.innerText = `${leftText}${pastedText}${rightText}`;
    el.querySelectorAll('br').forEach((br) => {
      br.remove();
    })
    
    setCurrentCursorPosition(leftText.length + pastedText.length)
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
  
  function setCurrentCursorPosition(chars) {
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
  
  function handleMouseDown(e) {
    userState.isDragging = true;    
    userState.mouseStartX = e.pageX;
    userState.mouseStartY = e.pageY;
    searchEl.addEventListener('mousemove', handleMouseMove);
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
    searchEl.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);    
  }

  // State change functions

  function setSelectedElement(el) {
    exitEditMode()
    userState.multiSelectedElementList.forEach((el) => {
      el.classList.remove('isMultiSelected')
    })
    userState.multiSelectedElementList = [];
    if (userState.isRecording) {
      // alert('recording element index is -1')
      addToRecording(['select', elements.indexOf(el)])
    }
    if (userState.selectedElement) {
      userState.selectedElement.blur()
      userState.selectedElement.classList.remove(
        `activeProp--${userState.activePropName}`
      );
    }
    const elTop = el.getBoundingClientRect().top + window.scrollY;
    if (elTop + 100 > window.scrollY + windowState.height || elTop < window.scrollY) {      
      window.scrollTo({
        top: elTop,
        left: 0
      });
    }
    document.querySelectorAll(".isSelected")?.forEach((el) => {
      el.classList.remove("isSelected");
    });
    userState.selectedElement = el;
    document.querySelector(".isSelected")?.classList.remove("isSelected");
    el.classList.add("isSelected");
    el?.focus();   
    userState.selectedElement.classList.add(
      `activeProp--${userState.activePropName}`
    );
    updateStyleDisplay();
    if (userState.selectedElement?.classList.contains("container")) {
      userState.activeContainer = userState.selectedElement;
    } else {
      userState.activeContainer = userState.selectedElement.closest(".container");
    }
    redrawGrid()
  }

  function setMultiSelectedElement(el) {
    if (userState.isRecording) {
      addToRecording(['multi-select', elements.indexOf(el)])
    }
    if (userState.multiSelectedElementList.includes(el)) {
      userState.multiSelectedElementList.splice(userState.multiSelectedElementList.indexOf(el),1);
      el.classList.remove("isMultiSelected");
    } else {
      console.log(el)
      userState.multiSelectedElementList.push(el);
      el.classList.add("isMultiSelected");
    }
    userState.selectedElement.classList.add(
      `activeProp--${userState.activePropName}`
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

  function resetActivePropValue() {
    if (userState.activeProp.axis) {
      setMultipleSideProps(userState.selectedElement, userState.activePropName, userState.activeProp.initialValue ? userState.activeProp.initialValue : userState.activeProp.valueList ? userState.activeProp.valueList[0] : `initial`, userState.activeProp.axis)
    } else {
      setStyleProperty(
        userState.selectedElement,
        userState.activePropName,
        userState.activeProp.initialValue ? userState.activeProp.initialValue : `initial`
      );
    }
    updateStyleDisplay();
    redrawGrid();
  }

  async function setActiveProp(key, propIndex) {
    exitEditMode();
    if (userState.firstKey === "f" && key === "f") {
      if (!userState.hasFontsLoaded) await loadFonts()
      await showFonts();
    }

    userState.selectedElement?.classList.remove(
      `activeProp--${userState.activePropName}`
    );
    let prop = keyToProp[key.toLowerCase()];
    userState.activePropParamIndex = propIndex || 0;
    if (propIndex <= prop.name.length) {
      userState.activePropParamIndex = propIndex - 1;
    } else if (!propIndex)
    if (Array.isArray(prop.name)) {
      userState.activePropName = prop.name[userState.activePropParamIndex]
    } else {
      userState.activePropName = prop.name;
    }
    userState.activeProp = prop;
    if (userState.selectedElement) {
      userState.selectedElement.classList.add(
        `activeProp--${userState.activePropName}`
      );
    }
    if (userState.activeProp.showsGrid) {
      bodyEl.classList.add("isGridActive");
    } else {
      bodyEl.classList.remove("isGridActive");
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
    const now = performance.now();
    const elapsed = now - userState.lastWheelEvent;
    registerViewChange();
    const propName = userState.activePropName;
    const computedStyle = getComputedStyle(userState.selectedElement);
    let val = computedStyle.getPropertyValue(`${propName}`).trim().split(" ");
    if (userState.activeProp.axis === "x" && val.length > 1) {
      val = val[1];
    } else {
      val = val[0];
    }
    let unit = val.match(/vw$|vh$|vmax$|vmin$|px$|rem$|em$|%$/) || '';
    let valueList = userState.activeProp.valueList; // words not numbers
    if (valueList) {
      unit = '';
    } else if (unit.length > 1) {
      unit = unit[0]
    } else if (unit.length === 0) {
      val = computedStyle.getPropertyValue(`${propName}`);
      unit = val.match(/vw$|vh$|vmax$|vmin$|px$|rem$|em$|%$/) || '';
    }
    if (propName === "letter-spacing" && (val === "initial" || val === "normal")) {
      val = "0"
      unit = "px"
    }
    if (propName === "z-index" && (val === "auto")) {
      val = "0"
    }
    if (propName === "filter") {
      val = val.substring(val.indexOf("(") + 1, val.indexOf("p"));
    }
    let newVal;
    if (propName === "--box-shadow" || propName === "--text-shadow") {
      if (userState.isSelectedPropParamIndexAlt) {
        const color = getHSLA(delta);
        newVal = getShadow(delta, color)
      } else {
        newVal = getShadow(delta);
      }
      unit = '';
    } else if (propName === "--background-linear-gradient") {
      if (userState.isSelectedPropParamIndexAlt) {
        const color = getHSLA(delta);
        newVal = getLinearGradient(delta, color)
      } else {
        newVal = getLinearGradient(delta);
      }
      unit = '';
    } else if (propName === "--color" || propName === "--background-color") {
      newVal = getHSLA(delta);
      unit = '';
    } else if (propName === "--transform") {
      newVal = getTransform(delta);
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
        delta *= 0.1;
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
        if (userState.isShiftKey) {
          inc = userState.isAltKey ? 8 : 4;
          if (elapsed < inc * 20) return;
          userState.lastWheelEvent = now;
          newVal = oldValFloat - (oldValFloat % inc) + (delta > 0 ? inc : -inc);
        }
      }
    }

    if (valueList || userState.activeProp.step) {
      if (elapsed < 250) return;
      userState.lastWheelEvent = now;
    }
    if (valueList) {
      newVal = getNewValFromList(valueList, delta, computedStyle);
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
    userState.styleDisplayTimeout = setTimeout(() => {
      updateStyleDisplay();
    },100)
  }

  function setStyleProperty(el, propName, newVal) {
    if (isNaN(newVal) && !newVal.match(/\d/) && userState.isAnimating) {
      userState.isListDelay = true;
      setTimeout(() => {
        userState.isListDelay = false;
      }, 100)
    }
    if (el === userState.selectedElement) {
      userState.multiSelectedElementList.forEach((multiEl) => {
        multiEl.style.setProperty(
          `${propName}`,
          newVal
        );  
      })
      el.style.setProperty(
        `${propName}`,
        newVal
      );
    }
    if (userState.isRecording) {
      addToRecording(['style', elements.indexOf(userState.selectedElement), propName, newVal])
    }
  }

  function updateStyleDisplay() {
    if (!userState.selectedElement) return;
    const elTop = userState.selectedElement.getBoundingClientRect().top;
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
      const className = i === userState.activePropParamIndex ? "StyleDisplay__value--isActive" : '';
      displayValueEl.innerHTML += `<div class="${className}">${value}</div>`
    })

    displayElementEl.innerHTML = userState.selectedElement.nodeName

    if (
      propName === "--color" ||
      propName === "--background-color"
    ) {
      if (userState.activePropParamIndex === 0) {
        displayChannelEl.innerText = `(hue)`;
      } else if (userState.activePropParamIndex === 1) {
        displayChannelEl.innerText = `(saturation)`;
      } else if (userState.activePropParamIndex === 2) {
        displayChannelEl.innerText = `(level)`;
      } else if (userState.activePropParamIndex === 3) {
        displayChannelEl.innerText = `(alpha)`;
      }
    } else if (
      propName === "--transform"
    ) {
      if (userState.activePropParamIndex === 0) {
        displayChannelEl.innerText = `(translateX)`;
      } else if (userState.activePropParamIndex === 1) {
        displayChannelEl.innerText = `(translateY)`;
      } else if (userState.activePropParamIndex === 2) {
        displayChannelEl.innerText = `(rotateX)`;
      } else if (userState.activePropParamIndex === 3) {
        displayChannelEl.innerText = `(rotateY)`;
      } else if (userState.activePropParamIndex === 4) {
        displayChannelEl.innerText = `(rotateZ)`;
      } else if (userState.activePropParamIndex === 5) {
        displayChannelEl.innerText = `(scaleX)`;
      } else if (userState.activePropParamIndex === 6) {
        displayChannelEl.innerText = `(scaleY)`;
      } else if (userState.activePropParamIndex === 7) {
        displayChannelEl.innerText = `(skewX)`;
      } else if (userState.activePropParamIndex === 8) {
        displayChannelEl.innerText = `(skewY)`;
      }
    } else if (propName === "--box-shadow" || propName === "--text-shadow") {
      if (userState.activePropParamIndex === 0) {
        displayChannelEl.innerText = `(x)`;
      } else if (userState.activePropParamIndex === 1) {
        displayChannelEl.innerText = `(y)`;
      } else if (userState.activePropParamIndex === 2) {
        displayChannelEl.innerText = `(blur)`;
      }
    } else if (propName === "filter") {
      displayChannelEl.innerText = `(blur)`;
    } else {
      displayChannelEl.innerText = ``;
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

  async function loadFonts() {
    userState.hasFontsLoaded = true;
    const textStyle = document.createElement("style");
    try {
      const availableFonts = await window.queryLocalFonts();
      for (const fontData of availableFonts) {
        if (!fontData.fullName.match(/[:,+,.]/)) {
          keyToProp.ff.valueList.push(fontData.fullName);
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

  function showFonts() {
    return;
    const newContainer = document.createElement('nav');
    newContainer.style.position = 'fixed';
    const rect = userState.selectedElement.getBoundingClientRect();
    bodyEl.appendChild(newContainer)
    newContainer.style.left = `${rect.left}px`;
    newContainer.style.top = `${rect.top + rect.height}px`;
    for (let i = 0; i < 10; i++) {
      const newNode = userState.selectedElement.cloneNode(true);
      newNode.style.setProperty(
        `font-family`,
        keyToProp.ff.valueList[Math.floor(Math.random() * keyToProp.ff.valueList.length)]
      );
      newContainer.appendChild(newNode)
    }
  }

  // Element creation
  
  function duplicateElement(element, container, key) {
    const newElement = element.cloneNode(true);
    if (element.classList.contains('container')) {
      container = element.parentNode;
    }
    if (userState.isRecording) {
      addToRecording(['duplicate', elements.indexOf(element),elements.indexOf(container),key])
    }
    userState.firstKey = undefined;
    let rowStart = parseInt(getComputedStyle(element).getPropertyValue("grid-row-start"));
    let rowEnd = parseInt(getComputedStyle(element).getPropertyValue("grid-row-end"));
    let columnStart = parseInt(getComputedStyle(element).getPropertyValue("grid-column-start"));
    let columnEnd = parseInt(getComputedStyle(element).getPropertyValue("grid-column-end"));      
    Array.from(newElement.children).forEach((child) => {
      if (!child.classList.contains('Container__gridLines')) {
        elements.splice(elements.length - 1, 0, child);
      }
    })
    container.appendChild(newElement);
    elements.splice(elements.length - 1, 0, newElement);
    setSelectedElement(newElement);
    if (key === "ArrowDown") {
      setStyleProperty(newElement, "grid-row-start", rowEnd);
      setStyleProperty(newElement, "grid-row-end", rowEnd + 1);
      setActiveProp('rs')            
    } else if (key === "ArrowUp") {
      setStyleProperty(newElement, "grid-row-start", rowStart - 1);
      setStyleProperty(newElement, "grid-row-end", rowStart);
      setActiveProp('rs')      
    } else if (key === "ArrowRight") {
      setStyleProperty(newElement, "grid-column-start", columnEnd);
      setStyleProperty(newElement, "grid-column-end", columnEnd + 1);
      setActiveProp('cs')      
    } else if (key === "ArrowLeft") {
      setStyleProperty(newElement, "grid-column-start", columnStart - 1);
      setStyleProperty(newElement, "grid-column-end", columnStart);
      setActiveProp('cs')
    }
    updateStyleDisplay();
    redrawGrid();
    return newElement;
  }

  function createNewElement(key, container = userState.activeContainer, text) {
    if (userState.isRecording) {
      addToRecording(['new', key, elements.indexOf(container)])
    }
    userState.firstKey = undefined;
    if (!keyToNewElement.hasOwnProperty(key)) return;
    const newElementType = keyToNewElement[key.toLowerCase()];
    const newElement = document.createElement(newElementType);
    if (text) {
      newElement.innerText = text;
    }
    if (key === "i") {
      setActiveProp('w');
      newElement.classList.add("image");
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
      wrapElement(newElement)
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
      const searchTerm = userState.isAnimating ? 'mountain peak high contrast' : prompt("Insert an image of a/an");
      const imgElement = userState.selectedElement;
      const unsplashUrl = 'https://source.unsplash.com/random/1600xauto/?';
      fetch(`${unsplashUrl}${searchTerm}`).then(
        (response) => {
          if (elements.includes(imgElement)) {            
            const src = response.url;
            imgElement.style.backgroundImage = `url(${src})`;
          }
        }
        ).catch(function() {
          imgElement.style.backgroundImage = `url(images/mountain.jpg)`;
        });
    }
    updateStyleDisplay();
    if (key !== "w") {
      setStyleProperty(newElement, "grid-row-start", lastRow);
      setStyleProperty(newElement, "grid-row-end", lastRow + 1);
      enterEditMode();
    }
    redrawGrid();
  }

  function wrapElement(newElement) {
    if (userState.selectedElement === bodyEl) return;
    newElement.classList.add("container");
    userState.selectedElement.parentNode.insertBefore(newElement, userState.selectedElement);
    newElement.appendChild(userState.selectedElement);
    const sourceStyles = userState.selectedElement.style;
    
    // Iterate through each inline style
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
  }
  
  function deleteElement(el, deleteChildren) {
    const index = elements.indexOf(el);
    if (userState.isRecording) {
      addToRecording(['delete', index, deleteChildren]);
    }
    elements.splice(index, 1);
    const children = Array.from(el.children).filter((el) => !el.classList.contains('Container__gridLines'));
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
      colorVal = `${getComputedStyle(userState.selectedElement.parentNode).getPropertyValue(
        `${userState.activePropName}`
      )}`.trim()
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
    let h = colorProps[0] % 360;
    let s = Math.max(Math.min(100, colorProps[1]), 0);
    let l = Math.max(Math.min(100, colorProps[2]), 0);
    let a = Math.max(Math.min(1, colorProps[3]), 0);
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
    return `hsla(${hVal}deg, ${sVal}%, ${lVal}%, ${a})`
  }
  
  function getLinearGradient(delta, color) {
    const val = `${getComputedStyle(userState.selectedElement)
      .getPropertyValue(`${userState.activePropName}`)
      .trim()}`;
    const props = val.split(" ");
    let newVal = parseFloat(props[userState.activePropParamIndex], 10) + delta;
    if (color) {
      props[1] = color || `var(--color)`;
    } else if (userState.activePropParamIndex === 0) {
      props[userState.activePropParamIndex] = `${
        newVal
      }deg`;
    } else {
      props[userState.activePropParamIndex] = `${
        newVal
      }%`;
    }
    return props.join(" ");
  }

  function getShadow(delta, color) {
    const val = `${getComputedStyle(userState.selectedElement)
      .getPropertyValue(`${userState.activePropName}`)
      .trim()}`;
    const props = val.split(" ");
    let newVal = parseFloat(props[userState.activePropParamIndex + 1], 10) + delta;
    if (userState.activePropParamIndex === 2) {
      newVal = Math.abs(newVal)
    }
    if (color) {
      props[0] = color || `var(--color)`;
    } else {
      props[userState.activePropParamIndex + 1] = `${
        newVal
      }px`;
    }
    return props.join(" ");
  }
  
  function getTransform(delta) {
    const transformVal = `${getComputedStyle(userState.selectedElement)
      .getPropertyValue(`${userState.activePropName}`)
      .trim()}`;
    // translate(0px,0px) rotate(0deg) scale(1) skewX(0deg) skewY(0deg)  
    const transformProps = transformVal.split(" ");
    const activeProp = transformProps[userState.activePropParamIndex];
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
    if (userState.isShiftKey) {
      // transformProps.forEach((prop, i) => {
      //   const transformName = name.substring(0,name.length - 2);
      //   if (prop.includes(transformName)) {
      //     const transformName = activeProp.substring(0, activeProp.indexOf('('))
      //     transformProps[i] = `${name}(${val}${unit})`;
      //   }
      // })
    } else {
      transformProps[userState.activePropParamIndex] = `${name}(${val}${unit})`;
    }
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
      document.querySelectorAll(".Container__gridLine").forEach((line) => {
        // TODO threshold on this. too many and it become unusable
        line.remove();
      });
    }
    const grid = container.querySelector(':scope > .Container__gridLines')
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
      const columnWidth = parseFloat(column, 10);
      grid.innerHTML += `<div class="Container__gridLine" style="height:${height}px;width:${columnWidth}px;left:${columnLeft}px;top:${top}px;"></div>`;
      columnLeft += columnWidth;
      columnLeft += columnGap;
    });
    rows.forEach((row) => {
      const rowHeight = parseFloat(row, 10);
      grid.innerHTML += `<div class="Container__gridLine" style="width:${width}px;height:${rowHeight}px;left:${left}px;top:${rowTop}px;"></div>`;
      rowTop += rowHeight;
      rowTop += rowGap;
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
          userState.selectedElement.classList.contains('canvas') ||
          userState.selectedElement.classList.contains('div') ||
          userState.selectedElement === bodyEl
         )) {
      displayPropEl.innerText = "Scroll mode";
      displayValueEl.innerText = "(Esc to exit)";
      displayChannelEl.innerText = "";
      bodyEl.classList.add("isScrollMode");
      userState.isScrollMode = true;
      return;
    }
    bodyEl.classList.add("isEditMode");
    bodyEl.classList.remove("isGridActive");
    userState.isEditMode = true;
    displayPropEl.innerText = "Typing mode";
    displayValueEl.innerText = "(Esc to exit)";
    elements.forEach((el) => {
      if (el !== bodyEl && !el.classList.contains('container') && !el.classList.contains('image') && !el.classList.contains('div')) {
        el.contentEditable = "true";
      }
    });
    setTimeout(() => {
      userState.selectedElement.focus();
    }, 100);
  }

  function exitEditMode() {
    if (!userState.isEditMode && !userState.isScrollMode) return;
    bodyEl.classList.remove("isScrollMode");
    bodyEl.classList.remove("isEditMode");
    userState.isScrollMode = false;
    userState.isEditMode = false;
    updateStyleDisplay();
    elements.forEach((el) => {
      el.contentEditable = "false";
    });
  }

  function registerViewChange() {
    clearTimeout(userState.changeTimeout);
    bodyEl.classList.add("isChanging");
    userState.changeTimeout = setTimeout(completeViewChange, 600);
  }

  function completeViewChange() {
    bodyEl.classList.remove("isChanging");
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

  function addToRecording(val) {
    if (val !== recording[recording.length - 1]) {
      recording.push(val)
    }
  }

  function undo() {
    animateRecording(recording.length - userState.undoOffset - 2)
    userState.undoOffset++;
  }

  function blendStyles(a, b, steps) {
    // Array.from(a.style).forEach((style) => {
    //   sourceStyles.getPropertyValue(style)
    //   const newElement = newElement
    //   newElement.style.setProperty(style, styleValue);
    // })
  }
}
