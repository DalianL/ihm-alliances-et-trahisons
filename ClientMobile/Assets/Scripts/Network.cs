using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Quobject.SocketIoClientDotNet.Client;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using AssemblyCSharp;

public class Network : MonoBehaviour {
	private string serverURL = "http://localhost:8000/";
	//private string serverURL = "http://172.20.10.5:8000/";
	public Socket socket = null;

	public InputField inputURL;
	public InputField inputPseudo;
	private bool testInitialize = true;

	// Use this for initialization
	void Start () {
	}

	// Update is called once per frame
	void Update () {
	}

	public void connect () {
		if (this.inputPseudo.text != "" && this.inputURL.text != "") {
			serverURL = "http://" + inputURL.text + ":8000/";
			DoOpen ();
		}
	}

	public void disconnect() {
		DoClose ();
	}

	private void DoOpen() {
		if (socket == null) {
			socket = IO.Socket (serverURL);
			socket.On (Socket.EVENT_CONNECT, () => {
				Debug.Log("OK");
			});

			socket.On ("connected", (data) => {
				Debug.Log("Data connected : " + data);
				JObject node = JObject.Parse(data.ToString());
				Player.initializeCurrentPlayer((int) node["userId"], this.inputPseudo.text, "NO_COLOR");

				Debug.Log("Emit connected : " + JsonConvert.SerializeObject(Player.CurrentPlayer));
				socket.Emit ("connected", JsonConvert.SerializeObject(Player.CurrentPlayer));
			});

			socket.On ("update_client", (data) => {
				Debug.Log("Data update_client : " + data);
				JObject node = JObject.Parse(data.ToString());

				Session.initializeCurrentSession(node);

				if(testInitialize) {
					testInitialize = false;
					socket.Emit ("add_planet", "{}");
					socket.Emit ("add_planet", "{}");
					socket.Emit ("add_planet", "{}");
					socket.Emit ("add_planet", "{}");
					socket.Emit ("add_planet", "{}");
					socket.Emit ("add_planet", "{}");
					socket.Emit ("add_planet", "{}");
					socket.Emit ("add_planet", "{}");
					socket.Emit ("conquer_planet", "{\"id_planet\": 0, \"id_player\": 0}");
					socket.Emit ("conquer_planet", "{\"id_planet\": 1, \"id_player\": 0}");
					socket.Emit ("conquer_planet", "{\"id_planet\": 2, \"id_player\": 0}");
					socket.Emit ("conquer_planet", "{\"id_planet\": 3, \"id_player\": 0}");
					socket.Emit ("conquer_planet", "{\"id_planet\": 4, \"id_player\": 0}");
					socket.Emit ("add_fleet", "{\"id_planet\": 0, \"id_player\": 0}");
					socket.Emit ("add_fleet", "{\"id_planet\": 0, \"id_player\": 0}");
					socket.Emit ("add_fleet", "{\"id_planet\": 1, \"id_player\": 0}");
					socket.Emit ("add_fleet", "{\"id_planet\": 2, \"id_player\": 0}");
				}
			});

			socket.On ("update", (data) => {
				Debug.Log("Data update : " + data);
				Debug.Log("(Update Table)");
			});

			socket.On ("interact", (data) => {
				Debug.Log("Data interact : " + data);
			});
		}
	}

	private void DoClose() {
		if (socket != null) {
			socket.Disconnect ();
			socket = null;
		}
	}
}