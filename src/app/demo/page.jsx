"use client"

// import React from 'react';
// import useVideoStream from '../../hooks/useVideoStream';
import React, { useRef, useEffect } from "react";
import io from "socket.io-client";
import * as Holistic from "@mediapipe/holistic";
import * as cam from "@mediapipe/camera_utils";

function useVideoStream() {
  const videoRef = useRef(null);
  const socketRef = useRef(null);
  const englishWordRef = useRef(null);
  const dzongkhaWordRef = useRef(null);
  let camera = null;

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");
    const video = videoRef.current;

    const holistic = new Holistic.Holistic({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`,
    });

    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      smoothSegmentation: false,
      refineFaceLandmarks: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    holistic.onResults((results) => {
      const keypoints = extractKeyPoints(results);
      socketRef.current.emit("keypoints", keypoints);
      
    });

    camera = new cam.Camera(video, {
      onFrame: async () => {
        await holistic.send({ image: video });
      },
      width: 640,
      height: 480,
    });
    camera.start();

    socketRef.current.on("data", (data) => {
      console.log("Received data from backend:", data);
      englishWordRef.current.textContent = data.english_word;
      dzongkhaWordRef.current.textContent = data.dzongkha_word;
      // if (englishWordRef.current) {
      //   englishWordRef.current.textContent = data.english_word;
      // }
      // if (dzongkhaWordRef.current) {
      //   dzongkhaWordRef.current.textContent = data.dzongkha_word;
      // }
    });

    return () => {
      camera.stop();
      socketRef.current.disconnect();
    };
  }, []);

  return { videoRef, englishWordRef, dzongkhaWordRef };
}

function extractKeyPoints(results) {
  // Extracting pose landmarks
  let pose = results.poseLandmarks
    ? results.poseLandmarks
        .map((landmark) => [
          landmark.x,
          landmark.y,
          landmark.z,
          landmark.visibility,
        ])
        .flat()
    : new Array(33 * 4).fill(0);

  // Extracting face landmarks
  let face = results.faceLandmarks
    ? results.faceLandmarks
        .map((landmark) => [landmark.x, landmark.y, landmark.z])
        .flat()
    : new Array(468 * 3).fill(0);

  // Extracting left hand landmarks
  let lh = results.leftHandLandmarks
    ? results.leftHandLandmarks
        .map((landmark) => [landmark.x, landmark.y, landmark.z])
        .flat()
    : new Array(21 * 3).fill(0);

  // Extracting right hand landmarks
  let rh = results.rightHandLandmarks
    ? results.rightHandLandmarks
        .map((landmark) => [landmark.x, landmark.y, landmark.z])
        .flat()
    : new Array(21 * 3).fill(0);

  // Combining all keypoints into one array
  return [...pose, ...face, ...lh, ...rh];
}

export default function Demo() {
  const { videoRef, englishWordRef, dzongkhaWordRef } = useVideoStream();

  return (
    <div className="flex justify-center items-center flex-col space-y-4 text-lg md:text-xl font-semibold p-4">
    <h2 className="text-center">Perform a sign in the frame below</h2>
    <div className="w-full max-w-[700px] overflow-hidden">
      <video
        ref={videoRef}
        width="700"
        height="480"
        autoPlay
        className="w-full h-auto rounded-lg"
      />
    </div>
    <h3>Predicted Word</h3>
    <div className="bg-white border-2 rounded-md border-primary p-2 md:p-4 h-24 md:h-28 w-full max-w-[640px] flex justify-center md:space-x-20 items-center">
      <div className="text-center">
        <h2 className="text-primary">Dzongkha:</h2>
        <p ref={dzongkhaWordRef} className="text-black"></p>
      </div>
      <div className="text-center">
        <h2 className="text-primary">English:</h2>
        <p ref={englishWordRef} className="text-black"></p>
      </div>
    </div>
  </div>
  );
}