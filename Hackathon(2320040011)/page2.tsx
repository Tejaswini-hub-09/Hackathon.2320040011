"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

type Emotion = "sad" | "happy" | "angry" | "confused" | "frustrated"

const emotionResponses: Record<Emotion, string> = {
  sad: "Keep going with positive thoughts. Try to focus and avoid distractions.",
  happy: "Celebrate your success! Now's a great time to tackle more challenging tasks.",
  angry: "Take a moment to breathe and calm down. A short break can help you refocus.",
  confused: "Let's break things down. We'll start with simpler content to clarify concepts.",
  frustrated: "It's okay to feel stuck. Take a short break or try something easier to boost your confidence.",
}

export default function Home() {
  const [emotion, setEmotion] = useState<Emotion | null>(null)
  const [learningPath, setLearningPath] = useState<string | null>(null)
  const [motivation, setMotivation] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch((error) => {
          console.error("Error accessing the camera:", error)
        })
    }
  }, [])

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d")
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 640, 480)
        const imageData = canvasRef.current.toDataURL("image/jpeg")
        detectEmotion(imageData)
      }
    }
  }

  const detectEmotion = async (imageData: string) => {
    // Simulating emotion detection
    const emotions: Emotion[] = ["sad", "happy", "angry", "confused", "frustrated"]
    const detectedEmotion = emotions[Math.floor(Math.random() * emotions.length)]
    setEmotion(detectedEmotion)
    generateLearningPath(detectedEmotion)
    generateMotivation(detectedEmotion)
  }

  const generateLearningPath = async (detectedEmotion: Emotion) => {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Generate a brief learning path for a student who is feeling ${detectedEmotion}. The path should be motivating, tailored to their current emotional state, and incorporate the following advice: ${emotionResponses[detectedEmotion]}`,
    })
    setLearningPath(text)
  }

  const generateMotivation = async (detectedEmotion: Emotion) => {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Given that the student is feeling ${detectedEmotion}, provide two short motivational messages:
    1. An educational motivation related to studying, learning, or academic goals. Incorporate this advice: ${emotionResponses[detectedEmotion]}
    2. A personal life motivation addressing overall well-being, relationships, or personal growth.
    Each message should be encouraging, relevant to their emotional state, and no longer than two sentences.`,
    })
    setMotivation(text)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="container mx-auto">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">MoodMentor</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-white/90">
            <CardHeader>
              <CardTitle>Emotion Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <video ref={videoRef} autoPlay muted className="mb-4 w-full rounded-lg" />
              <canvas ref={canvasRef} style={{ display: "none" }} width="640" height="480" />
              <Button onClick={captureImage} className="w-full">
                Detect Emotion
              </Button>
              {emotion && (
                <div className="mt-4 text-center">
                  <p className="text-lg font-semibold">Detected Emotion: {emotion}</p>
                  <p className="mt-2 text-sm">{emotionResponses[emotion]}</p>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="bg-white/90">
            <CardHeader>
              <CardTitle>Learning Path</CardTitle>
            </CardHeader>
            <CardContent>
              {learningPath ? (
                <p>{learningPath}</p>
              ) : (
                <p>Detect an emotion to generate a personalized learning path.</p>
              )}
            </CardContent>
          </Card>
          <Card className="bg-white/90 md:col-span-2">
            <CardHeader>
              <CardTitle>Motivation</CardTitle>
            </CardHeader>
            <CardContent>
              {motivation ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Educational Motivation:</h3>
                    <p>{motivation.split("\n")[0]}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Personal Life Motivation:</h3>
                    <p>{motivation.split("\n")[1]}</p>
                  </div>
                </div>
              ) : (
                <p>Detect an emotion to receive motivation for your education and personal life.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

