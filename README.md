# Hackathon.2320040011
"AI-Powered emotion based learning system"
Here's the description for your project, excluding the login page:

### MoodMentor: AI-Powered Emotion-Based Learning Assistant

**Overview:**  
MoodMentor is an AI-driven web application that adapts the learning experience based on a user's emotional state. Using real-time facial emotion detection via webcam, the system identifies the user's mood (happy, sad, angry, confused, or frustrated) and provides personalized learning pathways and motivational prompts to enhance the learning experience.

**Key Features:**
- **Emotion Detection:**  
  Utilizes the webcam to capture real-time video and process the user's emotions. The emotions detected include sadness, happiness, anger, confusion, and frustration.
  
- **Personalized Learning Path:**  
  Once an emotion is detected, the app generates a tailored learning path to help the user focus on their studies based on their current emotional state.
  
- **Motivational Prompts:**  
  The application generates two types of motivational messages: one focused on academic goals and one focusing on overall well-being. This provides users with encouragement relevant to both their emotional state and learning needs.

**Technologies Used:**
- **Next.js** for building the application.
- **TensorFlow.js** (via OpenCV) for detecting facial emotions from the webcam feed.
- **OpenAI GPT-4** for generating personalized learning paths and motivational content.
- **React** for dynamic rendering and user interaction.

---

How It Works:

1. **Emotion Detection:**  
   - The user accesses the application, and their webcam feed is displayed.
   - A snapshot is taken to detect the user's emotion using a simulated emotion detection algorithm.
   
2. **Learning Path Generation:**  
   - Based on the detected emotion, the application queries OpenAI's GPT-4 to generate a tailored learning path designed to motivate and guide the user based on their current state.

3. **Motivational Content:**  
   - After detecting the emotion, the system generates motivational messages for the user. These messages are designed to uplift the user, offering both educational motivation and personal life encouragement.

This approach helps users stay engaged in their learning journey, adapt to emotional fluctuations, and receive real-time assistance tailored to their mood.

Let me know if you need any further details or adjustments!
