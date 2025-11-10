# PM Buddy - Documentation Hub

**Last Updated:** November 10, 2025
**Project Status:** Week 1 Development (MCP Foundation)
**Target Launch:** Q1 2026

---

## 🎯 Quick Links

**📦 Repositories:**
- **[pm-mvp-server](https://github.com/codingchik/pm-mvp-server)** - Backend MCP server (Node.js/TypeScript)
- **pm-mvp** (this repo) - Documentation, architecture, and project planning

**📋 Project Management:**
- **[Linear Project](https://linear.app/SC/project/f9c0ab4258f5)** - Week 1-4 task tracking

---

## 📖 Documentation Structure

### Strategic Documents (`/docs`)

#### [Product Concept](./docs/product-concept.md)
**Purpose:** Define what we're building and why
**Key Sections:**
- Problem Statement (PMs spend 80% time on admin)
- Target Users (Cross-Functional Product Managers at Series A-C startups)
- Value Proposition (Reclaim 15+ hours/week)
- Competitive Landscape
- MVP Strategy (3 phases)

**Read this if:** You need to explain the product vision to stakeholders, investors, or new team members.

---

#### [Business Model Canvas](./docs/business-model-canvas.md)
**Purpose:** Define how we'll make money and scale
**Key Sections:**
- Value Propositions
- Customer Segments & Personas
- Revenue Streams ($99-799/month tiers)
- Cost Structure
- Financial Projections (Year 1-3)
- Success Metrics

**Read this if:** You're evaluating the business opportunity or preparing for fundraising.

---

### Technical Documents

#### [MVP Architecture](./MVP-ARCHITECTURE.md)
**Purpose:** 4-week implementation plan and system design
**Key Sections:**
- Core Problem & Solution
- MCP Architecture (Slack → MCP Server → LLM → Output)
- Week-by-week Implementation Plan
- Tech Stack
- Privacy & Security

**Read this if:** You need to understand the technical approach and development timeline.

---

#### [Technical Specification](./technical_specification.md)
**Purpose:** Detailed technical implementation guide
**Key Sections:**
- System Architecture (diagrams and data flow)
- Component Specifications (MCP server, Slack integration, Claude API)
- Data Models & Database Schema
- Security & Privacy Implementation
- Error Handling & Testing Strategy
- Performance Targets

**Read this if:** You're implementing features or reviewing technical decisions.

---

## 🚀 Current Status: Week 1 Development

### Completed
- ✅ SC-140: Anthropic API key obtained
- ✅ SC-141: Backend repository created

### In Progress
- 🔄 SC-142: Slack App Configuration
- 🔄 SC-146: Node.js/TypeScript Project Setup

### This Week's Goals
- Build MCP server foundation
- Implement 5 core Slack API wrappers
- Create Claude integration for insight extraction
- Test end-to-end with dklagroup.slack.com

---

## 📁 Repository Structure

```
pm-mvp/
├── README.md                      # This file
├── MVP-ARCHITECTURE.md            # 4-week plan
├── technical_specification.md     # Detailed technical docs
├── CLAUDE.md                      # Instructions for Claude Code
├── docs/                          # Strategic documentation
│   ├── product-concept.md
│   └── business-model-canvas.md
├── archive/                       # Old/deprecated files
│   ├── ai-dev-workflow/
│   └── old-docs/
└── scripts/                       # Helper utilities
    ├── create-linear-tasks.js     # Linear task automation
    ├── .env.linear                # Linear API credentials
    └── .env.linear.example
```

---

## 🛠️ Development Workflow

### For Backend Development
Work in the **[pm-mvp-server](https://github.com/codingchik/pm-mvp-server)** repository.

### For Documentation Updates
Work in this repository (`pm-mvp`).

### Creating Linear Tasks
```bash
cd scripts
node create-linear-tasks.js
```

---

## 🎯 Product Overview

### The Problem
Product managers at 50-500 person companies spend 80% of their time on administrative tasks (status collection, context switching, manual reporting) instead of strategic product decisions.

### The Solution
PM Buddy is an AI-powered intelligence layer that automatically extracts project insights from team communications (Slack), delivering:
- **Daily summaries** of blockers, progress, timeline changes, and help requests
- **Historical dashboard** for trend analysis and deep dives
- **Privacy-first** architecture (never stores raw messages)

### Key Innovation
Unlike traditional PM tools requiring manual input, PM Buddy learns from what teams already do naturally - having conversations in Slack.

---

## 📊 Key Metrics & Goals

### Phase 1 Goals (Month 1)
- 3 pilot PMs using daily for 2+ weeks
- 80%+ insight accuracy (user-validated)
- PMs save 5+ hours per week
- Zero privacy incidents
- <10 minute processing latency

### Business Targets
- **Year 1:** 50 customers, $180K ARR
- **Year 2:** 200 customers, $840K ARR
- **Year 3:** 500 customers, $2.4M ARR

---

## 🔗 External Links

- **Slack Workspace:** dklagroup.slack.com (development/testing)
- **Linear Project:** [PM-Buddy](https://linear.app/SC/project/f9c0ab4258f5)
- **Backend Repo:** [pm-mvp-server](https://github.com/codingchik/pm-mvp-server)
- **Anthropic Console:** [console.anthropic.com](https://console.anthropic.com)

---

## 📝 License

Private - All Rights Reserved

---

## 🤝 Team

- **Anabel** - Project Lead
- **Claude Code** - Development Assistant

---

**Next Milestone:** Complete Week 1 (MCP Foundation) by November 17, 2025
