import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  AudioPlayerContainer,
  ProgressBarContainer,
  ProgressBarBackground,
  ProgressBarForeground,
  PlayButton,
} from "./styles";

const AudioPlayer = () => {
  const router = useRouter();
  const { audioBookId, path } = router.query; 
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fetchAudioStream = async () => {
    if (!token) {
      toast.error("You need to be logged in to access this audio.");
      return;
    }

    try {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
        }/audiobooks/stream?path=${encodeURIComponent(
          path as string
        )}&audio_book_id=${encodeURIComponent(audioBookId as string)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch audio stream.");
      }

      const audioBlob = await response.blob();
      setAudioUrl(URL.createObjectURL(audioBlob));
    } catch (error) {
      toast.error("Failed to load audio stream.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (path && audioBookId) {
      fetchAudioStream();
    }
  }, [path, audioBookId, token]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    const { currentTime, duration } = audioRef.current;
    setProgress((currentTime / duration) * 100);
  };

  const handleProgressBarClick = (event: React.MouseEvent) => {
    if (!audioRef.current) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const width = rect.width;
    const newProgress = (clickX / width) * 100;

    setProgress(newProgress);
    audioRef.current.currentTime =
      (audioRef.current.duration * newProgress) / 100;
  };

  return (
    <AudioPlayerContainer>
      <ProgressBarContainer onClick={handleProgressBarClick}>
        <ProgressBarBackground />
        <ProgressBarForeground progress={progress} />
      </ProgressBarContainer>
      <PlayButton
        onClick={handlePlayPause}
        className={isPlaying ? "pause" : ""}
      ></PlayButton>
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </AudioPlayerContainer>
  );
};

export default AudioPlayer;
