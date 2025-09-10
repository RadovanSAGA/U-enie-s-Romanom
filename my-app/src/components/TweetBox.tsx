import { useState } from 'react';
import { TextField, Button } from '@mui/material';

type Props = {
  onAddTweet: (text: string) => void;
}

export function TweetBox({ onAddTweet }: Props) {
  const [text, setText] = useState('')

  const handleSubmit = () => {
    if (text.trim()) {
      onAddTweet(text.trim())
      setText('')
    }
  };

  return (
    <div>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Napíš tweet...'
        multiline
        rows={3}
        fullWidth
        variant='outlined'
      />
      <br />
      <Button onClick={handleSubmit} variant="contained"
        color='primary'>Odoslať</Button>
    </div>
  )
}