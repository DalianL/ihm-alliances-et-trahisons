using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using AssemblyCSharp;

public class PlayerController : MonoBehaviour {
	
	public Image color;
	public Text pseudo;

	void Start() {
		initProfil ();
	}

	public void initProfil() {
		this.color.color = new Color32 (255,109,109,255);
		this.pseudo.text = "Inconnu";
	}

	public void setProfil(Player p) {
		this.color.color = p.getColor();
		this.pseudo.text = p.Pseudo;
	}

}

