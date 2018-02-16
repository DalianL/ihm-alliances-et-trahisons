using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using AssemblyCSharp;
using System;

public class ProfilController : PanelController {

	public Button quitButton;
	public GameObject panelHelp;

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
	
		this.panelHelp.transform.Find ("Background/Help").GetComponent<Text> ().text = buildHelp();
	}

	void Update() {
		this.resources.transform.Find ("KyberR/Text").GetComponent<Text>().text = Player.CurrentPlayer.Resources[ResourcesEnum.RED_CRYSTAL_KYBER].ToString();
		this.resources.transform.Find ("KyberG/Text").GetComponent<Text>().text = Player.CurrentPlayer.Resources[ResourcesEnum.GREEN_CRYSTAL_KYBER].ToString();
		this.resources.transform.Find ("KyberB/Text").GetComponent<Text>().text = Player.CurrentPlayer.Resources[ResourcesEnum.BLUE_CRYSTAL_KYBER].ToString();
		this.resources.transform.Find ("KyberV/Text").GetComponent<Text>().text = Player.CurrentPlayer.Resources[ResourcesEnum.VIOLET_CRYSTAL_KYBER].ToString();
	}

	public string buildHelp() {
		string str = "Vous êtes un ";
		switch (Player.CurrentPlayer.Specie) {
		case SpeciesEnum.JAWAS:
			str = str + "Mechaonic" + ", qui est une espèce connue dans l'univers pour son vaste empire " + "robotique.";
			break;
		case SpeciesEnum.WOOKIES:
			str = str + "Neila" + ", qui est une espèce connue dans l'univers pour son vaste empire " + "technologique.";
			break;
		case SpeciesEnum.EWOKS:
			str = str + "Catunicorn" + ", qui est une espèce connue dans l'univers pour son vaste empire " + "économique.";
			break;
		case SpeciesEnum.GUNGANS:
			str = str + "Ganvroc" + ", qui est une espèce connue dans l'univers pour son vaste empire " + "militaire.";
			break;
		default :
			str = str + "\'ERROR espèce inconnue\'" + "... Nous n'avons aucunes données sur votre espèce, vous êtes un mystère...";
			break;
		}
		return str
			+ "\n\nVotres espèce possède les technologies nécessaires pour extraire 2 types de ressources. "
			+ "Les autres ressources ne vous sont pas accéssible par extraction.\n\n"
			+ "Mais vous pouvez récupérer ces ressources, en échangant avec d'autres espèces.";
	}

	public void back() {
		this.panelManager.showScreen (PanelEnum.GAME);
	}

	public void showPlanets() {
		this.planets.SetActive (true);
		this.fleets.SetActive (false);
	}

	public void showHelp() {
		this.panelHelp.SetActive (true);
	}

	public void hideHelp() {
		this.panelHelp.SetActive (false);
	}

	public void showFleets() {
		this.planets.SetActive (false);
		this.fleets.SetActive (true);
	}

	public void  showTutoResourcesPlanet() {
		this.panelManager.showHelp (true, "Ressources que vous récupérez à chaque extraction grâce à la possession de cette planète.");
	}

	public void  showTutoMyResources() {
		this.panelManager.showHelp (true, "Ressources que vous pouvez utiliser pour créer une flotte\n (coûte une ressource de chaque).");
	}

}