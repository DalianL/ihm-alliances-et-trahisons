using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using AssemblyCSharp;

public class PlayerObject : MonoBehaviour {
	private Player player;

	public Text pseudo;
	public Text planets;
	public Text fleets;

	void Awake() {
		this.pseudo.text = this.player.Pseudo;
		this.planets.text = this.player.Planets.Count.ToString();
		this.fleets.text = this.player.Fleets.Count.ToString();
	}

	void Update() {
		this.pseudo.text = this.player.Pseudo;
		this.planets.text = this.player.Planets.Count.ToString();
		this.fleets.text = this.player.Fleets.Count.ToString();
	}

	public void setPlayer(Player p) {
		this.player = p;
		this.pseudo.text = this.player.Pseudo;
		this.planets.text = this.player.Planets.Count.ToString();
		this.fleets.text = this.player.Fleets.Count.ToString();
	}
}