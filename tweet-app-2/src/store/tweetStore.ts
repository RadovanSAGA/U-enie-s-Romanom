import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type TweetStore = {
  tweets: string[]
  addTweet: (text: string) => void
  deleteTweet: (index: number) => void
  deleteAll: () => void
  editTweet: (index: number, newText: string) => void
}

export const useTweetStore = create<TweetStore>()(
  persist(
    (set) => ({
      tweets: [],
      
      addTweet: (text) => {
        set((state) => ({
          tweets: [text, ...state.tweets]
        }))
      },
      
      deleteTweet: (index) => {
        set((state) => ({
          tweets: state.tweets.filter((tweet, i) => i !== index)
        }))
      },
      
      deleteAll: () => {
        set({ tweets: [] })
      },
      
      editTweet: (index, newText) => {
        set((state) => ({
          tweets: state.tweets.map((tweet, i) => 
            i === index ? newText : tweet
          )
        }))
      }
    }),
    {
      name: 'tweet-store'
    }
  )
)