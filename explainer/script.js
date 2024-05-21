const coverRef = document.querySelector(".Cover");
const codeApiRef = document.querySelector(".Code--api");
const messagesRef = document.querySelectorAll(".Message__content");
const bodyRef = document.querySelector("body");
const codeBlockChildren = document.querySelectorAll(".Code__block--child");
const messageInputRef = document.querySelector(".Message__input");
const coverBackRef = document.querySelector(".Cover__backTitle");

const htmlBoxTextRef = document.querySelector(".Message__htmlBoxText");
const modelOutputRef = document.querySelector(".Model__output");

const tooltip = document.querySelector(".Tooltip");
const codeLines = document.querySelectorAll(".Code--api div[data-tooltip]");
const sendAPIRef = document.querySelector(".Code__send");
const returnOutputRef = document.querySelector(".Model__return");

let isActivated = false;

const htmlTranslated = [
  "&lt;html&gt;",
  "&lt;head&gt;",
  "&lt;title&gt;Cómo programar con explicación de inteligencia artificial&lt;/title&gt;",
  "&lt;/head&gt;",
  "&lt;body&gt;",
  "&lt;h1&gt;Probablemente sepas qué es esto.&lt;/h1&gt;",
  "&lt;/body&gt;",
  "&lt;/html&gt;",
];

function typeText(element, text, index = 0) {
  if (index < text.length) {
    const char = text[index];
    // Check if the character is &lt; or &gt;
    if (char === "&") {
      // Combine the next 3 characters to check if it's &lt; or &gt;
      const specialChar = text.substr(index, 4);
      if (specialChar === "&lt;" || specialChar === "&gt;") {
        // If it's &lt; or &gt;, type them as one character
        element.innerHTML += specialChar;
        // Increment index by 3 to skip the next 3 characters
        setTimeout(() => typeText(element, text, index + 4), 50);
        return;
      }
    }
    // Type normal character
    element.innerHTML += char;
    setTimeout(() => typeText(element, text, index + 1), 50);
  }
}

// Loop through each line of text and type it into the htmlBoxTextRef element
let typeTimeAcc = 0;
htmlTranslated.forEach((line, index) => {
  const lineElement = document.createElement("div");
  if (index === 1 || index === 3 || index === 4 || index === 6) {
    lineElement.classList.add("u_indent1");
  } else if (index === 2 || index === 5) {
    lineElement.classList.add("u_indent2");
  }
  htmlBoxTextRef.appendChild(lineElement);
  setTimeout(() => {
    typeText(lineElement, line);
  }, typeTimeAcc);
  typeTimeAcc += line.length * 20;
});

window.addEventListener("click", () => {
  deactivateTooltip();
});

messageInputRef.addEventListener("click", handleUncover);
sendAPIRef.addEventListener("click", sendAPICall);
returnOutputRef.addEventListener("click", returnOutputCall);

function handleUncover(e) {
  e.stopPropagation();
  window.scrollTo({
    top: 1200,
    behavior: "smooth",
  });
}

function sendAPICall(e) {
  bodyRef.classList.add("isSending");
  coverBackRef.innerHTML = "MEANWHILE, AT THE MODEL...";

  let typeTimeAcc = 0;
  htmlTranslated.forEach((line, index) => {
    const lineElement = document.createElement("div");
    if (index === 1 || index === 3 || index === 4 || index === 6) {
      lineElement.classList.add("u_indent1");
    } else if (index === 2 || index === 5) {
      lineElement.classList.add("u_indent2");
    }
    modelOutputRef.appendChild(lineElement);
    setTimeout(() => {
      typeText(lineElement, line);
    }, typeTimeAcc);
    typeTimeAcc += line.length * 20;
  });
}

function returnOutputCall(e) {
  bodyRef.classList.remove("isSending");
  coverBackRef.innerHTML = "BACK IN OUR CODE, WE CAN USE THE RESPONSE.";
}

function activateTooltip(line) {
  line.classList.add("isActive");
  codeApiRef.classList.add("isChildActive");
  tooltip.innerHTML = line.dataset.tooltip;
  bodyRef.classList.add("isTooltipActive");
  const indent = line.dataset.indent * 20 - 10;
  if (window.innerWidth > 1360) {
    tooltip.style.transform = `translate(calc(-100% + ${indent}px), ${
      line.getBoundingClientRect().top - 10
    }px)`;
  } else {
    tooltip.style.transform = `translate(${
      line.getBoundingClientRect().left + 10
    }px, calc(${line.getBoundingClientRect().bottom + 5}px))`;
  }
  let color = getComputedStyle(line).backgroundColor;
  color = color.replace(/[^,]+(?=\))/, "1");
  tooltip.style.backgroundColor = color;

  codeLines.forEach((codeLine) => {
    if (line !== codeLine) {
      codeLine.classList.remove("isActive");
    }
  });
}

function deactivateTooltip() {
  bodyRef.classList.remove("isTooltipActive");
  codeApiRef.classList.remove("isChildActive");
  codeLines.forEach((line, i) => {
    line.classList.remove("isActive");
  });
}

codeLines.forEach((line, i) => {
  line.addEventListener("click", (e) => {
    e.stopPropagation();
    activateTooltip(line);
  });
});

window.addEventListener("scroll", handleScroll);
window.addEventListener("mousemove", handleMouseMove);

function handleMouseMove(e) {
  const mouseX = e.clientX / window.innerWidth - 0.5;
  const mouseY = e.clientY / window.innerHeight - 0.5;
  const gradientRotation = 180 + mouseX * 90 + mouseY * 90;
  bodyRef.style.setProperty("--gradient-rotation", `${gradientRotation}deg`);
}
function handleScroll(e) {
  const scroll = window.scrollY;
  const coverRotationX = Math.max(0.1, Math.min(180, scroll / 10));
  const colorLightness = 15 + (scroll / 1000) * 35;
  const coverAccentColorLightness = 54 + (scroll / 1000) * 35;
  const codeApiColorLightness = Math.min(76, 40 + (scroll / 1000) * 35);
  const backgroundColorDarkLightness = 62 + (scroll / 2000) * 35;
  const backgroundColorLightLightness = 85 + (scroll / 2000) * 15;
  const coverZ = 6 + scroll / 50;
  const coverShadowY = 12 - scroll / 50;
  const coverShadowOpacity = 0.15 + Math.min(0.5, scroll / 1000);
  coverRef.style.setProperty(
    "--cover-color-dark",
    `hsl(234, 10%, ${colorLightness}%)`
  );
  coverRef.style.setProperty(
    "--cover-background-color-dark",
    `hsl(0, 0%, ${backgroundColorDarkLightness}%)`
  );
  coverRef.style.setProperty(
    "--cover-background-color-light",
    `hsl(30, 3%, ${backgroundColorLightLightness}%)`
  );
  coverRef.style.setProperty(
    "--cover-accent-color",
    `hsl(18, 88%, ${coverAccentColorLightness}%)`
  );
  coverRef.style.setProperty("--cover-z", `${coverZ}px`);
  coverRef.style.setProperty("--cover-shadow-y", `${coverShadowY}px`);
  coverRef.style.setProperty("--cover-shadow-opacity", `${coverShadowOpacity}`);
  coverRef.style.transform = `rotateX(${coverRotationX}deg)`;

  codeApiRef.style.setProperty(
    "--code-color",
    `hsl(20, 85%, ${codeApiColorLightness}%)`
  );

  if (scroll > 1000 && !isActivated) {
    isActivated = true;
    activateTooltip(codeLines[0]);
  } else if (scroll < 1000) {
    deactivateTooltip();
  }
}
