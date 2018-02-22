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
	public bool isSet = false;

	void Update() {
		if (isSet) {
			this.pseudo.text = this.player.Pseudo;
			this.pseudo.color = this.player.getColor ();
			this.planets.text = this.player.Planets.Count.ToString ();
			this.fleets.text = this.player.Fleets.Count.ToString ();
		} else {
			this.pseudo.text = "";
			this.planets.text = "";
			this.fleets.text = "";
		}
	}

	public void setPlayer(Player p) {
		this.isSet = true;
		this.player = p;
		this.pseudo.text = this.player.Pseudo;
		this.pseudo.color = this.player.getColor ();
		this.planets.text = this.player.Planets.Count.ToString();
		this.fleets.text = this.player.Fleets.Count.ToString();
	}
}