navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;
const video = document.querySelector("#video");
const audio = document.querySelector("#audio");
const canvas = document.querySelector("#canvas");
const context = canvas.getContext("2d");
let model;

handTrack.startVideo(video).then((status) => {
  if (status) {
    navigator.getUserMedia(
      { video: {} },
      (stream) => {
        video.srcObect = stream;
        setInterval(runDetection, 1000);
      },
      (err) => {
        console.log(err);
      }
    );
  }
});
const modelParams = {
  flipHorizontal: true, // flip e.g for video
  imageScaleFactor: 0.7, // reduce input image size for gains in speed.
  maxNumBoxes: 20, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.5, // confidence threshold for predictions.
};
handTrack.load(modelParams).then((lmodel) => {
  model = lmodel;
});

function runDetection() {
  model.detect(video).then((predictions) => {
    console.log(predictions);
    //model.renderPredictions(predictions, canvas, context, video);
    if (predictions.length > 0) {
      audio.play();
    }
  });
}
