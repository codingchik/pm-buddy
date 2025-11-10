#!/usr/bin/env node

/**
 * Script to create Week 1 tasks in Linear
 * Usage: node create-linear-tasks.js
 */

const { LinearClient } = require('@linear/sdk');
require('dotenv').config();

// Task definitions with parent-child hierarchy
const tasks = [
  {
    title: '0.0 Pre-Development Setup',
    description: 'Prerequisites before coding begins',
    priority: 1, // High
    estimate: 2,
    children: [
      {
        title: '0.1 Get Anthropic API key',
        description: '- Sign in to console.anthropic.com\n- Create new API key with appropriate name\n- Document key in password manager',
        priority: 1,
        estimate: 1,
      },
      {
        title: '0.2 Create new GitHub repository',
        description: '- Repository name: `pm-mvp-server`\n- Initialize with Node.js .gitignore\n- Add README with project overview\n- Clone locally',
        priority: 1,
        estimate: 1,
      },
    ],
  },
  {
    title: '1.0 Slack App Configuration',
    description: 'Set up Slack app in dklagroup workspace with necessary permissions',
    priority: 1,
    estimate: 3,
    children: [
      {
        title: '1.1 Create Slack App',
        description: '- Go to api.slack.com/apps\n- Create new app "PM Buddy Dev"\n- Select dklagroup workspace',
        priority: 1,
        estimate: 1,
      },
      {
        title: '1.2 Configure Bot Token Scopes',
        description: '- Add scopes: `channels:history`, `channels:read`, `users:read`, `chat:write`, `channels:join`\n- Install app to workspace\n- Copy Bot User OAuth Token to secure location',
        priority: 1,
        estimate: 1,
      },
      {
        title: '1.3 Create test channels in Slack',
        description: '- Create `#pm-buddy-test-1` with sample blocker conversations\n- Create `#pm-buddy-test-2` with sample progress updates\n- Add realistic PM-related messages (10-20 per channel)\n- Invite PM Buddy Dev bot to both channels',
        priority: 2,
        estimate: 1,
      },
    ],
  },
  {
    title: '2.0 Node.js/TypeScript Project Setup',
    description: 'Initialize the server project with proper tooling and structure',
    priority: 1,
    estimate: 5,
    children: [
      {
        title: '2.1 Initialize Node.js project',
        description: '- Run `npm init` with TypeScript\n- Install core dependencies: `typescript`, `@types/node`, `tsx`, `eslint`, `prettier`\n- Configure `tsconfig.json` with strict mode',
        priority: 1,
        estimate: 2,
      },
      {
        title: '2.2 Set up development environment',
        description: '- Create `.env.example` with required variables\n- Create `.env` with actual tokens (gitignored)\n- Add `nodemon` for hot reload\n- Configure build and dev scripts in `package.json`',
        priority: 1,
        estimate: 1,
      },
      {
        title: '2.3 Create project structure',
        description: '- Create directories: `/src/tools`, `/src/clients`, `/src/types`, `/src/utils`\n- Create `src/index.ts` as entry point\n- Set up logging utility (winston or pino)\n- Add error handling patterns',
        priority: 1,
        estimate: 2,
      },
    ],
  },
  {
    title: '3.0 Slack API Client Implementation',
    description: 'Build wrapper functions for the 5 core Slack API operations',
    priority: 1,
    estimate: 8,
    children: [
      {
        title: '3.1 Install and configure Slack SDK',
        description: '- Install `@slack/web-api`\n- Create `src/clients/slack.ts` with initialized WebClient\n- Add configuration loader from environment variables',
        priority: 1,
        estimate: 1,
      },
      {
        title: '3.2 Implement message retrieval tool',
        description: '- Create `src/tools/get_channel_messages.ts`\n- Wrapper for `conversations.history`\n- Parameters: `channel_id`, `oldest`, `latest` timestamps\n- Handle pagination for large message volumes\n- Return typed message array',
        priority: 1,
        estimate: 2,
      },
      {
        title: '3.3 Implement user info tool',
        description: '- Create `src/tools/get_user_info.ts`\n- Wrapper for `users.info`\n- Add in-memory caching to reduce API calls\n- Return user name, real_name, email',
        priority: 2,
        estimate: 1,
      },
      {
        title: '3.4 Implement channel list tool',
        description: '- Create `src/tools/get_channel_list.ts`\n- Wrapper for `conversations.list`\n- Filter to bot-joined channels only\n- Return channel ID, name, purpose',
        priority: 2,
        estimate: 1,
      },
      {
        title: '3.5 Implement channel join tool',
        description: '- Create `src/tools/join_channel.ts`\n- Wrapper for `conversations.join`\n- Handle already-in-channel errors gracefully',
        priority: 3,
        estimate: 1,
      },
      {
        title: '3.6 Implement message posting tool',
        description: '- Create `src/tools/send_message.ts`\n- Wrapper for `chat.postMessage`\n- Support Slack markdown formatting\n- Return message timestamp and permalink',
        priority: 1,
        estimate: 1,
      },
      {
        title: '3.7 Add Slack error handling',
        description: '- Create `src/utils/slack-errors.ts`\n- Handle rate limits with exponential backoff\n- Handle common errors (channel_not_found, not_in_channel)\n- Create typed error response objects',
        priority: 1,
        estimate: 1,
      },
    ],
  },
  {
    title: '4.0 Claude Integration & Insight Extraction',
    description: 'Build LLM client and implement PM-specific insight extraction',
    priority: 1,
    estimate: 8,
    children: [
      {
        title: '4.1 Set up Anthropic SDK',
        description: '- Install `@anthropic-ai/sdk`\n- Create `src/clients/claude.ts` with initialized client\n- Add configuration for model selection (claude-3-5-sonnet)',
        priority: 1,
        estimate: 1,
      },
      {
        title: '4.2 Design insight extraction prompt',
        description: '- Create `src/prompts/extract-insights.ts`\n- Write system prompt for PM analysis (blockers, progress, timeline changes, help requests)\n- Define JSON schema for structured output\n- Test prompt manually in console.anthropic.com with sample messages',
        priority: 1,
        estimate: 3,
      },
      {
        title: '4.3 Build message preprocessing',
        description: '- Create `src/utils/message-processor.ts`\n- Filter out bot messages\n- Resolve user IDs to names using get_user_info\n- Format messages for LLM: timestamp, user, channel, text\n- Handle message threads and replies',
        priority: 1,
        estimate: 2,
      },
      {
        title: '4.4 Implement insight extraction function',
        description: '- Create `src/tools/extract_insights.ts`\n- Accept array of preprocessed messages\n- Call Claude with structured output request\n- Parse JSON response into TypeScript types\n- Handle malformed responses with fallbacks',
        priority: 1,
        estimate: 2,
      },
      {
        title: '4.5 Create insight formatter',
        description: '- Create `src/utils/format-summary.ts`\n- Transform JSON insights to readable Slack message\n- Use emojis and formatting from architecture doc example\n- Include user and channel attribution\n- Keep raw JSON available for debugging',
        priority: 2,
        estimate: 1,
      },
    ],
  },
  {
    title: '5.0 End-to-End Pipeline & Testing',
    description: 'Build main execution flow and validate with real data',
    priority: 1,
    estimate: 5,
    children: [
      {
        title: '5.1 Create main execution script',
        description: '- Create `src/index.ts` CLI script\n- Accept parameters: channel IDs, time range (default 24h)\n- Orchestrate: fetch messages → preprocess → extract → format → post\n- Add verbose logging for debugging',
        priority: 1,
        estimate: 2,
      },
      {
        title: '5.2 Test with dklagroup test channels',
        description: '- Run script against `#pm-buddy-test-1` and `#pm-buddy-test-2`\n- Manually validate insight accuracy (spot check 10+ messages)\n- Check for false positives (non-blockers marked as blockers)\n- Check for false negatives (missed actual blockers)',
        priority: 1,
        estimate: 2,
      },
      {
        title: '5.3 Performance testing',
        description: '- Measure API latency for each step\n- Test with 50, 100, 200 messages\n- Document processing time and identify bottlenecks\n- Check Claude API costs per analysis',
        priority: 2,
        estimate: 1,
      },
      {
        title: '5.4 Document Week 1 results',
        description: '- Create `WEEK1_RESULTS.md` in repo\n- Document insight accuracy metrics\n- List API issues or limitations discovered\n- Identify improvements needed for Week 2\n- Include sample output screenshots',
        priority: 2,
        estimate: 1,
      },
    ],
  },
];

async function main() {
  const apiKey = process.env.LINEAR_API_KEY;
  const teamName = process.env.LINEAR_TEAM_NAME;
  const projectName = process.env.LINEAR_PROJECT_NAME;

  if (!apiKey || !teamName || !projectName) {
    console.error('❌ Missing required environment variables!');
    console.error('Please set LINEAR_API_KEY, LINEAR_TEAM_NAME, and LINEAR_PROJECT_NAME in .env');
    process.exit(1);
  }

  console.log('🚀 Connecting to Linear API...\n');
  const client = new LinearClient({ apiKey });

  try {
    // Get the team
    const teams = await client.teams();
    const team = teams.nodes.find(t => t.name === teamName);

    if (!team) {
      console.error(`❌ Team "${teamName}" not found!`);
      console.log('Available teams:', teams.nodes.map(t => t.name).join(', '));
      process.exit(1);
    }

    console.log(`✅ Found team: ${team.name}`);

    // Get the project
    const projects = await client.projects();
    const project = projects.nodes.find(p => p.name === projectName);

    if (!project) {
      console.error(`❌ Project "${projectName}" not found!`);
      console.log('Available projects:', projects.nodes.map(p => p.name).join(', '));
      process.exit(1);
    }

    console.log(`✅ Found project: ${project.name}\n`);

    // Create tasks
    console.log('📝 Creating tasks...\n');
    let totalCreated = 0;

    for (const parentTask of tasks) {
      // Create parent issue
      const parentIssue = await client.createIssue({
        teamId: team.id,
        projectId: project.id,
        title: parentTask.title,
        description: parentTask.description,
        priority: parentTask.priority,
        estimate: parentTask.estimate,
      });

      const parent = await parentIssue.issue;
      if (!parent) {
        console.error(`❌ Failed to create parent task: ${parentTask.title}`);
        continue;
      }

      console.log(`✅ Created: ${parentTask.title} (${parent.identifier})`);
      totalCreated++;

      // Create child issues
      if (parentTask.children && parentTask.children.length > 0) {
        for (const childTask of parentTask.children) {
          const childIssue = await client.createIssue({
            teamId: team.id,
            projectId: project.id,
            parentId: parent.id,
            title: childTask.title,
            description: childTask.description,
            priority: childTask.priority,
            estimate: childTask.estimate,
          });

          const child = await childIssue.issue;
          if (child) {
            console.log(`   ↳ ${childTask.title} (${child.identifier})`);
            totalCreated++;
          }
        }
      }

      console.log('');
    }

    console.log(`\n🎉 Successfully created ${totalCreated} tasks in Linear!`);
    console.log(`\n🔗 View your project: https://linear.app/${team.key}/project/${project.slugId}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.errors) {
      console.error('Details:', error.errors);
    }
    process.exit(1);
  }
}

main();
