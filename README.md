# Moodie

Moodie is a web application, designed to help people relationships show their feelings more easily.

## Shouldn't people just talk?

Yes - if anything, moodie is intended to *incentivise* conversation, rather than be a substitute for it. The project was incepted from the idea that having to continually update someone on how you're feeling, if you're already in a trying time, can be emotionally burdensome.

It is deliberately designed to not replace talking to the people you're in a relationship with. Instead it can allow other members of the relationship to "temperature check" how everyone is feeling.

## What does Moodie record?

The "mood logs" of Moodie require three core things:

- Feeling: A score from 0 to 5 of a person's emotional capacity and energy
- Mood: This is how a person is feeling
  - Moods are loosely categorised as `positive`, `negative` and `neutral`
- Need: This is what a person feels they need
  - Needs are categorised as `active` or `passive`, which is whether it requires action on the part of another relationship member

The logs also record the name of the person and the time at which it was recorded.

## What's a relationship?

Moodie makes very little assumption of what a relationship is, or who can comprise one: 

- A person can have as many relationships as they want
- Relationships can have as many or as few members as desired
- The application doesn't assume sex or gender
- Individuals in a relationship can independently configure their moods and needs

The things that Moodie does enforce:

- A mood log is identical to all members of a relationship, including the name of the person
  - This is because a relationship is intended for all members of it to communicate around
  - People are not limited to sharing only one relationship, so it's possible to have different names/moods within different relationships, which may contain the same people
- A mood log is immutable
  - This means a person can't edit their mood, but they can post a new mood log at any time
- A mood log can only express one mood and one need
  - People and people in relationships are much more complicated than this, obviously
  - The intent is to express the "top of mind" feelings, to aid in communication