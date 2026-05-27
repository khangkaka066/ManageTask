# Team Task Manager (React + Node + MongoDB)

## Cấu trúc thư mục

- `backend/`: REST API Node.js + Express + MongoDB (Mongoose)
- `frontend/`: React + Vite + Tailwind CSS dashboard

## Chạy local

### 1) Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 2) Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## API chính

- Projects: `GET/POST /api/projects`, `GET/PUT/DELETE /api/projects/:id`
- Tasks: `GET/POST /api/tasks`, `GET/PUT/DELETE /api/tasks/:id`
- Members: `GET/POST /api/members`, `GET/PUT/DELETE /api/members/:id`
- Dashboard: `GET /api/dashboard`

## Ghi chú validation

Do backend dùng Node.js nên phần schema validation sử dụng **Zod** (vai trò tương đương khai báo model/typing như Pydantic).
