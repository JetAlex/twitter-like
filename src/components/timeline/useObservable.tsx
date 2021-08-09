import {useEffect, useState} from "react";
import {interval} from "rxjs";

import {IStateProps, ITweetProps, initialState} from "./timeline";

const VISIBLE_TWEETS_TIME = 30000;
const clearInterval$ = interval(1000);

export const useObservable = (observable: any) => {
  const [state, setState] = useState<IStateProps>(initialState);

  useEffect(() => {
    const sub = observable.subscribe((newPost: ITweetProps) => setState((prevState) => ({
      ...prevState,
      tweets: [newPost, ...prevState.tweets],
      numberOfTweets: prevState.numberOfTweets + 1
    })));

    const clear = clearInterval$.subscribe(() => {
      const currentTimestamp = Date.now();
      setState((prevState) => {
        let numberOfLikedTweets = prevState.numberOfLikedTweets;

        const filteredTweets = prevState.tweets.filter(({timestamp, isLiked}) => {
          const isExpired = currentTimestamp - timestamp > VISIBLE_TWEETS_TIME;
          isExpired && isLiked && numberOfLikedTweets--;
          return !isExpired;
        });

        return {
          ...prevState,
          tweets: filteredTweets,
          numberOfLikedTweets
        }
      })
    });

    return () => {
      sub.unsubscribe();
      clear.unsubscribe();
    }
  }, [observable]);

  return {
    state,
    setState
  };
};