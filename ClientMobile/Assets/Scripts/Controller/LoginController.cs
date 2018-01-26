using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using AssemblyCSharp;

public class LoginController : PanelController {

	public Button quitButton;
	public Button QRCodeButton;
	public Button loginButton;

	public GameObject QR_CodePanel;

	public InputField pseudo;
	public InputField ip;

	public override void initialize() {
		if (!this.initialized) {
			this.initialized = true;
		}

		this.QR_CodePanel.SetActive (false);
		this.pseudo.text = "";
		this.ip.text = "";
	}

	public void back() {
		//this.panelManager.showScreen (PanelEnum.LOGIN);
	}

	public void showQR_Code() {
		if (this.pseudo.text == "")
			this.panelManager.showError (true, "Attention ! Vous devez d'abords rentrer votre pseudo avant de scanner le QR Code.");
		else 
			this.QR_CodePanel.SetActive (true);
	}

	public void login() {
		if (this.ip.text == "")
			this.panelManager.showError (true, "Attention ! Vous devez d'abords scanner le QR Code.");
		else {
			this.QR_CodePanel.SetActive (false);
			this.panelManager.showScreen (PanelEnum.GAME);
		}
	}
}
