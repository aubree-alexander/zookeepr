const express = require('express');
const app = express();
const { animals } = require('./data/animals');




function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];

    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        //save personalitytraits as a designated array
        //if personalitytraits is a string, place it into  new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        //loop through each trait in the personalitytraits array:
        personalityTraitsArray.forEach(trait => {
            //check the trait against each animal in the filteredresults array
            //it is initially a copy of the animalsArray, but here we're updatingi t for each trait in the forEach() loop. For each trait being targeted by the filter, the filteredResults array will then contain only the entries that contain the trait, so at the end we'll have an array of animals that have every one of th traits when the .foreach() loop is finisihed.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    //return the filtered results:
    return filteredResults;
}

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json('results');
})


app.listen(3001, () => {
    console.log(`API server now on port 3001!`)
});