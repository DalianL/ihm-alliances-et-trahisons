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
	public PanelView panel_Map;
	public PopupView panel_Error;

	public GameObject time;

	private PanelEnum currentPanel;
	private PanelEnum lastPanel;

	void Start() {
		this.currentPanel = PanelEnum.LOGIN;
		this.lastPanel = PanelEnum.LOGIN;

		showScreen (PanelEnum.LOGIN);
	}

	void Update() {
		if (Session.IsInitializedCurrentSession && keepTime()) {
			if (Session.CurrentSession.Time != 0) {
				long timer = (long) ((Session.CurrentSession.Time/1000) - DateTime.UtcNow.Subtract (new DateTime (1970, 1, 1)).TotalSeconds);
				this.time.GetComponent<Text>().text = "0" + timer / 60 + ":" + ((timer % 60 < 10) ? "0" : "") + timer % 60 + "\n"
				+ "Prochaine extraction";
			} else {
				this.time.GetComponent<Text>().text = "02:00\nProchaine extraction";
			}
			this.time.SetActive (true);
		} else {
			this.time.SetActive (false);
		}
	}

	public void showScreen(PanelEnum panel) {
		showLogin (panel == PanelEnum.LOGIN);
		showMatchMaking (panel == PanelEnum.MATCHMAKING);
		showProfil (panel == PanelEnum.PROFIL);
		showGame (panel == PanelEnum.GAME);
		showMap (panel == PanelEnum.MAP);

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

	private void showGame(bool show) {
		this.panel_Game.show (show);
	}	

	private void showMap(bool show) {
		this.panel_Map.show (show);
	}	

	public void showError(bool show, string str) {
		this.panel_Error.show (show, str);
	}

	public void back() {
		showScreen (lastPanel);
	}

}