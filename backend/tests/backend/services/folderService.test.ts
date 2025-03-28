import { FolderService } from '../../../src/services/folderService';
import { FolderRepository } from '../../../src/repositories/folderRepository';

jest.mock('../../../src/modules/folder/repositories/folderRepository');

describe('Folder Service', () => {
  it('should create a new folder', async () => {
    const mockFolder = { id: 1, name: 'Documents', parentId: null };

    (FolderRepository.createFolder as jest.Mock).mockResolvedValue(mockFolder);

    const result = await FolderService.addFolder('Documents', 'null');

    expect(result).toEqual(mockFolder);
    expect(FolderRepository.createFolder).toHaveBeenCalledWith('Documents', null);
  });

  it('should get all folders', async () => {
    const mockFolders = [{ id: 1, name: 'Documents' }, { id: 2, name: 'Pictures' }];

    (FolderRepository.getAllFolders as jest.Mock).mockResolvedValue(mockFolders);

    const result = await FolderService.fetchAllFolders();

    expect(result).toEqual(mockFolders);
  });
});
