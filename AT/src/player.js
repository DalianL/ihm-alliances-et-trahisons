class Player {
  constructor(id, color) {
    this.id = id;
    this.color = color;
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
