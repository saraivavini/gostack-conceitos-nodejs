const express = require("express");
const { uuid } = require("uuidv4");
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex > -1) { 
    const likes = repositories[repositoryIndex].likes;
    
    const repository = {
      id,
      title,
      url,
      techs,
      likes
    }
    
    repositories[repositoryIndex] = repository;
    
    return response.json(repository);
  } else {
    return response.status(400).json({ error: "Repository not found" });
  }

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex > -1) {
    repositories.splice(repositoryIndex, 1);
    
    return response.status(204).send();
  
  } else {
    return response.status(400).json({ error: "Repository not found" });

  }
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex > -1) {
    const { id, title, url, techs, likes } = repositories[repositoryIndex];
    
    const repository = {
      id,
      title,
      url,
      techs,
      likes: likes+1
    }
    
    repositories[repositoryIndex] = repository;

    return response.json(repository);
  
  } else {
    return response.status(400).json({ error: "Repository not found" });
  }

});

module.exports = app;
