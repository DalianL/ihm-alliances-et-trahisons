using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using AssemblyCSharp;

public class PopupController : PanelController {

	public Text textError;

	public override void initialize(string text) {
		if (!this.initialized) {
			this.initialized = true;
		}
		textError.text = text;
	}

	public virtual void reset() {
	}
}
