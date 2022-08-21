# Bookshelf API


Bookshelf API merupakan projek yang dibuat untuk memenuhi syarat kelulusan pada kelas Dicoding yaitu "**Belajar membuat Aplikasi Backend untuk Pemula**"

## Fitur
1. Menambah buku baru
2. Mendapatkan daftar semua buku yang tersedia
3. Melihat detail data buku berdasarkan ID buku
4. Mengubah data buku berdasarkan ID buku
5. Menghapus data buku berdasarkan ID buku

### **Daftar Endpoint**

|Endpoint|Method|Keterangan|
|-------|------|-------|
|/books | **POST** |Menambahkan buku baru
|/books | **GET**  |Mengambil semua buku yang tersimpan
|/books/{id} | **GET**| Mengambil detail satu buku berdasarkan id buku
|/books/{id}|**PUT**|  Mengubah Satu buku berdasarkan id buku
|/books/{id}|**DELETE**| Menghapus satu data buku berdasarkan ID buku 

Pengujian dapat dilakukan menggunakan postman

# Menambahkan Data baru

Digunakan untuk menambahkan data buku

**URL** : `/books`

**METHOD** : `POST`

**REQUEST BODY** :

```json
{
    "name"      : "string",
    "year"      : "number",
    "author"    : "string",
    "summary"   : "string",
    "publisher" : "string",
    "pageCount" : "number",
    "readPage"  : "number",
    "reading"   : "boolean"
}
```

**Example**

```json
{
    "name":"Belajar Pemograman pemula",
    "year": 2018,
    "author": "Kurniawan Kurniawan",
    "summary": "Buku ini cocok untuk orang awam yang ingin mengenal dunia pemograman",
    "publisher": "Informatika",
    "pageCount": 350,
    "readPage": 150,
    "reading": true
}
```

## Response Success 

**HTTP Status Code** : `200 OK`

```json
{
    "status": "success",
    "message": "Buku berhasil ditambahkan",
    "data": {
        "bookID": "zzo5E-sP"
    }
}
```

## Error Ketika Nama Buku Kosong

**HTTP Status Code** : `400 Bad Request`

### Response

```json
{
    "status": "fail",
    "message": "Gagal menambahkan buku. Mohon isi nama buku"
}
```

## Error ketika readPage > pageCount

**HTTP Status Code** : `400 Bad Request`






