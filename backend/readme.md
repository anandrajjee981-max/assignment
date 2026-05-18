# Full Roadmap — Assignment Complete Karne Ka Exact Order

Is order ko follow karo. Random kaam mat karna.

---

# Phase 1 — Setup (1–2 hrs)

## Goal

Project run ho jaaye + DB connect ho jaaye.

---

## Step 1 — Create Project

```bash id="5js7a7"
npx create-next-app@latest prowider-mini
```

Choose:

* JavaScript
* App Router
* Tailwind YES

---

## Step 2 — Install Packages

```bash id="shszkn"
npm i mongoose
```

Optional later:

```bash id="7y1rvd"
npm i axios
```

---

## Step 3 — MongoDB Atlas

Use:
[MongoDB Atlas](https://www.mongodb.com/atlas/database?utm_source=chatgpt.com)

Create:

```txt id="tw7z5l"
.env.local
```

```env id="y9g7sx"
MONGODB_URI=your_url
```

---

## Step 4 — DB Connection

Create:

```txt id="61jqih"
lib/db.js
```

Connection function.

---

# Phase 2 — Database Design (IMPORTANT)

## Goal

Strong schemas.

---

## Step 5 — Create Models Folder

```txt id="tr50lp"
models/
```

Files:

```txt id="r8jlwm"
Lead.js
Provider.js
Assignment.js
AllocationState.js
WebhookEvent.js
```

---

# Step 6 — Lead Schema

Fields:

* name
* phone
* city
* service
* description

IMPORTANT:

```js id="b5fx8v"
leadSchema.index(
 { phone:1, service:1 },
 { unique:true }
)
```

Duplicate prevention.

---

# Step 7 — Provider Schema

Fields:

```js id="2s38h2"
{
 name,
 monthlyQuota:10,
 leadsAssignedCount:0
}
```

---

# Step 8 — Assignment Schema

```js id="0f2j54"
{
 leadId,
 providerId
}
```

IMPORTANT:

```js id="mjlwmv"
assignmentSchema.index(
 { leadId:1, providerId:1 },
 { unique:true }
)
```

---

# Step 9 — AllocationState Schema

MOST IMPORTANT.

```js id="5w5k6p"
{
 service,
 currentIndex
}
```

Purpose:
Round-robin persistence.

---

# Step 10 — WebhookEvent Schema

```js id="iqrqmh"
{
 eventId,
 processed:true
}
```

Purpose:
idempotency.

---

# Phase 3 — Seed Data

## Goal

Pre-insert providers.

---

## Step 11 — Create Seed Script

Insert:

* Service1
* Service2
* Service3

And:

* Provider1 → Provider8

Quota:

```js id="g5x4h3"
monthlyQuota:10
```

Run once.

---

# Phase 4 — Customer Form

## Goal

Lead create ho.

---

## Step 12 — Create Route

```txt id="t3sx08"
app/request-service/page.js
```

Simple form.

---

## Step 13 — Create API

```txt id="rjlwmc"
app/api/leads/route.js
```

Flow:

* validate
* save lead
* trigger distribution

---

# Phase 5 — CORE LOGIC (Most Important)

## Goal

Correct provider allocation.

---

# Step 14 — Create Distribution Function

```txt id="x8d1dn"
lib/distributeLead.js
```

---

# Step 15 — Mandatory Providers

Rules:

Service1:

* Provider1 mandatory

Service2:

* Provider5 mandatory

Service3:

* Provider1 + Provider4 mandatory

---

# Step 16 — Fair Rotation Logic

Pools:

Service1:

```js id="9v5d9p"
[2,3,4]
```

Service2:

```js id="15kq0r"
[6,7,8]
```

Service3:

```js id="8xgc2u"
[2,3,5,6,7,8]
```

Use:

```js id="a2g0wn"
currentIndex
```

Rotate sequentially.

NO RANDOM.

---

# Step 17 — Quota Check

Provider receive only if:

```js id="k2x7pj"
leadsAssignedCount < 10
```

---

# Step 18 — EXACTLY 3 Providers

IMPORTANT.

Every lead:

```txt id="y0t1j8"
exactly 3 providers
```

---

# Phase 6 — Transactions (VERY IMPORTANT)

## Goal

Concurrency safe system.

---

# Step 19 — Use Mongo Transaction

Inside distribution:

```js id="3du6ys"
mongoose.startSession()
```

Then:

```js id="0u8n3z"
session.startTransaction()
```

---

# Step 20 — Atomic Updates

Inside transaction:

* save assignment
* increment provider count
* update allocation state

Then commit.

---

# Phase 7 — Dashboard

## Goal

Providers see leads.

---

# Step 21 — Dashboard Route

```txt id="w5v89z"
app/dashboard/page.js
```

Show:

* remaining quota
* assigned leads
* count

---

# Phase 8 — Realtime

## Goal

Auto update.

---

# Step 22 — Use Polling

Easiest.

```js id="wkk7od"
setInterval(fetchData,3000)
```

No need socket.io.

---

# Phase 9 — Webhook

## Goal

Reset quota safely.

---

# Step 23 — Create Webhook API

```txt id="s2nmcd"
app/api/webhook/route.js
```

---

# Step 24 — Idempotency

Check:

```js id="gl9bbm"
eventId
```

Already processed?
→ ignore.

Else:
→ reset quota.

---

# Phase 10 — Testing Tools

## Goal

Assignment testing panel.

---

# Step 25 — Create Page

```txt id="wjlwm0"
app/test-tools/page.js
```

Buttons:

* reset quota
* multiple webhook calls
* generate 10 leads

---

# Step 26 — Concurrency Test

Use:

```js id="jlwmqg"
Promise.all()
```

---

# Phase 11 — Deployment

## Goal

Live URL.

---

# Step 27 — Push GitHub

Use:
[GitHub](https://github.com?utm_source=chatgpt.com)

---

# Step 28 — Deploy

Use:
[Vercel](https://vercel.com?utm_source=chatgpt.com)

---

# FINAL IMPORTANT ADVICE

Priority:

1. DB correctness
2. Allocation logic
3. Transactions
4. Idempotency
5. Realtime
6. UI

Isi order mein kaam karna.
