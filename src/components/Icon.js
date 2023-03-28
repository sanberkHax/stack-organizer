import { ReactComponent as OrganizeIcon } from '../assets/organize-button.svg';
import { ReactComponent as SearchIcon } from '../assets/search-icon.svg';
import { ReactComponent as LogoutIcon } from '../assets/logout-button.svg';
import { ReactComponent as BackIcon } from '../assets/back.svg';
import { ReactComponent as StackOrganizerIcon } from '../assets/stack-organizer-icon.svg';
import { ReactComponent as StackOrganizerLogo } from '../assets/stack-organizer-logo.svg';
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg';
import { ReactComponent as DetailsIcon } from '../assets/details-icon.svg';
import { ReactComponent as CloseIcon } from '../assets/close-icon.svg';
import { ReactComponent as DeleteIcon } from '../assets/delete-icon.svg';
import { ReactComponent as FolderIcon } from '../assets/folder-icon.svg';
import { ReactComponent as AnswerIcon } from '../assets/answer-icon.svg';
import { ReactComponent as ProjectIcon } from '../assets/project-icon.svg';
import { ReactComponent as HelpIcon } from '../assets/help-icon.svg';
import { ReactComponent as NewFolderIcon } from '../assets/new-folder-icon.svg';
import { ReactComponent as NewProjectIcon } from '../assets/new-project-icon.svg';
import { ReactComponent as QuestionIcon } from '../assets/question-icon.svg';
import { ReactComponent as AddIcon } from '../assets/add-icon.svg';
import { ReactComponent as DocumentIcon } from '../assets/document-icon.svg';
import { ReactComponent as ForwardIcon } from '../assets/forward-icon.svg';
import { ReactComponent as NextIcon } from '../assets/next-icon.svg';

export const Icon = (props) => {
  const { name, ...svgProps } = props;

  const Icons = {
    organize: <OrganizeIcon {...svgProps} />,
    search: <SearchIcon {...svgProps} />,
    logout: <LogoutIcon {...svgProps} />,
    back: <BackIcon {...svgProps} />,
    stackOrganizerIcon: <StackOrganizerIcon {...svgProps} />,
    stackOrganizerLogo: <StackOrganizerLogo {...svgProps} />,
    edit: <EditIcon {...svgProps} />,
    details: <DetailsIcon {...svgProps} />,
    close: <CloseIcon {...svgProps} />,
    delete: <DeleteIcon {...svgProps} />,
    folder: <FolderIcon {...svgProps} />,
    answer: <AnswerIcon {...svgProps} />,
    help: <HelpIcon {...svgProps} />,
    project: <ProjectIcon {...svgProps} />,
    newFolder: <NewFolderIcon {...svgProps} />,
    newProject: <NewProjectIcon {...svgProps} />,
    question: <QuestionIcon {...svgProps} />,
    add: <AddIcon {...svgProps} />,
    document: <DocumentIcon {...svgProps} />,
    forward: <ForwardIcon {...svgProps} />,
    next: <NextIcon {...svgProps} />,
  };
  return Icons[name];
};
