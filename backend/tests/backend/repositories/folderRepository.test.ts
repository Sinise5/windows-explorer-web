import { FolderRepository } from '../../../src/repositories/folderRepository';
import prisma  from '../../../src/config/database';

jest.mock('../../../src/config/database');

describe('Folder Repository', () => {
  it('should create a folder in the database', async () => {
    const mockFolder = { id: 1, name: 'Documents', parentId: null };

    (prisma.folder.create as jest.Mock).mockResolvedValue(mockFolder);

    const result = await FolderRepository.createFolder('Documents', 'null');

    expect(result).toEqual(mockFolder);
  });

  it('should fetch all folders from database', async () => {
    const mockFolders = [{ id: 1, name: 'Documents' }, { id: 2, name: 'Pictures' }];

    (prisma.folder.findMany as jest.Mock).mockResolvedValue(mockFolders);

    const result = await FolderRepository.getAllFolders();

    expect(result).toEqual(mockFolders);
  });
});
