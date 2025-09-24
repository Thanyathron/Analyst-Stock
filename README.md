# Inventory System (Netlify + Neon/Postgres + Cloudinary)

ไฟล์นี้เป็นตัวอย่างโครงโปรเจคสำหรับ deploy บน Netlify โดยใช้ Netlify Functions เป็น backend เชื่อม Neon/Postgres และ Cloudinary สำหรับเก็บรูปภาพ

สำคัญ: อย่าใส่รหัสจริงในไฟล์ ZIP นี้ ให้กำหนดค่าตัวแปรแวดล้อมบน Netlify ตาม .env.example

วิธีใช้งาน (สั้น ๆ):
1. สร้าง project ใน Netlify และตั้ง environment variables ตาม .env.example
2. อัปโหลดไฟล์ ZIP หรือ push repo ไปที่ GitHub แล้วเชื่อมกับ Netlify
3. ติดตั้ง dependencies สำหรับ functions (Netlify จะติดตั้งจาก package.json)
4. สร้างฐานข้อมูลตาม schema.sql ใน Neon/Postgres

Endpoints ตัวอย่าง:
GET  /api/stock
POST /api/stock
POST /api/auth/login
POST /api/stock/import  (multipart CSV)
POST /api/stock/upload-image  (multipart -> uploads to Cloudinary)

ดูไฟล์ใน netlify/functions สำหรับตัวอย่างโค้ด
