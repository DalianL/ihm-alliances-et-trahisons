using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using AssemblyCSharp;
using System;

public class PanelManager : MonoBehaviour {

	public PanelView panel_Login;
	public PanelView panel_MatchMaking;
	public PanelView panel_Profil;
	public PanelView panel_Game;
	public PanelView panel_Message;
	public PanelView panel_End;
	public PopupView panel_Error;
	public PopupView panel_Popup;

	public GameObject time;

	private PanelEnum currentPanel;
	private PanelEnum lastPanel;

	private bool needUpdate;
	private string text;
	private string pseudo;
	private Color32 color;

	void Start() {
		this.currentPanel = PanelEnum.LOGIN;
		this.lastPanel = PanelEnum.LOGIN;
		showScreen (PanelEnum.LOGIN);
		this.needUpdate = false;
		this.text = "";
		this.pseudo = "";
		this.color = new Color32(255,255,255,255);
	}

	void Update() {
		if (Session.IsInitializedCurrentSession && keepTime ()) {
			if (Session.CurrentSession.Time != 0) {
				long timer = (long)((Session.CurrentSession.Time / 1000) - DateTime.UtcNow.Subtract (new DateTime (1970, 1, 1)).TotalSeconds);
				this.time.GetComponent<Text> ().text = "0" + timer / 60 + ":" + ((timer % 60 < 10) ? "0" : "") + timer % 60 + "\n"
				+ "Prochaine extraction";
			} else {
				this.time.GetComponent<Text> ().text = "02:00\nProchaine extraction";
			}
			this.time.SetActive (true);
		} else {
			this.time.SetActive (false);
		}

		if (needUpdate) {
			this.needUpdate = false;
			showPopup (true, this.text, this.pseudo, this.color);
		}
	}

	public void showScreen(PanelEnum panel) {
		showLogin (panel == PanelEnum.LOGIN);
		showMatchMaking (panel == PanelEnum.MATCHMAKING);
		showProfil (panel == PanelEnum.PROFIL);
		showMessage (panel == PanelEnum.MESSAGE);
		showGame (panel == PanelEnum.GAME);

		this.lastPanel = currentPanel;
		this.currentPanel = panel;
	}

	private bool keepTime() {
		if (this.currentPanel == PanelEnum.LOGIN || this.currentPanel == PanelEnum.MATCHMAKING)
			return false;
		else
			return true;
	}

	private void showLogin(bool show) {
		this.panel_Login.show (show);
	}	

	private void showMatchMaking(bool show) {
		this.panel_MatchMaking.show (show);
	}	

	private void showProfil(bool show) {
		this.panel_Profil.show (show);
	}	

	private void showMessage(bool show) {
		this.panel_Message.show (show);
	}	

	private void showGame(bool show) {
		this.panel_Game.show (show);
	}	

	public void showEnd(bool show) {
		this.panel_End.show (show);
	}	

	public void showError(bool show, string str) {
		this.panel_Error.show (show, str);
	}

	public void editPopup(string str, string pseudo, Color32 color) {
		this.text = str;
		this.pseudo = pseudo;
		this.color = color;
		this.needUpdate = true;
	}

	public void showPopup(bool show, string str, string pseudo, Color32 color) {
		this.panel_Popup.show (show, str, pseudo, color);
	}

	public void back() {
		showScreen (lastPanel);
	}

}