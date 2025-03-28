import { render, screen } from '@testing-library/vue';
import FolderTree from '../../../src/components/FolderTree.vue';

test('renders folder tree correctly', async () => {
  render(FolderTree, {
    props: { folders: [{ id: 1, name: 'Documents' }] },
  });

  expect(screen.getByText('Documents')).toBeInTheDocument();
});
