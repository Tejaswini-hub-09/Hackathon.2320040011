"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export default function Dashboard() {
  const [emotion, setEmotion] = useState<string | null>(null)
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
    // In a real application, you would send the image to a server for emotion detection
    // For this example, we'll simulate the emotion detection with a random emotion
    const emotions = ["happy", "sad", "neutral", "excited", "frustrated"]
    const detectedEmotion = emotions[Math.floor(Math.random() * emotions.length)]
    setEmotion(detectedEmotion)
    generateLearningPath(detectedEmotion)
    generateMotivation(detectedEmotion)
  }

  const generateLearningPath = async (detectedEmotion: string) => {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Generate a brief learning path for a student who is feeling ${detectedEmotion}. The path should be motivating and tailored to their current emotional state.`,
    })
    setLearningPath(text)
  }

  const generateMotivation = async (detectedEmotion: string) => {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Provide a short motivational message for a student who is feeling ${detectedEmotion}. The message should be encouraging and relevant to their emotional state.`,
    })
    setMotivation(text)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-3xl font-bold">MoodMentor Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Emotion Detection</CardTitle>
          </CardHeader>
          <CardContent>
            <video ref={videoRef} autoPlay muted className="mb-4 w-full rounded-lg" />
            <canvas ref={canvasRef} style={{ display: "none" }} width="640" height="480" />
            <Button onClick={captureImage} className="w-full">
              Detect Emotion
            </Button>
            {emotion && <p className="mt-4 text-lg font-semibold">Detected Emotion: {emotion}</p>}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Learning Path</CardTitle>
          </CardHeader>
          <CardContent>
            {learningPath ? <p>{learningPath}</p> : <p>Detect an emotion to generate a personalized learning path.</p>}
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Motivation</CardTitle>
          </CardHeader>
          <CardContent>
            {motivation ? <p>{motivation}</p> : <p>Detect an emotion to receive motivation.</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

