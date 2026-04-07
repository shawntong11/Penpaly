// ============================================================
// Penpaly — 托福邮件写作模板数据
// 你可以在这里修改或添加新的邮件类型和短语
// ============================================================

const TEMPLATES = {
  complaint: {
    label: "投诉信",
    desc: "对服务、设施或人员提出正式投诉",
    scenario: "你在图书馆预约了一个学习室，到达时发现已被他人占用，且工作人员态度恶劣。",
    sections: [
      {
        id: "salutation",
        title: "称呼",
        notes: [
          "正式场合优先使用对方职称",
          "不知道姓名时用 Sir or Madam"
        ],
        phrases: [
          "Dear Professor [Name],",
          "Dear Sir or Madam,",
          "Dear [Office Name] Office,"
        ]
      },
      {
        id: "purpose",
        title: "说明写作原因",
        notes: [
          "第一句直接点明目的，不要绕弯子",
          "用 I am writing to… 开头最稳妥"
        ],
        phrases: [
          "I am writing to express my dissatisfaction with…",
          "I am contacting you to report an unacceptable experience regarding…",
          "The purpose of this email is to report an issue with…",
          "I would like to bring to your attention a serious problem concerning…"
        ]
      },
      {
        id: "situation",
        title: "情况描述",
        notes: [
          "按时间顺序叙述，逻辑清晰",
          "用 However / Unfortunately 引出问题"
        ],
        phrases: [
          "However, upon my arrival, I discovered that…",
          "Unfortunately, the staff member responded rudely by…",
          "This situation has made it difficult for me to…",
          "Despite my confirmed reservation, I was informed that…",
          "To make matters worse,…"
        ]
      },
      {
        id: "solution",
        title: "解决方案",
        notes: [
          "语气礼貌但坚定，提出具体要求",
          "用条件句显得更委婉"
        ],
        phrases: [
          "I would appreciate it if you could investigate this matter.",
          "I was wondering if it would be possible to arrange a refund.",
          "Could you please let me know how this will be resolved?",
          "I would like to ask if… could be addressed promptly.",
          "If possible, I would strongly prefer a written apology."
        ]
      },
      {
        id: "closing",
        title: "感谢与落款",
        notes: ["结尾简短，期待对方尽快回复"],
        phrases: [
          "Thank you for your time and assistance.",
          "I look forward to your prompt response.",
          "I appreciate your understanding in this matter.",
          "Sincerely, / Best regards,",
          "[Your Name]"
        ]
      }
    ]
  },

  apology: {
    label: "道歉信",
    desc: "为失误或造成的不便诚恳道歉",
    scenario: "你不小心损坏了从图书馆借来的书，需要写信向图书管理员道歉并提出补偿方案。",
    sections: [
      {
        id: "salutation",
        title: "称呼",
        notes: ["道歉信语气要真诚，称呼要准确"],
        phrases: [
          "Dear Professor [Name],",
          "Dear Sir or Madam,",
          "Dear [Name],"
        ]
      },
      {
        id: "purpose",
        title: "说明写作原因",
        notes: [
          "开门见山道歉，不要拖延",
          "语气要真诚，避免听起来敷衍"
        ],
        phrases: [
          "I am writing to sincerely apologize for…",
          "Please accept my heartfelt apologies for…",
          "I deeply regret the incident that occurred regarding…",
          "I am truly sorry for the inconvenience I have caused."
        ]
      },
      {
        id: "situation",
        title: "情况描述",
        notes: [
          "简要解释原因，但不要过度辩解",
          "承认责任比解释原因更重要"
        ],
        phrases: [
          "The damage occurred accidentally when…",
          "I take full responsibility for this incident.",
          "I understand this has caused you considerable inconvenience.",
          "There is no excuse for what happened; however,…",
          "I should have been more careful with…"
        ]
      },
      {
        id: "solution",
        title: "解决方案",
        notes: ["主动提出补偿，体现诚意"],
        phrases: [
          "I am prepared to cover the full replacement cost.",
          "I would be happy to purchase a new copy of the book.",
          "Please let me know how I can make this right.",
          "I would like to offer… as compensation.",
          "I assure you this will not happen again."
        ]
      },
      {
        id: "closing",
        title: "感谢与落款",
        notes: [],
        phrases: [
          "Thank you for your understanding.",
          "I appreciate your patience in this matter.",
          "Once again, I sincerely apologize for any inconvenience caused.",
          "Sincerely, / Best regards,",
          "[Your Name]"
        ]
      }
    ]
  },

  inquiry: {
    label: "咨询信",
    desc: "向教授或机构询问信息或寻求帮助",
    scenario: "你对下学期一门课程感兴趣，想向教授咨询课程内容、先修要求和作业形式。",
    sections: [
      {
        id: "salutation",
        title: "称呼",
        notes: ["咨询信通常知道对方身份，用职称"],
        phrases: [
          "Dear Professor [Name],",
          "Dear Dr. [Name],",
          "Dear [Department] Office,"
        ]
      },
      {
        id: "purpose",
        title: "说明写作原因",
        notes: [
          "先介绍自己身份，再说明咨询目的",
          "让对方知道你是谁，以便回复"
        ],
        phrases: [
          "I am writing to inquire about…",
          "My name is [Name], and I am a [year] student in [department].",
          "I came across your course and would like to learn more about…",
          "I am interested in enrolling in [course name] and have a few questions."
        ]
      },
      {
        id: "situation",
        title: "具体问题",
        notes: [
          "每个问题一句话，最多问三个",
          "问题要具体，方便对方直接回答"
        ],
        phrases: [
          "Could you please clarify the prerequisites for this course?",
          "I would like to know whether the course covers…",
          "Additionally, I am curious about the assessment format.",
          "Would it be possible to receive a copy of the syllabus?",
          "I was wondering if prior experience in… is required."
        ]
      },
      {
        id: "solution",
        title: "期待回复",
        notes: ["表达灵活性，方便对方安排"],
        phrases: [
          "I would greatly appreciate any information you could provide.",
          "I am happy to discuss this further at your convenience.",
          "Please feel free to contact me if you need any additional information.",
          "I would be glad to schedule a meeting if that would be more convenient."
        ]
      },
      {
        id: "closing",
        title: "感谢与落款",
        notes: [],
        phrases: [
          "Thank you for taking the time to consider my inquiry.",
          "I look forward to hearing from you at your earliest convenience.",
          "Your assistance is greatly appreciated.",
          "Sincerely, / Best regards,",
          "[Your Name]"
        ]
      }
    ]
  },

  invitation: {
    label: "邀请信",
    desc: "正式邀请教授或嘉宾参加活动",
    scenario: "你的学生社团即将举办年度文化节，请写信邀请一位教授来做开幕演讲。",
    sections: [
      {
        id: "salutation",
        title: "称呼",
        notes: ["邀请信语气正式且热情"],
        phrases: [
          "Dear Professor [Name],",
          "Dear Dr. [Name],"
        ]
      },
      {
        id: "purpose",
        title: "说明写作原因",
        notes: [
          "代表组织发出邀请，语气诚恳有礼",
          "体现对方的重要性"
        ],
        phrases: [
          "On behalf of [club name], I would like to invite you to…",
          "It is my great pleasure to extend an invitation to you for…",
          "We would be honored if you could join us for…",
          "I am writing on behalf of [organization] to cordially invite you to…"
        ]
      },
      {
        id: "situation",
        title: "活动详情",
        notes: [
          "时间、地点、形式三要素写清楚",
          "说明对方被邀请的原因"
        ],
        phrases: [
          "The event will be held on [date] at [location].",
          "As our keynote speaker, you would be expected to speak for approximately [time].",
          "The event is expected to attract approximately [number] students.",
          "Your expertise in [field] makes you an ideal speaker for this occasion.",
          "Your participation would greatly inspire our members."
        ]
      },
      {
        id: "solution",
        title: "期待确认",
        notes: ["给出截止日期，提供联系方式"],
        phrases: [
          "We would be grateful if you could confirm your attendance by [date].",
          "Please do not hesitate to contact me if you require further details.",
          "We are happy to accommodate any special requirements you may have.",
          "We sincerely hope you will be able to join us for this special occasion."
        ]
      },
      {
        id: "closing",
        title: "感谢与落款",
        notes: [],
        phrases: [
          "Thank you for considering our invitation.",
          "We look forward to the possibility of welcoming you.",
          "Your presence would make this event truly memorable.",
          "Sincerely, / Best regards,",
          "[Your Name]"
        ]
      }
    ]
  }
};
