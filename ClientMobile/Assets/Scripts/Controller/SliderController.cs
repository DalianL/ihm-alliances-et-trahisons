using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using AssemblyCSharp;
using UnityEngine.UI;

public class SliderController : MonoBehaviour {

	public SlideObjectEnum objectType;

	public GameObject objectRight;
	public GameObject objectLeft;
	public GameObject objectMid;

	private int pointor;

	// Use this for initialization
	void Start () {
		this.pointor = 0;
	}
	
	// Update is called once per frame
	void Update () {
		// RIGHT
		if (this.pointor < lengthOfObjectsList () - 1) {
			objectRight.transform.Find("Number").GetComponent<Text>().text = getObjectName (this.pointor + 1);
			objectRight.GetComponentInChildren<Image> ().color = new Color32 (255,255,255,225);
			objectRight.transform.Find("Number").GetComponent<Text>().color = new Color32 (0,0,0,225);
			if(objectType == SlideObjectEnum.FLEET) {
				objectRight.transform.Find ("SubObject").GetComponent<Image> ().color = new Color32 (255, 0, 0, 255);
				objectRight.transform.Find ("SubObject/Number").GetComponent<Text> ().color = new Color32 (0, 0, 0, 255);
				objectRight.transform.Find ("SubObject/Number").GetComponent<Text> ().text = getObjectInfos(this.pointor + 1);
			}
		} else {
			objectRight.GetComponentInChildren<Image> ().color = new Color32 (255,255,255,0);
			objectRight.transform.Find("Number").GetComponent<Text>().color = new Color32 (0,0,0,0);
			if(objectType == SlideObjectEnum.FLEET) {
				objectRight.transform.Find ("SubObject").GetComponent<Image> ().color = new Color32 (255, 0, 0, 0);
				objectRight.transform.Find ("SubObject/Number").GetComponent<Text> ().color = new Color32 (0, 0, 0, 0);
			}
		}

		// LEFT
		if (this.pointor > 0) {
			objectLeft.transform.Find("Number").GetComponent<Text>().text = getObjectName (this.pointor - 1);
			objectLeft.GetComponentInChildren<Image> ().color = new Color32 (255,255,255,225);
			objectLeft.transform.Find("Number").GetComponent<Text>().color = new Color32 (0,0,0,225);
			if(objectType == SlideObjectEnum.FLEET) {
				objectLeft.transform.Find ("SubObject").GetComponent<Image> ().color = new Color32 (255, 0, 0, 255);
				objectLeft.transform.Find ("SubObject/Number").GetComponent<Text> ().color = new Color32 (0, 0, 0, 255);
				objectLeft.transform.Find ("SubObject/Number").GetComponent<Text> ().text = getObjectInfos(this.pointor - 1);
			}
		} else {
			objectLeft.GetComponentInChildren<Image> ().color = new Color32 (255,255,255,0);
			objectLeft.transform.Find("Number").GetComponent<Text>().color = new Color32 (0,0,0,0);
			if(objectType == SlideObjectEnum.FLEET) {
				objectLeft.transform.Find ("SubObject").GetComponent<Image> ().color = new Color32 (255, 0, 0, 0);
				objectLeft.transform.Find ("SubObject/Number").GetComponent<Text> ().color = new Color32 (0, 0, 0, 0);
			}
		}

		// MID
		if (0 != lengthOfObjectsList()) {
			objectMid.transform.Find("Number").GetComponent<Text>().text = getObjectName (this.pointor);
			objectMid.GetComponent<Image> ().color = new Color32 (255,255,255,225);
			objectMid.transform.Find("Number").GetComponent<Text>().color = new Color32 (0,0,0,225);
			if (objectType == SlideObjectEnum.PLANET) {
				objectMid.transform.Find ("Details").GetComponent<Text> ().color = new Color32 (0, 0, 0, 255);
				objectMid.transform.Find ("Details").GetComponent<Text> ().text = "Details...";
			} else if(objectType == SlideObjectEnum.FLEET) {
				objectMid.transform.Find ("SubObject").GetComponent<Image> ().color = new Color32 (255, 0, 0, 255);
				objectMid.transform.Find ("SubObject/Number").GetComponent<Text> ().color = new Color32 (0, 0, 0, 255);
				objectMid.transform.Find ("SubObject/Number").GetComponent<Text> ().text = getObjectInfos(this.pointor);
			}
		} else {
			objectMid.GetComponent<Image> ().color = new Color32 (255,255,255,0);
			objectMid.transform.Find("Number").GetComponent<Text>().color = new Color32 (0,0,0,0);
			if (objectType == SlideObjectEnum.PLANET) {
				objectMid.transform.Find ("Details").GetComponent<Text> ().color = new Color32 (0, 0, 0, 0);
			} else if(objectType == SlideObjectEnum.FLEET) {
				objectMid.transform.Find ("SubObject").GetComponent<Image> ().color = new Color32 (255, 0, 0, 0);
				objectMid.transform.Find ("SubObject/Number").GetComponent<Text> ().color = new Color32 (0, 0, 0, 0);
			}
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
		//case SlideObjectEnum.PLANET:
			//return "Planète n°" + Player.CurrentPlayer.Planets[pos].Name;
		default:
			return "Erreur";
		}
	}
}
