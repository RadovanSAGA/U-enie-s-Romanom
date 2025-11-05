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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return
      }
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleEditStart = (index: number, currentText: string) => {
    setEditingIndex(index)
    setEditText(currentText)
  }

  const handleEditTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.target.value)
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
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
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
                onChange={handleEditTextChange}
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