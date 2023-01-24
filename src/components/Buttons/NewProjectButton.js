import { Button } from '../Button';

export const NewProjectButton = ({ ...props }) => {
  return (
    <Button
      aria-label="New Project"
      className="projects-sidebar__add-btn"
      icon="newProject"
      {...props}
    >
      <h2 className="heading-secondary projects-sidebar__heading">
        New Project
      </h2>
    </Button>
  );
};
