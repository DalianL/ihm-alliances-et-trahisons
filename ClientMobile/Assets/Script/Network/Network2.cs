using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Quobject.SocketIoClientDotNet.Client;
using Newtonsoft.Json;

public class Network2 : MonoBehaviour {

	public Button closeButton;
	public Button sendButton;
	public Text printText;
	public Text connectedText;
	public string str = "...";

	public string serverURL = "http://localhost:3000";

	private bool isConnected;
	protected Socket socket = null; 

	public void destroy() {
		doClose ();
	}

	// Use this for initialization
	void Start () {
		doOpen ();
	}

	void Update () {
		this.printText.text = str;
	}

	void doOpen() {
		if (socket == null) {
			socket = IO.Socket (serverURL);
			socket.On ("chat", (data) => {
				str = data.ToString();
			});
		}
	}

	public void doClose() {
		if (socket != null) {
			socket.Disconnect ();
			socket = null;
		}
	}

	public void send() {
		if (socket != null) {
			socket.Emit ("hello");
			this.printText.text = "send hello";
		}
		this.printText.text = "send hello end";
	}
}
