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

if (location.pathname == "/watch") {
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = chrome.runtime.getURL("style.css");

  document.head.append(stylesheet);

  button = document.createElement("button");
  // button.innerText = "Lyrics";
  fetch(chrome.runtime.getURL("icon.svg"))
    .then((response) => response.text())
    .then((icon) => {
      button.innerHTML = icon;
    });
  button.id = "jemand2001_lyrics-button";
  button.onclick = function () {
    const searchQuery = new URLSearchParams({
      q: query`${songTitle} ${artist}`,
    });
    window.open(`https://genius.com/search?${searchQuery}`, "_blank");
  };

  controls = document.querySelector("div#right-controls .right-controls-buttons");
  controls.append(button);
}
