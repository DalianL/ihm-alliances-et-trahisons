using System.Collections;
using System.Collections.Generic;
using System;
using UnityEngine;
using ZXing;
using ZXing.QrCode;
using AssemblyCSharp;

public class QRCode : MonoBehaviour {

	public Network network;
	public PanelManager panelManager;

	private WebCamTexture camTexture;
	private Rect screenRect;

	void Start() {
		screenRect = new Rect((transform.parent.GetComponent<RectTransform>().rect.width / 2) - transform.GetComponent<RectTransform>().rect.width / 2 + (int) gameObject.GetComponent<RectTransform>().localPosition.x,
			(transform.parent.GetComponent<RectTransform>().rect.height / 2) - transform.GetComponent<RectTransform>().rect.height / 2,
			(int) gameObject.GetComponent<RectTransform>().rect.width, 
			(int) gameObject.GetComponent<RectTransform>().rect.height);
		camTexture = new WebCamTexture();

		camTexture.requestedHeight = (int) gameObject.GetComponent<RectTransform>().rect.height;
		camTexture.requestedWidth = (int) gameObject.GetComponent<RectTransform>().rect.width;
		if (camTexture != null) {
			camTexture.Play();
		}
	}

	void OnGUI () {
		// drawing the camera on screen
		GUI.DrawTexture (screenRect, camTexture, ScaleMode.ScaleToFit);
		// do the reading — you might want to attempt to read less often than you draw on the screen for performance sake
		try {
			IBarcodeReader barcodeReader = new BarcodeReader ();
			// decode the current frame
			var result = barcodeReader.Decode(camTexture.GetPixels32(),
				camTexture.width, camTexture.height);
			if (result != null) {
				Debug.Log(result.Text);
				this.network.connect(result.Text);
				if (result.Text == "")
					this.panelManager.showError (true, "Attention ! Le QR Code est vide, veulliez connecter manuellement.");
				else {
					this.panelManager.showScreen (PanelEnum.MATCHMAKING);
				}
			}
		} catch(Exception ex) { Debug.LogWarning (ex.Message); }
	}
}
