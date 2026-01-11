// ==UserScript==
// @name         buildit modmenu
// @namespace    http://tampermonkey.net/
// @version      2026-01-10
// @description  try to take over the world!
// @author       Krolrkrolf
// @match        https://buildit-app-2rb60-0-0-69-webview.devvit.net/*
// @icon         https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.OQUmyWhXYjOS7w7IcFOamQHaHa%3Fpid%3DApi&f=1&ipt=a7feb0151472ae5509ce81fccd38ebde3985945a98a22e976f6aeb66f3c6a6fb
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function promptAlways(message, defaultValue = "") {
  return new Promise(resolve => {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.background = "rgba(0,0,0,0.4)";
    overlay.style.zIndex = "10000";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";

    const box = document.createElement("div");
    box.style.background = "#222";
    box.style.padding = "12px";
    box.style.borderRadius = "6px";
    box.style.color = "white";
    box.style.fontFamily = "sans-serif";
    box.style.minWidth = "260px";

    const label = document.createElement("div");
    label.textContent = message;
    label.style.marginBottom = "6px";

    const input = document.createElement("input");
    input.value = defaultValue;
    input.style.width = "100%";
    input.style.marginBottom = "8px";

    const ok = document.createElement("button");
    ok.textContent = "OK";

    const cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancel.style.marginLeft = "6px";

    ok.onclick = () => cleanup(input.value);
    cancel.onclick = () => cleanup(null);

    input.onkeydown = e => {
      if (e.key === "Enter") ok.click();
      if (e.key === "Escape") cancel.click();
    };

    function cleanup(value) {
      document.body.removeChild(overlay);
      resolve(value);
    }

    box.append(label, input, ok, cancel);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    input.focus();
  });}


  const makeButton = (text, onClick) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.className = "debug-btn";

    btn.style.position = "fixed";
    btn.style.top = `${10 + document.querySelectorAll(".debug-btn").length * 40}px`;
    btn.style.right = "10px";
    btn.style.zIndex = "9999";

    btn.onclick = onClick;
    document.body.appendChild(btn);
  };

  makeButton(
    "Force clear map (may cause corruption)",
    () => { map.allTiles = []; }
  );

  makeButton(
    "Change the name of the map",
    async () => {
      const name = await promptAlways("What name to give the map?");
      map.mapData.mapName = name;
    }
  );

  makeButton(
      "Force-publish the map",
      () => {redisFrontendServices.save()}
      )
})();