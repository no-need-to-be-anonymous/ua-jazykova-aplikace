import { useRef, useState } from "react";
import { Button } from "components/basecomponents/Button";
import { animation } from "../utils/animation";

interface PlayButtonProps {
    play: () => Promise<void>;
    text: string;
    inactive?: boolean;
  }

export const PlayButton = ({ play, text, inactive = false }: PlayButtonProps) => {
    const [playing, setPlaying] = useState(false);
    const btnRef = useRef(null);
    return (
      <Button
        className="bg-primary-blue mr-3"
        text={text}
        ref={btnRef}
        onClick={async () => {
          if (btnRef.current === null) return;
          if (playing || inactive) return;
          const anim = animation.breathe(btnRef.current); // infinite loop animation
          setPlaying(true);
          await play();
          setPlaying(false);
          anim.restart();
          anim.pause();
        }}
      />
    );
  };