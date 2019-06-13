# JapaneseFlashCards
Users can learn 99 common Japanese phrases, revising those that they struggle with. 


As a user, I should be able to say, 1min, 10min, 1 day to show whether I need to see it again

As a user, I should first see the Japanese, then the translation

As a user, I should see how long my current session is and how many cards I have revised.

As a user, I should be able to hear an audio clip of the phrases (from SoundCloud)


#Implementation 

How it works

1) go through the untested. Update stats accordingly.
2) go through the bad. until no more. Updating stats.
3) go through ok, good.
4) When all is excellent. Finished!


Card example: 

card_list = [
    {
        english-text: 'It’s Good',
        japanese-text: 'いいですよ',
        audio-link: <iframe width="100%" height="265" src="https://clyp.it/ifpttjmu/widget" frameborder="0"></iframe>,
        difficulty-rating: 1,
        card-order: 1
    },
    {
        english-text: 'It’s Bad',
        japanese-text: 'だめです',
        audio-link: <iframe width="100%" height="265" src="https://clyp.it/ifpttjmu/widget" frameborder="0"></iframe>,
        difficulty-rating: 1,
        card-order: 1
    }
];
Stats = 
    {
        untested-total: 99,
        bad-total: 0,
        ok-total: 0,
        good-total: 0,
        excellent-total: 0
    }
