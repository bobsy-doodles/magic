(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const TYPES = [
    { id: 'cards', label: 'Cards', suit: '♠', red: false },
    { id: 'coins', label: 'Coins', suit: '♦', red: true },
    { id: 'everyday', label: 'Everyday things', suit: '♣', red: false },
    { id: 'mind', label: 'Mind and math', suit: '♥', red: true }
  ];
  const PROPS = ['Deck of cards', 'Coin', 'Paper clips', 'Bill', 'Scarf or rope', 'Dice', 'Pen and paper'];
  const LEVELS = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };

  // Plain ASCII on purpose, so the PDF and text downloads print cleanly.
  const TRICKS = [
    {
      id: 'key-card', name: 'The Key Card', type: 'cards', level: 1, mins: 3, props: ['Deck of cards'],
      effect: 'Someone picks any card and puts it back. You hand them the deck, they mix it up, and you still find their card.',
      secret: 'You secretly look at one card in the deck, called the key card. Their card is always placed right next to it, so you only have to find the key card.',
      steps: [
        'Hold the deck face down and spread it toward your friend. Ask them to take any card, look at it, and remember it. Do not look at it yourself.',
        'While they look, square up the deck and cut it into two halves. Lift the top half off with your right hand.',
        'As you lift it, tip up the bottom card of that top half for one second and read it. Say it is the 7 of clubs. That is your key card. Remember it.',
        'Hold out the lower half and ask them to put their card on top of it, face down.',
        'Drop the top half back on top. Their card now sits directly under your key card.',
        'Cut the deck a few times. Cutting keeps the cards in the same order, so it looks like mixing but changes nothing. Do not shuffle.',
        'Look through the deck face up, one card at a time. The card you meet just before your key card is theirs. Take it out and put it face down on the table.',
        'Ask them to say their card out loud, then flip yours over.'
      ],
      tips: ['Peek while they are busy looking at their own card, never before.', 'Make a show of "feeling" for the card with your fingers before you pull it out.', 'Hold the deck so only you can see the faces while you look through it.'],
      mistakes: ['Shuffling. A real shuffle breaks the order and ruins the trick.', 'Staring at the bottom card for too long.', 'Spreading the cards so your friend can see which one you pause on.']
    },
    {
      id: 'twenty-one-cards', name: 'The 21 Card Trick', type: 'cards', level: 1, mins: 4, props: ['Deck of cards'],
      effect: 'Someone only thinks of a card. After three quick deals, you pull out exactly that card.',
      secret: 'This one is math, so you never need to see the card. Each time you pick up the piles with their pile in the middle, their card moves closer to the middle of the packet. After three rounds it is always the 11th card.',
      steps: [
        'Count out any 21 cards from the deck. Ask your friend to think of one of them and not touch it.',
        'Deal the 21 cards face up into three columns, one card at a time, left to right, so you make three columns of 7. Overlap the cards so every face can be seen.',
        'Ask which column their card is in.',
        'Pick up the three columns and stack them on each other, with their column in the middle, between the other two. Do not mix them. Turn the packet face down.',
        'Deal into three columns again, the same way, and ask again which column it is in.',
        'Pick up with their column in the middle again, and turn the packet face down.',
        'Do it a third time: deal, ask, pick up with their column in the middle.',
        'Hold the packet face down. Count off ten cards from the top, and turn over the 11th. It is their card.'
      ],
      tips: ['Slow the reveal down. Deal the first ten cards one by one, then pause before you turn over the 11th.', 'Keep talking while you deal so the pickups look like random chores.', 'Deal the first two rounds quickly, then slow down for the reveal.'],
      mistakes: ['Putting their column on top or bottom by accident.', 'Dealing the columns in a different order each time.', 'Forgetting to turn the packet face down before dealing again.']
    },
    {
      id: 'cross-cut-force', name: 'The Cross-Cut Force', type: 'cards', level: 2, mins: 6, props: ['Deck of cards'],
      effect: 'Your friend cuts the deck wherever they like and picks the card at the cut. It is the card you knew all along.',
      secret: 'You secretly know the top card of the deck. A "force" means making someone pick a card that seems free but is not. Turning one half of the deck crosswise makes it look like a fair marker, but it sits right on top of your known card.',
      steps: [
        'Secretly learn the top card. The easy way is to take any card, look at it, and drop it on top of the deck while you chat. Say it is the queen of hearts.',
        'Put the deck on the table. Ask your friend to cut off about half of it and put that half next to the deck.',
        'Pick up the bottom half (the one that was not moved) and put it on top of the cut-off half, but crosswise, like a plus sign. Say you are marking where they cut.',
        'Talk for ten or twenty seconds about something else. This gap makes people forget the order.',
        'Lift off the crosswise half. The card now showing on the other half is your known card.',
        'Say "this is where you cut", and let them take that card and look at it. It is the queen of hearts.',
        'Now build the finish. Show a prediction you wrote earlier, or put the card back and find it with the Key Card trick.'
      ],
      tips: ['Use it as an opener. Once they have picked "freely", every other trick feels bigger.', 'Do not hurry the chat in step 4. The pause sells the trick.', 'Practice cutting the deck to be sure the known card ends up on the right half.'],
      mistakes: ['Putting the crosswise half down before they finish cutting.', 'Mixing up which half is which.', 'Saying "pick any card" at the end. Say "this is where you cut" instead.']
    },
    {
      id: 'pinky-break', name: 'The Pinky Break', type: 'cards', level: 2, mins: 10, skill: true, props: ['Deck of cards'],
      effect: 'A tiny, invisible gap in the deck that marks where a card is. You can find it again at any moment.',
      secret: 'Your left little finger holds a small gap between two cards. From the front it looks like you are just holding the deck. This is the base of many card controls.',
      steps: [
        'Hold the deck face down in your left hand, like you are about to deal. Your right hand rests on top, thumb at the back end of the deck and fingers at the front end.',
        'Hold the lower half of the deck in your left hand and let your friend put their card face down on top of it.',
        'Drop the upper half onto the lower half with your right hand. As it lands, catch the tip of your left little finger between the two halves, at the back left corner.',
        'Hold the gap open only a little, about the thickness of a coin. Squeeze the deck lightly with your right hand to hide it.',
        'Square the sides with your thumb and fingers, and keep the gap under the little finger. Their card is directly under the gap.',
        'Practice holding the break while you talk, look people in the eye, and turn the deck from side to side.'
      ],
      tips: ['A small break is better than a big one. Only you need to feel it.', 'Practice with the deck held at waist height first, then at chest height.', 'Look at your friend, never at the deck, while you hold the break.'],
      mistakes: ['Pressing the finger in so hard that the deck bends.', 'Letting the gap open wide enough to see from the side.', 'Staring at your left hand.']
    },
    {
      id: 'control-to-top', name: 'Bring a Card to the Top', type: 'cards', level: 2, mins: 6, skill: true, props: ['Deck of cards'],
      effect: 'A card is lost in the middle of the deck. One simple cut later, it is on top, ready for you to use.',
      secret: 'It is called a control. You hold a pinky break above their card, and then cut the deck at that gap. A normal cut never changes the order of the cards except at the place where you cut, and you cut right at the break.',
      steps: [
        'Have a card chosen. Hold the lower half of the deck and let them put their card on top of it.',
        'Drop the upper half on top and catch a pinky break above their card (see the Pinky Break).',
        'Say: "I will lose your card by cutting the deck." Keep the break held.',
        'With your right hand, lift everything above the break and put those cards underneath the rest of the deck, like a normal cut.',
        'Their card is now the top card of the deck. Square the deck and carry on.',
        'Use it right away: for example, do a double lift or deal the top card face down for them to flip over.'
      ],
      tips: ['Cut calmly, like it does not matter. Nobody watches a cut that looks boring.', 'Talk about something else as you cut.', 'Once you can do this, you can finish with the Card Change or a prediction.'],
      mistakes: ['Cutting a little above or below the break, which puts the wrong card on top.', 'Losing the break while talking.', 'Cutting too fast and flashing the gap.']
    },
    {
      id: 'double-lift', name: 'The Double Lift', type: 'cards', level: 2, mins: 15, skill: true, props: ['Deck of cards'],
      effect: 'You turn over what looks like the top card of the deck. It is really the second card.',
      secret: 'You pick up the top two cards as one and turn them together. The audience sees the face of the second card and believes it is the top card.',
      steps: [
        'Hold the deck face down in your left hand. Push the top two cards a tiny bit to the right with your left thumb, and get your little finger under both of them to make a break.',
        'With your right hand, grab the two cards at the end nearest you, with your thumb below and your fingers on top, using the break to pick up exactly two.',
        'Turn your right hand over, like you are turning over one card. The two cards stay perfectly lined up and look like one card.',
        'Show the face for a second. You are showing the second card, not the top one.',
        'Turn your hand back and lay the two cards flat on the deck again, as one.',
        'Deal the top card face down. It is a different card from the one you showed.'
      ],
      tips: ['Practice the turn until the two cards never separate.', 'Hold the cards by the very end so nothing slips.', 'Do not hurry. A calm turn looks honest.'],
      mistakes: ['Letting the cards separate so two edges show.', 'Turning the hand slowly and nervously, so there is time to see two cards.', 'Looking at your hands in a way that says "this is a move".']
    },
    {
      id: 'card-change', name: 'The Card Change', type: 'cards', level: 2, mins: 5, props: ['Deck of cards'],
      effect: 'You show a card, put it face down on the table, snap your fingers, and it has turned into a different card.',
      secret: 'It uses a double lift. The card you show is really the second card. The card you put on the table is the real top card, which is a different one.',
      steps: [
        'Look at the top two cards of the deck and remember them. For example, the 4 of clubs on top and the king of hearts second.',
        'Do a double lift and show the face. It looks like the king of hearts is the top card.',
        'Turn the two cards back onto the deck as one. Say, "This is the king of hearts."',
        'Deal the real top card (the 4 of clubs) face down onto the table. Everybody thinks it is the king of hearts.',
        'Snap your fingers, wave your hand, or say a magic word.',
        'Turn the card on the table over. It has changed into the 4 of clubs.'
      ],
      tips: ['Let your friend turn over the card. It makes the change feel more real.', 'Do the change right after the double lift, while their attention is still on the king.', 'Put the deck away afterwards so nobody checks it.'],
      mistakes: ['Showing the face for too long.', 'Doing the double lift badly, which exposes the second card.', 'Dealing the top card sloppily so its face flashes.']
    },
    {
      id: 'pocket-prediction', name: 'The Pocket Prediction', type: 'cards', level: 2, mins: 6, props: ['Deck of cards'],
      effect: 'Your friend picks a card as freely as can be. You take a card out of your pocket, and it is exactly the same card.',
      secret: 'You have two identical cards. One is already in your pocket, and the other is the one you force on your friend with the Cross-Cut Force.',
      steps: [
        'Find a second deck with the same back design. Take out one card from it, for example the 9 of hearts, and put it in your pocket or wallet.',
        'Find the same card (the 9 of hearts) in your main deck and put it on top.',
        'Say you made a prediction before they arrived. Do not show it yet.',
        'Do the Cross-Cut Force (see that trick) so your friend ends up with the 9 of hearts. Let them take it and look at it.',
        'Ask them to say their card out loud: "The 9 of hearts."',
        'Take the card from your pocket and turn it over. It is the 9 of hearts.'
      ],
      tips: ['Fold the pocket card in half and put it in your wallet. It feels more mysterious when it comes out.', 'Do not let anyone look through your main deck afterwards. It has two 9 of hearts.', 'Make sure the back designs of the two decks match.'],
      mistakes: ['Forgetting to put the matching card on top.', 'Saying "pick any card" instead of letting them cut.', 'Leaving the pocket card where it can bend or show.']
    },
    {
      id: 'gilbreath-mix', name: 'The Red and Black Mix', type: 'cards', level: 2, mins: 8, props: ['Deck of cards'],
      effect: 'The deck gets mixed by your friend, and you can still tell that every pair of cards has one red and one black.',
      secret: 'This is called the Gilbreath principle. You arrange the deck so the colors alternate. Dealing off half of the cards reverses them, and one riffle shuffle then weaves them together in pairs. Every pair ends up with one red and one black.',
      steps: [
        'Before you begin, arrange the deck so the colors alternate: red, black, red, black, all the way through. Keep the deck face down.',
        'Hand the deck to your friend. Ask them to deal about half of the cards, one at a time, face down, onto the table. This reverses that half.',
        'Ask them to riffle shuffle the two piles together one time. Only one shuffle.',
        'Say: "Nobody could know the order now."',
        'Ask them to take the top two cards and look at them, and tell you the color of the first one.',
        'Say you can "read their mind" about the second one. It is always the opposite color. Do it a few more times down the deck.'
      ],
      tips: ['A single riffle shuffle is the key. If your friend shuffles more than once, stop them politely.', 'Set the deck while you are alone. It takes a few minutes.', 'Look away while they check each pair, so it feels like real mind reading.'],
      mistakes: ['Cutting the cards off in one block instead of dealing them one at a time. Dealing is what reverses them.', 'Letting them shuffle twice.', 'Making a mistake while setting the deck.']
    },
    {
      id: 'ninth-card', name: 'The Ninth Card', type: 'cards', level: 1, mins: 3, props: ['Deck of cards'],
      effect: 'Your friend thinks of a number, does some math, and counts down to a card you name before they look.',
      secret: 'Take any number from 10 to 19, add its two digits, and subtract that total from the number. The answer is always 9. So the card they reach is always the ninth one, and you already know what it is.',
      steps: [
        'In secret, put a card you remember in 9th place from the top of the deck. For example, count eight cards, drop your card on top of them, and put those nine cards back on top of the deck.',
        'Ask your friend to think of any number from 10 to 19, and not to say it.',
        'Ask them to add its two digits (for 14: 1 + 4 = 5), then subtract that from the number (14 - 5 = 9).',
        'Ask them to deal that many cards face down onto the table, from the top of the deck, counting out loud. They deal nine.',
        'Tell them to look at the last card they dealt, but not to tell you.',
        'Name it: "You are looking at the ace of spades!"'
      ],
      tips: ['Practice the math until you can explain it simply.', 'Make a face of concentration as if you can feel their number.', 'Do not ask them to say the number out loud.'],
      mistakes: ['Letting them pick a number outside 10 to 19.', 'Counting the wrong position when you prepare the deck.', 'Letting them deal too many cards.']
    },
    {
      id: 'riffle-shuffle', name: 'Riffle Shuffle and Bridge', type: 'cards', level: 1, mins: 10, skill: true, props: ['Deck of cards'],
      effect: 'The basic shuffle every card magician needs. It makes the cards look well mixed.',
      secret: 'There is nothing sneaky here. It is a foundation move that you will use in many tricks, such as the Red and Black Mix. A bridge is a small arch that helps the cards square up neatly.',
      steps: [
        'Cut the deck into two halves and hold them face down, one in each hand, with the short ends toward you and the long sides toward each other.',
        'Put your thumbs on the inner corners and your fingers on the outer edges. Lift the inner corners up a little with your thumbs.',
        'Let the cards fall from your thumbs in turn, left and right, so they weave together.',
        'Push the two halves together until the corners meet.',
        'To make a bridge, hold the weaved deck by the long edges with your thumb on one side and your fingers on the other, and gently squeeze the cards into a small arch.',
        'Let the arch flatten and square up the deck.'
      ],
      tips: ['Work low over a table so cards that fall are easy to pick up.', 'Practice with an old deck. The cards will bend a little.', 'Do not worry if the weave is not perfect. Everybody starts messy.'],
      mistakes: ['Lifting the cards too high so the weave flies apart.', 'Squeezing so hard that the cards fold.', 'Letting too many cards fall at once from one half.']
    },
    {
      id: 'french-drop', name: 'The French Drop', type: 'coins', level: 2, mins: 10, props: ['Coin'],
      effect: 'You take a coin in one hand, close your fist, and open it. The coin is gone.',
      secret: 'The coin never leaves your first hand. It drops into the curl of your fingers while your other hand pretends to grab it. The audience watches the empty fist because you do.',
      steps: [
        'Hold a coin at the tips of your left thumb and first two fingers, in front of you, so everybody can see it.',
        'Bring your right hand up to take it. Your right fingers go in front of the coin and your right thumb goes behind it, like you are really grabbing it.',
        'As your right hand closes over the coin, let the coin drop from your left fingertips into the curl of your left fingers. The left hand stays relaxed and a little curled.',
        'Move your right hand away as if it holds the coin. Make the fist look heavy and tight.',
        'Follow your right fist with your eyes. Let your left hand drop naturally to your side, or pick up a pen with it.',
        'Wave your fist, say something magical, and slowly open it. It is empty.',
        'To finish, find the coin somewhere surprising, such as behind a friend\'s ear.'
      ],
      tips: ['Use a half-dollar or a big coin. It is easier to see and easier to hold.', 'Practice in a mirror, then in front of a family member.', 'Your eyes lead the audience. Look at the hand that "has" the coin.'],
      mistakes: ['Looking at your left hand when the coin drops.', 'Closing the right hand too quickly.', 'Holding the left hand stiff. It should look like nothing happened there.']
    },
    {
      id: 'coin-behind-ear', name: 'Coin Behind the Ear', type: 'coins', level: 2, mins: 8, props: ['Coin'],
      effect: 'You reach to your friend\'s ear and pull out a coin from nowhere.',
      secret: 'The coin is hidden in your own palm the whole time. This hold is called palming. Because your hand looks relaxed, nobody thinks it holds anything.',
      steps: [
        'Place a coin in the middle of your palm. Curl your hand a little so the fleshy part at the base of your thumb and the base of your little finger gently pinch the coin.',
        'Check that it stays when you hold your hand open and relaxed. Do not squeeze. A tight, claw-like hand gives it away.',
        'Practice talking and moving that hand naturally, with the coin hidden, until you can forget it is there.',
        'Walk up to your friend and say "Hold on, you have something behind your ear".',
        'Reach to their ear with the palmed hand. As your fingers go behind the ear, slide the coin with your thumb out to your fingertips.',
        'Bring your hand back with the coin held up in your fingers. Smile, like you are as surprised as they are.'
      ],
      tips: ['Show your other hand empty first, so the palming hand looks empty too.', 'Move your hands the way you normally do when talking.', 'Try this with a quarter before you try smaller coins.'],
      mistakes: ['Squeezing the coin so your hand looks stiff.', 'Letting the edge of the coin show from the side.', 'Pointing at the palmed hand.']
    },
    {
      id: 'instant-knot', name: 'The Instant Knot', type: 'everyday', level: 1, mins: 3, props: ['Scarf or rope'],
      effect: 'You hold both ends of a scarf, give a little shake, and a knot appears in the middle without you letting go.',
      secret: 'The knot is tied before you touch the ends. Crossing your arms first makes your hands pick up the ends in a twisted way. When your arms uncross, the twist pulls tight into a knot.',
      steps: [
        'Lay a scarf, long handkerchief or piece of rope flat on the table in front of you.',
        'Fold your arms in front of you, like you are cold. It does not matter which arm is on top.',
        'With your arms still folded, reach out. Your right hand picks up the left end of the scarf, and your left hand picks up the right end.',
        'Say you will tie a knot without letting go.',
        'Now unfold your arms, pulling your hands apart. Do it in one smooth motion, without letting go of either end.',
        'A knot appears in the middle of the scarf.'
      ],
      tips: ['Do not talk about folding your arms. Just do it while you say something else.', 'Blow on the scarf or give it a shake right before you pull. This helps people look away from your arms.', 'A silky scarf is easiest. A stiff towel will not work.'],
      mistakes: ['Letting go of an end while you unfold.', 'Picking up the wrong end. Right hand takes the left end, left hand takes the right end.', 'Pulling so slowly that people see the arms unfold.']
    },
    {
      id: 'linking-paper-clips', name: 'Linking Paper Clips', type: 'everyday', level: 1, mins: 3, props: ['Paper clips', 'Bill'],
      effect: 'Two paper clips clip onto a bill. You pull the ends and the paper clips jump off linked together.',
      secret: 'You fold the bill into an S shape and clip each fold. Each clip grabs the middle layer. Pulling the ends straightens the bill, and the two clips slide off the middle layer and into each other.',
      steps: [
        'Hold a bill flat and fold it into an S shape, like a letter Z with three equal sections.',
        'Slide the first paper clip over the first fold, so it clips the front layer and the middle layer.',
        'Slide the second paper clip over the other fold, so it clips the middle layer and the back layer. Both clips now hold the middle layer, on opposite sides.',
        'Hold the bill by its two ends, with the clips on the front.',
        'Pull the ends apart quickly, firmly, and straight. The clips pop off together and land linked in a chain.',
        'Hold the linked clips up. The bill is flat and undamaged.'
      ],
      tips: ['Use small paper clips. Big ones slide off too easily.', 'A fresh, stiff bill works best. A soft old bill grips the clips too much.', 'Hold the bill high so the fall looks like a magic moment.'],
      mistakes: ['Clipping the wrong layers. Each clip must hold the middle layer.', 'Pulling slowly. The jerk is what makes the clips fly.', 'Folding the bill in an S that is not even.']
    },
    {
      id: 'always-five', name: 'The Always Five', type: 'mind', level: 1, mins: 2, props: [],
      effect: 'Your friend thinks of a number, does some math in their head, and ends up with the number you predicted.',
      secret: 'The starting number cancels itself out, so the answer is always the same: the number you add, divided by two.',
      steps: [
        'Write the number 5 on a small piece of paper and fold it, or just say it at the end.',
        'Ask your friend to think of any number, big or small, and not to tell you.',
        'Say: double it.',
        'Say: add 10.',
        'Say: cut that number in half.',
        'Say: now take away the number you started with.',
        'Ask them what they have. It is 5, every time. Show your paper.'
      ],
      tips: ['Ask them to use a calculator if the number is big. It still works.', 'Change the trick for friends who have heard it. Add 20 in step 4 and the answer is 10.', 'Say each step slowly and give them time to think.'],
      mistakes: ['Skipping a step. The order matters.', 'Letting them pick a decimal number. Ask for a whole number.', 'Saying the answer before they finish.']
    },
    {
      id: 'magic-1089', name: 'The 1089 Prediction', type: 'mind', level: 1, mins: 4, props: ['Pen and paper'],
      effect: 'Your friend picks a random number, scrambles it with some math, and ends up with the number you wrote down beforehand.',
      secret: 'Any three-digit number with digits that differ by 2 or more leads to 1089 after reversing, subtracting, reversing again and adding. The math forces it.',
      steps: [
        'Before you begin, write 1089 on a paper, fold it, and put it somewhere visible.',
        'Ask your friend to write down a three-digit number where the first and last digits are different by at least 2. For example, 832.',
        'Tell them to reverse it and write it under the first number: 238.',
        'Tell them to subtract the smaller number from the bigger one: 832 - 238 = 594.',
        'Tell them to reverse that answer: 495.',
        'Tell them to add the last two numbers: 594 + 495.',
        'The answer is 1089. Unfold your paper.'
      ],
      tips: ['If their subtraction gives only two digits, such as 99, tell them to write it as 099. Reversed it is 990, and 99 + 990 is still 1089.', 'Hide the prediction in a book on page 108, line 9 for an extra surprise.', 'Do not tell them about the rule for the digits. Just say "pick a number that looks random".'],
      mistakes: ['A starting number like 556 where the first and last digits are too close.', 'Math errors. Offer to check their subtraction.', 'Forgetting to write the prediction first.']
    },
    {
      id: 'dice-tower', name: 'The Dice Tower', type: 'mind', level: 2, mins: 4, props: ['Dice'],
      effect: 'Your friend builds a tower of dice. You turn your back and tell them the total of all the faces you cannot see.',
      secret: 'The opposite sides of a die always add up to 7. Every die in the tower hides a pair that adds up to 7, except the top one, which you can see.',
      steps: [
        'Ask your friend to stack three to five dice on top of each other, with any faces showing, while your back is turned.',
        'Turn back around and look only at the top face of the tower. Say it shows a 2.',
        'Count the dice. Say there are 4.',
        'Multiply the number of dice by 7. Here, 4 x 7 = 28.',
        'Subtract the number on top: 28 - 2 = 26.',
        'Announce that the hidden faces add up to 26: the bottom of the tower and all the faces where dice touch.',
        'Ask your friend to check by lifting the dice and adding the hidden faces. It matches.'
      ],
      tips: ['Act like you are using some kind of super-sense while you do the math in your head.', 'Start with three dice and add more once you have it down.', 'Do the math quietly before you speak.'],
      mistakes: ['Counting the faces on the sides. Only touching faces and the bottom count.', 'Forgetting to subtract the top number.', 'Using dice that are not standard. Opposite sides must add up to 7.']
    }
  ];

  // ---------- state ----------
  const state = { type: 'all', level: 'all', q: '', have: new Set(), learned: new Set(), open: null, perf: null };
  const KEY = 'upmysleeve.learned';
  try { const v = JSON.parse(localStorage.getItem(KEY) || '[]'); if (Array.isArray(v)) v.forEach(x => state.learned.add(x)); } catch (e) { /* storage unavailable */ }
  const saveLearned = () => { try { localStorage.setItem(KEY, JSON.stringify([...state.learned])); } catch (e) { /* ignore */ } };
  const byId = id => TRICKS.find(t => t.id === id);
  const typeOf = t => TYPES.find(x => x.id === t.type);

  // ---------- list ----------
  function buildChips() {
    const tw = $('#types');
    tw.innerHTML = [{ id: 'all', label: 'All tricks' }].concat(TYPES).map(t =>
      '<button class="chip" type="button" data-type="' + t.id + '" aria-pressed="' + (state.type === t.id) + '">' + esc(t.label) + '</button>').join('');
    tw.addEventListener('click', e => { const b = e.target.closest('[data-type]'); if (!b) return; state.type = b.dataset.type; buildChipState(); render(); });
    const hw = $('#have');
    hw.innerHTML = PROPS.map(p => '<button class="chip" type="button" data-prop="' + esc(p) + '" aria-pressed="false">' + esc(p) + '</button>').join('');
    hw.addEventListener('click', e => {
      const b = e.target.closest('[data-prop]'); if (!b) return;
      const p = b.dataset.prop; if (state.have.has(p)) state.have.delete(p); else state.have.add(p);
      buildChipState(); render();
    });
  }
  function buildChipState() {
    document.querySelectorAll('[data-type]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.type === state.type)));
    document.querySelectorAll('[data-prop]').forEach(b => b.setAttribute('aria-pressed', String(state.have.has(b.dataset.prop))));
  }
  function visible() {
    const q = state.q.trim().toLowerCase();
    return TRICKS.filter(t => {
      if (state.type !== 'all' && t.type !== state.type) return false;
      if (state.level !== 'all' && t.level !== +state.level) return false;
      if (state.have.size && !t.props.every(p => state.have.has(p))) return false;
      if (q && !(t.name + ' ' + t.effect + ' ' + t.props.join(' ') + ' ' + typeOf(t).label).toLowerCase().includes(q)) return false;
      return true;
    });
  }
  const dots = n => '●'.repeat(n) + '○'.repeat(3 - n);
  function render() {
    const list = visible();
    $('#count').textContent = 'Showing ' + list.length + ' of ' + TRICKS.length + ' tricks. You have learned ' + state.learned.size + '.';
    $('#grid').innerHTML = list.length ? list.map(t => {
      const ty = typeOf(t);
      return '<button class="tcard" type="button" data-id="' + t.id + '">' +
        (state.learned.has(t.id) ? '<span class="badge">Learned</span>' : '') +
        '<span class="suit' + (ty.red ? ' r' : '') + '" aria-hidden="true">' + ty.suit + '</span>' +
        '<h2 class="tt">' + esc(t.name) + '</h2><p class="fx">' + esc(t.effect) + '</p>' +
        '<span class="meta"><span class="dots" title="' + LEVELS[t.level] + '">' + dots(t.level) + '</span><span>' + LEVELS[t.level] + '</span><span>' + t.mins + ' min</span>' + (t.skill ? '<span>Skill move</span>' : '') + '<span>' + (t.props.length ? esc(t.props.join(', ')) : 'Nothing needed') + '</span></span></button>';
    }).join('') : '<div class="empty">No tricks match. Clear a filter or pick fewer things in "What do you have".</div>';
  }

  // ---------- trick sheet ----------
  function openTrick(ref, fromHash) {
    const t = typeof ref === 'object' ? ref : byId(ref); if (!t) return;
    const id = t.id, custom = !!t.custom;
    state.open = id;
    const ty = typeOf(t);
    $('#sBody').innerHTML =
      '<p class="eyebrow">' + esc(ty.label) + '</p><h2 class="name" id="sTitle">' + esc(t.name) + '</h2>' +
      '<div class="meta"><span class="dots">' + dots(t.level) + '</span><span>' + LEVELS[t.level] + '</span><span>' + t.mins + ' min to learn</span>' + (t.skill ? '<span>Skill move</span>' : '') + '<span>' + (t.props.length ? 'You need: ' + esc(t.props.join(', ')) : 'You need: nothing') + '</span></div>' +
      (custom ? '<p class="guess">Best guess from the video (' + esc(t.confidence) + ' confidence). ' + esc(t.unsure) + ' Always test it yourself.</p>' : '') +
      (custom && t.seen.length ? '<div class="sec"><h3>What was seen in the video</h3><ul>' + t.seen.map(s => '<li>' + esc(s) + '</li>').join('') + '</ul></div>' : '') +
      '<div class="sec"><h3>What the audience sees</h3><p>' + esc(t.effect) + '</p></div>' +
      '<div class="sec"><h3>The secret</h3><p class="secret">' + esc(t.secret) + '</p></div>' +
      '<div class="sec"><h3>How to do it</h3><ol>' + t.steps.map(s => '<li>' + esc(s) + '</li>').join('') + '</ol></div>' +
      '<div class="sec"><h3>Make it better</h3><ul>' + t.tips.map(s => '<li>' + esc(s) + '</li>').join('') + '</ul></div>' +
      '<div class="sec"><h3>Mistakes to avoid</h3><ul>' + t.mistakes.map(s => '<li>' + esc(s) + '</li>').join('') + '</ul></div>' +
      '<div class="acts"><button class="btn primary" id="aPerform" type="button">Practice mode</button>' +
      (custom ? '' : '<button class="btn" id="aLearned" type="button" aria-pressed="' + state.learned.has(id) + '"></button>') +
      '<button class="btn" id="aPdf" type="button">Download PDF</button><button class="btn" id="aTxt" type="button">Download text</button></div>' +
      '<p class="msg" id="aMsg" role="status"></p>';
    const lb = $('#aLearned');
    if (lb) {
      const setL = () => { lb.textContent = state.learned.has(id) ? 'Learned. Tap to undo' : 'Mark as learned'; lb.setAttribute('aria-pressed', String(state.learned.has(id))); };
      setL();
      lb.onclick = () => { if (state.learned.has(id)) state.learned.delete(id); else state.learned.add(id); saveLearned(); setL(); render(); };
    }
    $('#aPerform').onclick = () => startPerform(t);
    $('#aPdf').onclick = () => download(t, 'pdf');
    $('#aTxt').onclick = () => download(t, 'txt');
    if (!(window.jspdf && window.jspdf.jsPDF)) $('#aPdf').hidden = true;
    $('#sheet').hidden = false; $('#sheet').scrollTop = 0;
    document.body.style.overflow = 'hidden';
    if (!custom && !fromHash && location.hash !== '#' + id) location.hash = id;
    $('#sClose').focus();
  }
  function closeTrick(fromHash) {
    if (!state.open) return;
    const was = state.open; state.open = null; $('#sheet').hidden = true; document.body.style.overflow = '';
    if (was !== 'video' && !fromHash && location.hash !== '#all') location.hash = 'all';
  }

  // ---------- practice mode ----------
  function slidesFor(t) {
    const s = [{ k: 'What the audience sees', x: t.effect }, { k: 'You need', x: t.props.length ? t.props.join(', ') : 'Nothing at all' }];
    t.steps.forEach((x, i) => s.push({ k: 'Step ' + (i + 1) + ' of ' + t.steps.length, x }));
    s.push({ k: 'Remember', x: t.tips[0] });
    return s;
  }
  function startPerform(t) { state.perf = { t, i: 0, s: slidesFor(t) }; $('#perform').hidden = false; drawPerform(); $('#pNext').focus(); }
  function drawPerform() {
    const p = state.perf, cur = p.s[p.i];
    $('#pName').textContent = p.t.name; $('#pKick').textContent = cur.k; $('#pText').textContent = cur.x;
    $('#pCount').textContent = (p.i + 1) + ' / ' + p.s.length; $('#pfill').style.width = ((p.i + 1) / p.s.length * 100) + '%';
    $('#pPrev').disabled = p.i === 0; $('#pNext').textContent = p.i === p.s.length - 1 ? 'Done' : 'Next';
  }
  function stepPerform(d) {
    const p = state.perf; if (!p) return;
    const n = p.i + d; if (n < 0) return;
    if (n >= p.s.length) { exitPerform(); return; }
    p.i = n; drawPerform();
  }
  function exitPerform() { state.perf = null; $('#perform').hidden = true; }

  // ---------- downloads ----------
  let dlNs = null;
  async function saveFile(filename, data) {
    if (dlNs) return dlNs.save({ filename, data });
    const blob = data instanceof Blob ? data : new Blob([data], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    return { status: 'saved' };
  }
  function textFor(t) {
    const L = [t.name.toUpperCase(), typeOf(t).label + ' | ' + LEVELS[t.level] + ' | ' + t.mins + ' min | Needs: ' + (t.props.join(', ') || 'nothing'), '',
      'WHAT THE AUDIENCE SEES', t.effect, '', 'THE SECRET', t.secret, '', 'HOW TO DO IT'];
    t.steps.forEach((s, i) => L.push((i + 1) + '. ' + s));
    L.push('', 'MAKE IT BETTER'); t.tips.forEach(s => L.push('- ' + s));
    L.push('', 'MISTAKES TO AVOID'); t.mistakes.forEach(s => L.push('- ' + s));
    return L.join('\n') + '\n';
  }
  const pdfSafe = s => String(s).replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2013\u2014]/g, '-').replace(/\u2026/g, '...').replace(/[^\x20-\x7E\u00A0-\u00FF]/g, '');
  function makePDF(t) {
    const doc = new window.jspdf.jsPDF({ unit: 'pt', format: 'letter', compress: true });
    const W = 612, H = 792, M = 58, CW = W - 2 * M; let y = M;
    const line = (s, size, style, x, w) => {
      doc.setFont('helvetica', style); doc.setFontSize(size);
      doc.splitTextToSize(pdfSafe(s), w).forEach(l => { if (y + size * 1.4 > H - M) { doc.addPage(); y = M; } y += size * 1.4; doc.text(l, x, y); });
    };
    const head = s => { y += 14; doc.setTextColor(150, 105, 10); line(s.toUpperCase(), 10, 'bold', M, CW); doc.setTextColor(30, 24, 38); y += 2; };
    doc.setTextColor(30, 24, 38);
    line(t.name, 26, 'bold', M, CW);
    doc.setTextColor(100, 92, 112); line(typeOf(t).label + '  |  ' + LEVELS[t.level] + '  |  ' + t.mins + ' min  |  Needs: ' + (t.props.join(', ') || 'nothing'), 10, 'normal', M, CW); doc.setTextColor(30, 24, 38);
    head('What the audience sees'); line(t.effect, 12, 'normal', M, CW);
    head('The secret'); line(t.secret, 12, 'normal', M, CW);
    head('How to do it');
    t.steps.forEach((s, i) => { const y0 = y; line(s, 12, 'normal', M + 22, CW - 22); doc.setFont('helvetica', 'bold'); doc.setFontSize(12); doc.text((i + 1) + '.', M, y0 + 12 * 1.4); y += 3; });
    head('Make it better'); t.tips.forEach(s => { const y0 = y; line(s, 12, 'normal', M + 16, CW - 16); doc.text('-', M + 3, y0 + 12 * 1.4); y += 3; });
    head('Mistakes to avoid'); t.mistakes.forEach(s => { const y0 = y; line(s, 12, 'normal', M + 16, CW - 16); doc.text('-', M + 3, y0 + 12 * 1.4); y += 3; });
    const n = doc.getNumberOfPages();
    for (let i = 1; i <= n; i++) { doc.setPage(i); doc.setFont('helvetica', 'normal'); doc.setFontSize(8); doc.setTextColor(130); doc.text('Up My Sleeve - page ' + i + ' of ' + n, W / 2, H - 28, { align: 'center' }); }
    return doc.output('blob');
  }
  async function download(t, kind) {
    const msg = $('#aMsg'); msg.textContent = 'Preparing...';
    try {
      const data = kind === 'pdf' ? makePDF(t) : textFor(t);
      await saveFile(t.name + ' - how to.' + kind, data);
      msg.textContent = 'Saved.';
    } catch (e) { msg.textContent = e && e.code === 'declined' ? '' : 'Could not save that file.'; }
  }

  // ---------- wiring ----------
  $('#grid').addEventListener('click', e => { const c = e.target.closest('[data-id]'); if (c) openTrick(c.dataset.id); });
  $('#sClose').addEventListener('click', () => closeTrick());
  $('#sheet').addEventListener('click', e => { if (e.target === $('#sheet')) closeTrick(); });
  $('#pExit').addEventListener('click', exitPerform);
  $('#pPrev').addEventListener('click', () => stepPerform(-1));
  $('#pNext').addEventListener('click', () => stepPerform(1));
  document.addEventListener('keydown', e => {
    if (state.perf) { if (e.key === 'ArrowRight') stepPerform(1); else if (e.key === 'ArrowLeft') stepPerform(-1); else if (e.key === 'Escape') exitPerform(); return; }
    if (e.key === 'Escape') closeTrick();
  });
  $('#q').addEventListener('input', e => { state.q = e.target.value; render(); });
  $('#lvl').addEventListener('change', e => { state.level = e.target.value; render(); });
  window.addEventListener('hashchange', () => { const id = location.hash.slice(1); if (byId(id)) { if (state.open !== id) openTrick(id, true); } else closeTrick(true); });
  if (window.claude && window.claude.use) window.claude.use('downloads').then(ns => { if (ns) dlNs = ns; }).catch(() => {});

  // ---------- explain a trick from a video ----------
  const V = { frames: [], url: null, sample: undefined, maxImages: 0, ctl: null, name: '' };
  const vmsg = t => { $('#vMsg').textContent = t; };
  const fmtT = x => Math.floor(x / 60) + ':' + String(Math.floor(x % 60)).padStart(2, '0');
  function waitFor(el, ev) { return new Promise((res, rej) => { const ok = () => { el.removeEventListener('error', bad); res(); }, bad = () => { el.removeEventListener(ev, ok); rej(new Error('video')); }; el.addEventListener(ev, ok, { once: true }); el.addEventListener('error', bad, { once: true }); }); }
  async function loadVideo(file) {
    if (!file) return;
    if (V.url) URL.revokeObjectURL(V.url);
    V.frames = []; V.name = file.name.replace(/\.[^.]+$/, '');
    $('#vWork').hidden = false; $('#vFrames').innerHTML = ''; $('#vGo').disabled = true; $('#vSheet').disabled = true;
    vmsg('Opening the video...');
    const vid = $('#vPlayer'); V.url = URL.createObjectURL(file); vid.src = V.url;
    try {
      if (vid.readyState < 1) await waitFor(vid, 'loadedmetadata');
      const dur = vid.duration;
      if (!isFinite(dur) || dur <= 0) throw new Error('video');
      const cap = Math.max(6, Math.min(V.maxImages || 12, 16));
      const n = Math.max(8, Math.min(cap, Math.round(dur)));
      const cv = document.createElement('canvas'), W = 640, ratio = (vid.videoHeight || 360) / (vid.videoWidth || 640);
      cv.width = W; cv.height = Math.round(W * ratio); const cx = cv.getContext('2d');
      for (let i = 0; i < n; i++) {
        const at = Math.min(dur - 0.05, dur * (i + 0.5) / n);
        vid.currentTime = at; await waitFor(vid, 'seeked');
        cx.drawImage(vid, 0, 0, cv.width, cv.height);
        const blob = await new Promise(r => cv.toBlob(r, 'image/jpeg', 0.82));
        V.frames.push({ blob, at, url: URL.createObjectURL(blob) });
        vmsg('Taking frames... ' + (i + 1) + ' of ' + n);
      }
      vid.currentTime = 0;
      $('#vFrames').innerHTML = V.frames.map(f => '<figure><img alt="Frame at ' + fmtT(f.at) + '" src="' + f.url + '"><figcaption>' + fmtT(f.at) + '</figcaption></figure>').join('');
      $('#vSheet').disabled = false;
      refreshVGo();
      if (dur > 120) vmsg('That video is long (' + fmtT(dur) + '). A short clip of just the trick works best.');
    } catch (e) { vmsg('This browser could not read that video. Try an MP4 or MOV.'); }
  }
  function refreshVGo() {
    const have = V.frames.length > 0;
    if (V.sample === undefined) { $('#vGo').disabled = true; if (have) vmsg('Frames ready. Checking that Claude is available...'); return; }
    if (!V.sample) { $('#vGo').hidden = true; if (have) vmsg('Frames ready. Claude cannot look at them on this website, so you can save them as one picture and ask an AI yourself. Open this page inside Claude to get the explanation here.'); return; }
    $('#vGo').disabled = !have; if (have) vmsg('Frames ready. Press the button to find out how it is done.');
  }
  function asList(v, max) { return (Array.isArray(v) ? v : []).map(x => String(x == null ? '' : x).trim()).filter(Boolean).slice(0, max); }
  function cleanTrick(j) {
    const type = TYPES.some(x => x.id === j.type) ? j.type : 'mind';
    const lv = Math.min(3, Math.max(1, Math.round(+j.level) || 2));
    const steps = asList(j.steps, 10);
    if (!steps.length) throw new Error('empty');
    return { id: 'video', custom: true, name: String(j.name || 'This trick').slice(0, 80), type, level: lv, mins: lv * 5, props: asList(j.props, 6),
      effect: String(j.effect || '').slice(0, 700), secret: String(j.secret || '').slice(0, 1200), steps,
      tips: asList(j.tips, 5), mistakes: asList(j.mistakes, 5), seen: asList(j.seen, 6),
      confidence: ['high', 'medium', 'low'].includes(j.confidence) ? j.confidence : 'low', unsure: String(j.unsure || '').slice(0, 400) };
  }
  async function explainVideo() {
    if (!V.sample || !V.frames.length) return;
    const go = $('#vGo'), stop = $('#vStop');
    const list = V.frames.slice(0, V.maxImages || 12);
    const note = $('#vNote').value.trim().slice(0, 400);
    const prompt = 'You are a friendly magic teacher. The attached images are ' + list.length + ' frames from one video of a person performing a magic trick, in time order, taken at these seconds: ' + list.map(f => f.at.toFixed(1)).join(', ') + '.' +
      (note ? ' The viewer says: "' + note.replace(/"/g, "'") + '".' : '') +
      ' Work out which trick this is and how it is most likely done. Only use what the frames show. If they do not show enough to be sure, say so and give the most likely method. Write for a beginner. Reply with ONLY a JSON object with these keys: ' +
      'name (short trick name), type (one of "cards", "coins", "everyday", "mind"), level (1, 2 or 3), props (array of things needed), effect (what the audience sees, 1 to 3 sentences), secret (the method, 2 to 4 sentences), steps (4 to 8 short steps to perform it), tips (2 to 4), mistakes (2 or 3), ' +
      'confidence ("high", "medium" or "low"), seen (2 to 4 things you noticed in the frames, each with its time in seconds), unsure (one sentence about what you could not tell, or an empty string). Use plain text only, no markdown.';
    V.ctl = new AbortController(); go.disabled = true; stop.hidden = false; vmsg('Watching the frames... this can take up to a minute.');
    try {
      const j = await V.sample.json(prompt, { images: list.map(f => f.blob), signal: V.ctl.signal, cache: false });
      const t = cleanTrick(j); vmsg('Done.'); openTrick(t);
    } catch (e) {
      const c = e && e.code;
      vmsg(c === 'cancelled' ? 'Stopped.' : c === 'not_granted' ? 'Claude was not allowed to look at the frames, so there is no explanation.' : c === 'rate_limited' ? 'Too many requests. Wait a minute and try again.' : 'Could not work this one out. Try a clearer, closer clip of just the trick.');
    } finally { go.disabled = false; stop.hidden = true; V.ctl = null; }
  }
  async function saveFramesPicture() {
    if (!V.frames.length) return;
    vmsg('Making the picture...');
    try {
      const imgs = await Promise.all(V.frames.map(f => new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = f.url; })));
      const cols = 3, tw = 480, th = Math.round(tw * imgs[0].height / imgs[0].width), pad = 8, lab = 22, rows = Math.ceil(imgs.length / cols);
      const cv = document.createElement('canvas'); cv.width = cols * (tw + pad) + pad; cv.height = rows * (th + lab + pad) + pad;
      const cx = cv.getContext('2d'); cx.fillStyle = '#fff'; cx.fillRect(0, 0, cv.width, cv.height); cx.font = '14px sans-serif'; cx.textBaseline = 'middle';
      imgs.forEach((im, i) => { const x = pad + (i % cols) * (tw + pad), y = pad + Math.floor(i / cols) * (th + lab + pad); cx.drawImage(im, x, y, tw, th); cx.fillStyle = '#222'; cx.fillText(fmtT(V.frames[i].at), x + 2, y + th + lab / 2); });
      const blob = await new Promise(r => cv.toBlob(r, 'image/png'));
      await saveFile((V.name || 'trick') + ' - frames.png', blob); vmsg('Saved.');
    } catch (e) { vmsg(e && e.code === 'declined' ? '' : 'Could not save the picture.'); }
  }
  $('#vPick').addEventListener('click', () => $('#vFile').click());
  $('#vFile').addEventListener('change', e => loadVideo(e.target.files && e.target.files[0]));
  const drop = $('#vdrop');
  ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', e => { const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]; if (f && /^video\//.test(f.type)) loadVideo(f); });
  $('#vGo').addEventListener('click', explainVideo);
  $('#vStop').addEventListener('click', () => { if (V.ctl) V.ctl.abort(); });
  $('#vSheet').addEventListener('click', saveFramesPicture);
  (async () => {
    try {
      const sm = window.claude && window.claude.use ? await window.claude.use('sample') : null;
      if (sm) { const lim = await sm.limits().catch(() => null); if (lim && lim.images) { V.maxImages = lim.images.maxCount || 0; V.sample = sm; } else V.sample = null; } else V.sample = null;
    } catch (e) { V.sample = null; }
    refreshVGo();
  })();

  buildChips(); render();
  { const id = location.hash.slice(1); if (byId(id)) openTrick(id, true); }
})();
