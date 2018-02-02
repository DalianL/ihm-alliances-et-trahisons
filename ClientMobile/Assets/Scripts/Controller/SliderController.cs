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

	private int pointor;

	void Start () {
		this.pointor = 0;
	}
	
	// Update is called once per frame
	void Update () {
		// RIGHT
		if (this.pointor < lengthOfObjectsList () - 1) {
			// Image planet or fleet
			//objectRight.transform.Find("Number").GetComponent<Text>().text = getObjectName (this.pointor + 1);
			if(objectType == SlideObjectEnum.FLEET) {
				// Image planet for fleet
				//objectRight.transform.Find ("SubObject/Number").GetComponent<Text> ().text = getObjectInfos(this.pointor + 1);
			}
			objectRight.SetActive (true);
		} else {
			objectRight.SetActive (false);
		}

		// LEFT
		if (this.pointor > 0) {
			// Image planet or fleet
			//objectLeft.transform.Find("Number").GetComponent<Text>().text = getObjectName (this.pointor - 1);
			if(objectType == SlideObjectEnum.FLEET) {
				// Image planet for fleet
				//objectLeft.transform.Find ("SubObject/Number").GetComponent<Text> ().text = getObjectInfos(this.pointor - 1);
			}
			objectLeft.SetActive (true);
		} else {
			objectLeft.SetActive (false);
		}

		// MID
		if (0 != lengthOfObjectsList()) {
			objectMid.transform.Find("Name").GetComponent<Text>().text = getObjectName (this.pointor);
			if (objectType == SlideObjectEnum.PLANET) {
				objectMid.transform.Find ("Resources/KyberR/Text").GetComponent<Text>().text = Player.CurrentPlayer.Planets[this.pointor].Resources[ResourcesEnum.RED_CRYSTAL_KYBER].ToString();
				objectMid.transform.Find ("Resources/KyberG/Text").GetComponent<Text>().text = Player.CurrentPlayer.Planets[this.pointor].Resources[ResourcesEnum.GREEN_CRYSTAL_KYBER].ToString();
				objectMid.transform.Find ("Resources/KyberB/Text").GetComponent<Text>().text = Player.CurrentPlayer.Planets[this.pointor].Resources[ResourcesEnum.BLUE_CRYSTAL_KYBER].ToString();
				objectMid.transform.Find ("Resources/KyberV/Text").GetComponent<Text>().text = Player.CurrentPlayer.Planets[this.pointor].Resources[ResourcesEnum.VIOLET_CRYSTAL_KYBER].ToString();
			} else if(objectType == SlideObjectEnum.FLEET) {
				objectMid.transform.Find ("Description").GetComponent<Text> ().text = "En orbite autour de la planète : " + getObjectInfos(this.pointor);
				// Image planet for fleet
				//objectMid.transform.Find ("SubObject/Number").GetComponent<Text> ().text = getObjectInfos(this.pointor);
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
			return "Flotte n°" + Player.CurrentPlayer.Fleets[pos].Name;
		case SlideObjectEnum.PLANET:
			return "Planète n°" + Player.CurrentPlayer.Planets[pos].Name;
		default:
			return "Erreur";
		}
	}

	private string getObjectInfos(int pos) {
		switch (objectType) {
		case SlideObjectEnum.FLEET:
			return "Planète n°" + Player.CurrentPlayer.Fleets[pos].Id_planet;
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

}
