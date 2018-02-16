class Player {
  constructor(id, color, tagId) {
    this.id = id;
    this.color = color;
    this.tagId = tagId;
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

  lookForReadyShip(action) {
    // Action can be 'atk' (attack) / 'dfd' (defend) / 'mv' (move)
    for (let i = 0; i < this.spaceships.length; i += 1) {
      if (this.spaceships[i].actionStep === 2) {
        this.spaceships[i].triggerAction(this.tagId, action);
        break;
      }
    }
  }

}

export default Player;
