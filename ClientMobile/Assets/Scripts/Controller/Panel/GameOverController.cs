using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using AssemblyCSharp;

public class GameOverController : PanelController {

	// Win 
	public GameObject panelWin;
	public Image avatarWin;
	public Image colorWin;
	public Text pseudoWin;

	// Loose
	public GameObject panelLoose;
	public Image avatarLoose;
	public Image colorLoose;
	public Text pseudoLoose;
	public Text TextLoose;

	public List<Sprite> images = new List<Sprite>();

	public override void initialize(Player winner) {
		if (!this.initialized) {
			this.initialized = true;
		}
		Debug.Log (winner.Id);
		if (winner.Equals(Player.CurrentPlayer)) {
			this.colorWin.color = winner.getColor ();
			this.avatarWin.sprite = images [SpeciesEnumHelper.ToInt (winner.Specie)];
			this.pseudoWin.text = winner.Pseudo;
			this.panelWin.SetActive (true);
			this.panelLoose.SetActive (false);
		} else {
			this.colorLoose.color = winner.getColor ();
			this.avatarLoose.sprite = images [SpeciesEnumHelper.ToInt (winner.Specie)];
			this.pseudoLoose.text = winner.Pseudo;
			this.TextLoose.text = winner.Pseudo + " a conquis la majorité des planètes du système.";
			this.panelWin.SetActive (false);
			this.panelLoose.SetActive (true);
		}

	}
}