using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using AssemblyCSharp;

public class ProfilController : PanelController {

	public Button quitButton;

	public Image avatar;
	public Image color;
	public Text pseudo;
	public Text resources;

	public override void initialize() {
		if (!this.initialized) {
			this.initialized = true;
		}

		//this.avatar = "truc";
		this.color.color = Player.CurrentPlayer.getColor();
		this.pseudo.text = Player.CurrentPlayer.Pseudo;
		this.resources.text = "Ressources ...";
	}

	public void back() {
		this.panelManager.showScreen (PanelEnum.GAME);
	}


}