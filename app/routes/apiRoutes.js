

var friends = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        console.log('this made it:', req.body)


        // if you used services
        // match = friends.mathWitchFriend(req.body);

        var person = req.body;

        // loop thru current friends
        var bestMatch;
        for (let i = 0; i < friends.length; i++) {
            // loop thru scores for each answer
            var matchingScores = []
            for (let j = 0; j < person.scores.length; j++) {
                console.log('checking friend: ', friends[i].name)
                // subtract persons answer by friends corresponding answer
                var currentAnswer = Math.abs(person.scores[j] - friends[i].scores[j]);
                console.log('current answer is: ', currentAnswer)
                // store that in an empty array 10, array of match scores
                matchingScores.push(currentAnswer)
            }
            console.log('my matches: ', matchingScores)
            // use reduce or someth to accumulate the score
            var difference = matchingScores.reduce(function (acc, val) { return acc += val })
            console.log('this difference is: ', difference)
            // store the smallest difference
            if (i === 0) {
                console.log('this is the first entry')
                // save the best matches name
                bestMatch = {
                    name: friends[i],
                    score: difference
                }
                console.log('first match is: ', bestMatch)
            } else {
                console.log('im going to make a comparison to: ', bestMatch)
                // if the new diff is smaller than the old differ
                if (difference < bestMatch.score) {
                    // reassign the new diff as the diff
                    // save the best matches name
                    bestMatch = {
                        name: friends[i],
                        score: difference
                    }
                    console.log('this person is better: ', bestMatch)
                } else {
                    // else nothing
                    console.log('this person didnt make the cut')
                }
            }
        }

        // display match
        console.log(bestMatch);
        friends.push(req.body);
        res.json(bestMatch);
    });
};