class Player {
  constructor(id, color, tagId1, tagId2) {
    this.id = id;
    this.color = color;
    this.tagId1 = tagId1;
    this.tagId2 = tagId2;
    this.spaceships = [];
    this.planets = [];
    this.ressources = [];
  }

  addSpaceship(spaceship) {
    this.spaceships.push(spaceship);
  }

  addPlanet(planet) {
    this.planets.push(planet);
  }

}

export default Player;
