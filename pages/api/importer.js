import weaviate from 'weaviate-client'
import data from '../../plants.json'

export default async function handler(req, res){
    const client = weaviate.client({
        scheme: 'http',
        host: 'localhost:3000',
        headers: {
            'X-OpenAI-Api-Key': process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        }
    });
    

    const plant_class_schema = {
        "class": "Plants",
        "description": "Various Info about plants",
        vectorizer: "text2vec-openai",
        moduleConfig: {
            "text2vec-openai": {
                "model": "babbage",
                "type": "text"
            }
        },
        "properties": [
            {
                "dataType": ["string"],
                "name": "name",
                "description": "The name of the plant", 
                moduleConfig: {
                    "text2vec-openai": {
                        skip: false,
                        vectorizePropertyName: false,
                    },
                },
            },
            {
                "dataType": ["string"],
                "name": "alternateName",
                "description": "The alternate name of the plant", 
                moduleConfig: {
                    "text2vec-openai": {
                        skip: false,
                        vectorizePropertyName: false,
                    },
                },
            },
            {
                "dataType": ["string"],
                "name": "sowInstructions",
                "description": "Sowing instruction of the plant", 
                moduleConfig: {
                    "text2vec-openai": {
                        skip: false,
                        vectorizePropertyName: false,
                    },
                },
            },
            {
                "dataType": ["string"],
                "name": "spaceInstructions",
                "description": "Spacing instruction of the plant", 
                moduleConfig: {
                    "text2vec-openai": {
                        skip: false,
                        vectorizePropertyName: false,
                    },
                },
            },
            {
                "dataType": ["string"],
                "name": "harvestInstructions",
                "description": "Harvesting instruction of the plant", 
                moduleConfig: {
                    "text2vec-openai": {
                        skip: false,
                        vectorizePropertyName: false,
                    },
                },
            },
            {
                "dataType": ["string"],
                "name": "compatiblePlants",
                "description": "Compatible with (can grow beside) of the plant", 
                moduleConfig: {
                    "text2vec-openai": {
                        skip: false,
                        vectorizePropertyName: false,
                    },
                },
            },
            {
                "dataType": ["string"],
                "name": "avoidInstructions",
                "description": "Avoiding instruction of the plant", 
                // moduleConfig: {
                //     "text2vec-openai": {
                //         skip: false,
                //         vectorizePropertyName: false,
                //     },
                // },
            },
            {
                "dataType": ["string"],
                "name": "culinaryHints",
                "description": "Culinary instruction of the plant", 
                // moduleConfig: {
                //     "text2vec-openai": {
                //         skip: false,
                //         vectorizePropertyName: false,
                //     },
                // },
            },  
            {
                "dataType": ["string"],
                "name": "culinaryPreservation",
                "description": "Culinary Preservation of the plant", 
                // moduleConfig: {
                //     "text2vec-openai": {
                //         skip: false,
                //         vectorizePropertyName: false,
                //     },
                // },
            },
            {
                "dataType": ["string"],
                "name": "url",
                "description": "url link of the plant", 
                // moduleConfig: {
                //     "text2vec-openai": {
                //         skip: false,
                //         vectorizePropertyName: false,
                //     },
                // },
            },
            {
                "dataType": ["string"],
                "name": "imageLinks",
                "description": "Image link of the plant", 
              
            },
        ]
    }

    try {
        const result = await client.schema.classCreator().withClass(plant_class_schema).do();
        console.log(result);
      } catch (err) {
        console.error(err);
      }
    
      // get and print the schema
      try {
        const result = await client.schema.getter().do();
        res.json(result);
      } catch (err) {
        res.status(500).json({});
      }

      const importArr = []

       data.map(plantInfo => {
        const importedPlantData = {
            class: "Plants",
            vectorizer: "text2vec-openai",
            moduleConfig: {
            "text2vec-openai": {
            model: "babbage",
            type: "text",
            },
            },
            properties: {
            'name': plantInfo.name,
            'alternateName': plantInfo.alternateName,
            'sowInstructions':plantInfo.sowInstructions,
            'spaceInstructions': plantInfo.spaceInstructions,
            'harvestInstructions': plantInfo.harvestInstructions,
            'compatiblePlants':plantInfo.compatiblePlants,
            'avoidInstructions': plantInfo.avoidInstructions,
            'culinaryHints': plantInfo.culinaryHints,
            'culinaryPreservation': plantInfo.culinaryPreservation,
            'url': plantInfo.url,
            'imageLinks': plantInfo.imageLinks
            }
        }

        importArr.push(importedPlantData)
      })

      console.log('importArr', importArr)

      client.batch
        .objectsBatcher()
        .withObject(importArr)
        .do()
        .then((res) => {
            console.log('res', res)
        })
        .catch((err) => {
            console.log(err)
        })
}