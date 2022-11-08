import weaviate from 'weaviate-client'

const client = weaviate.client({
    scheme: 'https',
    host: 'plants.semi.network',
    headers: {
        'X-OpenAI-Api-Key': process.env.NEXT_PUBLIC_OPENAI_API_KEY
    }
});

export const weaviateMagic = (keyword, setPlants, setIsSearching) => {
    setIsSearching(true)
    client.graphql
    .get()
    .withNearText({
        concepts: [keyword],
        certainty: 0.7
    })
    .withClassName("Plants")
    .withFields('name alternateName sowInstructions spaceInstructions harvestInstructions compatiblePlants avoidInstructions culinaryHints url imageLinks')
    .withLimit(100)
    .do()
    .then((res) => {
        console.log('res', res)
        setPlants(res.data.Get.Plants)
        setIsSearching(false)
    })
    .catch((err) => {
        console.log(err)
    })
}