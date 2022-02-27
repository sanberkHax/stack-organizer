import { Organize } from '../Organize';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '../../../../utils/test-utils';
import userEvent from '@testing-library/user-event';

describe('<Organize />', () => {
  beforeEach(() => {
    render(<Organize />);
  });

  describe('<ProjectsSidebar/>', () => {
    it('Creates a new project', async () => {
      const newProjectButton = screen.getByRole('button', {
        name: /New Project/i,
      });

      userEvent.click(newProjectButton);

      const projectInput = screen.getByRole('textbox', {
        name: /Project Name Input/i,
      });

      userEvent.type(projectInput, 'project test{enter}');

      expect(await screen.findByText(/project test/i)).toBeInTheDocument();
    });

    it("Shows an error when new project's name is empty", async () => {
      // Create new project with empty name
      const newProjectButton = screen.getByRole('button', {
        name: /New Project/i,
      });

      userEvent.click(newProjectButton);

      const projectInput = screen.getByRole('textbox', {
        name: /Project Name Input/i,
      });

      userEvent.type(projectInput, '{enter}');

      expect(
        await screen.findByText(/CAN'T ADD PROJECT WITHOUT A NAME/i)
      ).toBeInTheDocument();
    });
    it("Shows an error when a project with new project's name already exists", async () => {
      // Create new project
      const newProjectButton = screen.getByRole('button', {
        name: /New Project/i,
      });

      userEvent.click(newProjectButton);

      const projectInput = screen.getByRole('textbox', {
        name: /Project Name Input/i,
      });

      userEvent.type(projectInput, 'project-test{enter}');

      // Create another project with same name
      userEvent.click(newProjectButton);

      userEvent.type(projectInput, 'project-test{enter}');

      expect(
        await screen.findByText(/PROJECT NAME EXISTS, SELECT DIFFERENT NAME/i)
      ).toBeInTheDocument();
    });

    it('Renames the project', async () => {
      // Create new project
      const newProjectButton = screen.getByRole('button', {
        name: /New Project/i,
      });

      userEvent.click(newProjectButton);

      const projectInput = screen.getByRole('textbox', {
        name: /Project Name Input/i,
      });

      userEvent.type(projectInput, 'project-test{enter}');

      expect(await screen.findByText(/project-test/i)).toBeInTheDocument();

      // Rename the project
      const editButton = screen.getByRole('button', {
        name: /Rename Project/i,
      });

      userEvent.click(editButton);

      userEvent.type(projectInput, 'project-test renamed{enter}');

      expect(
        await screen.findByText(/project-test renamed/i)
      ).toBeInTheDocument();
    });

    it('Deletes the project', async () => {
      // Create new project
      const newProjectButton = screen.getByRole('button', {
        name: /New Project/i,
      });

      userEvent.click(newProjectButton);

      const projectInput = screen.getByRole('textbox', {
        name: /Project Name Input/i,
      });

      userEvent.type(projectInput, 'project-test{enter}');

      expect(await screen.findByText(/project-test/i)).toBeInTheDocument();

      // Delete the project
      const deleteButton = screen.getByRole('button', {
        name: /Delete Project/i,
      });

      userEvent.click(deleteButton);

      expect(screen.queryByText(/project-test/i)).not.toBeInTheDocument();
    });
    it('Selects the project', async () => {
      // Create new project
      const newProjectButton = screen.getByRole('button', {
        name: /New Project/i,
      });

      userEvent.click(newProjectButton);

      const projectInput = screen.getByRole('textbox', {
        name: /Project Name Input/i,
      });

      userEvent.type(projectInput, 'project-test{enter}');

      expect(await screen.findByText(/project-test/i)).toBeInTheDocument();

      // Select the project
      const projectButton = screen.getByText(/project-test/i);

      userEvent.click(projectButton);

      expect(await screen.findByText(/new folder/i)).toBeInTheDocument();
    });
  });
  describe('<FileBrowser/>', () => {
    it('Adds new folder inside selected project', async () => {
      // Create new project and select it
      const newProjectButton = screen.getByRole('button', {
        name: /New Project/i,
      });

      userEvent.click(newProjectButton);

      const projectInput = screen.getByRole('textbox', {
        name: /Project Name Input/i,
      });

      userEvent.type(projectInput, 'project-test{enter}');

      expect(await screen.findByText(/project-test/i)).toBeInTheDocument();

      const projectButton = screen.getByText(/project-test/i);

      userEvent.click(projectButton);

      // Create new folder
      const newFolderButton = await screen.findByRole('button', {
        name: /new folder/i,
      });

      userEvent.click(newFolderButton);

      const folderInput = screen.getByRole('textbox', {
        name: /Folder Name Input/i,
      });

      userEvent.type(folderInput, 'folder-test{enter}');

      expect(await screen.findByText(/folder-test/i)).toBeInTheDocument();
    });
    it("Shows an error when new folder's name is empty", async () => {
      // Create new project and select it
      const newProjectButton = screen.getByRole('button', {
        name: /New Project/i,
      });

      userEvent.click(newProjectButton);

      const projectInput = screen.getByRole('textbox', {
        name: /Project Name Input/i,
      });

      userEvent.type(projectInput, 'project-test{enter}');

      expect(await screen.findByText(/project-test/i)).toBeInTheDocument();

      const projectButton = screen.getByText(/project-test/i);

      userEvent.click(projectButton);

      // Create new folder with empty name
      const newFolderButton = screen.getByRole('button', {
        name: /New Folder/i,
      });

      userEvent.click(newFolderButton);

      const folderInput = screen.getByRole('textbox', {
        name: /Folder Name Input/i,
      });

      userEvent.type(folderInput, '{enter}');

      expect(
        await screen.findByText(/CAN'T ADD FOLDER WITHOUT A NAME/i)
      ).toBeInTheDocument();
    });
    it("Shows an error when a folder with new folder's name already exists", async () => {
      // Create new project and select it
      const newProjectButton = screen.getByRole('button', {
        name: /New Project/i,
      });

      userEvent.click(newProjectButton);

      const projectInput = screen.getByRole('textbox', {
        name: /Project Name Input/i,
      });

      userEvent.type(projectInput, 'project-test{enter}');

      expect(await screen.findByText(/project-test/i)).toBeInTheDocument();

      const projectButton = screen.getByText(/project-test/i);

      userEvent.click(projectButton);

      // Create new folder
      const newFolderButton = screen.getByRole('button', {
        name: /New Folder/i,
      });

      userEvent.click(newFolderButton);

      const folderInput = screen.getByRole('textbox', {
        name: /Folder Name Input/i,
      });

      userEvent.type(folderInput, 'folder-test{enter}');

      expect(await screen.findByText(/folder-test/i)).toBeInTheDocument();

      // Create new folder with same name
      userEvent.click(newFolderButton);

      userEvent.type(folderInput, 'folder-test{enter}');
      expect(
        await screen.findByText(/FOLDER NAME EXISTS, SELECT DIFFERENT NAME/i)
      ).toBeInTheDocument();
    });
    it('Renames the folder', async () => {
      // Create new project and select it
      const newProjectButton = screen.getByRole('button', {
        name: /New Project/i,
      });

      userEvent.click(newProjectButton);

      const projectInput = screen.getByRole('textbox', {
        name: /Project Name Input/i,
      });

      userEvent.type(projectInput, 'project-test{enter}');

      expect(await screen.findByText(/project-test/i)).toBeInTheDocument();

      const projectButton = screen.getByText(/project-test/i);

      userEvent.click(projectButton);

      // Create new folder
      const newFolderButton = screen.getByRole('button', {
        name: /New Folder/i,
      });

      userEvent.click(newFolderButton);

      const folderInput = screen.getByRole('textbox', {
        name: /Folder Name Input/i,
      });

      userEvent.type(folderInput, 'folder-test{enter}');

      expect(await screen.findByText(/folder-test/i)).toBeInTheDocument();

      // Rename the folder
      const editButton = screen.getByRole('button', {
        name: /Rename Folder/i,
      });

      userEvent.click(editButton);

      userEvent.type(folderInput, 'folder-test renamed{enter}');

      expect(screen.queryByText(/folder-test/i)).not.toBeInTheDocument();
      expect(
        await screen.findByText(/folder-test renamed/i)
      ).toBeInTheDocument();
    });
    it('Deletes the folder', async () => {
      // Create new project and select it
      const newProjectButton = screen.getByRole('button', {
        name: /New Project/i,
      });

      userEvent.click(newProjectButton);

      const projectInput = screen.getByRole('textbox', {
        name: /Project Name Input/i,
      });

      userEvent.type(projectInput, 'project-test{enter}');

      expect(await screen.findByText(/project-test/i)).toBeInTheDocument();

      const projectButton = screen.getByText(/project-test/i);

      userEvent.click(projectButton);

      // Create new folder
      const newFolderButton = screen.getByRole('button', {
        name: /New Folder/i,
      });

      userEvent.click(newFolderButton);

      const folderInput = screen.getByRole('textbox', {
        name: /Folder Name Input/i,
      });

      userEvent.type(folderInput, 'folder-test{enter}');

      expect(await screen.findByText(/folder-test/i)).toBeInTheDocument();

      const deleteButton = screen.getByRole('button', {
        name: /Delete Folder/i,
      });

      userEvent.click(deleteButton);

      expect(screen.queryByText(/folder-test/i)).not.toBeInTheDocument();
    });
    it('Goes inside the folder, adds a new folder inside then comes back to base level', async () => {
      // Create new project and select it
      const newProjectButton = screen.getByRole('button', {
        name: /New Project/i,
      });

      userEvent.click(newProjectButton);

      const projectInput = screen.getByRole('textbox', {
        name: /Project Name Input/i,
      });

      userEvent.type(projectInput, 'project-test{enter}');

      expect(await screen.findByText(/project-test/i)).toBeInTheDocument();

      const projectButton = screen.getByText(/project-test/i);

      userEvent.click(projectButton);

      // Create new folder
      const newFolderButton = screen.getByRole('button', {
        name: /New Folder/i,
      });

      userEvent.click(newFolderButton);

      const folderInput = screen.getByRole('textbox', {
        name: /Folder Name Input/i,
      });

      userEvent.type(folderInput, 'folder-test{enter}');

      // Go inside the folder
      const folder = await screen.findByTestId(/folder/i);

      userEvent.click(folder);

      waitForElementToBeRemoved(async () => screen.queryByTestId(/folder/i));

      expect(screen.queryByTestId(/folder/i)).not.toBeInTheDocument();

      // Add new folder
      userEvent.click(newFolderButton);

      userEvent.type(folderInput, 'folder-test child{enter}');

      expect(await screen.findByText(/folder-test child/i)).toBeInTheDocument();

      // Go back to base level
      const backButton = await screen.findByRole('button', {
        name: /Back Button/i,
      });

      userEvent.click(backButton);

      expect(await screen.findByTestId(/folder/i)).toBeInTheDocument();
      expect(screen.queryByText(/folder-test child/i)).not.toBeInTheDocument();
    });
  });
});
