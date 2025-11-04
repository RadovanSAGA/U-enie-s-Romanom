import { useState } from 'react'
import { useTweetStore } from '../store/tweetStore'

export const TweetBox = () => {
  const [text, setText] = useState('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editText, setEditText] = useState('')
  
  const { tweets, addTweet, deleteTweet, deleteAll, editTweet } = useTweetStore()

  const handleSubmit = () => {
    addTweet(text)
    setText('')
  }

  const handleEditStart = (index: number, currentText: string) => {
    setEditingIndex(index)
    setEditText(currentText)
  }

  const handleEditSave = (index: number) => {
    editTweet(index, editText)
    setEditingIndex(null)
    setEditText('')
  }

  const handleEditCancel = () => {
    setEditingIndex(null)
    setEditText('')
  }

  const handleTweetDelete = (index: number) => {
    deleteTweet(index)
  }

  const handleDeleteAll = () => {
    deleteAll()
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

      <button onClick={handleDeleteAll}>Vymazať všetko</button>

      {tweets.map((tweet, index) => (
        <div key={index}>
          {editingIndex === index ? (
            <div>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => handleEditSave(index)}>Uložiť</button>
              <button onClick={handleEditCancel}>Zrušiť</button>
            </div>
          ) : (
            <div>
              <span>{tweet}</span>
              <button onClick={() => handleEditStart(index, tweet)}>Upraviť</button>
              <button onClick={() => handleTweetDelete(index)}>Zmazať</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}