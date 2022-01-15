import Highlight from 'react-highlight';
import { Comment } from '../../Search/components/Comment';
import { SaveAsButton } from '../../../../components/SaveAsButton';
export const Answer = ({ voteCount, comments, creation, body, owner }) => {
  const creationDate = new Date(creation * 1000).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });
  return (
    <li className="answer">
      <div className="interaction-ctn">
        <p className="answer__vote-count">
          {voteCount > 1 ? `${voteCount} votes` : `${voteCount} vote`}
        </p>
      </div>

      <Highlight
        className="answer__body"
        innerHTML={true}
      >{`${body}`}</Highlight>
      <div className="answer__details">
        <p className="answer__owner">{owner}</p>
        <p>{creationDate}</p>
      </div>
      {comments && (
        <>
          <h2 className="question__title heading-primary">Comments</h2>
          <ul>
            {comments.map((comment) => (
              <Comment
                key={comment.comment_id}
                body={comment.body}
                owner={comment.owner.display_name}
              />
            ))}
          </ul>
        </>
      )}
      <SaveAsButton />
    </li>
  );
};
