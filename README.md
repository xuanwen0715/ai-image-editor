# AI Image Editor

AI图像编辑工具站 - 基于Next.js和OpenRouter API

## 功能特性

- 🎨 AI驱动的图像编辑
- 🖼️ 智能图片压缩（自动压缩至1024x1024）
- 🚀 基于Gemini 2.5 Flash Image Preview模型
- 📱 响应式设计
- 🔒 安全的API密钥管理

## 技术栈

- **框架**: Next.js 16.0.0
- **UI库**: Radix UI + Tailwind CSS
- **AI模型**: Google Gemini 2.5 Flash Image Preview (via OpenRouter)
- **部署**: Vercel

## 环境变量

在Vercel中设置以下环境变量：

```
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_SITE_URL=https://your-domain.vercel.app
OPENROUTER_SITE_NAME=AI Image Editor
OPENROUTER_MODEL=google/gemini-2.5-flash-image-preview
```

## 本地开发

1. 克隆仓库
```bash
git clone https://github.com/xuanwen0715/ai-image-editor.git
cd ai-image-editor
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp .env.example .env.local
# 编辑 .env.local 添加你的API密钥
```

4. 启动开发服务器
```bash
npm run dev
```

## 部署到Vercel

1. 连接GitHub仓库到Vercel
2. 设置环境变量
3. 部署

## API路由

- `POST /api/generate` - 图像生成接口

## 许可证

MIT License