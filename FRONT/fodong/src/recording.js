let mediaRecorder;
const chunks = [];

export const startRecording = async (setChunks, setRecording) => {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: "screen" },
      audio: true,
    });
    const options = { mimeType: "video/webm" };
    mediaRecorder = new MediaRecorder(mediaStream, options);

    // chunks = [];
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        // chunks.push(event.data);
        setChunks((prev) => [...prev, event.data]);
      }
    };

    mediaRecorder.start();
    return mediaRecorder;
  } catch (error) {
    console.error("Error starting screen recording:", error);
  }
};

export const stopRecording = (mediaRecorder, chunks) => {
  if (!mediaRecorder) return;

  mediaRecorder.stop();
  mediaRecorder.onstop = async () => {
    const blob = new Blob(chunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "recording.webm";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    console.log("Recording stopped and saved");
  };

  mediaRecorder.stream.getTracks().forEach((track) => track.stop());
};
