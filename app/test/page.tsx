export default function TestPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🚀 部署测试页面</h1>
      <p>如果你看到这个页面，说明Vercel部署是成功的！</p>
      <p>时间戳: {new Date().toLocaleString()}</p>
      <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>
        返回主页
      </a>
    </div>
  )
}