using System.Collections;
using System.Collections.Generic;
using System;
using UnityEngine;
using ZXing;
using ZXing.QrCode;
using AssemblyCSharp;

public class QRCode : MonoBehaviour {

	public Network network;

	private WebCamTexture camTexture;
	private Rect screenRect;
	private bool isfinished = false;
	private bool isManuelly = false;
	private string ip;

	void Start() {
		this.ip = null;

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

	void Update() {
		if (this.isfinished && !this.isManuelly) {
			if (this.ip == "") {
				this.network.panelManager.showError (true, "Attention ! Le QR Code est vide, veulliez vous connecter manuellement.");
				//camTexture.Play();
				this.isManuelly = true;
			} else if (this.ip == null) {
				//Nothing
			} else {
				this.network.connect (this.ip);
				this.network.panelManager.showScreen (PanelEnum.MATCHMAKING);
			}
		}
	}

	void OnGUI () {
		if (!this.isfinished) {
			// drawing the camera on screen
			GUI.DrawTexture (screenRect, camTexture, ScaleMode.ScaleToFit);
			// do the reading — you might want to attempt to read less often than you draw on the screen for performance sake
			try {
				IBarcodeReader barcodeReader = new BarcodeReader ();
				// decode the current frame
				var result = barcodeReader.Decode (camTexture.GetPixels32 (),
					             camTexture.width, camTexture.height);
				if (result != null) {
					this.ip = result.Text;
					camTexture.Stop ();
					this.isfinished = true;
				}
			} catch (Exception ex) {
				Debug.LogWarning (ex.Message);
			}
		}
	}

	public void close() {
		this.isfinished = true;
		camTexture.Stop();
	}
}
