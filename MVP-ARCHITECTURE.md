# PM Buddy MVP - MCP Architecture & Implementation Plan

**Last Updated:** October 18, 2025  
**Status:** Planning Phase  
**Target:** 4-week MVP delivery

---

## Core Problem & Solution

**Problem:** Product managers spend 80% of their time collecting status updates instead of making strategic decisions.

**Solution:** Daily AI-powered Slack summaries + dashboard that automatically extract project insights from team conversations.

**Key Insight:** Use MCP (Model Context Protocol) + LLM analysis instead of custom NLP to get to market faster.

---

## MCP Architecture

### Data Flow
```
Slack Channels → MCP Server → LLM Analysis → Output (Slack Bot + Dashboard)
```

### Components

#### 1. MCP Server
- Wraps Slack Web API calls as MCP tools
- Handles authentication and rate limiting  
- **Tools:**
  - `get_channel_messages` - Pull message history
  - `get_user_info` - User details for attribution
  - `send_message` - Post daily summaries
  - `get_channel_list` - Available channels
  - `join_channel` - Bot channel access

#### 2. Analysis Engine
- LLM client (Claude/GPT-4) that calls MCP tools
- Smart prompts for extracting PM insights
- Structured output parsing (JSON schema)
- **Analysis Types:**
  - Project blockers and risks
  - Progress updates and completions
  - Timeline changes and delays
  - Team help requests
  - Cross-team dependencies

#### 3. Delivery Layer
- **Slack Bot:** Daily summary messages
- **Dashboard:** Historical view and deep dives
- **Database:** PostgreSQL for insights (not raw messages)
- **Privacy:** Process messages, extract signals, discard raw content

#### 4. Scheduler
- Cron job for daily analysis (9am delivery)
- Configurable channels and timing per workspace
- Error handling and retry logic

---

## MVP User Stories

### Daily Summary
**As a Product Manager, I want to:**

- **Receive a daily Slack message** summarizing yesterday's key developments so I can start my day informed
- **See blockers and risks** identified from team conversations so I can intervene early  
- **Get progress updates** from multiple channels in one place so I don't miss important developments
- **Be notified of timeline changes** mentioned in discussions so I can update stakeholders
- **See team requests for help** so I can provide resources or escalate issues

### Dashboard 
- **View historical summaries** from the past week/month so I can identify patterns
- **Filter insights by project or team** so I can focus on specific areas
- **Export summaries** for stakeholder reports so I can share context efficiently  
- **Configure which channels to monitor** so I only get relevant insights
- **Set summary timing and format** so it fits my workflow

### Setup & Management
- **Install the bot in my workspace** with simple OAuth flow so setup is frictionless
- **Select channels to monitor** during onboarding so the system focuses on relevant discussions
- **Invite team members** to view the dashboard so insights can be shared

---

## 4-Week Implementation Plan

### Phase 1: MCP Foundation (Week 1)
- **Create MCP server** with TypeScript/Node.js
- **Implement Slack API wrappers** as MCP tools (`conversations.history`, `users.list`, etc.)
- **Add authentication handling** (OAuth tokens, workspace management)
- **Build basic LLM integration** (Claude API client)
- **Test MCP tools** with simple message retrieval

### Phase 2: Analysis Engine (Week 2)  
- **Design insight extraction prompts** (blockers, progress, timeline changes)
- **Implement structured output parsing** (JSON schema for insights)
- **Add message filtering logic** (ignore bots, focus on relevant channels)
- **Create daily analysis pipeline** (batch process yesterday's messages)
- **Test end-to-end analysis** with sample Slack data

### Phase 3: Delivery Systems (Week 3)
- **Build Slack bot** for posting daily summaries
- **Create summary message formatting** (structured, scannable format)
- **Implement basic dashboard** (Next.js with insight display)
- **Add database layer** (store insights, workspace configs)
- **Create OAuth installation flow** for workspaces

### Phase 4: Polish & Deploy (Week 4)
- **Add channel configuration UI** (select which channels to monitor)
- **Implement error handling and retries** (rate limits, API failures)
- **Create onboarding flow** (workspace setup, initial configuration)
- **Deploy to production** (Vercel/Railway for quick deployment)
- **Test with 3 pilot customers** (gather feedback, iterate)

---

## Example Daily Summary Format

```
🌅 **Good Morning! Here's what happened yesterday:**

🚨 **Blockers (2)**
- API integration blocked on security review (John, #backend)
- Design system updates delayed (Sarah, #design)

📈 **Progress (3)** 
- User auth feature shipped to staging
- Mobile onboarding tests passing
- Database migration completed

⏰ **Timeline Updates**
- Login feature pushed to next sprint due to blocker above

🙋 **Help Requests**
- Frontend team needs design tokens (Alice, #frontend)
- QA needs test data for new feature (Mark, #qa)

📊 **View full dashboard:** [Link to dashboard]
```

---

## Success Metrics

**Phase 1 Goals (Month 1):**
- 3 pilot PMs using daily for 2+ weeks
- 80%+ of identified insights are actually useful (user validation)
- PMs report saving 5+ hours per week on status collection
- Zero privacy incidents or data leaks
- <10 minute processing latency for daily summaries

**Technical Metrics:**
- 99%+ uptime for daily summary delivery
- <2 second dashboard load times
- Successful processing of 1000+ messages per workspace daily

**User Validation:**
- Weekly user interviews with pilot customers
- Usage analytics (dashboard views, summary click-through rates)
- Net Promoter Score tracking

---

## Tech Stack

**Backend:**
- Node.js/TypeScript for MCP server
- PostgreSQL for data storage
- Claude API for LLM analysis
- Cron jobs for scheduling

**Frontend:**
- Next.js/React for dashboard
- Tailwind CSS for styling
- Vercel for deployment

**Slack Integration:**
- Slack Web API
- OAuth 2.0 for authentication
- Bot User OAuth Scopes: `channels:history`, `channels:read`, `users:read`, `chat:write`

**Infrastructure:**
- Railway/Render for backend hosting
- Vercel for frontend
- PostgreSQL managed database

---

## Privacy & Security

**Privacy-First Architecture:**
- Never store raw Slack message content
- Extract insights immediately, discard original messages
- Only store structured metadata and analysis results
- User data encrypted at rest and in transit

**Compliance:**
- GDPR-compliant data handling
- SOC 2 Type I preparation (Phase 2)
- Clear data retention policies
- User data export/deletion capabilities

---

## Next Steps

1. **Set up development environment** 
2. **Create MCP server boilerplate**
3. **Implement first Slack API integration**
4. **Build basic LLM prompt for message analysis**
5. **Test with sample Slack workspace**

---

## Questions & Decisions

**Open Questions:**
- Which LLM provider? (Claude vs GPT-4 vs local model)
- Message processing frequency? (Real-time vs daily batch)
- Dashboard sharing permissions model?

**Recent Decisions:**
- **Use MCP over custom NLP:** Faster to market, better accuracy
- **Daily summary + dashboard:** Covers both push and pull needs  
- **Privacy-first:** Never store raw messages, competitive advantage
- **Start with Slack only:** Validate core value before multi-platform

---

**Target Launch:** End of November 2025  
**Pilot Customer Recruitment:** Start Week 3 of development