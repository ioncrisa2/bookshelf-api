# Bookshelf API

Bookshelf API merupakan projek yang dibuat untuk memenuhi syarat kelulusan pada kelas Dicoding yaitu "**Belajar membuat Aplikasi Backend untuk Pemula**"

### **Daftar Endpoint**

Pengujian dapat dilakukan menggunakan postman

|Endpoint|Method|Keterangan|
|-------|--------|-------|
| /books | **POST** |Menambahkan buku baru
| /books | **GET** |Mengambil semua buku yang tersimpan
| /books/{id} | **GET** | Mengambil detail satu buku berdasarkan id buku
| /books/{id} | **PUT** |  Mengubah Satu buku berdasarkan id buku
| /books/{id} | **DELETE** | Menghapus satu data buku berdasarkan ID buku 


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

**HTTP Status Code** : `201 Created`

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


```json
{
    "status": "fail",
    "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
}
```

## Error bila terjadi error karena alasan umum

**HTTP Status Code** : `400 Bad Request`

```json
{
    "status": "error",
    "message": "Buku gagal ditambahkan"
}
```

# Mengambil semua buku yang tersimpan

**URL** : `/books`

**METHOD** : `GET`

## Response Success

**HTTP Status Code** : `200 OK`

```json
{
    "status": "success",
    "data": {
        "books": [
            {
                "id": "Qbax5Oy7L8WKf74l",
                "name": "Buku A",
                "publisher": "Dicoding Indonesia"
            },
            {
                "id": "1L7ZtDUFeGs7VlEt",
                "name": "Buku B",
                "publisher": "Dicoding Indonesia"
            },
            {
                "id": "K8DZbfI-t3LrY7lD",
                "name": "Buku C",
                "publisher": "Dicoding Indonesia"
            }
        ]
    }
}
```

## Response ketika data buku masih kosong

```json
{
    "status": "success",
    "data": {
        "books": []
    }
}
```


