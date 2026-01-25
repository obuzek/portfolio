---
title: on designing for the emerging social norms around AI
date: 2026-01-25
excerpt: A discussion of the knowledge creator critiques of AI usage, the design choices in chatbots that have led us here, and whether we can build our way out of this situation.
draft: false
---

I have been watching with interest over the last couple of years as people slowly begin to navigate the appropriate use of AI. There are a couple of different camps here. We have the AI hype end of the spectrum, where users are encouraged to replace as much as possible with AI, give the AI full autonomy, and turn over much of their thinking to AI. Then we have the anti-AI end of the spectrum, where acknowledging any use of AI is considered anathema to good work.

It is tempting as builders of AI to ignore this discourse altogether, relying on one's own intuitions about where AI is and is not useful. But this dialogue is an important indicator of an emerging expectation from users about where and how your tools will use AI.

## the discourse

This morning, I watched a video from Angela Collier[^1] about a professor (who shall rename unnamed, as this is not his discourse) who had become reliant on chatgpt to such an intense degree that he had accidentally allowed the AI to delete all of his academic work. Per the original article, he had turned off all safeguards, not understanding that allowing a probabilistic machine full access to his operating system could very well result in irreversible consequences. He also describes the extent to which he'd been using chatgpt - it was generating his lectures and his assignments, doing grading for him, and more.

Angela's appalled reaction gives us clues about how the careful academic camp is seeing use of AI. The tone of her video is shocked and disgusted - conveying very clearly her understanding of the new social norms:

1. Using AI to replace creating lectures, assignments, and doing your grading suggests that you have given up your right to claim that you are the one doing the work.
2. Using AI to replace work that you previously created implies that your brain is slowly losing mental acuity.
3. Using AI with no safeguards in place implies that you're not just using AI, but that you're choosing your tools without understanding their limitations, further indicating that you may not be particularly trustworthy in your other technical choices.

These criticisms are frequently echoed among thoughtful intellectuals, people who are experts at the very human craft of acquiring, synthesizing and translating knowledge to other people, as well as the people we rely on to bring new knowledge into existence.

Like many others in that type of profession, the underlying conclusion is simply that knowledge creators should reject AI altogether. There's merit in that viewpoint: despite much hype, the idea that LLM-based AI is going to replace humans at the task of creating new knowledge has so far been overblown. (No citation for the moment; perhaps another blog post for another day.) This means we'll still need to rely on humans to create and transmit new knowledge - and therefore it's worth taking their concerns and criticisms of AI, as well as their social norms around it, seriously.

A lot of the polarization in the discourse around AI crops up at this exact moment: a common response among AI builders (that leads to AI hype) is that if people are going to reject AI, we should therefore reject them (and along with it, any criticism they might be offering).

Or, we can take an alternate approach, and decide to learn from those new social norms, incorporating them into future AI user patterns.

## the criticisms

Let's examine each of the criticisms more closely.

### "using AI to create your work means it is not yours"

We're still in the Wild West era of AI, brought about by the proliferation of chatbots as the first user experience most people encountered when they first learned about AI. Chatbots brought with them very specific design patterns:

1. Chatbots are fine-tuned to be sycophantic, to increase user engagement and prevent situations where the machine insists it knows better than you (when it's incorrect 10-20% of the time).
2. Chatbots are by their nature working in a more "casual" part of the text generation space, more similar to human conversation, which has a much looser relationship to truth and facts than, say, academic text.
3. Chatbots weren't designed to distinguish between work produced by the user and work produced by the AI.
4. Chatbots are typically only generating text forward and can't meaningfully edit, though this fact is actively changing[^2].

The nature of this particular criticism almost entirely derives from these design choices.

If an AI application is sycophantic, it will happily generate new knowledge work regardless of its ability to do so successfully. It won't ask questions when it reaches the edge of its knowledge space, reducing any likelihood that the text ultimately produced uses any expertise from the user at all. While staying in the casual text space, new knowledge is likely to be even less grounded in truth than if generated from a more careful, academic space. The end result will have no markings distinguishing what the user did from what the AI did. And text, once generated, will only be edited if the user so chooses.

### "using AI means you're losing cognitive acuity"

One of the studies mentioned in Collier's YouTube video is about the concept of cognitive debt[^3] - the notion that the more you lean on AI, the more your brain deteriorates. It's in preprint, so we can't yet draw full conclusions. Kosmyna et al.'s results showed that people who relied on generating their essays fully from an AI demonstrated more homogenous work, low recall of what they had "written", and low topic complexity. Notably, the results indicated that using LLMs _only_ for the purpose of research and essay development is significantly worse than when relying on search engines plus your own brain.

The experimental design implies two specific things:

1. If LLMs were their interface for the web, it was impossible for study participants to check primary sources for themselves and draw their own conclusions.
2. Since the LLMs made no distinction between words the study participant had written versus what the LLM had contributed, participants at the end of the process had no way of knowing which thoughts and ideas were truly "theirs".

Without data, we can't know for certain - but we can surmise a guess that if an AI application were designed to surface more clearly which ideas belong to the user, which ideas belong to the AI, and which to third parties entirely, it's possible we wouldn't see nearly the same degradation in brain function. Comparing to the "search + brain" study condition makes it clear that the user interface offered by search engines doesn't suffer from nearly the same degradation - yet search engines also rely on the same sort of word embedding space to locate information. The gap, then, seems to be more about letting the LLM _synthesize_ information on your behalf, rather than locating it in the first place.

### "using AI with no safeguards means you are careless"

Here we note that the typical chatbot interface isn't exposing the safeguards it's using very well, or helping the user understand the potential dangers when you turn them off.

When the web first became accessible to large numbers of people, users new to e.g. UNIX commands would often come across trolling forum replies that said, "Just run `rm -rf /`, this will fix your problem!" Most savvy web and computer users learned to do a bit more fact-finding before simply trusting a reply, so that their naïveté wouldn't destroy their important files.

But the development of computer interfaces didn't stop there. As personal computing continued to develop, particularly with the introduction of the GUI desktop operating system, no one expected that the average user would continue to need to understand the implications of `rm -rf` when found online. Instead, the "trash can" was developed, giving laypeople an obvious affordance for removing things 

We can certainly invite users to become more fluent in the implications of allowing a probabilistic machine to have the keys to their operating system - or, we can design clearer affordances so that LLMs can't "act" in ways the users don't expect them to.

## designing better AI

As AI is most commonly experienced today, through the chatbot pattern, Collier (and others') criticisms are valid. When you are faced with a seemingly all-powerful, seemingly more intelligent than you machine, that ignores the longstanding patterns around how human knowledge is developed and conveyed to distinguish the provenance of ideas, that acts in reasonable ways 85% of the time - of course the obvious tendency of most humans is going to be believing that this machine is magic, and you can farm out the work you want it to do in the same way you might a human assistant.

But here, we believe that AI is normal technology[^4], and in order for it to be effective at human collaboration, we must design it in ways that offset these criticisms.

### on sycophancy, chatbot interfaces, and attribution

Chatbots are ultimately a poor interface for human-AI collaboration on work. While the ability to use natural language to trigger workflows and behavior patterns from an AI is incredibly helpful for many users, its unbounded nature makes the user surface for a given product infinite - preventing builders from being able to corral user workflows down preferred paths.

In original chatbot interfaces, we see little distinction being made between chat, bringing knowledge into the workspace, and producing knowledge artifacts. Each of these is initiated from a single window.

There's no need to imagine that this is where we must end, though. Code generation patterns with IDEs show us better affordances for ensuring the user isn't simply relying on the LLM alone to make changes. In AI coding IDE interfaces, the LLM chat is a distinct part of the interface from the human code editing space, allowing the user to distinguish when they are writing code versus when the LLM is producing code.

Coding interfaces (and chatbot interfaces as well, to be clear) have also introduced agents, which is relevant here because it allows the generation to enter a different probability space. Since offloading knowledge generation work to an agent allows changes to the prompt, the context, and even the model used, the probability space for generation can be moved much closer to correct coding behavior (and away from casual chat). Further, "review / critic" agents can be introduced that have the particular role of questioning the code generated, allowing the output of the initial LLM pass to be questioned. Coding agents have begun to use attribution when it comes to commits, signing each commit with both the user's ID as well as the LLM's. And FIM models (as mentioned previously[^2]) allow in-place editing rather than haphazard replacement of large segments of code.

Each of these patterns could potentially be taken even farther. The different agents a coding chatbot relies on could be more clearly revealed to the user, allowing them both to recognize the existence of, e.g., the review bot, but also to make clearer choices about when to invoke it. Rather than a simple text summary of changes at the end, the UI could be controlled such that the user could be given a live "code walkthrough". Careful tracking of the user's work versus the LLM's could more cleanly differentiate code diffs that originated from the LLM versus the user.

To date, the affordances offered to users who are creating documents, lectures and more haven't been given nearly as much care. Each of these tasks is treated as a simple instance of the more general chatbot pattern, requiring no further thought. We can build better here. Imagine if, instead of using a chatbot, a lecturer had access to an AI which:


* provided a "critic" button which was designed to ask the user probing questions about how they've chosen to present a topic, and offer the likely confusions students will have upon hearing the subject matter?
* noted places where assertions are being made that could use better citations?
* instead of directly providing grades and scores to a student based on a rubric, offered an interface that indicated how much deviation there was in student answers, identified patterns of confusion among the students, and then pointed to pieces of past lectures and assets that likely contributed to student confusion?

Without a generalized chatbot interface that will simply attempt to comply with every user need, the user is instead guided down a path that forces them to confront the material. For educational technology, this is essential to the ultimate usefulness of the technology.

### on retaining the user's cognitive acuity

Similarly, the issues which are leading to worse cognitive acuity in users are also related to the unbounded chatbot interface. We can keep introducing features that fight against users' natural tendency towards cognitive laziness. What if we:

* offered a "search" button to find new information and ways of presenting a topic, but did not attempt to summarize the data for the user, simply providing a collection of sources and noting their similarities? (Consider here the interface offered by Google's Deep Research[^5] - which is still limited in some respects, but goes out of its way to be clear about the source of its information.)
* marked any text it added to a document with which LLM generated it and when[^6], making that information a core part of the document's metadata, so that later students could differentiate between notes from their lecturer and notes from an LLM and decide accordingly how to weight the information?
* encouraged technical and social norms around what percentage of ownership the writing in a document must have in order for the user to reasonably be considered an author of the document?

### on expecting users to understand AI's limitations

To an extent, we can expect that the future generations will become more educated about AI's limitations, and know for themselves the dangers of exposing their operating system's entire security surface to an AI. But expecting that this will be the main limiter on AI's problems flies in the face of everything we have previously learned about how to keep data and computer systems secure. It also contradicts everything we know about humans and how they interact with systems[^7].

Instead, we need to consider patterns like:
* clearly differentiating between possibly destructive system actions and simply additive ones, and insert deterministic systems of review such that the user cannot disable asking for permission around destructive actions - ensuring that all instances of "I'd like to `rm` something" must go to human review even if other commands are allowed
* restricting the edges of the chatbot interface to simply refuse tasks outside of its purview
* providing more visual affordances in the UI surface beyond the chatbot interface to be clear about when destructive actions are possible

Ultimately, even for advanced users, it simply does not make sense for AIs to have unbounded access to the operating system, because the potential for harm cannot be prevented.

## our obligations

As builders, we need to keep in mind that the criticisms from the anti-AI camp come from a place of caring about the future and the usefulness of the knowledge we create as a society. Saying that we cannot work around the limitations of LLMs is not enough: we can and should challenge our own creativity to come up with ways to bring the benefits of LLMs to people without the risks it also entails. In the next AI application you're responsible for creating, use the new AI social norms as inspiration, not limitation.

## citations

[^1]: ["this is what two years of chatgpt does to your brain."](https://www.youtube.com/watch?v=7pqF90rstZQ) Angela Collier, YouTube, Jan 23, 2026.
[^2]: [What is FIM and why does it matter in LLM-based AI.](https://medium.com/@SymeCloud/what-is-fim-and-why-does-it-matter-in-llm-based-ai-53f33385585b).
[^3]: [Your Brain on ChatGPT: Accumulation of Cognitive Debt When Using an AI Assistant for Essay Writing Task.](https://arxiv.org/abs/2506.08872) Kosmyna, et al., arXiV preprint, Jun 10, 2025.
[^4]: [AI as Normal Technology.](https://arxiv.org/abs/2506.08872) Arvind Narayanan and Sayash Kapoor. normaltech.ai, Apr 15, 2025.
[^5]: [Google Gemini's Deep Research mode](https://www.mdpi.com/2227-7102/15/10/1304). While I still think there's a distance that we must travel from the current instantiation here and something truly effective for knowledge workers, Deep Research makes several moves that demonstrate that a better interface with technical and scientific information is possible.
[^6]: [AI Attribution Toolkit](https://aiattribution.github.io/). Jessica He, et al. Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems. Apr 25, 2025. Introduces a framework for marking a document with an annotation for whether AI was involved in its creation, and to what extent.
[^7]: [Paying the Cognitive Debt: An Experiential Learning Framework for Integrating AI in Social Work Education](https://www.mdpi.com/2227-7102/15/10/1304). Keith J. Watts. Educational Science 2025. Oct 2, 2025.