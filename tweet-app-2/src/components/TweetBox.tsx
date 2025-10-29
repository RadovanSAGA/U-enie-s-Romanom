import { useState } from 'react'
import { useTweetStore } from '../store/tweetStore'

export const TweetBox = () => {
  const [text, setText] = useState('')
  const { tweets, addTweet, deleteTweet, deleteAll } = useTweetStore()

  const handleSubmit = () => {
    addTweet(text)
    setText('')
  }

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (e.shiftKey) {
              return
            }
            e.preventDefault()
            handleSubmit()
          }
        }}
      />

      <p style={{ color: text.length > 280 ? 'red' : 'grey' }}>
        {text.length} / 280
      </p>

      <button
        onClick={handleSubmit}
        disabled={text.trim() === '' || text.length > 280}
      >
        Tweet
      </button>

      {tweets.length === 0 && <p>Zatiaľ žiadne nové tweety</p>}

      <button onClick={deleteAll}>Vymazať všetko</button>

      {tweets.map((tweet, index) => (
        <div key={index}>
          <span>{tweet}</span>
          <button onClick={() => deleteTweet(index)}>Zmazať</button>
        </div>
      ))}
    </div>
  )
}

