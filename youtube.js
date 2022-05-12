const songTitle =
  "#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > yt-formatted-string";
const artist =
  "#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.content-info-wrapper.style-scope.ytmusic-player-bar > span > span.subtitle.style-scope.ytmusic-player-bar > yt-formatted-string > a:nth-child(1)";

function interleave(a1, a2) {
  return a1.flatMap((v, i) => [v, a2[i]]);
}

function query(strings, ...selectors) {
  return interleave(
    strings,
    selectors.map((s) => document.querySelector(s).innerText)
  ).join("");
}

let alreadyAdded = false;

chrome.runtime.onMessage.addListener((msg, _, respond) => {
  respond("");
  if (msg !== "update" || alreadyAdded) return;
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = chrome.runtime.getURL("style.css");

  document.head.append(stylesheet);

  const button = document.createElement("button");
  fetch(chrome.runtime.getURL("icon.svg"))
    .then((response) => response.text())
    .then((icon) => {
      button.innerHTML = icon;
    });
  button.id = "jemand2001_lyrics-button";
  button.onclick = function () {
    const lyricsPage = query`${artist} ${songTitle} lyrics`.replace(
      /\s+/g,
      "-"
    );
    window.open(`https://genius.com/${lyricsPage}`, "_blank");
  };

  document
    .querySelector("div#right-controls .right-controls-buttons")
    .append(button);
  alreadyAdded = true;
});
