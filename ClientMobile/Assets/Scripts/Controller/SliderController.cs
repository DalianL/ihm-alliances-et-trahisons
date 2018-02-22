using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using AssemblyCSharp;
using UnityEngine.UI;

public class SliderController : MonoBehaviour {

	public PanelManager panelManager;
	public SlideObjectEnum objectType;
	public Network network;

	public GameObject objectRight;
	public GameObject objectLeft;
	public GameObject objectMid;

	public List<Sprite> images = new List<Sprite>();

	private int pointor;

	void Start () {
		this.pointor = 0;
	}
	
	// Update is called once per frame
	void Update () {

		if(this.pointor >= lengthOfObjectsList ()) {
			this.pointor = lengthOfObjectsList () - 1;
			if (this.pointor < 0)
				this.pointor = 0;
		}

		// RIGHT
		if (this.pointor < lengthOfObjectsList () - 1) {
			if (objectType == SlideObjectEnum.FLEET) {
				objectRight.transform.Find ("Object").GetComponent<Image> ().color = Player.CurrentPlayer.getColor ();
				objectRight.transform.Find ("SubObject").GetComponent<Image> ().sprite = getImageSubPlanet (this.pointor+1);
			} else if (objectType == SlideObjectEnum.PLANET) {
				objectRight.transform.Find ("Object").GetComponent<Image> ().sprite = getImagePlanet (this.pointor+1);
			}
			objectRight.SetActive (true);
		} else {
			objectRight.SetActive (false);
		}

		// LEFT
		if (this.pointor > 0) {
			if(objectType == SlideObjectEnum.FLEET) {
				objectLeft.transform.Find ("Object").GetComponent<Image> ().color = Player.CurrentPlayer.getColor ();
				objectLeft.transform.Find ("SubObject").GetComponent<Image> ().sprite = getImageSubPlanet (this.pointor-1);
			} else if (objectType == SlideObjectEnum.PLANET) {
				objectLeft.transform.Find ("Object").GetComponent<Image> ().sprite = getImagePlanet (this.pointor-1);
			}
			objectLeft.SetActive (true);
		} else {
			objectLeft.SetActive (false);
		}

		// MID
		if (0 != lengthOfObjectsList()) {
			objectMid.transform.Find("Name").GetComponent<Text>().text = getObjectName (this.pointor);
			if (objectType == SlideObjectEnum.PLANET) {
				objectMid.transform.Find ("Object").GetComponent<Image> ().sprite = getImagePlanet (this.pointor);
			} else if(objectType == SlideObjectEnum.FLEET) {
				objectMid.transform.Find ("Description").GetComponent<Text> ().text = "En orbite autour de la planète\n" + getObjectInfos(this.pointor);
				objectMid.transform.Find ("Object").GetComponent<Image> ().color = Player.CurrentPlayer.getColor ();
				objectMid.transform.Find ("SubObject").GetComponent<Image> ().sprite = getImageSubPlanet (this.pointor);
			}
			objectMid.SetActive (true);
		} else {
			objectMid.SetActive (false);
		}
	}

	public void goLeft() {
		if(this.pointor > 0)
			this.pointor--;
	}

	public void goRight() {
		if (this.pointor < lengthOfObjectsList () - 1) {
			this.pointor++;
		}
	}

	private int lengthOfObjectsList() {
		switch (objectType) {
		case SlideObjectEnum.FLEET:
			return Player.CurrentPlayer.Fleets.Count;
		case SlideObjectEnum.PLANET:
			return Player.CurrentPlayer.Planets.Count;
		default:
			return 0;
		}
	}

	private string getObjectName(int pos) {
		switch (objectType) {
		case SlideObjectEnum.FLEET:
			if(Player.CurrentPlayer.Fleets[pos].Id < 10)
				return "Flotte MHI-F-0" + Player.CurrentPlayer.Fleets[pos].Name;
			else
				return "Flotte MHI-F-" + Player.CurrentPlayer.Fleets[pos].Name;
		case SlideObjectEnum.PLANET:
			if(Player.CurrentPlayer.Planets[pos].Id < 10)
				return "Planète MHI-P-0" + Player.CurrentPlayer.Planets[pos].Name;
			else
				return "Planète MHI-P-" + Player.CurrentPlayer.Planets[pos].Name;
		default:
			return "Erreur";
		}
	}

	private string getObjectInfos(int pos) {
		switch (objectType) {
		case SlideObjectEnum.FLEET:
			if(Player.CurrentPlayer.Fleets[pos].Id_planet < 10)
				return "MHI-P-0" + Player.CurrentPlayer.Fleets[pos].Id_planet;
			else 
				return "MHI-P-" + Player.CurrentPlayer.Fleets[pos].Id_planet;
		default:
			return "Erreur";
		}
	}

	public void addFleet() {
		if (Player.CurrentPlayer.canPaid ()) {
			this.network.addFleet (Player.CurrentPlayer.Planets [this.pointor].Id);
		} else {
			this.panelManager.showError (true, "Attention ! Vous n'avez pas assez de ressources pour créer une nouvelle flotte.");
		}
	}

	private Sprite getImagePlanet(int pos) {
		return images[Player.CurrentPlayer.Planets[pos].Id];
	}

	private Sprite getImageSubPlanet(int pos) {
		return images[Player.CurrentPlayer.Fleets[pos].Id_planet];
	}

}
