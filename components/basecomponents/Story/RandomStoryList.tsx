'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import stories from '../../../data/stories';
import { useLanguage } from 'utils/useLanguageHook';

const maxAttempts = 3;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const randomStories: any[] = [];
const storiesCount = stories.length;

for (let i = 0; i < maxAttempts && randomStories.length < 3; i++) {
  const randomIndex = Math.floor(Math.random() * storiesCount);
  const randomStory = stories[randomIndex];
  if (!randomStories.includes(randomStory)) {
    randomStories.push(randomStory);
  }
}

const RandomStoryList: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const [randomStoriesArray, setRandomStoriesArray] = useState<any[]>([]);

  useEffect(() => {
    setRandomStoriesArray(randomStories);
  }, [randomStoriesArray]);

  return (
    <div className="max-w-5xl mx-auto py-10">
      <ul className="grid gap-4 px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        {randomStoriesArray.map((story) => {
          return (
            <li key={story.slug} className="mb-8 bg-white shadow-m w-[354px] h-[354px] rounded-[32px]">
              <div>
                <Image
                  // className={`w-[354px] h-[266px] overflow-hidden rounded-t-[32px]`}
                  className="w-auto h-auto object-cover max-h-[266px]"
                  src={`/kids/${story.slug}.jpg`}
                  alt={story.title[currentLanguage]}
                  width={354}
                  height={200}
                />
                <Link href={`/kids/stories/${story.slug}`}>
                  <p className="bg-white h-[88px] font-bold text-xl text-center px-4 pt-4 pb-6 text-primary-blue rounded-b-[32px] flex items-center justify-center">
                    {story.title[currentLanguage]}
                  </p>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RandomStoryList;
