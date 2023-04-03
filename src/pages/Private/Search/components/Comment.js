import { toLocaleDate } from "../../../../utils/toLocaleDate";
import parse from "html-react-parser";

export const Comment = ({ owner, body, votes, date }) => {
  // Convert unix date format to Month/Day/Year
  const creationDate = toLocaleDate(date);

  return (
    <li className="question-details__comment">
      <p className="comment__vote-count">{votes}</p>
      <p className="comment__text">
        {parse(
          `${body} <span class="comment__owner">- ${owner}</span> <span class="comment__date">${creationDate}</span>`
        )}
      </p>
    </li>
  );
};
