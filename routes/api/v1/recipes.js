
const router = require('express').Router()
const recipes = require('../../../data/recipes.json')

router.get('/api/v1/', (_, response) => {
    const summaries = recipes.map(recipe => {
        const { id, title, image, prepTime, difficulty } = recipe
        return { id, title, image, prepTime, difficulty }
    })

    response.send(summaries)
})

router.post('/api/v1/recipe/add', (request, response) => {
    const id = recipes.length + 1
    const recipe = request.body
    const newRecipe = { id, ...recipe }
    recipes.push(newRecipe)
    response.send(newRecipe)
})

router.get('/api/v1/recipe/:id', (request, response) => {
    const { id } = request.params
    const found = recipes.find(recipe => recipe.id.toString() === id)
    if (found) return response.send(found)

        response.status(400).send({ error: `Couldnt find the recipe ${id}`})
})



module.exports = router