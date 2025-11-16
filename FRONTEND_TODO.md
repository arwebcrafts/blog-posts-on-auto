# ContentFlow AI - Frontend Development TODO

**Status:** Backend 100% Complete ✅ | Frontend 30% Complete

This document details all remaining frontend pages that need to be built.

---

## ✅ What's Already Done (Frontend)

1. **Project Structure** - Next.js 14 with App Router
2. **Configuration** - TailwindCSS, PostCSS, TypeScript
3. **Utilities** - API client, utils functions, styling system
4. **Components** - Button component (more needed)
5. **Homepage** - Complete marketing homepage with all sections
6. **Layout** - Root layout with metadata

---

## 📝 Remaining Pages to Build (23 pages)

### **CATEGORY 1: Marketing Pages (7 pages)**

#### 1. Features Page (`/features`)
**File:** `frontend/src/app/features/page.tsx`

**Content:**
- Hero section
- Feature categories:
  - Business Intelligence (2 features)
  - Content Creation (7 features)
  - Automation & Publishing (3 features)
  - SEO & Analytics (3 features)
  - Collaboration & Enterprise (3 features)
- Each feature card with icon, title, description
- CTA: "Start Free Trial" + "See Pricing"

**Reference:** See `docs/PRODUCT_DOCUMENTATION.md` Section "Product Features Overview"

---

####2. Pricing Page (`/pricing`)
**File:** `frontend/src/app/pricing/page.tsx`

**Content:**
- 3-column pricing table (Starter, Professional, Agency)
- Feature comparison checkmarks
- FAQ section (6 questions)
- CTA buttons for each plan
- "Start 7-Day Free Trial" buttons

**Data:**
- Starter: $29/mo, 10 posts, 10 images, 1 website
- Professional: $49/mo, 40 posts, 40 images, 3 websites
- Agency: $99/mo, 150 posts, 150 images, unlimited websites

**Reference:** See PROJECT_STATUS.md "Pricing Plans & Feature Limits"

---

#### 3. Integrations Page (`/integrations`)
**File:** `frontend/src/app/integrations/page.tsx`

**Content:**
- Hero
- Integration cards for:
  - WordPress (plugin download, setup steps)
  - Shopify (API setup guide)
  - Wix (API connection)
  - Blogger (OAuth flow)
  - Custom Sites (SDK code examples)
  - Webhook (JSON payload example)
- Each with "How It Works" section
- CTAs: "Get Started", "View Documentation"

---

#### 4. About Page (`/about`)
**File:** `frontend/src/app/about/page.tsx`

**Content:**
- Company mission
- Why we built this
- Values (Authenticity, Automation, Affordability)
- Contact information

---

#### 5-7. Legal Pages
**Files:** `/privacy`, `/terms`, `/refunds`

**Content:**
- Standard privacy policy
- Terms & conditions
- Refund policy

**Note:** Use templates or AI-generate placeholder content

---

### **CATEGORY 2: Authentication Pages (3 pages)**

#### 8. Login Page (`/login`)
**File:** `frontend/src/app/login/page.tsx`

**Features:**
- Email + password form
- "Forgot password?" link
- "Sign up" link
- Google OAuth button (optional)
- Form validation with Zod
- Call `authAPI.login()` from API client
- Store JWT token in localStorage
- Redirect to `/dashboard` on success

**UI Components Needed:**
- Input, Label, Form (from shadcn/ui)

---

#### 9. Signup Page (`/signup`)
**File:** `frontend/src/app/signup/page.tsx`

**Features:**
- Name, email, password fields
- Password strength indicator
- "Already have account?" link
- Google OAuth button (optional)
- Call `authAPI.signup()`
- Redirect to `/onboarding` on success

---

#### 10. Onboarding Flow (`/onboarding`)
**File:** `frontend/src/app/onboarding/page.tsx`

**5-Step Wizard:**

**Step 1: Plan Selection**
- Show 3 pricing tiers
- "Start 7-Day Free Trial" buttons
- Note: "You won't be charged until trial ends"

**Step 2: Payment Setup**
- Stripe Elements for credit card
- Call `stripeAPI.createSubscription()`
- Show "Required for trial. Cancel anytime."

**Step 3: Website Connection**
- Input field: website URL
- Call `websiteAPI.create()` then `scan()`
- Show scanning progress bar

**Step 4: Business Intelligence Review**
- Show AI analysis results:
  - Business type
  - Industry
  - Target audience
  - Brand voice
- "Confirm or Edit" button

**Step 5: Integration Setup**
- Choose platform: WordPress, Shopify, Wix, Custom, Skip
- Quick integration wizard
- Or skip for later

**Final: Complete**
- "You're all set! Let's create your first post."
- CTA: "Go to Dashboard"

---

### **CATEGORY 3: Dashboard Layout & Core**

#### 11. Dashboard Layout (`/dashboard/layout.tsx`)
**File:** `frontend/src/app/dashboard/layout.tsx`

**Features:**
- Left sidebar navigation with menu items:
  - Dashboard
  - Create Post
  - Bulk Create
  - Content Library
  - Calendar
  - Keywords
  - Backlinks
  - AI Chat
  - Integrations
  - Knowledge Base
  - Settings
  - Help
- Top header with:
  - User avatar/name
  - Notifications icon
  - Account dropdown (Profile, Billing, Logout)
- Mobile responsive (hamburger menu)
- Active link highlighting

**UI Components Needed:**
- Sheet (mobile menu)
- DropdownMenu
- Avatar

---

#### 12. Dashboard Home (`/dashboard`)
**File:** `frontend/src/app/dashboard/page.tsx`

**Content:**
- **Top Stats Row** (4 cards):
  - Posts this month: X/40
  - Published posts: X
  - Scheduled posts: X
  - Keywords tracked: X/200

- **Quick Actions** (4 buttons):
  - Create New Post
  - Create Bulk Posts
  - Add Website
  - Chat with AI

- **Recent Activity Feed** (list):
  - "Post 'Title' published to WordPress" (2 hours ago)
  - "Post 'Title' scheduled for Nov 20" (yesterday)
  - Show last 10 activities

- **AI Suggestions Widget**:
  - "3 trending topics for your business:"
  - List 3 AI-generated title suggestions
  - "Generate Post" button for each

- **Upcoming Posts Mini Calendar**:
  - Next 7 days
  - Clickable posts
  - Link: "View Full Calendar →"

**API Calls:**
- `authAPI.getMe()` - Get user stats
- `postAPI.list({ status: 'scheduled' })` - Upcoming posts
- `postAPI.generateTitles()` - AI suggestions

---

### **CATEGORY 4: Content Management Pages**

#### 13. Knowledge Base (`/dashboard/knowledge-base`)
**File:** `frontend/src/app/dashboard/knowledge-base/page.tsx`

**Tabs:**

**Tab 1: Website Scan**
- List connected websites
- "Re-scan Website" button
- Last scanned date
- Scan status (Complete/In Progress)

**Tab 2: Documents**
- Upload PDFs/docs (drag & drop)
- List uploaded documents with:
  - Filename
  - Upload date
  - File size
  - Delete button
- File upload limit based on plan

**Tab 3: Business Information**
- Manual input form:
  - Business name
  - Industry/niche
  - Products/services
  - Target audience
  - Brand voice (dropdown)
  - Key messaging
- "Save" button

**Tab 4: Custom Training Data**
- Textarea for free-form text
- "Add FAQs, company history, USPs, etc."

**API Calls:**
- `knowledgeBaseAPI.list()`
- `knowledgeBaseAPI.upload(formData)`
- `websiteAPI.scan(id)`

---

#### 14. Create Post (`/dashboard/create-post`)
**File:** `frontend/src/app/dashboard/create-post/page.tsx`

**Step 1: Title Selection**
- "Generate Title Suggestions" button
- AI generates 4-6 titles
- Each shows:
  - Title text
  - Keyword difficulty
  - Search volume
  - "Use This Title" button
- Or: "Enter Custom Title"

**Step 2: Keyword Input**
- Primary keyword field
- AI keyword suggestions dropdown
- Shows volume & difficulty

**Step 3: Post Configuration**
- Word count slider: 600 / 1000 / 1500 / 2000
- Number of H2 headings: 3-8
- Tone: Professional / Casual / Technical / Friendly
- Include internal links: Toggle
- Guest post link (optional):
  - URL, Anchor text, Placements (1-3)
- Generate featured image: Toggle

**Step 4: Generate Post**
- "Generate Post" button
- Loading states:
  - "Analyzing SERP..."
  - "Creating outline..."
  - "Generating content..."
  - "Creating image..."
  - "Optimizing SEO..."

**Step 5: Post Editor**
- Rich text editor (React Quill or TipTap)
- Editable:
  - Title
  - Meta description (150-160 chars)
  - Content (HTML)
  - Featured image (preview + regenerate)

**Right Sidebar: SEO Score**
- Score: 87/100 (colored indicator)
- Checklist with checkmarks/crosses
- Recommendations list

**Bottom Actions:**
- Save as Draft
- Preview
- Schedule Post (opens date picker)
- Publish Now (select platform + publish)

**API Calls:**
- `postAPI.generateTitles()`
- `keywordAPI.research()`
- `postAPI.generate()`
- `postAPI.update()`
- `postAPI.schedule()` or `publish()`

---

#### 15. Bulk Post Creation (`/dashboard/bulk-create`)
**File:** `frontend/src/app/dashboard/bulk-create/page.tsx`

**Form:**

**1. Keyword Input**
- Textarea: "Add keywords (one per line)"
- Or: Upload CSV file

**2. Post Configuration**
- Number of posts: Input (max based on plan)
- Word count: 600 / 1000 / 1500 / 2000
- Tone: Dropdown
- Generate images: Toggle

**3. Publishing Schedule**
- Frequency: Daily / Every 2 days / Every 3 days / Weekly
- Start date: Date picker
- Platform: Dropdown (connected websites)
- Time of day: Time picker

**4. Generate Button**
- "Generate X Posts"
- Progress bar:
  - "Post 1/30: Generated 'Title' ✓"
  - "Post 2/30: Generating..."
- Estimated time remaining

**5. Results**
- "30 posts created and scheduled!"
- Calendar preview
- "View Calendar" or "Create More Posts"

**API Calls:**
- `postAPI.bulkCreate()`

---

#### 16. Calendar (`/dashboard/calendar`)
**File:** `frontend/src/app/dashboard/calendar/page.tsx`

**Features:**
- Month / Week / Day views
- Posts displayed on calendar days
- Post cards show:
  - Title (truncated)
  - Platform icon
  - Status badge (Draft/Scheduled/Published/Failed)
  - Time
- **Drag-and-drop to reschedule** (React Beautiful DnD)
- Click post to edit
- Filters:
  - By platform
  - By status
  - Search by title

**Bulk Actions:**
- Select multiple posts
- Bulk delete
- Bulk reschedule
- Bulk change platform

**UI Components Needed:**
- Calendar component (react-calendar or custom)
- Drag-and-drop (react-beautiful-dnd)

**API Calls:**
- `postAPI.list()`
- `postAPI.update()` (for rescheduling)
- `postAPI.delete()`

---

#### 17. Content Library (`/dashboard/content-library`)
**File:** `frontend/src/app/dashboard/content-library/page.tsx`

**Table View:**

| Title | Status | Platform | Publish Date | SEO Score | Actions |
|-------|--------|----------|--------------|-----------|---------|
| ... | ... | ... | ... | ... | View, Edit, Delete |

**Filters:**
- Status: All / Draft / Scheduled / Published / Failed
- Platform: All / WordPress / Shopify / Wix / Custom
- Date range: Last 7/30 days / All time / Custom
- Search bar

**Bulk Actions:**
- Select posts (checkboxes)
- Bulk delete
- Bulk publish
- Bulk reschedule
- Export as CSV

**Actions Per Post:**
- View (modal preview)
- Edit (go to editor)
- Republish (for published posts)
- Delete (confirmation dialog)

**UI Components Needed:**
- Table, Checkbox
- DateRangePicker
- Dialog (for preview/delete confirm)

**API Calls:**
- `postAPI.list()`
- `postAPI.get(id)`
- `postAPI.update()`
- `postAPI.delete()`

---

### **CATEGORY 5: SEO Tools Pages**

#### 18. Keywords Tracking (`/dashboard/keywords`)
**File:** `frontend/src/app/dashboard/keywords/page.tsx`

**Tabs:**

**Tab 1: Tracked Keywords**
- Table:
  | Keyword | Volume | Difficulty | Current Rank | Change | Actions |
  |---------|--------|------------|--------------|--------|---------|
  | ... | ... | ... | #12 | ↑ +3 | View SERP, Create Post, Remove |
- Sort by: Rank, Volume, Difficulty, Change
- Filter by ranking (Top 10, Top 50, Not ranking)
- "Add Keyword" input
- Shows remaining limit: "45/200 keywords"

**Tab 2: Keyword Research**
- Input: "Enter seed keyword"
- Queries remaining: "15/20"
- "Find Keywords" button
- Results table:
  | Keyword | Volume | Difficulty | Opportunity Score | Actions |
  | Track, Create Post |
- Opportunity Score: AI-calculated

**Tab 3: Competitor Analysis** (Agency only)
- Input: "Enter competitor URL"
- Shows competitor keywords
- Keyword gap analysis

**API Calls:**
- `keywordAPI.list()`
- `keywordAPI.add()`
- `keywordAPI.research()`
- `keywordAPI.delete()`

---

#### 19. Backlinks Analysis (`/dashboard/backlinks`)
**File:** `frontend/src/app/dashboard/backlinks/page.tsx`

**Tabs:**

**Tab 1: Your Backlinks**
- Stats:
  - Total backlinks: 142
  - Referring domains: 38
  - New this month: 12
- Table:
  | Source URL | Target URL | Anchor Text | DA | Status | Date Found |
  |------------|------------|-------------|----|----|------------|
  | ... | ... | ... | 45 | Live | Nov 10 |
- Export as CSV

**Tab 2: Competitor Backlinks** (Agency only)
- Input: "Enter competitor URL"
- Their backlink profile
- Link opportunities

**Tab 3: Opportunities**
- AI-suggested sites for outreach
- Based on niche/content/competitors

**API Calls:**
- `backlinkAPI.list()`
- `backlinkAPI.summary()`
- `backlinkAPI.check()`

---

### **CATEGORY 6: Utility Pages**

#### 20. AI Chat Agent (`/dashboard/ai-chat`)
**File:** `frontend/src/app/dashboard/ai-chat/page.tsx`

**Features:**
- Left sidebar: Chat history
- "New Chat" button
- Main chat area:
  - Chat bubbles (user + AI)
  - Input at bottom
- Sample interactions:
  - User: "What should I write about?"
  - AI: "5 trending topics: ..."
  - "Create post for topic 2" → AI creates post

**API Calls:**
- `chatAPI.getSessions()`
- `chatAPI.getMessages(sessionId)`
- `chatAPI.sendMessage(sessionId, message)`

---

#### 21. Integrations Management (`/dashboard/integrations`)
**File:** `frontend/src/app/dashboard/integrations/page.tsx`

**Connected Platforms Section:**
- WordPress Sites (list + "Add WordPress Site")
- Shopify Stores (list + "Add Shopify Store")
- Wix Sites (list + "Add Wix Site")
- Custom Sites (list + "Add Custom Site")
- Each shows:
  - Site URL
  - Status (Active/Inactive)
  - Last published date
  - Actions: Test Connection, Disconnect

**Add New Integration:**
- Buttons for each platform
- Opens setup modal with instructions
- WordPress: Download plugin, paste API key
- Shopify: Create app, paste token
- Wix: Connect API
- Custom: Show SDK code

**API Calls:**
- `integrationAPI.list()`
- `integrationAPI.connect()`
- `integrationAPI.test()`
- `integrationAPI.disconnect()`

---

#### 22. Settings (`/dashboard/settings`)
**File:** `frontend/src/app/dashboard/settings/page.tsx`

**Tabs:**

**Tab 1: Account**
- Email (verified ✓)
- Password: **** [Change Password]
- Two-Factor Auth: Toggle
- Delete account button

**Tab 2: Subscription**
- Current plan
- Billing cycle
- Payment method: Visa ****4242 [Update]
- [Upgrade] [Downgrade] [Cancel] buttons
- Billing history table

**Tab 3: Preferences**
- Default post word count
- Default tone
- Auto-generate images: Toggle
- Time zone
- Email notifications toggles

**Tab 4: Team** (Agency only)
- Team members list
- [Invite Team Member]
- Roles: Admin / Editor / Viewer

**Tab 5: White-Label** (Agency only)
- Upload custom logo
- Brand colors (color pickers)
- Custom domain setup
- Hide "Powered by" toggle

**Tab 6: API Access** (Agency only)
- API Key: `cfai_xxx` [Regenerate] [Copy]
- [View API Docs]
- Webhook URLs
- Usage stats

**API Calls:**
- `authAPI.updateProfile()`
- `authAPI.changePassword()`
- `stripeAPI.changePlan()`
- `stripeAPI.cancelSubscription()`
- `stripeAPI.getBillingPortal()`

---

#### 23. Help & Support (`/dashboard/help`)
**File:** `frontend/src/app/dashboard/help/page.tsx`

**Content:**
- Search bar
- Categories:
  - Getting Started
  - Creating Posts
  - Integrations
  - Billing
  - API Docs
  - Troubleshooting
- Popular articles (links)
- Contact support:
  - Email: support@contentflow.ai
  - Live chat widget
  - Response time based on plan

---

## 🎨 UI Components Still Needed

Create these in `frontend/src/components/ui/`:

1. **input.tsx** - Text input component
2. **label.tsx** - Form label
3. **form.tsx** - Form wrapper
4. **card.tsx** - Card component
5. **table.tsx** - Table component
6. **dialog.tsx** - Modal dialog
7. **dropdown-menu.tsx** - Dropdown menu
8. **avatar.tsx** - User avatar
9. **tabs.tsx** - Tabs component
10. **select.tsx** - Select dropdown
11. **textarea.tsx** - Textarea input
12. **checkbox.tsx** - Checkbox
13. **switch.tsx** - Toggle switch
14. **slider.tsx** - Slider input
15. **progress.tsx** - Progress bar
16. **toast.tsx** - Toast notifications
17. **calendar.tsx** - Calendar component
18. **sheet.tsx** - Mobile sidebar

**All components should follow shadcn/ui patterns.**

Reference: https://ui.shadcn.com/docs/components

---

## 🔧 Additional Code Needed

### Auth Context Provider
**File:** `frontend/src/lib/auth-context.tsx`

```typescript
// Create React Context for auth state
// Manage user session, token, logout
// Wrap app in provider
```

### Protected Route Wrapper
**File:** `frontend/src/components/protected-route.tsx`

```typescript
// Check if user is authenticated
// Redirect to /login if not
// Check subscription status
```

---

## 📊 Estimated Effort

| Category | Pages | Est. Hours (Mid-level) |
|----------|-------|----------------------|
| Marketing Pages | 7 | 8-10 hrs |
| Authentication | 3 | 6-8 hrs |
| Dashboard Layout | 1 | 4 hrs |
| Content Management | 5 | 12-16 hrs |
| SEO Tools | 2 | 6-8 hrs |
| Utility Pages | 3 | 8-10 hrs |
| UI Components | 18 | 10-12 hrs |
| Testing & Polish | - | 8-10 hrs |
| **TOTAL** | **23 pages** | **62-78 hours** |

**Timeline:**
- Solo developer: 8-10 days (full-time)
- Part-time (4 hrs/day): 16-20 days

---

## 🚀 Quick Start for Continuing

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Start building pages in order:
   - Finish marketing pages first (pricing, features, integrations)
   - Then auth flow (login, signup, onboarding)
   - Then dashboard layout
   - Then dashboard pages

4. Use existing backend API (`frontend/src/lib/api.ts`)

5. Follow TailwindCSS + shadcn/ui patterns

---

## 📚 Resources

- **shadcn/ui Components:** https://ui.shadcn.com
- **TailwindCSS Docs:** https://tailwindcss.com/docs
- **Next.js 14 Docs:** https://nextjs.org/docs
- **React Hook Form:** https://react-hook-form.com
- **Zod Validation:** https://zod.dev

---

**Good luck! The backend is rock-solid and ready. Just build the UI! 💪**
