import React, { useState, useEffect, useRef } from "react";
import {
  styled,
  Typography,
  Slider,
  Paper,
  Stack,
  Box,
  Button,
} from "@mui/material";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Replay10Icon from "@mui/icons-material/Replay10";
import Forward30Icon from "@mui/icons-material/Forward30";

const Div = styled("div")(({ theme }) => ({
  backgroundColor: "black",
  height: "100vh",
  width: "100vw",
  paddingTop: theme.spacing(6),
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#4c4c4c",
  marginLeft: theme.spacing(6),
  marginRight: theme.spacing(6),
  padding: theme.spacing(2),
}));

export default function Player() {
  const audioPlayer = useRef();
  const [playback, setPlayback] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [mute, setMute] = useState(false);

  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.current.volume = volume / 100;
    }
    if (isPlaying) {
      setInterval(() => {
        const _duration = Math.floor(audioPlayer?.current?.duration);
        const _elapsed = Math.floor(audioPlayer?.current?.currentTime);
        setDuration(_duration);
        setElapsed(_elapsed);
      }, 1000);
    }
  }, [volume, isPlaying]);

  function formatTime(time) {
    if (time && !isNaN(time)) {
      const hour =
        Math.floor(time / 60 / 60) < 10
          ? `0${Math.floor(time / 60 / 60)}`
          : Math.floor(time / 60 / 60);
      const minutes =
        Math.floor((time / 60) % 60) < 10
          ? `0${Math.floor((time / 60) % 60)}`
          : Math.floor((time / 60) % 60);
      const seconds =
        Math.floor(time % 60) < 10
          ? `0${Math.floor(time % 60)}`
          : Math.floor(time % 60);
      return `${hour}:${minutes}:${seconds}`;
    }
    return "00:00";
  }

  const togglePlay = () => {
    if (!isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
    setIsPlaying((prev) => !prev);
  };

  const toggleForward = () => {
    audioPlayer.current.currentTime += 30;
  };

  const toggleBackward = () => {
    audioPlayer.current.currentTime -= 5;
  };

  const toggleSkipForward = () => {
    if (audioPlayer.current.playbackRate < 2) {
      audioPlayer.current.playbackRate =
        audioPlayer.current.playbackRate + 0.25;
      setPlayback(audioPlayer.current.playbackRate);
    }
  };

  const toggleSkipBackward = () => {
    if (audioPlayer.current.playbackRate > 0.25) {
      audioPlayer.current.playbackRate =
        audioPlayer.current.playbackRate - 0.25;
      setPlayback(audioPlayer.current.playbackRate);
    }
  };

  function VolumeBtns() {
    return mute ? (
      <VolumeOffIcon
        sx={{ color: "#CCCBCC", "&:hover": { color: "white" } }}
        onClick={() => setMute(!mute)}
      />
    ) : volume <= 20 ? (
      <VolumeMuteIcon
        sx={{ color: "#CCCBCC", "&:hover": { color: "white" } }}
        onClick={() => setMute(!mute)}
      />
    ) : volume <= 75 ? (
      <VolumeDownIcon
        sx={{ color: "#CCCBCC", "&:hover": { color: "white" } }}
        onClick={() => setMute(!mute)}
      />
    ) : (
      <VolumeUpIcon
        sx={{ color: "#CCCBCC", "&:hover": { color: "white" } }}
        onClick={() => setMute(!mute)}
      />
    );
  }

  return (
    <Div>
      <audio
        src={
          "https://content.blubrry.com/takeituneasy/lex_ai_balaji_srinivasan.mp3"
        }
        ref={audioPlayer}
        muted={mute}
      />
      <CustomPaper>
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box>
            {!isPlaying ? (
              <PlayCircleIcon
                sx={{ fontSize: "70px" }}
                color="dark"
                onClick={togglePlay}
              />
            ) : (
              <PauseCircleIcon
                sx={{ fontSize: "70px" }}
                color="dark"
                onClick={togglePlay}
              />
            )}
          </Box>
          <Box sx={{ flex: "1 1 0", ml: "20px" }}>
            <Box>
              <Stack
                spacing={1}
                direction="row"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}>
                <Slider
                  sx={{ color: "#CCCBCC", height: "15px" }}
                  value={elapsed}
                  min={0}
                  max={duration}
                  size="large"
                  onChange={(e, v) => {
                    setElapsed(v);
                    audioPlayer.current.currentTime = v;
                  }}
                />
              </Stack>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", flex: "1 1 0" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    display: "flex",
                    marginRight: "30px",
                    alignItems: "center",
                  }}>
                  {`${playback}x`}
                  <Button
                    onClick={toggleSkipBackward}
                    sx={{
                      marginLeft: "15px",
                      border: "1px solid #CCCBCC",
                      minWidth: "28px",
                      height: "28px",
                    }}
                    size="small">
                    {" "}
                    <RemoveIcon sx={{ margin: "0", color: "#CCCBCC" }} />
                  </Button>
                  <Button
                    onClick={toggleSkipForward}
                    sx={{
                      border: "1px solid #CCCBCC",
                      minWidth: "28px",
                      height: "28px",
                    }}
                    size="small">
                    {" "}
                    <AddIcon sx={{ margin: "0", color: "#CCCBCC" }} />
                  </Button>
                  <Replay10Icon
                    sx={{
                      width: "35px",
                      height: "35px",
                      color: "#CCCBCC",
                      "&:hover": { color: "white" },
                    }}
                    onClick={toggleBackward}
                  />
                  <Forward30Icon
                    sx={{
                      width: "35px",
                      height: "35px",
                      color: "#CCCBCC",
                      "&:hover": { color: "white" },
                    }}
                    onClick={toggleForward}
                  />
                </Stack>
                <Stack direction="row" spacing={1} className="mainUi">
                  <VolumeBtns sx={{ color: "#CCCBCC" }} />
                  <Slider
                    className="childSlider"
                    sx={{
                      display: "none",
                      color: "#CCCBCC",
                      height: "15px",
                      marginLeft: "10px",
                    }}
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e, v) => setVolume(v)}
                  />
                </Stack>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ color: "#CCCBCC" }}>
                  {formatTime(elapsed)}
                </Typography>
                <Typography sx={{ color: "#CCCBCC" }}>/</Typography>
                <Typography sx={{ color: "#CCCBCC" }}>
                  {formatTime(duration - elapsed)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CustomPaper>
    </Div>
  );
}
