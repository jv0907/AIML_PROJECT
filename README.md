# Smart Mood Detection & Improvement

A web-based application that uses AI-powered facial recognition to detect your current mood and provides personalized suggestions for emotional well-being and mental health improvements.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **🎥 Real-time Mood Detection**: Uses face-api.js to detect facial expressions and identify your current mood
- **😊 Mood Categories**: Recognizes 7 different emotional states:
  - Happy
  - Neutral
  - Surprised
  - Angry
  - Fearful
  - Disgusted
  - Sad

- **💡 Smart Suggestions**: Personalized recommendations based on your detected mood to help improve emotional well-being

- **🫁 Breathing Exercises**: Guided 4-7-8 breathing technique for stress relief and relaxation

- **📔 Journal**: Write and reflect on your thoughts and emotions

- **💬 Mental Health Tips**: Curated tips and strategies for emotional wellness

## Project Structure

```
smart-mood/
├── index.html      # Main HTML structure and UI
├── main.js         # Client-side logic and mood detection
├── server.js       # Node.js server for serving the application
├── styles.css      # Dark-themed UI styling
└── README.md       # This file
```

## Tech Stack

- **Frontend**:
  - HTML5
  - CSS3
  - Vanilla JavaScript (ES6+)
  - [Face-API.js](https://github.com/vladmandic/face-api) v0.22.2 - AI-powered facial recognition

- **Backend**:
  - Node.js
  - HTTP server

## Installation

### Prerequisites
- Node.js (v14 or higher)
- Webcam access (required for mood detection)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Setup

1. Clone or download the project:
```bash
git clone https://github.com/jv0907/AIML_PROJECT.git
cd AIML_PROJECT/smart-mood
```

2. Install dependencies (if any):
```bash
npm install
```

3. Start the server:
```bash
node server.js
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## Usage

### 1. Mood Detector
- Click the **Mood Detector** tab
- Allow camera access when prompted
- The app will analyze your facial expressions in real-time
- View your current mood and personalized suggestions

### 2. Breathing Exercise
- Click the **Breathing** tab
- Click **Start** to begin the 4-7-8 breathing technique
- The circle will guide your breathing rhythm:
  - Breath in for 4 seconds
  - Hold for 7 seconds
  - Exhale for 8 seconds
- Click **Stop** to end the exercise

### 3. Journal
- Click the **Journal** tab
- Write your thoughts and reflections
- Save your entries for personal reflection

### 4. Tips
- Click the **Tips** tab
- Browse curated mental health and wellness tips

## How It Works

### Mood Detection Algorithm
1. **Face Detection**: Face-api.js identifies faces in the webcam feed
2. **Expression Analysis**: Analyzes facial landmarks for emotional expressions
3. **Mood Classification**: Maps expressions to 7 emotional categories
4. **Suggestion Generation**: Provides context-specific recommendations

### Mood-to-Suggestion Mapping
Each detected mood triggers tailored suggestions:
- **Happy**: Gratitude practices, positive sharing, physical activity
- **Neutral**: Breathing exercises, music therapy, intention setting
- **Surprised**: Mindfulness, curiosity exploration, grounding techniques
- **Angry**: Breathing, cognitive reframing, physical breaks
- **Fearful**: Visualization, past achievements recall, social support
- **Disgusted**: Trigger analysis, environment changes, journaling
- **Sad**: Self-validation, comfort music, self-care planning

## Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Full Support |
| Firefox | ✅ Full Support |
| Safari  | ✅ Full Support |
| Edge    | ✅ Full Support |

## Privacy & Permissions

- **Camera Access**: Only required for mood detection. Your video feed is processed locally in your browser.
- **Data Storage**: All journal entries are stored locally in your browser. No data is sent to external servers.
- **Face Data**: Facial data is used only for emotion detection and is not stored or transmitted.

## Configuration

### Server Port
To change the server port, set the `PORT` environment variable:

```bash
# Windows
set PORT=3000
node server.js

# Linux/Mac
PORT=3000 node server.js
```

Default port: `5173`

## Performance Optimization

- Face-API models are loaded via CDN for faster initial load
- Local face detection processing keeps the app responsive
- Optimized CSS for smooth animations and transitions

## Troubleshooting

### Camera Not Working
- Ensure camera permissions are granted in browser settings
- Check if another app is using the camera
- Try a different browser

### Models Not Loading
- Check internet connection (Face-API requires CDN access)
- Clear browser cache and reload
- Try incognito mode

### Server Not Starting
- Ensure port 5173 is not in use
- Check Node.js is properly installed: `node --version`
- Try using a different port with `PORT=3000 node server.js`

## Future Enhancements

- [ ] Multi-face detection support
- [ ] Mood history and analytics
- [ ] Mood trend tracking
- [ ] Integration with calendar and reminders
- [ ] Mobile app version
- [ ] Dark/Light theme toggle
- [ ] Export journal entries
- [ ] Meditation and guided sessions
- [ ] Integration with health/fitness apps

## API Endpoints

The server provides static file serving with the following MIME types supported:

- `.html` - text/html
- `.js` - application/javascript
- `.css` - text/css
- `.json` - application/json
- `.png` - image/png
- `.jpg` - image/jpeg
- `.svg` - image/svg+xml
- `.ico` - image/x-icon

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Jyoti** - [GitHub Profile](https://github.com/jv0907)

## Acknowledgments

- [Face-API.js](https://github.com/vladmandic/face-api) - Face detection and recognition
- Mental health resources and wellness practices

## Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Disclaimer**: This application is for personal wellness and should not replace professional mental health care. If you're experiencing significant emotional distress, please consult with a mental health professional.
