using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using AssemblyCSharp;

public class GameOverView : PanelView {

	public void show(bool b, Player winner) {
		Debug.Log ("show");
		if (b) {
			Debug.Log (winner.Id);
			this.panelController.initialize (winner);
			gameObject.SetActive (true);
		} else {
			hide ();
		}
	}
}