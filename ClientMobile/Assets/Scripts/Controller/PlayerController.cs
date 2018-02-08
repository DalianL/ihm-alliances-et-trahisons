using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using AssemblyCSharp;

public class PlayerController : MonoBehaviour {
	
	public Image avatar;
	public Image color;
	public Text pseudo;

	public List<Sprite> images = new List<Sprite>();

	void Start() {
		initProfil ();
	}

	public void initProfil() {
		this.color.color = new Color32 (255,109,109,255);
		this.avatar.sprite = images [0];
		this.pseudo.text = "Inconnu";
	}

	public void setProfil(Player p) {
		this.color.color = p.getColor();
		this.avatar.sprite = images [SpeciesEnumHelper.ToInt(p.Specie) + 1];
		this.pseudo.text = p.Pseudo;
	}

}

