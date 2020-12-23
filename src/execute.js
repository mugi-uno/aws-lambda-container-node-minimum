var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __exportStar = (target, module2, desc) => {
  __markAsModule(target);
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  if (module2 && module2.__esModule)
    return module2;
  return __exportStar(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", {value: module2, enumerable: true}), module2);
};

// src/execute.ts
var canvas = __toModule(require("canvas"));

// src/drawToCanvas.ts
var SIZE = 500;
var LINE_WIDTH = 10;
var PADDING = 30;
var MIN_CHAR_HEIGHT = 120;
var TEXT_BOX = SIZE - PADDING * 2;
var BASE_FONT_SIZE = 480;
var drawToCanvas = (canvas3, text) => {
  const ctx = canvas3.getContext("2d");
  ctx.fillStyle = "#FF5555";
  ctx.strokeStyle = "#FF5555";
  ctx.textBaseline = "middle";
  ctx.lineWidth = LINE_WIDTH;
  ctx.beginPath();
  ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - LINE_WIDTH / 2, 0, 360 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  const chars = text.length;
  const fontSize = chars === 1 ? BASE_FONT_SIZE * 0.85 : Math.floor(BASE_FONT_SIZE / chars);
  ctx.font = `${fontSize}px g_comickoin_freeR`;
  const analyzeResult = analyzeTest(ctx, text);
  let top = PADDING;
  analyzeResult.forEach(({c, width, heightRatio}) => {
    ctx.fillText(c, (SIZE - width) / 2, top + TEXT_BOX * heightRatio / 2);
    top += TEXT_BOX * heightRatio;
  });
};
var getTextHeight = (ctx, text) => {
  const metrics = ctx.measureText(text);
  return metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
};
var getTextWidth = (ctx, text) => {
  const metrics = ctx.measureText(text);
  return metrics.width;
};
var analyzeTest = (ctx, text) => {
  const tmp = text.split("").map((c) => {
    const width = getTextWidth(ctx, c);
    let height = getTextHeight(ctx, c);
    if (height < MIN_CHAR_HEIGHT) {
      height = MIN_CHAR_HEIGHT;
    }
    return {c, width, height};
  });
  const totalHeight = tmp.reduce((prev, {height}) => prev + height, 0);
  return tmp.map((res) => ({
    ...res,
    heightRatio: res.height / totalHeight
  }));
};

// src/execute.ts
var fs = __toModule(require("fs"));
var path = __toModule(require("path"));
canvas.registerFont(path.default.resolve(__dirname, "../fonts/g_comickoin_freeR.ttf").toString(), {family: "g_comickoin_freeR"});
var canvas2 = canvas.createCanvas(SIZE, SIZE);
drawToCanvas(canvas2, "\u5C71\u7530");
console.log("============");
console.log(canvas2.toDataURL().replace("data:image/png;base64,", ""));
console.log("============");
console.log(canvas2.toBuffer("image/png").toString("base64"));
var out = fs.default.createWriteStream(__dirname + "/test.png");
var stream = canvas2.createPNGStream();
stream.pipe(out);
out.on("finish", () => console.log("The PNG file was created."));
