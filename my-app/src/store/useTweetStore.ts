import { create } from 'zustand';
import { persist } from 'zustand/middleware';


type TweetStore = {
  tweets: string[];
  addTweet: (text: string) => void;
  deleteTweet: (index: number) => void;
};



export const useTweetStore = create<TweetStore>()(
  persist(
    (set) => ({
      tweets: [],
      addTweet: (text) =>
        set((state) => ({
          tweets: [...state.tweets, text],
        })),
      deleteTweet: (index) =>
        set((state) => ({
          tweets: state.tweets.filter((_, i) => i !== index),
        })),
    }),
    {
      name: 'tweet-store',
    }
  )
);

