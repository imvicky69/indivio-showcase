# Git Workflow & Team Development Guide

## 🔗 Understanding Git Commits & Branches

### Core Concepts

- **Commit** = A snapshot of your entire project at a specific time
- **Branch** = A movable pointer to a specific commit
- When you work on a branch, you're creating new commits that branch points to

```
main:     A---B---C (latest commit)
             \
feature:      D---E (your new commits)
```

### How It Works

- Each commit has a unique ID (hash)
- Branches are just labels pointing to commits
- When you switch branches, Git changes your working directory to match that commit
- Multiple people can work on different branches simultaneously

---

## 🚀 Recommended Branching Workflows

### 🥇 GitHub Flow (Recommended for SaaS)

**Best for**: Fast deployment, continuous delivery, small teams

```
main (production-ready)
├── feature/auth-system
├── feature/payment-integration
├── hotfix/security-patch
└── feature/dashboard-ui
```

**Process**:

1. Create branch from `main`
2. Make changes and commit
3. Open Pull Request
4. Review and merge
5. Deploy `main`

### ⚙️ Gitflow (Complex Projects)

**Best for**: Scheduled releases, larger teams, enterprise

```
main (production)
develop (integration)
├── feature/user-auth
├── feature/payments
├── release/v2.1
└── hotfix/critical-bug
```

**Process**:

1. Features branch from `develop`
2. Merge features to `develop`
3. Create release branch
4. Merge release to `main` and `develop`

### 🌳 Trunk-Based Development

**Best for**: Very experienced teams, high automation

```
main (always deployable)
├── feature/short-lived-1
├── feature/short-lived-2
└── feature/short-lived-3
```

---

## 👥 Team Ownership & Repository Structure

### 📁 Folder-Based Team Ownership

```
src/
├── components/     # Frontend Team
├── pages/         # Frontend Team
├── api/           # Backend Team
├── lib/           # Shared/Platform Team
└── types/         # Shared/Platform Team

docs/              # DevOps/Documentation Team
scripts/           # DevOps Team
config/            # DevOps Team
public/            # Frontend Team
```

### 🛡️ CODEOWNERS File

Create `.github/CODEOWNERS` for automatic review assignments:

```bash
# Frontend team owns UI components
/src/components/ @frontend-team
/src/pages/ @frontend-team

# Backend team owns API
/src/api/ @backend-team
/scripts/ @backend-team

# DevOps owns infrastructure
/config/ @devops-team
/.github/ @devops-team
/docs/ @devops-team

# Shared ownership for critical files
package.json @frontend-team @backend-team
README.md @all-teams
```

### 🏗️ Repository Strategies

#### Monorepo (Recommended for most SaaS)

- Single repository for entire application
- Shared tooling and dependencies
- Easier refactoring and code sharing
- Atomic commits across features

#### Multi-repo

- Separate repositories for different services
- Independent deployment cycles
- Clear service boundaries
- More complex dependency management

---

## 🔒 Best Practices & CI Integration

### 🛡️ Branch Protection Rules

Configure on GitHub for `main` and `develop`:

- ✅ **Require PR reviews** (2+ approvals)
- ✅ **Require status checks** (tests pass)
- ✅ **No direct pushes** to protected branches
- ✅ **Up-to-date branches** before merge
- ✅ **Dismiss stale reviews** when new commits pushed
- ✅ **Require linear history** (optional)

### 🔄 Merge Strategies

#### Squash Merge (Recommended)

```bash
# Multiple commits become one clean commit
feature: A---B---C---D
                     \
main:     X---Y---Z---M (squashed commit)
```

**Benefits**: Clean history, easy revert, clear feature boundaries

#### Merge Commit

```bash
# Preserves branch history
feature: A---B---C
               \   \
main:     X---Y---M---Z
```

**Benefits**: Full history preservation, clear branch context

#### Rebase (Advanced)

```bash
# Linear history
feature: A---B---C
main:     X---Y---Z---A'---B'---C'
```

**Benefits**: Linear history, no merge commits

### 🚨 CI/CD Pipeline Checks

- **Linting**: ESLint, Prettier
- **Type checking**: TypeScript compilation
- **Tests**: Unit, integration, e2e
- **Security**: Dependency vulnerability scans
- **Performance**: Bundle size checks
- **Deployment**: Automated staging deployments

---

## ⚡ Development Commands Cheat Sheet

### 🌟 Daily Workflow

```powershell
# Start new feature
git checkout main
git pull origin main
git checkout -b feature/user-auth

# Work and commit regularly
git add .
git commit -m "feat: add user authentication logic"
git add .
git commit -m "test: add auth tests"
git add .
git commit -m "docs: update auth documentation"

# Push to GitHub
git push -u origin feature/user-auth
# Create Pull Request on GitHub

# After approval, cleanup
git checkout main
git pull origin main
git branch -d feature/user-auth
```

### 🚨 Team Coordination

```powershell
# Update your branch with latest main
git checkout feature/your-branch
git rebase main  # Preferred: clean history
# OR
git merge main   # Alternative: preserves merge history

# Handle conflicts during rebase
git add .
git rebase --continue

# Force push after rebase (use with caution)
git push --force-with-lease origin feature/your-branch

# Safe force push (checks for new commits)
git push --force-with-lease origin feature/your-branch
```

### 🔄 Branch Management

```powershell
# List all branches
git branch -a               # Local and remote
git branch -r               # Remote only
git branch                  # Local only

# Switch branches
git checkout develop
git checkout feature/payments
git switch feature/new-ui   # Modern alternative

# Create and switch in one command
git checkout -b feature/new-feature
git switch -c feature/new-feature  # Modern alternative

# Delete branches
git branch -d feature/completed-feature          # Safe delete
git branch -D feature/force-delete              # Force delete
git push origin --delete feature/completed-feature  # Delete remote
```

### 🔍 Information & Debugging

```powershell
# Check current status
git status
git log --oneline -10       # Last 10 commits
git log --graph --oneline   # Visual branch history

# See what changed
git diff                    # Unstaged changes
git diff --staged          # Staged changes
git diff main..feature     # Compare branches

# Find specific changes
git log --grep="bug fix"    # Search commit messages
git log -p -- filename.js  # History of specific file
```

### 🆘 Emergency Commands

```powershell
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Undo specific file
git checkout HEAD -- filename.js

# Stash current work
git stash                   # Save current changes
git stash pop              # Restore stashed changes
git stash list             # See all stashes

# Cherry-pick specific commit
git cherry-pick <commit-hash>

# Interactive rebase (advanced)
git rebase -i HEAD~3       # Edit last 3 commits
```

---

## 🏆 Perfect SaaS Team Setup

### Repository Configuration

1. **Use GitHub Flow** for fast iterations
2. **Enable branch protection** on main/develop
3. **Set up CODEOWNERS** for automatic reviews
4. **Configure required status checks**

### Development Practices

1. **Small, focused PRs** (< 400 lines changed)
2. **Descriptive commit messages** using conventional commits
3. **Feature flags** for incomplete features
4. **Regular dependency updates**

### Team Workflow

1. **Daily standup** with branch updates
2. **Code review guidelines** and standards
3. **Merge schedule** (avoid Friday deployments)
4. **Hotfix process** for critical issues

### Automation

1. **Automated CI/CD** pipeline
2. **Dependency scanning** and updates
3. **Performance monitoring** on PRs
4. **Automatic deployment** to staging

---

## 📚 Additional Resources

### Commit Message Convention

```
type(scope): description

feat(auth): add OAuth integration
fix(api): resolve memory leak in user service
docs(readme): update installation instructions
test(components): add unit tests for Button
refactor(utils): simplify date formatting
```

### Common Branch Naming

```
feature/feature-name
bugfix/bug-description
hotfix/critical-issue
chore/maintenance-task
docs/documentation-update
```

### GitHub Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to docs
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `priority/high` - High priority issue
- `status/in-progress` - Work in progress

---

This workflow enables multiple developers to work simultaneously without conflicts, with clear ownership and merge capabilities anytime! 🚀
