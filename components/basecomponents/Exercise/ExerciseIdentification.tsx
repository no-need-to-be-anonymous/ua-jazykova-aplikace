import { Button } from 'components/basecomponents/Button';
import { ExerciseIdentification } from './exerciseStore';
import { useRef } from 'react';
import { animation } from './animation';

/* eslint-disable no-console */

interface ExerciseIdentificationComponentProps {
  exercise: ExerciseIdentification;
}

export const ExerciseIdentificationComponent = ({ exercise }: ExerciseIdentificationComponentProps) => {
  const btnRef = useRef(null);
  console.log('rerender');

  return (
    <div className="flex flex-col items-center">
      <div className="flex mb-3">
        <Button
          className="bg-primary-blue mr-3"
          text="PlayAudio"
          onClick={() => {
            if (btnRef.current !== null) animation.select(btnRef.current); // another way to animate
            exercise.playAudio();
          }}
          ref={btnRef}
        />
        <Button
          className="bg-primary-blue"
          text="PlayAudioSlow"
          onClick={exercise.playAudioSlow}
          ref={exercise.setPlayAudioSlowButtonRef}
        />
      </div>
      <div className="flex">
        {exercise.choices.map((choice) => (
          <Button className="bg-primary-blue mr-3" ref={choice.setRef} key={choice.id} text={choice.getText()} onClick={choice.select} />
        ))}
      </div>
    </div>
  );
};
