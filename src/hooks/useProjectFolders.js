import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllFolders } from '../slices/foldersSlice';

export const useProjectFolders = (selectedProject) => {
  const [projectFolders, setProjectFolders] = useState();
  const [project, setProject] = useState(selectedProject);
  const folders = useSelector(selectAllFolders);

  useEffect(() => {
    const projectChildren = folders.filter((f) => f.project === project?.id);

    const nestedFolderIds = [];

    projectChildren.forEach((f) => {
      if (f.children) {
        nestedFolderIds.push(...f.children);
      }
    });

    const projectParents = projectChildren.filter(
      (f) => !nestedFolderIds.includes(f.id)
    );

    setProjectFolders(projectParents);
  }, [project]); // eslint-disable-line react-hooks/exhaustive-deps

  return [projectFolders, setProject];
};
