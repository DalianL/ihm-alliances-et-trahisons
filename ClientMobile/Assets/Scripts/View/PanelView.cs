using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PanelView : MonoBehaviour {

	public PanelController panelController;

	void Awake() {
		this.panelController = transform.GetComponent<PanelController> ();
	}

	public virtual void show(bool b) {
		if (b) {
			this.panelController.initialize ();
			gameObject.SetActive (true);
		} else {
			hide ();
		}
	}

	public virtual void hide() {
		gameObject.SetActive (false);
	}

	public virtual void reset() {
		this.panelController.reset ();
	}
}