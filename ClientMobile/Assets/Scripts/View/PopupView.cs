using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PopupView : PanelView {

	public void show(bool b, string text) {
		if (b) {
			this.panelController.initialize (text);
			gameObject.SetActive (true);
		} else {
			hide ();
		}
	}
}