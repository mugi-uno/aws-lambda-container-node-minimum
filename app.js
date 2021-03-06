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

// app.ts
var canvas = __toModule(require("canvas"));

// src/drawToCanvas.ts
var SIZE = 500;
var LINE_WIDTH = 10;
var PADDING = 30;
var MIN_CHAR_HEIGHT = 120;
var TEXT_BOX = SIZE - PADDING * 2;
var BASE_FONT_SIZE = 480;
var drawToCanvas = (canvas2, text) => {
  const ctx = canvas2.getContext("2d");
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

// app.ts
var path = __toModule(require("path"));
exports.handler = async (event, _context) => {
  var _a, _b;
  const text = (_b = (_a = event.queryStringParameters) == null ? void 0 : _a.text) != null ? _b : "\u5C71\u7530";
  if (text.length === 0 || text.length > 6) {
    return {statusCode: 400};
  }
  canvas.registerFont(path.default.resolve(__dirname, "./fonts/g_comickoin_freeR.ttf").toString(), {family: "g_comickoin_freeR"});
  const canvas2 = canvas.createCanvas(SIZE, SIZE);
  drawToCanvas(canvas2, text);
  console.log(canvas2.toBuffer("image/png").toString("base64"));
  return {
    statusCode: 200,
    headers: {"Content-Type": "'image/png'"},
    body: canvas2.toBuffer("image/png").toString("base64"),
    isBase64Encoded: true
  };
};
