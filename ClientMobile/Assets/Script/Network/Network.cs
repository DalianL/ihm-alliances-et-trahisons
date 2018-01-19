using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
//using SocketIOClient;

public class Network : MonoBehaviour {

	/*public Button closeButton;
	public Button sendButton;
	public Text printText;
	public Text connectedText;

	private bool isConnected;
	private Client client = new Client("http://localhost:3000/");

	// Use this for initialization

		//System.Net.WebRequest.DefaultWebProxy = null;
	void Start () {
		this.client.Opened += SocketOpened;
		this.client.Message += SocketMessage;
		this.client.SocketConnectionClosed += SocketConnectionClosed;
		this.client.Error +=SocketError;

		this.client.Connect ();
	}

	private void SocketOpened(object sender, System.EventArgs e) {
		this.isConnected = true;
		this.connectedText.text = "Is connected";
	}

	private void SocketConnectionClosed(object sender, System.EventArgs e) {
		this.isConnected = false;
		this.connectedText.text = "Is not connected";
	}

	private void SocketMessage (object sender, MessageEventArgs e) {
		if (e != null && e.Message.Event == "message") {
			string msg = e.Message.MessageText;
			this.printText.text = "Answer :\n" + msg;
		}
	}

	private void SocketError (object sender, ErrorEventArgs e) {
		this.printText.text =  e.Message;
	}

	public void send() {
		if(isConnected) {
			this.client.Send ("hello");
		}
	}

	public void close() {
		if(isConnected) {
			this.client.Close ();
		}
	}*/
}
