using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using AssemblyCSharp;

public class PopupController : PanelController {

	public Text textError;
	public Text pseudo;
	public Image avatar;

	public override void initialize(string text) {
		if (!this.initialized) {
			this.initialized = true;
		}
		textError.text = text;
	}

	public override void initialize(string text, string pseudo, Color32 color) {
		if (!this.initialized) {
			this.initialized = true;
		}

		this.textError.text = text;
		this.pseudo.text = pseudo;
		this.avatar.color = color;

		#if UNITY_IPHONE || UNITY_ANDROID
			Handheld.Vibrate ();
		#endif
	}

	public virtual void reset() {
	}
}
