using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using AssemblyCSharp;

public class GameController : PanelController {

	public GameObject galaxy;
	public GameObject prefabPlanetLocation;
	public GameObject planet;

	public Button quitButton;
	public Button ProfilButton;
	public Button MessageButton;
	public bool needUpdate = false;
	public List<Sprite> images = new List<Sprite>();
	public Sprite pointSprite;
	public Sprite planetSprite;

	private List<GameObject> listPlanets;
	private int currentId;


	void Start() {
		this.needUpdate = false;
	}

	public override void initialize() {
		if (!this.initialized) {
			this.initialized = true;
			// Create Object
			if (Session.IsInitializedCurrentSession) {
				int diameter = (int)this.galaxy.GetComponent<RectTransform> ().rect.width;
				int subWidht = (int)(Mathf.Sqrt (2)/2 * diameter / 2);
				int subHeight = (int) (Mathf.Sqrt (2)/2 * diameter / 2) * 800/1700;

				listPlanets = new List<GameObject> ();
				for (int i = 0; i < Session.CurrentSession.Planets.Count; i++) {
					GameObject planet = Instantiate (prefabPlanetLocation, galaxy.transform);
					planet.GetComponent<RectTransform> ().localPosition = new Vector3(
						((Session.CurrentSession.Planets [i].Location.PosX) * subWidht*2 / 1700) - subWidht, 
						((-1 * Session.CurrentSession.Planets [i].Location.PosY) * subHeight*2 / 600) + subHeight + 50,
						0);
					int id = i;
					planet.GetComponent<Button> ().onClick.AddListener (delegate {
						showPlanetById (id);
					});
					listPlanets.Add (planet);
				}
				this.currentId = 0;
				showPlanetById (this.currentId);
			}
		}
		// Color
		if (Session.IsInitializedCurrentSession) {
			this.needUpdate = false;
			for (int i = 0; i < Session.CurrentSession.Planets.Count; i++) {
				GameObject planet = listPlanets [i];
				int id_player = Session.CurrentSession.Planets [i].Id_player;
				if (id_player != -1)
					planet.GetComponent<Image> ().color = Session.CurrentSession.getPlayerById (id_player).getColor ();
				else
					planet.GetComponent<Image> ().color = new Color32 (255, 255, 255, 255);
			}
		}
	}

	void Update() {
		if (this.initialized && Session.IsInitializedCurrentSession && needUpdate) {
			this.needUpdate = false;
			// Color
			for (int i = 0; i < Session.CurrentSession.Planets.Count; i++) {
				GameObject planet = listPlanets [i];
				int id_player = Session.CurrentSession.Planets [i].Id_player;
				if (id_player != -1)
					planet.GetComponent<Image> ().color = Session.CurrentSession.getPlayerById (id_player).getColor ();
				else
					planet.GetComponent<Image> ().color = new Color32 (255, 255, 255, 255);
			}
		}
	}

	public override void reset() {
		initialize ();
	}

	private void showPlanetById(int id) {
		if(id < 10)
			planet.transform.Find("Name").GetComponent<Text>().text = "Planète MHI-P-0" + Session.CurrentSession.getPlanetById(id).Name;
		else 
			planet.transform.Find("Name").GetComponent<Text>().text = "Planète MHI-P-" + Session.CurrentSession.getPlanetById(id).Name;
		planet.transform.Find ("Planet").GetComponent<Image> ().sprite = images[id];
		planet.transform.Find ("Resources/KyberR/Text").GetComponent<Text>().text = Session.CurrentSession.getPlanetById(id).Resources[ResourcesEnum.RED_CRYSTAL_KYBER].ToString();
		planet.transform.Find ("Resources/KyberG/Text").GetComponent<Text>().text = Session.CurrentSession.getPlanetById(id).Resources[ResourcesEnum.GREEN_CRYSTAL_KYBER].ToString();
		planet.transform.Find ("Resources/KyberB/Text").GetComponent<Text>().text = Session.CurrentSession.getPlanetById(id).Resources[ResourcesEnum.BLUE_CRYSTAL_KYBER].ToString();
		planet.transform.Find ("Resources/KyberV/Text").GetComponent<Text>().text = Session.CurrentSession.getPlanetById(id).Resources[ResourcesEnum.VIOLET_CRYSTAL_KYBER].ToString();

		listPlanets[this.currentId].GetComponent<Image>().sprite = pointSprite;
		listPlanets[id].GetComponent<Image>().sprite = planetSprite;
		this.currentId = id;
	}

	public void back() {
		this.panelManager.showScreen (PanelEnum.LOGIN);
	}

	public void goToProfil() {
		this.panelManager.showScreen (PanelEnum.PROFIL);
	}

	public void goToMessage() {
		//this.panelManager.showScreen (PanelEnum.MESSAGE);
	}
}
