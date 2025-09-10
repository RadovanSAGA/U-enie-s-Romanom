import { TweetBox } from '../components/TweetBox';
import { useTweetStore } from '../store/useTweetStore';
import { Tweet } from '../components/Tweet';
import { Container } from '@mui/material';

function TweetPage() {
  const tweets = useTweetStore((state) => state.tweets);
  const addTweet = useTweetStore((state) => state.addTweet);
  const deleteTweet = useTweetStore((state) => state.deleteTweet);

  return (
    <Container maxWidth="sm" sx={{ padding: '20px' }}>
      <h1>Twitter</h1>
      <TweetBox onAddTweet={addTweet} />
      <div>
        {tweets.map((tweet, index) => (
          <Tweet key={index} text={tweet} onDelete={() => deleteTweet(index)}/>
        ))}
      </div>
    </Container>
  );
}

export default TweetPage;