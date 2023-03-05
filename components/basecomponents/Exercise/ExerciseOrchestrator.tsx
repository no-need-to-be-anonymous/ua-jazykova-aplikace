import React, { useEffect } from 'react';
import { useLanguage } from 'utils/useLanguageHook';
import { ExerciseType, useExerciseStore, ExerciseStoreStatus } from './exerciseStore';
import { ExerciseIdentification, ExerciseIdentificationComponent } from './ExerciseIdentification';
import { CategoryDataObject } from 'utils/getDataUtils';

// TODO: integrate to dictionary
interface ExerciseOrchestratorProps {
  categories: CategoryDataObject['id'][];
}

// warning: language switching triggers change for all props
export const ExerciseOrchestrator = ({ categories }: ExerciseOrchestratorProps) => {
  const lang = useLanguage();
  const init = useExerciseStore((state) => state.init);
  const setLang = useExerciseStore((state) => state.setLang);
  const setCategories = useExerciseStore((state) => state.setCategories);
  const status = useExerciseStore((state) => state.status);
  const exerciseList = useExerciseStore((state) => state.exerciseList);
  const getActiveExerciseIndex = useExerciseStore((state) => state.getActiveExerciseIndex);

  useEffect(() => {
    setLang(lang);
  }, [setLang, lang]);

  useEffect(() => {
    setCategories(categories);
  }, [setCategories, categories]);

  useEffect(() => {
    init();
  }, [init]);

  if (status === ExerciseStoreStatus.uninitialized) return <p>waitting for init...</p>;

  if (status === ExerciseStoreStatus.completed) return <p>exercise completed...</p>;

  const exercise = exerciseList[getActiveExerciseIndex()];

  switch (exercise.type as ExerciseType) {
    case ExerciseType.identification:
      return <ExerciseIdentificationComponent key={exercise.id} exercise={exercise as ExerciseIdentification} />;
    default:
      return <p>something went wrong...</p>;
  }
};
