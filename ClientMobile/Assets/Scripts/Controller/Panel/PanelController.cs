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
	}

	public virtual void reset() {
	}
}