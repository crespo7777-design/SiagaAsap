/* ============================================
   SiagaAsap - script.js
   Semua data di bawah adalah DATA CONTOH.
   Ganti dengan API/sumber resmi bila sudah tersedia.
   ============================================ */

// ---------- NAVIGASI ----------
const navBtns = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

function showPage(id) {
  pages.forEach(p => p.classList.toggle("active", p.id === id));
  navBtns.forEach(b => b.classList.toggle("active", b.dataset.page === id));
  window.scrollTo({ top: 0 });
}
navBtns.forEach(b => b.addEventListener("click", () => showPage(b.dataset.page)));

// ---------- BERANDA: KUALITAS UDARA (DATA CONTOH) ----------
const dataUdara = {
  "Medan, Sumatera Utara": { ispu: 96, pm25: 33, pm10: 62 },
  "Palembang, Sumatera Selatan": { ispu: 162, pm25: 89, pm10: 120 },
  "Pekanbaru, Riau": { ispu: 128, pm25: 62, pm10: 95 },
  "Jambi, Jambi": { ispu: 85, pm25: 35, pm10: 70 },
  "Pontianak, Kalimantan Barat": { ispu: 215, pm25: 140, pm10: 190 },
  "Palangka Raya, Kalimantan Tengah": { ispu: 320, pm25: 260, pm10: 310 },
  "Banjarmasin, Kalimantan Selatan": { ispu: 42, pm25: 12, pm10: 30 }
};

// Kategori mengikuti pola ISPU Indonesia
function kategori(ispu) {
  if (ispu <= 50)  return { nama: "Baik", warna: "#2e9e5b", saran: "Kualitas udara baik. Aktivitas luar ruangan aman dilakukan. Tetap pantau informasi secara berkala." };
  if (ispu <= 100) return { nama: "Sedang", warna: "#d4a017", saran: "Kelompok sensitif (anak, lansia, penderita asma/jantung) sebaiknya mengurangi aktivitas berat di luar ruangan." };
  if (ispu <= 200) return { nama: "Tidak Sehat", warna: "#e8663d", saran: "Kurangi aktivitas di luar ruangan, gunakan masker yang sesuai (N95/KN95/KF94), dan perbanyak minum air putih." };
  if (ispu <= 300) return { nama: "Sangat Tidak Sehat", warna: "#b03a8f", saran: "Hindari aktivitas luar ruangan. Tutup jendela, gunakan masker bila harus keluar, dan lindungi anak serta lansia." };
  return { nama: "Berbahaya", warna: "#7a1f2b", saran: "Tetap di dalam ruangan. Gunakan masker bila terpaksa keluar. Segera cari bantuan medis bila ada sesak napas." };
}

const selWilayah = document.getElementById("wilayah");
Object.keys(dataUdara).forEach(w => {
  const o = document.createElement("option");
  o.value = w; o.textContent = w;
  selWilayah.appendChild(o);
});

function renderUdara() {
  const d = dataUdara[selWilayah.value];
  const k = kategori(d.ispu);
  document.getElementById("aqiValue").textContent = d.ispu;
  document.getElementById("aqiStatus").textContent = k.nama;
  document.getElementById("aqiCard").style.background = k.warna;
  document.getElementById("pm25").textContent = d.pm25;
  document.getElementById("pm10").textContent = d.pm10;
  document.getElementById("advice").textContent = k.saran;
  document.getElementById("aqiUpdate").textContent = "Data contoh • Dibuka: " + new Date().toLocaleString("id-ID");
}
selWilayah.addEventListener("change", renderUdara);
renderUdara();

// ---------- EDUKASI ----------
const edukasi = [
  { kat: "Pencegahan", ikon: "🧍", judul: "Cara Melindungi Diri dari Kabut Asap",
    ringkas: "Langkah dasar mengurangi paparan asap.",
    isi: ["Kurangi kegiatan di luar ruangan saat udara buruk.", "Tutup pintu dan jendela saat asap pekat.", "Hindari membakar sampah atau merokok di dalam ruangan.", "Ikuti informasi resmi dari pemerintah daerah."] },
  { kat: "Masker", ikon: "😷", judul: "Pentingnya Penggunaan Masker yang Tepat",
    ringkas: "Jenis masker dan cara pakainya.",
    isi: ["Masker N95/KN95/KF94 lebih efektif menyaring partikel halus (PM2.5) dibanding masker kain.", "Pastikan masker menutup hidung dan mulut, serta rapat di sisi wajah.", "Ganti masker bila basah, rusak, atau terasa sulit bernapas.", "Anak kecil dan penderita penyakit paru/jantung sebaiknya berkonsultasi dengan tenaga kesehatan sebelum memakai masker ketat."] },
  { kat: "Tips", ikon: "🥗", judul: "Menjaga Kesehatan Saat Asap",
    ringkas: "Hidrasi, istirahat, dan gaya hidup.",
    isi: ["Minum air putih yang cukup.", "Istirahat cukup dan hindari olahraga berat di luar ruangan.", "Makan makanan bergizi seimbang.", "Bersihkan debu di dalam rumah dengan kain lembap."] },
  { kat: "Pencegahan", ikon: "🏠", judul: "Menjaga Udara dalam Ruangan",
    ringkas: "Buat ruangan lebih aman dari asap.",
    isi: ["Pilih satu ruangan sebagai ruang bersih: tutup celah, kurangi aktivitas yang menimbulkan asap.", "Gunakan pembersih udara (air purifier) berfilter HEPA bila tersedia.", "Hindari menyalakan lilin, obat nyamuk bakar, atau kompor berasap di dalam ruangan."] },
  { kat: "Tips", ikon: "🚨", judul: "Kapan Harus Mencari Bantuan Medis?",
    ringkas: "Tanda yang tidak boleh diabaikan.",
    isi: ["Sesak napas berat atau semakin memburuk.", "Nyeri dada, jantung berdebar, atau pusing hebat.", "Batuk yang tidak reda atau disertai mengi.", "Anak, lansia, ibu hamil, atau penderita asma/jantung yang keluhannya memburuk.", "Hubungi layanan darurat (112) atau segera ke fasilitas kesehatan terdekat."] }
];

const kategoriEdu = ["Semua", "Pencegahan", "Masker", "Tips"];
let filterEdu = "Semua";

function renderChips(containerId, list, current, onClick) {
  const c = document.getElementById(containerId);
  c.innerHTML = "";
  list.forEach(item => {
    const b = document.createElement("button");
    b.className = "chip" + (item === current ? " active" : "");
    b.textContent = item;
    b.addEventListener("click", () => onClick(item));
    c.appendChild(b);
  });
}

function renderEdukasi() {
  renderChips("chips", kategoriEdu, filterEdu, v => { filterEdu = v; renderEdukasi(); });
  const box = document.getElementById("eduList");
  box.innerHTML = "";
  edukasi.filter(e => filterEdu === "Semua" || e.kat === filterEdu).forEach(e => {
    const card = document.createElement("div");
    card.className = "edu-card";
    card.innerHTML = `
      <button class="edu-head">
        <span class="edu-icon">${e.ikon}</span>
        <span><strong>${e.judul}</strong><small>${e.ringkas}</small></span>
      </button>
      <div class="edu-body"><ul>${e.isi.map(i => `<li>${i}</li>`).join("")}</ul></div>`;
    card.querySelector(".edu-head").addEventListener("click", () => card.classList.toggle("open"));
    box.appendChild(card);
  });
}
renderEdukasi();

// ---------- GEJALA (localStorage) ----------
const KEY = "siagaasap_gejala";
const form = document.getElementById("gejalaForm");
const tanggal = document.getElementById("tanggal");
const alertBerat = document.getElementById("alertBerat");

tanggal.value = new Date().toISOString().slice(0, 10);

function ambilData() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; }
  catch { return []; }
}
function simpanData(arr) {
  try { localStorage.setItem(KEY, JSON.stringify(arr)); } catch { /* abaikan */ }
}

form.querySelectorAll('input[name="gejala"]').forEach(cb => {
  cb.addEventListener("change", () => {
    const sesak = form.querySelector('input[value="Sesak napas"]').checked;
    alertBerat.hidden = !sesak;
  });
});

form.addEventListener("submit", e => {
  e.preventDefault();
  const dipilih = [...form.querySelectorAll('input[name="gejala"]:checked')].map(c => c.value);
  const catatan = document.getElementById("catatan").value.trim();
  if (dipilih.length === 0 && !catatan) {
    alert("Pilih minimal satu keluhan atau tulis catatan.");
    return;
  }
  const data = ambilData();
  data.unshift({ id: Date.now(), tanggal: tanggal.value, gejala: dipilih, catatan });
  simpanData(data);
  form.reset();
  tanggal.value = new Date().toISOString().slice(0, 10);
  alertBerat.hidden = true;
  renderRiwayat();
});

function renderRiwayat() {
  const box = document.getElementById("riwayat");
  const data = ambilData();
  box.innerHTML = "";
  if (data.length === 0) {
    box.innerHTML = '<div class="empty">Belum ada catatan.</div>';
    return;
  }
  data.forEach(item => {
    const div = document.createElement("div");
    div.className = "log";

    const kiri = document.createElement("div");
    const tgl = document.createElement("div");
    tgl.className = "log-date";
    tgl.textContent = new Date(item.tanggal + "T00:00:00").toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const tags = document.createElement("div");
    tags.className = "log-tags";
    item.gejala.forEach(g => {
      const s = document.createElement("span");
      s.className = "tag"; s.textContent = g;
      tags.appendChild(s);
    });
    kiri.append(tgl, tags);
    if (item.catatan) {
      const n = document.createElement("div");
      n.className = "log-note";
      n.textContent = item.catatan; // textContent: aman dari injeksi HTML
      kiri.appendChild(n);
    }

    const hapus = document.createElement("button");
    hapus.title = "Hapus catatan";
    hapus.textContent = "🗑️";
    hapus.addEventListener("click", () => {
      simpanData(ambilData().filter(d => d.id !== item.id));
      renderRiwayat();
    });

    div.append(kiri, hapus);
    box.appendChild(div);
  });
}

document.getElementById("hapusSemua").addEventListener("click", () => {
  if (confirm("Hapus semua catatan gejala di perangkat ini?")) {
    simpanData([]);
    renderRiwayat();
  }
});
renderRiwayat();

// ---------- FASKES ----------
// DATA CONTOH: nama generik, belum terverifikasi. Ganti dengan data resmi/API.
const faskes = [
  { nama: "Puskesmas Contoh A", jenis: "Puskesmas", wilayah: "Palembang", alamat: "(alamat contoh)" },
  { nama: "RS Contoh Sriwijaya", jenis: "RS", wilayah: "Palembang", alamat: "(alamat contoh)" },
  { nama: "Klinik Contoh Sehat", jenis: "Klinik", wilayah: "Palembang", alamat: "(alamat contoh)" },
  { nama: "Puskesmas Contoh B", jenis: "Puskesmas", wilayah: "Pekanbaru", alamat: "(alamat contoh)" },
  { nama: "RS Contoh Pekanbaru", jenis: "RS", wilayah: "Pekanbaru", alamat: "(alamat contoh)" },
  { nama: "Puskesmas Contoh C", jenis: "Puskesmas", wilayah: "Jambi", alamat: "(alamat contoh)" },
  { nama: "Klinik Contoh Jambi", jenis: "Klinik", wilayah: "Jambi", alamat: "(alamat contoh)" },
  { nama: "RS Contoh Pontianak", jenis: "RS", wilayah: "Pontianak", alamat: "(alamat contoh)" },
  { nama: "Puskesmas Contoh D", jenis: "Puskesmas", wilayah: "Palangka Raya", alamat: "(alamat contoh)" },

  // ----- MEDAN -----
  // nyata: true  = nama fasilitas nyata (ada tombol Maps).
  // alamat terisi = alamat dicocokkan dengan sumber publik (Kemenkes/Hello Sehat/Halodoc).
  // alamat kosong = alamat belum diverifikasi, gunakan tombol Maps untuk memastikan.
  // Rumah sakit
  { nama: "RSUP H. Adam Malik", jenis: "RS", wilayah: "Medan", kecamatan: "Medan Tuntungan", alamat: "Jl. Bunga Lau No. 17, Kemenangan Tani", nyata: true },
  { nama: "RSUD dr. Pirngadi Kota Medan", jenis: "RS", wilayah: "Medan", kecamatan: "", alamat: "Jl. Prof. H.M. Yamin No. 47", nyata: true },
  { nama: "Siloam Hospitals Medan (Dhirga Surya)", jenis: "RS", wilayah: "Medan", kecamatan: "Medan Petisah", alamat: "Jl. Imam Bonjol, Petisah Tengah", nyata: true },
  { nama: "RS Columbia Asia Medan", jenis: "RS", wilayah: "Medan", kecamatan: "Medan Petisah", alamat: "Jl. Listrik, Petisah Tengah", nyata: true },
  { nama: "RS Hermina Medan", jenis: "RS", wilayah: "Medan", kecamatan: "", alamat: "Jl. Asrama, Sei Sikambing C. II", nyata: true },
  { nama: "RS Sarah", jenis: "RS", wilayah: "Medan", kecamatan: "Medan Petisah", alamat: "Jl. Baja Raya No. 10, Petisah Tengah", nyata: true },
  { nama: "RS Murni Teguh Memorial Hospital", jenis: "RS", wilayah: "Medan", kecamatan: "", alamat: "", nyata: true },
  { nama: "RSU Royal Prima", jenis: "RS", wilayah: "Medan", kecamatan: "", alamat: "", nyata: true },
  { nama: "RSU Putri Hijau", jenis: "RS", wilayah: "Medan", kecamatan: "", alamat: "", nyata: true },
  { nama: "RS Santa Elisabeth Medan", jenis: "RS", wilayah: "Medan", kecamatan: "", alamat: "", nyata: true },
  // Puskesmas (alamat belum diverifikasi)
  { nama: "Puskesmas Padang Bulan", jenis: "Puskesmas", wilayah: "Medan", kecamatan: "", alamat: "", nyata: true },
  { nama: "Puskesmas Helvetia", jenis: "Puskesmas", wilayah: "Medan", kecamatan: "", alamat: "", nyata: true },
  { nama: "Puskesmas Teladan", jenis: "Puskesmas", wilayah: "Medan", kecamatan: "", alamat: "", nyata: true },
  { nama: "Puskesmas Medan Johor", jenis: "Puskesmas", wilayah: "Medan", kecamatan: "", alamat: "", nyata: true },
  // Klinik / laboratorium
  { nama: "Laboratorium Klinik Kimia Farma Medan Kartini", jenis: "Klinik", wilayah: "Medan", kecamatan: "", alamat: "", nyata: true }
];

const jenisList = ["Semua", "Puskesmas", "RS", "Klinik"];
let filterJenis = "Semua";
const inputCari = document.getElementById("cariWilayah");
const mapsLink = document.getElementById("mapsLink");

function renderFaskes() {
  renderChips("jenisChips", jenisList, filterJenis, v => { filterJenis = v; renderFaskes(); });
  const q = inputCari.value.trim().toLowerCase();
  const hasil = faskes.filter(f =>
    (filterJenis === "Semua" || f.jenis === filterJenis) &&
    (q === "" ||
      f.wilayah.toLowerCase().includes(q) ||
      f.nama.toLowerCase().includes(q) ||
      (f.kecamatan || "").toLowerCase().includes(q) ||
      (f.alamat || "").toLowerCase().includes(q))
  );

  // Tautan Google Maps (sumber real untuk pencarian lokasi)
  const kata = (filterJenis === "Semua" ? "fasilitas kesehatan" : filterJenis === "RS" ? "rumah sakit" : filterJenis.toLowerCase());
  const query = encodeURIComponent(kata + (q ? " di " + inputCari.value.trim() : " terdekat"));
  mapsLink.href = "https://www.google.com/maps/search/" + query;

  const box = document.getElementById("faskesList");
  box.innerHTML = "";
  if (hasil.length === 0) {
    box.innerHTML = '<div class="empty">Tidak ada data contoh untuk wilayah ini. Gunakan tombol "Cari di Google Maps" di atas.</div>';
    return;
  }
  hasil.forEach(f => {
    const d = document.createElement("div");
    d.className = "fk-card";
    let lokasi = f.wilayah;
    if (f.kecamatan) lokasi += " • " + f.kecamatan;
    if (f.alamat) lokasi += " • " + f.alamat;

    let status = "Data contoh, belum terverifikasi";
    if (f.nyata) status = f.alamat ? "✔ Alamat dari sumber publik" : "⚠ Alamat belum terverifikasi, cek lewat Maps";

    let linkMaps = "";
    if (f.nyata) {
      const url = "https://www.google.com/maps/search/" + encodeURIComponent(f.nama + " " + f.wilayah);
      linkMaps = `<a class="fk-link" href="${url}" target="_blank" rel="noopener">📍 Buka di Maps</a>`;
    }

    d.innerHTML = `<span class="fk-type">${f.jenis}</span><strong>${f.nama}</strong><small>${lokasi}</small><small class="fk-status">${status}</small><small>Konfirmasi jam layanan sebelum datang.</small>${linkMaps}`;
    box.appendChild(d);
  });
}
inputCari.addEventListener("input", renderFaskes);
renderFaskes();