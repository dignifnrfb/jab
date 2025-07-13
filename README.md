# Modern Rental Platform

一个使用现代技术栈构建的现代化租赁平台项目，具有精美的UI设计和流畅的用户体验。

## 🚀 技术栈

### 前端
- **Next.js 14** - App Router模式
- **React 18** - 用户界面库
- **TypeScript 5.0** - 类型安全
- **Tailwind CSS 3.4** - 样式框架（含JIT编译）
- **CSS Modules** - 模块化样式

### 动画
- **Framer Motion 10.16** - 高性能动画库
- **@react-spring/web 9.7** - 基于物理的动画

### 状态管理
- **Zustand 4.3** - 轻量级状态管理
- **Immer 10.0** - 不可变状态更新

### 后端
- **Next.js API Routes** - 服务端API
- **Prisma 5.12** - 数据库ORM
- **PostgreSQL** - 关系型数据库

### 开发工具
- **ESLint** - 代码检查（Airbnb规则）
- **Prettier** - 代码格式化
- **Husky** - Git钩子
- **lint-staged** - 暂存文件检查
- **commitlint** - 提交信息规范

### PWA支持
- **next-pwa 14.1** - 渐进式Web应用
- **next-fonts 3.0** - 字体优化

## 🛠️ 开发指南

### 环境要求
- Node.js 18.17+
- npm 或 yarn
- PostgreSQL 数据库

### 安装依赖

```bash
npm install
```

### 环境配置

1. 复制环境变量文件：
```bash
cp .env.example .env.local
```

2. 配置数据库连接和其他环境变量

### 数据库设置

```bash
# 生成Prisma客户端
npx prisma generate

# 运行数据库迁移
npx prisma db push

# 查看数据库（可选）
npx prisma studio
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 代码规范

```bash
# 代码检查
npm run lint

# 自动修复
npm run lint:fix

# 格式化代码
npm run format

# 类型检查
npm run type-check
```

### 构建部署

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

## 📝 提交规范

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
perf: 性能优化
test: 测试相关
build: 构建相关
ci: CI/CD相关
chore: 其他杂项
```

## 🎨 设计系统

### 颜色主题
- 主色调：深空灰/黑色背景
- 强调色：现代蓝色
- 文本：白色/灰色层次

### 组件库
- 按钮组件支持多种变体和尺寸
- 响应式设计，支持移动端
- 流畅的动画过渡效果

## 🔧 最近修复

### Docker构建和ESLint错误修复
- ✅ 修复zustand/middleware/immer模块解析问题
- ✅ 更新next.config.mjs添加ESM模块解析配置
- ✅ 修复useAppStore和useRentalStore中的immer使用方式
- ✅ 修复TypeScript类型错误和process.env访问方式
- ✅ 修复所有ESLint错误（导入顺序、代码格式、React Hook依赖等）
- ✅ 添加ESLint规则配置以支持immer状态修改
- ✅ 确保项目可以成功构建并通过所有检查

## 📱 PWA功能

- 离线缓存
- 应用安装
- 推送通知支持

## 🚀 部署

项目支持多种部署方式：
- Vercel（推荐）
- Docker容器
- 传统服务器

详细部署说明请参考项目文档。