using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using AssemblyCSharp;

public class BackgroundAnimation : MonoBehaviour {
	public List<GameObject> prefabs = new List<GameObject> ();
	public List<Sprite> sprites = new List<Sprite> ();
	public GameObject FleetPrefab;
	public GameObject CometePrefab;
	public GameObject PlanetPrefab;

	private List<GameObject> stars;
	private int spriteNumber = 0;

	void Awake() {
		this.stars = new List<GameObject> ();
		for(int i = 0; i < prefabs.Count; i++) {
			for (int j = 0; j < i * i * 15; j++) {
				int x = (int) Random.Range (-this.GetComponent<RectTransform> ().rect.width/2, this.GetComponent<RectTransform> ().rect.width/2);
				int y = (int) Random.Range (-this.GetComponent<RectTransform> ().rect.height/2, this.GetComponent<RectTransform> ().rect.height/2);

				GameObject star = Instantiate (prefabs [i], transform);
				star.transform.localPosition = new Vector3 (x, y, 0);
				stars.Add (star);
			}
		}
		spriteNumber = 0;
		StartCoroutine ("modifyStar");
	}

	void Update() {
		foreach (GameObject star in stars) {
			float v = 12 - star.GetComponent<RectTransform> ().rect.width;

			float x = star.transform.localPosition.x - 5f / (v*v);
			if (x <= -this.GetComponent<RectTransform> ().rect.width / 2)
				x = this.GetComponent<RectTransform> ().rect.width / 2;
			float y = star.transform.localPosition.y;
			int sign = (int) Random.Range (0, 2);
			if (sign == 0)
				y = star.transform.localPosition.y - 0.2f;
			else 
				y = star.transform.localPosition.y + 0.2f;
			star.transform.localPosition = new Vector3 (x, y, 0);
		}

		float r = (float)Random.Range (0, 3000);
		if (r < 0.00001f) {
			StartCoroutine ("movePlanet");
			spriteNumber = (spriteNumber + 1) % sprites.Count;
		}
	}

	IEnumerator modifyStar() {
		while (true) {
			for (int i = 0; i < 5; i++) {
				int pos = (int) Random.Range (0, stars.Count);
				int sign = (int) Random.Range (0, 2);
				float r = stars [pos].GetComponent<RectTransform> ().rect.width;
				if (sign == 0 && r >= 2)
					stars [pos].GetComponent<RectTransform> ().sizeDelta = new Vector2 (r - 2, r - 2);
				else if (sign == 1 && r <= 6)
					stars [pos].GetComponent<RectTransform> ().sizeDelta = new Vector2 (r + 2, r + 2);
				else 
					stars [pos].GetComponent<RectTransform> ().sizeDelta = new Vector2 (r, r);
			}
			yield return new WaitForSeconds (0.2f);
		}
	}

	IEnumerator movePlanet() {
		float x = this.GetComponent<RectTransform> ().rect.width;
		float y = (float) Random.Range (-this.GetComponent<RectTransform> ().rect.height/2, this.GetComponent<RectTransform> ().rect.height/2);

		GameObject planet = Instantiate (PlanetPrefab, transform);
		planet.GetComponent<Image> ().sprite = sprites [spriteNumber];
		planet.transform.localPosition = new Vector3 (x, y, 0);
		planet.GetComponent<RectTransform> ().sizeDelta = new Vector2 (200, 200);

		while (x >= - this.GetComponent<RectTransform> ().rect.width) {
			x = x - 1f;
			int sign = (int) Random.Range (0, 2);
			if (sign == 0)
				y = y - 0.2f;
			else 
				y = y + 0.2f;
			planet.transform.localPosition = new Vector3 (x, y, 0);
			yield return new WaitForSeconds (0.05f);
		}
		Destroy (planet);
	}
}

