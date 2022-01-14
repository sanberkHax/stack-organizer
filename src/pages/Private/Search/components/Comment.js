export const Comment = ({ owner, body, votes }) => {
  return (
    <li className="question__comment">
      <p className="comment__vote-count">{votes}</p>
      <p
        className="comment__text"
        dangerouslySetInnerHTML={{
          __html: `${body} <span class="comment__owner">- ${owner}</span>`,
        }}
      ></p>
    </li>
  );
};
