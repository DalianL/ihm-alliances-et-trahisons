using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using AssemblyCSharp;

public class GameOverController : PanelController {

	public Image titleWin;
	public Image titleLoose;

	public List<PlayerObject> players;

	public override void initialize() {
		if (!this.initialized) {
			this.initialized = true;
		}

		if (Player.CurrentPlayer.Id == Session.CurrentSession.giveWinner().Id) {
			this.titleWin.gameObject.SetActive (true);
			this.titleLoose.gameObject.SetActive (false);
		} else {
			this.titleWin.gameObject.SetActive (false);
			this.titleLoose.gameObject.SetActive (true);
		}

		List<Player> list = Session.CurrentSession.orderPlayer ();
		int i = 0;
		while (i < list.Count && i < players.Count) {
			players [i].setPlayer (list [i]);
			i++;
		}
	}

	void Update() {
		if (Player.CurrentPlayer.Id == Session.CurrentSession.giveWinner().Id) {
			this.titleWin.gameObject.SetActive (true);
			this.titleLoose.gameObject.SetActive (false);
		} else {
			this.titleWin.gameObject.SetActive (false);
			this.titleLoose.gameObject.SetActive (true);
		}

		List<Player> list = Session.CurrentSession.orderPlayer ();
		int i = 0;
		while (i < list.Count && i < players.Count) {
			players [i].setPlayer (list[i]);
			i++;
		}
	}
}