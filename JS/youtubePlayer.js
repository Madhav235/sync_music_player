
let player;
let isPlayerReady = false;
let pendingVideoId = null;

// expose globally so modules can use
window.YTPlayerState = {
    getPlayer: () => player,
    isReady: () => isPlayerReady,
    setPending: (id) => pendingVideoId = id,
    getPending: () => pendingVideoId,
    clearPending: () => pendingVideoId = null
};

window.onYouTubeIframeAPIReady = function () {
    console.log("API READY");

    player = new YT.Player("jsYoutubeAudioPlayer", {
        height: "0",
        width: "0",
        playerVars: {
            autoplay: 1,
            controls: 0,
            origin: window.location.origin
        },
        events: {
            onReady: function () {
                console.log("Player ready");
                isPlayerReady = true;

                if (pendingVideoId) {
                    player.loadVideoById(pendingVideoId);
                    pendingVideoId = null;
                }
            },
              onStateChange: onPlayerStateChange
        }
    });
};

function onPlayerStateChange(event){
    // console.log(event.data);
    // console.log("State chnageddd");
    stateChanged(event.data);
}