const videoUrlInput = document.getElementById('videoUrl');
const loadVideoButton = document.getElementById('loadVideo');
const video = document.getElementById('video');

const socket = io();

loadVideoButton.onclick = () => {
    const url = videoUrlInput.value;
    video.src = url;
    video.play();
    socket.emit('videoLoaded', url);
};

socket.on('videoLoaded', (url) => {
    video.src = url;
    video.play();
});

video.onplay = () => {
    socket.emit('videoPlayed', video.currentTime);
};

video.onpause = () => {
    socket.emit('videoPaused', video.currentTime);
};

socket.on('videoPlayed', (time) => {
    video.currentTime = time;
    video.play();
});

socket.on('videoPaused', (time) => {
    video.currentTime = time;
    video.pause();
});
