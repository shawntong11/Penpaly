export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { essay, type, scenario } = req.body;

  if (!essay || essay.trim().length < 20) {
    return res.status(400).json({ error: 'Essay too short' });
  }

  const prompt = `你是一位专业的托福邮件写作评分老师，请对学生的作文评分并给出改进建议。

邮件类型：${type}
场景要求：${scenario}

学生作文：
${essay}

请严格按以下JSON格式返回，不要输出任何其他内容，不要加markdown代码块：
{
  "total": 整数(0-30),
  "content": 整数(0-10),
  "language": 整数(0-10),
  "organization": 整数(0-10),
  "strengths": ["优点1（一句话）", "优点2（一句话）"],
  "improvements": ["改进建议1（具体）", "改进建议2（具体）", "改进建议3（具体）"],
  "example": "原句（学生写的有问题的一句话） → 改句（你的改写版本）"
}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: 'Anthropic API error', detail: err });
    }

    const data = await response.json();
    const raw = data.content[0].text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(raw);
    return res.status(200).json(result);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
