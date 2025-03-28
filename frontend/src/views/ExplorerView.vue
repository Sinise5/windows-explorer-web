<script setup>
import { ref } from "vue";
import FolderTree from "../components/FolderTree.vue";
import FolderList from "../components/FolderList.vue";


const selectedFolder = ref(null);
const folderTreeKey = ref(0);


const refreshFolderTree = () => {
  folderTreeKey.value++; 
};

</script>

<template>
  <div class="explorer">
    
      <FolderTree :key="folderTreeKey"  @folder-selected="selectedFolder = $event" />
    <FolderList :selectedFolder="selectedFolder" @refresh-folder-tree="refreshFolderTree" />
  </div>
</template>

<style scoped>
.explorer {
  display: flex;
  height: 100vh;
}
</style>
