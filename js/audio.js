(() => {
  document.querySelectorAll(".audio-box").forEach(tile => {
    const audio = tile.querySelector("audio");
    const toggle = tile.querySelector(".audio-toggle");
    const time = tile.querySelector(".audio-time");
    if (!audio || !toggle || !time) return;

    const formatTime = seconds => {
      if (!Number.isFinite(seconds)) return "0:00";
      return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
    };

    const update = () => {
      toggle.textContent = audio.paused ? "▶" : "Ⅱ";
      toggle.setAttribute("aria-label", audio.paused ? "Play narration" : "Pause narration");
      time.textContent = formatTime(audio.currentTime);
    };

    toggle.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      audio.paused ? audio.play() : audio.pause();
    });
    audio.addEventListener("play", update);
    audio.addEventListener("pause", update);
    audio.addEventListener("ended", update);
    audio.addEventListener("timeupdate", update);
    update();
  });
})();
