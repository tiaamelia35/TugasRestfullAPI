// Mini Project - Pertemuan 3-4: RESTful API CRUD dengan Express.js
// Entitas: belanja (id, nama, harga)
//
// TODO belanja: lengkapi setiap handler di bawah ini sesuai komentar.
// Jalankan dengan: npm install && npm start

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let belanja = [
  { id: 1, produk: "Handphone", harga: 3000000, status : "Tersedia" },
  { id: 2, produk: "Minyak Goreng", harga: 25000, status : "Habis" },
  { id: 3, produk: "Sabun", harga: 10000, status : "Tersedia" },
  { id: 4, produk: "Helm", harga: 100000, status : "Tersedia" },
];

// TODO 1: GET /belanja -> kirim seluruh data sebagai JSON
app.get('/belanja', (req, res) => {     // /belanja agar dicari di browser localhost:3000/belanja
  // lengkapi di sini
  res.json(belanja);
});


//Latihan 1
// buat fungsi untuk mengambil data belanja aktif, dgn alamat: /belanja/aktif
app.get('/belanja/aktif', (req, res) => {
  const data = belanja.filter( (b) => b.status == "Tersedia");
  if (!data) return res.status(404).json({ message: 'Produk tidak ditemukan' });
  res.json(data);
})

// TODO 2: GET /belanja/:id -> cari data berdasarkan id,
// kirim 404 dengan { message: 'Data tidak ditemukan' } jika tidak ada
app.get("/belanja/:id", (req, res) => {
  // lengkapi di sini
  const id = parseInt(req.params.id);
  const data = belanja.find((b) => b.id === id);
  if (!data) return res.status(404).json({ message: 'Produk tidak ditemukan' });
  res.json(data);
});

// TODO 3: POST /belanja -> ambil { nama, harga } dari req.body,
// buat objek baru dengan id = belanja.length + 1, simpan ke array,
// kirim response dengan status 201
app.post("/belanja", (req, res) => {
  // lengkapi di sini
  const { nama, harga } = req.body;

  const baru = {
    id: belanja.length + 1,
    nama, 
    harga,
  };

  belanja.push(baru);
  res.status(201).json(baru);
});


// TODO 4: PUT /belanja/:id -> cari index berdasarkan id,
// jika tidak ditemukan kirim 404, jika ditemukan gabungkan data lama
// dengan req.body lalu kirim data yang telah diperbarui
app.put("/belanja/:id", (req, res) => {
  // lengkapi di sini
  const id = parseInt(req.params.id);
  const index = belanja.findIndex( (b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({message: 'Produk tidak ditemukan'});
  }

  belanja[index] = { ...belanja[index], ...req.body };
  res.json(belanja[index]);
});

// TODO 5: DELETE /belanja/:id -> cari index berdasarkan id,
// jika tidak ditemukan kirim 404, jika ditemukan hapus dari array
// dan kirim response dengan status 204
app.delete("/belanja/:id", (req, res) => {
  // lengkapi di sini
  const id = parseInt(req.params.id);
  const index = belanja.findIndex( (b) => b.id === id);

  if (index === -1){
    return res.status(404).json({ message: 'Produk tidak ditemukan'});
  }

  belanja.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
