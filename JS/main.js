import { Canvas } from "./Canvas.mjs";

document.addEventListener("DOMContentLoaded", function () {
    console.log("Accediendo al documento desde JS");

    const canvas = document.getElementById("gameCanvas");

    const gameCanvas = new Canvas('gameCanvas',100,100,100,canvas);


});


