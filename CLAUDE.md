# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

**AI Dev Tasks** (formerly pm-buddy) is a structured workflow system for AI-assisted feature development. It provides markdown-based prompts that guide AI coding assistants through a systematic process: from Product Requirements Document (PRD) creation, to task generation, to iterative implementation with built-in verification checkpoints.

This is NOT a traditional code repository with build commands or tests. It's a collection of prompt templates designed to be used with AI coding assistants like Claude Code, Cursor, and Windsurf.

## Core Workflow Files

The repository contains three main workflow files that work together:

1. **`create-prd.md`** - Guides PRD creation with clarifying questions
2. **`generate-tasks.md`** - Breaks down PRDs into actionable task lists
3. **`process-task-list.md`** - Manages iterative task implementation with user approval checkpoints

## Workflow Architecture

### Phase 1: PRD Creation (`create-prd.md`)
- AI asks clarifying questions before writing the PRD
- Target audience: junior developers
- Outputs: `/tasks/[n]-prd-[feature-name].md` (e.g., `0001-prd-user-authentication.md`)
- PRD sections: Introduction, Goals, User Stories, Functional Requirements, Non-Goals, Design Considerations, Technical Considerations, Success Metrics, Open Questions

### Phase 2: Task Generation (`generate-tasks.md`)
- Two-phase approach:
  1. Generate high-level parent tasks (~5 tasks typical)
  2. Wait for user "Go" confirmation
  3. Generate detailed sub-tasks for each parent
- Assesses current codebase state before generating tasks
- Identifies relevant files that need creation/modification
- Outputs: `/tasks/tasks-[prd-file-name].md`
- Format: Hierarchical task list with `- [ ]` checkboxes (e.g., `1.0`, `1.1`, `1.2`)

### Phase 3: Task Implementation (`process-task-list.md`)
- One sub-task at a time approach
- After each sub-task: mark `[x]` and wait for user approval
- When all sub-tasks under a parent are complete:
  1. Run full test suite
  2. Stage changes (`git add .`)
  3. Clean up temporary files/code
  4. Commit with conventional commit format (`feat:`, `fix:`, `refactor:`)
  5. Mark parent task `[x]`
- Commit message format: Use `-m` flags for multi-line messages
  ```bash
  git commit -m "feat: add feature" -m "- Detail 1" -m "- Detail 2" -m "Task reference"
  ```

## Important Patterns

### Task List Format
```markdown
## Relevant Files
- `path/to/file.ts` - Description
- `path/to/file.test.ts` - Unit tests

### Notes
- Testing instructions
- Context-specific guidelines

## Tasks
- [ ] 1.0 Parent Task
  - [ ] 1.1 Sub-task 1
  - [ ] 1.2 Sub-task 2
- [ ] 2.0 Parent Task
  - [ ] 2.1 Sub-task 1
```

### File Naming Conventions
- PRDs: `[n]-prd-[feature-name].md` (n = zero-padded 4-digit sequence)
- Task lists: `tasks-[prd-file-name].md`
- All stored in `/tasks/` directory

### User Interaction Model
- Provide options in numbered/lettered lists for easy selection
- Use checkpoints for user approval before proceeding
- Break complex processes into reviewable steps

## When Working with This Repository

### If User Wants to Create PRD Workflow Files
Reference `create-prd.md`, `generate-tasks.md`, and `process-task-list.md` as templates.

### If User Wants to Modify the Workflow
- Understand the three-phase architecture
- Maintain the checkpoint-based approval model
- Keep task list format consistent for AI parsing
- Preserve the junior developer audience focus

### If User Wants Documentation
Read the comprehensive README.md which includes:
- Full workflow explanation with examples
- Tool-specific instructions (Cursor, Claude Code, others)
- Video demonstration reference
- Best practices and tips

## Key Design Principles

1. **Structured over monolithic**: Break large AI requests into systematic steps
2. **Verification checkpoints**: Enable review and approval at each step
3. **Junior developer audience**: Write clear, explicit, unambiguous requirements
4. **Two-phase task generation**: High-level plan first, then detailed sub-tasks
5. **One task at a time**: Prevents AI from getting overwhelmed or off-track
6. **Conventional commits**: Use standard commit message format with context
