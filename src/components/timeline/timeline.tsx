import React, {useState} from 'react';
import './timeline.scss'

import {interval, merge} from "rxjs";
import {map} from "rxjs/operators";
import Post from "../post/post";
import ToggleSwitch from "./toggle-switch";
import {useObservable} from "./useObservable";

export interface ITweetProps {
  timestamp: number;
  account: string;
  content: string;
  isLiked?: boolean;
}

export interface IStateProps {
  tweets: ITweetProps[],
  numberOfTweets: number;
  numberOfLikedTweets: number;
}

const createTweetSource = (frequency: number, account: string, attribute: string) => {
  return interval(frequency).pipe(map(i => ({
    account,
    timestamp: Date.now(),
    content: `${attribute} Tweet number ${i + 1}`
  })));
};

const tweets$ = merge(
  createTweetSource(5000, 'AwardsDarwin', 'Facepalm'),
  createTweetSource(3000, 'iamdevloper', 'Expert'),
  createTweetSource(5000, 'CommitStrip', 'Funny')
);
//tweets.subscribe(console.log.bind(console));

export const initialState = {
  tweets: [],
  numberOfTweets: 0,
  numberOfLikedTweets: 0
};

function Timeline() {

  const {
    state: {
      tweets,
      numberOfTweets,
      numberOfLikedTweets
    }, setState
  } = useObservable(tweets$);

  const [showLikedTweets, setShowLikedTweets] = useState(false);

  const toggleLike = (tweetKey: number, isLiked: boolean) => {
    setState((prevState) => ({
        ...prevState,
        tweets: prevState.tweets.map((tweet) => tweet.timestamp === tweetKey ? {
          ...tweet,
          isLiked: !isLiked
        } : tweet),
        numberOfLikedTweets: numberOfLikedTweets + (isLiked ? -1 : 1),
      })
    )
  };

  const clearTweets = () => setState(initialState);

  const filteredTweets = tweets.filter(({isLiked}) => !showLikedTweets || isLiked);

  return (
    <div className="m-timeline">
      <div className="s-timeline-controls">
        <div className="s-info">
          <div><span className="s-label">Total tweets</span> {numberOfTweets}</div>
          <div><span className="s-label">Liked tweets</span> {numberOfLikedTweets}</div>
        </div>
        <ToggleSwitch setFilter={() => setShowLikedTweets(!showLikedTweets)}/>
      </div>
      <div className="s-timeline-controls">
        <button className="s-button-clear-all" onClick={clearTweets}>Clear all Tweets</button>
      </div>
      {filteredTweets.map((props: ITweetProps) => (
        <Post
          key={props.timestamp}
          toggleLike={() => toggleLike(props.timestamp, !!props.isLiked)}
          {...props}
        />
      ))}

    </div>
  );
}

export default Timeline;
