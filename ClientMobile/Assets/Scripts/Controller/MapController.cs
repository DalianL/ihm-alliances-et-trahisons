using UnityEngine;
using System.Collections;
using AssemblyCSharp;
using UnityEngine.UI;

public class MapController : PanelController {

	private Touch touch;
	private bool isTouch;

	private float posOriginalX;
	private float posOriginalY;
	private float posX;
	private float posY;

	private float selectedX;
	private float selectedY;

	// Use this for initialization
	void Start () {		
		this.posOriginalX = transform.position.x;
		this.posOriginalY = transform.position.y;
		this.posX = this.posOriginalX;
		this.posY = this.posOriginalY;
		this.isTouch = false;
		//transform.position = new Vector3 (this.posX, this.posY, 0);
		//transform.rotation = new Quaternion (0,0,0,0);
	}

	// Update is called once per frame
	void Update () {
		float rayon = this.GetComponent<RectTransform> ().rect.width/2;
		float centerX = this.GetComponent<RectTransform> ().localPosition.x
			+ transform.parent.GetComponent<RectTransform> ().rect.width/2;
		float centerY = this.GetComponent<RectTransform> ().localPosition.y
			+ transform.parent.GetComponent<RectTransform> ().rect.height/2;

		// MOUSE
		float x = Input.mousePosition.x - centerX;
		float y = Input.mousePosition.y - centerY;
		float distance = x * x + y * y;
		if (rayon * rayon > distance) {
			if (Input.GetMouseButtonDown(0)) {	
				this.selectedX = Input.mousePosition.x;
				this.selectedY = Input.mousePosition.y;
			}
			if (Input.GetMouseButton(0)) {	
				Vector2 vec1 = new Vector2 (selectedX, selectedY);
				Vector2 vec2 = new Vector2 (Input.mousePosition.x, Input.mousePosition.y);
				float angle = Vector2.Angle (vec1, vec2) * 5;

				Vector2 dif = vec1 - vec2;

				if(Mathf.Abs(dif.y) > 10) {
					if (vec1.y < vec2.y && vec1.x < centerX)
						angle = -1 * angle;
					else if (vec1.y > vec2.y && vec1.x > centerX)
						angle = -1 * angle;
					transform.Rotate (0,0,angle);
					this.selectedX = Input.mousePosition.x;
					this.selectedY = Input.mousePosition.y;
				} else if(Mathf.Abs(dif.x) > 10) {
					if (vec1.x > vec2.x && vec1.y < centerY)
						angle = -1 * angle;
					else if (vec1.x < vec2.x && vec1.y > centerY)
						angle = -1 * angle;
					transform.Rotate (0,0,angle);
					this.selectedX = Input.mousePosition.x;
					this.selectedY = Input.mousePosition.y;
				}
			}
		}

		// TOUCH
		if (Input.touchCount == 0) {
			this.isTouch = false;
		} else {
			if (this.isTouch) {
				this.touch = Input.GetTouch (0);
				Vector2 vec1 = new Vector2 (selectedX, selectedY);
				Vector2 vec2 = new Vector2 (touch.position.x, touch.position.y);
				float angle = Vector2.Angle (vec1, vec2) * 5;

				Vector2 dif = vec1 - vec2;

				if(Mathf.Abs(dif.y) > 10) {
					if (vec1.y < vec2.y && vec1.x < centerX)
						angle = -1 * angle;
					else if (vec1.y > vec2.y && vec1.x > centerX)
						angle = -1 * angle;
					transform.Rotate (0,0,angle);
					this.selectedX = touch.position.x;
					this.selectedY = touch.position.y;
				} else if(Mathf.Abs(dif.x) > 10) {
					if (vec1.x > vec2.x && vec1.y < centerY)
						angle = -1 * angle;
					else if (vec1.x < vec2.x && vec1.y > centerY)
						angle = -1 * angle;
					transform.Rotate (0,0,angle);
					this.selectedX = touch.position.x;
					this.selectedY = touch.position.y;
				}
			} else {
				this.touch = Input.GetTouch (0);
				this.selectedX = touch.position.x;
				this.selectedY = touch.position.y;
				this.isTouch = true;
			}
		}
	}

	public override void reset() {
		this.posX = this.posOriginalX;
		this.posY = this.posOriginalY;
		//transform.position = new Vector3 (this.posX, this.posY, 0);
		//transform.rotation = new Quaternion (0,0,0,0);
	}
}