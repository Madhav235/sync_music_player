console.log("music player functionality code loaded");

import { YOUTUBE_API_KEY } from "/config.js";
export let playerState = {
  songId: null,
};

async function searchYouTube(query) {
  console.log("New");
  console.log("Youtube search query started");
  console.log(query);
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&maxResults=5&key=${YOUTUBE_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error happened");
    console.error("Error fetching YouTube data:", error);
  }
}

export async function playSongOnPLayer(name, artist, videoIdExist) {
  console.log(`${name} ${artist}`);

  let videoId = videoIdExist;

  // check if video Id already given
  if (videoId === undefined) {
    // Access Video Id

    videoId = await accessVideoIdFromYoutube(name, artist);
    console.log(videoId);
    // console.log("I ran first");
  }
  // videoId = "hM2U8cb8lhI";

  // Sending accessed video ID to the iframe

  let status = sendingAcessIdToIframe(videoId);
  if (status === "VideoId Invalid") {
    console.log("VideoId Invalid");
  }
}

async function accessVideoIdFromYoutube(songName, songArtist) {
  console.log("sending request to the youtube");
  let data = await searchYouTube(`${songName} ${songArtist}`);

  if (!data || !data.items || data.items.length === 0) {
    console.log("No results");
    return null;
  }
  console.log(data);
  let videoId = null;

  for (let item of data.items) {
    if (item.id && item.id.videoId) {
      videoId = item.id.videoId;
      playerState.songId = videoId;
      break;
    }
  }
  console.log(videoId);
  return videoId;
}

function sendingAcessIdToIframe(videoId) {
  if (!videoId) return;

  const player = window.YTPlayerState.getPlayer();

  if (window.YTPlayerState.isReady()) {
    player.loadVideoById(videoId);
  } else {
    console.log("Player not ready, storing video");
    window.YTPlayerState.setPending(videoId);
  }
}

// Music player controls implementation

let stateChanged = function (state) {
  console.log("state changed");
  console.log(state);
  console.log("State change function triggered");

  if (state === 2) {
    playButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="currentColor" id="play-btn" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play-icon lucide-play">
                            <path
                                d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                        </svg>`;

    stopTimeTracking();
    clearProgressInterval();
  } else if (state === 1 || state === 3) {
    playButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" id="pause-btn" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause-icon lucide-pause"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>`;
    startTimeTracking();
    let totalDuration = player.getDuration();
    updateProgressBar(totalDuration);
  }
};

window.stateChanged = stateChanged;

// Play and pause Functionality

const playButton = document.querySelector("#jsPlayButton");

playButton.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!window.YTPlayerState || !window.YTPlayerState.isReady()) {
    console.log("Player is not ready yet");
    return;
  }

  let playerState = player.getPlayerState();

  if (playerState === 1) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
});

let tracking = null;

// song real time duration tracking

function startTimeTracking() {
  console.log("Time track started");
  // console.log("Tracking ID:", tracking);
  if (tracking) {
    clearInterval(tracking);
  }
  tracking = setInterval(() => {
    let currentTime = player.getCurrentTime();
    let totalDuration = player.getDuration();
    // console.log(`${currentTime} / ${totalDuration}`);
    let [totalMinute, totalSeconds] = formatInMinuteSeconds(totalDuration);
    updateProgressTime(currentTime, totalMinute, totalSeconds);
  }, 1000);
}

function stopTimeTracking() {
  console.log("Clearing Track interval");
  clearInterval(tracking);
}

export function formatInMinuteSeconds(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  // console.log(minutes,seconds)
  return [minutes, seconds];
}

function updateProgressTime(current, totalMinute, totalSeconds) {
  // console.log("Update Progress time is running");
  const currentTime = document.querySelector("#jsCurrentTime");
  const totalDuration = document.querySelector("#jsTotalDuration");

  let [currentMinute, currentSeconds] = formatInMinuteSeconds(current);

  // console.log(`${currentMinute}:${currentSeconds}/${totalMinute}:${totalSeconds}`);
  totalDuration.innerHTML = `${totalMinute}:${totalSeconds}`;

  if (currentSeconds < 10) {
    console.log("less");
    currentTime.innerHTML = `${currentMinute}:0${currentSeconds}`;
  } else {
    currentTime.innerHTML = `${currentMinute}:${currentSeconds}`;
  }
}

// progress bar sync

const timeLine = document.querySelector("#jsTimelineSlider");
const progress = document.querySelector("#jsSongProgress");
let value = 0;
let updateTime = null;

function updateProgressBar(time) {
  console.log("Update progress bar");
  if (updateTime) {
    clearInterval(updateTime);
  }

  updateTime = setInterval(() => {
    let currentTime = player.getCurrentTime();
    let currentPercentage = (Math.floor(currentTime) / time) * 100;
    // console.log(currentPercentage);

    progress.style.width = `${currentPercentage}%`;
  }, 50);
}

function clearProgressInterval() {
  console.log("Progress Interval cleared");
  clearInterval(updateTime);
}

// keyboard controls

// play pause song through the space bar

window.addEventListener("keyup", (e) => {
  // console.log(e.code);
  if (e.code === "Space") {
    if (player.getPlayerState() === 2) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
  }
});
