<div align="center">
<h1 style="color:#3271D6">Project <span style="color:#F59E0B">Title</span></h1>
</div>

$${\color{white}Connecting\space \color{#3271D6}you \space \color{white}with \space \color{#F59E0B}your \space \color{white}passions}$$

Planning a trip and need to keep track of all your vacation activities? Or maybe you just like to be in the know with local entertainment. With {this app} you can search and keep all your fun events in one place!

## 🗺️ Navigate To:

- [<code>📦 Getting Started</code>](#-getting-started)
- [<code>🚀 Deployment</code>](#-deployment)
- [<code>🔧 Built With</code>](#-built-with)
- [<code>📜 Authors</code>](#-authors)
- [<code>📝 License</code>](#-license)
- [<code>🥂 Acknowledgments</code>](#-acknowledgments)

## 📦 Getting Started

$${\color{#3271D6}Start \space \color{#F59E0B}App}$$

### Backend

To deploy this app locally, find our [backend codebase here](https://github.com/Code-the-Dream-School/hh-team1-back).

### Prerequisites

You will need a few environment variables to get this running. Create a `.env` file in both the backend folder and the frontend folder.

Here are the required keys:

For the backend:

```s
TICKETMASTER_API_KEY=YOUR_TICKETMASTER_KEY
MONGO_URI=YOUR_MONGO_DB_KEY
JWT_LIFETIME=YOUR_JWT_TOKEN_KEY
JWT_SECRET=YOUR_JWT_TOKEN_KEY
PORT=YOUR_LOCAL_PORT_NUMBER
JWT_SECRET_CSRF=YOUR_CSRF_KEY
```

For the frontend:

```
VITE_API_BASE_URL=YOUR_LOCAL_HOST_AND_PORT_NUMBER_ROUTE
```

### Installing

In both the backend and the frontend folders you will need to run `npm i` to install the dependencies.

## 🚀 Deployment

$${\color{#3271D6}Deploy \space \color{#F59E0B}Fast}$$

To deploy this app live, you will need to:

1. Deploy your backend folder.
2. Change the frontend `VITE_API_BASE_URL` key's value to the live backend URL.
3. Deploy your frontend folder.

## 🔧 Built With

$${\color{#3271D6}The \space \color{#F59E0B}Tools}$$

- [React](https://www.react.dev/) - Frontend Javascript library
- [Vite](https://www.vite.dev/) - Frontend build tool
- [MongoDB](https://www.mongodb.com/) - Backend database
- [Express](https://www.express.js.com/) - Backend framework for Node.js

## 📜 Authors

$${\color{#3271D6}Our \space \color{#F59E0B}Team}$$

### Frontend

- **Uma Sekar** - _frontend developer_ - [Uma's Github](https://github.com/umavenki)
- **Nihal Erdal** - _frontend developer_ - [Nihal's Github](https://github.com/nihalerdal)
- **Stu MacLeod** - _frontend developer_ - [Stu's Github](https://github.com/StuvaScript)
- **Maria Domarkas** - _frontend developer_ - [Maria's Github](https://github.com/tobemari)

### Backend

- **Amanda Hockmuth** - _backend developer_ - [Amanda's Github](https://github.com/AmandaHockmuth)
- **Sisi Wang** - _backend developer_ - [Sisi's Github](https://github.com/Sisi-tech)

## 📝 License

$${\color{#3271D6}Legal \space \color{#F59E0B}Stuff}$$

This project is licensed under the MIT License - see [MIT License](https://choosealicense.com/licenses/mit/) for details

## 🥂 Acknowledgments

$${\color{#3271D6}Thank \space \color{#F59E0B}You}$$

- Our amazing mentors who helped guide us along the way!

  - **Josh Goldenburg** - _mentor_ - [Josh's Github](https://github.com/jgoldenberg29)
  - **Katherine Lashcheuskaya** - _mentor_ - [Katherine's Github](https://github.com/katsiarynalashcheuskaya)
  - **Rebeca Vassoler Gallo** - _mentor_ - [Rebeca's Github](https://github.com/rebs1203)

- **Code The Dream** for creating this learning environment! - [CTD's Website](https://codethedream.org/about/?gad_source=1&gclid=Cj0KCQiAkJO8BhCGARIsAMkswyhD-TGXrjzFbUD-t93qmowxUl8S1cjXjHtNmaY3OG2AGoiSjUAI9EAaAky0EALw_wcB)
