import { SaveModal } from '../components/SaveModal';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '../../../../utils/test-utils';
import userEvent from '@testing-library/user-event';

describe('<SaveModal />', () => {
  beforeEach(() => {
    render(<SaveModal />);
  });

  it('renders properly', () => {
    const heading = screen.getByRole('heading', { name: /save as/i });
    const selectProject = screen.getByRole('heading', {
      name: /select project:/i,
    });
    const selectFolder = screen.getByRole('heading', {
      name: /select folder:/i,
    });
    const title = screen.getByLabelText(/name:/i);
    const note = screen.getByLabelText(/note:/i);

    expect(heading).toBeInTheDocument();
    expect(selectFolder).toBeInTheDocument();
    expect(selectProject).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(note).toBeInTheDocument();
  });

  it('adds a project and nested folders inside it then performs basic folder navigation', async () => {
    // Add new project and select it
    const addProjectButton = screen.getByRole('button', {
      name: 'add-project',
    });

    userEvent.click(addProjectButton);

    const projectTitleInput = screen.getByTestId('project-btn-input');

    userEvent.type(projectTitleInput, 'project test{enter}', {
      skipClick: true,
    });

    const projectButton = await screen.findByRole('button', {
      name: /project test/i,
    });

    expect(await screen.findByText(/project test/i)).toBeInTheDocument();

    userEvent.click(projectButton);

    // Add new folder and double click on it
    const addFolderButton = screen.getByRole('button', {
      name: /add-folder/i,
    });

    userEvent.click(addFolderButton);

    const folderTitleInput = screen.getByTestId(/folder-btn-input/i);

    userEvent.type(folderTitleInput, 'folder test{enter}', { skipClick: true });

    const folderButton = await screen.findByRole('button', {
      name: /folder test/i,
    });

    expect(folderButton).toBeInTheDocument();

    userEvent.dblClick(folderButton);

    await waitForElementToBeRemoved(folderButton);

    expect(folderButton).not.toBeInTheDocument();

    // Add nested folder inside 'folder test'
    userEvent.click(addFolderButton);

    const nestedFolderTitleInput = screen.getByTestId(/folder-btn-input/i);

    userEvent.type(nestedFolderTitleInput, 'nested folder test{enter}', {
      skipClick: true,
    });

    await waitForElementToBeRemoved(nestedFolderTitleInput);

    const nestedFolderButton = await screen.findByRole('button', {
      name: /nested folder test/i,
    });

    expect(nestedFolderButton).toBeInTheDocument();

    // Go back from 'folder test'

    const backButton = screen.getByRole('button', { name: /back-button/i });

    userEvent.click(backButton);

    expect(
      screen.queryByRole('button', {
        name: /nested folder test/i,
      })
    ).not.toBeInTheDocument();
    expect(
      await screen.findByRole('button', {
        name: /folder test/i,
      })
    ).toBeInTheDocument();
  });

  it('removes folders when project is not active', async () => {
    // Add new project
    const addProjectButton = screen.getByRole('button', {
      name: 'add-project',
    });

    userEvent.click(addProjectButton);

    const projectTitleInput = screen.getByTestId('project-btn-input');

    userEvent.type(projectTitleInput, 'project test{enter}', {
      skipClick: true,
    });

    expect(await screen.findByText(/project test/i)).toBeInTheDocument();

    // Select the project
    const projectButton = await screen.findByRole('button', {
      name: /project test/i,
    });

    userEvent.click(projectButton);

    // Add new folder inside the project
    const addFolderButton = screen.getByRole('button', {
      name: /add-folder/i,
    });

    userEvent.click(addFolderButton);

    const folderTitleInput = screen.getByTestId(/folder-btn-input/i);

    userEvent.type(folderTitleInput, 'folder test{enter}', { skipClick: true });

    expect(await screen.findByText(/folder test/i)).toBeInTheDocument();

    // Unselect the project
    userEvent.click(projectButton);

    // Check if the folder is removed
    expect(screen.queryByText(/folder test/i)).not.toBeInTheDocument();
  });

  it('prevents adding a project without a name', async () => {
    // Add new project without a name
    const addProjectButton = screen.getByRole('button', {
      name: 'add-project',
    });

    userEvent.click(addProjectButton);

    const projectTitleInput = screen.getByTestId('project-btn-input');

    userEvent.type(projectTitleInput, '{enter}', {
      skipClick: true,
    });

    // Check for error and project
    expect(
      await screen.findByText("CAN'T ADD PROJECT WITHOUT A NAME")
    ).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '' })).not.toBeInTheDocument();
  });

  it('prevents adding a folder without a name', async () => {
    // Add new project
    const addProjectButton = screen.getByRole('button', {
      name: 'add-project',
    });

    userEvent.click(addProjectButton);

    const projectTitleInput = screen.getByTestId('project-btn-input');

    userEvent.type(projectTitleInput, 'project test{enter}', {
      skipClick: true,
    });

    const projectButton = await screen.findByRole('button', {
      name: /project test/i,
    });

    userEvent.click(projectButton);

    // Add new folder inside the project without a name
    const addFolderButton = screen.getByRole('button', {
      name: /add-folder/i,
    });

    userEvent.click(addFolderButton);

    const folderTitleInput = screen.getByTestId(/folder-btn-input/i);

    userEvent.type(folderTitleInput, '{enter}', { skipClick: true });

    // Check for error and folder
    expect(
      await screen.findByText("CAN'T ADD FOLDER WITHOUT A NAME")
    ).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '' })).not.toBeInTheDocument();
  });
});
