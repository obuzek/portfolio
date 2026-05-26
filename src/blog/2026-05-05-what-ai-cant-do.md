---
title: what ai can't do
date: 2026-05-05
excerpt: "This keeps us from seeing AI as simply a tool. We use tools to extend our own capacity, and to accomplish goals more effectively or more efficiently. We also recognize that they have limitations: a hammer makes a poor screwdriver makes a poor drill."
author: Olivia Buzek
authorUrl: https://decoding.ink
draft: false
---
(also published on [LinkedIn](https://www.linkedin.com/posts/olivia-buzek_ive-been-seeing-posts-from-people-in-roles-activity-7457428934390067201-2o6M/))

I've been seeing posts from people in roles of high technical and executive responsibility - CTOs, CEOs, directors of engineering - who still aren't recognizing a critical fact: LLMs are NOT a simulation of human intelligence, and never will be.

I saw a particular post by a CTO who just discovered that having your coding AI review itself will make it discover things it did wrong. (Absolutely best practice for these tools, by the way!) What concerns me is that a) this was surprising to him, years into the generative AI era; and b) when trying to understand why AI-driven review catches mistakes the AI made the first time, he reasoned about it with an analogue to human cognition: that humans, too, make mistakes on the first run.

Here's the thing: humans and LLMs make mistakes when writing code for COMPLETELY different reasons.

This misconception is highly encouraged by the people marketing the tools, who are highly incentivized to tell you that their tool can write human-level code.

This keeps us from seeing AI as simply a tool. We use tools to extend our own capacity, and to accomplish goals more effectively or more efficiently. We also recognize that they have limitations: a hammer makes a poor screwdriver makes a poor drill.

The current generation of transformer-based coding AIs have these limitations:

1. They cannot take in all of the abstractions in a large codebase at once.
2. They tend to hardcode instead of building appropriate new abstractions.
3. They are biased towards old versions of libraries.
4. They can't systematically think of edge cases.
5. They tend to try to fix things before fully validating their hypotheses.

And, most important of all - they can only think forward. Current generative AI models run in one direction, and if they wrote something poorly in the first place, they are far more likely to double down on the poor choice than to re-evaluate it. Humans, on the other hand, can bounce back, circle around, reconsider, and totally replace abstractions and update beliefs as they go along. (As a side note, this is why I'm so fascinated by the ARC Prize Foundation's AGI-3 benchmark - it makes these limitations clear.)

This all looks like "coding hallucinations" - abstractions it thinks are real; best practices that aren't anymore; test runs that don't actually test anything and declare success.

The best coding harness with the smartest transformer-based LLM in the world cannot reliably do these things 100% of the time. They're inherent restrictions of this class of model. You, the user, the coder, need to be conscious of the limitations and learn to work around them.

In the race to offer the best AI coding experiences, people are making promises of human-like thinking that these tools simply can't live up to. But the tools that will survive the hype cycle are the ones that promise to be tools: extending human capability, helping you do what was impossible before; but not magic.