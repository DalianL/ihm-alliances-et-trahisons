using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using AssemblyCSharp;

public class PanelManager : MonoBehaviour {

	public PanelView panel_Login;
	public PanelView panel_MatchMaking;
	public PanelView panel_Profil;
	public PanelView panel_Game;
	public PanelView panel_Map;
	public PopupView panel_Error;

	private PanelEnum currentPanel;
	private PanelEnum lastPanel;

	void Start() {
		this.currentPanel = PanelEnum.LOGIN;
		this.lastPanel = PanelEnum.LOGIN;

		showScreen (PanelEnum.LOGIN);
	}

	void Update() {
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