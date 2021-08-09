import React from 'react';
import moment from 'moment';
import './post.scss'

import { ReactComponent as Logo } from "../../img/twitter-logo.svg";
import { ReactComponent as Like } from "../../img/like.svg";
import reactLogo from "../../img/logo.svg";
import {ITweetProps} from "../timeline/timeline";

interface IPost extends ITweetProps {
  toggleLike: () => void;
}

function Post({
  account,
  content,
  isLiked,
  timestamp,
  toggleLike
}: IPost) {
  return (
    <div className={`m-post ${isLiked ? "is-liked" : ""}`}>
      <article role="article" tabIndex={0} className="s-post-wrapper">
        <div className="s-post-head">
          <div className="s-avatar" style={{
            backgroundImage: `url(${reactLogo})`
          }}/>
          <div className="s-autor-info">
            <span className="s-title">{account}</span>
            <span className="s-ref">@{account}</span>
          </div>
          <a href="" className="s-twitter-link">
            <Logo className="s-twitter-logo"/>
          </a>
        </div>
        <div className="s-post-body">
          {content}
        </div>
        <div className="s-date">
          {moment(timestamp).format('MM DD YYYY hh:mm:ss')}
        </div>
        <div className="s-post-footer">
          <button className="s-like-button" onClick={toggleLike}>
            <div className="s-like-icon-wrapper">
              <Like className="s-like-icon" />
            </div>
            <span className="s-like-counter">{isLiked ? 1 : 0}</span>
          </button>
        </div>
      </article>
    </div>
  );
}

export default React.memo(Post);
