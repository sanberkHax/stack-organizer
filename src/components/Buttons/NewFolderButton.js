import { Button } from '../Button';

export const NewFolderButton = ({ ...props }) => {
  return (
    <Button
      aria-label="New Folder"
      className="new-folder-btn"
      icon="newFolder"
      {...props}
    >
      <h2 className="heading-secondary">New Folder</h2>
    </Button>
  );
};
