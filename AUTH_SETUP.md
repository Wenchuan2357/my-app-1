# 用户注册和登录功能

## 功能概述

这个项目现在包含完整的用户注册和登录功能，使用 Drizzle ORM 和 bcrypt 进行密码加密。

## 已添加的功能

### 1. 数据库架构
- `users` 表：存储用户信息（用户名、邮箱、密码哈希）
- `todos` 表：已更新，添加了 `user_id` 外键关联到 `users` 表

### 2. API 路由
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出

### 3. 前端页面
- `/register` - 注册页面
- `/login` - 登录页面
- `/` - 主页面（需要登录才能访问）

### 4. 认证工具
- `src/lib/auth.ts` - 用户状态管理工具函数

## 安装步骤

### 1. 安装依赖

bcryptjs 是 bcrypt 的纯 JavaScript 实现，不需要本地编译：

```bash
pnpm add bcryptjs
```

注意：不需要安装 `@types/bcryptjs`，因为 bcryptjs 自带类型定义。

或者使用 npm：

```bash
npm install bcryptjs
```

如果 npm 安装失败，可以使用 pnpm（如上面所示）或 yarn。

### 2. 设置环境变量

创建 `.env` 文件：

```env
DATABASE_URL=postgresql://user:password@localhost:5432/myapp
```

### 3. 运行数据库迁移

```bash
npm run db:push
```

### 4. 启动开发服务器

```bash
npm run dev
```

## 使用说明

### 注册新用户
1. 访问 `/register`
2. 填写用户名、邮箱和密码
3. 点击注册按钮

### 登录
1. 访问 `/login`
2. 输入邮箱和密码
3. 点击登录按钮
4. 登录成功后会重定向到首页

### 登出
1. 在首页点击右上角的 "Logout" 按钮

## 注意事项

### 安全性

- 密码使用 bcrypt 进行哈希处理（salt rounds: 10）
- 当前实现使用 localStorage 存储用户信息（用于演示）
- **生产环境应该使用 JWT token 或 session**

### 生产环境建议

1. 使用 JWT token 或 session 进行身份验证
2. 实现 API 路由的认证中间件
3. 添加密码强度验证
4. 实现邮箱验证
5. 添加忘记密码功能
6. 使用 HTTPS
7. 实现 CSRF 保护

## API 端点

### 注册
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}

Response:
{
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "created_at": "2026-03-09T..."
  },
  "message": "Registration successful"
}
```

### 登录
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}

Response:
{
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "created_at": "2026-03-09T..."
  },
  "message": "Login successful"
}
```

## 文件结构

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── register/route.ts    # 注册 API
│   │       ├── login/route.ts       # 登录 API
│   │       └── logout/route.ts      # 登出 API
│   ├── login/page.tsx               # 登录页面
│   ├── register/page.tsx            # 注册页面
│   └── page.tsx                     # 主页面
├── db/
│   └── schema.ts                    # 数据库架构
└── lib/
    ├── auth.ts                      # 认证工具
    └── db.ts                        # 数据库连接
```

## 故障排除

### bcrypt/bcryptjs 安装失败

由于 bcrypt 在 Windows 上需要本地编译，如果安装失败，请使用 bcryptjs（纯 JavaScript 实现）：

```bash
pnpm add bcryptjs
pnpm add -D @types/bcryptjs
```

本项目已经配置为支持 bcrypt 和 bcryptjs 两种实现，会自动尝试使用可用的包。

### 数据库连接失败

确保 PostgreSQL 数据库正在运行，并且 `DATABASE_URL` 配置正确。

### 迁移失败

运行 `npm run db:push` 来直接推送架构更改到数据库（不需要迁移文件）。
