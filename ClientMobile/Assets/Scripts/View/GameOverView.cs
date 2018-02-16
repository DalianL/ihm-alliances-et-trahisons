using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using AssemblyCSharp;

public class GameOverView : PanelView {

	public override void show(bool b) {
		if (b) {
			this.panelController.initialize (Session.CurrentSession.giveWinner ());
			gameObject.SetActive (true);
		} else {
			hide ();
		}
	}

	public void show(bool b, Player winner) {
		if (b) {
			this.panelController.initialize (winner);
			gameObject.SetActive (true);
		} else {
			hide ();
		}
	}
}