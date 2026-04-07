# Penpaly — 托福邮件写作练习

托福 2026 新题型邮件写作练习工具，包含模板库 + 在线写作 + AI 批改。

推荐部署域名：`penpaly.vercel.app`

## 项目结构

```
penpaly/
├── index.html    # 主页面
├── style.css     # 样式
├── data.js       # 模板数据（在这里修改/添加模板）
├── app.js        # 应用逻辑
└── vercel.json   # Vercel 部署配置
```

## 本地预览

用任意静态服务器运行，例如：

```bash
npx serve .
# 或
python3 -m http.server 3000
```

然后打开 http://localhost:3000

## 部署到 Vercel（推荐）

### 方法一：Vercel CLI

```bash
npm i -g vercel
cd toefl-email
vercel
```

按提示操作，完成后获得线上地址。

### 方法二：GitHub + Vercel 自动部署

1. 在 GitHub 新建仓库，把这个文件夹 push 上去
2. 登录 vercel.com，点 "Add New Project"
3. 导入该 GitHub 仓库
4. Framework Preset 选 "Other"
5. 点 Deploy，完成

## 添加新模板

编辑 `data.js`，在 `TEMPLATES` 对象里添加新的 key：

```js
request: {
  label: "请求信",
  desc: "向对方请求帮助或资源",
  scenario: "你的场景描述...",
  sections: [
    {
      id: "salutation",
      title: "称呼",
      notes: ["提示1"],
      phrases: ["Dear Professor [Name],"]
    },
    // ...更多 sections
  ]
}
```

## AI 批改说明

使用 Anthropic Claude API。API Key 由平台注入，无需在代码中配置。
如果在自己的服务器部署，需要在后端代理 API 请求以保护 Key。

## 后续功能规划

- [ ] 用户登录与历史记录
- [ ] 付费订阅解锁
- [ ] 更多题型（学术讨论 Academic Discussion）
- [ ] 错题本与进度跟踪
