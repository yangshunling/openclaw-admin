const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3456;

app.use(cors());
app.use(express.json());

// 获取 OpenClaw 配置路径
function getOpenClawConfigPath() {
  const homeDir = require('os').homedir();
  return path.join(homeDir, '.openclaw', 'openclaw.json');
}

// Mock 数据 - 模拟真实 OpenClaw 状态
const mockData = {
  status: {
    openclaw: 'running',
    gateway: 'connected',
    version: '1.0.0'
  },
  skills: [
    {
      id: 'find-skills',
      name: 'find-skills',
      description: '发现和安装技能',
      status: 'active',
      location: '~/.agents/skills/find-skills'
    },
    {
      id: 'frontend-design',
      name: 'frontend-design',
      description: '前端界面设计',
      status: 'active',
      location: '~/.agents/skills/frontend-design'
    },
    {
      id: 'log-exception-analyzer',
      name: 'log-exception-analyzer',
      description: '日志异常分析',
      status: 'active',
      location: '~/.agents/skills/log-exception-analyzer'
    },
    {
      id: 'minimax-docx',
      name: 'minimax-docx',
      description: 'Word文档处理',
      status: 'active',
      location: '~/.agents/skills/minimax-docx'
    },
    {
      id: 'minimax-pdf',
      name: 'minimax-pdf',
      description: 'PDF文档处理',
      status: 'active',
      location: '~/.agents/skills/minimax-pdf'
    },
    {
      id: 'minimax-xlsx',
      name: 'minimax-xlsx',
      description: 'Excel表格处理',
      status: 'active',
      location: '~/.agents/skills/minimax-xlsx'
    },
    {
      id: 'pptx-generator',
      name: 'pptx-generator',
      description: 'PPT演示文稿生成',
      status: 'active',
      location: '~/.agents/skills/pptx-generator'
    },
    {
      id: 'skill-creator',
      name: 'skill-creator',
      description: '技能创建与管理',
      status: 'active',
      location: '~/.agents/skills/skill-creator'
    },
    {
      id: 'tavily-search',
      name: 'tavily-search',
      description: 'Web搜索功能',
      status: 'active',
      location: '~/.agents/skills/tavily-search'
    }
  ],
  plugins: [
    {
      id: 'feishu',
      name: '飞书集成',
      version: '1.0.0',
      status: 'active',
      description: '飞书文档、 云盘、Wiki 集成'
    },
    {
      id: 'dingtalk',
      name: '钉钉集成',
      version: '1.0.0',
      status: 'active',
      description: '钉钉消息推送和群组管理'
    }
  ],
  mcpServers: [
    {
      id: 'filesystem',
      name: 'Filesystem',
      type: 'filesystem',
      status: 'active',
      config: {
        allowedDirectories: ['C:/Users/yangsl25774/.openclaw/workspace-ceo']
      }
    },
    {
      id: 'brave-search',
      name: 'Brave Search',
      type: 'search',
      status: 'active',
      config: {
        apiKey: '***'
      }
    }
  ],
  gateway: {
    status: 'connected',
    url: 'http://localhost:3456',
    channels: [
      {
        id: 'dingtalk',
        name: '钉钉',
        status: 'active',
        type: 'im'
      },
      {
        id: 'discord',
        name: 'Discord',
        status: 'inactive',
        type: 'im'
      }
    ]
  },
  sessions: [
    {
      id: 'agent:ceo:dingtalk:ceo:direct:052444563026673371',
      channel: 'dingtalk',
      type: 'direct',
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      status: 'active'
    },
    {
      id: 'agent:ceo:subagent:9edcce64-e1f6-4ffa-99ff-071cd3fd4fd2',
      channel: 'dingtalk',
      type: 'subagent',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      lastActivity: new Date().toISOString(),
      status: 'active'
    }
  ]
};

// API 路由
app.get('/api/status', (req, res) => {
  res.json(mockData.status);
});

app.get('/api/version', (req, res) => {
  res.json({ version: mockData.status.version });
});

app.get('/api/skills', (req, res) => {
  res.json(mockData.skills);
});

app.get('/api/config', (req, res) => {
  const configPath = getOpenClawConfigPath();
  try {
    if (fs.existsSync(configPath)) {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      res.json(config);
    } else {
      res.json({
        message: '配置文件不存在',
        configPath: configPath
      });
    }
  } catch (error) {
    res.json({
      message: '读取配置文件失败',
      error: error.message,
      configPath: configPath
    });
  }
});

app.get('/api/plugins', (req, res) => {
  res.json(mockData.plugins);
});

app.get('/api/mcp', (req, res) => {
  res.json(mockData.mcpServers);
});

app.get('/api/gateway/status', (req, res) => {
  res.json(mockData.gateway);
});

app.get('/api/gateway/channels', (req, res) => {
  res.json(mockData.gateway.channels);
});

app.get('/api/sessions', (req, res) => {
  res.json(mockData.sessions);
});

app.listen(PORT, () => {
  console.log(`🚀 OpenClaw Admin Backend running on http://localhost:${PORT}`);
});