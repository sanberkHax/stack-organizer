import { Comment } from './Comment';
export const Question = () => {
  return (
    <div className="question">
      <div className="interaction-ctn">
        <p className="question__vote-count">0 Vote</p>
        <p className="question__answer-count">0 Answer</p>
      </div>
      <h2 className="heading-primary question__title">Title</h2>
      <p className="question__text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
        voluptatem eius excepturi corrupti commodi illum corporis veniam
        doloremque. Blanditiis eius quos rerum aut iure cumque, ad sapiente
        tempora amet minima aliquam nesciunt optio debitis aperiam eligendi
        numquam eos totam, rem nihil nulla id in quaerat facilis. Et reiciendis
        architecto tempore omnis distinctio a aliquam error? A assumenda
        suscipit, iste soluta ipsam saepe. Commodi velit iure facilis ab ipsa
        maxime officia expedita enim? Culpa maxime atque ratione rerum deleniti,
        in eligendi, repudiandae modi similique amet velit necessitatibus
        doloribus? Dolores, impedit! Est sed dolores beatae nobis fugiat quas
        illo porro, nostrum praesentium.
      </p>
      <p className="question__owner">Username</p>
      <h2 className="question__title heading-primary">Comments</h2>
      <Comment />
      <Comment />
      <Comment />
      <button className="question__details-btn">See Details</button>
    </div>
  );
};
