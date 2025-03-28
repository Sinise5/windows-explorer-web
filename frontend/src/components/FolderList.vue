<script setup>
import { ref, watch, onMounted, computed } from "vue";
import { folderApi } from "../api/folderApi";
import { fileApi } from "../api/fileApi";
import Draggable from "vuedraggable"; 
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
const searchQuery = ref("");


const props = defineProps(["selectedFolder"]);
const emit = defineEmits(["refresh-folder-tree"]);
const subfolders = ref([]);
const files = ref([]);
const newFolderName = ref("");
const router = useRouter();
const rootFolder = ref(null);
const showRoot = ref(true);

const fetchRootFolder = async () => {
  try {

    const data = await folderApi.getRootFolders();
    rootFolder.value = Array.isArray(data) ? data : []; 
  } catch (error) {
    console.error("Error fetching root folder:", error);
  }
};


const fetchData = async () => {
  if (props.selectedFolder?.id) {
    subfolders.value = await folderApi.getSubfolders(props.selectedFolder.id);
    files.value = await fileApi.getFilesByFolder(props.selectedFolder.id);
    showRoot.value = false;
  } else {
    subfolders.value = [];
    files.value = [];
  }
};

const onDragEnd = async (event) => {
  if (!event || !event.item || !event.to) return;

  const movedFileId = event.item.dataset.id;
  const newFolderId = event.to.dataset.folderId; 

  if (!movedFileId || !newFolderId) {
    console.error("❌ Tidak dapat menemukan fileId atau newFolderId", { movedFileId, newFolderId });
    return;
  }

  try {
    console.log(`📂 Memindahkan file ${movedFileId} ke folder ${newFolderId}`);
    await fileApi.moveFile(parseInt(movedFileId), parseInt(newFolderId));
    fetchData(); 
  } catch (error) {
    console.error("❌ Gagal memindahkan file:", error);
  }
};


const createFolder = async () => {
    
  const result = await Swal.fire({
    title: "Confirmation",
    text: "Are you sure you want to add this data?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, Add!",
    cancelButtonText: "Cancel",
  });

    
    if (newFolderName.value && result.isConfirmed) {
    const parentId = props.selectedFolder?.id ?? null; 
    await folderApi.createFolder(newFolderName.value, parentId);
    newFolderName.value = "";
    Swal.fire("Success!", "Data has been saved.", "success");
    fetchData(); 
    fetchRootFolder();
    emit("refresh-folder-tree");
    
  }
};

const refreshFolderTree = () => {
    router.go(0);
}

const uploadFile = async (event) => {
  const file = event.target.files[0];
  if (file && props.selectedFolder) {
    await fileApi.uploadFile(file, props.selectedFolder.id);
  }
  Swal.fire("Success!", "Data has been upload.", "success");
  fetchData(); 
};

const deleteFolder = async (id) => {
  const result = await Swal.fire({
    title: "Confirmation",
    text: "Are you sure you want to delete this folder?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Delete!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
  await folderApi.deleteFolder(id);
  Swal.fire("Deleted!", "The folder has been deleted successfully.", "success");
  fetchData(); 
  fetchRootFolder()
  emit("refresh-folder-tree");
  }
};

const deleteFile = async (id) => {
  const result = await Swal.fire({
    title: "Confirmation",
    text: "Are you sure you want to delete this file?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Delete!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
  await fileApi.deleteFile(id);
  Swal.fire("Deleted!", "The file has been deleted successfully.", "success");
    loadFiles();
    fetchRootFolder()
    emit("refresh-folder-tree");
  }
};

const filteredFiles = computed(() => {
  if (!searchQuery.value) return files.value; 
  return files.value.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

watch(() => props.selectedFolder, fetchData, { immediate: true });
onMounted(fetchRootFolder);
</script>

<template>
  <div class="content">
    <h3>Contents of {{ selectedFolder?.name || "Root Folder" }}</h3>

    
    <div class="flex justify-between items-center mb-4 w-full">
        <!-- Tombol Home di kiri -->
        <button @click="refreshFolderTree" class="bg-blue-500 text-white p-2 rounded">Home</button>

        <!-- Input dan Tombol Create di kanan -->
        <div class="flex items-center space-x-2 ml-auto">
            <input v-model="newFolderName" class="border p-2 rounded" placeholder="New folder name" />
            <button @click="createFolder" class="bg-blue-500 text-white p-2 rounded">Create</button>
        </div>
    </div>
    <div class="p-4" v-if="selectedFolder?.name" >
    <input type="file" @change="uploadFile" />
    <input
      v-model="searchQuery"
      class="w-full p-2 border rounded mb-2"
      placeholder="Search files..."
    />
  </div>
    <ul>
    
      <li v-for="folder in [...(showRoot && Array.isArray(rootFolder) ? rootFolder : []), ...subfolders]" :key="folder?.id">
        📁 {{ folder?.name }}
        <button @click="deleteFolder(folder.id)" class="text-red-500">🗑</button>
      </li>

      
      <Draggable v-model="filteredFiles" group="files" @end="onDragEnd" item-key="id" class="mt-2" :data-folder-id="selectedFolder?.id">
        <template #item="{ element }">
          <li class="cursor-grab" :data-id="element.id">📄<a :href="element.url || ''" target="_blank">{{ element.name }}</a>
            <button @click="deleteFile(element.id)" class="text-red-500">🗑</button>
          </li>
        </template>
      </Draggable>
    </ul>
  </div>
</template>

<style scoped>
.content {
  flex: 1;
  padding: 10px;
}
ul {
  list-style: none;
  padding: 0;
}
</style>
