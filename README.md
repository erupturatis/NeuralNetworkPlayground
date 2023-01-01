<h1 align="center">🚀 NeuralNetworkPlayground</h1>
<div align="center">A better way of visualzing neural networks</div>

# Overview

As the title implies, this is a website made in order to help visualize neural network in the process of training and backpropagating. You can currently:

- #### Create any neural network with any arhitecture
- #### Upload your own custom datasets
- #### Visualize the training and being able to replay previous epochs
- #### Save your model + training and loading it later
- #### Optimze network parameters and hyperparameters
- #### Change the cosmetics of how the network is displayed

## Looks

![App Screenshot](https://cdn.discordapp.com/attachments/864542134391275543/1058054290326966392/image.png)

### Note !

#### This website was meant as a pet project so it might still have a lot of bugs. If you like this project and want to make it better feel free to open an issue or submit a PR.

## Roadmap

- Adding more activation function
- Adding Regularization
- Only doing forward propagation for the current network
- Visualizing the output neurons relation to input data on a 2d graph similar to [here](https://playground.tensorflow.org/#activation=tanh&batchSize=10&dataset=circle&regDataset=reg-plane&learningRate=0.03&regularizationRate=0&noise=0&networkShape=4,2&seed=0.71560&showTestData=false&discretize=false&percTrainData=50&x=true&y=true&xTimesY=false&xSquared=false&ySquared=false&cosX=false&sinX=false&cosY=false&sinY=false&collectStats=false&problem=classification&initZero=false&hideText=false)
- Being able to modify individual weights and neurons and deactivate
- Extending the website to [CNN](https://en.wikipedia.org/wiki/Convolutional_neural_network) or [RNN](https://en.wikipedia.org/wiki/Recurrent_neural_network) arhitectures
- A lot more

## Contributing

### Tech Stack

**Client:** React, Redux, TailwindCSS, Vite

**Server:** Node, Express

#### To start just clone the repo

- If you want to contribute to the frontend just run `npm install` in the client folder and then`npm run dev`. You will only need a `VITE_API_URL` variable in your .env file if you want to work with the server too.
- If you want to contribute to the backend run `npm install` in the server folder and then`npm run dev`. You will need the env file with the following

```
GITHUB_CLIENT_ID = ''
GITHUB_CLIENT_SECRET = ''
PORT = ''
SECRET =''
MONGO_URI = "mongodb+srv://username:<password>@cluster0.wudiukh.mongodb.net/?retryWrites=true&w=majority"
MONGO_PASSWORD = ''
GOOGLE_CLIENT_ID = ''
GOOGLE_CLIENT_SECRET = ''
CLIENT_URL = ''
SERVER_URL = ''
```

and set up the oauth services properly. If you have any issues running the project just open a new issue and I will help you as fast as I can

### Apart from this, I hope you like the website!
