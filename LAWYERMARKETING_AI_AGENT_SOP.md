# LawyerMarketing AI Agent SOP

## Objective

Design an AI-assisted lead handling system for `LawyerMarketing` that converts cold website inquiries into:

1. booked discovery calls
2. accepted free landing page offers
3. paid `RM299/year` hosting customers
4. upsell opportunities into broader legal marketing retainers

The standard is simple:

- no lead gets ignored
- no serious prospect waits too long
- no payment-ready prospect stays unchased
- no lead receives the wrong message for their stage

This system should behave like a disciplined customer service director with direct-response marketing instincts:

- respond fast
- diagnose intent early
- lower friction at each stage
- increase perceived certainty
- ask only for the next commitment
- keep every message matched to buyer awareness and urgency

## Core Offer Strategy

### Front-End Offer

`Free Landing Page Design`

The prospect pays only:

- `RM299/year hosting`

This is not just a freebie. It is a strategic entry offer.

Its function is to:

- remove initial risk
- create reciprocity
- prove speed and competence
- get the firm onto your infrastructure
- create an easy first payment
- open the door to SEO, ads, AI search optimization, intake systems, and retainers

### Positioning Principle

The message is not:

- "we build websites"

The message is:

- "we help law firms turn digital attention into retained matters"

The landing page is only the entry vehicle.

## Primary JTBD

### Economic JTBD

When a law firm partner visits the website, they are hiring LawyerMarketing to:

`help me acquire more qualified legal matters without wasting time on generic agencies, slow internal staff, or brand-heavy work that does not produce real client inquiries.`

### Functional JTBD

`give me a credible, fast, low-risk way to improve my firm's online intake performance and move from weak or nonexistent web presence to a working case-acquisition asset.`

### Emotional JTBD

`help me feel that my firm is no longer invisible, behind competitors, or exposed in a new era where legal marketing is now more open and more competitive.`

### Social JTBD

`help me look like the obvious, modern, trustworthy choice to clients and peers without appearing cheap, amateur, or unethical.`

### Immediate Conversion JTBD

For the website funnel specifically:

`help me decide quickly whether this free landing page offer is legitimate, relevant to my firm, easy to claim, and worth paying RM299/year to activate.`

## Strategic Constraints

The workflow must account for these realities:

1. Many leads are curious, not committed.
2. Some lawyers want prestige language, not hype.
3. Some firms do not have websites and need speed.
4. Some already have websites and need repositioning, not rebuilding.
5. Some prospects respond fast on WhatsApp but delay payment.
6. The front-end offer is low-friction, but fulfillment still consumes resources.
7. Therefore, qualification must happen early without creating too much friction.

## Funnel Philosophy

The system should move leads through five commitments:

1. `Response`
2. `Qualification`
3. `Acceptance`
4. `Payment`
5. `Activation`

The mistake most teams make is asking for too much too early.

This system should only ask for the next smallest meaningful step.

### Stage-by-Stage Commitment

1. Response:
   "Reply so we know you're real."

2. Qualification:
   "Confirm your firm profile and current website situation."

3. Acceptance:
   "Approve the direction and confirm you want us to prepare the page."

4. Payment:
   "Complete RM299 hosting to activate build/deployment."

5. Activation:
   "Send final assets and approve launch."

## CRM Pipeline Design

Use a CRM pipeline with these stages:

1. `New Lead`
2. `Contacted`
3. `Engaged`
4. `Qualified`
5. `Offer Explained`
6. `Waiting For Asset/Info`
7. `Payment Pending`
8. `Paid`
9. `Build In Progress`
10. `Awaiting Approval`
11. `Live`
12. `Upsell Opportunity`
13. `Cold / Unresponsive`
14. `Disqualified`

Every automation should move a lead forward, sideways, or out.
Nothing should sit in a stage without a next action.

## The AI Agent Stack

The safest and strongest setup is not one giant agent.
It is a small operating system of specialist workflows.

## Agent 1: Intake Concierge

### Role

Immediate response to new website leads.

### JTBD

`Turn a raw form submission into a live, responsive conversation before attention decays.`

### Trigger

- website form submitted

### Inputs

- full name
- firm name
- phone number
- email
- website URL if any
- selected offer type
- notes

### Outputs

- first WhatsApp message sent
- CRM contact created or updated
- lead assigned to pipeline stage `Contacted`
- lead score initialized

### Logic

1. Confirm lead capture in CRM.
2. Normalize phone and firm data.
3. Generate personalized first-touch message.
4. Send within minutes.
5. If no WhatsApp delivery, fall back to email.

### Message Objective

Not to sell everything.
Just to create contact and establish that the prospect will be personally guided.

### Example Outcome

"Hi Sarah, thanks for requesting the free landing page for Tan & Co. We’ve received your details. I’m reviewing your firm profile now and will message you shortly with the fastest next step."

## Agent 2: Qualification Strategist

### Role

Determine whether the lead is worth fulfillment now, later, or not at all.

### JTBD

`Separate serious, activation-ready law firms from browsers, while preserving goodwill and future conversion value.`

### Trigger

- lead replies
- lead clicks follow-up link
- internal stage moved to `Engaged`

### Qualification Dimensions

- does the firm currently have a website
- area of practice
- market ambition
- urgency
- authority level of the contact
- responsiveness
- readiness to pay RM299 hosting

### Qualification Labels

- `Hot`
- `Warm`
- `Nurture`
- `Low-fit`

### Qualification Questions

Keep them short and sequential:

1. "Do you already have a firm website, or are we building from zero?"
2. "Which practice areas matter most for lead generation right now?"
3. "If the page direction looks right, are you comfortable activating it with the RM299/year hosting plan?"

This sequence is deliberate:

- diagnose current state
- surface economic intent
- test buying resistance early

## Agent 3: Offer Framing Agent

### Role

Frame the free landing page offer so it feels valuable, credible, and easy to accept.

### JTBD

`Convert abstract interest into explicit acceptance by reducing doubt and clarifying the commercial logic of the offer.`

### Trigger

- lead marked `Qualified`

### Core Messaging Angles

1. `Risk Reversal`
   You are not paying a build fee.

2. `Speed`
   We can move faster than a traditional agency process.

3. `Specificity`
   This is designed for legal client acquisition, not generic web design.

4. `Low Entry Cost`
   Only RM299/year hosting to activate.

5. `Strategic Next Step`
   It is the foundation for broader growth assets later.

### Acceptance Goal

The lead explicitly says one of:

- "yes"
- "let's proceed"
- "send me the payment link"
- "what do you need from me to start"

## Agent 4: Payment Chase Agent

### Role

Compress the time between verbal interest and actual payment.

### JTBD

`Turn soft agreement into collected revenue before hesitation, distraction, or internal delays kill momentum.`

### Trigger

- lead agrees to proceed
- payment link sent
- invoice generated

### Principle

Once the lead says yes, the job changes.
The job is no longer persuasion.
The job is momentum protection.

### Payment Chase Sequence

#### Touch 1: Immediately After Acceptance

- send payment link
- restate exactly what payment activates
- mention turnaround / next milestone

#### Touch 2: 4 Hours Later

- short reminder
- focus on speed and queue position

#### Touch 3: Next Morning

- clarify that payment activates work
- remove uncertainty about what happens after payment

#### Touch 4: 48 Hours

- direct but polite
- ask whether timing is the issue, not whether they want it

#### Touch 5: 4-5 Days

- final strong follow-up
- present binary choice:
  - proceed now
  - pause for later

### Payment Messaging Principle

Never sound needy.
Sound operational.

Bad:

- "Just following up again..."

Better:

- "Once the RM299 hosting is settled, we can lock your page into production and move to asset collection immediately."

### Escalation Rule

If:

- lead is highly engaged
- asks multiple questions
- delays payment repeatedly

Then escalate to a human message or voice note.

This is not an automation failure.
This is a buying-friction signal.

## Agent 5: Fulfillment Activation Agent

### Role

Collect what is needed to launch without dragging the client into a confusing process.

### JTBD

`Move a paid client from decision to implementation with minimal delay and minimal client effort.`

### Trigger

- payment confirmed

### Inputs to Collect

- logo
- firm name styling
- lawyer profile or short bio
- main practice areas
- phone / WhatsApp
- office address
- testimonials if any
- existing site or examples if any

### Principle

The client should never wonder:

- what do I send
- in what format
- in what order
- what happens next

### Activation Message

One message, one checklist, one deadline.

## Agent 6: Approval & Launch Agent

### Role

Prevent completed work from stalling before go-live.

### JTBD

`Get the page approved and launched quickly so value is realized while client enthusiasm is still high.`

### Trigger

- draft complete

### Sequence

1. Send preview link
2. Explain exactly what to review
3. Ask for:
   - approve as is
   - minor edits
   - specific changes
4. If no response:
   - follow up at 24 hours
   - follow up at 72 hours
   - final approval chase at 5 business days

### Rule

Do not ask:

- "What do you think?"

Ask:

- "Would you like us to launch this as-is, or would you like specific revisions before launch?"

That phrasing forces forward motion.

## Agent 7: Upsell Expansion Agent

### Role

Convert fulfilled front-end clients into higher-value recurring clients.

### JTBD

`Use the trust created by the low-friction entry offer to open a higher-value growth conversation.`

### Trigger

- page launched
- initial engagement data available
- client expresses growth interest

### Upsell Paths

1. SEO for practice area pages
2. Google Ads / LSA support
3. AI search visibility / answer engine optimization
4. intake funnel optimization
5. WhatsApp lead handling automation
6. CRM / reporting stack

### Timing

Do not upsell too early.

Best windows:

- after launch
- after first leads
- after early wins
- after the client asks "what next?"

## Lead Recovery Workflow

Not every lead converts now.
That does not make them worthless.

Create a recovery workflow for:

- no reply after first contact
- replied then disappeared
- accepted but did not pay
- paid then delayed assets

### Recovery Buckets

1. `Attention Recovery`
   For leads who never replied

2. `Decision Recovery`
   For leads who engaged but stalled

3. `Payment Recovery`
   For leads who said yes but did not pay

4. `Activation Recovery`
   For clients who paid but failed to send materials

### Cadence

- same day
- next day
- 3 days
- 7 days
- 14 days
- monthly nurture if still relevant

## Messaging Doctrine By Stage

### Stage: New Lead

Tone:

- reassuring
- responsive
- competent

Goal:

- start conversation

### Stage: Engaged

Tone:

- curious
- diagnostic
- professional

Goal:

- qualify fit and urgency

### Stage: Qualified

Tone:

- certain
- low-friction
- commercially clear

Goal:

- secure acceptance

### Stage: Payment Pending

Tone:

- direct
- calm
- momentum-driven

Goal:

- get payment now

### Stage: Paid

Tone:

- organized
- fast
- implementation-focused

Goal:

- move to activation and launch

### Stage: Post-Launch

Tone:

- strategic
- value-building
- forward-looking

Goal:

- upsell and expansion

## Lead Scoring Rules

Assign points to prevent waste.

### Positive Signals

- replied within 30 minutes
- has clear business urgency
- already spends on growth
- decision-maker contact
- willing to pay RM299 immediately
- wants speed

### Negative Signals

- vague identity
- no clear practice focus
- repeatedly avoids direct questions
- wants endless custom work before paying
- price-sensitive on RM299/year
- very slow response without reason

### Rule

High-score leads get:

- faster follow-up
- more personalized messaging
- human escalation sooner

Low-score leads get:

- lighter automation
- nurture instead of intensive chasing

## SOP For "No Lead Left Behind"

Every lead must have one of these statuses at all times:

1. `Next action scheduled`
2. `Waiting on customer`
3. `Waiting on internal`
4. `Closed won`
5. `Closed lost`
6. `Nurture`

If a lead has no next action, the system is broken.

## SOP For "Chase Payment Fast"

### Payment Rule Set

1. Send payment link immediately after verbal acceptance.
2. Always explain what payment unlocks.
3. Always give a next milestone after payment.
4. Do not let more than 24 hours pass without a follow-up on a warm unpaid lead.
5. Escalate warm unpaid leads to human review after repeated engagement without payment.
6. Distinguish:
   - `not interested`
   - `interested but busy`
   - `interested but uncertain`
   - `interested but blocked internally`

Each requires different messaging.

## Suggested End-to-End Workflow Architecture

### Workflow A: New Lead Intake

Steps:

1. receive website lead
2. normalize contact info
3. create/update CRM record
4. assign score
5. send first WhatsApp
6. set follow-up timer

### Workflow B: Qualification Flow

Steps:

1. detect reply
2. classify intent
3. ask next qualification question
4. update CRM stage
5. move to qualified or nurture

### Workflow C: Offer Acceptance Flow

Steps:

1. present free landing page offer clearly
2. address likely objections
3. ask for proceed/not proceed
4. if yes, move to payment

### Workflow D: Payment Recovery Flow

Steps:

1. send payment link
2. monitor paid/unpaid status
3. send staged reminders
4. escalate if engagement is high but payment absent
5. mark cold or nurture if needed

### Workflow E: Onboarding Activation

Steps:

1. confirm payment
2. send asset checklist
3. collect materials
4. trigger production queue

### Workflow F: Approval and Launch

Steps:

1. send preview
2. request approval or revisions
3. chase response if stalled
4. launch
5. update CRM

### Workflow G: Upsell Engine

Steps:

1. wait for launch or early traction
2. assess fit for next offer
3. send strategic recommendation
4. invite next conversation

## Recommended Tech Mapping

### Dify

Use for:

- message generation
- response classification
- stage-based branching
- workflow orchestration
- internal qualification logic

### Evolution API

Use for:

- WhatsApp outbound
- delivery execution
- reply transport

### CRM

Prefer `TwentyCRM` as the main record system.

Use `Sheets` only if:

- you want backup logging
- you need simple reporting visibility
- you are not yet ready to commit all process logic to CRM

### Backend Layer

Use a small backend service for:

- website submissions
- webhook handling
- CRM writes
- payment state updates
- Dify workflow triggers

## Operating Principles For Copy

Every sentence should do one of five jobs:

1. reduce doubt
2. increase perceived relevance
3. increase perceived speed
4. increase perceived certainty
5. move to the next commitment

This means messages should avoid:

- vague friendliness
- generic "just checking in"
- overexplaining
- broad feature dumping
- weak calls to action

## Example High-Performance Sequence

### Message 1

"Hi Ahmad, thanks for requesting the free landing page for your firm. I've received your details and I'm reviewing the fastest direction for you now. Do you already have a website, or are we starting from zero?"

Job:

- confirms response
- begins qualification

### Message 2

"Understood. Based on that, the next step is straightforward: we prepare the page direction for your firm, and once you're happy to proceed, we activate it on the RM299/year hosting plan. Which practice areas matter most for the page?"

Job:

- frames offer
- anchors price without pressure

### Message 3

"Perfect. This is a strong fit for the free landing page offer. If you want us to move forward, I can send the activation link now so we can lock your page into production."

Job:

- asks for commitment

### Message 4

"Here's the activation link. Once the RM299 hosting is settled, we can move immediately to asset collection and build."

Job:

- compresses time to payment

## Failure Modes To Prevent

1. Lead captured but never contacted
2. Lead contacted but no qualification path
3. Qualified lead receives weak or slow payment follow-up
4. Paid client stuck waiting because asset collection is unclear
5. Finished page stalls because approval request is vague
6. Happy client never receives next-offer conversation

## Final Recommendation

If I were designing this as the acting customer service and revenue director for LawyerMarketing, I would build the system around this thesis:

`The purpose of the AI workflow is not to "chat." It is to move a law firm from inquiry to activation with the least friction and the highest certainty, while preserving future monetization at every stage.`

So the system should optimize for:

- response speed
- stage accuracy
- payment velocity
- operational clarity
- follow-up persistence
- conversion of front-end buyers into long-term clients

That is how no lead is wasted.
That is how small-ticket entry offers become serious client acquisition assets.
