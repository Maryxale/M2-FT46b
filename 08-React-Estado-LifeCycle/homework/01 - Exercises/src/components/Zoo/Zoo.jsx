import React from "react";
import Animals from "../Animals/Animals";
import Species from "../Species/Species";
import styledZoo from "./Zoo.module.css";

export default function Zoo() {
  /* Escribe acá tu código */
  const [zoo, setZoo] = React.useState({
    zooName: '',
    animals:[],
    species:[],
    allAnimals:[]
  })

  function handleInputChange(evento){
    setZoo({...zoo, zooName:evento.target.value})
  }

  function hadleSpeies(evento){
    setZoo({
      ...zoo,
     animals:zoo.allAnimals.filter((animal)=> animal.specie === evento.target.value) 
    })
  }

  function handleAllSpecies(){
    setZoo({
      ...zoo,
      animals:zoo.allAnimals

    })

  }

  React.useEffect(() =>{
    fetch('http://localhost:3001/zoo')
    .then((res)=> res.json()) 
    .then((data)=>{
      setZoo({
        ...zoo,
        animals:data.animals,
        species:data.species,
        allAnimals:data.animals,
      })
    })
  },[])

  return (
    <div className={styledZoo.divContent}>
      <div className={styledZoo.divContentTitle}>
      <label htmlFor="zooName">Zoo Name:</label>
      <input type="text" id="zooName" value={zoo.zooName} onChange={handleInputChange} />
      <h1 className={styledZoo.title}>{zoo.zooName}</h1>
      </div>
      <Species species={zoo.species} handleSpecies={hadleSpeies} handleAllSpecies={handleAllSpecies} />
      <Animals animals={zoo.animals}/>
    </div>
  );
}
