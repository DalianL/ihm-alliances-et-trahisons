using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using AssemblyCSharp;
using System;

public class ProfilController : PanelController {

	public Button quitButton;

	public Image avatar;
	public Image color;
	public Text pseudo;
	public GameObject planets;
	public GameObject fleets;
	public GameObject resources;

	public List<Sprite> images = new List<Sprite>();

	public override void initialize() {
		if (!this.initialized) {
			this.initialized = true;
		}

		this.planets.SetActive (true);
		this.fleets.SetActive (false);

		this.color.color = Player.CurrentPlayer.getColor();
		this.avatar.sprite = images [SpeciesEnumHelper.ToInt(Player.CurrentPlayer.Specie)];
		this.pseudo.text = Player.CurrentPlayer.Pseudo;
		this.resources.transform.Find ("KyberR/Text").GetComponent<Text>().text = Player.CurrentPlayer.Resources[ResourcesEnum.RED_CRYSTAL_KYBER].ToString();
		this.resources.transform.Find ("KyberG/Text").GetComponent<Text>().text = Player.CurrentPlayer.Resources[ResourcesEnum.GREEN_CRYSTAL_KYBER].ToString();
		this.resources.transform.Find ("KyberB/Text").GetComponent<Text>().text = Player.CurrentPlayer.Resources[ResourcesEnum.BLUE_CRYSTAL_KYBER].ToString();
		this.resources.transform.Find ("KyberV/Text").GetComponent<Text>().text = Player.CurrentPlayer.Resources[ResourcesEnum.VIOLET_CRYSTAL_KYBER].ToString();
	}

	void Update() {
		this.resources.transform.Find ("KyberR/Text").GetComponent<Text>().text = Player.CurrentPlayer.Resources[ResourcesEnum.RED_CRYSTAL_KYBER].ToString();
		this.resources.transform.Find ("KyberG/Text").GetComponent<Text>().text = Player.CurrentPlayer.Resources[ResourcesEnum.GREEN_CRYSTAL_KYBER].ToString();
		this.resources.transform.Find ("KyberB/Text").GetComponent<Text>().text = Player.CurrentPlayer.Resources[ResourcesEnum.BLUE_CRYSTAL_KYBER].ToString();
		this.resources.transform.Find ("KyberV/Text").GetComponent<Text>().text = Player.CurrentPlayer.Resources[ResourcesEnum.VIOLET_CRYSTAL_KYBER].ToString();
	}

	public void back() {
		this.panelManager.showScreen (PanelEnum.GAME);
	}

	public void showPlanets() {
		this.planets.SetActive (true);
		this.fleets.SetActive (false);
	}

	public void showFleets() {
		this.planets.SetActive (false);
		this.fleets.SetActive (true);
	}

}