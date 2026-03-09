# 部署指南

## 部署前检查

### 环境变量
确保在部署平台上配置以下环境变量：

```env
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
```

### 数据库准备
确保数据库已创建并运行以下迁移：

```bash
pnpm run db:push
```

或者运行 SQL 脚本：

```sql
-- 创建 users 表
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- 给 todos 表添加 user_id 列
ALTER TABLE todos ADD COLUMN user_id INTEGER REFERENCES users(id);
```

## 本地构建

```bash
# 安装依赖
pnpm install

# 构建生产版本
pnpm run build

# 启动生产服务器
pnpm run start
```

## 部署到 Vercel

### 1. 连接 Git 仓库
- 在 Vercel 中导入项目
- 选择 `my-app-1` 仓库

### 2. 配置环境变量
在 Vercel 项目设置中添加：
- `DATABASE_URL` - 你的 PostgreSQL 连接字符串

### 3. 构建设置
Vercel 会自动检测 Next.js 并使用以下配置：

```
Build Command: pnpm run build
Output Directory: .next
Install Command: pnpm install
```

### 4. 部署
点击 "Deploy" 按钮开始部署。

## 部署到其他平台

### Railway
```bash
railway login
railway init
railway add DATABASE_URL
railway up
```

### Render
```bash
# 安装 Render CLI
npm install -g @render/cli

# 初始化项目
render init

# 部署
render deploy
```

### Netlify
1. 创建 `netlify.toml` 文件：

```toml
[build]
  command = "pnpm run build"
  publish = ".next"

[functions]
  node_bundler = "esbuild"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

2. 在 Netlify 中连接 Git 仓库并配置环境变量。

## 部署后检查清单

- [ ] 环境变量已正确配置
- [ ] 数据库迁移已运行
- [ ] 可以访问注册页面
- [ ] 可以注册新用户
- [ ] 可以登录
- [ ] 可以使用 Todo 功能
- [ ] 登出功能正常

## 常见问题

### 构建失败
确保所有依赖都已安装：
```bash
pnpm install
```

### 数据库连接失败
检查 `DATABASE_URL` 环境变量是否正确配置。

### bcrypt 相关错误
项目使用 bcryptjs，不需要安装 bcrypt。确保 `package.json` 中只有：
```json
{
  "dependencies": {
    "bcryptjs": "^3.0.3"
  }
}
```

### 迁移错误
如果迁移失败，使用 `pnpm run db:push` 直接推送架构到数据库。

## 性能优化建议

1. 启用数据库连接池
2. 添加 Redis 用于缓存
3. 配置 CDN 用于静态资源
4. 启用 gzip 压缩
5. 配置适当的缓存策略

## 安全建议

1. 使用 HTTPS
2. 配置 CSP (Content Security Policy)
3. 实现 CSRF 保护
4. 使用 JWT 或 session 替代 localStorage
5. 添加速率限制
6. 定期更新依赖
7. 启用日志监控

## 监控和日志

推荐使用以下工具监控应用：

- Vercel Analytics
- Sentry (错误监控)
- LogRocket (用户会话监控)
- PostgreSQL 日志

## 回滚策略

如果部署出现问题：

1. 在 Vercel 中选择之前的部署版本
2. 或者在 Git 中回滚到之前的提交：
   ```bash
   git revert <commit-hash>
   git push
   ```

## 支持

如有问题，请查看：
- Next.js 文档: https://nextjs.org/docs
- Drizzle ORM 文档: https://orm.drizzle.team
- Vercel 文档: https://vercel.com/docs
