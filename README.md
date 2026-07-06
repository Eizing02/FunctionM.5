# Function Visual Lab ม.5

เว็บสื่อการสอนคณิตศาสตร์เรื่อง “ฟังก์ชัน” สำหรับนักเรียนชั้น ม.5 ตามแนวเนื้อหาพื้นฐาน สสวท. / Project14 ใช้ React + Vite + TypeScript และใช้ Desmos API สำหรับกราฟ 2D แบบโต้ตอบ

## บทเรียนหลัก

1. ความหมายของฟังก์ชัน
2. โดเมนและเรนจ์
3. ฟังก์ชันจาก A ไป B
4. ฟังก์ชันจากสับเซตของจำนวนจริงไปยังจำนวนจริง
5. การตรวจสอบฟังก์ชันจากกราฟ
6. ฟังก์ชันเชิงเส้น
7. การใช้ฟังก์ชันเชิงเส้นแก้ปัญหา
8. ฟังก์ชันกำลังสอง
9. ฟังก์ชันขั้นบันได
10. ฟังก์ชันเอกซ์โพเนนเชียล
11. ห้องทดลองเขียนสมการเอง

บทค่าสัมบูรณ์ เศษส่วน และรากที่สองไม่แสดงเป็นบทหลักในชุดนี้

## ติดตั้ง

```bash
npm install
```

## ตั้งค่า Desmos API Key

สร้างไฟล์ `.env.local` ที่ root ของโปรเจกต์ แล้วใส่:

```bash
VITE_DESMOS_API_KEY=YOUR_DESMOS_API_KEY_HERE
```

ไฟล์ `.env.local` ไม่ควรถูก commit ขึ้น repository ส่วนตัวอย่าง key อยู่ใน `.env.example`

## รันเว็บ

```bash
npm run dev
```

จากนั้นเปิด URL ที่ Vite แสดง เช่น `http://127.0.0.1:5173/`

## Build

```bash
npm run build
```

ไฟล์ static จะอยู่ในโฟลเดอร์ `dist`

## Deploy บน Vercel

1. นำโปรเจกต์ขึ้น GitHub
2. เข้า Vercel แล้วเลือก Import Project
3. Framework Preset เลือก Vite
4. เพิ่ม Environment Variable ชื่อ `VITE_DESMOS_API_KEY`
5. กด Deploy
