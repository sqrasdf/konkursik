createSvgField();

let position = [];
let currentIndexOfPath = 0;
let pathIndexesCount = 0;
let onlyOnePath = document.createElementNS('http://www.w3.org/2000/svg', "path");
let clickedSomething;
let movingPath = false;
let currentPath;
let drawingPathRightNow = false;
let idOfPathToMove;
let startXClicked;
let startYClicked;
let dWhenClicked;
let dOfThePath;
let pathToMove;
let testing;


document.addEventListener('mousedown', (event) => {


  clickedSomething = event.target;
  startXClicked = event.clientX;
  startYClicked = event.clientY;

  if (clickedSomething.getAttribute("id") != "svgId") {
    // console.log("clicked on path");
    movingPath = true;
    idOfPathToMove = clickedSomething.getAttribute("id");

    pathToMove = document.getElementById(idOfPathToMove);
    dOfThePath = pathToMove.getAttribute("d");
  }
  else {
    drawingPathRightNow = true;
    // console.log("clicked on svg field");
    position[position.length] = event.clientX - 10;
    position[position.length] = event.clientY - 10;

    let svg = document.getElementById("svgId");
    svg.appendChild(onlyOnePath.cloneNode());
  }

  document.onmousemove = event => {
    // console.log(event.movementX, event.movementY);

    if (movingPath) {

      testing = document.getElementById(idOfPathToMove);


      let tempList = dOfThePath.split(" ");
      let newD = "";
      let listOfNumValues = [];
      let listOfNumValuesNew = [];

      let currentPosX = event.clientX;
      let currentPosY = event.clientY;
      let toMoveX = currentPosX - startXClicked;
      let toMoveY = currentPosY - startYClicked;
      // dWhenClicked = pathToMove.getAttribute("d");

      for (let i = 0; i < tempList.length; i++) {
        let isNumerical = Number(tempList[i]);
        if (isNumerical) {
          listOfNumValues.push(Number(tempList[i]));
        }
      }
      for (let i = 0; i < listOfNumValues.length; i++) {
        if (i % 2 == 0) {
          listOfNumValuesNew.push(listOfNumValues[i] + toMoveX)
        }
        else {
          listOfNumValuesNew.push(listOfNumValues[i] + toMoveY)
        }
      }
      // newD = "M 100 100 Q 100 200 200 200 Q 300 200 300 300 ";
      // console.log(listOfNumValuesNew);

      newD = `M ${listOfNumValuesNew[0]} ${listOfNumValuesNew[1]} 
      Q ${listOfNumValuesNew[2]} ${listOfNumValuesNew[3]} ${listOfNumValuesNew[4]} ${listOfNumValuesNew[5]} 
      Q ${listOfNumValuesNew[6]} ${listOfNumValuesNew[7]} ${listOfNumValuesNew[8]} ${listOfNumValuesNew[9]}`;

      pathToMove.setAttribute("d", newD);

      // console.log(newD);

      // console.log(dOfThePath);

    }
    else {
      position[position.length] = event.clientX - 10;
      position[position.length] = event.clientY - 10;

      let svg = document.getElementById("svgId");
      let currentPath = svg.children[currentIndexOfPath];

      if (currentPath) {
        editPath(currentPath);

      };

      position.pop();
      position.pop();
    }

  }

});

document.addEventListener("mouseup", event => {
  if (drawingPathRightNow) {
    currentIndexOfPath++;
    drawingPathRightNow = false;
  }

  pathIndexesCount++;
  movingPath = false;
  position = [];

  document.onmousemove = null;

});

function createSvgField() {
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var width = 1000;
  var height = 500;
  svg.setAttributeNS(null, "id", "svgId");
  svg.setAttributeNS(null, "width", width);
  svg.setAttributeNS(null, "height", height);
  svg.setAttributeNS(null, "fill", "none");
  svg.setAttributeNS(null, "viewbox", `0 0 500 500`);
  document.body.appendChild(svg);
}

function drawDot(event) {
  let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  let svg = document.getElementById("svgId");
  circle.setAttributeNS(null, "cx", event.clientX - 10);
  circle.setAttributeNS(null, "cy", event.clientY - 10);
  circle.setAttributeNS(null, "r", 4);
  circle.setAttributeNS(null, "fill", "black");
  svg.appendChild(circle);
}

function createPathcode() {
  let len = position.length;
  let startX = position[len - 4];
  let startY = position[len - 3];
  let endX = position[len - 2];
  let endY = position[len - 1];
  let midX = (startX + endX) / 2;
  let midY = (startY + endY) / 2;
  let pathcode = `M ${startX} ${startY} Q ${startX} ${midY} ${midX} ${midY} Q ${endX} ${midY} ${endX} ${endY}`;
  return pathcode;
}

function editPath(pathObject) {
  let pathcode = createPathcode();
  pathObject.setAttributeNS(null, "id", `${pathIndexesCount}`);
  pathObject.setAttributeNS(null, "d", pathcode);
  pathObject.setAttributeNS(null, "stroke", "black");
  pathObject.setAttributeNS(null, "stroke-width", 7);
  pathObject.setAttributeNS(null, "opacity", 1);
  pathObject.setAttributeNS(null, "fill", "none");
  pathObject.setAttributeNS(null, "transform", "translate(0 0)");
}

// function drawPath(pathcode) {
//   // let path = document.createElementNS('http://www.w3.org/2000/svg', "path");
//   let path = onlyOnePath.cloneNode();
//   path.setAttributeNS(null, "d", pathcode);
//   path.setAttributeNS(null, "stroke", "black");
//   path.setAttributeNS(null, "stroke-width", 3);
//   path.setAttributeNS(null, "opacity", 1);
//   path.setAttributeNS(null, "fill", "none");
//   let svg = document.getElementById("svgId");
//   // svg.appendChild(path);
// }

// document.addEventListener("mousemove", event => {

//   if (movingPath) {
//     console.log("path will be moving");
//   }
//   else {
//     position[position.length] = event.clientX - 10;
//     position[position.length] = event.clientY - 10;

//     let svg = document.getElementById("svgId");
//     let currentPath = svg.children[currentIndexOfPath];
//     console.log("current path is " + currentPath);

//     if (currentPath) {
//       editPath(currentPath);
//       console.log(position);
//     };

//     position.pop();
//     position.pop();
//   }

// });