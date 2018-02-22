using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using AssemblyCSharp;

public class MatchMakingController : PanelController {

	public Button quitButton;
	public List<PlayerController> playerContollers = new List<PlayerController>();
	public GameObject title;
	public GameObject text;
	public bool isBegin = false;
	public bool isBeginned = false;

	void Start() {
		initialize ();
	}

	public virtual void initialize() {
		if (!this.initialized) {
			this.initialized = true;
			this.isBeginned = false;
			this.isBegin = false;
		}
		this.title.SetActive (true);
		this.text.SetActive (false);
		initPlayers();
	}

	void Update() {
		updatePlayers ();

		if(this.isBegin) {
			this.isBegin = false;
			this.isBeginned = true;
			play ();
		}
	}

	private void initPlayers() {
		foreach(PlayerController player in playerContollers) {
			player.initProfil ();
		}
	}

	private void updatePlayers() {
		int i = 0;
		foreach(PlayerController player in playerContollers) {
			if (Session.IsInitializedCurrentSession && Player.IsInitializedCurrentPlayer) {
				if (i < Session.CurrentSession.Players.Count) {
					player.setProfil (Session.CurrentSession.Players [i]);
					i++;
				} else {
					return;
				}
			}
		}
	}

	public void back() {
		this.panelManager.showScreen (PanelEnum.LOGIN);
	}

	public void play() {
		#if UNITY_IPHONE || UNITY_ANDROID
			Handheld.Vibrate ();
		#endif
		StartCoroutine ("load");
	}
		
	IEnumerator load() {
		this.title.SetActive (false);
		this.text.SetActive (true);
		for(int i= 0; i < 10; i++) {
			this.text.GetComponent<Text> ().text = "La partie commence dans " + (10 - i).ToString() + (10 - i > 1 ? " secondes." : " seconde.");
			yield return new WaitForSeconds (1);
		}
		this.panelManager.showScreen (PanelEnum.GAME);
	}

}
