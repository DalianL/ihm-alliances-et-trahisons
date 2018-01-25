using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using AssemblyCSharp;

public class GameController : PanelController {

	public Button quitButton;
	public Button ProfilButton;
	public Button MessageButton;

	public void back() {
		this.panelManager.showScreen (PanelEnum.LOGIN);
	}

	public void goToProfil() {
		this.panelManager.showScreen (PanelEnum.PROFIL);
	}

	public void goToMessage() {
		//this.panelManager.showScreen (PanelEnum.MESSAGE);
	}
}
