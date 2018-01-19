using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Quobject.SocketIoClientDotNet.Client;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using AssemblyCSharp;

public class ChatData {
	public string id;
	public string msg;
};

public class SocketIOScript : MonoBehaviour {
	private string serverURL = "http://localhost:8000/";
	//private string serverURL = "http://172.20.10.5:3001/";

	public InputField uiInput = null;
	public Button uiSend = null;
	public Text uiChatLog = null;

	protected Socket socket = null;
	protected List<string> chatLog = new List<string> (); 

	public Dropdown dropdownPlayers;
	public bool updatedDropdown = false;
	private Dictionary<int, Player> players = new Dictionary<int, Player>();

	void Destroy() {
		DoClose ();
	}

	// Use this for initialization
	void Start () {
		updateDropDown ();

		DoOpen ();

		uiSend.onClick.AddListener(() => {
			SendChat(uiInput.text);
			uiInput.text = "";
			uiInput.ActivateInputField();
		});
	}
	
	// Update is called once per frame
	void Update () {
		lock (chatLog) {
			if (chatLog.Count > 0) {
				string str = uiChatLog.text;
				foreach (var s in chatLog) {
					str = str + "\n" + s;
				}
				uiChatLog.text = str;
				chatLog.Clear ();
			}
		}

		lock (players) {
			if (updatedDropdown)
				updateDropDown ();
		}
	}

	void DoOpen() {
		if (socket == null) {
			socket = IO.Socket (serverURL);
			socket.On (Socket.EVENT_CONNECT, () => {
				lock(chatLog) {
					// Access to Unity UI is not allowed in a background thread, so let's put into a shared variable
					chatLog.Add("Socket.IO connected.");
				}
			});

			socket.On ("hello", (data) => {
				ChatData chat = JsonConvert.DeserializeObject<ChatData> (data.ToString());

				lock(chatLog) {
					chatLog.Add("(hello) user #" + chat.id + " : " + chat.msg);
				}
			});

			socket.On ("interact", (data) => {
				JsonMessage msg = JsonConvert.DeserializeObject<JsonMessage> (data.ToString());

				lock(chatLog) {
					chatLog.Add("(interact recieve) user #" + msg.sender + " : " + msg.msg);
				}
			});


			socket.On ("update_client", (data) => {
				JObject node = JObject.Parse(data.ToString());
				lock (players) {
					players = JsonConvert.DeserializeObject<Dictionary<int, Player>> (node["players"].ToString());
				}
				updatedDropdown = true;

				lock(chatLog) {
					chatLog.Add("(Update Player)");
				}
			});

			socket.On ("update", (data) => {
				lock(chatLog) {
					chatLog.Add("(Update Table)");
				}
			});
		}
	}

	private void updateDropDown() {
		List<string> options = new List<string> ();
		foreach(KeyValuePair<int, Player> player in players) {
			options.Add (player.Value.pseudo);
		}
		this.dropdownPlayers.ClearOptions ();
		this.dropdownPlayers.AddOptions (options);
		updatedDropdown = false;
	}

	void DoClose() {
		if (socket != null) {
			socket.Disconnect ();
			socket = null;
		}
	}

	void SendChat(string str) {
		if (socket != null) {
			string selected = this.dropdownPlayers.options [this.dropdownPlayers.value].text;
			foreach(KeyValuePair<int, Player> player in players) {
				if (player.Value.pseudo == selected) {
					JsonMessage jsonMessage = new JsonMessage(str, 0, player.Value.id);
					socket.Emit ("interact", JsonConvert.SerializeObject(jsonMessage));

					lock(chatLog) {
						chatLog.Add("(interact send) user #" + player.Value.id + " : " + str);
					}

					return;
				}
			}
		}
	}
}
