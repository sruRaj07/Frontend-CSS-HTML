const cameraFeed = document.getElementById('cameraFeed');
const startRecordingBtn = document.getElementById('startRecording');
const stopRecordingBtn = document.getElementById('stopRecording');
const buttonsContainer = document.querySelector('.buttons');
let mediaRecorder;
let audioChunks = [];

// Access both video and audio
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        cameraFeed.srcObject = stream;

        // Initialize MediaRecorder for audio
        mediaRecorder = new MediaRecorder(stream);

        // Capture audio data chunks
        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        // When recording stops, save the audio file
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);

            // Create a button for downloading the recording
            const downloadButton = document.createElement('button');
            downloadButton.textContent = 'Download Recording';
            downloadButton.classList.add('download-button'); // Add a class for styling

            // Set up the download action on button click
            downloadButton.onclick = () => {
                const downloadLink = document.createElement('a');
                downloadLink.href = audioUrl;
                downloadLink.download = 'recording.wav';
                downloadLink.click();
            };

            // Append the download button to the buttons container
            buttonsContainer.appendChild(downloadButton);

            // Clear chunks for future recordings
            audioChunks = [];
        };

        // Enable start button
        startRecordingBtn.disabled = false;
    })
    .catch(error => {
        console.error('Error accessing camera or microphone', error);
    });

// Start recording audio
startRecordingBtn.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state === 'inactive') {
        mediaRecorder.start();
        startRecordingBtn.disabled = true;
        stopRecordingBtn.disabled = false;
    }
});

// Stop recording audio
stopRecordingBtn.addEventListener('click', () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        startRecordingBtn.disabled = false;
        stopRecordingBtn.disabled = true;
    }
});