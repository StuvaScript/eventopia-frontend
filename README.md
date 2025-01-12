# Project Title

Planning a trip and need to keep track of all your vacation activities? Or maybe you just like to be in the know with local entertainment. With {this app} you can search and keep all your fun events in one place!

## Getting Started

To deploy this app locally, find our [backend codebase here](https://github.com/Code-the-Dream-School/hh-team1-back).

type

### Prerequisites

You will need a few environment variables to get this running. Create a `.env` file in both the backend folder and the frontend folder.

Here are the required keys:

For the backend:

```
TICKETMASTER_API_KEY=YOUR_TICKETMASTER_KEY
MONGO_URI=YOUR_MONGO_DB_KEY
JWT_LIFETIME=YOUR_JWT_TOKEN_KEY
JWT_SECRET=YOUR_JWT_TOKEN_KEY
PORT=YOUR_LOCAL_PORT_NUMBER
```

For the frontend:

```
VITE_API_BASE_URL=YOUR_LOCAL_HOST_AND_PORT_NUMBER_ROUTE
```

### Installing

In both the backend and the frontend folders you will need to run `npm i` to install the dependencies.

## Deployment

To deploy this app live, you will need to:

1. Deploy your backend folder.
2. Change the frontend `VITE_API_BASE_URL` key's value to the live backend URL.
3. Deploy your frontend folder.

## Built With

- [React](https://www.react.dev/) - Frontend Javascript library
- [Vite](https://www.vite.dev/) - Frontend build tool
- [MongoDB](https://www.mongodb.com/) - Backend database
- [Express](https://www.express.js.com/) - Backend framework for Node.js

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **Billie Thompson** - _Initial work_ - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://choosealicense.com/licenses/mit/) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
