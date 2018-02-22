using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using AssemblyCSharp;

public class PanelController : MonoBehaviour {

	public PanelManager panelManager;
	public bool initialized = false;

	public virtual void initialize() {
		if (!this.initialized) {
			this.initialized = true;
		}
	}

	public virtual void initialize(string text) {
		if (!this.initialized) {
			this.initialized = true;
		}
	}

	public virtual void initialize(string text, string pseudo, Color32 color) {
		if (!this.initialized) {
			this.initialized = true;
		}
	}

	public virtual void initialize(Player winner) {
		Debug.Log (winner.Pseudo);
		if (!this.initialized) {
			this.initialized = true;
		}
	}

	public virtual void reset() {
	}
}