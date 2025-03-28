# 📂 Windows Explorer Web - Backend

**Windows Explorer Web** adalah aplikasi berbasis web yang meniru tampilan dan fungsionalitas **Windows Explorer**, memungkinkan pengguna untuk mengelola file dan folder dalam sistem berbasis cloud.

Backend aplikasi ini dibangun menggunakan **Elysia.js + Bun**, dengan arsitektur **OOP + MVC + Repository Pattern** untuk meningkatkan skalabilitas dan maintainability.

---

## 🏗 Teknologi yang Digunakan

| Teknologi   | Deskripsi |
|------------|-----------|
| **Elysia.js**  | Framework backend ringan berbasis TypeScript |
| **Bun**  | Runtime JavaScript/TypeScript yang cepat dan efisien |
| **Prisma**  | ORM untuk komunikasi dengan database PostgreSQL |
| **PostgreSQL**  | Database relasional yang digunakan sebagai penyimpanan data |
| **TypeScript**  | Bahasa pemrograman yang digunakan untuk meningkatkan keamanan kode |
| **Jest**  | Framework untuk unit testing |
| **Supertest**  | Library untuk pengujian API |

---

## 📌 Fitur Utama

✅ **CRUD File & Folder** → Buat, baca, perbarui, dan hapus file atau folder  
✅ **Pagination** → Mendukung pagination untuk daftar folder  
✅ **Pencarian Folder** → Cari folder berdasarkan kata kunci  
✅ **Struktur Berbasis Hierarki** → Folder dapat memiliki subfolder  
✅ **Versioning API** → API mendukung versioning untuk pengembangan lebih lanjut  
✅ **Testing** → Unit Test, Integration Test, dan E2E Test  

---

## 📡 API Endpoints

### 📂 Folder API

| Method  | Endpoint                 | Deskripsi                           |
|---------|--------------------------|-------------------------------------|
| `GET`   | `/v1/folders`            | Ambil semua folder                 |
| `GET`   | `/v1/folders/:id`        | Ambil subfolder berdasarkan ID     |
| `POST`  | `/v1/folders`            | Buat folder baru                   |
| `GET`   | `/v1/folders/search?q=nama` | Cari folder berdasarkan nama    |
| `DELETE`| `/v1/folders/:id`        | Hapus folder berdasarkan ID        |

