import { useState } from "react";
import githubLogo from "../assets/github.png";
import Input from "../components/Input";
import Button from "../components/Button";
import ItemRepo from "../components/ItemRepo";
import { api } from "../services/api";

import { Container } from "./styles";

function App() {
  const [currentRepo, setCurrentRepo] = useState("");
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    await api
      .get(`repos/${currentRepo}`)
      .then((value) => value.data)
      .then((data) => {
        const isExists = repos.find((repo) => repo.id === data.id);
        if (!isExists) {
          setRepos((prev) => [...prev, data]);
        } else {
          alert("Repositório já adicionado");
        }
        setCurrentRepo("");
      })
      .catch((e) => {
        alert(`Erro ao buscar repositório: ${e}`);
        setCurrentRepo("");
      });
  };

  const handleRemoveRepo = (id) => {
    setRepos(repos.filter((repo) => repo.id !== id));
  };

  return (
    <Container>
      <img src={githubLogo} width={72} height={72} alt="github" />
      <Input
        value={currentRepo}
        onChange={(e) => setCurrentRepo(e.target.value)}
      />
      <Button onClick={handleSearchRepo} />
      {repos.map((repo) => (
        <ItemRepo repo={repo} handleRemoveRepo={handleRemoveRepo} />
      ))}
    </Container>
  );
}

export default App;
