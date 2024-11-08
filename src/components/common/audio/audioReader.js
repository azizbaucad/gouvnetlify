import {
  Box,
  HStack,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState, useRef } from 'react';
import { FaPause, FaPlay, FaRedo, FaUndo, FaVolumeUp } from 'react-icons/fa';

export const AudioReader = ({ src, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const updateCurrentTime = () => {
      setCurrentTime(audio.currentTime);
    };

    if (audio) {
      audio.addEventListener('loadeddata', setAudioData);
      audio.addEventListener('timeupdate', updateCurrentTime);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('loadeddata', setAudioData);
        audio.removeEventListener('timeupdate', updateCurrentTime);
      }
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = (value) => {
    const audio = audioRef.current;
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Box
      borderRadius="md"
      border="1px solid"
      borderColor="gray.300"
      p={4}
      w="100%"
      bg="#f1f5f9"
    >
      <HStack spacing={4 }>
        {/* Play and Pause button */}
        <IconButton
          aria-label="Play/Pause"
          icon={isPlaying ? <FaPause /> : <FaPlay />}
          onClick={togglePlayPause}
          isRound
          size="lg"
          bgColor={'#47b199'}
          color='#fff'
          _hover={{
            bgColor: '#3f9f89',
            color: '#fff' // Set custom hover background color
          }}
        />

        <Text
          fontSize="16"
          fontWeight="500"
          flex="1"
          fontFamily="'Roboto mon', sans-serif"
        >
          {title}
        </Text>

        <IconButton
          icon={<FaUndo />}
          aria-label="Rewind"
          variant="ghost"
          size="sm"
        />
        <IconButton
          icon={<FaRedo />}
          aria-label="Forward"
          variant="ghost"
          size="sm"
        />
      </HStack>
      {/* Slider for progress */}
      <HStack mt={4} spacing={4}>
        <Text>{formatTime(currentTime)}</Text>
        <Slider
          aria-label="audio-progress"
          value={currentTime}
          max={duration}
          onChange={handleSliderChange}
          flex="1"
        >
          <SliderTrack bg="gray.200">
            <SliderFilledTrack bg="blue.500" />
          </SliderTrack>
          <SliderThumb boxSize={4} />
        </Slider>
        <Text>{formatTime(duration)}</Text>
      </HStack>

      {/* Volume control and other icons */}
      <HStack justifyContent="flex-end" mt={4}>
        <IconButton icon={<FaVolumeUp />} aria-label="Volume" variant="ghost" />
      </HStack>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={src} preload='metadata' />
    </Box>
  );
};
