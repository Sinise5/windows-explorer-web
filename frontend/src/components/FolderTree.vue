<script setup>
import { ref, computed, onMounted } from "vue";
import { folderApi } from "../api/folderApi";

const folders = ref([]);
const selectedFolder = ref(null);
const searchQuery = ref(""); 
const expandedFolders = ref(new Set());
const emit = defineEmits(["folder-selected"]);

const fetchRootFolders = async () => {
  try {
    const data = await folderApi.getRootFolders();
    folders.value = Array.isArray(data) ? data : []; 
  } catch (error) {
    console.error("Error fetching folders:", error);
    folders.value = []; 
  }
};

// 🔹 Fungsi untuk mengambil subfolder hanya jika belum ada
const fetchSubfolders = async (folder) => {
  if (!folder.children) {
    try {
      const subfolders = await folderApi.getSubfolders(folder.id);
      folder.children = subfolders;
    } catch (error) {
      console.error("Error fetching subfolders:", error);
      folder.children = [];
    }
  }
};

// 🔹 Saat folder atau subfolder diklik, pilih dan muat subfoldernya jika belum ada
const selectFolder = async (folder) => {
  selectedFolder.value = folder;
  emit("folder-selected", folder);

  // Jika folder belum diperluas, maka fetch subfoldernya
  if (!expandedFolders.value.has(folder.id)) {
    await fetchSubfolders(folder);
  }

  // Toggle expand/collapse
  if (expandedFolders.value.has(folder.id)) {
    expandedFolders.value.delete(folder.id);
  } else {
    expandedFolders.value.add(folder.id);
  }
};

const filteredFolders = computed(() => {
  return (folders.value ?? []).filter(folder =>
    (folder?.name ?? "").toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(fetchRootFolders);
</script>

<template>
  <div class="sidebar">
    <h3>Folders</h3>
    <input
      v-model="searchQuery"
      class="w-full p-2 border rounded mb-2"
      placeholder="Search folders..."
    />

    <ul>
      <li v-for="folder in filteredFolders" :key="folder.id">
        <span @click="selectFolder(folder)">
          {{ expandedFolders.has(folder.id) ? "📂" : "📁" }} {{ folder.name }}
        </span>

        <ul v-if="expandedFolders.has(folder.id) && folder.children?.length">
          <li 
            v-for="child in folder.children" 
            :key="child.id"
            @click.stop="selectFolder(child)"
            class="child-folder"
          >
            📁 {{ child.name }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  width: 250px;
  background: #f4f4f4;
  padding: 10px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  cursor: pointer;
  padding: 5px;
}
input {
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.child-folder {
  padding-left: 20px; /* Biarkan child folder sedikit masuk ke dalam */
  cursor: pointer;
  color: blue;
}
.child-folder:hover {
  text-decoration: underline;
}
</style>
