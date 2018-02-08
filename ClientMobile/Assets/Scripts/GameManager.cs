using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using AssemblyCSharp;
using System;

public class GameManager : MonoBehaviour {

	public PanelManager panelManager;

	public bool isEnd;

	void Start() {
		this.isEnd = false;
	}

	void Update() {
		if (this.isEnd) {
			this.isEnd = false;
			this.panelManager.showEnd (true, Session.CurrentSession.giveWinner ());
		}
	}

}

