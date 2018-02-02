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

	public PanelManager panelManager;
	public MatchMakingController controller;

	public InputField inputURL;
	public InputField inputPseudo;
	private bool testInitialize = true;

	// Use this for initialization
	void Start () {
	}

	// Update is called once per frame
	void Update () {
	}

	public bool connect () {
		if (this.inputPseudo.text != "" && this.inputURL.text != "") {
			serverURL = "http://" + inputURL.text + ":8000/";
			return DoOpen ();
		}
		return false;
	}

	public bool connect (string str) {
		if (this.inputPseudo.text != "" && str != "") {
			serverURL = "http://" + str + ":8000/";
			return DoOpen ();
		}
		return false;
	}

	public void disconnect() {
		DoClose ();
	}

	private bool DoOpen() {
		bool allGood = false;
		if (socket == null) {
			socket = IO.Socket (serverURL);
			socket.On (Socket.EVENT_CONNECT, () => {
				Debug.Log("OK");
				allGood = true;
			});

			socket.On ("connected", (data) => {
				Debug.Log("Data connected : " + data);
				JObject node = JObject.Parse(data.ToString());
				Player.initializeCurrentPlayer((int) node["userId"], this.inputPseudo.text, "NO_COLOR");

				Debug.Log("Emit connected : " + JsonConvert.SerializeObject(Player.CurrentPlayer));
				socket.Emit ("connected", JsonConvert.SerializeObject(Player.CurrentPlayer));
			});

			socket.On ("play", (data) => {
				Debug.Log("Data play : " + data);

				this.controller.isBegin = true;
			});

			socket.On ("update_client", (data) => {
				Debug.Log("Data update_client : " + data);
				JObject node = JObject.Parse(data.ToString());

				Session.initializeCurrentSession(node);

				if(testInitialize) {
					testInitialize = false;
					/*socket.Emit ("add_planet", "{}");
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
					socket.Emit ("conquer_planet", "{\"id_planet\": 4, \"id_player\": 0}");*/
				}
			});

			socket.On ("update", (data) => {
				Debug.Log("Data update : " + data);
				Debug.Log("(Update Table)");
			});

			socket.On ("interact", (data) => {
				Debug.Log("Data interact : " + data);
			});

			socket.On (Socket.EVENT_CONNECT_ERROR, () => {
				Debug.Log("EVENT_CONNECT_ERROR");
				this.panelManager.showError (true, "EVENT_CONNECT_ERROR");
			});

			socket.On (Socket.EVENT_CONNECT_TIMEOUT, () => {
				Debug.Log("EVENT_CONNECT_TIMEOUT");
				this.panelManager.showError (true, "EVENT_CONNECT_TIMEOUT");
			});

			socket.On (Socket.EVENT_DISCONNECT, () => {
				Debug.Log("EVENT_DISCONNECT");
				this.panelManager.showError (true, "EVENT_DISCONNECT");
			});

			socket.On (Socket.EVENT_ERROR, () => {
				Debug.Log("EVENT_ERROR");
				this.panelManager.showError (true, "EVENT_ERROR");
			});

			socket.On (Socket.EVENT_MESSAGE, () => {
				Debug.Log("EVENT_MESSAGE");
				this.panelManager.showError (true, "EVENT_MESSAGE");
			});

			socket.On (Socket.EVENT_RECONNECT, () => {
				Debug.Log("EVENT_RECONNECT");
				this.panelManager.showError (true, "EVENT_RECONNECT");
			});

			socket.On (Socket.EVENT_RECONNECTING, () => {
				Debug.Log("EVENT_RECONNECTING");
				this.panelManager.showError (true, "EVENT_RECONNECTING");
			});

			socket.On (Socket.EVENT_RECONNECT_ATTEMPT, () => {
				Debug.Log("EVENT_RECONNECT_ATTEMPT");
				this.panelManager.showError (true, "EVENT_RECONNECT_ATTEMPT");
			});

			socket.On (Socket.EVENT_RECONNECT_ERROR, () => {
				Debug.Log("EVENT_RECONNECT_ERROR");
				this.panelManager.showError (true, "EVENT_RECONNECT_ERROR");
			});

			socket.On (Socket.EVENT_RECONNECT_FAILED, () => {
				Debug.Log("EVENT_RECONNECT_FAILED");
				this.panelManager.showError (true, "EVENT_RECONNECT_FAILED");
			});

		}
		return allGood;
	}

	private void DoClose() {
		if (socket != null) {
			socket.Disconnect ();
			socket = null;
		}
	}

	public void addFleet(int id_planet) {
		socket.Emit ("add_fleet", "{\"id_planet\": " + id_planet + ", \"id_player\": " + Player.CurrentPlayer.Id + "}");
	}
}